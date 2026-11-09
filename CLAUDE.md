# lallathailand.com

Read `README.md` → "How it is built and deployed" before changing anything.

- The site is **built**: `node tools/build.mjs` writes `_site/`, which is what
  GitHub Pages serves (via `.github/workflows/deploy.yml`). Never commit `_site/`.
- Page markup for products, categories and brands lives **once** in
  `js/pages.js`. Change it there - not in detail.js / category.js / brand.js.
- Build internal links with `js/urls.js`. Never hand-write `product.html?id=`.
- Before pushing: `node tools/build.mjs --check` must pass, and preview with
  `python3 -m http.server 8000 -d _site`. CI also fails the deploy on any
  JavaScript error, unrendered page, or accessibility violation.
- Log changes in `CHANGELOG.md`; owner-only tasks go in `YOUR-TASKS.md`.
