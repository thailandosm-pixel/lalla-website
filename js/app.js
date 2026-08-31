/* ============================================================
   Shared behaviour: nav, scroll reveal, icon set, footer
   ============================================================ */

/* ── Icon set (inline SVG, currentColor) ── */
const ICONS = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v5.6c0 4.4 3 8.1 7.5 9.4 4.5-1.3 7.5-5 7.5-9.4V6L12 3Z"/><path d="m9 12 2.2 2.2L15.3 10"/></svg>',
  fold:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M12 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6"/><path d="M12 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6"/></svg>',
  grid:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="5.5" height="16" rx="1"/><rect x="9.25" y="4" width="5.5" height="16" rx="1"/><rect x="15.5" y="4" width="5.5" height="16" rx="1"/></svg>',
  play:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="13" rx="2"/><path d="M8 21h8"/><path d="m10.5 8.8 4.2 2.4-4.2 2.4V8.8Z" fill="currentColor" stroke="none"/></svg>',
  tools:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5a3.8 3.8 0 0 0 5 5L15 15l-5-5 4.5-4.5Z"/><path d="m10 10-6 6a1.8 1.8 0 0 0 2.5 2.5l6-6"/></svg>',
  bolt:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z"/></svg>',
  phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z"/></svg>',
  doc:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z"/><path d="M14 3v4.5h4.5"/><path d="M9 13h6M9 16.5h4"/></svg>',
  truck:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 10h4l3 3v2.5h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  badge:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9.5" r="5.5"/><path d="m8.5 14.5-1 6 4.5-2.5 4.5 2.5-1-6"/></svg>',
  chat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 12.2c0 4-3.8 7.2-8.5 7.2a10 10 0 0 1-2.6-.34L4 21l1.2-3.6A6.9 6.9 0 0 1 3.5 12.2C3.5 8.2 7.3 5 12 5s8.5 3.2 8.5 7.2Z"/></svg>'
};

