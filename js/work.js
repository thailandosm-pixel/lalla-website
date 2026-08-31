/* ============================================================
   Project reference detail
   ============================================================ */

mountChrome('works');

const wid   = new URLSearchParams(window.location.search).get('id');
const work  = WORKS.find(w => w.id === wid);
const root  = document.getElementById('work-root');
const sub   = document.getElementById('subnav-slot');

if (!work) {
  sub.remove();
  root.innerHTML = `
    <section class="section center"><div class="wrap">
      <p class="t-eyebrow">404</p>
      <h1 class="t-headline">ไม่พบผลงานนี้</h1>
      <div class="cta-row" style="justify-content:center;">
        <a class="link link-lg" href="index.html#works">ดูผลงานทั้งหมด</a>
      </div>
    </div></section>`;
  initReveal();
} else {

  document.title = `${work.title} — ผลงานติดตั้ง | Lalla ลัลลา`;

  const others = WORKS.filter(w => w.id !== work.id).slice(0, 3);

  sub.outerHTML = `
    <div class="subnav">
      <div class="subnav-inner">
        <a class="subnav-name" href="index.html#works">${esc(work.title)}</a>
        <div class="subnav-links">
          <a href="#gallery">ภาพหน้างาน</a>
          <a class="btn btn-primary btn-sm" href="${SITE.contacts[0].href}">ปรึกษาโครงการ</a>
        </div>
      </div>
    </div>`;

  root.innerHTML = `
    <section class="work-hero">
      <img src="${esc(work.cover)}" alt="${esc(work.title)}" />
    </section>

    <section class="section-tight">
      <div class="wrap">
        <p class="t-eyebrow">Our Project Reference</p>
        <h1 class="t-headline">${esc(work.title)}</h1>
        ${work.titleTh ? `<p class="work-title-th th">${esc(work.titleTh)}</p>` : ''}
        <p class="t-lead th" style="margin-top:14px;">${esc(work.blurb)}</p>

        <dl class="work-facts reveal">
          ${work.facts.map(f => `
            <div class="work-fact">
              <dt>${esc(f.label)}</dt>
              <dd>${esc(f.value)}</dd>
            </div>`).join('')}
        </dl>
      </div>
    </section>

    <section class="section-tight" id="gallery">
      <div class="wrap-wide">
        <div class="series-head reveal">
          <h2 class="t-title">ภาพหน้างาน</h2>
          <span class="t-small">${work.photos.length} ภาพ</span>
        </div>
        <div class="work-gallery">
          ${work.photos.map(p => `
            <figure class="work-shot reveal">
              <img src="${esc(p)}" alt="${esc(work.title)}" loading="lazy" />
            </figure>`).join('')}
        </div>
      </div>
    </section>

    ${others.length ? `
    <section class="section bg-alt">
      <div class="wrap-wide">
        <div class="series-head reveal" style="margin-bottom:26px;">
          <h2 class="t-title">ผลงานอื่น</h2>
          <a class="link" href="index.html#works">ดูทั้งหมด</a>
        </div>
        <div class="works-grid">
          ${others.map(w => `
            <a class="work-card reveal" href="work.html?id=${encodeURIComponent(w.id)}">
              <div class="work-media"><img src="${esc(w.cover)}" alt="${esc(w.title)}" loading="lazy" /></div>
              <div class="work-cap">
                <span class="work-tag">${esc(w.product)}</span>
                <h3>${esc(w.title)}</h3>
                <p>${esc(w.place)}</p>
              </div>
            </a>`).join('')}
        </div>
      </div>
    </section>` : ''}

    <section class="section">
      <div class="wrap">
        <div class="contact-card reveal">
          <h2 class="t-headline">มีโครงการแบบนี้?</h2>
          <p class="th">ส่งข้อมูลพื้นที่มาให้เรา แล้วเราจะส่งผลสำรวจ แบบติดตั้ง และราคากลับไป</p>
          <div class="contact-actions">
            ${SITE.contacts.map((c, i) =>
              `<a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}" href="${c.href}">โทร. ${c.phone}</a>`).join('')}
          </div>
          <div class="contact-detail">
            <p>${esc(SITE.address)}</p>
            <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          </div>
        </div>
      </div>
    </section>`;

  initReveal();
  initScrollSpy('.subnav-links a');
}
