# Changelog — lallathailand.com

A running log of what changed on the site, newest first. Kept so there is a
record outside of git history and outside any one chat.

Live site: https://lallathailand.com · Repo: thailandosm-pixel/lalla-website

---

## 2026-11-09 — Service pages for the words customers actually search

Model-number pages are easy to rank but almost nobody searches model numbers.
Customers search for what they need done. Four new pages target those words,
each with real Thai content, a FAQ, and structured data (Service + FAQPage +
BreadcrumbList):

| Page | Targets |
|---|---|
| `smart-classroom.html` | ห้องเรียนอัจฉริยะ, จอ interactive ห้องเรียน, กระดานอัจฉริยะ, สื่อการเรียนการสอนอิเล็กทรอนิกส์ |
| `interactive-display.html` | จอ interactive, จอสัมผัส, จออินเตอร์แอคทีฟ (Dahua / Samsung / MAXHUB compared) |
| `screen-installation.html` | รับติดตั้งจอ, ติดตั้งจอ LED, วิดีโอวอลล์, ป้ายดิจิทัล |
| `cctv-installation.html` | ติดตั้งกล้องวงจรปิด, รับติดตั้งกล้องวงจรปิด, กล้องวงจรปิดครบวงจร |

Content comes only from Lalla's own facts: the catalogue (e.g. Dahua LPH
65/75/86″ boards at 37 / 51 / 64 kg, Android 15, 32-point touch), the
company profile (authorised dealer, own crew nationwide, the 8-step process)
and the real projects. Claims were checked against the data and four
overstatements fixed before publishing. No prices, warranty lengths or
"free survey" - those wait for the owner (YOUR-TASKS.md, task 10).

Linked from: a new **บริการของเรา** section right after the home-page hero,
a new **บริการ** footer column (on every page), and a "บริการที่เกี่ยวข้อง"
line on all 762 related product and category pages.

Content lives in `js/landing.js`; the template is `PAGES.landing` in
`js/pages.js`. The build now also checks every internal link and image on
every page (20,514 across 777 pages) and fails on any broken one - verified
by injecting a typo'd product id.

---

## 2026-11-09 — Every product is now a real, searchable page

**The problem.** Every product, category and brand page was an empty shell:
before JavaScript ran, all 700+ product pages had the title `Product | Lalla
ลัลลา`, the same description, and a body reading `กำลังโหลด…`. Google can run
JavaScript, but for a new, low-authority domain it does so late and
selectively - so to a search engine the catalogue was essentially invisible.

**The fix: a build step.** `tools/build.mjs` now writes a static HTML page for
each item - **726 product pages, 36 category pages, 4 brand pages** - with:

- the full content in the HTML itself (a typical product: ~5,500 characters of
  text and its whole spec table, readable without JavaScript)
- a Thai title built from what people search, e.g.
  `Dahua IPC-HFW3841T-ZAS-S2 กล้องวงจรปิด IP | สอบถามราคา — Lalla`,
  `กล้องวงจรปิด IP Dahua 75 รุ่น | สเปก ติดตั้ง สอบถามราคา — Lalla`
- a Thai description, and a Thai summary paragraph on the page itself
- a canonical URL with brand and model in it (`/dahua-ipc-hfw3841t-zas-s2.html`)
- structured data: `Product` + `BreadcrumbList` on products,
  `CollectionPage` + `ItemList` on categories
- a sitemap of all 774 URLs

Thai search terms per category (กล้องวงจรปิด IP, จอ LED, จอสัมผัส, ป้ายดิจิทัล,
เครื่องสแกนใบหน้า, EV Charger …) are kept in `SEO_TERMS` in `js/pages.js`.

**Home page.** New title leading with กล้องวงจรปิด / จอ LED / จอสัมผัส, and a new
**ค้นหาสินค้าตามประเภท** section: 22 plain links, worded as people search,
straight from the strongest page on the site to every category. On phones
it swipes like the other sections.

