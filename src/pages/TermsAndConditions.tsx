import React from 'react';
import { Scale, ShieldAlert, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';

export const TermsAndConditions: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto leading-relaxed">
      <SEOHead
        title="Terms and Conditions - SEOFlow Tools"
        description="Terms of service, acceptable use policies, anti-phishing guidelines, and tool disclaimers for SEOFlow Tools."
        canonicalPath="/terms-and-conditions"
      />

      <Breadcrumb items={[{ name: 'Terms and Conditions' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Last Updated: March 2026 • Effective Date: March 2026
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-8 text-sm text-stone-700 dark:text-stone-300">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-500" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or using <strong>SEOFlow Tools</strong>, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use of the website and services immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span>2. Acceptable Use & URL Shortener Abuse Policy</span>
          </h2>
          <p>
            You agree to use SEOFlow Tools exclusively for lawful purposes. You must not use our URL shortening or redirect services to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 dark:text-stone-400">
            <li>Distribute malware, ransomware, trojans, or malicious scripts.</li>
            <li>Direct visitors to phishing schemes, credential-harvesting pages, or deceptive scams.</li>
            <li>Disguise illegal content, abusive material, or spam campaigns.</li>
            <li>Perform denial-of-service (DoS) attacks or automated scraping loops against third-party servers.</li>
          </ul>
          <p>
            We reserve the right to immediately disable any short link or block any domain that violates this acceptable use policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>3. SEO Results & Rankings Disclaimer</span>
          </h2>
          <p>
            Search engine algorithms (including Google, Microsoft Bing, and others) are proprietary, continuously evolving, and consider hundreds of complex signals.
          </p>
          <p>
            <strong>No Guarantee of Rankings:</strong> SEOFlow Tools provides technical analysis, best practice recommendations, and content calculations. We do <strong>not</strong> guarantee search engine rankings, traffic increases, or specific business revenue outcomes. Outputs such as readability scores and keyword densities are statistical estimates and guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-sky-500" />
            <span>4. Tool Availability & Third-Party Dependencies</span>
          </h2>
          <p>
            We strive to maintain high service reliability. However, tool availability may be subject to internet connectivity, browser compatibility, and whether target third-party websites permit automated crawling. SEOFlow Tools is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-500" />
            <span>5. Limitation of Liability</span>
          </h2>
          <p>
            To the maximum extent permitted by applicable law, SEOFlow Tools and its developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including server configuration errors or website downtime caused by misapplied redirect rules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-500" />
            <span>6. Inquiries & Abuse Reports</span>
          </h2>
          <p>
            To report abusive short links or ask questions regarding these terms, please contact:
          </p>
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 font-mono text-xs text-emerald-600 dark:text-emerald-400">
            <a href="mailto:Askhmzkiani@gmail.com" className="hover:underline">
              Askhmzkiani@gmail.com
            </a>
          </div>
          <p className="text-xs text-stone-400">
            Note: These terms are provided for informational clarity and do not substitute for customized formal legal advice.
          </p>
        </section>
      </div>
    </div>
  );
};
