/* ============================================================
   Page templates + search text
   ------------------------------------------------------------
   The markup for product, category and brand pages lives here,
   ONCE. Two callers use it:

   - tools/build.mjs, which writes a static HTML file per item so
     search engines see real content without running JavaScript;
   - detail.js / category.js / brand.js, which render the same
     markup in the browser when the source folder is opened
     without building.

   So a change here changes both, and they cannot drift apart.
   Functions that only build strings are safe in Node; the wire*
   functions at the bottom touch the DOM and run only in browsers.

   Depends on (from app.js / urls.js): esc, icon, brandMark, SITE,
   productUrl, categoryUrl, brandUrl.
   ============================================================ */

/* ── Thai search terms ──────────────────────────────────────────
   First entry: the short phrase people actually type, used in
   page titles. The rest: other common phrasings, used sparingly in
   descriptions and structured data. Keep them accurate - a term
   that does not describe the products is worse than none. */
const SEO_TERMS = {
  dahua: {
    'Network-Cameras':        ['กล้องวงจรปิด IP', 'กล้องวงจรปิด', 'กล้อง IP', 'กล้อง CCTV'],
    'HDCVI-Cameras':          ['กล้องวงจรปิด HDCVI', 'กล้องวงจรปิด', 'กล้องอนาล็อก HD'],
    'Thermal-Cameras':        ['กล้องถ่ายภาพความร้อน', 'กล้องตรวจจับความร้อน', 'กล้อง Thermal'],
    'PTZ-Cameras':            ['กล้อง PTZ หมุนส่ายซูม', 'กล้องสปีดโดม', 'กล้องวงจรปิดหมุนได้'],
    'Wireless-Products':      ['กล้องวงจรปิดไร้สาย Wi-Fi', 'กล้อง Wi-Fi', 'กล้องไร้สาย'],
    'Network-Recorders':      ['เครื่องบันทึก NVR', 'เครื่องบันทึกกล้องวงจรปิด'],
    'HDCVI-Recorders':        ['เครื่องบันทึก XVR / DVR', 'เครื่องบันทึกกล้องวงจรปิด'],
    'Video-Intercoms':        ['อินเตอร์คอมวิดีโอ', 'กริ่งประตูมีกล้อง'],
    'Access-Control':         ['เครื่องสแกนใบหน้า ควบคุมการเข้าออก', 'เครื่องสแกนนิ้ว', 'เครื่องบันทึกเวลา'],
    'Alarms':                 ['ระบบสัญญาณกันขโมย'],
    'Display--Control':       ['จอ LED และจอแสดงผล', 'จอ LED', 'ป้ายดิจิทัล', 'วิดีโอวอลล์'],
    'Interactive-Whiteboards':['จอสัมผัส กระดานอัจฉริยะ', 'จออินเตอร์แอคทีฟ', 'จอทัชสกรีน'],
    'Transmission':           ['สวิตช์ PoE อุปกรณ์เครือข่าย', 'PoE Switch'],
    'Storage':                ['อุปกรณ์จัดเก็บข้อมูลภาพ'],
    'Traffic':                ['กล้องจราจร อ่านป้ายทะเบียน', 'ระบบที่จอดรถอัจฉริยะ'],
    'Intelligent-EV-Charger': ['เครื่องชาร์จรถยนต์ไฟฟ้า EV Charger', 'ที่ชาร์จรถ EV'],
    'Explosion-Proof--Anti-Corrosion': ['กล้องวงจรปิดกันระเบิด'],
    'Intelligent-Computing':  ['เซิร์ฟเวอร์ AI วิเคราะห์ภาพ'],
    'Drone':                  ['โดรนอุตสาหกรรม'],
    'Mobile':                 ['กล้องติดรถ ระบบบันทึกยานพาหนะ'],
    'Accessories':            ['อุปกรณ์เสริมกล้องวงจรปิด', 'ขายึดกล้อง'],
    'Dedicated-Products':     ['กล้องวงจรปิดงานโครงการ'],
    'DE-2564':                ['กล้องวงจรปิดมาตรฐาน DE ราคากลาง', 'เกณฑ์ราคากลางครุภัณฑ์คอมพิวเตอร์']
  },
  samsung: {
    'interactive-display':    ['จอสัมผัสอินเทอร์แอคทีฟ', 'จออินเตอร์แอคทีฟ', 'กระดานอัจฉริยะ'],
    'qled-8k-signage':        ['จอป้ายดิจิทัล 8K', 'Digital Signage', 'จอโฆษณา'],
    'uhd-4k-signage':         ['จอป้ายดิจิทัล 4K', 'Digital Signage', 'จอโฆษณา'],
    'video-wall':             ['จอวิดีโอวอลล์', 'Video Wall'],
    'outdoor-signage':        ['จอโฆษณากลางแจ้ง', 'จอติดกระจก']
  },
  maxhub: {
    'interactive-flat-panel': ['จออินเตอร์แอคทีฟ', 'กระดานอัจฉริยะ', 'จอสัมผัส'],
    'commercial-display':     ['จอแสดงผลเชิงพาณิชย์'],
    'dvled':                  ['จอ LED Direct View', 'จอ LED'],
    'audio-video':            ['อุปกรณ์ห้องประชุม กล้องประชุม', 'ไมค์ประชุม', 'Video Conference'],
    'mtr':                    ['ชุดห้องประชุม Microsoft Teams Rooms'],
    'accessories':            ['อุปกรณ์เสริมห้องประชุม'],
    'software':               ['ซอฟต์แวร์ห้องประชุม']
  },
  imin: {
    'self-service-kiosk':     ['ตู้คีออสก์สั่งอาหาร ชำระเงิน', 'ตู้คีออสก์', 'Self-service Kiosk']
  }
};

