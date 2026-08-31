import json, re, html, time, os, sys
import urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
tree = json.load(open('dahua_tree.json'))
BASE = "https://www.dahuasecurity.com/th/Products/All-Products"

import subprocess
def get(url, tries=3):
    for t in range(tries):
        try:
            p = subprocess.run(["curl","-sL","--compressed","--max-time","45",
                                "-A",UA,"-H","Accept-Language: th,en",url],
                               capture_output=True, timeout=60)
            out = p.stdout.decode("utf-8","replace")
            if len(out) > 5000: return out
        except Exception:
            pass
        time.sleep(1.2*(t+1))
    return ""

def strip(s): return html.unescape(re.sub('<[^>]+>', ' ', s)).strip()

CARD = re.compile(r'<div class="product-wrapper".{0,3000}?(?=<div class="product-wrapper"|<div class="common-paging"|$)', re.S)

def parse(h):
    out = []
    for c in CARD.findall(h):
        href = re.search(r'href="(/th/products/All-Products/[^"]+)"', c, re.I)
        img  = re.search(r'<img src="([^"]+)"', c)
        name = re.search(r'<h3[^>]*>(.*?)</h3>', c, re.S)
        desc = re.search(r'<p[^>]*>(.*?)</p>', c, re.S)
        if not (href and name): continue
        n = strip(name.group(1))
        if not n: continue
        out.append({"model": n,
                    "desc": strip(desc.group(1))[:220] if desc else "",
                    "img": img.group(1) if img else "",
                    "url": "https://www.dahuasecurity.com" + href.group(1)})
    return out

def pages(h):
    m = re.search(r'<ul class="el-pager">(.*?)</ul>', h, re.S)
    if not m: return 1
    nums = [int(x) for x in re.findall(r'>(\d+)<', m.group(1))]
    return max(nums) if nums else 1

jobs = []
for g, v in tree.items():
    if '?' in g: continue
    for s in v['subs']:
        jobs.append((g, s['slug'], html.unescape(s['title'])))
    if not v['subs']:
        jobs.append((g, None, None))

print("series to scrape:", len(jobs), flush=True)

def work(job):
    g, sslug, stitle = job
    url = f"{BASE}/{g}" + (f"/{urllib.parse.quote(sslug)}" if sslug else "")
    h = get(url)
    if not h: return (g, sslug, stitle, [])
    items = parse(h)
    np = pages(h)
    for p in range(2, min(np, 25)+1):
        hp = get(url + f"?page={p}")
        if hp: items += parse(hp)
    # de-dupe by model
    seen, uniq = set(), []
    for it in items:
        if it['model'] in seen: continue
        seen.add(it['model']); uniq.append(it)
    print(f"  {g}/{sslug or '-'}: {len(uniq)} (pages {np})", flush=True)
    return (g, sslug, stitle, uniq)

res = []
with ThreadPoolExecutor(max_workers=5) as ex:
    for r in ex.map(work, jobs):
        res.append(r)

data = {}
for g, sslug, stitle, items in res:
    data.setdefault(g, {})
    data[g][sslug or "_all"] = {"title": stitle, "items": items}

json.dump(data, open('products_raw.json','w'), ensure_ascii=False)
total = sum(len(v2['items']) for v in data.values() for v2 in v.values())
print("TOTAL PRODUCTS:", total)