/* ── Category icons (24×24 line art, currentColor) ── */
const S = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
Object.assign(ICONS, {
  camera:     `<svg viewBox="0 0 24 24" ${S}><path d="M2.5 8.5 16 5.2a1 1 0 0 1 1.2.7l1.1 4.4a1 1 0 0 1-.7 1.2L4 15z"/><path d="m5.6 14.4 1.2 4.3M18.8 10.4l2.7-.7"/><circle cx="9" cy="10.4" r="1"/></svg>`,
  'camera-hd':`<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="7" width="13" height="8.5" rx="1.6"/><path d="M15.5 10.2 21 8v8l-5.5-2.2z"/><path d="M6 19h5"/></svg>`,
  thermal:    `<svg viewBox="0 0 24 24" ${S}><path d="M10 13.6V5.4a2 2 0 1 1 4 0v8.2a4 4 0 1 1-4 0Z"/><path d="M12 9.5v5"/></svg>`,
  ptz:        `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="11" r="4.2"/><circle cx="12" cy="11" r="1.3"/><path d="M12 3.2v1.6M12 17.2v1.6M3.8 11h1.6M18.6 11h1.6"/><path d="M7 21h10"/></svg>`,
  pt:         `<svg viewBox="0 0 24 24" ${S}><rect x="6" y="4" width="12" height="9" rx="2"/><path d="M12 13v4M8 21h8"/><path d="M3.5 8.5 5 7v3zM20.5 8.5 19 7v3z"/></svg>`,
  nvr:        `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="6.5" width="19" height="11" rx="2"/><path d="M6 10.5h5M6 13.5h3"/><circle cx="17.5" cy="12" r="1.4"/></svg>`,
  dvr:        `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="6.5" width="19" height="11" rx="2"/><path d="M2.5 12h19"/><circle cx="6" cy="9.2" r="0.9"/><path d="M15 15h4"/></svg>`,
  intercom:   `<svg viewBox="0 0 24 24" ${S}><rect x="5.5" y="2.5" width="13" height="19" rx="2.2"/><rect x="8.5" y="6" width="7" height="5.5" rx="1"/><path d="M9.5 15h5M9.5 18h3"/></svg>`,
  access:     `<svg viewBox="0 0 24 24" ${S}><path d="M5 21V4.5a1.5 1.5 0 0 1 1.5-1.5H15a1.5 1.5 0 0 1 1.5 1.5V21"/><path d="M3.5 21h17"/><circle cx="13.5" cy="12" r="1.1"/></svg>`,
  alarm:      `<svg viewBox="0 0 24 24" ${S}><path d="M18 15.5V11a6 6 0 1 0-12 0v4.5L4.5 18h15z"/><path d="M10 21h4"/></svg>`,
  display:    `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/></svg>`,
  board:      `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M12 16.5v4M8 20.5h8"/><path d="M6.5 12.5c2-3.5 4-3.5 6 0s4 1.5 5-1"/></svg>`,
  conference: `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="6" width="12.5" height="10" rx="2"/><path d="M15 10.5 21.5 7v10L15 13.5z"/><circle cx="8.7" cy="10" r="1.5"/><path d="M5.6 14c.8-1.2 1.9-1.7 3.1-1.7s2.3.5 3.1 1.7"/></svg>`,
  switch:     `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="8" width="19" height="8" rx="1.8"/><path d="M6 11.5v1M9 11.5v1M12 11.5v1M15 11.5v1"/><circle cx="19" cy="12" r="0.9"/></svg>`,
  storage:    `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="4" width="18" height="6" rx="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.6"/><path d="M6.5 7h.01M6.5 17h.01"/></svg>`,
  software:   `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="4" width="19" height="14" rx="2"/><path d="M2.5 8.5h19"/><path d="m8 12.5 1.8 1.8L8 16.1M12.5 16.1h3.5"/></svg>`,
  traffic:    `<svg viewBox="0 0 24 24" ${S}><rect x="7.5" y="2.5" width="9" height="15" rx="3"/><circle cx="12" cy="6.6" r="1.1"/><circle cx="12" cy="10" r="1.1"/><circle cx="12" cy="13.4" r="1.1"/><path d="M12 17.5V21"/></svg>`,
  ev:         `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="3" width="11" height="18" rx="2"/><path d="M15 8h2.5a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 1.5 1.5"/><path d="m10.4 8-2.4 4h3l-2.4 4"/></svg>`,
  screening:  `<svg viewBox="0 0 24 24" ${S}><path d="M4 4v16M20 4v16"/><path d="M8 8.5a4 4 0 0 1 8 0v7a4 4 0 0 1-8 0z"/></svg>`,
  shield2:    `<svg viewBox="0 0 24 24" ${S}><path d="M12 3 5 6v6c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6z"/><path d="M12 8.5v3.2M12 15h.01"/></svg>`,
  cpu:        `<svg viewBox="0 0 24 24" ${S}><rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="10" y="10" width="4" height="4" rx="1"/><path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"/></svg>`,
  drone:      `<svg viewBox="0 0 24 24" ${S}><rect x="9" y="9" width="6" height="6" rx="1.6"/><path d="M9 9 5.5 5.5M15 9l3.5-3.5M9 15l-3.5 3.5M15 15l3.5 3.5"/><circle cx="4.6" cy="4.6" r="2.1"/><circle cx="19.4" cy="4.6" r="2.1"/><circle cx="4.6" cy="19.4" r="2.1"/><circle cx="19.4" cy="19.4" r="2.1"/></svg>`,
  mobile:     `<svg viewBox="0 0 24 24" ${S}><path d="M2.5 15.5h1.2a2 2 0 0 0 2-2V9.2a1.7 1.7 0 0 1 1.7-1.7h6.2l4.4 4.4h1.5a2 2 0 0 1 2 2v1.6"/><path d="M2.5 15.5h19"/><circle cx="7.5" cy="17.6" r="2"/><circle cx="16.5" cy="17.6" r="2"/></svg>`,
  kit:        `<svg viewBox="0 0 24 24" ${S}><path d="M3 8.5 12 4l9 4.5-9 4.5z"/><path d="M3 8.5v7L12 20l9-4.5v-7"/><path d="M12 13v7"/></svg>`,
  parts:      `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7"/></svg>`,
  memory:     `<svg viewBox="0 0 24 24" ${S}><path d="M6 3.5h8.5L19 8v12.5H6z"/><path d="M9.5 3.5v4M12.5 3.5v4M15.5 6v1.5"/></svg>`,
  project:    `<svg viewBox="0 0 24 24" ${S}><path d="M3.5 20V7.5L11 4v16"/><path d="M11 9.5l9 3V20"/><path d="M2.5 20h19"/><path d="M6.5 11h1M6.5 15h1M14.5 14h1M14.5 17h1"/></svg>`,
  cert:       `<svg viewBox="0 0 24 24" ${S}><rect x="3.5" y="3.5" width="17" height="13" rx="2"/><path d="m8 9.8 2 2 4.2-4.2"/><path d="M8.5 20.5 12 18.4l3.5 2.1"/></svg>`,
  archive:    `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="4" width="19" height="4.5" rx="1.4"/><path d="M4.5 8.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V8.5"/><path d="M10 12.5h4"/></svg>`
});

const icon = (name) => ICONS[name] || '';

/* ── Site-wide constants ── */
const SITE = {
  company:   "บริษัท ลัลลา (ประเทศไทย) จำกัด",
  companyEn: "Lalla (Thailand) Co., Ltd.",
  address:   "69/93 หมู่ 1 ซอยพระแม่มหาการุณย์ ถนนติวานนท์ ต.บ้านใหม่ อ.ปากเกร็ด นนทบุรี 11120",
  addressEn: "69/93 Moo 1, Soi Pramaemahakarun, Tiwanon Road, T. Ban Mai, A. Pakkret, Nonthaburi 11120",
  contacts: [
    { name: "คุณ นิจรินทร์ กิจสกุล", phone: "081-491-3538", href: "tel:0814913538" },
    { name: "คุณ อภิชาติ กิจสกุล",  phone: "086-667-7800", href: "tel:0866677800" }
  ],
  email:     "lallath2002@gmail.com",
  contactName: "คุณ นิจรินทร์ กิจสกุล",
  phone:     "081-491-3538",
  phoneHref: "tel:0814913538"
};


