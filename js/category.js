/* ============================================================
   Category page — every product in one brand's product group
   ============================================================ */

mountChrome('products');

const q       = new URLSearchParams(window.location.search);
const brandId = q.get('brand') || 'dahua';
const catId   = q.get('id');
const brand   = BRANDS.find(b => b.id === brandId);
const group   = brand && brand.groups.find(g => g.slug === catId);
const root    = document.getElementById('cat-root');
const subnav  = document.getElementById('subnav-slot');

if (!brand || !group) {
  subnav.remove();
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

  document.title = `${group.nameTh || group.name} — ${brand.name} | Lalla ลัลลา`;

  const models = MODELS.filter(m => m.brand === brandId && m.group === catId);

  /* Bucket by series so long lists stay readable */
  const buckets = new Map();
  models.forEach(m => {
    const k = m.seriesTitle || m.series || '';
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(m);
  });

  const card = (m) => `
    <a class="mcard reveal" href="product.html?id=${encodeURIComponent(m.id)}">
      <span class="mcard-media">
        ${m.img ? `<img src="${esc(m.img)}" alt="${esc(m.model)}" loading="lazy" />`
                : `<span class="mcard-noimg">ไม่มีรูป</span>`}
      </span>
      <span class="mcard-name">${esc(m.model)}</span>
      ${m.desc ? `<span class="mcard-desc">${esc(m.desc)}</span>` : ''}
      <span class="mcard-go">ดูรายละเอียด ›</span>
    </a>`;

  const blocks = [...buckets.entries()].map(([title, list]) => `
    <section class="series-block">
      ${title ? `
        <div class="series-block-head reveal">
          <h3 class="t-title">${esc(title)}</h3>
          <span class="t-small">${list.length} รุ่น</span>
        </div>` : ''}
      <div class="mgrid">${list.map(card).join('')}</div>
    </section>`).join('');

  subnav.outerHTML = `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="brand.html?id=${encodeURIComponent(brand.id)}">${esc(brand.name)}</a>
        <div class="subnav-links">
          <a href="#products">${esc(group.name)}</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;

  root.innerHTML = `
    <section class="hero cat-hero">
      <div class="wrap hero-copy">
        <span class="cat-hero-icon">${icon(group.icon)}</span>
        <p class="t-eyebrow">
          <a href="brand.html?id=${encodeURIComponent(brand.id)}" class="crumb">${esc(brand.name)}</a>
          · ${esc(group.name)}
        </p>
        <h1 class="t-display">${esc(group.nameTh || group.name)}</h1>
        ${group.blurb ? `<p class="t-lead th">${esc(group.blurb)}</p>` : ''}
        <div class="cta-row">
          <a class="link link-lg" href="#products">ดูสินค้า ${models.length} รุ่น</a>
          <a class="link link-lg" href="tel:0814913538">ขอใบเสนอราคา</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="products">
      <div class="wrap-wide">
        ${models.length ? blocks : `
          <p class="t-body th center">ยังไม่มีรายการสินค้าในหมวดนี้</p>`}
        <p class="series-note t-small th reveal">
          ข้อมูลรุ่นและรูปภาพอ้างอิงจากเอกสารของ ${esc(brand.name)}
          — ติดต่อเราเพื่อสอบถามราคาและสต็อกสินค้าในประเทศไทย
        </p>
      </div>
    </section>

    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">หมวดอื่นของ ${esc(brand.name)}</h2>
          <a class="link" href="brand.html?id=${encodeURIComponent(brand.id)}">ดูทั้งหมด</a>
        </div>
        <div class="cat-grid">
          ${brand.groups.filter(g => g.slug !== group.slug && g.count).slice(0, 8).map(g => `
            <a class="cat-card reveal" href="category.html?brand=${encodeURIComponent(brand.id)}&id=${encodeURIComponent(g.slug)}">
              <span class="cat-icon">${icon(g.icon)}</span>
              <span class="cat-body">
                <span class="cat-name">${esc(g.nameTh || g.name)}</span>
                <span class="cat-name-en">${esc(g.name)}</span>
              </span>
              <span class="cat-count">${g.count} รุ่น</span>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">สนใจสินค้าในหมวดนี้?</h2>
          <p class="th"><strong>คุณ นิจรินทร์ กิจสกุล</strong> — บริษัท ลัลลา (ประเทศไทย) จำกัด</p>
          <div class="contact-actions">
            <a class="btn btn-primary" href="tel:0814913538">โทร. 081-491-3538</a>
            <a class="btn btn-ghost" href="brand.html?id=${encodeURIComponent(brand.id)}">ดูหมวดอื่น</a>
          </div>
        </div>
      </div>
    </section>`;

  initReveal();
  initScrollSpy('.subnav-links a');
}
