#!/usr/bin/env node
/* ============================================================
   Static site build
   ------------------------------------------------------------
   Writes _site/: a copy of the site plus one static HTML page
   per product, category and brand, each with its real content,
   a Thai title and description, a canonical URL and structured
   data - so search engines can read every page without running
   JavaScript.

       node tools/build.mjs          build into _site/
       node tools/build.mjs --check  build, then fail on any problem

   Runs in CI on every push (.github/workflows/deploy.yml) and the
   output is what GitHub Pages serves. Nothing in _site/ is edited
   by hand or committed - change the data or js/pages.js instead.

   The markup comes from js/pages.js, the same templates the
   browser uses, so the static pages and the in-browser pages
   cannot drift apart.
   ============================================================ */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT  = path.join(ROOT, '_site');
const CHECK = process.argv.includes('--check');
/* problems fail --check (and so block a deploy); warnings are printed only. */
const problems = [];
const problem = (msg) => problems.push(msg);
const warnings = [];
const warn = (msg) => warnings.push(msg);

/* ── 1. Copy the site, minus what must never be public ───────── */
const EXCLUDE = new Set([
  '_site', 'tools', '_generator', '.git', '.github', '.claude',
  'node_modules', 'v1-original', '.DS_Store', '.gitignore',
  'package.json', 'package-lock.json'
]);
const EXCLUDE_EXT = new Set(['.md', '.py', '.mjs']);   /* internal notes and scripts */

function copyTree(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (EXCLUDE.has(ent.name)) continue;
    if (ent.isFile() && EXCLUDE_EXT.has(path.extname(ent.name))) continue;
    const a = path.join(src, ent.name), b = path.join(dst, ent.name);
    if (ent.isDirectory()) copyTree(a, b);
    else fs.copyFileSync(a, b);
  }
}
fs.rmSync(OUT, { recursive: true, force: true });
copyTree(ROOT, OUT);

/* The published urls.js links to the static pages. */
const urlsPath = path.join(OUT, 'js/urls.js');
const urlsSrc = fs.readFileSync(urlsPath, 'utf8');
if (!urlsSrc.includes('const LALLA_BUILT = false;')) problem('js/urls.js: LALLA_BUILT line not found');
fs.writeFileSync(urlsPath, urlsSrc.replace('const LALLA_BUILT = false;', 'const LALLA_BUILT = true;'));

/* ── 2. Load the site's own data and templates ──────────────── */
const ctx = { window: {}, console };
ctx.globalThis = ctx;
vm.createContext(ctx);
const specFiles = fs.readdirSync(path.join(ROOT, 'js/specs')).filter(f => f.endsWith('.js'))
  .map(f => `js/specs/${f}`);
/* The published (LALLA_BUILT = true) urls.js goes first, so every link
   the templates build points at a static page. */
const sources = ['js/brands.js', 'js/models.js', 'js/products.js', 'js/works.js',
                 'js/app.js', 'js/pages.js', ...specFiles];
const code = sources.map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n;\n');
vm.runInContext(
  fs.readFileSync(urlsPath, 'utf8') + '\n;\n' + code + `
  globalThis.SEO_TERMS = SEO_TERMS;
  globalThis.__ = { BRANDS, DEALER_BRANDS, MODELS, products, WORKS, SITE, SITE_URL,
    PAGES, SEO, esc, termsFor, isDealer, specsBlock,
    productSlug, categorySlug, brandSlug, productUrl, categoryUrl, brandUrl };`, ctx);
const S = ctx.__;
const SPECS = ctx.window.SPECS || {};

/* ── 3. Page shell ──────────────────────────────────────────── */
const CSP = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; "
  + "font-src 'self'; connect-src 'self' https://api.web3forms.com; form-action 'self'; base-uri 'self'; "
  + "object-src 'none'; frame-src 'none'; upgrade-insecure-requests";
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (p) => /^https?:/.test(p) ? p : `${S.SITE_URL}/${String(p).replace(/^\/+/, '')}`;
/* JSON inside <script>: break up "</" so a value can never close the tag. */
const ldJson = (obj) => JSON.stringify(obj, null, 0).replace(/</g, '\\u003c');

