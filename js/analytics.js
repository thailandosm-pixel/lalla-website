/* ============================================================
   Event tracking
   ------------------------------------------------------------
   Deliberately provider-agnostic. Everything on the site calls
   track(); this file decides where that goes. Nothing is sent
   until the visitor accepts in the consent banner, and events
   raised before that are buffered, then flushed on accept or
   dropped on refuse.

   TO SWITCH A PROVIDER ON
     1. Fill in one of the blocks in PROVIDERS below.
     2. Add its domain to the Content-Security-Policy in every
        .html <head> (script-src and connect-src), or the browser
        blocks it and nothing arrives.
   Until then every call is a no-op, except that ?debug=analytics
   prints each event to the console so the wiring can be checked.
   ============================================================ */

const ANALYTICS = {
  /* Paste a GA4 measurement id ("G-XXXXXXX") to enable GA4.      */
  ga4: '',
  /* Paste a Microsoft Clarity project id to enable Clarity.      */
  clarity: '',
  /* Paste a Cloudflare Web Analytics token to enable it.         */
  cloudflare: ''
};

const DEBUG = new URLSearchParams(location.search).get('debug') === 'analytics';
let ready = false;
const queue = [];

/* ── What page is this? Used to label every event ───────────── */
function pageContext() {
  const file = location.pathname.split('/').pop() || 'index.html';
  const q = new URLSearchParams(location.search);
  const map = {
    'index.html': 'home', 'brands.html': 'brands', 'brand.html': 'brand',
    'category.html': 'category', 'product.html': 'product',
    'work.html': 'work', '404.html': 'not_found'
  };
  return {
    page_type: map[file] || file,
    item_id: q.get('id') || undefined,
    brand: q.get('brand') || undefined,
    viewport: window.innerWidth < 735 ? 'phone' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
  };
}

/* ── The one function the rest of the site calls ────────────── */
function track(name, props = {}) {
  const event = { name, ...pageContext(), ...props, at: Date.now() };
  if (DEBUG) console.log('[analytics]', name, event);
  if (!ready) { queue.push(event); return; }
  send(event);
}

function send(event) {
  const { name, at, ...params } = event;
  if (ANALYTICS.ga4 && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  if (ANALYTICS.clarity && typeof window.clarity === 'function') {
    window.clarity('event', name);
  }
  /* Cloudflare Web Analytics counts page views only - it has no
     custom-event API, so nothing to forward here. */
}

/* ── Provider bootstrap, called only after consent ──────────── */
function startAnalytics() {
  if (ready) return;

  if (ANALYTICS.ga4) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.ga4, { anonymize_ip: true });
  }

  if (ANALYTICS.clarity) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + ANALYTICS.clarity;
    document.head.appendChild(s);
  }

  if (ANALYTICS.cloudflare) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: ANALYTICS.cloudflare }));
    document.head.appendChild(s);
  }

  ready = true;
  while (queue.length) send(queue.shift());
}

/* Refusal: throw the buffer away rather than hold it. */
function discardAnalytics() { queue.length = 0; }

/* ── Things worth measuring that nothing else reports ────────── */
function initAutoTracking() {
  track('page_view', { title: document.title, referrer: document.referrer || '(direct)' });

  /* A tap-to-call is a lead, and today it is completely invisible. */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('tel:')) {
      track('phone_click', { number: href.replace('tel:', ''), where: a.closest('.subnav') ? 'subnav'
        : a.closest('.footer') ? 'footer' : a.closest('.ribbon') ? 'ribbon' : 'page' });
    } else if (href.startsWith('mailto:')) {
      track('email_click');
    } else if (/\.pdf($|\?)/i.test(href)) {
      track('datasheet_click', { file: href.split('/').pop() });
    } else if (/^https?:\/\//i.test(href) && !href.includes(location.host)) {
      track('outbound_click', { to: new URL(href, location.href).hostname });
    }
  });

  /* How far down the page people actually get. */
  let marks = [25, 50, 75, 100];
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    const pct = Math.round((window.scrollY / h) * 100);
    while (marks.length && pct >= marks[0]) track('scroll_depth', { percent: marks.shift() });
  }, { passive: true });

  /* Did anyone actually use the phone swipe rows? */
  let swiped = new Set();
  document.addEventListener('scroll', (e) => {
    const row = e.target.closest && e.target.closest('.swipe-row');
    if (row && !swiped.has(row.id)) { swiped.add(row.id); track('swipe_row_used', { row: row.id }); }
  }, { capture: true, passive: true });
}

window.lallaTrack = track;
document.addEventListener('consent:granted', () => { startAnalytics(); });
document.addEventListener('consent:denied', discardAnalytics);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoTracking);
} else {
  initAutoTracking();
}
