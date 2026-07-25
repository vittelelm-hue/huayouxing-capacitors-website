import { alibabaUrl, whatsapp } from "../site";

const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

export default function FloatingContactLinks() {
  return (
    <nav className="floating-contact-links" aria-label="Quick contact links">
      <a
        className="floating-contact-link floating-contact-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Huayouxing on WhatsApp"
      >
        <span aria-hidden="true">WA</span>
        <strong>WhatsApp</strong>
      </a>
      <a
        className="floating-contact-link floating-contact-alibaba"
        href={alibabaUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit the Huayouxing Alibaba storefront"
      >
        <span aria-hidden="true">A</span>
        <strong>Alibaba Store</strong>
      </a>
    </nav>
  );
}
