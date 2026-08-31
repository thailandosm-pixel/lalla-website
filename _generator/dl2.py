import json,os,re,subprocess,hashlib
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
W="/Users/thailandkitsakul/Desktop/Dahua/Website"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
def slug(m): 
    s=re.sub(r'[^A-Za-z0-9._-]+','-',m).strip('-').lower()
    return (s[:60] or hashlib.md5(m.encode()).hexdigest()[:10])

def grab(url,dest,ref):
    if os.path.exists(dest) and os.path.getsize(dest)>800: return True
    subprocess.run(["curl","-sL","--max-time","45","-A",UA,"-e",ref,"-o",dest,url],capture_output=True)
    return os.path.exists(dest) and os.path.getsize(dest)>800

def conv(p):
    try:
        im=Image.open(p)
        if im.mode not in ("RGB","RGBA"): im=im.convert("RGBA")
        im.thumbnail((560,560),Image.LANCZOS)
        out=os.path.splitext(p)[0]+".webp"
        im.save(out,"WEBP",quality=82,method=5)
        if out!=p: os.remove(p)
        return os.path.relpath(out,W)
    except Exception: 
        return None

for brand,src,ref in [("samsung","samsung_raw.json","https://www.samsung.com/"),
                      ("maxhub","maxhub_raw.json","https://www.maxhub.com/")]:
    d=json.load(open(src)); outdir=f"{W}/assets/products-{brand}"
    os.makedirs(outdir,exist_ok=True)
    tasks=[]
    for cat,v in d.items():
        for it in v['items']:
            it['model']=re.sub(r'^MAXHUB\s*[-–]\s*','',it['model']).strip()
            if not it.get('img'): it['local']=''; continue
            ext=os.path.splitext(it['img'].split('?')[0])[1].lower()
            if ext not in ('.png','.jpg','.jpeg','.webp'): ext='.png'
            tasks.append((it, os.path.join(outdir, slug(it['model'])+ext)))
    with ThreadPoolExecutor(max_workers=6) as ex:
        oks=list(ex.map(lambda t: grab(t[0]['img'],t[1],ref), tasks))
    n=0
    for (it,p),ok in zip(tasks,oks):
        rel=conv(p) if ok else None
        it['local']=rel or ''
        n+= 1 if rel else 0
    json.dump(d,open(src,'w'),ensure_ascii=False)
    print(f"{brand}: {n}/{len(tasks)} images", flush=True)
