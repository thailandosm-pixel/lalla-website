import re, html

def strip(s): return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',s))).strip()

ITEM = re.compile(
  r'<li[^>]*class="[^"]*spec-highlight__item[^"]*"[^>]*>\s*'
  r'<[a-z]+[^>]*class="[^"]*spec-highlight__title[^"]*"[^>]*>(.*?)</[a-z]+>\s*'
  r'(?:.*?)<[a-z]+[^>]*class="[^"]*spec-highlight__value[^"]*"[^>]*>(.*?)</[a-z]+>', re.S)

def parse_samsung(h):
    out = {"specs": [], "sections": [], "datasheet": "", "gallery": [], "overview": ""}

    # detail blocks: section title + its items
    for blk in re.findall(r'<div class="spec-highlight__detail">(.*?)(?=<div class="spec-highlight__detail">|<div class="spec-highlight__information">|$)', h, re.S):
        tm = re.search(r'class="spec-highlight__detail-title"[^>]*>\s*<[^>]*class="spec-highlight__title"[^>]*>(.*?)</', blk, re.S)
        sec = strip(tm.group(1)) if tm else ""
        items = []
        for k, v in ITEM.findall(blk):
            k, v = strip(k), strip(v)
            if k and v: items.append({"label": k, "value": v[:400]})
        if items:
            if sec: out["sections"].append({"section": sec, "items": items})
            out["specs"] += items

    # fall back to the top "main specs" strip if no detail blocks
    if not out["specs"]:
        for k, v in ITEM.findall(h):
            k, v = strip(k), strip(v)
            if k and v: out["specs"].append({"label": k, "value": v[:400]})

    m = re.search(r'href="([^"]+\.pdf[^"]*)"', h)
    if m: out["datasheet"] = m.group(1)

    for u in re.findall(r'(//images\.samsung\.com/is/image/samsung/[^"\')\s]+)', h):
        u = "https:" + u
        if u not in out["gallery"]: out["gallery"].append(u)

    m = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', h)
    if m: out["overview"] = html.unescape(m.group(1))[:500]
    return out

if __name__ == "__main__":
    h = open('s_p1.html', encoding='utf-8', errors='replace').read()
    d = parse_samsung(h)
    print("specs:", len(d["specs"]), " sections:", len(d["sections"]))
    for s in d["sections"][:3]:
        print("  ==", s["section"])
        for it in s["items"][:4]: print("     ", it["label"], "=", it["value"][:60])
    print("datasheet:", d["datasheet"][:90])
    print("gallery:", len(d["gallery"]))
