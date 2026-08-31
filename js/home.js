/* ============================================================
   Home page
   ============================================================ */

mountChrome('home');

/* ── Brand cards ── */
const brandGrid = document.getElementById('brand-grid');
if (brandGrid) {
  brandGrid.innerHTML = BRANDS.map(b => {
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
  }).join('') + `
    <a class="brand-card is-more reveal" href="brands.html">
      <span class="brand-mark">
        <span class="more-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      </span>
      <span class="brand-tag">More Brands</span>
      <span class="brand-blurb th">
        เราจัดหาจากผู้ผลิตชั้นนำทุกราย — Logitech, Ricoh, Panasonic, LG,
        Hikvision, Hisense, Dell, Lenovo, Canon และอีกมากมาย
      </span>
      <span class="brand-meta">
        <span>${typeof MORE_BRANDS !== 'undefined' ? MORE_BRANDS.length : 14} แบรนด์ · และมากกว่านั้น</span>
        <span class="brand-go" aria-hidden="true">›</span>
      </span>
    </a>`;
}

/* ── Featured products ── */
const featGrid = document.getElementById('featured-grid');
if (featGrid && typeof FEATURED !== 'undefined') {
  featGrid.innerHTML = FEATURED.map(f => `
    <a class="mcard reveal" href="product.html?id=${encodeURIComponent(f.id)}">
      <span class="mcard-media">
        ${f.img ? `<img src="${esc(f.img)}" alt="${esc(f.model)}" loading="lazy" />`
                : `<span class="mcard-noimg">ไม่มีรูป</span>`}
      </span>
      <span class="mcard-brand">${esc(brandName(f.brand))}</span>
      <span class="mcard-name">${esc(f.model)}</span>
      ${f.desc ? `<span class="mcard-desc">${esc(f.desc)}</span>` : ''}
      <span class="mcard-go">ดูรายละเอียด ›</span>
    </a>`).join('');
}

/* ── Capabilities (Product Expert) ── */
const CAPABILITIES = [
  { icon: 'grid',       title: 'LED Screen',          sub: 'ในและนอกอาคาร ทุกขนาด' },
  { icon: 'display',    title: 'Signage',             sub: 'จอเชิงพาณิชย์ 16/24 ชม.' },
  { icon: 'board',      title: 'Interactive Board',   sub: 'จอสัมผัส 75″ และ 86″' },
  { icon: 'display',    title: 'TV',                  sub: '4K และ QLED สูงสุด 98″' },
  { icon: 'play',       title: 'Projector',           sub: 'โปรเจกเตอร์เลเซอร์สำหรับหอประชุม' },
  { icon: 'conference', title: 'Meeting & Conference', sub: 'ชุดห้องประชุม กล้อง ไมค์' },
  { icon: 'camera',     title: 'CCTV Systems',        sub: 'กล้อง AI และเครื่องบันทึก' },
  { icon: 'access',     title: 'Security Products',   sub: 'ควบคุมประตูและอินเตอร์คอม' },
  { icon: 'kit',        title: 'Queue Kiosk',         sub: 'ตู้บัตรคิว 24″' },
  { icon: 'bolt',       title: 'Lighting System',     sub: 'ออกแบบ ติดตั้ง และควบคุม' }
];

const capGrid = document.getElementById('capability-grid');
if (capGrid) {
  capGrid.innerHTML = CAPABILITIES.map(c => `
    <div class="cap-item reveal">
      <span class="cap-icon">${icon(c.icon)}</span>
      <span class="cap-body">
        <span class="cap-title">${esc(c.title)}</span>
        <span class="cap-sub">${esc(c.sub)}</span>
      </span>
    </div>`).join('');
}