**One template, two users.** Page markup moved into `js/pages.js`, used by
both the build and the in-browser pages - so they cannot drift. Opening the
source folder without building still works. All internal links go through
`js/urls.js`; old `product.html?id=` links forward to the new pages
(keeping any `#specs` anchor).

**Faster.** Static product pages no longer load the 387 KB catalogue file.

**Deploy is now gated.** `.github/workflows/deploy.yml` builds, then loads
every page template at desktop and phone width, and deploys only if there is
no JavaScript error, no unrendered page and no accessibility violation.

That last part fixes a real gap. On 2026-10-21 a change of mine made every
category page throw before rendering (`models` read before it was defined),
and they stayed on "กำลังโหลด…" until another session fixed it on 2026-10-26.
The old check passed it - a page stuck on a loading message has no
accessibility violations. The new gate was tested against that exact bug and
fails on it.

**No longer published:** `YOUR-TASKS.md`, `CHANGELOG.md` and `README.md` were
publicly readable at lallathailand.com/YOUR-TASKS.md etc. The build excludes
`*.md`, `tools/`, `_generator/` and the archived `v1-original/`.

**Checked:** 10,011 internal links across 773 pages, 0 broken, 0 missing
images; 20 page/viewport combinations pass the gate.

---

## 2026-10-29 — 63 products from the SiS Thailand price book

Checked against **SiS Distribution (Thailand)**: its category pages list
Dahua, Samsung and MAXHUB under LED Signage / LFD / E-Board, and its October
2026 price book lists the exact models it stocks. Only models in that price
book were added, and only ones not already on the site. Per category: the
flagship models plus the entry-level / lowest-priced ones, not the whole list.

Each has its own product page in the existing template — photo, description,
grouped spec table and datasheet link — taken from the manufacturer's own site.

| Brand | Category | Added |
| --- | --- | --- |
| Samsung | UHD 4K signage | QB43C, QB55C, QM43C, QM55C, QM65C, QH55C, QH65C, SH37C |
| Samsung | Interactive display | WM55B, WM75F, WA65F-P, WA75F-P |
| Samsung | Video wall | VM46B-U |
| MAXHUB | Interactive flat panel | XBoard V7 Series, E3 Series, U4 Series |
| MAXHUB | Direct View LED | Raptor Series V3, Raptor Series V3 Lite |
| MAXHUB | Audio & Video | XBar U50, V50, V70, W70 |
| Dahua | Display & Control | PHMIA108-CC, PHMIA135-CF (all-in-one LED); LDH43/55/65-LAI400L, LDV55/65-SAI400L, LDV43/55-SAI400TL (signage) |
| Dahua | Interactive Whiteboards | LPH65-MC480-U, LPH65/75/86-ST420, PKC-MS0A stand, PKP-IP1A pen, PKP-WP1B dongle |
| Dahua | Network Cameras | IPC-HDW8441X-3D, IPC-MFW5241T2-E3-ASE |
| Dahua | DE64 | IPC-HFW1230C-A |
| Dahua | PTZ Cameras | SD3D216NB-GNY |
| Dahua | **Wireless Products (new category)** | IPC-HFW1339DTK1-SAW-IL, IPC-HFW1539DTK1-SAW-IL, P3AS-PV, P5AS-PV |
| Dahua | HDCVI Cameras | HAC-HFW1200RM-IL-T, HAC-HFW1200TLM-IL-T, HAC-HFW1500TLM-IL-T, HAC-HDW1500TLM-IL-A, HAC-HFW1249X-A-PRO, HAC-HDW1249X-A-PRO, HAC-HFW1549X-A-PRO |
| Dahua | Network Recorders | NVR4116HS-4KS3, NVR4216-4KS3, NVR4104HS-P-4KS3, NVR4108HS-8P-4KS3, NVR4208-8P-4KS3, NVR4216-16P-4KS3 |
| Dahua | Transmission | CS4006-4ET2GT-60 |
| Dahua | Access Control | ASI3204E-W |
| Dahua | Video Intercom | VTH5341G-W, VTH5321GB-W |