const BRAND_TERMS = {
  dahua:   'กล้องวงจรปิด จอ LED และระบบรักษาความปลอดภัย',
  samsung: 'จอป้ายดิจิทัลและจอสัมผัส Samsung Smart Signage',
  maxhub:  'จออินเตอร์แอคทีฟและอุปกรณ์ห้องประชุม',
  imin:    'ตู้คีออสก์บริการตนเอง'
};

/* ── Service page for each product group ─────────────────────────
   Product and category pages link to the matching service page
   (js/landing.js), so those pages get links from all over the site. */
const SERVICE_PAGES = {
  'smart-classroom':     'ห้องเรียนอัจฉริยะ — คู่มือเลือกและติดตั้งกระดานอัจฉริยะ',
  'interactive-display': 'จอ interactive ทุกแบรนด์ — เปรียบเทียบและเลือกรุ่น',
  'screen-installation': 'บริการรับติดตั้งจอ',
  'cctv-installation':   'บริการรับติดตั้งกล้องวงจรปิดครบวงจร',
  'led-screen':          'จอ LED — เลือกระยะพิกเซลและติดตั้ง',
  'digital-signage':     'ป้ายดิจิทัล — จอโฆษณาทุกแบบ',
  'video-wall':          'วิดีโอวอลล์ — จอต่อกันขอบบาง',
  'meeting-room':        'อุปกรณ์ห้องประชุมออนไลน์ครบชุด',
  'queue-kiosk':         'ตู้กดบัตรคิวและตู้คีออสก์',
  'access-control':      'เครื่องสแกนใบหน้าและระบบควบคุมการเข้าออก',
  'ev-charger':          'เครื่องชาร์จรถยนต์ไฟฟ้า — AC และ DC'
};
const SERVICE_MAP = [
  [/^(dahua\/Interactive-Whiteboards|samsung\/interactive-display|maxhub\/interactive-flat-panel)$/,
                                                       ['smart-classroom', 'interactive-display']],
  [/^dahua\/Display--Control$/,                        ['led-screen', 'digital-signage', 'video-wall']],
  [/^maxhub\/dvled$/,                                  ['led-screen', 'screen-installation']],
  [/^(samsung\/(qled-8k-signage|uhd-4k-signage|outdoor-signage)|maxhub\/commercial-display)$/,
                                                       ['digital-signage', 'screen-installation']],
  [/^samsung\/video-wall$/,                            ['video-wall', 'screen-installation']],
  [/^maxhub\/(audio-video|mtr|accessories|software)$/, ['meeting-room']],
  [/^imin\/self-service-kiosk$/,                       ['queue-kiosk']],
  [/^dahua\/(Access-Control|Video-Intercoms)$/,        ['access-control', 'cctv-installation']],
  [/^dahua\/Intelligent-EV-Charger$/,                  ['ev-charger']],
  [/^dahua\/(Network-Cameras|HDCVI-Cameras|Thermal-Cameras|PTZ-Cameras|Wireless-Products|Network-Recorders|HDCVI-Recorders|Alarms|Storage|Transmission|Accessories|Dedicated-Products|DE-2564|Explosion-Proof--Anti-Corrosion|Mobile|Traffic)$/,
                                                       ['cctv-installation']]
];
/* m (optional): a single product can override its group - e.g. the
   Samsung kiosks live in "interactive-display" but belong with kiosks. */
