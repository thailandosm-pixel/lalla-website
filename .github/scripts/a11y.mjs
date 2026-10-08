/* Accessibility gate: runs axe-core over every page template.
   Puppeteer ships its own matched Chromium, so there is no
   chromedriver/Chrome version skew on the runner. */
import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080';
const PAGES = [
  '/index.html',
  '/brands.html',
  '/brand.html?id=dahua',
  '/category.html?brand=dahua&id=Interactive-Whiteboards',
  '/product.html?id=lph86-mc480-u',
  '/product.html?id=dhi-phria2-5-pl',
  '/work.html?id=sacred-heart-chiangmai',
];
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
let total = 0;

for (const path of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 60000 });
  // the pages render from JS; give the templates a beat to mount
  await new Promise(r => setTimeout(r, 1200));

  const { violations } = await new AxePuppeteer(page).withTags(TAGS).analyze();
  if (violations.length) {
    total += violations.length;
    console.log(`\n✗ ${path}`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length})`);
      for (const n of v.nodes.slice(0, 5)) console.log(`      ${n.target.join(' ')}`);
      console.log(`      ${v.helpUrl}`);
    }
  } else {
    console.log(`✓ ${path}`);
  }
  await page.close();
}

await browser.close();
console.log(`\n${total === 0 ? 'No accessibility violations.' : total + ' violation type(s) found.'}`);
process.exit(total === 0 ? 0 : 1);
