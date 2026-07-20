"use client";

import { type PointerEvent, useRef } from "react";

import { gallery } from "../site";
import LaserFlow from "./LaserFlow";

function GalleryContent() {
  return (
    <>
      <div className="section-heading compact">
        <p className="eyebrow">Main Product Gallery</p>
        <h2>Multiple product series for buyer-side model comparison.</h2>
      </div>
      <div className="gallery-grid">
        {gallery.map((image) => (
          <figure className="gallery-item" key={image.src}>
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
    </>
  );
}

export default function LaserFlowGallery() {
  const revealRef = useRef<HTMLDivElement>(null);

  const updateReveal = (event: PointerEvent<HTMLElement>) => {
    const reveal = revealRef.current;
    if (!reveal) {
      return;
    }

    const rect = reveal.getBoundingClientRect();
    reveal.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    reveal.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const clearReveal = () => {
    const reveal = revealRef.current;
    if (!reveal) {
      return;
    }

    reveal.style.setProperty("--mx", "-9999px");
    reveal.style.setProperty("--my", "-9999px");
  };

  return (
    <section
      className="laser-gallery-band"
      id="product-gallery"
      onPointerLeave={clearReveal}
      onPointerMove={updateReveal}
    >
      <LaserFlow
        className="laser-gallery-flow"
        color="#9af6ff"
        decay={0.97}
        falloffStart={0.79}
        flowStrength={0.14}
        fogFallSpeed={0.34}
        fogIntensity={0.12}
        horizontalBeamOffset={0.08}
        horizontalSizing={0.9}
        mouseSmoothTime={0.08}
        verticalSizing={2.35}
        wispDensity={0.7}
        wispIntensity={2.2}
        wispSpeed={11.5}
      />
      <div className="laser-gallery-stage">
        <div className="section laser-gallery-content laser-gallery-dim">
          <GalleryContent />
        </div>
        <div
          aria-hidden="true"
          className="section laser-gallery-content laser-gallery-reveal"
          ref={revealRef}
        >
          <GalleryContent />
        </div>
      </div>
    </section>
  );
}
