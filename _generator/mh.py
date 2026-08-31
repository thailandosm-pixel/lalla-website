import re,html,json,subprocess
from concurrent.futures import ThreadPoolExecutor
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
CATS={
 "interactive-flat-panel":("Interactive Flat Panel","จอสัมผัสอัจฉริยะ",
   ["xboard-v7","xboard","xboard-for-mtr"]),
 "commercial-display":("Commercial Display","จอแสดงผลเชิงพาณิชย์",
   ["uw-series","cmb-series","cma-series"]),
 "dvled":("Direct View LED","จอ LED แบบ Direct View",
   ["led-gv27","outdoor-led","led-solutions","led-configurator","raptor-series","lq-foldable-led","led-fa27","led-cn27","led-em28"]),
 "audio-video":("Audio & Video","อุปกรณ์เสียงและภาพ",
   ["s07","uc-w31","bm35","uc-p30","dm30","tcp30m","xbar-w70","xbar-v70","xbar-v50","xbar-u50","bm45"]),
 "mtr":("Microsoft Teams Rooms","ชุดห้องประชุม Teams",
   ["xt-series","xcore-kit","xcore-kit-pro","xt10-vb-kit","xt10-ws-kit","xt20-ps-kit"]),
 "accessories":("Accessories","อุปกรณ์เสริม",
   ["smart-lectern","wireless-dongle-wt15s","panel-sp10"]),
 "software":("Software","ซอฟต์แวร์",["pivot","maxhub-share"]),
}
def fetch(slug):
    url=f"https://www.maxhub.com/us/{slug}/"
    r=subprocess.run(["curl","-sL","--compressed","--max-time","40","-A",UA,
                      "-w","\\n@@%{http_code}",url],capture_output=True,timeout=60)
    out=r.stdout.decode('utf-8','replace')
    code=out.rsplit("@@",1)[-1].strip()
    if code!="200" or len(out)<3000: return None
    h=out
    def meta(p):
        m=re.search(r'<meta[^>]+property="og:'+p+r'"[^>]+content="([^"]*)"',h) or \
          re.search(r'<meta[^>]+name="'+p+r'"[^>]+content="([^"]*)"',h)
        return html.unescape(m.group(1)).strip() if m else ""
    t=re.search(r'<title[^>]*>(.*?)</title>',h,re.S)
    title=meta("title") or (html.unescape(re.sub(r'<[^>]+>','',t.group(1))).strip() if t else slug)
    title=re.sub(r'\s*[\|\-–]\s*MAXHUB.*$','',title).strip()
    img=meta("image")
    if img.startswith("//"): img="https:"+img
    return {"slug":slug,"model":title or slug,"desc":meta("description")[:200],
            "url":url,"img":img}

data={}
jobs=[(c,s) for c,(en,th,slugs) in CATS.items() for s in slugs]
res={}
with ThreadPoolExecutor(max_workers=6) as ex:
    for (c,s),r in zip(jobs, ex.map(lambda j: fetch(j[1]), jobs)):
        if r: res.setdefault(c,[]).append(r)
for c,(en,th,_) in CATS.items():
    items=res.get(c,[])
    data[c]={"en":en,"th":th,"items":items}
    print(f"{c:24s} {len(items)}", [i['model'][:26] for i in items], flush=True)
json.dump(data,open('maxhub_raw.json','w'),ensure_ascii=False)
print("TOTAL",sum(len(v['items']) for v in data.values()))
