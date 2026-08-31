import re, html, json, subprocess, os
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CATS=[("interactive-display","Interactive Display","จอสัมผัสอินเทอร์แอคทีฟ"),
      ("qled-8k-signage","Neo QLED 8K","จอ Neo QLED 8K"),
      ("uhd-4k-signage","UHD 4K","จอ UHD 4K"),
      ("video-wall","Video Wall","จอวิดีโอวอลล์"),
      ("outdoor-signage","Outdoor & Window","จอกลางแจ้งและติดกระจก")]
BASE="https://www.samsung.com/th/business/smart-signage/"

def render(url, out):
    if os.path.exists(out) and os.path.getsize(out)>200000: return open(out,encoding='utf-8',errors='replace').read()
    r=subprocess.run([CHROME,"--headless","--disable-gpu","--window-size=1400,6000",
                      "--virtual-time-budget=30000","--dump-dom",url],
                     capture_output=True,timeout=180)
    h=r.stdout.decode('utf-8','replace')
    if len(h)>100000: open(out,'w',encoding='utf-8').write(h)
    return h

CARD=re.compile(r'<a class="pd12-product-card__image-link"\s+href="([^"]+)"\s+data-modelcode="([^"]*)"\s+data-modelname="([^"]*)"\s+aria-label="([^"]*)"',re.S)
IMG=re.compile(r'data-desktop-src="([^"]+)"')

data={}
for slug,en,th in CATS:
    h=render(BASE+slug+"/", f"sam_{slug}.html")
    items={}
    for m in CARD.finditer(h):
        href,code,name,label=m.groups()
        seg=h[m.end():m.end()+1500]
        im=IMG.search(seg)
        img=im.group(1) if im else ""
        if img.startswith("//"): img="https:"+img
        img=re.sub(r'\$\d+_\d+_PNG\$','$720_720_PNG$',img)
        key=name or code
        if key in items: continue
        items[key]={"model":name or code,"code":code,
                    "title":html.unescape(label),
                    "url":"https://www.samsung.com"+href,"img":img}
    data[slug]={"en":en,"th":th,"items":list(items.values())}
    print(f"{slug:22s} {len(items)} products",flush=True)

json.dump(data,open('samsung_raw.json','w'),ensure_ascii=False)
print("TOTAL",sum(len(v['items']) for v in data.values()))
