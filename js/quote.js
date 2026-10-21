/* ============================================================
   Quote request drawer
   Slides in from the right over ~75% of the viewport.
   Static site — the completed form is handed to the visitor's
   mail client, addressed to the office.
   ============================================================ */

let quoteMounted = false;

function buildQuoteDrawer() {
  const el = document.createElement('div');
  el.className = 'quote-root';
  el.innerHTML = `
    <div class="quote-overlay" data-quote-close></div>
    <aside class="quote-drawer" role="dialog" aria-modal="true"
           aria-labelledby="quoteTitle" tabindex="-1">
      <header class="quote-head">
        <div>
          <p class="t-eyebrow">Request a Quote</p>
          <h2 class="t-title" id="quoteTitle">ขอใบเสนอราคา</h2>
        </div>
        <button class="quote-close" data-quote-close aria-label="ปิด">&times;</button>
      </header>

      <div class="quote-body">
        <p class="t-body th quote-intro">
          กรอกข้อมูลด้านล่าง เราจะติดต่อกลับพร้อมใบเสนอราคา
          ช่องที่มีเครื่องหมาย <span class="req">*</span> จำเป็นต้องกรอก
        </p>

        <form id="quoteForm" novalidate>
          <div class="quote-grid">
            <label class="qf">
              <span class="qf-label">ชื่อ–นามสกุล <span class="req">*</span></span>
              <input type="text" name="name" required autocomplete="name" />
              <span class="qf-err">กรุณากรอกชื่อ–นามสกุล</span>
            </label>

            <label class="qf">
              <span class="qf-label">เบอร์โทรศัพท์ <span class="req">*</span></span>
              <input type="tel" name="phone" required autocomplete="tel"
                     inputmode="tel" pattern="[0-9()+\\-\\s]{6,}" />
              <span class="qf-err">กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง</span>
            </label>

            <label class="qf">
              <span class="qf-label">อีเมล <span class="req">*</span></span>
              <input type="email" name="email" required autocomplete="email" />
              <span class="qf-err">กรุณากรอกอีเมลให้ถูกต้อง</span>
            </label>

            <label class="qf">
              <span class="qf-label">บริษัท / โรงเรียน <span class="req">*</span></span>
              <input type="text" name="org" required autocomplete="organization" />
              <span class="qf-err">กรุณากรอกชื่อบริษัทหรือโรงเรียน</span>
            </label>

            <label class="qf">
              <span class="qf-label">จำนวน <span class="req">*</span></span>
              <input type="number" name="amount" required min="1" step="1" inputmode="numeric" />
              <span class="qf-err">กรุณาระบุจำนวน</span>
            </label>

            <label class="qf">
              <span class="qf-label">สินค้าที่สนใจ</span>
              <input type="text" name="product" id="quoteProduct" readonly />
            </label>
          </div>

          <fieldset class="qf-set" id="quoteRelatedSet">
            <legend class="qf-label">สินค้าอื่นที่สนใจ</legend>
            <div class="quote-related" id="quoteRelated"></div>
            <label class="qf qf-full">
              <span class="qf-label qf-sub">ระบุสินค้าอื่นเพิ่มเติม</span>
              <input type="text" name="otherProduct"
                     placeholder="เช่น รุ่น ขนาดจอ หรือจำนวนที่ต้องการ" />
            </label>
          </fieldset>

          <label class="qf qf-full">
            <span class="qf-label">อื่น ๆ</span>
            <textarea name="notes" rows="4"
              placeholder="รายละเอียดหน้างาน กำหนดการ งบประมาณ หรือคำถามอื่น ๆ"></textarea>
          </label>

          <label class="qf qf-full">
            <span class="qf-label">คุณรู้จักเราจากที่ไหน?</span>
            <select name="heardFrom">
              <option value="">— เลือก (ไม่บังคับ) —</option>
              <option value="Google">Google / ค้นหาออนไลน์</option>
              <option value="LINE">LINE</option>
              <option value="เพื่อนแนะนำ">เพื่อนหรือคนรู้จักแนะนำ</option>
              <option value="เคยใช้บริการ">เคยใช้บริการมาก่อน</option>
              <option value="Facebook">Facebook</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
          </label>

          <!-- honeypot: hidden from people, bots fill it in and get rejected -->
          <input type="checkbox" name="botcheck" class="quote-botcheck"
                 tabindex="-1" autocomplete="off" aria-hidden="true" />

          <div class="quote-actions">
            <button type="submit" class="btn btn-primary" id="quoteSubmit">ส่งคำขอใบเสนอราคา</button>
            <button type="button" class="btn btn-ghost" data-quote-close>ยกเลิก</button>
          </div>

          <p class="quote-foot t-small th">
            หรือโทรหาเราได้โดยตรง —
            ${SITE.contacts.map(c => `<a href="${c.href}">${c.phone}</a>`).join(' · ')}
          </p>
        </form>

        <div class="quote-done" id="quoteDone" hidden>
          <div class="quote-done-mark">✓</div>
          <h3 class="t-title">ส่งคำขอเรียบร้อยแล้ว</h3>
          <p class="t-body th">
            เราได้รับคำขอใบเสนอราคาของคุณแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด<br />
            หากต้องการด่วน โทรหาเราได้ที่
            ${SITE.contacts.map(c => `<a href="${c.href}">${c.phone}</a>`).join(' · ')}
          </p>
          <div class="quote-actions">
            <button type="button" class="btn btn-primary" data-quote-close>ปิด</button>
          </div>
        </div>

        <div class="quote-done is-fail" id="quoteFail" hidden>
          <div class="quote-done-mark is-fail">!</div>
          <h3 class="t-title">ส่งคำขอไม่สำเร็จ</h3>
          <p class="t-body th">
            ขออภัย ระบบส่งคำขอไม่สำเร็จ กรุณาลองอีกครั้ง
            หรือโทรหาเราโดยตรงเพื่อขอใบเสนอราคา<br />
            ${SITE.contacts.map(c => `<a href="${c.href}">${c.phone}</a>`).join(' · ')}
          </p>
          <div class="quote-actions">
            <button type="button" class="btn btn-primary" id="quoteRetry">ลองอีกครั้ง</button>
            <button type="button" class="btn btn-ghost" data-quote-close>ปิด</button>
          </div>
        </div>
      </div>
    </aside>`;
  document.body.appendChild(el);

  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-quote-close]')) closeQuote();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('quote-open')) closeQuote();
  });

  el.querySelector('#quoteForm').addEventListener('submit', submitQuote);
  quoteMounted = true;
  return el;
}

