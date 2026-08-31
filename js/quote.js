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

          <div class="quote-actions">
            <button type="submit" class="btn btn-primary">ส่งคำขอใบเสนอราคา</button>
            <button type="button" class="btn btn-ghost" data-quote-close>ยกเลิก</button>
          </div>

          <p class="quote-foot t-small th">
            หรือโทรหาเราได้โดยตรง —
            ${SITE.contacts.map(c => `<a href="${c.href}">${c.phone}</a>`).join(' · ')}
          </p>
        </form>

        <div class="quote-done" id="quoteDone" hidden>
          <div class="quote-done-mark">✓</div>
          <h3 class="t-title">เปิดอีเมลให้แล้ว</h3>
          <p class="t-body th">
            เราได้เตรียมอีเมลพร้อมข้อมูลที่คุณกรอกไว้แล้ว กด <strong>ส่ง</strong>
            ในโปรแกรมอีเมลของคุณเพื่อส่งถึงเรา<br />
            หากอีเมลไม่เปิดขึ้นมา โทรหาเราได้ที่
            ${SITE.contacts.map(c => `<a href="${c.href}">${c.phone}</a>`).join(' · ')}
          </p>
          <div class="quote-actions">
            <button type="button" class="btn btn-primary" data-quote-close>ปิด</button>
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
  setTimeout(() => root.querySelector('.quote-drawer').focus(), 60);
}

function closeQuote() {
  document.body.classList.remove('quote-open');
}

function submitQuote(e) {
  e.preventDefault();
  const form = e.target;
  let firstBad = null;

  form.querySelectorAll('input[required]').forEach(inp => {
    const bad = !inp.checkValidity() || !inp.value.trim();
    inp.closest('.qf').classList.toggle('is-bad', bad);
    if (bad && !firstBad) firstBad = inp;
  });
  if (firstBad) { firstBad.focus(); return; }

  const d = new FormData(form);
  const related = d.getAll('related');
  const lines = [
    'ขอใบเสนอราคา — Lalla (Thailand)',
    '',
    `ชื่อ–นามสกุล : ${d.get('name')}`,
    `เบอร์โทรศัพท์ : ${d.get('phone')}`,
    `อีเมล : ${d.get('email')}`,
    `บริษัท / โรงเรียน : ${d.get('org')}`,
    `จำนวน : ${d.get('amount')}`,
    d.get('product') ? `สินค้าที่สนใจ : ${d.get('product')}` : '',
    related.length ? `สินค้าอื่นที่สนใจ : ${related.join(', ')}` : '',
    d.get('otherProduct') ? `ระบุเพิ่มเติม : ${d.get('otherProduct')}` : '',
    d.get('notes') ? `\nอื่น ๆ :\n${d.get('notes')}` : '',
    '',
    `— ส่งจากหน้า ${location.href}`
  ].filter(Boolean);

  const subject = `ขอใบเสนอราคา${d.get('product') ? ' — ' + d.get('product') : ''}`;
  window.location.href =
    `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(lines.join('\n'))}`;

  form.hidden = true;
  document.getElementById('quoteDone').hidden = false;
}

/* Clear the error state as soon as a field is corrected */
document.addEventListener('input', (e) => {
  const f = e.target.closest('.qf.is-bad');
  if (f && e.target.checkValidity() && e.target.value.trim()) f.classList.remove('is-bad');
});