function servicesFor(brandId, groupSlug, m) {
  if (m && /kiosk/i.test(`${m.model} ${m.desc || ''}`)) return ['queue-kiosk'];
  const g = `${brandId}/${groupSlug}`;
  const hit = SERVICE_MAP.find(([re]) => re.test(g));
  return hit ? hit[1] : [];
}
function serviceLinks(brandId, groupSlug, m) {
  const list = servicesFor(brandId, groupSlug, m);
  if (!list.length) return '';
  return `<p class="service-links th">บริการที่เกี่ยวข้อง:
    ${list.map(slug => `<a href="${landingUrl(slug)}">${esc(SERVICE_PAGES[slug])} ›</a>`).join(' ')}</p>`;
}

const SITE_URL = 'https://lallathailand.com';
const TEL = '081-491-3538';

function termsFor(brandId, group) {
  const list = (SEO_TERMS[brandId] || {})[group && group.slug] || [];
  return { term: list[0] || (group && (group.nameTh || group.name)) || '', extra: list.slice(1) };
}
const isDealer = (brand) => !!brand && !brand.sourced;
const clip = (s, n) => { s = String(s || '').trim(); return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s; };

/* ── Search text ────────────────────────────────────────────── */
const SEO = {
  productTitle(m, brand, group) {
    const { term } = termsFor(m.brand, group);
    return `${brand ? brand.name + ' ' : ''}${m.model}${term ? ' ' + term : ''} | สอบถามราคา — Lalla`;
  },
  productDescription(m, brand, group) {
    const { term } = termsFor(m.brand, group);
    const who = isDealer(brand) ? `ตัวแทนจำหน่าย ${brand.name} อย่างเป็นทางการ` : 'จำหน่ายโดย Lalla';
    return clip(`${brand ? brand.name + ' ' : ''}${m.model} ${term}${m.desc ? ' — ' + m.desc : ''}. `
      + `${who} สเปกครบ สอบถามราคา ติดตั้งทั่วประเทศ`, 160);
  },
  /* Visible Thai paragraph under the product's English description. */
  productIntro(m, brand, group) {
    const { term } = termsFor(m.brand, group);
    const who = isDealer(brand)
      ? `บริษัท ลัลลา (ประเทศไทย) จำกัด เป็นตัวแทนจำหน่าย ${brand.name} อย่างเป็นทางการ`
      : 'จัดหาและจำหน่ายโดย บริษัท ลัลลา (ประเทศไทย) จำกัด';
    return `${m.model} เป็น${term || 'สินค้า'} ของ ${brand ? brand.name : ''} — ${who} `
      + `พร้อมบริการสำรวจหน้างาน ติดตั้ง และดูแลหลังการขายทั่วประเทศ `
      + `สอบถามราคาและสต็อกสินค้าได้ที่ ${TEL}`;
  },
  categoryTitle(brand, group, n) {
    const { term } = termsFor(brand.id, group);
    return `${term} ${brand.name} ${n} รุ่น | สเปก ติดตั้ง สอบถามราคา — Lalla`;
  },
  categoryDescription(brand, group, n) {
    const who = isDealer(brand) ? `ตัวแทนจำหน่าย ${brand.name} อย่างเป็นทางการ` : `จำหน่ายโดย Lalla`;
    return clip(`${group.nameTh || group.name} ${brand.name} ${n} รุ่น — ${group.blurb || ''} `
      + `${who} สอบถามราคา ติดตั้งทั่วประเทศ`, 160);
  },
  categoryIntro(brand, group, n) {
    return `รวม${group.nameTh || group.name} ของ ${brand.name} ทั้งหมด ${n} รุ่น พร้อมข้อมูลจำเพาะ `
      + `เลือกรุ่นที่เหมาะกับหน้างาน แล้วขอใบเสนอราคาได้ทันที — ลัลลาให้บริการสำรวจหน้างาน `
      + `ติดตั้ง และดูแลหลังการขายทั่วประเทศ`;
  },
  brandTitle(brand) {
    const what = BRAND_TERMS[brand.id] || brand.tagline;
    return isDealer(brand)
      ? `ตัวแทนจำหน่าย ${brand.name} อย่างเป็นทางการ — ${what} | Lalla`
      : `${brand.name} — ${what} | จำหน่ายโดย Lalla`;
  },
  brandDescription(brand) {
    const who = isDealer(brand) ? `ตัวแทนจำหน่าย ${brand.name} อย่างเป็นทางการในประเทศไทย` : `จำหน่ายโดย Lalla`;
    return clip(`${brand.name} — ${BRAND_TERMS[brand.id] || ''}. ${brand.blurb || ''} ${who}`, 160);
  },
  richTitle(p) {
    return `${p.name} ${p.subtitle} | สอบถามราคา — Lalla`;
  }
};