function head({ title, description, url, image, imageType, ld }) {
  const img = image ? abs(image) : `${S.SITE_URL}/assets/og-cover.jpg`;
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${attr(title)}</title>
  <meta name="description" content="${attr(description)}" />
  <link rel="canonical" href="${attr(url)}" />
  <link rel="icon" href="assets/Logo.jpg" />
  <link rel="preload" href="assets/fonts/FCIconic-Regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="assets/fonts/FCIconic-Bold.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="css/style.css" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Content-Security-Policy" content="${CSP}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Lalla (Thailand) — ลัลลา" />
  <meta property="og:locale" content="th_TH" />
  <meta property="og:url" content="${attr(url)}" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:image" content="${attr(img)}" />
  ${imageType ? `<meta property="og:image:type" content="${imageType}" />` : ''}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${attr(title)}" />
  <meta name="twitter:description" content="${attr(description)}" />
  <meta name="twitter:image" content="${attr(img)}" />
  <script type="application/ld+json">${ldJson(ld)}</script>
</head>`;
}

function page({ headHtml, subnav, main, mainId, data, scripts }) {
  const dataAttrs = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => ` data-${k}="${attr(v)}"`).join('');
  return `${headHtml}
<body>
  <div id="nav-slot"></div>
${subnav}
  <main id="${mainId}"${dataAttrs}>
${main}
  </main>
  <div id="footer-slot"></div>

  <script src="js/app.js"></script>
  <script src="js/urls.js"></script>
  <script src="js/pages.js"></script>
  <script src="js/analytics.js"></script>
  <script src="js/consent.js"></script>
${scripts.map(s => `  <script src="js/${s}"></script>`).join('\n')}
  <script src="js/static.js"></script>
</body>
</html>
`;
}

const breadcrumbLd = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url }))
});
const imgType = (p) => p && (/\.webp$/i.test(p) ? 'image/webp' : /\.png$/i.test(p) ? 'image/png'
  : /\.jpe?g$/i.test(p) ? 'image/jpeg' : undefined);

/* ── 4. Work out every page and its file name ───────────────── */
const written = new Map();            /* file name -> what claimed it */
const reserved = new Set(fs.readdirSync(OUT));
function claim(file, who) {
  if (reserved.has(file)) problem(`${file}: would overwrite an existing site file (${who})`);
  if (written.has(file)) problem(`${file}: claimed by both ${written.get(file)} and ${who}`);
  written.set(file, who);
}

const brandById = new Map(S.BRANDS.map(b => [b.id, b]));
const uniq = [];
{ const seen = new Set(); for (const m of S.MODELS) if (!seen.has(m.id)) { seen.add(m.id); uniq.push(m); } }
const rich = S.products.filter(p => !p.placeholder);
const richIds = new Set(rich.map(p => p.id));
const sitemap = [];
const home = { name: 'หน้าแรก', url: `${S.SITE_URL}/` };

/* Products scraped from the brands */
for (const m of uniq) {
  if (richIds.has(m.id)) continue;                        /* hand-authored page wins */
  const brand = brandById.get(m.brand);
  const group = brand && brand.groups.find(g => g.slug === m.group);
  if (!brand) { problem(`${m.id}: unknown brand ${m.brand}`); continue; }
  const file = `${S.productSlug(m.id, m.brand)}.html`;
  claim(file, `product ${m.id}`);

  const url = `${S.SITE_URL}/${file}`;
  const related = uniq.filter(x => x.brand === m.brand && x.group === m.group && x.id !== m.id && x.img).slice(0, 4);
  const specs = S.specsBlock((SPECS[m.specKey] || {})[m.id]);
  const title = S.SEO.productTitle(m, brand, group);
  const description = S.SEO.productDescription(m, brand, group);
  const { term } = S.termsFor(m.brand, group);

  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Product', '@id': `${url}#product`, name: `${brand.name} ${m.model}`,
      model: m.model, mpn: m.model, brand: { '@type': 'Brand', name: brand.name },
      category: group ? (group.nameTh || group.name) : undefined,
      description: [m.desc, S.SEO.productIntro(m, brand, group)].filter(Boolean).join(' — '),
      image: m.img ? [abs(m.img)] : undefined, url },
    breadcrumbLd([home, { name: brand.name, url: `${S.SITE_URL}/${S.brandUrl(brand.id)}` },
      ...(group ? [{ name: group.nameTh || group.name, url: `${S.SITE_URL}/${S.categoryUrl(brand.id, group.slug)}` }] : []),
      { name: m.model, url }])
  ] };

  fs.writeFileSync(path.join(OUT, file), page({
    headHtml: head({ title, description, url, image: m.img, imageType: imgType(m.img), ld }),
    subnav: S.PAGES.productSubnav(m, brand, group),
    main: S.PAGES.productMain(m, brand, group, related, specs.html),
    mainId: 'detail-root',
    data: { page: 'product', active: 'products', model: m.model, brand: m.brand, group: m.group,
            related: related.map(r => r.model).join('|') },
    scripts: ['quote.js']
  }));
  sitemap.push({ url, pri: '0.6' });
  if (!term) warn(`${m.id}: no Thai search term for ${m.brand}/${m.group}`);
}