**Left out on purpose:** SiS models the manufacturer now lists as discontinued
(NVR1108HS-W-S2, VTO2211G-WP, HAC-HFW1200R-Z-A), Samsung models with no page
on samsung.com/th (QB24C, QM32C, WM65B), and SiS items with no manufacturer
spec page (Dahua LCS-K4/K6 LED controllers, PHEIA2.5-TH, IFS-LIA2.5S-C module,
PKC-MS2E stand). Samsung LED / The Wall is not in the SiS price book, so none
was added. Prices are not shown on the site.

MAXHUB XBar and Raptor Series V3 pages publish no spec table, so those five
show MAXHUB's product overview and feature list instead, like the existing
MAXHUB marketing-page products.

Category counts, the sitemap (773 URLs) and the README totals are updated.

---

## 2026-10-26 — iMin self-service kiosks + category page fix

**iMin Heron 1 (23.8") and Heron 1 mini (15.6")** added, with photos and full
spec tables (39 and 40 rows), from imin.com. iMin is the kiosk brand carried
by SiS Distribution (Thailand).

iMin is **sourced, not an authorised dealership**, so it is flagged
`sourced: true` in `js/brands.js`. It has its own brand, category and product
pages, but it is kept off the dealer brand cards (home page, brands page,
"other brands") and shows first in the "แบรนด์ที่จัดหาให้" grid, linked to
its catalogue. Both kiosks appear in the featured products, right after
the Samsung KM24C-5 kiosk. Sitemap updated.

**Fix:** every category page (`category.html`) was stuck on "กำลังโหลด…".
`category.js` logged the analytics event using `models` one line before
it was defined, which threw an error and stopped the page. The event now
fires after the list is built.

---

## 2026-10-21 — "คุณรู้จักเราจากที่ไหน?"

Added an optional referral-source field at the end of the quote form:
Google / LINE / เพื่อนแนะนำ / เคยใช้บริการ / Facebook / อื่น ๆ.

Deliberately **not required** — a mandatory extra field costs more leads than
the answer is worth. Skipped answers arrive as "(ไม่ได้ระบุ)".

The answer flows three ways: into the quote email you receive, into the
plain-text body, and into the `quote_submit` analytics event as `heard_from`,
so it can be counted over time once a provider is connected.

At your lead volume this beats any analytics tool for one specific question —
*which channel actually produces customers* — because it is self-reported by
real buyers rather than inferred from a referrer header, and it survives
people who refuse cookies.

---

## 2026-10-21 — Consent banner + analytics layer

**Consent (PDPA).** The site previously set no cookies at all and had no
consent mechanism. Added a real consent gate, not a notice:

- Bottom bar on first visit, in Thai, with **ปฏิเสธ** and **ยอมรับ** the same
  size and side by side — under PDPA refusing must be as easy as accepting
- The choice is remembered in `localStorage` (strictly necessary, needs no
  consent of its own) and can be changed from **การตั้งค่าคุกกี้** in the footer
- Refuse, and nothing that tracks is ever fetched

**Analytics.** Added a provider-agnostic event layer so tracking can be
switched on without rewriting anything. Nothing is sent until consent is
given; events raised before that are buffered and flushed on accept, or
dropped on refuse.

Events now captured:

| Event | Why it matters |
|---|---|
| `page_view` | traffic, referrer |
| `product_view` | which models get attention |
| `brand_view`, `category_view`, `work_view` | what people browse |
| `phone_click` | **a tap-to-call is a lead, and was invisible** |
| `email_click`, `datasheet_click`, `outbound_click` | other intent signals |
| `quote_open` | started a quote request |
| `quote_validation_error` | which field blocked them |
| `quote_abandoned` | **opened the form and gave up, with fields filled** |
| `quote_submit` / `quote_submit_failed` | conversions and failures |
| `scroll_depth`, `swipe_row_used` | how far they read, phone engagement |

