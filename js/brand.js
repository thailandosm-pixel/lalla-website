/* ============================================================
   Brand page — one partner brand and its product groups
   ============================================================ */

mountChrome('partnership');

const brandId = new URLSearchParams(window.location.search).get('id');
const brand   = BRANDS.find(b => b.id === brandId);
const root    = document.getElementById('brand-root');
const subnav  = document.getElementById('subnav-slot');

if (!brand) {
  subnav.remove();
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

  document.title = `${brand.name} — ${brand.tagline} | Lalla ลัลลา`;

  const total = brand.groups.reduce((n, g) => n + (g.count || 0), 0);

  subnav.outerHTML = `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="index.html#brands">${esc(brand.name)}</a>
        <div class="subnav-links">
          <a href="#groups">หมวดสินค้า</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;

  root.innerHTML = `
    <section class="hero brand-hero">
      <div class="wrap hero-copy">
        <span class="brand-hero-mark">${brandMark(brand)}</span>
        <p class="t-eyebrow">${esc(brand.tagline)}</p>
        <h1 class="t-display">${esc(brand.nameTh)}</h1>
        <p class="t-lead th">${esc(brand.blurb)}</p>
        <div class="cta-row">
          <a class="link link-lg" href="#groups">ดูหมวดสินค้า</a>
          <a class="link link-lg" href="tel:0814913538">ขอใบเสนอราคา</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="groups">
      <div class="wrap-wide">
        <div class="series-head reveal">
          <h2 class="t-title">หมวดสินค้า</h2>
          <span class="t-small">${brand.groups.length} หมวด · ${total} รุ่น</span>
        </div>
        <div class="cat-grid">
          ${brand.groups.filter(g => g.count).map(g => `
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

    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">แบรนด์อื่นที่เราเป็นตัวแทน</h2>
          <a class="link" href="index.html#brands">ดูทั้งหมด</a>
        </div>
        <div class="brand-grid">
          ${BRANDS.filter(b => b.id !== brand.id).map(b => `
            <a class="brand-card reveal" href="brand.html?id=${encodeURIComponent(b.id)}">
              <span class="brand-mark">${brandMark(b)}</span>
              <span class="brand-tag">${esc(b.tagline)}</span>
              <span class="brand-blurb th">${esc(b.blurb)}</span>
              <span class="brand-meta">
                <span>${b.groups.length} หมวด</span><span class="brand-go">›</span>
              </span>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">สนใจสินค้า ${esc(brand.name)}?</h2>
          <p class="th">
            แจ้งรุ่นหรือลักษณะงานที่ต้องการ เราช่วยเลือกและเสนอราคาให้<br />
            <strong>คุณ นิจรินทร์ กิจสกุล</strong> — บริษัท ลัลลา (ประเทศไทย) จำกัด
          </p>
          <div class="contact-actions">
            <a class="btn btn-primary" href="tel:0814913538">โทร. 081-491-3538</a>
            <a class="btn btn-ghost" href="index.html#brands">ดูแบรนด์อื่น</a>
          </div>
        </div>
      </div>
    </section>`;

  initReveal();
  initScrollSpy('.subnav-links a');
}
