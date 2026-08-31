/* ============================================================
   Product detail
   Handles both the hand-authored products in products.js and
   the 667 scraped models in models.js (Dahua / Samsung / MAXHUB).
   ============================================================ */

mountChrome('products');

const pid    = new URLSearchParams(window.location.search).get('id');
const root   = document.getElementById('detail-root');
const subnav = document.getElementById('subnav-slot');

const rich  = (typeof products !== 'undefined')
  ? products.find(p => p.id === pid && !p.placeholder) : null;
const model = (typeof MODELS !== 'undefined') ? MODELS.find(m => m.id === pid) : null;

if (!rich && !model) {
  subnav.remove();
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
  renderRich(rich);

} else {
  renderModel(model);
}

/* ============================================================
   Scraped model
   ============================================================ */
function renderModel(m) {
  const brand = BRANDS.find(b => b.id === m.brand);
  const group = brand && brand.groups.find(g => g.slug === m.group);
  document.title = `${m.model} — ${brand ? brand.name : ''} | Lalla ลัลลา`;

  subnav.outerHTML = `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="${group
            ? `category.html?brand=${encodeURIComponent(m.brand)}&id=${encodeURIComponent(m.group)}`
            : `brand.html?id=${encodeURIComponent(m.brand)}`}">${esc(m.model)}</a>
        <div class="subnav-links">
          <a href="#overview">ภาพรวม</a>
          <a href="#specs">ข้อมูลจำเพาะ</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;

  const crumb = [
    brand ? `<a class="crumb" href="brand.html?id=${encodeURIComponent(m.brand)}">${esc(brand.name)}</a>` : '',
    group ? `<a class="crumb" href="category.html?brand=${encodeURIComponent(m.brand)}&id=${encodeURIComponent(m.group)}">${esc(group.name)}</a>` : ''
  ].filter(Boolean).join(' · ');

  const related = MODELS
    .filter(x => x.brand === m.brand && x.group === m.group && x.id !== m.id && x.img)
    .slice(0, 4);

  root.innerHTML = `
    <section class="hero product-hero" id="overview">
      <div class="wrap hero-copy">
        <p class="t-eyebrow">${crumb}</p>
        <h1 class="t-display">${esc(m.model)}</h1>
        ${m.desc ? `<p class="t-lead th">${esc(m.desc)}</p>` : ''}
        <div class="cta-row">
          <a class="link link-lg" href="#specs">ดูข้อมูลจำเพาะ</a>
          <a class="link link-lg" href="tel:0814913538">ขอใบเสนอราคา</a>
        </div>
      </div>
      ${m.img ? `<div class="hero-stage"><img src="${esc(m.img)}" alt="${esc(m.model)}" /></div>` : ''}
    </section>

    <section class="section" id="specs">
      <div class="wrap">
        <div class="specs-head reveal">
          <div>
            <p class="t-eyebrow">Tech Specs</p>
            <h2 class="t-title">ข้อมูลจำเพาะ</h2>
          </div>
          ${m.datasheet ? `<a class="link" href="${esc(m.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลด PDF</a>` : ''}
        </div>
        <div id="specs-mount"><p class="t-body th">กำลังโหลดข้อมูลจำเพาะ…</p></div>
      </div>
    </section>

    ${related.length ? `
    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">รุ่นอื่นในหมวดเดียวกัน</h2>
          <a class="link" href="category.html?brand=${encodeURIComponent(m.brand)}&id=${encodeURIComponent(m.group)}">ดูทั้งหมด</a>
        </div>
        <div class="mgrid">
          ${related.map(r => `
            <a class="mcard reveal" href="product.html?id=${encodeURIComponent(r.id)}">
              <span class="mcard-media"><img src="${esc(r.img)}" alt="${esc(r.model)}" loading="lazy" /></span>
              <span class="mcard-name">${esc(r.model)}</span>
              <span class="mcard-go">ดูรายละเอียด ›</span>
            </a>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <section class="section">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">สนใจรุ่นนี้?</h2>
          <p class="th">ปรึกษาผู้เชี่ยวชาญเพื่อประเมินหน้างานและใบเสนอราคา<br />
            <strong>${esc(SITE.company)}</strong></p>
          <div class="contact-actions">
            ${SITE.contacts.map(c => `<a class="btn" href="${c.href}">โทร. ${c.phone}</a>`).join('')}
            <a class="btn" href="mailto:${SITE.email}">อีเมล</a>
            <button type="button" class="btn" id="quoteBtn">ขอใบเสนอราคา</button>
          </div>
          <div class="contact-detail">
            <p>${SITE.contacts.map(c => `${esc(c.name)} ${esc(c.phone)}`).join(' &nbsp;·&nbsp; ')}</p>
            <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          </div>
        </div>
      </div>
    </section>`;

  mountSpecs(m);

  const qb = document.getElementById('quoteBtn');
  if (qb) qb.addEventListener('click', () => openQuote({
    product: m.model,
    related: related.map(r => r.model)
  }));

  initReveal();
  initScrollSpy('.subnav-links a');
}

/* Specs live in js/specs/<specKey>.js — pull the file in on demand. */
function mountSpecs(m) {
  const mount = document.getElementById('specs-mount');

  const render = () => {
    const payload = (window.SPECS && window.SPECS[m.specKey] || {})[m.id];
    const sections = (payload && payload.sections) || [];
    const total = sections.reduce((n, s) => n + s.items.length, 0);

    if (!total) {
      // No published spec table — show whatever descriptive content we have.
      const feats = (payload && payload.features) || [];
      const paras = (payload && payload.paras) || [];
      if (feats.length || paras.length) {
        mount.innerHTML = `
          ${paras.length ? `<div class="panel reveal" style="margin-bottom:18px;">
            ${paras.map(t => `<p class="t-body th" style="margin-bottom:12px;">${esc(t)}</p>`).join('')}
          </div>` : ''}
          ${feats.length ? `<div class="panel reveal">
            <p class="feat-header">คุณสมบัติ</p>
            <ul class="feat-list">${feats.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
          </div>` : ''}`;
      } else {
        mount.innerHTML = `<p class="t-body th">ยังไม่มีตารางข้อมูลจำเพาะของรุ่นนี้
          — ติดต่อเราเพื่อขอเอกสารทางเทคนิค โทร. 081-491-3538</p>`;
      }
      initReveal(mount);
      return;
    }

    mount.innerHTML = `
      <div class="specset specs-collapsed" id="specsGrid">
        ${sections.map(sec => `
          <section class="specset-block">
            <h3 class="specset-title">${esc(sec.section)}</h3>
            <dl class="specs-grid">
              ${sec.items.map(it => `
                <div class="spec-row"><dt>${esc(it.label)}</dt><dd>${esc(it.value)}</dd></div>`).join('')}
            </dl>
          </section>`).join('')}
      </div>
      <div class="specs-toggle">
        <button class="btn btn-ghost" id="specsToggle" aria-expanded="false" aria-controls="specsGrid">
          ดูข้อมูลจำเพาะทั้งหมด (${total} รายการ)
        </button>
      </div>`;

    const grid = document.getElementById('specsGrid');
    const btn  = document.getElementById('specsToggle');
    btn.addEventListener('click', () => {
      const collapsed = grid.classList.toggle('specs-collapsed');
      btn.textContent = collapsed
        ? `ดูข้อมูลจำเพาะทั้งหมด (${total} รายการ)` : 'ย่อรายการ';
      btn.setAttribute('aria-expanded', String(!collapsed));
      if (collapsed) grid.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  };

  if (!m.specKey) { render(); return; }
  if (window.SPECS && window.SPECS[m.specKey]) { render(); return; }
  const tag = document.createElement('script');
  tag.src = `js/specs/${m.specKey}.js`;
  tag.onload = render;
  tag.onerror = render;
  document.body.appendChild(tag);
}

/* ============================================================
   Hand-authored product (products.js)
   ============================================================ */
function renderRich(product) {
  document.title = `${product.name} — ${product.subtitle} | Lalla ลัลลา`;

  const sections = [
    { id: 'overview',   label: 'ภาพรวม' },
    { id: 'highlights', label: 'จุดเด่น' },
    { id: 'gallery',    label: 'แกลเลอรี' },
    { id: 'specs',      label: 'Tech Specs' }
  ];

  subnav.outerHTML = `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="index.html#featured">${esc(product.name)}</a>
        <div class="subnav-links">
          ${sections.map(s => `<a href="#${s.id}">${s.label}</a>`).join('')}
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;

  const heroImg = (product.images && product.images[0]) || product.coverImage;

  const specRows = product.specs.map(s => `
    <div class="spec-row"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('');

  root.innerHTML = `
    <section class="hero hero-dark" id="overview">
      <div class="wrap hero-copy">
        <p class="t-eyebrow">${esc(product.category)}</p>
        <h1 class="t-display">${esc(product.name)}</h1>
        <p class="t-lead th">${esc(product.heroLead || product.subtitle)}</p>
        <div class="cta-row">
          <a class="link link-lg" href="#specs">ดูสเปกทั้งหมด</a>
          ${product.datasheet ? `<a class="link link-lg" href="${esc(product.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลดโบรชัวร์</a>` : ''}
        </div>
      </div>
      ${heroImg ? `<div class="hero-stage"><img src="${esc(heroImg)}" alt="${esc(product.name)}" /></div>` : ''}
    </section>

    ${product.keyStats && product.keyStats.length ? `
    <section class="section-tight" style="padding-top:64px;">
      <div class="wrap"><div class="stats reveal">
        ${product.keyStats.map(s => `
          <div class="stat"><div class="stat-num">${esc(s.num)}<sup>${esc(s.unit)}</sup></div>
          <div class="stat-label">${esc(s.label)}</div></div>`).join('')}
      </div></div>
    </section>` : ''}

    ${product.highlights && product.highlights.length ? `
    <section class="section-tight" id="highlights">
      <div class="wrap-wide"><header class="reveal" style="margin-bottom:30px;">
        <h2 class="t-title">จุดเด่นของรุ่นนี้</h2></header></div>
      <div class="hl-row">
        ${product.highlights.map(h => `
          <article class="hl-card">
            <div class="hl-card-icon">${icon(h.icon)}</div>
            <h3 class="hl-card-title">${esc(h.title)}</h3>
            <p class="hl-card-body th">${esc(h.body)}</p>
          </article>`).join('')}
      </div>
    </section>` : ''}

    ${product.descriptionHtml ? `
    <section class="section bg-alt">
      <div class="wrap"><div class="panel reveal">${product.descriptionHtml}</div></div>
    </section>` : ''}

    ${product.showcaseImage ? `
    <section class="section" id="gallery">
      <div class="wrap-wide"><div class="showcase reveal">
        <img src="${esc(product.showcaseImage)}" alt="${esc(product.name)}" />
        ${product.showcaseTitle ? `
          <div class="showcase-caption">
            <h2 class="t-title">${esc(product.showcaseTitle)}</h2>
            <p class="t-body th" style="max-width:56ch;margin:0 auto;">${esc(product.showcaseText || '')}</p>
          </div>` : ''}
      </div></div>
    </section>` : ''}

    ${product.highlightFeatures && product.highlightFeatures.length ? `
    <section class="section bg-alt">
      <div class="wrap">
        <header class="reveal" style="margin-bottom:26px;"><h2 class="t-title">คุณสมบัติเด่น</h2></header>
        <ul class="alt-list reveal th">
          ${product.highlightFeatures.map(f => `<li>${esc(f)}</li>`).join('')}
        </ul>
      </div>
    </section>` : ''}

    <section class="section" id="specs">
      <div class="wrap">
        <div class="specs-head reveal">
          <div><p class="t-eyebrow">Tech Specs</p><h2 class="t-title">ข้อมูลจำเพาะ</h2></div>
          ${product.datasheet ? `<a class="link" href="${esc(product.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลด PDF</a>` : ''}
        </div>
        <dl class="specs-grid specs-collapsed" id="specsGrid">${specRows}</dl>
        <div class="specs-toggle">
          <button class="btn btn-ghost" id="specsToggle" aria-expanded="false" aria-controls="specsGrid">ดูสเปกทั้งหมด</button>
        </div>
      </div>
    </section>

    <section class="section bg-alt">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">สนใจรุ่นนี้?</h2>
          <p class="th">ปรึกษาผู้เชี่ยวชาญเพื่อประเมินหน้างานและใบเสนอราคา<br />
            <strong>${esc(SITE.company)}</strong></p>
          <div class="contact-actions">
            ${SITE.contacts.map(c => `<a class="btn" href="${c.href}">โทร. ${c.phone}</a>`).join('')}
            <a class="btn" href="mailto:${SITE.email}">อีเมล</a>
            <button type="button" class="btn" id="quoteBtn">ขอใบเสนอราคา</button>
          </div>
          <div class="contact-detail">
            <p>${SITE.contacts.map(c => `${esc(c.name)} ${esc(c.phone)}`).join(' &nbsp;·&nbsp; ')}</p>
            <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          </div>
        </div>
      </div>
    </section>`;

  const qb = document.getElementById('quoteBtn');
  if (qb) qb.addEventListener('click', () => openQuote({
    product: product.name,
    related: (typeof MODELS !== 'undefined'
      ? MODELS.filter(x => x.group === 'Display--Control').slice(0, 6).map(x => x.model)
      : [])
  }));

  const grid = document.getElementById('specsGrid');
  const btn  = document.getElementById('specsToggle');
  btn.addEventListener('click', () => {
    const collapsed = grid.classList.toggle('specs-collapsed');
    btn.textContent = collapsed ? 'ดูสเปกทั้งหมด' : 'ย่อรายการ';
    btn.setAttribute('aria-expanded', String(!collapsed));
  });

  initReveal();
  initScrollSpy('.subnav-links a');
}