/* ── Brand helpers ── */
function brandName(id) {
  const b = (typeof BRANDS !== 'undefined') ? BRANDS.find(x => x.id === id) : null;
  return b ? b.name : id;
}

/* A brand's logo image, or a typographic wordmark when we have no asset. */
function brandMark(b) {
  if (b.logo) return `<img src="${b.logo}" alt="${esc(b.name)}" />`;
  return `<span class="wordmark wordmark-${esc(b.id)}">${esc(b.wordmark || b.name)}</span>`;
}

/* ── Global navigation ── */
function renderNav(active) {
  const items = [
    { href: "index.html",             label: "Home",            key: "home" },
    { href: "index.html#featured",    label: "Our Products",    key: "products" },
    { href: "index.html#brands",      label: "Our Partnership", key: "partnership" },
    { href: "index.html#works",       label: "Our Works",       key: "works" },
    { href: "index.html#contact",     label: "Contact Us",      key: "contact" }
  ];

  return `
    <nav class="nav" id="siteNav">
      <div class="nav-inner">
        <a class="nav-logo" href="index.html" aria-label="Lalla ลัลลา — หน้าแรก">
          <img src="assets/cutout/lalla-logo.png" alt="Lalla ลัลลา" />
        </a>
        <button class="nav-burger" id="navBurger" aria-label="เปิดเมนู" aria-expanded="false">
          <span></span><span></span>
        </button>
        <div class="nav-links" id="navLinks">
          ${items.map(i => `<a href="${i.href}"${i.key === active ? ' class="is-active"' : ''}>${i.label}</a>`).join('')}
          <a class="nav-phone" href="${SITE.phoneHref}">${icon('phone')}${SITE.phone}</a>
        </div>
      </div>
    </nav>
  `;
}

/* ── Footer ── */
function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="wrap-wide">
        <p class="footer-note">
          ภาพประกอบและข้อมูลจำเพาะใช้เพื่อการนำเสนอ ข้อมูลทางเทคนิคอ้างอิงตามเอกสารของผู้ผลิต
          และอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า Dahua เป็นเครื่องหมายการค้าของเจ้าของผลิตภัณฑ์
        </p>

        <div class="footer-cols">
          <div class="footer-col">
            <h4>Our Products</h4>
            <ul>
              <li><a href="brand.html?id=dahua">Dahua</a></li>
              <li><a href="brand.html?id=samsung">Samsung Smart Signage</a></li>
              <li><a href="brand.html?id=maxhub">MAXHUB</a></li>
              <li><a href="index.html#featured">สินค้าแนะนำ</a></li>
              <li><a href="brands.html">แบรนด์ทั้งหมด</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>ข้อมูลทางเทคนิค</h4>
            <ul>
              <li><a href="product.html?id=dhi-phria2-5-pl#specs">Tech Specs</a></li>
              <li><a href="pdf/DHI-PHRIA2.5-PL _ Dahua LED Poster Screen.pdf" target="_blank" rel="noopener">ดาวน์โหลดโบรชัวร์</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Our Partnership</h4>
            <ul>
              <li><a href="index.html#partnership">พันธมิตรทางธุรกิจ</a></li>
              <li><a href="index.html#support">การติดตั้งและรับประกัน</a></li>
              <li><a href="index.html#support">อะไหล่และการซ่อมบำรุง</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact Us</h4>
            <ul>
              ${SITE.contacts.map(c => `<li>${c.name}<br /><a href="${c.href}">โทร. ${c.phone}</a></li>`).join('')}
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            </ul>
          </div>

          <div class="footer-col footer-col-wide">
            <h4>Office</h4>
            <ul>
              <li>${SITE.company}</li>
              <li>${SITE.address}</li>
            </ul>
          </div>
        </div>

        <div class="footer-legal">
          <span>Copyright © ${year} ${SITE.company} สงวนลิขสิทธิ์</span>
          <span class="sep">ตัวแทนจำหน่ายอย่างเป็นทางการ</span>
        </div>
      </div>
    </footer>
  `;
}

/* ── Mount shared chrome ── */
function mountChrome(activeKey) {
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.outerHTML = renderNav(activeKey);
  if (footSlot) footSlot.outerHTML = renderFooter();

  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }
}

/* ── Scroll reveal ── */
function initReveal(root = document) {
  const els = root.querySelectorAll('.reveal:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0 });
  els.forEach(el => io.observe(el));
}

/* ── Sub-nav scrollspy ── */
function initScrollSpy(linkSelector) {
  const links = Array.from(document.querySelectorAll(linkSelector));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const map = new Map();
  links.forEach(link => {
    const id = link.getAttribute('href')?.replace(/^.*#/, '');
    const section = id && document.getElementById(id);
    if (section) map.set(section, link);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove('is-active'));
      map.get(entry.target)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  map.forEach((_, section) => io.observe(section));
}

/* ── Utilities ── */
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const liveProducts = () => products.filter(p => !p.placeholder);
const productSlots = () => products.filter(p => p.placeholder);