/* ── Shared fragments ───────────────────────────────────────── */
function contactCard(heading, sub, quoteButton) {
  return `
    <section class="section">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">${esc(heading)}</h2>
          <p class="th">${sub}<br />
            <strong>${esc(SITE.company)}</strong></p>
          <div class="contact-actions">
            ${SITE.contacts.map(c => `<a class="btn" href="${c.href}">โทร. ${c.phone}</a>`).join('')}
            <a class="btn" href="mailto:${SITE.email}">อีเมล</a>
            ${quoteButton ? `<button type="button" class="btn" id="quoteBtn">ขอใบเสนอราคา</button>` : ''}
          </div>
          <div class="contact-detail">
            <p>${SITE.contacts.map(c => `${esc(c.name)} ${esc(c.phone)}`).join(' &nbsp;·&nbsp; ')}</p>
            <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          </div>
        </div>
      </div>
    </section>`;
}

function modelCard(m, brandName) {
  return `
    <a class="mcard reveal" href="${productUrl(m.id, m.brand)}">
      <span class="mcard-media">
        ${m.img ? `<img src="${esc(m.img)}" alt="${esc((brandName ? brandName + ' ' : '') + m.model)}" loading="lazy" />`
                : `<span class="mcard-noimg">ไม่มีรูป</span>`}
      </span>
      <span class="mcard-name">${esc(m.model)}</span>
      ${m.desc ? `<span class="mcard-desc">${esc(m.desc)}</span>` : ''}
      <span class="mcard-go">ดูรายละเอียด ›</span>
    </a>`;
}

function catCard(brand, g) {
  return `
    <a class="cat-card reveal" href="${categoryUrl(brand.id, g.slug)}">
      <span class="cat-icon">${icon(g.icon)}</span>
      <span class="cat-body">
        <span class="cat-name">${esc(g.nameTh || g.name)}</span>
        <span class="cat-name-en">${esc(g.name)}</span>
      </span>
      <span class="cat-count">${g.count} รุ่น</span>
    </a>`;
}

/* ── Specs ──────────────────────────────────────────────────── */
/* payload = SPECS[specKey][id]; returns the block that goes inside
   #specs-mount, plus how many rows it holds. */
