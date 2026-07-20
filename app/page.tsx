import {
  alibabaUrl,
  applicationProfiles,
  brandName,
  certifications,
  companyName,
  email,
  factoryAddress,
  factoryFacts,
  factoryImages,
  factoryStrengths,
  phone,
  productFamilies,
  qualitySteps,
  siteUrl,
  whatsapp,
} from "./site";
import ScrollFloat from "./components/ScrollFloat";
import CapacitanceSelector from "./components/CapacitanceSelector";
import FactoryVideoGallery from "./components/FactoryVideoGallery";
import ClickSpark from "./components/ClickSpark";
import LaserFlowGallery from "./components/LaserFlowGallery";

const navItems = [
  ["Factory", "#factory"],
  ["Quality", "#quality"],
  ["Applications", "#applications"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const productMenuItems = [
  ["CBB60", "/products/cbb60", "Motor run capacitors"],
  ["CBB61", "/products/cbb61", "Fan and appliance capacitors"],
  ["CBB65", "/products/cbb65", "HVAC run capacitors"],
  ["CD60", "/products/cd60", "Motor start capacitors"],
  ["CBB60 Cable", "#product-gallery", "Cable and flat-bottom groups"],
  ["CBB61 Terminal", "#product-gallery", "Insert terminal type"],
  ["CBB65 Dual", "#product-gallery", "Dual capacitor and packaging"],
  ["Other Groups", "#product-gallery", "Additional grouped products"],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: companyName,
        brand: {
          "@type": "Brand",
          name: brandName,
          alternateName: "华佑星",
        },
        url: siteUrl,
        sameAs: [alibabaUrl],
        email,
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Xingtai City",
          addressRegion: "Hebei Province",
          addressCountry: "CN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: phone,
            email,
            areaServed: "Worldwide",
            availableLanguage: ["English", "Chinese"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Huayouxing Capacitors",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "ItemList",
        name: "Huayouxing capacitor product series",
        itemListElement: productFamilies.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/products/${product.slug}`,
          name: product.title,
        })),
      },
    ],
  };

  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Huayouxing Shengjin home">
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
        <ClickSpark
          className="navigation-click-spark"
          sparkColor="#b9eff4"
          sparkCount={8}
          sparkRadius={20}
          sparkSize={10}
        >
          <nav>
          <a href="#home">Home</a>
          <div className="nav-product-menu">
            <a className="nav-product-trigger" href="#products">
              Products
            </a>
            <div className="product-submenu" aria-label="Product model groups">
              {productMenuItems.map(([label, href, note]) => (
                <a href={href} key={`${label}-${href}`}>
                  <span>{label}</span>
                  <small>{note}</small>
                </a>
              ))}
            </div>
          </div>
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
          </nav>
        </ClickSpark>
      </header>

      <ClickSpark sparkColor="#a6f5ff" sparkRadius={34}>
        <section className="hero" id="home">
        <div className="hero-grid">
          <span className="hero-watermark" aria-hidden="true">
            HUAYOUXING
          </span>
          <div className="hero-copy">
            <p className="eyebrow">Huayouxing brand capacitor manufacturer</p>
            <ScrollFloat
              as="h1"
              animationDuration={1}
              containerClassName="hero-split-title"
              ease="back.inOut(2)"
              playOnLoad
              scrollEnd="bottom bottom-=40%"
              scrollStart="center bottom+=50%"
              stagger={0.045}
            >
              Explore high-grade capacitor possibilities.
            </ScrollFloat>
            <p>
              {companyName} presents the
              Huayouxing brand portfolio covering CBB60, CBB61, CBB65 and CD60
              capacitor series for appliance, HVAC, pump and motor applications.
            </p>
          </div>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#inquiry">
              Send Inquiry
            </a>
            <a
              className="button button-secondary"
              href={alibabaUrl}
              target="_blank"
              rel="noreferrer"
            >
              Alibaba Storefront
            </a>
          </div>
        </div>
        <div className="hero-strip" aria-label="Featured product families">
          <span>CBB60</span>
          <span>CBB61</span>
          <span>CBB65</span>
          <span>CD60</span>
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="intro-band">
        <div className="section two-column">
          <div>
            <p className="eyebrow">Foreign trade display</p>
            <h2>Reliable Capacitor Supply for Global Buyers.</h2>
          </div>
          <p>
            The website keeps original product labels, trademarks and parameter
            text visible in supplied materials. Specific capacitance, voltage,
            tolerance, dimensions and certification files should be confirmed
            against the buyer inquiry, sample label and final quotation.
          </p>
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="section" id="products">
        <div className="section-heading">
          <p className="eyebrow">Product Center</p>
          <h2>Four core capacitor series for OEM, service and distribution orders.</h2>
        </div>
        <div className="product-grid">
          {productFamilies.map((product) => (
            <article className="product-card" key={product.code}>
              <div className="product-media" aria-label={`${product.code} visual material`}>
                {product.media?.type === "image" ? (
                  <img
                    src={product.media.src}
                    alt={`${product.code} original product material`}
                    data-replaceable-image={product.media.slot}
                  />
                ) : (
                  <span>{product.code}</span>
                )}
              </div>
              <div className="product-body">
                <span className="product-code">{product.code}</span>
                <h3>{product.title}</h3>
                <strong>{product.role}</strong>
                <p>{product.use}</p>
                <p>{product.structure}</p>
                <a className="text-link" href={`/products/${product.slug}`}>
                  View {product.code} details
                </a>
              </div>
            </article>
          ))}
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="section capacitance-section" id="specifications">
          <CapacitanceSelector />
        </section>
      </ClickSpark>

      <ClickSpark sparkColor="#c9f2f6" sparkRadius={34}>
        <section className="media-band" aria-label="Core product category material">
        <div className="section media-grid">
          <div>
            <p className="eyebrow">Core category display</p>
            <h2>Huayouxing capacitor product imagery covers the main export series.</h2>
            <p>
              The category display presents CBB65, CBB60, CBB61 and CD60
              references together for overseas buyers. Product labels, brand
              marks and electrical data remain in the image materials and
              should be checked directly when quoting.
            </p>
          </div>
          <div className="material-panel" aria-label="Huayouxing capacitor category image">
            <img
              className="material-main"
              src="/products/integrated/film-capacitor-series-hero.png"
              alt="Huayouxing CBB60, CBB61, CBB65 and CD60 category display"
              data-replaceable-image="product-category-overview"
            />
          </div>
        </div>
        </section>
      </ClickSpark>

      <LaserFlowGallery />

      <ClickSpark sparkColor="#aa7a2b" sparkRadius={32}>
        <section className="factory-band" id="factory">
        <div className="section">
          <div className="section-heading">
            <p className="eyebrow">Factory Strength</p>
            <h2>Documented factory profile for motor capacitor production.</h2>
          </div>
          <div className="factory-fact-grid" aria-label="Factory profile data">
            {factoryFacts.map((fact) => (
              <article className="factory-fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </article>
            ))}
          </div>
          <div className="strength-grid">
            {factoryStrengths.map((item) => (
              <article className="strength-card" key={item.title}>
                <span>{item.metric}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="factory-gallery" aria-label="Factory display photos">
            {factoryImages.map((image) => (
              <figure className="factory-photo" data-image-slot={image.slot} key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  data-replaceable-image={image.slot}
                  loading="lazy"
                />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
          <FactoryVideoGallery />
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="section quality-section" id="quality">
        <div className="quality-overview">
          <div className="quality-copy">
            <p className="eyebrow">Quality Certification</p>
            <h2>Quality review from material intake to shipment confirmation.</h2>
            <p>
              Certification and compliance documents should be matched to the
              exact product model, destination market and buyer specification.
              Supplied CBB60 product imagery includes visible conformity marking;
              final files are confirmed during quotation and sample review.
            </p>
          </div>
          <ol className="quality-list">
            {qualitySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="certificate-documents">
          <div className="certificate-heading">
            <p className="eyebrow">Certificate Documents</p>
            <h3>RoHS and LVD compliance attestations.</h3>
            <p>
              The documents below apply to evaluated submitted samples. Refer
              to each signed certificate and its associated test report for
              full conditions and product scope.
            </p>
          </div>
          <div className="certificate-grid">
            {certifications.map((certificate) => (
              <a
                className="certificate-card"
                href={certificate.pdf}
                key={certificate.key}
                target="_blank"
                rel="noreferrer"
              >
                <div className="certificate-preview">
                  <img src={certificate.preview} alt={certificate.alt} loading="lazy" />
                </div>
                <div className="certificate-card-copy">
                  <span className="certificate-badge">{certificate.badge}</span>
                  <h4>{certificate.title}</h4>
                  <dl className="certificate-meta">
                    <div>
                      <dt>Certificate No.</dt>
                      <dd>{certificate.certificateNumber}</dd>
                    </div>
                    <div>
                      <dt>Directive / standard</dt>
                      <dd>{certificate.reference}</dd>
                    </div>
                    <div>
                      <dt>Test report</dt>
                      <dd>{certificate.testReport}</dd>
                    </div>
                    <div>
                      <dt>Issued</dt>
                      <dd>{certificate.issued}</dd>
                    </div>
                  </dl>
                  <p className="certificate-scope">{certificate.scope}</p>
                  <span className="certificate-open">View signed PDF</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="applications-band" id="applications">
        <div className="section">
          <div className="section-heading compact">
            <p className="eyebrow">Application Scenarios</p>
            <h2>Series-specific applications from the supplied product profile.</h2>
          </div>
          <div className="application-grid">
            {applicationProfiles.map((application) => (
              <article className="application-card" key={application.code}>
                <strong>{application.code}</strong>
                <p>{application.title}</p>
              </article>
            ))}
          </div>
        </div>
        </section>
      </ClickSpark>

      <ClickSpark>
        <section className="section about-section" id="about">
        <div>
          <p className="eyebrow">About Us</p>
          <h2>{companyName}</h2>
        </div>
        <div className="about-copy">
          <p>
            Established in 2015, {companyName} develops and supplies Huayouxing
            brand capacitor products for overseas appliance, HVAC, pump, fan
            and motor customers.
          </p>
          <p>
            The company focuses on practical B2B cooperation: clear model
            confirmation, sample checking, OEM label discussion, packaging
            coordination and export quotation support through direct contact or
            Alibaba International.
          </p>
        </div>
        </section>
      </ClickSpark>

      <ClickSpark sparkColor="#b9eff4" sparkRadius={32}>
        <section className="contact-band" id="contact">
        <div className="section contact-grid">
          <div>
            <p className="eyebrow">Contact Us</p>
            <h2>Send your capacitor requirement for factory confirmation.</h2>
            <p>
              For faster response, include product series, capacitance, rated
              voltage, tolerance, dimensions, terminal style, label requirement
              and estimated order quantity.
            </p>
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
              <a href={alibabaUrl} target="_blank" rel="noreferrer">
                <span>Alibaba</span>
                hbsjcapacitor.en.alibaba.com
              </a>
            </address>
          </div>

          <form
            className="inquiry-form"
            id="inquiry"
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
          >
            <p className="eyebrow">Inquiry Form</p>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Company
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label>
              Product series
              <select name="series" defaultValue="CBB65">
                <option>CBB60</option>
                <option>CBB61</option>
                <option>CBB65</option>
                <option>CD60</option>
                <option>Multiple series</option>
              </select>
            </label>
            <label>
              Requirement details
              <textarea
                name="requirement"
                rows={5}
                placeholder="Capacitance, rated voltage, tolerance, shell size, terminal style, label artwork and target quantity"
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Prepare Email Inquiry
            </button>
          </form>
        </div>
        </section>
      </ClickSpark>
    </main>
  );
}
