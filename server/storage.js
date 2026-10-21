import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory link cache
const memoryStore = new Map();

// Local seed database file path
const SEED_FILE = path.join(__dirname, 'shortlinks.json');

// Writable paths
const LOCAL_FILE = path.join(__dirname, 'shortlinks.json');
const TMP_FILE = process.platform === 'win32'
  ? path.join(process.env.TEMP || process.env.TMP || __dirname, 'seoflow_shortlinks.json')
  : '/tmp/seoflow_shortlinks.json';

// Upstash / Vercel KV REST Credentials
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
const HAS_KV = Boolean(KV_URL && KV_TOKEN);

let isInitialized = false;

/**
 * Initialize storage by loading seed data and local/tmp stores into memory
 */
export function initStorage() {
  if (isInitialized) return;

  // 1. Load from bundled shortlinks.json
  try {
    if (fs.existsSync(SEED_FILE)) {
      const data = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      for (const [code, item] of Object.entries(data)) {
        if (item && item.code && item.destination) {
          memoryStore.set(code.toLowerCase(), item);
        }
      }
    }
  } catch (e) {
    console.warn('[Storage] Could not load seed shortlinks.json:', e.message);
  }

  // 2. Load from /tmp store if available (e.g. from previous requests in same container)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8'));
      for (const [code, item] of Object.entries(data)) {
        if (item && item.code && item.destination) {
          memoryStore.set(code.toLowerCase(), item);
        }
      }
    }
  } catch (e) {
    // ignore
  }

  isInitialized = true;
  if (HAS_KV) {
    console.log('[Storage] Connected to Vercel KV / Upstash Redis for persistent multi-instance storage.');
  } else {
    console.log('[Storage] Running with bundled data, /tmp storage, and memory cache. Connect Vercel KV / Upstash Redis for cross-container persistence.');
  }
}

// Auto initialize on module load
initStorage();

/**
 * Retrieve a short link by code
 */
export async function getShortLink(rawCode) {
  if (!rawCode) return null;
  initStorage();
  const code = String(rawCode).trim().toLowerCase();

  // 1. Check in-memory store (sub-millisecond)
  if (memoryStore.has(code)) {
    return memoryStore.get(code);
  }

  // 2. Check remote KV / Redis if configured
  if (HAS_KV) {
    try {
      const res = await fetch(`${KV_URL.replace(/\/+$/, '')}/get/seoflow:${encodeURIComponent(code)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const body = await res.json();
        if (body && body.result) {
          const item = typeof body.result === 'string' ? JSON.parse(body.result) : body.result;
          if (item && item.destination) {
            memoryStore.set(code, item);
            return item;
          }
        }
      }
    } catch (e) {
      console.warn('[Storage] Remote KV lookup failed:', e.message);
    }
  }

  // 3. Fallback: Re-check /tmp file in case another concurrent request wrote to it
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TMP_FILE, 'utf-8'));
      if (data[code]) {
        memoryStore.set(code, data[code]);
        return data[code];
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

/**
 * Persist short link to memory, disk (/tmp + local), and remote KV
 */
export async function saveShortLink(item) {
  if (!item || !item.code || !item.destination) {
    throw new Error('Invalid short link item');
  }

  initStorage();
  const code = item.code.trim().toLowerCase();
  const cleanItem = {
    code,
    destination: item.destination,
    createdAt: item.createdAt || new Date().toISOString(),
    clicks: item.clicks || 0,
    lastClickedAt: item.lastClickedAt || null
  };

  // 1. Save in memory cache
  memoryStore.set(code, cleanItem);

  // 2. Persist to disk (/tmp and local)
  const allLinks = Object.fromEntries(memoryStore.entries());

  // Write to /tmp (always writable on Vercel and serverless)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(allLinks, null, 2), 'utf-8');
  } catch (e) {
    console.warn('[Storage] Failed to write to TMP_FILE:', e.message);
  }

  // Write to local project directory (when writable, e.g. local dev)
  try {
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(allLinks, null, 2), 'utf-8');
  } catch (e) {
    // Expected on Vercel read-only filesystem
  }

  // 3. Persist to remote Vercel KV / Upstash Redis if configured
  if (HAS_KV) {
    try {
      await fetch(`${KV_URL.replace(/\/+$/, '')}/set/seoflow:${encodeURIComponent(code)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanItem),
        signal: AbortSignal.timeout(3000)
      });
    } catch (e) {
      console.warn('[Storage] Remote KV save failed:', e.message);
    }
  }

  return cleanItem;
}

/**
 * Increment click count for a short link
 */
export async function recordClick(rawCode) {
  if (!rawCode) return;
  const item = await getShortLink(rawCode);
  if (!item) return;

  item.clicks = (item.clicks || 0) + 1;
  item.lastClickedAt = new Date().toISOString();

  // Update in memory and persist
  memoryStore.set(item.code, item);

  // Update in /tmp
  try {
    const allLinks = Object.fromEntries(memoryStore.entries());
    fs.writeFileSync(TMP_FILE, JSON.stringify(allLinks, null, 2), 'utf-8');
  } catch (e) {
    // ignore
  }

  // Update in KV if configured
  if (HAS_KV) {
    try {
      fetch(`${KV_URL.replace(/\/+$/, '')}/set/seoflow:${encodeURIComponent(item.code)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
        signal: AbortSignal.timeout(2000)
      }).catch(() => {});
    } catch (e) {
      // ignore
    }
  }
}

/**
 * Returns all saved short links
 */
export async function getAllShortLinks() {
  initStorage();
  return Array.from(memoryStore.values());
}
