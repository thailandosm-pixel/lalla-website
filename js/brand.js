/* ============================================================
   Brand page - brand.html?id=...
   ------------------------------------------------------------
   Deployed site: forwards to the static page tools/build.mjs made.
   Unbuilt source folder: renders the same markup from js/pages.js.
   ============================================================ */

const brandId = new URLSearchParams(window.location.search).get('id');
const brand   = BRANDS.find(b => b.id === brandId);

if (LALLA_BUILT && brand) {
  location.replace(brandUrl(brand.id) + location.hash);
} else {
  mountChrome('partnership');
  const root   = document.getElementById('brand-root');
  const subnav = document.getElementById('subnav-slot');

  if (!brand) {
    subnav.remove();
    setNoIndex();
    root.innerHTML = `
      <section class="section center"><div class="wrap">
        <p class="t-eyebrow">404</p>
        <h1 class="t-headline">ไม่พบแบรนด์นี้</h1>
        <div class="cta-row" style="justify-content:center;">
          <a class="link link-lg" href="index.html#brands">ดูแบรนด์ทั้งหมด</a>
        </div>
      </div></section>`;
    initReveal();
  } else {
    document.title = SEO.brandTitle(brand);
    setPageMeta({ title: document.title, description: SEO.brandDescription(brand) });
    lallaTrack('brand_view', { brand: brand.id });

    subnav.outerHTML = PAGES.brandSubnav(brand);
    root.innerHTML = PAGES.brandMain(brand, DEALER_BRANDS);
    initReveal();
    initScrollSpy('.subnav-links a');
  }
}
