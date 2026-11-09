/* ============================================================
   Category page - category.html?brand=...&id=...
   ------------------------------------------------------------
   Deployed site: forwards to the static page tools/build.mjs made.
   Unbuilt source folder: renders the same markup from js/pages.js.
   ============================================================ */

const q       = new URLSearchParams(window.location.search);
const brandId = q.get('brand') || 'dahua';
const catId   = q.get('id');
const brand   = BRANDS.find(b => b.id === brandId);
const group   = brand && brand.groups.find(g => g.slug === catId);

if (LALLA_BUILT && brand && group) {
  location.replace(categoryUrl(brand.id, group.slug) + location.hash);
} else {
  mountChrome('products');
  const root   = document.getElementById('cat-root');
  const subnav = document.getElementById('subnav-slot');

  if (!brand || !group) {
    subnav.remove();
    setNoIndex();
    root.innerHTML = `
      <section class="section center"><div class="wrap">
        <p class="t-eyebrow">404</p>
        <h1 class="t-headline">ไม่พบหมวดสินค้านี้</h1>
        <div class="cta-row" style="justify-content:center;">
          <a class="link link-lg" href="index.html#brands">ดูสินค้าทั้งหมด</a>
        </div>
      </div></section>`;
    initReveal();
  } else {
    /* De-duplicated: the scraped data lists a few models twice. */
    const models = uniqueModels(m => m.brand === brandId && m.group === catId);

    document.title = SEO.categoryTitle(brand, group, models.length);
    setPageMeta({ title: document.title, description: SEO.categoryDescription(brand, group, models.length) });
    lallaTrack('category_view', { brand: brand.id, category: group.slug, models: models.length });

    subnav.outerHTML = PAGES.categorySubnav(brand, group);
    root.innerHTML = PAGES.categoryMain(brand, group, models);
    initReveal();
    initScrollSpy('.subnav-links a');
  }
}
