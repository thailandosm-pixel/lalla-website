# Lalla × Dahua · Samsung · MAXHUB — Website

Static site with one build step, run automatically on every push.

```
node tools/build.mjs                     # writes _site/ - what is deployed
python3 -m http.server 8000 -d _site     # preview exactly what goes live
```

Serving the source folder directly (`python3 -m http.server 8000`) still
works too: pages render in the browser from the same templates, with the
older `product.html?id=` style links. Use `_site/` to see the real thing.

## How it is built and deployed

Every push to `main` runs `.github/workflows/deploy.yml`:

1. **Build** - `tools/build.mjs` copies the site into `_site/` and writes a
   **static HTML page for every product, category and brand**
   (`dahua-ipc-hfw3841t-zas-s2.html`, `dahua-network-cameras.html`,
   `dahua.html` …) with its real content, a Thai title and description,
   a canonical URL and structured data, plus `sitemap.xml`.
2. **Check** - every page template is loaded at desktop and phone width;
   the run fails on a JavaScript error, a page that did not render, or an
   accessibility (WCAG 2.1 AA) violation.
3. **Deploy** - only if both pass. A broken change never goes live; the
   site stays on the last good version.

Why static pages: before this, every product page was an empty shell that
said "กำลังโหลด…" until JavaScript filled it in, and all 700+ had the same
title. Search engines saw nothing to index.

**Rules that keep this working**

- Page markup lives **once**, in `js/pages.js`. Both the build and the
  in-browser pages use it - edit it there, never by hand in `_site/`.
- Build every internal link through `js/urls.js` (`productUrl`,
  `categoryUrl`, `brandUrl`) - never write `product.html?id=` yourself.
- Thai search terms per category are in `SEO_TERMS` at the top of
  `js/pages.js`. Keep them accurate and without the brand name (the build
  rejects a repeat).
- Service pages (ห้องเรียนอัจฉริยะ, รับติดตั้งจอ, ติดตั้งกล้องวงจรปิด, จอ interactive)
  are written in `js/landing.js`. Use ordinary `product.html?id=` /
  `category.html?...` links there - the build rewrites them and fails if
  any target does not exist. Only write claims that are true for Lalla.
- Adding products needs no extra step: add them to `js/models.js` (and
  `js/brands.js` counts), push, and their pages are generated.
- `_site/` is build output - never commit it.
- `*.md`, `tools/`, `_generator/` and `v1-original/` are never published.

## Page flow

```
index.html                        Home — hero, 3 brand cards, featured
                                  products, works, support, contact
  └─ brand.html?id=<brand>        Brand page — that brand's product groups
       └─ category.html?brand=&id= Group page — every product, with photos
            └─ product.html?id=   Product detail — photo + specs

work.html?id=<project>            Project reference detail — hero, facts, gallery
brands.html                       All brands — 3 dealer brands + 14 we source
```

Click a brand → its groups. Click a group → all its products with pictures.
Click a product → the detail page.

## Files

```
css/style.css        Design system — tokens at the top
js/brands.js         ← BRANDS + their product groups (counts, icons, Thai names)
js/models.js         ← 732 products (Dahua 639, Samsung 61, MAXHUB 30, iMin 2)
js/specs/<key>.js    Full spec tables for every brand, loaded on demand
                     (dahua-<group>.js, samsung.js, maxhub.js, imin.js)
js/featured.js       ← the products shown on the home page
js/works.js          ← PROJECT REFERENCES (6 projects + photo sets)
js/brandlist.js      Renders brands.html
js/products.js       Hand-authored rich products (DHI-PHRIA2.5-PL)
js/pages.js          ← PAGE TEMPLATES + Thai SEO terms (shared by build and browser)
js/urls.js           Every internal URL; flips to static URLs in the build
js/static.js         Behaviour for the generated static pages
js/home.js  brand.js  category.js  detail.js  app.js
tools/build.mjs      The build - writes _site/
assets/products*/    Product photos (WebP)
_generator/          The scrapers used to build the data (reference only)
v1-original/         The first draft, kept intact
```

## Where the data came from

| Brand | Source | Products | Full specs stored locally |
| --- | --- | --- | --- |
| Dahua | dahuasecurity.com/th/Products, display.dahuasecurity.com | 639 (23 categories) | 622 |
| Samsung | samsung.com/th/business/smart-signage | 61 | 61 |
| MAXHUB | maxhub.com/us, maxhub.com/en | 30 | 13 + 17 with feature copy |
| iMin (sourced via SiS) | imin.com/products | 2 | 2 |

**698 of 732 products carry a full spec table on this site**; 715 carry
substantive content.

The 63 models added on 2026-10-29 were chosen from the **SiS Distribution
(Thailand) price book, October 2026** (sisthai.com → Pricebook), so every one
is stocked in Thailand. They are flagship and entry-level picks per category,
not the full SiS list. Nothing is fetched from the manufacturers at view time —
every spec, image and description is stored in this folder.

