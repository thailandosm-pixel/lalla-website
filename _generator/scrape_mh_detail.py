import json, re, html, subprocess, os
from concurrent.futures import ThreadPoolExecutor
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
def strip(s): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<br\s*/?>',' / ',re.sub(r'<[^>]+>',' ',s)))).strip()

PANEL=re.compile(r'<div class="panel">(.*?)(?=<div class="panel">|</section>|$)',re.S)
TITLE=re.compile(r'<h4 class="title">(.*?)</h4>',re.S)
ITEM =re.compile(r'<div class="item">\s*<div class="key">(.*?)</div>\s*<div class="value-box">(.*?)</div>\s*</div>',re.S)
VAL  =re.compile(r'<div class="value">(.*?)</div>',re.S)

PARAM=re.compile(r'class="param-name"[^>]*>(.*?)</div>\s*<div[^>]*class="param-value"[^>]*>(.*?)</div>',re.S)
SUBT =re.compile(r'class="(?:sub-)?param-title"[^>]*>(.*?)</div>',re.S)

def parse_mh(h):
    specs=[]; sections=[]
    for blk in PANEL.findall(h):
        tm=TITLE.search(blk); sec=strip(tm.group(1)) if tm else ""
        items=[]
        for k,vb in ITEM.findall(blk):
            k=strip(k); vals=[strip(v) for v in VAL.findall(vb)]
            v=" / ".join([x for x in vals if x])[:400] or strip(vb)[:400]
            if k and v: items.append({"label":k,"value":v})
        if items:
            if sec: sections.append({"section":sec,"items":items})
            specs+=items
    # second layout: .spec-table with .param-name / .param-value
    if not specs:
        for k,v in PARAM.findall(h):
            k=strip(k); v=strip(v)[:400]
            if k and v and len(k)<90: specs.append({"label":k,"value":v})
        if specs: sections=[{"section":"Specification","items":specs}]
    # third layout: plain <table> spec rows
    if not specs:
        for tbl in re.findall(r'<table[^>]*>(.*?)</table>',h,re.S):
            rows=[]
            for tr in re.findall(r'<tr[^>]*>(.*?)</tr>',tbl,re.S):
                cells=[strip(c) for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>',tr,re.S)]
                cells=[c for c in cells if c]
                if len(cells)==2 and len(cells[0])<90:
                    rows.append({"label":cells[0],"value":cells[1][:400]})
            if len(rows)>=3:
                sections.append({"section":"Specification","items":rows})
                specs+=rows
    # de-dupe
    seen=set(); out=[]
    for it in specs:
        t=(it["label"],it["value"])
        if t in seen: continue
        seen.add(t); out.append(it)
    return out, sections

d=json.load(open('maxhub_raw.json'))
items=[it for v in d.values() for it in v['items']]
print("maxhub pages:",len(items),flush=True)

def work(it):
    r=subprocess.run(["curl","-sL","--compressed","--max-time","45","-A",UA,it['url']],
                     capture_output=True,timeout=70)
    h=r.stdout.decode('utf-8','replace')
    if len(h)<20000: return 0
    s,sec=parse_mh(h)
    it['specs']=s[:120]; it['sections']=sec[:20]
    m=re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"',h)
    if m: it['overview']=html.unescape(m.group(1))[:500]
    return len(s)

n=0
with ThreadPoolExecutor(max_workers=5) as ex:
    for it,c in zip(items, ex.map(work,items)):
        if c: n+=1
        print(f"  {it['model'][:34]:34s} {c} specs",flush=True)
json.dump(d,open('maxhub_raw.json','w'),ensure_ascii=False)
print("MAXHUB WITH SPECS:",n,"/",len(items))
