import json, re, html, time, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from parse_detail import parse_detail, squash, strip

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
d = json.load(open('products_raw.json'))

items = []
for g, subs in d.items():
    for s, v in subs.items():
        for it in v['items']:
            items.append(it)
print("detail pages to fetch:", len(items), flush=True)

CACHE = "detail_cache"
os.makedirs(CACHE, exist_ok=True)

def key(u): return re.sub(r'[^A-Za-z0-9]+','_',u)[-90:]

def fetch(it):
    p = os.path.join(CACHE, key(it['url']) + ".html")
    if os.path.exists(p) and os.path.getsize(p) > 50000:
        h = open(p, encoding='utf-8', errors='replace').read()
    else:
        r = subprocess.run(["curl","-sL","--compressed","--max-time","50","-A",UA,
                            "-H","Accept-Language: th,en", it['url']],
                           capture_output=True, timeout=70)
        h = r.stdout.decode('utf-8','replace')
        if len(h) < 50000: return False
        open(p,'w',encoding='utf-8').write(h)
    try:
        pd = parse_detail(h)
    except Exception:
        return False
    specs = [s for s in pd['specs'] if 'label' in s]
    it['specs'] = specs[:80]
    it['sections'] = pd['specs'][:120]
    if pd['datasheet'] and pd['datasheet'].lower().endswith('.pdf'):
        it['datasheet'] = pd['datasheet']
    return bool(specs)

done = 0
with ThreadPoolExecutor(max_workers=6) as ex:
    for i, ok in enumerate(ex.map(fetch, items)):
        done += 1 if ok else 0
        if (i+1) % 50 == 0: print(f"  {i+1}/{len(items)}  with specs: {done}", flush=True)

json.dump(d, open('products_raw.json','w'), ensure_ascii=False)
print("PRODUCTS WITH SPECS:", done, "/", len(items))
