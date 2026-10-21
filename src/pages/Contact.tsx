import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Info, MessageSquare, User, AtSign, FileQuestion } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { useToast } from '../context/ToastContext';

export const Contact: React.FC = () => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name.';
    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) errs.subject = 'Please enter a subject.';
    if (!message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      addToast('Please correct the errors in the form.', 'error');
      return;
    }

    // Prepare mailto link
    const mailtoUrl = `mailto:Askhmzkiani@gmail.com?subject=${encodeURIComponent(
      `[SEOFlow Tools] ${subject.trim()}`
    )}&body=${encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\n\nMessage:\n${message.trim()}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    addToast('Opening your default email client...', 'info');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Contact Us - SEOFlow Tools Support"
        description="Get in touch with the SEOFlow Tools team. Send feedback, report tool bugs, or suggest new free SEO utilities."
        canonicalPath="/contact"
      />

      <Breadcrumb items={[{ name: 'Contact Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Have a question, feedback, or need help with a tool? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Direct Email
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Reach us anytime at our official inbox:
              </p>
              <a
                href="mailto:Askhmzkiani@gmail.com"
                className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline block break-all"
              >
                Askhmzkiani@gmail.com
              </a>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 space-y-1">
              <div className="font-semibold text-stone-700 dark:text-stone-300">
                Response Times
              </div>
              <p>We aim to reply to all inquiries within 24 to 48 hours.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
            <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-500" />
              <span>Transparent Delivery Note</span>
            </div>
            <p>
              To respect your privacy and eliminate tracking servers or spam databases, submitting this form opens your email client pre-addressed to <strong>Askhmzkiani@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                  Email Prepared
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                  Your message has been formatted and opened in your email client. If it did not open automatically, please send your email directly to{' '}
                  <a href="mailto:Askhmzkiani@gmail.com" className="font-semibold text-emerald-600 underline">
                    Askhmzkiani@gmail.com
                  </a>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                      <input
                        type="text"
                        id="contact-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.name ? 'border-rose-400' : 'border-stone-200 dark:border-stone-700'
                        }`}
                      />
                    </div>
                    {errors.name && <span className="text-[11px] text-rose-500 mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <AtSign className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                      <input
                        type="email"
                        id="contact-email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.email ? 'border-rose-400' : 'border-stone-200 dark:border-stone-700'
                        }`}
                      />
                    </div>
                    {errors.email && <span className="text-[11px] text-rose-500 mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FileQuestion className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                    <input
                      type="text"
                      id="contact-subject"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Feedback on SEO Analyzer tool"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.subject ? 'border-rose-400' : 'border-stone-200 dark:border-stone-700'
                      }`}
                    />
                  </div>
                  {errors.subject && <span className="text-[11px] text-rose-500 mt-1 block">{errors.subject}</span>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How can we help? Please provide as much detail as possible..."
                    className={`w-full p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed ${
                      errors.message ? 'border-rose-400' : 'border-stone-200 dark:border-stone-700'
                    }`}
                  />
                  {errors.message && <span className="text-[11px] text-rose-500 mt-1 block">{errors.message}</span>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