function openQuote(ctx = {}) {
  if (!quoteMounted) buildQuoteDrawer();
  const root = document.querySelector('.quote-root');

  root.querySelector('#quoteForm').hidden = false;
  root.querySelector('#quoteDone').hidden = true;

  const prod = root.querySelector('#quoteProduct');
  prod.value = ctx.product || '';
  prod.closest('.qf').style.display = ctx.product ? '' : 'none';

  const rel = root.querySelector('#quoteRelated');
  const list = ctx.related || [];
  rel.innerHTML = list.length
    ? list.map((r, i) => `
        <label class="qchk">
          <input type="checkbox" name="related" value="${esc(r)}" id="qrel${i}" />
          <span>${esc(r)}</span>
        </label>`).join('')
    : '<p class="t-small th qf-sub">ไม่มีรายการแนะนำ — พิมพ์สินค้าที่ต้องการด้านล่างได้เลย</p>';

  document.body.classList.add('quote-open');
  lallaTrack('quote_open', { product: ctx.product || '(none)', related_offered: list.length });
  setTimeout(() => root.querySelector('.quote-drawer').focus(), 60);
}

function closeQuote() {
  /* Closing while the form is still showing means they started a quote
     request and gave up - the single most useful number on the site. */
  const form = document.getElementById('quoteForm');
  if (document.body.classList.contains('quote-open') && form && !form.hidden) {
    const filled = [...new FormData(form).entries()]
      .filter(([k, v]) => k !== 'product' && String(v).trim()).length;
    lallaTrack('quote_abandoned', { fields_filled: filled });
  }
  document.body.classList.remove('quote-open');
}

/* Web3Forms endpoint. The access key is a public identifier for the
   destination inbox - it cannot read anything, and it is meant to ship
   in page source. The recipient address is set in the Web3Forms
   dashboard, not here, so a visitor cannot redirect the mail. */
