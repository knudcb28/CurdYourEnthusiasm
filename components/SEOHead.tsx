interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = '/og-default.jpg',
  jsonLd
}: SEOHeadProps) {
  const siteUrl = 'https://curdyourenthusiasm.com'; // Update with your actual domain
  const fullTitle = `${title} | Curd Your Enthusiasm`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

