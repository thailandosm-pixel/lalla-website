/* ============================================================
   Cookie / tracking consent (PDPA)
   ------------------------------------------------------------
   The site itself sets no cookies and stores nothing except the
   visitor's own answer to this banner, which is "strictly
   necessary" and needs no consent of its own.

   Anything that DOES track - analytics, heatmaps, pixels - must be
   loaded from loadAnalytics() below, never from a <script> tag in
   the page. That is what makes this a real consent gate rather
   than a notice: say no, and nothing that tracks is ever fetched.

   Under PDPA, refusing has to be as easy as accepting, so the two
   buttons are side by side and equally prominent.
   ============================================================ */

const CONSENT_KEY = 'lalla.consent.v1';

function readConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function writeConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
    localStorage.setItem(CONSENT_KEY + '.at', new Date().toISOString());
  } catch (e) { /* private mode: the choice holds for this visit only */ }
}

/* ── Where tracking goes when, and only when, consent is given ──
   Nothing is wired up yet, so today this does nothing at all.
   To switch analytics on later: add the snippet here, and add its
   domain to the Content-Security-Policy in every .html <head>
   (script-src and connect-src), or the browser will block it. */
function loadAnalytics() {
  document.dispatchEvent(new CustomEvent('consent:granted'));
}

function buildBanner() {
  const el = document.createElement('div');
  el.className = 'consent';
  el.id = 'consentBar';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'false');
  el.setAttribute('aria-labelledby', 'consentTitle');
  el.setAttribute('aria-describedby', 'consentText');
  el.innerHTML = `
    <div class="consent-inner">
      <div class="consent-copy">
        <p class="consent-title" id="consentTitle">การใช้คุกกี้</p>
        <p class="consent-text th" id="consentText">
          เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้ และขอความยินยอม
          ก่อนใช้คุกกี้เพื่อวิเคราะห์การใช้งาน หากคุณปฏิเสธ
          เราจะไม่เก็บข้อมูลการใช้งานของคุณ
        </p>
      </div>
      <div class="consent-actions">
        <button type="button" class="btn btn-ghost" id="consentDeny">ปฏิเสธ</button>
        <button type="button" class="btn btn-primary" id="consentAllow">ยอมรับ</button>
      </div>
    </div>`;
  return el;
}

function closeBanner(bar, returnFocusTo) {
  bar.remove();
  document.body.classList.remove('has-consent-bar');
  if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus();
}

function showConsentBanner() {
  if (document.getElementById('consentBar')) return;
  const opener = document.activeElement;
  const bar = buildBanner();
  document.body.appendChild(bar);
  document.body.classList.add('has-consent-bar');

  bar.querySelector('#consentAllow').addEventListener('click', () => {
    writeConsent('granted');
    loadAnalytics();
    closeBanner(bar, opener);
  });
  bar.querySelector('#consentDeny').addEventListener('click', () => {
    writeConsent('denied');
    document.dispatchEvent(new CustomEvent('consent:denied'));
    closeBanner(bar, opener);
  });

  /* move focus to the banner so keyboard and screen-reader users meet it */
  bar.querySelector('#consentDeny').focus();
}

function initConsent() {
  const choice = readConsent();
  if (choice === 'granted') { loadAnalytics(); return; }
  if (choice === 'denied') return;
  showConsentBanner();
}

/* Footer link "การตั้งค่าคุกกี้" reopens it so a choice can be changed */
document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-consent-open]')) return;
  e.preventDefault();
  showConsentBanner();
});

window.lallaConsent = {
  status: readConsent,
  open: showConsentBanner,
  reset() { try { localStorage.removeItem(CONSENT_KEY); } catch (e) {} showConsentBanner(); }
};

/* Run once the DOM is ready; the footer link works whenever it mounts. */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConsent);
} else {
  initConsent();
}