/* Hand-authored products (products.js) */
for (const p of rich) {
  const file = `${S.productSlug(p.id, 'dahua')}.html`;
  claim(file, `rich product ${p.id}`);
  const url = `${S.SITE_URL}/${file}`;
  const title = S.SEO.richTitle(p);
  const description = String(p.heroLead || p.subtitle).slice(0, 160);
  const related = uniq.filter(x => x.group === 'Display--Control').slice(0, 6).map(x => x.model);
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Product', '@id': `${url}#product`, name: p.name, model: p.name, mpn: p.name,
      brand: { '@type': 'Brand', name: 'Dahua' }, category: p.category, description,
      image: [abs(p.coverImage || (p.images || [])[0])], url },
    breadcrumbLd([home, { name: 'Dahua', url: `${S.SITE_URL}/${S.brandUrl('dahua')}` }, { name: p.name, url }])
  ] };
  fs.writeFileSync(path.join(OUT, file), page({
    headHtml: head({ title, description, url, image: p.coverImage, imageType: imgType(p.coverImage), ld }),
    subnav: S.PAGES.richSubnav(p),
    main: S.PAGES.richMain(p),
    mainId: 'detail-root',
    data: { page: 'product', active: 'products', model: p.name, brand: 'dahua', group: p.category,
            related: related.join('|') },
    scripts: ['quote.js']
  }));
  sitemap.push({ url, pri: '0.7' });
}

/* Every title appends the brand name itself, so a search term that
   already contains it would print the brand twice. */
for (const [brandId, groups] of Object.entries(ctx.SEO_TERMS || {})) {
  const name = (brandById.get(brandId) || {}).name;
  for (const [slug, terms] of Object.entries(groups))
    if (name && terms[0] && terms[0].toLowerCase().includes(name.toLowerCase()))
      problem(`SEO_TERMS ${brandId}/${slug}: "${terms[0]}" repeats the brand name`);
}

/* Categories */
for (const brand of S.BRANDS) {
  for (const group of brand.groups) {
    const models = uniq.filter(m => m.brand === brand.id && m.group === group.slug);
    if (!models.length) continue;
    if (group.count !== models.length)
      warn(`${brand.id}/${group.slug}: brands.js says ${group.count} รุ่น, data has ${models.length}`);
    const file = `${S.categorySlug(brand.id, group.slug)}.html`;
    claim(file, `category ${brand.id}/${group.slug}`);
    const url = `${S.SITE_URL}/${file}`;
    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', '@id': `${url}#page`, name: `${group.nameTh || group.name} ${brand.name}`,
        description: S.SEO.categoryDescription(brand, group, models.length), url,
        mainEntity: { '@type': 'ItemList', numberOfItems: models.length,
          itemListElement: models.map((m, i) => ({ '@type': 'ListItem', position: i + 1,
            url: `${S.SITE_URL}/${S.productUrl(m.id, m.brand)}`, name: `${brand.name} ${m.model}` })) } },
      breadcrumbLd([home, { name: brand.name, url: `${S.SITE_URL}/${S.brandUrl(brand.id)}` },
        { name: group.nameTh || group.name, url }])
    ] };
    fs.writeFileSync(path.join(OUT, file), page({
      headHtml: head({ title: S.SEO.categoryTitle(brand, group, models.length),
        description: S.SEO.categoryDescription(brand, group, models.length), url, ld }),
      subnav: S.PAGES.categorySubnav(brand, group),
      main: S.PAGES.categoryMain(brand, group, models),
      mainId: 'cat-root',
      data: { page: 'category', active: 'products', brand: brand.id, group: group.slug, count: models.length },
      scripts: []
    }));
    sitemap.push({ url, pri: '0.8' });
  }
}

