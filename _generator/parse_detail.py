import re, html

def strip(s):
    return html.unescape(re.sub(r'<[^>]+>', ' ', s)).replace('\xa0',' ').strip()

def squash(s):
    return re.sub(r'\s+', ' ', s).strip()

def parse_detail(h):
    out = {"specs": [], "features": [], "images": [], "datasheet": "", "overview": ""}

    # ── spec table: rows of paired cells ──
    for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', h, re.S):
        tds = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)
        cells = [squash(strip(t)) for t in tds]
        cells = [c for c in cells if c != '']
        if len(cells) == 1:
            out["specs"].append({"section": cells[0]})
        elif len(cells) == 2:
            k, v = cells
            if k and v and len(k) < 90:
                out["specs"].append({"label": k, "value": v[:300]})

    # ── overview / features ──
    m = re.search(r'class="[^"]*product-overview[^"]*"[^>]*>(.*?)</div>', h, re.S)
    if m:
        out["overview"] = squash(strip(m.group(1)))[:600]
    for li in re.findall(r'<li[^>]*>(.*?)</li>', h, re.S)[:400]:
        t = squash(strip(li))
        if 12 < len(t) < 220 and not re.search(r'(Datasheet|คู่มือ|ภาพ|Cookie|เอกสาร)', t):
            out["features"].append(t)

    # ── gallery images ──
    for u in re.findall(r'https://material(?:file)?\.dahuasecurity\.com/[^"\')\s]+\.(?:png|jpg|jpeg|PNG|JPG)', h):
        if '_thumb' in u: continue
        if u not in out["images"]: out["images"].append(u)

    # ── datasheet pdf ──
    m = re.search(r'(https?://[^"\']+\.pdf)', h)
    if m: out["datasheet"] = m.group(1)
    return out

if __name__ == "__main__":
    h = open('prod1.html', encoding='utf-8', errors='replace').read()
    d = parse_detail(h)
    print("specs:", len(d["specs"]))
    for s in d["specs"][:14]: print("   ", s)
    print("features:", len(d["features"]), d["features"][:3])
    print("images:", len(d["images"]), d["images"][:2])
    print("datasheet:", d["datasheet"][:110])
