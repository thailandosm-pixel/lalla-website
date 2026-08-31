import json, os, re, subprocess, hashlib
from concurrent.futures import ThreadPoolExecutor

OUT = "/Users/thailandkitsakul/Desktop/Dahua/Website/assets/products"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
d = json.load(open('products_raw.json'))

def slugify(m):
    s = re.sub(r'[^A-Za-z0-9._-]+', '-', m).strip('-')
    return s[:70] or hashlib.md5(m.encode()).hexdigest()[:10]

tasks = {}
for g, subs in d.items():
    for s, v in subs.items():
        for it in v['items']:
            if not it['img']: continue
            ext = os.path.splitext(it['img'].split('?')[0])[1].lower() or '.png'
            if ext not in ('.png','.jpg','.jpeg','.webp'): ext='.png'
            fn = slugify(it['model']) + ext
            it['local'] = 'assets/products/' + fn
            tasks[fn] = it['img']

print("unique images:", len(tasks), flush=True)

def dl(kv):
    fn, url = kv
    p = os.path.join(OUT, fn)
    if os.path.exists(p) and os.path.getsize(p) > 800: return True
    r = subprocess.run(["curl","-sL","--max-time","40","-A",UA,
                        "-e","https://www.dahuasecurity.com/","-o",p,url],
                       capture_output=True)
    return os.path.exists(p) and os.path.getsize(p) > 800

with ThreadPoolExecutor(max_workers=8) as ex:
    ok = list(ex.map(dl, tasks.items()))
print("downloaded:", sum(ok), "/", len(tasks))

# drop dead images
bad=0
for g, subs in d.items():
    for s, v in subs.items():
        for it in v['items']:
            lp = it.get('local')
            if lp:
                full = "/Users/thailandkitsakul/Desktop/Dahua/Website/" + lp
                if not (os.path.exists(full) and os.path.getsize(full) > 800):
                    it['local'] = ''; bad += 1
print("missing images:", bad)
json.dump(d, open('products_raw.json','w'), ensure_ascii=False)