/* Brands */
for (const brand of S.BRANDS) {
  const file = `${S.brandSlug(brand.id)}.html`;
  claim(file, `brand ${brand.id}`);
  const url = `${S.SITE_URL}/${file}`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'CollectionPage', '@id': `${url}#page`, name: `${brand.name} — ${brand.nameTh}`,
      description: S.SEO.brandDescription(brand), url,
      about: { '@type': 'Brand', name: brand.name } },
    breadcrumbLd([home, { name: brand.name, url }])
  ] };
  fs.writeFileSync(path.join(OUT, file), page({
    headHtml: head({ title: S.SEO.brandTitle(brand), description: S.SEO.brandDescription(brand), url, ld }),
    subnav: S.PAGES.brandSubnav(brand),
    main: S.PAGES.brandMain(brand, S.DEALER_BRANDS),
    mainId: 'brand-root',
    data: { page: 'brand', active: 'partnership', brand: brand.id },
    scripts: []
  }));
  sitemap.push({ url, pri: '0.9' });
}

/* ── 5. Point links in the hand-written pages at the static ones ─
   index.html etc. are written with the old ?id= links so the
   unbuilt folder still works; the published copies link straight
   to the static pages instead of through a redirect. */
const modelBrand = new Map(uniq.map(m => [m.id, m.brand]));
rich.forEach(p => modelBrand.set(p.id, 'dahua'));
function rewriteLinks(html, where) {
  return html
    .replace(/(["'])category\.html\?brand=([^"'&#]+)&(?:amp;)?id=([^"'#]+)(#[^"']*)?\1/g,
      (all, q, b, id, hash) => {
        b = decodeURIComponent(b); id = decodeURIComponent(id);
        const br = brandById.get(b);
        if (!br || !br.groups.some(g => g.slug === id)) { problem(`${where}: link to unknown category ${b}/${id}`); return all; }
        return `${q}${S.categoryUrl(b, id)}${hash || ''}${q}`;
      })
    .replace(/(["'])brand\.html\?id=([^"'#]+)(#[^"']*)?\1/g, (all, q, id, hash) => {
      id = decodeURIComponent(id);
      if (!brandById.has(id)) { problem(`${where}: link to unknown brand ${id}`); return all; }
      return `${q}${S.brandUrl(id)}${hash || ''}${q}`;
    })
    .replace(/(["'])product\.html\?id=([^"'#]+)(#[^"']*)?\1/g, (all, q, id, hash) => {
      id = decodeURIComponent(id);
      if (!modelBrand.has(id)) { problem(`${where}: link to unknown product ${id}`); return all; }
      return `${q}${S.productUrl(id, modelBrand.get(id))}${hash || ''}${q}`;
    });
}
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith('.html') && !written.has(f))) {
  const p = path.join(OUT, f);
  fs.writeFileSync(p, rewriteLinks(fs.readFileSync(p, 'utf8'), f));
}

/* ── 6. Sitemap ─────────────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10);
const extra = [
  { url: `${S.SITE_URL}/`, pri: '1.0' },
  { url: `${S.SITE_URL}/brands.html`, pri: '0.8' },
  ...S.WORKS.map(w => ({ url: `${S.SITE_URL}/work.html?id=${encodeURIComponent(w.id)}`, pri: '0.5' }))
];
const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + [...extra, ...sitemap].map(e => `  <url><loc>${xmlEsc(e.url)}</loc><lastmod>${today}</lastmod><priority>${e.pri}</priority></url>`).join('\n')
  + `\n</urlset>\n`);

/* ── 7. Report ──────────────────────────────────────────────── */
const kinds = { product: 0, 'rich product': 0, category: 0, brand: 0 };
for (const who of written.values()) kinds[who.split(' ').slice(0, -1).join(' ')]++;
console.log(`built _site/: ${kinds.product + kinds['rich product']} product pages, `
  + `${kinds.category} category pages, ${kinds.brand} brand pages, `
  + `sitemap with ${extra.length + sitemap.length} URLs`);
if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.slice(0, 20).forEach(w => console.log('  · ' + w));
}
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.slice(0, 40).forEach(p => console.log('  - ' + p));
  if (CHECK) process.exit(1);
}
