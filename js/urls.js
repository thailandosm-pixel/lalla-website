/* ============================================================
   Internal URLs
   ------------------------------------------------------------
   Every link to a product, category or brand page is built here,
   so there is exactly one place that knows the URL scheme.

   Two schemes exist:

   - Built site (what is deployed): each item has its own static
     HTML file with real, crawlable content, e.g.
       /dahua-ipc-hfw3841t-zas-s2.html
       /dahua-network-cameras.html
       /dahua.html
     tools/build.mjs generates those files and flips LALLA_BUILT
     to true in the copy of this file it publishes.

   - Source tree (opening the repo folder locally without building):
     the original JavaScript pages, e.g. product.html?id=...
     LALLA_BUILT stays false here, so local previews keep working.

   Loaded by the browser as a plain script, and by tools/build.mjs
   inside a Node vm - so: no DOM access at load time.
   ============================================================ */

const LALLA_BUILT = false;   /* tools/build.mjs rewrites this line to true */

function slugify(s) {
  return String(s).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* dahua + "ipc-hfw3841t-zas-s2" -> "dahua-ipc-hfw3841t-zas-s2"
   samsung + "samsung-wa86f"     -> "samsung-wa86f" (already prefixed) */
function productSlug(id, brand) {
  const s = slugify(id);
  const b = slugify(brand || '');
  return b && !s.startsWith(b + '-') ? `${b}-${s}` : s;
}
function categorySlug(brand, group) { return slugify(`${brand}-${group}`); }
function brandSlug(brand)           { return slugify(brand); }

function productUrl(id, brand) {
  return LALLA_BUILT ? `${productSlug(id, brand)}.html`
                     : `product.html?id=${encodeURIComponent(id)}`;
}
function categoryUrl(brand, group) {
  return LALLA_BUILT ? `${categorySlug(brand, group)}.html`
                     : `category.html?brand=${encodeURIComponent(brand)}&id=${encodeURIComponent(group)}`;
}
function brandUrl(brand) {
  return LALLA_BUILT ? `${brandSlug(brand)}.html`
                     : `brand.html?id=${encodeURIComponent(brand)}`;
}
/* Service pages exist only as built static files (js/landing.js). */
function landingUrl(slug) { return `${slugify(slug)}.html`; }
function workUrl(id) {
  return `work.html?id=${encodeURIComponent(id)}`;
}
