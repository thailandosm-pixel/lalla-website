# Lalla × Dahua · Samsung · MAXHUB — Website

Static site. No build step. Open `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

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
js/models.js         ← 667 products (Dahua 598, Samsung 48, MAXHUB 21)
js/specs/<key>.js    Full spec tables for every brand, loaded on demand
                     (dahua-<group>.js, samsung.js, maxhub.js)
js/featured.js       ← the products shown on the home page
js/works.js          ← PROJECT REFERENCES (6 projects + photo sets)
js/brandlist.js      Renders brands.html
js/products.js       Hand-authored rich products (DHI-PHRIA2.5-PL)
js/home.js  brand.js  category.js  detail.js  app.js
assets/products*/    Product photos (WebP)
_generator/          The scrapers used to build the data (reference only)
v1-original/         The first draft, kept intact
```

## Where the data came from

| Brand | Source | Products | Full specs stored locally |
| --- | --- | --- | --- |
| Dahua | dahuasecurity.com/th/Products | 598 (22 categories) | 581 |
| Samsung | samsung.com/th/business/smart-signage | 48 | 48 |
| MAXHUB | maxhub.com/us | 21 | 9 + 12 with feature copy |

**638 of 667 products carry a full spec table on this site**; 650 carry
substantive content. Nothing is fetched from the manufacturers at view time —
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
