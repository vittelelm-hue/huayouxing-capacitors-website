import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Huayouxing foreign trade homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /HUAYOUXING/);
  assert.match(html, /Hebei Shengjin Electronic Technology Co\., Ltd\./);
  assert.match(html, /Product Center/);
  assert.match(html, /Available capacitance and rated voltage\./);
  assert.match(html, /4 uF/);
  assert.match(html, /200 uF/);
  assert.match(html, /450V AC/);
  assert.match(html, /Product model groups/);
  assert.match(html, /CBB60 Cable/);
  assert.match(html, /CBB61 Terminal/);
  assert.match(html, /CBB65 Dual/);
  assert.match(html, /Other Groups/);
  assert.match(html, /Factory Strength/);
  assert.match(html, /3,000 m2/);
  assert.match(html, /Approx\. 20,000/);
  assert.match(html, /Dedicated series test equipment/);
  assert.match(html, /North America, the Middle East, Central Asia and South America/);
  assert.match(html, /Factory Display 01/);
  assert.match(html, /\/factory\/factory-01\.jpg/);
  assert.match(html, /\/factory\/factory-06\.jpg/);
  assert.match(html, /data-replaceable-image="factory-01"/);
  assert.match(html, /Factory Process Video/);
  assert.match(html, /Manufacturing line overview/);
  assert.match(html, /Film winding machine/);
  assert.match(html, /CBB65 packaging process/);
  assert.match(html, /\/factory\/videos\/manufacturing-line-overview\.mp4/);
  assert.match(html, /factory-video-action/);
  assert.match(html, /aria-label="Play Manufacturing line overview"/);
  assert.match(html, /<video/);
  assert.match(html, /muted=""/);
  assert.match(html, /preload="metadata"/);
  assert.doesNotMatch(html, /<video[^>]*autoplay/);
  assert.ok((html.match(/click-spark-canvas/g) ?? []).length >= 11);
  assert.match(html, /navigation-click-spark/);
  assert.match(html, /Quality Certification/);
  assert.match(html, /RoHS Certificate of Compliance/);
  assert.match(html, /LVD Certificate of Compliance/);
  assert.match(html, /HS260617658/);
  assert.match(html, /HS260617659/);
  assert.match(html, /\/certificates\/huayouxing-rohs-certificate\.pdf/);
  assert.match(html, /\/certificates\/huayouxing-lvd-certificate\.pdf/);
  assert.match(html, /Application Scenarios/);
  assert.match(html, /Inquiry Form/);
  assert.match(html, /CBB60/);
  assert.match(html, /CBB61/);
  assert.match(html, /CBB65/);
  assert.match(html, /CD60/);
  assert.match(html, /mailto:sjcapacitor@gmail\.com/);
  assert.match(html, /\+86 18830952397/);
  assert.match(html, /Xingtai City, Hebei Province/);
  assert.match(html, /Factory Address/);
  assert.match(html, /wa\.me\/8618830952397/);
  assert.match(html, /<option selected="">CBB65<\/option>/);
  assert.doesNotMatch(html, /cnhbsjcapacitor@outlook\.com/);
  assert.doesNotMatch(html, /\+86 186 1742 9713/);
  assert.doesNotMatch(html, /\+86 152 2731 0665/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /\/products\/cbb60/);
  assert.match(html, /\/huayouxing-logo\.jpg/);
  assert.match(html, /Explore high-grade capacitor possibilities\./);
  assert.match(html, /hero-split-title/);
  assert.match(html, /scroll-float/);
  assert.match(html, /Reliable Capacitor Supply for Global Buyers\./);
  assert.match(html, /Series-specific applications from the supplied product profile\./);
  assert.match(html, /Fan, range hood and motor-start applications/);
  assert.doesNotMatch(html, /Built for buyers who need stable specifications and clear factory communication\./);
  assert.doesNotMatch(html, /split-parent/);
  assert.doesNotMatch(html, /split-char/);
  assert.doesNotMatch(html, /intro-scroll-copy/);
  assert.doesNotMatch(html, /Unit Price/);
  assert.doesNotMatch(html, /MOQ/);
  assert.doesNotMatch(html, /USD/);
  assert.match(html, /\/products\/integrated\/film-capacitor-series-hero\.png/);
  assert.match(html, /data-replaceable-image="product-series-cbb60"/);
  assert.match(html, /data-replaceable-image="product-category-overview"/);
  assert.match(html, /data-replaceable-image="product-gallery-cbb65-dual-01"/);
  assert.match(html, /data-replaceable-image="product-gallery-cbb60-cable-flat-01"/);
  assert.match(html, /data-replaceable-image="product-gallery-cbb61-wire-01"/);
  assert.match(html, /data-replaceable-image="product-gallery-cd60-01"/);
  assert.match(html, /laser-gallery-band/);
  assert.match(html, /laser-flow-container/);
  assert.doesNotMatch(html, /hero-product-side/);
  assert.doesNotMatch(html, /hero-showcase-image/);
  assert.doesNotMatch(html, /hero-showcase-reflection/);
  assert.doesNotMatch(html, /home-hero-cbb65-dual/);
  assert.doesNotMatch(html, /material-detail/);
});

