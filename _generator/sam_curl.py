import json,re,html,subprocess
from concurrent.futures import ThreadPoolExecutor
from parse_samsung import parse_samsung
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
d=json.load(open('samsung_raw.json'))
items=[it for v in d.values() for it in v['items']]
print("samsung pages:",len(items),flush=True)
def work(it):
    for _ in range(3):
        r=subprocess.run(["curl","-sL","--compressed","--max-time","50","-A",UA,it['url']],capture_output=True,timeout=80)
        h=r.stdout.decode('utf-8','replace')
        if len(h)>150000: break
    else:
        return 0
    pd=parse_samsung(h)
    it['specs']=pd['specs'][:150]
    it['sections']=pd['sections'][:25]
    if pd.get('overview'): it['overview']=pd['overview']
    if pd.get('datasheet'): it['datasheet']=pd['datasheet']
    return len(pd['specs'])
n=0
with ThreadPoolExecutor(max_workers=5) as ex:
    for it,c in zip(items, ex.map(work,items)):
        if c: n+=1
        print(f"  {it['model'][:26]:26s} {c:4d} specs",flush=True)
json.dump(d,open('samsung_raw.json','w'),ensure_ascii=False)
print("SAMSUNG WITH SPECS:",n,"/",len(items))
