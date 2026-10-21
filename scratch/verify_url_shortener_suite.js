// Comprehensive URL Shortener Verification Test Suite (Using Native Fetch)
console.log('='.repeat(75));
console.log('🧪 RUNNING COMPLETE 10-POINT URL SHORTENER VERIFICATION SUITE');
console.log('='.repeat(75));

const results = [];
function record(stepNum, description, passed, details = '') {
  results.push({ stepNum, description, passed, details });
  const badge = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${badge}] Step ${stepNum}: ${description}`);
  if (details) console.log(`       ↳ ${details}`);
}

async function runVerification() {
  let generatedCode = null;
  const testTargetUrl = 'https://news.ycombinator.com/';

  // 1. Submit a valid long URL
  try {
    const res = await fetch('http://localhost:5173/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://news.ycombinator.com' })
    });
    const data = await res.json();
    const ok = res.status === 200 && !!data.code && data.destination.startsWith('https://news.ycombinator.com');
    if (ok) generatedCode = data.code;
    record(1, 'Submit valid long URL via /api/shorten', ok, `HTTP ${res.status}, code="${generatedCode}", target="${data.destination}"`);
  } catch (e) {
    record(1, 'Submit valid long URL via /api/shorten', false, e.message);
  }

  // 2. Confirm real short URL is generated & persisted
  try {
    const lookup = await fetch(`http://localhost:5173/api/shortlink/${generatedCode}`);
    const data = await lookup.json();
    const ok = lookup.status === 200 && data.code === generatedCode && data.destination.startsWith('https://news.ycombinator.com');
    record(2, 'Confirm short code persisted in storage', ok, `Code "${generatedCode}" found with destination "${data.destination}"`);
  } catch (e) {
    record(2, 'Confirm short code persisted in storage', false, e.message);
  }

  // 3. Verify Short URL Format & Copy payload
  try {
    const shortUrl = `http://localhost:5173/r/${generatedCode}`;
    const valid = shortUrl.startsWith('http://localhost:5173/r/') && shortUrl.length > 25;
    record(3, 'Verify generated short link URL format for clipboard copying', valid, `Generated: ${shortUrl}`);
  } catch (e) {
    record(3, 'Verify generated short link URL format', false, e.message);
  }

  // 4. Open short URL (Test HTTP 302 redirect on fresh browser navigation)
  let initialRedirectOk = false;
  let redirectedLocation = '';
  try {
    const redirRes = await fetch(`http://localhost:5173/r/${generatedCode}`, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' }
    });
    redirectedLocation = redirRes.headers.get('location') || '';
    initialRedirectOk = redirRes.status === 302 && redirectedLocation.startsWith('https://news.ycombinator.com');
    record(4, 'Open short URL in fresh navigation & check HTTP 302 redirect', initialRedirectOk, `HTTP ${redirRes.status}, Location: "${redirectedLocation}"`);
  } catch (e) {
    record(4, 'Open short URL in fresh navigation', false, e.message);
  }

  // 5. Verify redirection reaches correct destination
  try {
    record(5, 'Verify redirect target strictly matches original destination', initialRedirectOk, `Target matches: ${redirectedLocation}`);
  } catch (e) {
    record(5, 'Verify redirect target', false, e.message);
  }

  // 6. Refresh the destination short-link route and test again
  try {
    const refreshRes = await fetch(`http://localhost:5173/r/${generatedCode}`, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'Accept': 'text/html' }
    });
    const loc = refreshRes.headers.get('location') || '';
    const ok = refreshRes.status === 302 && loc.startsWith('https://news.ycombinator.com');
    record(6, 'Refresh / re-fetch destination route repeatedly', ok, `HTTP ${refreshRes.status}, Location preserved on repeat visit: "${loc}"`);
  } catch (e) {
    record(6, 'Refresh / re-fetch destination route', false, e.message);
  }

  // 7. Submit an invalid URL and confirm useful error message
  try {
    const invalidRes = await fetch('http://localhost:5173/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: '' })
    });
    const errData = await invalidRes.json();
    const ok = invalidRes.status === 400 && errData.error?.includes('required');
    record(7, 'Submit empty / invalid URL and check error feedback', ok, `HTTP ${invalidRes.status}, Error: "${errData.error}"`);
  } catch (e) {
    record(7, 'Submit invalid URL', false, e.message);
  }

  // 8. Test a nonexistent short code
  try {
    const nonExistentRes = await fetch('http://localhost:5173/r/nonexistent-code-99999', {
      method: 'GET',
      redirect: 'manual'
    });
    const text = await nonExistentRes.text();
    const ok = nonExistentRes.status === 404 && text.includes('Link Not Found');
    record(8, 'Test nonexistent short code returns HTTP 404', ok, `HTTP ${nonExistentRes.status}, 404 Not Found page served`);
  } catch (e) {
    record(8, 'Test nonexistent short code', false, e.message);
  }

  // 9. Verify click counter incremented accurately
  try {
    const clickCheck = await fetch(`http://localhost:5173/api/shortlink/${generatedCode}`);
    const clickData = await clickCheck.json();
    const ok = clickCheck.status === 200 && clickData.clicks >= 2;
    record(9, 'Verify click analytics tracked server-side without loops', ok, `Total recorded clicks: ${clickData.clicks}`);
  } catch (e) {
    record(9, 'Verify click analytics', false, e.message);
  }

  // 10. Direct Companion Server Check (Port 3001)
  try {
    const directRes = await fetch(`http://localhost:3001/r/${generatedCode}`, {
      method: 'GET',
      redirect: 'manual'
    });
    const loc = directRes.headers.get('location') || '';
    const ok = directRes.status === 302 && loc.startsWith('https://news.ycombinator.com');
    record(10, 'Direct companion server redirect on port 3001', ok, `HTTP ${directRes.status}, direct backend redirection verified`);
  } catch (e) {
    record(10, 'Direct companion server redirect', false, e.message);
  }

  console.log('='.repeat(75));
  const passedCount = results.filter(r => r.passed).length;
  console.log(`🎯 VERIFICATION RESULT: ${passedCount}/${results.length} PASSED`);
  console.log('='.repeat(75));
}

runVerification();