**No provider is connected yet**, so every event is a no-op today. To turn one
on: fill a value in `ANALYTICS` at the top of `js/analytics.js`, and add that
provider's domain to the `Content-Security-Policy` in every `.html` head
(`script-src` and `connect-src`) or the browser will block it.
Add `?debug=analytics` to any URL to watch events in the console.

---

## 2026-10-20 — Bug audit, round 2

- **Tap targets**: 20 controls were under 32px on a phone. Hit areas grown
  with padding and pulled back with equal negative margin, so nothing moved.
  Burger 33×24 → 41×36, ribbon link 17px → 51px. Now 0 under 32px.
- **Soft 404s**: unknown `?id=` returned HTTP 200 and was indexable. Those
  states now set `noindex, follow` and drop the canonical.
- **404.html added**: unknown paths now return a real HTTP 404 with site
  chrome. Its script is external (`js/notfound.js`) because an inline one
  would be blocked by our own `script-src 'self'`.
- **Sub-nav listed sections that may not render** — `#highlights` and
  `#gallery` are conditional, so a product without them got dead links.
- Removed `liveProducts()` / `productSlots()`, defined and never called.

## 2026-10-20 — Bug audit, round 1

- **Quote CTA was untappable on phones.** On product pages the green
  สอบถามราคา button sat in a horizontally scrolling strip with a hidden
  scrollbar, pushed up to 121px off-screen by the model name. Now pinned to
  the right edge of that strip.
- **Dead footer link** — `index.html#partnership` pointed at an id that does
  not exist. Now `#brands`, matching the nav.
- **Duplicate product cards** — DE64 Compliance showed 33 cards for 26
  products. De-duplicated, and the stored count corrected.

## 2026-10-16 — Phone layout

Home page was ~16 phone screens of vertical scrolling. The six card sections
became horizontal swipe rows: **12,896px → 6,716px**, about 8 screens. Cards
are sized at 58–84% width so the next one peeks in; a hint line sits above
each row. Desktop and tablet untouched.

## 2026-10-15 — Quote form actually sends

The form built a `mailto:` link and showed the green "sent" panel
unconditionally. With no mail client configured the request vanished and the
customer was told it had gone through. It now POSTs to Web3Forms and only
claims success when the API confirms. Reply-to is the customer, so Reply in
Gmail answers them. Honeypot added.

## 2026-10-09 — EngineeringScore remediation

14 of 19 findings fixed. Contrast (two CSS variables were the root cause, plus
white-on-green buttons at 2.55:1 that the scan missed), canonical links, Open
Graph + share image, JSON-LD, robots.txt, 705-URL sitemap, CSP,
Referrer-Policy, hero image 839 KB → 66 KB, Dependabot, and an axe-core CI gate
over 7 templates at two viewport widths.

Four findings are impossible on GitHub Pages (HSTS, X-Content-Type-Options,
X-Frame-Options, Permissions-Policy) — they need HTTP response headers, which
only something like Cloudflare in front of the site can add.

## 2026-09-17 — Domain live

`lallathailand.com` connected to GitHub Pages, HTTPS enforced, `www` and the
old github.io address both redirecting to the apex.

## 2026-09-16 — Catalogue site published

667-model catalogue (Dahua / Samsung / MAXHUB) with brand, category, product,
works and quote pages.

---

## Conventions

- Every change goes through git: edit → test → commit → push. GitHub Pages
  rebuilds in about a minute.
- The accessibility CI gate runs on every push and must stay green.
- Owner tasks that need a login, a payment or a decision live in
  [YOUR-TASKS.md](YOUR-TASKS.md).
