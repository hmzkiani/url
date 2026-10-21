import React from 'react';
import { ShieldCheck, Mail, Lock, EyeOff, Server, HardDrive } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto leading-relaxed">
      <SEOHead
        title="Privacy Policy - SEOFlow Tools"
        description="Learn how SEOFlow Tools protects your privacy through local-first processing, zero advertising cookies, and transparent data policies."
        canonicalPath="/privacy-policy"
      />

      <Breadcrumb items={[{ name: 'Privacy Policy' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Last Updated: March 2026 • Effective Date: March 2026
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8 text-sm text-stone-700 dark:text-stone-300">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>1. Overview & Privacy Philosophy</span>
          </h2>
          <p>
            At <strong>SEOFlow Tools</strong>, we believe privacy should be the default, not an afterthought. This application is engineered to perform tasks directly inside your web browser whenever possible. We do not sell your personal data, inject advertising trackers, or build user tracking profiles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-500" />
            <span>2. Local Browser In-Memory Processing</span>
          </h2>
          <p>
            The majority of our utilities—including the <em>Word Counter</em>, <em>Keyword Density Checker</em>, <em>Readability Analyzer</em>, <em>Slug Generator</em>, <em>JSON-LD Schema Generator</em>, <em>Robots.txt Generator</em>, and <em>XML Sitemap Generator</em>—process text exclusively in your local browser runtime.
          </p>
          <p>
            Text, draft articles, and keyword lists you paste into these tools are calculated in client-side JavaScript memory and are never transmitted to our servers or stored in remote databases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-sky-500" />
            <span>3. LocalStorage Usage</span>
          </h2>
          <p>
            We use your browser's standard <code>localStorage</code> API for two transparent purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 dark:text-stone-400">
            <li>
              <strong>Theme Preference:</strong> Storing your choice of Light, Dark, or System mode under the key <code>seoflow_theme</code> so your preference persists across page reloads without flashing.
            </li>
            <li>
              <strong>Short Link History:</strong> Storing short links you create on your device under <code>seoflow_shortlinks</code> so you can view, copy, and track your click counts locally.
            </li>
          </ul>
          <p>
            You can clear these values at any time using your browser's site settings or &ldquo;Clear Browsing Data&rdquo; feature.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-500" />
            <span>4. Server-Side Processing & SSRF Safety</span>
          </h2>
          <p>
            Certain tools require making HTTP requests to external web servers on your behalf because web browsers enforce Cross-Origin Resource Sharing (CORS) security restrictions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 dark:text-stone-400">
            <li><strong>Redirect Status Checker:</strong> Inspecting HTTP 301/302 response headers and status codes.</li>
            <li><strong>Broken Link Checker:</strong> Auditing reachable links on a target public webpage.</li>
            <li><strong>Website SEO Analyzer:</strong> Fetching public HTML metadata when analyzing live URLs.</li>
          </ul>
          <p>
            When you invoke these features, our companion service fetches only public HTML. We implement strict <strong>Server-Side Request Forgery (SSRF)</strong> protections: target domains are checked to ensure they never resolve to private subnets (<code>10.x.x.x</code>, <code>192.168.x.x</code>, <code>172.16-31.x.x</code>), loopback addresses (<code>127.0.0.1</code>), or cloud metadata endpoints (<code>169.254.169.254</code>).
          </p>
          <p>
            We do not store or inspect the HTML content fetched on our server disks after fulfilling your audit request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-500" />
            <span>5. Cookies & Advertising Trackers</span>
          </h2>
          <p>
            SEOFlow Tools does not use third-party advertising cookies, retargeting pixels, or behavioral analytics beacons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-500" />
            <span>6. Contact Information & User Inquiries</span>
          </h2>
          <p>
            If you have questions, privacy inquiries, or suggestions regarding this policy, please email us directly:
          </p>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 font-mono text-xs text-emerald-600 dark:text-emerald-400">
            <a href="mailto:Askhmzkiani@gmail.com" className="hover:underline">
              Askhmzkiani@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