function specsBlock(payload) {
  const sections = (payload && payload.sections) || [];
  const total = sections.reduce((n, s) => n + s.items.length, 0);

  if (!total) {
    const feats = (payload && payload.features) || [];
    const paras = (payload && payload.paras) || [];
    if (feats.length || paras.length) {
      return { total: 0, html: `
        ${paras.length ? `<div class="panel" style="margin-bottom:18px;">
          ${paras.map(t => `<p class="t-body th" style="margin-bottom:12px;">${esc(t)}</p>`).join('')}
        </div>` : ''}
        ${feats.length ? `<div class="panel">
          <p class="feat-header">คุณสมบัติ</p>
          <ul class="feat-list">${feats.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
        </div>` : ''}` };
    }
    return { total: 0, html: `<p class="t-body th">ยังไม่มีตารางข้อมูลจำเพาะของรุ่นนี้
      — ติดต่อเราเพื่อขอเอกสารทางเทคนิค โทร. ${TEL}</p>` };
  }

  return { total, html: `
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
      <button class="btn btn-ghost" id="specsToggle" aria-expanded="false" aria-controls="specsGrid"
              data-total="${total}">ดูข้อมูลจำเพาะทั้งหมด (${total} รายการ)</button>
    </div>` };
}

/* ── Scraped model page ─────────────────────────────────────── */
const PAGES = {
  productSubnav(m, brand, group) {
    return `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="${group ? categoryUrl(m.brand, m.group) : brandUrl(m.brand)}">${esc(m.model)}</a>
        <div class="subnav-links">
          <a href="#overview">ภาพรวม</a>
          <a href="#specs">ข้อมูลจำเพาะ</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;
  },

  /* specsHtml: the build passes fully rendered specs; the browser
     passes nothing and fills #specs-mount after loading the file. */
  productMain(m, brand, group, related, specsHtml) {
    const crumb = [
      brand ? `<a class="crumb" href="${brandUrl(m.brand)}">${esc(brand.name)}</a>` : '',
      group ? `<a class="crumb" href="${categoryUrl(m.brand, m.group)}">${esc(group.nameTh || group.name)}</a>` : ''
    ].filter(Boolean).join(' · ');
    const alt = `${brand ? brand.name + ' ' : ''}${m.model} ${termsFor(m.brand, group).term}`.trim();

    return `
    <section class="hero product-hero" id="overview">
      <div class="wrap hero-copy">
        <nav class="t-eyebrow" aria-label="เส้นทาง">${crumb}</nav>
        <h1 class="t-display">${esc(m.model)}</h1>
        ${m.desc ? `<p class="t-lead th">${esc(m.desc)}</p>` : ''}
        <p class="t-body th product-intro">${esc(SEO.productIntro(m, brand, group))}</p>
        <div class="cta-row">
          <a class="link link-lg" href="#specs">ดูข้อมูลจำเพาะ</a>
          <a class="link link-lg" href="tel:0814913538">ขอใบเสนอราคา</a>
        </div>
      </div>
      ${m.img ? `<div class="hero-stage"><img src="${esc(m.img)}" alt="${esc(alt)}" /></div>` : ''}
    </section>

    <section class="section" id="specs">
      <div class="wrap">
        <div class="specs-head reveal">
          <div>
            <p class="t-eyebrow">Tech Specs</p>
            <h2 class="t-title">ข้อมูลจำเพาะ ${esc(m.model)}</h2>
          </div>
          ${m.datasheet ? `<a class="link" href="${esc(m.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลด PDF</a>` : ''}
        </div>
        <div id="specs-mount">${specsHtml || '<p class="t-body th">กำลังโหลดข้อมูลจำเพาะ…</p>'}</div>
      </div>
    </section>

    ${related.length ? `
    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">${termsFor(m.brand, group).term
            ? `${esc(termsFor(m.brand, group).term)} รุ่นอื่นของ ${esc(brand ? brand.name : '')}`
            : 'รุ่นอื่นในหมวดเดียวกัน'}</h2>
          <a class="link" href="${categoryUrl(m.brand, m.group)}">ดูทั้งหมด</a>
        </div>
        <div class="mgrid">${related.map(r => modelCard(r, brand && brand.name)).join('')}</div>
      </div>
    </section>` : ''}

    ${serviceLinks(m.brand, m.group, m) ? `<section class="section-tight"><div class="wrap">${serviceLinks(m.brand, m.group, m)}</div></section>` : ''}

    ${contactCard('สนใจรุ่นนี้?', 'ปรึกษาผู้เชี่ยวชาญเพื่อประเมินหน้างานและใบเสนอราคา', true)}`;
  },

  /* ── Hand-authored product (products.js) ── */
  richSections(p) {
    return [
      { id: 'overview',   label: 'ภาพรวม' },
      { id: 'highlights', label: 'จุดเด่น',    when: p.highlights && p.highlights.length },
      { id: 'gallery',    label: 'แกลเลอรี',   when: !!p.showcaseImage },
      { id: 'specs',      label: 'Tech Specs', when: p.specs && p.specs.length }
    ].filter(s => s.when === undefined || s.when);
  },

  richSubnav(p) {
    return `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="index.html#featured">${esc(p.name)}</a>
        <div class="subnav-links">
          ${PAGES.richSections(p).map(s => `<a href="#${s.id}">${s.label}</a>`).join('')}
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;
  },

  richMain(p) {
    const heroImg = (p.images && p.images[0]) || p.coverImage;
    const specRows = p.specs.map(s => `
      <div class="spec-row"><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('');
    return `
    <section class="hero hero-dark" id="overview">
      <div class="wrap hero-copy">
        <p class="t-eyebrow">${esc(p.category)}</p>
        <h1 class="t-display">${esc(p.name)}</h1>
        <p class="t-lead th">${esc(p.heroLead || p.subtitle)}</p>
        <div class="cta-row">
          <a class="link link-lg" href="#specs">ดูสเปกทั้งหมด</a>
          ${p.datasheet ? `<a class="link link-lg" href="${esc(p.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลดโบรชัวร์</a>` : ''}
        </div>
      </div>
      ${heroImg ? `<div class="hero-stage"><img src="${esc(heroImg)}" alt="${esc(p.name + ' ' + p.subtitle)}" /></div>` : ''}
    </section>

    ${p.keyStats && p.keyStats.length ? `
    <section class="section-tight" style="padding-top:64px;">
      <div class="wrap"><div class="stats reveal">
        ${p.keyStats.map(s => `
          <div class="stat"><div class="stat-num">${esc(s.num)}<sup>${esc(s.unit)}</sup></div>
          <div class="stat-label">${esc(s.label)}</div></div>`).join('')}
      </div></div>
    </section>` : ''}

    ${p.highlights && p.highlights.length ? `
    <section class="section-tight" id="highlights">
      <div class="wrap-wide"><header class="reveal" style="margin-bottom:30px;">
        <h2 class="t-title">จุดเด่นของรุ่นนี้</h2></header></div>
      <!-- tabindex + group role: a horizontally scrolling region has to be
           reachable and scrollable by keyboard alone (WCAG 2.1.1) -->
      <div class="hl-row" tabindex="0" role="group" aria-label="จุดเด่นของรุ่นนี้">
        ${p.highlights.map(h => `
          <article class="hl-card">
            <div class="hl-card-icon">${icon(h.icon)}</div>
            <h3 class="hl-card-title">${esc(h.title)}</h3>
            <p class="hl-card-body th">${esc(h.body)}</p>
          </article>`).join('')}
      </div>
    </section>` : ''}

    ${p.descriptionHtml ? `
    <section class="section bg-alt">
      <div class="wrap"><div class="panel reveal">${p.descriptionHtml}</div></div>
    </section>` : ''}

    ${p.showcaseImage ? `
    <section class="section" id="gallery">
      <div class="wrap-wide"><div class="showcase reveal">
        <img src="${esc(p.showcaseImage)}" alt="${esc(p.name)}" />
        ${p.showcaseTitle ? `
          <div class="showcase-caption">
            <h2 class="t-title">${esc(p.showcaseTitle)}</h2>
            <p class="t-body th" style="max-width:56ch;margin:0 auto;">${esc(p.showcaseText || '')}</p>
          </div>` : ''}
      </div></div>
    </section>` : ''}

    ${p.highlightFeatures && p.highlightFeatures.length ? `
    <section class="section bg-alt">
      <div class="wrap">
        <header class="reveal" style="margin-bottom:26px;"><h2 class="t-title">คุณสมบัติเด่น</h2></header>
        <ul class="alt-list reveal th">
          ${p.highlightFeatures.map(f => `<li>${esc(f)}</li>`).join('')}
        </ul>
      </div>
    </section>` : ''}

    <section class="section" id="specs">
      <div class="wrap">
        <div class="specs-head reveal">
          <div><p class="t-eyebrow">Tech Specs</p><h2 class="t-title">ข้อมูลจำเพาะ ${esc(p.name)}</h2></div>
          ${p.datasheet ? `<a class="link" href="${esc(p.datasheet)}" target="_blank" rel="noopener">ดาวน์โหลด PDF</a>` : ''}
        </div>
        <dl class="specs-grid specs-collapsed" id="specsGrid">${specRows}</dl>
        <div class="specs-toggle">
          <button class="btn btn-ghost" id="specsToggle" aria-expanded="false" aria-controls="specsGrid"
                  data-label="ดูสเปกทั้งหมด">ดูสเปกทั้งหมด</button>
        </div>
      </div>
    </section>

    ${contactCard('สนใจรุ่นนี้?', 'ปรึกษาผู้เชี่ยวชาญเพื่อประเมินหน้างานและใบเสนอราคา', true)}`;
  },

  /* ── Category page ── */
  categorySubnav(brand, group) {
    return `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="${brandUrl(brand.id)}">${esc(brand.name)}</a>
        <div class="subnav-links">
          <a href="#products">${esc(group.name)}</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;
  },

  categoryMain(brand, group, models) {
    const buckets = new Map();
    models.forEach(m => {
      const k = m.seriesTitle || m.series || '';
      if (!buckets.has(k)) buckets.set(k, []);
      buckets.get(k).push(m);
    });
    const blocks = [...buckets.entries()].map(([title, list]) => `
      <section class="series-block">
        ${title ? `
          <div class="series-block-head reveal">
            <h3 class="t-title">${esc(title)}</h3>
            <span class="t-small">${list.length} รุ่น</span>
          </div>` : ''}
        <div class="mgrid">${list.map(m => modelCard(m, brand.name)).join('')}</div>
      </section>`).join('');

    return `
    <section class="hero cat-hero">
      <div class="wrap hero-copy">
        <span class="cat-hero-icon">${icon(group.icon)}</span>
        <nav class="t-eyebrow" aria-label="เส้นทาง">
          <a href="${brandUrl(brand.id)}" class="crumb">${esc(brand.name)}</a>
          · ${esc(group.name)}
        </nav>
        <h1 class="t-display">${esc(group.nameTh || group.name)} ${esc(brand.name)}</h1>
        ${group.blurb ? `<p class="t-lead th">${esc(group.blurb)}</p>` : ''}
        <p class="t-body th product-intro">${esc(SEO.categoryIntro(brand, group, models.length))}</p>
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
        ${serviceLinks(brand.id, group.slug)}
      </div>
    </section>

    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">หมวดอื่นของ ${esc(brand.name)}</h2>
          <a class="link" href="${brandUrl(brand.id)}">ดูทั้งหมด</a>
        </div>
        <div class="cat-grid">
          ${brand.groups.filter(g => g.slug !== group.slug && g.count).slice(0, 8).map(g => catCard(brand, g)).join('')}
        </div>
      </div>
    </section>

    ${contactCard('สนใจสินค้าในหมวดนี้?', 'แจ้งรุ่นหรือลักษณะงานที่ต้องการ เราช่วยเลือกและเสนอราคาให้', false)}`;
  },

  /* ── Brand page ── */
  brandSubnav(brand) {
    return `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="index.html#brands">${esc(brand.name)}</a>
        <div class="subnav-links">
          <a href="#groups">หมวดสินค้า</a>
          <a class="btn btn-primary btn-sm" href="tel:0814913538">สอบถามราคา</a>
        </div>
      </div>
    </div>`;
  },

  brandMain(brand, dealerBrands) {
    const total = brand.groups.reduce((n, g) => n + (g.count || 0), 0);
    return `
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
          <h2 class="t-title">หมวดสินค้า ${esc(brand.name)}</h2>
          <span class="t-small">${brand.groups.length} หมวด · ${total} รุ่น</span>
        </div>
        <div class="cat-grid">
          ${brand.groups.filter(g => g.count).map(g => catCard(brand, g)).join('')}
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
          ${dealerBrands.filter(b => b.id !== brand.id).map(b => `
            <a class="brand-card reveal" href="${brandUrl(b.id)}">
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

    ${contactCard(`สนใจสินค้า ${brand.name}?`, 'แจ้งรุ่นหรือลักษณะงานที่ต้องการ เราช่วยเลือกและเสนอราคาให้', false)}`;
  }
};

/* ── Service / solution page (js/landing.js) ─────────────────── */
PAGES.landing = function (p) {
  return `
    <section class="hero landing-hero" id="overview">
      <div class="wrap hero-copy">
        <nav class="t-eyebrow" aria-label="เส้นทาง">
          <a class="crumb" href="index.html">หน้าแรก</a> · ${esc(p.eyebrow)}
        </nav>
        <h1 class="t-display">${esc(p.h1)}</h1>
        <p class="t-lead th">${esc(p.lead)}</p>
        <div class="cta-row">
          <a class="link link-lg" href="tel:0814913538">โทร ${TEL}</a>
          <a class="link link-lg" href="#faq">คำถามที่พบบ่อย</a>
        </div>
      </div>
      ${p.image ? `<div class="hero-stage"><img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.h1)}" /></div>` : ''}
    </section>

    ${p.sections.map((sec, i) => `
    <section class="section${i % 2 ? ' bg-alt' : ''}" id="${esc(sec.id)}">
      <div class="wrap">
        <h2 class="t-title landing-h2">${esc(sec.h2)}</h2>
        <div class="landing-body th">${sec.html}</div>
      </div>
    </section>`).join('')}

    <section class="section${p.sections.length % 2 ? ' bg-alt' : ''}" id="faq">
      <div class="wrap">
        <h2 class="t-title landing-h2">คำถามที่พบบ่อย</h2>
        <div class="faq th">
          ${p.faq.map(f => `
          <details class="faq-item">
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`).join('')}
        </div>
      </div>
    </section>

    ${contactCard('ปรึกษาและขอใบเสนอราคา', 'บอกเราว่าต้องการติดตั้งที่ไหน กี่จุด หรือขนาดเท่าไหร่ เราช่วยวางแผนและเสนอราคาให้', true)}`;
};

/* ── Browser-only wiring ────────────────────────────────────── */
function wireSpecsToggle() {
  const grid = document.getElementById('specsGrid');
  const btn  = document.getElementById('specsToggle');
  if (!grid || !btn) return;
  const total = btn.dataset.total;
  const more  = btn.dataset.label || `ดูข้อมูลจำเพาะทั้งหมด (${total} รายการ)`;
  btn.addEventListener('click', () => {
    const collapsed = grid.classList.toggle('specs-collapsed');
    btn.textContent = collapsed ? more : 'ย่อรายการ';
    btn.setAttribute('aria-expanded', String(!collapsed));
    if (collapsed && total) grid.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

function wireQuoteButton(product, related) {
  const qb = document.getElementById('quoteBtn');
  if (qb) qb.addEventListener('click', () => openQuote({ product, related: related || [] }));
}

function relatedModels(m, n) {
  const seen = new Set([m.id]);
  return MODELS.filter(x => x.brand === m.brand && x.group === m.group && x.img
    && !seen.has(x.id) && seen.add(x.id)).slice(0, n || 4);
}

function uniqueModels(filter) {
  const seen = new Set();
  return MODELS.filter(m => filter(m) && !seen.has(m.id) && seen.add(m.id));
}
