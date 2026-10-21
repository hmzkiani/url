import React, { useState, useMemo } from 'react';
import { Code, Download, Copy, RotateCcw, Info, CheckCircle2, Sparkles, Plus, Trash2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CopyButton } from '../components/CopyButton';
import { useToast } from '../context/ToastContext';

type SchemaType =
  | 'Article'
  | 'BlogPosting'
  | 'Organization'
  | 'Person'
  | 'Product'
  | 'LocalBusiness'
  | 'BreadcrumbList'
  | 'FAQPage';

export const SchemaGenerator: React.FC = () => {
  const { addToast } = useToast();
  const [schemaType, setSchemaType] = useState<SchemaType>('Article');

  // Article & BlogPosting
  const [headline, setHeadline] = useState('How to Optimize On-Page SEO in 2026');
  const [authorName, setAuthorName] = useState('Sarah Jenkins');
  const [datePublished, setDatePublished] = useState(() => new Date().toISOString().split('T')[0]);
  const [articleImage, setArticleImage] = useState('https://example.com/images/seo-guide.jpg');
  const [publisherName, setPublisherName] = useState('SEOFlow Tools');
  const [publisherLogo, setPublisherLogo] = useState('https://example.com/logo.png');

  // Organization
  const [orgName, setOrgName] = useState('Acme Technologies');
  const [orgUrl, setOrgUrl] = useState('https://example.com');
  const [orgLogo, setOrgLogo] = useState('https://example.com/logo.png');
  const [orgSocials, setOrgSocials] = useState('https://twitter.com/acme\nhttps://linkedin.com/company/acme');

  // Person
  const [personName, setPersonName] = useState('Alex Rivera');
  const [personJob, setPersonJob] = useState('Senior SEO Strategist');
  const [personUrl, setPersonUrl] = useState('https://example.com/alex-rivera');

  // Product
  const [productName, setProductName] = useState('Ergonomic Wireless Keyboard');
  const [productDesc, setProductDesc] = useState('High-performance mechanical keyboard with Bluetooth and multi-device pairing.');
  const [productPrice, setProductPrice] = useState('89.99');
  const [productCurrency, setProductCurrency] = useState('USD');
  const [productAvailability, setProductAvailability] = useState('https://schema.org/InStock');

  // LocalBusiness
  const [businessName, setBusinessName] = useState('Downtown Dental Care');
  const [businessType, setBusinessType] = useState('Dentist');
  const [streetAddress, setStreetAddress] = useState('123 Market Street, Suite 400');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94105');
  const [country, setCountry] = useState('US');
  const [telephone, setTelephone] = useState('+1-555-019-2834');

  // FAQ Page Questions
  const [faqItems, setFaqItems] = useState([
    { question: 'What is schema markup?', answer: 'Schema markup is structured code added to your website that helps search engines understand the meaning and context of your content.' },
    { question: 'Does schema markup guarantee rich snippets in Google?', answer: 'No. While valid schema makes your page eligible for rich results, Google search algorithms ultimately decide whether to display them.' }
  ]);

  // Breadcrumbs
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: 'Home', url: 'https://example.com' },
    { name: 'Blog', url: 'https://example.com/blog' },
    { name: 'SEO Guide', url: 'https://example.com/blog/seo-guide' }
  ]);

  const jsonLdObject = useMemo(() => {
    switch (schemaType) {
      case 'Article':
      case 'BlogPosting':
        return {
          '@context': 'https://schema.org',
          '@type': schemaType,
          headline,
          image: articleImage ? [articleImage] : undefined,
          datePublished,
          author: {
            '@type': 'Person',
            name: authorName
          },
          publisher: {
            '@type': 'Organization',
            name: publisherName,
            logo: publisherLogo ? { '@type': 'ImageObject', url: publisherLogo } : undefined
          }
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: orgName,
          url: orgUrl,
          logo: orgLogo || undefined,
          sameAs: orgSocials.split('\n').map(s => s.trim()).filter(Boolean)
        };

      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: personName,
          jobTitle: personJob || undefined,
          url: personUrl || undefined
        };

      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productName,
          description: productDesc,
          offers: {
            '@type': 'Offer',
            price: productPrice,
            priceCurrency: productCurrency,
            availability: productAvailability
          }
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': businessType || 'LocalBusiness',
          name: businessName,
          telephone,
          address: {
            '@type': 'PostalAddress',
            streetAddress,
            addressLocality: city,
            postalCode,
            addressCountry: country
          }
        };

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: crumb.name,
            item: crumb.url
          }))
        };
    }
  }, [
    schemaType, headline, authorName, datePublished, articleImage, publisherName, publisherLogo,
    orgName, orgUrl, orgLogo, orgSocials, personName, personJob, personUrl,
    productName, productDesc, productPrice, productCurrency, productAvailability,
    businessName, businessType, streetAddress, city, postalCode, country, telephone,
    faqItems, breadcrumbs
  ]);

  const jsonLdString = JSON.stringify(jsonLdObject, null, 2);
  const scriptTagOutput = `<script type="application/ld+json">\n${jsonLdString}\n</script>`;

  const handleDownload = () => {
    const blob = new Blob([scriptTagOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema-${schemaType.toLowerCase()}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addToast('Schema file downloaded!', 'success');
  };

  const addFaq = () => {
    setFaqItems([...faqItems, { question: 'New Question', answer: 'New Answer' }]);
  };

  const removeFaq = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const addBreadcrumb = () => {
    setBreadcrumbs([...breadcrumbs, { name: 'New Page', url: 'https://example.com/new' }]);
  };

  const removeBreadcrumb = (index: number) => {
    setBreadcrumbs(breadcrumbs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SEOHead
        title="Free JSON-LD Schema Markup Generator"
        description="Generate valid Schema.org JSON-LD structured data for Articles, FAQs, Organizations, Local Businesses, Products, and Breadcrumbs."
        canonicalPath="/schema-generator"
      />

      <Breadcrumb
        items={[
          { name: 'Schema Markup Tools', path: '/tools?category=schema' },
          { name: 'JSON-LD Schema Generator' }
        ]}
      />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
          JSON-LD Schema Generator
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Create structured data markups conforming to Schema.org standards to help search engines understand your content.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151E19] border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Schema Type Picker */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Select Schema Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              'Article',
              'BlogPosting',
              'FAQPage',
              'Organization',
              'LocalBusiness',
              'Product',
              'Person',
              'BreadcrumbList'
            ].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSchemaType(type as SchemaType)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  schemaType === type
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Form Fields */}
        <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
          {(schemaType === 'Article' || schemaType === 'BlogPosting') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Article Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Date Published
                </label>
                <input
                  type="date"
                  value={datePublished}
                  onChange={e => setDatePublished(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={articleImage}
                  onChange={e => setArticleImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Publisher Name
                </label>
                <input
                  type="text"
                  value={publisherName}
                  onChange={e => setPublisherName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {schemaType === 'FAQPage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Questions & Answers ({faqItems.length})
                </span>
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              {faqItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500">Q#{idx + 1}</span>
                    {faqItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(idx)}
                        className="text-stone-400 hover:text-rose-500"
                        title="Remove question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={item.question}
                    onChange={e => {
                      const updated = [...faqItems];
                      updated[idx].question = e.target.value;
                      setFaqItems(updated);
                    }}
                    placeholder="Enter question"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={e => {
                      const updated = [...faqItems];
                      updated[idx].answer = e.target.value;
                      setFaqItems(updated);
                    }}
                    placeholder="Enter answer"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          )}

          {schemaType === 'Organization' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={orgUrl}
                  onChange={e => setOrgUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Social Profiles (One per line)
                </label>
                <textarea
                  rows={3}
                  value={orgSocials}
                  onChange={e => setOrgSocials(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {schemaType === 'Product' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={productDesc}
                  onChange={e => setProductDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  value={productCurrency}
                  onChange={e => setProductCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Availability
                </label>
                <select
                  value={productAvailability}
                  onChange={e => setProductAvailability(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
                >
                  <option value="https://schema.org/InStock">In Stock</option>
                  <option value="https://schema.org/OutOfStock">Out of Stock</option>
                  <option value="https://schema.org/PreOrder">Pre-order</option>
                </select>
              </div>
            </div>
          )}

          {schemaType === 'LocalBusiness' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Telephone
                </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {schemaType === 'BreadcrumbList' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Breadcrumb Steps ({breadcrumbs.length})
                </span>
                <button
                  type="button"
                  onClick={addBreadcrumb}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Step</span>
                </button>
              </div>

              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-400 w-6">#{idx + 1}</span>
                  <input
                    type="text"
                    value={crumb.name}
                    onChange={e => {
                      const updated = [...breadcrumbs];
                      updated[idx].name = e.target.value;
                      setBreadcrumbs(updated);
                    }}
                    placeholder="Page Name"
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={crumb.url}
                    onChange={e => {
                      const updated = [...breadcrumbs];
                      updated[idx].url = e.target.value;
                      setBreadcrumbs(updated);
                    }}
                    placeholder="https://example.com/page"
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                  />
                  {breadcrumbs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBreadcrumb(idx)}
                      className="p-2 text-stone-400 hover:text-rose-500"
                      title="Remove step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {schemaType === 'Person' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={personName}
                  onChange={e => setPersonName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={personJob}
                  onChange={e => setPersonJob(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Website / Profile URL
                </label>
                <input
                  type="text"
                  value={personUrl}
                  onChange={e => setPersonUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono text-stone-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Generated JSON-LD Output */}
        <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Valid JSON-LD Output ({schemaType})
            </span>
            <div className="flex items-center gap-2">
              <CopyButton text={scriptTagOutput} label="Copy Script Tag" variant="primary" />
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .jsonld</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed border border-stone-800 max-h-80">
            <code>{scriptTagOutput}</code>
          </pre>
        </div>

        {/* Important Disclaimer */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1.5">
          <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-500" />
            <span>Structured Data Search Policy Note</span>
          </div>
          <p>
            Adding valid Schema markup helps Google and Bing interpret relationships and entities. However, structured data eligibility does <strong>not</strong> guarantee that search engines will display rich snippets or star ratings. Only include real, verified properties corresponding to your actual page content.
          </p>
        </div>
      </div>
    </div>
  );
};