The 17 Dahua and 12 MAXHUB products without a spec table are ones where the
manufacturer publishes none (project-only SKUs, software, marketing pages).
Those pages show the manufacturer's own description and feature list instead.

Photos were downloaded and converted to WebP (28.5MB → 3.4MB for Dahua).
Samsung/MAXHUB images are auto-trimmed so products fill their cards.

Specs are grouped into the manufacturer's own sections (Display, Connectivity,
Power, Mechanical …) and collapse behind a "show all" button. Product pages
still carry a reference link to the manufacturer and the datasheet PDF where
one exists, but no information depends on it.

## Company profile content

Copy, contact details and project references come from
`Slide present/deck/Lalla-Company-Profile.pdf` (the deck's HTML source in
`Slide present/deck/index.html` was used, since it holds the same text).

Added to the site from it:

- **About** — Nonthaburi-based display and systems integrator, authorised
  dealer for Dahua / Samsung / MAXHUB
- **Capabilities** — the 10 "Product Expert" categories (LED, Signage,
  Interactive Board, TV, Projector, Meeting, CCTV, Security, Queue Kiosk,
  Lighting)
- **How We Work** — the 8 steps (Survey → Training)
- **Our Project Reference** — 6 projects, each with its own page:

| Project | Product | Detail |
| --- | --- | --- |
| Sacred Heart College, Chiang Mai | Outdoor LED | 11.00 × 6.00 m · 66.00 sq.m |
| Saint Louis College, Bangkok | Indoor LED | 6.40 × 3.84 m · 24.58 sq.m |
| Shrine of Blessed Nicholas Bunkerd Kitbamrung | Laser Projector | Sampran, Nakhon Pathom |
| Saint Gabriel's College | Queueing Machine | SG Lounge |
| Mahidol University | Lighting hoist | Stage & auditorium |
| KIS International School | Lighting studio hoist | School theatre |

- **Brands** — a fourth "More Brands" card on the home page opens
  `brands.html`, which separates the **3 authorised dealer brands** (with full
  catalogues on this site) from the **14 brands we source on request**
  (Logitech, Ricoh, Panasonic, LG, Hikvision, Hisense, Dell, Lenovo, ASUS,
  Acer, Xiaomi, Brother, Canon, Nikon). Edit them in `MORE_BRANDS` in
  `js/brands.js`. They render as typographic wordmarks — the deck ships no
  logo files for them.
- **Contact** — office address in Pakkret, both contacts
  (คุณ นิจรินทร์ กิจสกุล 081-491-3538, คุณ อภิชาติ กิจสกุล 086-667-7800)
  and lallath2002@gmail.com

Project photos are in `assets/works/` (25 images, from the deck's
`assets/projects/`). Edit projects in `js/works.js`.

## Empty categories

Seven Dahua categories (PT Cameras, Video Conferencing, Software, Security
Screening, Kits, Dahua Memory, Discontinued) list **no products on Dahua's own
site** — their pages return "not found" in the Thai, English and global
locales alike. They were removed rather than shown as "0 รุ่น".

`brand.js` and `category.js` also filter out any group whose `count` is 0, so a
future empty group can never surface as an empty tile.

## No outbound brand links

Product, category and brand pages carry **no links to the manufacturers'
websites**. Every spec, image and description is served from this folder.

The one exception is the datasheet **PDF download** on Dahua product pages,
which still points at Dahua's document CDN. Those are ~370 files; say the word
and they can be mirrored locally too.

## Editing

**Featured products on the home page** — `js/featured.js`. Any `id` from
`js/models.js` works, plus the hand-authored `dhi-phria2-5-pl`.

**Our Works** — `js/home.js`, the `WORKS` array (currently empty, showing
6 placeholder boxes). `WORK_SLOTS` sets how many placeholders follow.

**Adding a brand** — add an entry to `BRANDS` in `js/brands.js` with its
`groups`, then add its products to `MODELS` in `js/models.js` with a matching
`brand` and `group`. Brands with no `logo` render a typographic wordmark
(styled in `css/style.css` under `.wordmark-<id>`).

**Re-scraping** — the scripts in `_generator/` rebuild the data files.

## Typography

- **Thai** — FC Iconic (Fontcraft), self-hosted in `assets/fonts/`.
- **English** — SF Pro via `-apple-system`, Apple's own system typeface.

The `@font-face` rules restrict FC Iconic to the Thai unicode block
(`U+0E00–0E7F`), so both scripts resolve from a single font stack.

> **License note:** FC Iconic is free for non-commercial use. Commercial use
> requires a 500 THB license from Fontcraft (f0nt.com/release/fc-iconic).
> As this is a company website, that license should be purchased.

## Two versions

| Version | Open | Notes |
| --- | --- | --- |
| **v2 — current** | `index.html` | Apple-style, three brands |
| **v1 — first draft** | `v1-original/index.html` | Preserved as-is |
