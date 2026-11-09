/* Site gate: every page template, at desktop and phone width.

   For each page it checks, in this order:
     1. no JavaScript error was thrown while the page loaded;
     2. the page actually rendered - it has an <h1> and is not still
        showing "กำลังโหลด…";
     3. axe-core finds no WCAG 2.1 AA violation.

   (1) and (2) exist because axe alone is not enough: on 2026-10-21 a
   change made every category page throw before rendering, and this
   gate passed it - a page stuck on a loading message has no
   accessibility violations. Those checks would have caught it.

   Runs against the BUILT site (_site/), i.e. what is actually
   deployed. Puppeteer ships its own matched Chromium, so there is no
   chromedriver/Chrome version skew on the runner. */
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080';
const PAGES = [
  '/index.html',
  '/brands.html',
  '/dahua.html',                                  /* static brand page    */
  '/dahua-interactive-whiteboards.html',          /* static category page */
  '/samsung-video-wall.html',
  '/dahua-lph86-mc480-u.html',                    /* static product page  */
  '/dahua-dhi-phria2-5-pl.html',                  /* hand-authored product */
  '/samsung-wa86f.html',
  '/smart-classroom.html',                        /* service pages (js/landing.js) */
  '/cctv-installation.html',
  '/led-screen.html',
  '/ev-charger.html',
  '/work.html?id=sacred-heart-chiangmai',
  '/product.html?id=lph86-mc480-u',               /* old link: must forward */
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'phone',   width: 390,  height: 844 },
];

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
let failures = 0;

for (const vp of VIEWPORTS) {
  console.log(`\n── ${vp.name} (${vp.width}px) ──`);
  for (const path of PAGES) {
    const page = await browser.newPage();
    const jsErrors = [];
    page.on('pageerror', e => jsErrors.push(String(e.message || e).split('\n')[0]));
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise(r => setTimeout(r, 1200));

    const state = await page.evaluate(() => ({
      url: location.pathname + location.search,
      h1: (document.querySelector('h1') || {}).textContent || '',
      loading: document.body.innerText.includes('กำลังโหลด…'),
    }));
    const problems = [];
    if (jsErrors.length) problems.push(`JavaScript error: ${jsErrors[0]}`);
    if (!state.h1.trim()) problems.push('no <h1> - the page did not render');
    if (state.loading) problems.push('still showing "กำลังโหลด…" - the page did not render');
    if (path.startsWith('/product.html?') && state.url.startsWith('/product.html'))
      problems.push('old ?id= link did not forward to the static page');

    const { violations } = await new AxePuppeteer(page).withTags(TAGS).analyze();
    for (const v of violations)
      problems.push(`[${v.impact}] ${v.id} — ${v.help} (${v.nodes.length}) ${v.nodes[0].target.join(' ')}`);

    if (problems.length) {
      failures += problems.length;
      console.log(`✗ ${path}`);
      problems.forEach(p => console.log(`    ${p}`));
    } else {
      console.log(`✓ ${path}${state.url !== path ? `  → ${state.url}` : ''}`);
    }
    await page.close();
  }
}

await browser.close();
console.log(`\n${failures === 0 ? 'All pages render, run without errors, and pass axe.' : failures + ' problem(s).'}`);
process.exit(failures === 0 ? 0 : 1);
