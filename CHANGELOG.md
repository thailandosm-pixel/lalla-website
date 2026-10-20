# Changelog — lallathailand.com

A running log of what changed on the site, newest first. Kept so there is a
record outside of git history and outside any one chat.

Live site: https://lallathailand.com · Repo: thailandosm-pixel/lalla-website

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
