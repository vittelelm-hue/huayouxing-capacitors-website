import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  alibabaUrl,
  brandName,
  capacitanceSelections,
  companyName,
  email,
  factoryAddress,
  phone,
  productDetailImages,
  productFamilies,
  siteUrl,
  whatsapp,
} from "../../site";
import CapacitanceSelector from "../../components/CapacitanceSelector";

type ProductParams = {
  params: Promise<{
    series: string;
  }>;
};

function getProduct(series: string) {
  return productFamilies.find((product) => product.slug === series);
}

export function generateStaticParams() {
  return productFamilies.map((product) => ({ series: product.slug }));
}

export async function generateMetadata({ params }: ProductParams): Promise<Metadata> {
  const { series } = await params;
  const product = getProduct(series);

  if (!product) {
    return {};
  }

  const url = `${siteUrl}/products/${product.slug}`;
  const primaryImage = productDetailImages[product.slug][0];

  return {
    title: product.seoTitle,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.description,
      url,
      siteName: "Huayouxing Capacitors",
      images: [
        {
          url: `${siteUrl}${primaryImage.src}`,
          width: 1200,
          height: 630,
          alt: primaryImage.alt,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.description,
      images: [`${siteUrl}${primaryImage.src}`],
    },
  };
}

export default async function ProductDetail({ params }: ProductParams) {
  const { series } = await params;
  const product = getProduct(series);

  if (!product) {
    notFound();
  }

  const productUrl = `${siteUrl}/products/${product.slug}`;
  const detailImages = productDetailImages[product.slug];
  const hasCapacitanceSelection = capacitanceSelections.some(
    (selection) => selection.code === product.code,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: {
      "@type": "Brand",
      name: brandName,
      alternateName: "华佑星",
    },
    manufacturer: {
      "@type": "Organization",
      name: companyName,
      url: siteUrl,
      email,
      telephone: phone,
    },
    category: "Film capacitor",
    description: product.description,
    image: `${siteUrl}${detailImages[0].src}`,
    url: productUrl,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Product series",
        value: product.code,
      },
      {
        "@type": "PropertyValue",
        name: "Application",
        value: product.role,
      },
    ],
  };

  return (
    <main className="site-shell product-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="top-nav" aria-label="Product navigation">
        <a className="brand" href="/" aria-label="Huayouxing Shengjin home">
          <img
            className="brand-logo"
            src="/huayouxing-logo.jpg"
            alt="Huayouxing registered brand logo"
          />
          <span className="brand-text">
            <strong>HUAYOUXING</strong>
            <small>{companyName}</small>
          </span>
        </a>
        <nav>
          <a href="/">Home</a>
          <a href="/#products">Products</a>
          <a href="/#factory">Factory</a>
          <a href="/#quality">Quality</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <section className="detail-hero">
        <div>
          <p className="eyebrow">{brandName} product series</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/#inquiry">
              Send Inquiry
            </a>
            <a className="button button-secondary" href={alibabaUrl} target="_blank" rel="noreferrer">
              Alibaba Storefront
            </a>
          </div>
        </div>
        <div className="detail-product-media">
          <img
            src={detailImages[0].src}
            alt={detailImages[0].alt}
            data-replaceable-image={detailImages[0].slot}
          />
        </div>
      </section>

      <section className="section detail-grid">
        <article className="detail-panel">
          <span className="product-code">{product.code}</span>
          <h2>{product.role}</h2>
          <p>{product.use}</p>
          <p>{product.structure}</p>
        </article>
        <article className="detail-panel">
          <span className="product-code">Application scenarios</span>
          <h2>Common buyer applications</h2>
          <ul className="detail-list">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      {hasCapacitanceSelection ? (
        <section className="section capacitance-section detail-capacitance-section">
          <CapacitanceSelector initialSeries={product.code} showSeriesTabs={false} />
        </section>
      ) : null}

      <section className="section detail-gallery-section" aria-labelledby={`${product.code.toLowerCase()}-gallery-title`}>
        <div className="section-heading compact">
          <p className="eyebrow">Product variants</p>
          <h2 id={`${product.code.toLowerCase()}-gallery-title`}>Actual product views and connection styles.</h2>
        </div>
        <div className="detail-product-gallery">
          {detailImages.slice(1).map((image) => (
            <figure className="detail-gallery-item" key={image.slot}>
              <img src={image.src} alt={image.alt} data-replaceable-image={image.slot} loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-band">
        <div className="section detail-contact">
          <div>
            <p className="eyebrow">Specification confirmation</p>
            <h2>Confirm the exact capacitor model before quotation.</h2>
            <p>
              Send capacitance, rated voltage, tolerance, shell size, terminal
              style, label requirement and estimated quantity. Final parameters
              are confirmed by your inquiry and sample review.
            </p>
          </div>
          <address className="contact-list">
            <a href="tel:+8618830952397">
              <span>Phone</span>
              {phone}
            </a>
            <a href="https://wa.me/8618830952397" target="_blank" rel="noreferrer">
              <span>WhatsApp</span>
              {whatsapp}
            </a>
            <a href={`mailto:${email}`}>
              <span>Email</span>
              {email}
            </a>
            <a href="https://maps.google.com/?q=Xingtai%20City%2C%20Hebei%20Province" target="_blank" rel="noreferrer">
              <span>Factory Address</span>
              {factoryAddress}
            </a>
          </address>
        </div>
      </section>
    </main>
  );
}