/* ── How we work ── */
const STEPS = [
  { n: '01', title: 'Survey',       th: 'สำรวจหน้างาน',  body: 'วัดพื้นที่ ระยะมอง และแสงโดยรอบ ก่อนเสนอราคา' },
  { n: '02', title: 'Drawing',      th: 'เขียนแบบ',      body: 'แบบติดตั้งและแปลนจุดยึด ให้เห็นผลลัพธ์ก่อนลงมือ' },
  { n: '03', title: 'Discussion',   th: 'หารือ',         body: 'ตกลงขนาด เนื้อหา กำหนดการ และงบประมาณเป็นลายลักษณ์อักษร' },
  { n: '04', title: 'Construction', th: 'งานโครงสร้าง',  body: 'เตรียมโครงสร้าง เสริมผนัง ระบบไฟและท่อร้อยสาย' },
  { n: '05', title: 'Installation', th: 'ติดตั้ง',        body: 'ติดตั้งตู้จอ ขายึด และเดินสายโดยทีมช่างของเราเอง' },
  { n: '06', title: 'Set Up',       th: 'ตั้งค่าระบบ',    body: 'ปรับภาพ ตั้งค่าแหล่งสัญญาณและระบบควบคุมหน้างาน' },
  { n: '07', title: 'Finishing',    th: 'เก็บงาน',       body: 'ปิดขอบ เก็บรายละเอียด เคลียร์พื้นที่ พร้อมส่งมอบ' },
  { n: '08', title: 'Training',     th: 'อบรมการใช้งาน', body: 'สอนทีมงานให้ใช้เป็น พร้อมผู้ติดต่อสำหรับอะไหล่และบริการ' }
];

const stepGrid = document.getElementById('step-grid');
if (stepGrid) {
  stepGrid.innerHTML = STEPS.map(s => `
    <div class="step-card reveal">
      <span class="step-num">${s.n}</span>
      <h3 class="step-title">${esc(s.title)}</h3>
      <p class="step-th">${esc(s.th)}</p>
      <p class="step-body th">${esc(s.body)}</p>
    </div>`).join('');
}

/* ── Our Works — real project references ── */
const worksGrid = document.getElementById('works-grid');
if (worksGrid && typeof WORKS !== 'undefined') {
  worksGrid.innerHTML = WORKS.map(w => `
    <a class="work-card reveal" href="work.html?id=${encodeURIComponent(w.id)}">
      <div class="work-media"><img src="${esc(w.cover)}" alt="${esc(w.title)}" loading="lazy" /></div>
      <div class="work-cap">
        <span class="work-tag">${esc(w.product)}</span>
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.place)}</p>
      </div>
    </a>`).join('');
}

/* ── Support ── */
const SUPPORT = [
  { icon: 'chat',  title: 'ปรึกษาก่อนซื้อ',       body: 'ทีมงานช่วยเลือกขนาดจอ ระยะมอง และงบประมาณให้เหมาะกับหน้างานจริง' },
  { icon: 'truck', title: 'ติดตั้งโดยทีมงาน',      body: 'ส่งมอบและติดตั้งพร้อมสอนการใช้งานให้ทีมของคุณจนใช้เป็น' },
  { icon: 'tools', title: 'ซ่อมบำรุงถึงหน้างาน',   body: 'บริการตรวจเช็กและซ่อมบำรุงโดยช่างที่ผ่านการอบรมจากผู้ผลิต' },
  { icon: 'badge', title: 'อะไหล่และการรับประกัน', body: 'มีอะไหล่สำรองและบริการหลังการขายโดยตัวแทนจำหน่ายอย่างเป็นทางการ' }
];

const supportGrid = document.getElementById('support-grid');
if (supportGrid) {
  supportGrid.innerHTML = SUPPORT.map(s => `
    <div class="support-item">
      ${icon(s.icon)}
      <h3>${esc(s.title)}</h3>
      <p class="th">${esc(s.body)}</p>
    </div>`).join('');
}

/* ── Contact card details ── */
const ca = document.getElementById('contact-actions');
if (ca) {
  ca.innerHTML = SITE.contacts.map((c, i) =>
    `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}" href="${c.href}">โทร. ${c.phone}</a>`
  ).join('') + `<a class="btn btn-ghost" href="mailto:${SITE.email}">อีเมล</a>`;
}
const cd = document.getElementById('contact-detail');
if (cd) {
  cd.innerHTML = `
    <p>${SITE.contacts.map(c => `${esc(c.name)} ${esc(c.phone)}`).join(' &nbsp;·&nbsp; ')}</p>
    <p>${esc(SITE.address)}</p>
    <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>`;
}

initReveal();
initScrollSpy('.nav-links a');
