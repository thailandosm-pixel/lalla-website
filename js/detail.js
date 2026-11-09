/* ============================================================
   Product detail - product.html?id=...
   ------------------------------------------------------------
   On the deployed site every product has its own static page
   (tools/build.mjs), so this script only forwards old ?id= links
   there. When the source folder is opened without building, it
   renders the same markup from js/pages.js instead.
   ============================================================ */

const pid   = new URLSearchParams(window.location.search).get('id');
const rich  = (typeof products !== 'undefined')
  ? products.find(p => p.id === pid && !p.placeholder) : null;
const model = (typeof MODELS !== 'undefined') ? MODELS.find(m => m.id === pid) : null;

if (LALLA_BUILT && (rich || model)) {
  location.replace(productUrl(pid, rich ? 'dahua' : model.brand) + location.hash);
} else {
  mountChrome('products');
  const root   = document.getElementById('detail-root');
  const subnav = document.getElementById('subnav-slot');

  if (!rich && !model) {
    subnav.remove();
    setNoIndex();
    root.innerHTML = `
      <section class="section center"><div class="wrap">
        <p class="t-eyebrow">404</p>
        <h1 class="t-headline">ไม่พบสินค้าที่คุณค้นหา</h1>
        <div class="cta-row" style="justify-content:center;">
          <a class="link link-lg" href="index.html#brands">ดูสินค้าทั้งหมด</a>
        </div>
      </div></section>`;
    initReveal();

  } else if (rich) {
    document.title = SEO.richTitle(rich);
    setPageMeta({ title: document.title, description: rich.heroLead || rich.subtitle, image: rich.coverImage });
    lallaTrack('product_view', { model: rich.name, brand: 'dahua', group: rich.category, featured: true });

    subnav.outerHTML = PAGES.richSubnav(rich);
    root.innerHTML = PAGES.richMain(rich);
    wireQuoteButton(rich.name, MODELS.filter(x => x.group === 'Display--Control').slice(0, 6).map(x => x.model));
    wireSpecsToggle();
    initReveal();
    initScrollSpy('.subnav-links a');

  } else {
    const brand = BRANDS.find(b => b.id === model.brand);
    const group = brand && brand.groups.find(g => g.slug === model.group);
    const related = relatedModels(model, 4);

    document.title = SEO.productTitle(model, brand, group);
    setPageMeta({ title: document.title, description: SEO.productDescription(model, brand, group), image: model.img });
    lallaTrack('product_view', { model: model.model, brand: model.brand, group: model.group, has_specs: !!model.nSpecs });

    subnav.outerHTML = PAGES.productSubnav(model, brand, group);
    root.innerHTML = PAGES.productMain(model, brand, group, related);
    mountSpecs(model);
    wireQuoteButton(model.model, related.map(r => r.model));
    initReveal();
    initScrollSpy('.subnav-links a');
  }
}

/* Specs live in js/specs/<specKey>.js - pulled in on demand. */
function mountSpecs(m) {
  const mount = document.getElementById('specs-mount');
  const render = () => {
    const payload = (window.SPECS && window.SPECS[m.specKey] || {})[m.id];
    mount.innerHTML = specsBlock(payload).html;
    wireSpecsToggle();
    initReveal(mount);
  };
  if (!m.specKey || (window.SPECS && window.SPECS[m.specKey])) { render(); return; }
  const tag = document.createElement('script');
  tag.src = `js/specs/${m.specKey}.js`;
  tag.onload = render;
  tag.onerror = render;
  document.body.appendChild(tag);
}
