/* ============================================================
   All brands — authorised dealer brands + brands we source
   ============================================================ */

mountChrome('partnership');

const root = document.getElementById('brands-root');
document.getElementById('subnav-slot').outerHTML = `
  <div class="subnav">
    <div class="subnav-inner">
      <a class="subnav-name" href="index.html#brands">แบรนด์ทั้งหมด</a>
      <div class="subnav-links">
        <a href="#dealer">ตัวแทนจำหน่าย</a>
        <a href="#supply">แบรนด์ที่จัดหาให้</a>
        <a class="btn btn-primary btn-sm" href="${SITE.contacts[0].href}">สอบถามสินค้า</a>
      </div>
    </div>
  </div>`;

const totalModels = BRANDS.reduce(
  (n, b) => n + b.groups.reduce((m, g) => m + (g.count || 0), 0), 0);

root.innerHTML = `
  <section class="hero cat-hero">
    <div class="wrap hero-copy">
      <p class="t-eyebrow">Brands</p>
      <h1 class="t-display">แบรนด์ที่เราจำหน่าย<br />และจัดหาให้</h1>
      <p class="t-lead th">
        เราเป็นตัวแทนจำหน่ายอย่างเป็นทางการของ Dahua, Samsung และ MAXHUB
        และจัดหาจากผู้ผลิตชั้นนำทุกราย — สเปกจึงถูกเลือกตามหน้างาน ไม่ใช่ตามของที่มีในสต็อก
      </p>
      <div class="cta-row">
        <a class="link link-lg" href="#dealer">ตัวแทนจำหน่าย</a>
        <a class="link link-lg" href="#supply">แบรนด์ที่จัดหาให้</a>
      </div>
    </div>
  </section>

  <section class="section-tight" id="dealer">
    <div class="wrap-wide">
      <div class="series-head reveal">
        <div>
          <h2 class="t-title">ตัวแทนจำหน่ายอย่างเป็นทางการ</h2>
          <p class="t-small th">มีแคตตาล็อกสินค้าและข้อมูลจำเพาะครบบนเว็บไซต์นี้</p>
        </div>
        <span class="t-small">${BRANDS.length} แบรนด์ · ${totalModels} รุ่น</span>
      </div>
      <div class="brand-grid">
        ${BRANDS.map(b => {
          const total = b.groups.reduce((n, g) => n + (g.count || 0), 0);
          return `
            <a class="brand-card reveal" href="brand.html?id=${encodeURIComponent(b.id)}">
              <span class="brand-mark">${brandMark(b)}</span>
              <span class="brand-tag">${esc(b.tagline)}</span>
              <span class="brand-blurb th">${esc(b.blurb)}</span>
              <span class="brand-meta">
                <span>${b.groups.length} หมวด · ${total} รุ่น</span>
                <span class="brand-go" aria-hidden="true">›</span>
              </span>
            </a>`;
        }).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-alt" id="supply">
    <div class="wrap-wide">
      <div class="series-head reveal">
        <div>
          <h2 class="t-title">แบรนด์ที่เราจัดหาให้</h2>
          <p class="t-small th">สั่งซื้อผ่านเราได้ แจ้งรุ่นที่ต้องการเพื่อขอใบเสนอราคา</p>
        </div>
        <span class="t-small">${MORE_BRANDS.length} แบรนด์</span>
      </div>
      <div class="supply-grid">
        ${MORE_BRANDS.map(b => `
          <div class="supply-card reveal">
            <span class="supply-name">${esc(b.name)}</span>
            <span class="supply-sub th">${esc(b.th)}</span>
          </div>`).join('')}
        <div class="supply-card is-note reveal">
          <span class="supply-name">และอีกมากมาย</span>
          <span class="supply-sub th">แจ้งแบรนด์หรือรุ่นที่ต้องการ เราจัดหาให้</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="contact-card reveal">
        <h2 class="t-headline">หาแบรนด์ที่ต้องการไม่เจอ?</h2>
        <p class="th">แจ้งรุ่นหรือลักษณะงานที่ต้องการ เราจัดหาและเสนอราคาให้</p>
        <div class="contact-actions">
          ${SITE.contacts.map((c, i) =>
            `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}" href="${c.href}">โทร. ${c.phone}</a>`).join('')}
          <a class="btn btn-ghost" href="mailto:${SITE.email}">อีเมล</a>
        </div>
      </div>
    </div>
  </section>`;

initReveal();
initScrollSpy('.subnav-links a');