const QUOTE_ENDPOINT = 'https://api.web3forms.com/submit';
const QUOTE_ACCESS_KEY = 'd12e1816-79cf-4976-9aa7-a8238e63728c';

async function submitQuote(e) {
  e.preventDefault();
  const form = e.target;
  let firstBad = null;

  form.querySelectorAll('input[required]').forEach(inp => {
    const bad = !inp.checkValidity() || !inp.value.trim();
    inp.closest('.qf').classList.toggle('is-bad', bad);
    if (bad && !firstBad) firstBad = inp;
  });
  if (firstBad) {
    lallaTrack('quote_validation_error', { field: firstBad.name });
    firstBad.focus();
    return;
  }

  const d = new FormData(form);
  const related = d.getAll('related');
  const product = d.get('product');

  const lines = [
    `ชื่อ–นามสกุล : ${d.get('name')}`,
    `เบอร์โทรศัพท์ : ${d.get('phone')}`,
    `อีเมล : ${d.get('email')}`,
    `บริษัท / โรงเรียน : ${d.get('org')}`,
    `จำนวน : ${d.get('amount')}`,
    product ? `สินค้าที่สนใจ : ${product}` : '',
    related.length ? `สินค้าอื่นที่สนใจ : ${related.join(', ')}` : '',
    d.get('otherProduct') ? `ระบุเพิ่มเติม : ${d.get('otherProduct')}` : '',
    d.get('notes') ? `\nอื่น ๆ :\n${d.get('notes')}` : '',
    d.get('heardFrom') ? `รู้จักเราจาก : ${d.get('heardFrom')}` : '',
    '',
    `— ส่งจากหน้า ${location.href}`
  ].filter(Boolean);

  const payload = {
    access_key: QUOTE_ACCESS_KEY,
    subject: `ขอใบเสนอราคา${product ? ' — ' + product : ''}`,
    from_name: 'เว็บไซต์ lallathailand.com',
    /* so hitting Reply in Gmail answers the customer, not the website */
    replyto: d.get('email'),
    botcheck: d.get('botcheck') ? true : false,

    'ชื่อ–นามสกุล': d.get('name'),
    'เบอร์โทรศัพท์': d.get('phone'),
    'อีเมล': d.get('email'),
    'บริษัท / โรงเรียน': d.get('org'),
    'จำนวน': d.get('amount'),
    'สินค้าที่สนใจ': product || '—',
    'สินค้าอื่นที่สนใจ': related.length ? related.join(', ') : '—',
    'ระบุเพิ่มเติม': d.get('otherProduct') || '—',
    'อื่น ๆ': d.get('notes') || '—',
    'รู้จักเราจาก': d.get('heardFrom') || '(ไม่ได้ระบุ)',
    'ส่งจากหน้า': location.href,
    message: lines.join('\n')
  };

  const btn = document.getElementById('quoteSubmit');
  const label = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'กำลังส่ง…'; }

  let ok = false;
  try {
    const res = await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    ok = res.ok && data.success === true;
  } catch (err) {
    ok = false;   /* offline, blocked, or the endpoint is down */
  }

  if (btn) { btn.disabled = false; btn.textContent = label; }

  /* Only claim it was sent once the server says so. */
  lallaTrack(ok ? 'quote_submit' : 'quote_submit_failed', {
    product: product || '(none)',
    amount: d.get('amount'),
    related_count: related.length,
    heard_from: d.get('heardFrom') || '(not answered)'
  });

  form.hidden = true;
  document.getElementById(ok ? 'quoteDone' : 'quoteFail').hidden = false;
  if (ok) form.reset();
}

/* "ลองอีกครั้ง" puts the filled-in form back, nothing retyped */
document.addEventListener('click', (e) => {
  if (!e.target.closest('#quoteRetry')) return;
  document.getElementById('quoteFail').hidden = true;
  document.getElementById('quoteForm').hidden = false;
});

/* Clear the error state as soon as a field is corrected */
document.addEventListener('input', (e) => {
  const f = e.target.closest('.qf.is-bad');
  if (f && e.target.checkValidity() && e.target.value.trim()) f.classList.remove('is-bad');
});