test("server-renders indexable product detail pages", async () => {
  const primaryImageSlots = {
    cbb60: "detail-cbb60-primary",
    cbb61: "detail-cbb61-primary",
    cbb65: "detail-cbb65-primary",
    cd60: "detail-cd60-primary",
  };

  for (const series of ["cbb60", "cbb61", "cbb65", "cd60"]) {
    const response = await render(`/products/${series}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /HUAYOUXING/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, new RegExp(series, "i"));
    assert.match(html, new RegExp(`data-replaceable-image="${primaryImageSlots[series]}"`));
    assert.match(html, /Send Inquiry/);
    assert.match(html, /Actual product views and connection styles\./);

    if (series === "cbb60") {
      assert.match(html, /4 uF/);
      assert.match(html, /200 uF/);
      assert.match(html, /450V AC/);
      assert.match(html, /Yellow resin U-base terminal style/);
      assert.match(html, /Cable lead without red sleeves/);
    }

    if (series === "cbb61") {
      assert.match(html, /Red and black lead wire type/);
      assert.match(html, /0\.8 uF/);
      assert.match(html, /Terminal type/);
      assert.match(html, /Red and black lead wire styles/);
    }

    if (series === "cbb65") {
      assert.match(html, /Single capacitor/);
      assert.match(html, /Combination capacitor/);
      assert.match(html, /80\+5 uF/);
      assert.match(html, /Combination capacitors with individual packaging/);
      assert.match(html, /Capacitor core reference/);
    }

    if (series === "cd60") {
      assert.match(html, /Huayouxing CD60 blue cable lead start capacitor/);
      assert.match(html, /Terminal style/);
    }

    assert.doesNotMatch(html, /Unit Price/);
    assert.doesNotMatch(html, /MOQ/);
    assert.doesNotMatch(html, /USD/);
  }
});

test("exposes Google crawl files", async () => {
  const robots = await render("/robots.txt");
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /User-Agent: \*/i);
  assert.match(robotsText, /Allow: \//i);
  assert.match(robotsText, /Sitemap: https:\/\/huayouxing-capacitors\.vittelelm\.chatgpt\.site\/sitemap\.xml/i);

  const sitemap = await render("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /https:\/\/huayouxing-capacitors\.vittelelm\.chatgpt\.site/);
  assert.match(sitemapText, /\/products\/cbb60/);
  assert.match(sitemapText, /\/products\/cbb61/);
  assert.match(sitemapText, /\/products\/cbb65/);
  assert.match(sitemapText, /\/products\/cd60/);
});

test("starter preview content is no longer shipped", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /codex-preview|SkeletonPreview|Your site is taking shape/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(css, /react-loading-skeleton|sites-skeleton/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});

test("keeps supplied product media available", async () => {
  const cbb60Images = await readdir(new URL("../public/products/cbb60/", import.meta.url));
  assert.equal(cbb60Images.filter((file) => /^cbb60-\d{2}\.jpg$/.test(file)).length, 18);

  await Promise.all([
    access(new URL("../public/products/cbb60/cbb60-01.jpg", import.meta.url)),
    access(new URL("../public/products/cbb60/cbb60-14.jpg", import.meta.url)),
    access(new URL("../public/products/integrated/film-capacitor-series-hero.png", import.meta.url)),
    access(new URL("../public/products/integrated/cbb60-series.png", import.meta.url)),
    access(new URL("../public/products/integrated/cbb61-series.png", import.meta.url)),
    access(new URL("../public/products/integrated/cbb65-series.png", import.meta.url)),
    access(new URL("../public/products/integrated/cd60-series.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb65-dual-01.jpg", import.meta.url)),
    access(new URL("../public/products/showcase/cbb65-dual-02.jpg", import.meta.url)),
    access(new URL("../public/products/showcase/cbb65-metal-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb60-cable-flat-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb60-wire-flat-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb60-cable-screw-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb61-wire-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb61-wire-02.png", import.meta.url)),
    access(new URL("../public/products/showcase/cbb61-terminal-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cd60-01.png", import.meta.url)),
    access(new URL("../public/products/showcase/cd60-02.png", import.meta.url)),
    access(new URL("../public/products/details/cbb60/terminal-run.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb60/yellow-resin-u-base.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb60/cable-without-red-sleeve.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb61/dual-terminal.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb61/red-black-wire.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb65/dual-capacitor.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb65/dual-packaging.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb65/single-capacitor.jpg", import.meta.url)),
    access(new URL("../public/products/details/cbb65/capacitor-core-reference.jpg", import.meta.url)),
    access(new URL("../public/products/details/cd60/blue-cable.jpg", import.meta.url)),
    access(new URL("../public/products/details/cd60/cable-style.jpg", import.meta.url)),
    access(new URL("../public/products/details/cd60/terminal-style.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-01.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-02.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-03.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-04.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-05.jpg", import.meta.url)),
    access(new URL("../public/factory/factory-06.jpg", import.meta.url)),
    access(new URL("../public/factory/videos/manufacturing-line-overview.mp4", import.meta.url)),
    access(new URL("../public/factory/videos/film-winding-machine.mp4", import.meta.url)),
    access(new URL("../public/factory/videos/film-slitting-machine.mp4", import.meta.url)),
    access(new URL("../public/factory/videos/core-insulation-pad.mp4", import.meta.url)),
    access(new URL("../public/factory/videos/cbb65-packaging.mp4", import.meta.url)),
    access(new URL("../public/huayouxing-logo.jpg", import.meta.url)),
    access(new URL("../public/certificates/huayouxing-rohs-certificate.pdf", import.meta.url)),
    access(new URL("../public/certificates/huayouxing-rohs-certificate.png", import.meta.url)),
    access(new URL("../public/certificates/huayouxing-lvd-certificate.pdf", import.meta.url)),
    access(new URL("../public/certificates/huayouxing-lvd-certificate.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
  ]);
});
