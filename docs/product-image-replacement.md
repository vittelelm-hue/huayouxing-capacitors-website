# Product Image Replacement Slots

The product areas use fixed image files. To replace an image, overwrite the matching file and keep the same filename.

## Homepage Hero

The homepage hero currently uses a text-only dark technology layout. No standalone product image is rendered in the hero.

## Core Category Display

- `public/products/integrated/film-capacitor-series-hero.png`

This image appears in the dark core category display section as the integrated CBB60, CBB61, CBB65 and CD60 display.

## Product Center and Product Detail Pages

- `public/products/integrated/cbb60-series.png`
- `public/products/integrated/cbb61-series.png`
- `public/products/integrated/cbb65-series.png`
- `public/products/integrated/cd60-series.png`

These four images are reused in the Product Center cards and the corresponding product detail pages.

Current display choices:

- `cbb60-series.png` uses a white-background CBB60 cable product group.
- `cbb61-series.png` uses a CBB61 insert terminal product group.
- `cbb65-series.png` uses a CBB65 dual capacitor display with packaging boxes.
- `cd60-series.png` uses the CD60 start capacitor product group.

## Main Product Gallery

Replace any of these files to update the multi-series product gallery:

- `public/products/showcase/cbb65-dual-01.jpg`
- `public/products/showcase/cbb65-dual-02.jpg`
- `public/products/showcase/cbb65-metal-01.png`
- `public/products/showcase/cbb60-cable-flat-01.png`
- `public/products/showcase/cbb60-wire-flat-01.png`
- `public/products/showcase/cbb60-cable-screw-01.png`
- `public/products/showcase/cbb61-wire-01.png`
- `public/products/showcase/cbb61-wire-02.png`
- `public/products/showcase/cbb61-terminal-01.png`
- `public/products/showcase/cd60-01.png`
- `public/products/showcase/cd60-02.png`

The older `public/products/cbb60/cbb60-01.jpg` through `public/products/cbb60/cbb60-18.jpg` files are preserved as source material, but the homepage gallery now uses the multi-series files above.

Recommended image format:

- Use PNG for integrated series images if the current file is PNG
- Use JPG or PNG to match the current gallery file extension
- Keep replacement images under 1 MB when possible
- Do not rename files unless the website code is updated

After replacing product image files, ask Codex to publish the site again.
