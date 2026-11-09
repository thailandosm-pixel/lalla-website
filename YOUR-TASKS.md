# สิ่งที่คุณต้องทำเอง — Tasks only you can do

Last updated: 2026-11-09

Claude cannot do these, for one of three reasons: they need **your Google /
Squarespace / GitHub login**, they need a **payment**, or they need a
**decision that is yours to make**. Everything else from the EngineeringScore
report is already done and pushed.

Tell Claude the number of any task and it will walk you through it.

---

## 1. Google Search Console — resubmit the sitemap 🔴 do this first, 5 minutes

**Why Claude can't:** it needs your Google login. (Search Console was verified
on 2026-10-16 with the TXT record - that part is done.)

**Why now:** on 2026-11-09 the site changed how its pages are built. Every
product, category and brand now has its own page with real content
(e.g. `lallathailand.com/dahua-network-cameras.html`). The old sitemap pointed
at `product.html?id=…` pages that were empty to Google. The new sitemap lists
**774 pages** - Google needs to be told to read it again.

**Steps**
1. https://search.google.com/search-console → property **lallathailand.com**
2. Left menu → **Sitemaps**. If an old `sitemap.xml` is listed, that's fine -
   type `sitemap.xml` again and click **Submit** so it is re-read
3. Top search bar → paste each URL below → **Request indexing** (one at a time;
   Google allows ~10 a day, so start with these - the four service pages first,
   they target the words customers actually type):
   - `https://lallathailand.com/smart-classroom.html`
   - `https://lallathailand.com/screen-installation.html`
   - `https://lallathailand.com/cctv-installation.html`
   - `https://lallathailand.com/interactive-display.html`
   - `https://lallathailand.com/`
   - `https://lallathailand.com/dahua.html`
   - `https://lallathailand.com/dahua-network-cameras.html`
   - `https://lallathailand.com/dahua-display-control.html`
   - `https://lallathailand.com/dahua-interactive-whiteboards.html`
   - `https://lallathailand.com/samsung-interactive-display.html`
   - `https://lallathailand.com/samsung-uhd-4k-signage.html`
   - `https://lallathailand.com/maxhub-interactive-flat-panel.html`
   - `https://lallathailand.com/dahua-ptz-cameras.html`
4. Check back in 1-2 weeks: **Pages** (how many indexed) and **Performance**
   (which searches show you). Tell Claude what you see.

---

## 2. Web3Forms — set the recipient to lallath2002@gmail.com 🔴 one setting left

**Done:** the form now really sends, and the false "success" screen is fixed.
Verified against the live API (HTTP 200, `success: true`).

**Still to do — 1 minute.** You signed up with `thailand.osm@gmail.com`, so
submissions go to *that* inbox by default. The recipient is set in the
Web3Forms dashboard, not in the website code (that is deliberate — it stops
anyone redirecting your leads).

1. Log in at https://web3forms.com with `thailand.osm@gmail.com`
2. Open the form **Lalla — ขอใบเสนอราคา** → **Settings**
3. Change the recipient / notification email to `lallath2002@gmail.com`
4. Save, then send yourself one test from the website to confirm

## 3. LINE Official Account 🟡 worth doing

**Why Claude can't:** it needs your phone number and LINE login.

**Why it matters:** most Thai customers would rather message on LINE than
compose an email. A LINE button on the site means the enquiry lands in your
LINE natively — nothing to automate, and you can send the ใบเสนอราคา PDF back
in the same chat thread.

**Steps**
1. https://lineforbusiness.com/th → create a free Official Account
2. Send Claude the account's link (`https://lin.ee/xxxxx`)
3. Claude adds the button to the site

Free. Replying to customer chats is unlimited; only mass broadcasts are metered.

---

## 4. Turn on auto-renew for the domain 🟡 do once

**Why Claude can't:** it is a billing setting in your Squarespace account.

**Why it matters:** if `lallathailand.com` expires, the website and anything
printed with that address stop working.

**Steps:** `account.squarespace.com/domains` → lallathailand.com → check that
**Auto-renew is ON**, and that the card on file is valid.

---

## 5. Verify the domain on GitHub 🟢 optional, security

**Why Claude can't:** it is in your personal GitHub account settings.

**Why it matters:** stops anyone else's GitHub site from ever claiming
`lallathailand.com`. The site works fine without it.

**Steps**
1. https://github.com/settings/pages (account settings, *not* the repo)
2. **Add a domain** → `lallathailand.com`
3. Add the TXT record it gives you in Squarespace (same place as task 1)
4. Click **Verify**

---

## 6. Four security headers GitHub Pages cannot send 🟡 your decision

**Why Claude can't:** GitHub Pages gives you **no way to set HTTP response
headers**. This is a hard platform limit, not something that can be coded
around. A `<meta>` tag is not a valid substitute for any of these four.

**Still missing after everything else:** HSTS, X-Content-Type-Options,
X-Frame-Options (clickjacking), Permissions-Policy.

**The fix, if you want it:** put **Cloudflare (free)** in front of the site.
You would change the nameservers at Squarespace to Cloudflare's, then add the
headers as a Transform Rule. About 30 minutes, and Claude can walk you through
all of it — but it moves your DNS to a third company, which is the part that is
your call.

**Is it urgent?** No. The site has no logins, no payments, and no customer data
in the browser. These are defence-in-depth, not open holes. But they will keep
costing you points on any security scan until something can set headers.

---

## 7. Decide: should catalogue pages swipe sideways on phones too? 🟢 question for you

**Why Claude didn't just do it:** the home page sections became horizontal
swipe rows because each holds 4–8 cards. The **catalogue** pages are different —
Network Cameras alone has 73 models, and one category has 598. Swiping sideways
through 73 cards is worse than scrolling down, and you can't see how far you've
got.

So catalogue pages still scroll **down**, with 2 small cards per row.

**If you'd rather they swiped too, say so** and Claude will change it. A middle
option exists: keep scrolling down, but make the cards smaller so more fit per
screen.

---

## 8. Re-scan with EngineeringScore 🟢 when you want

Re-run the scan at https://engineeringscore.com to see where the score lands
after this work. Expect the four header findings in task 6 to still be there.

---

## 9. Three places the website and your Company Profile disagree 🟡 answer when you can

**Why Claude can't:** only you know which document is current — the website or
the profile deck.

**Checked and correct, nothing to do:** Dell. Your Company Profile page 5 lists
all 17 brands, and the website's 14 match it exactly (the other 3 are the
Dahua/Samsung/MAXHUB dealerships, shown separately). Verified against
`Lalla-Company-Profile.pdf`.

**But three things don't match:**

| Item | Company Profile | Website |
| --- | --- | --- |
| Auto Parking System | listed (page 2) | missing |
| EV Charger | listed (page 2) | missing |
| Lighting System | not listed | shown |
| Epson, Optoma | listed as projector brands (page 8) | not in brand list |

**What to tell Claude:** for each one, which is right — add it to the website,
or drop it. If you do supply auto parking and EV chargers, those are missing
sales categories on your own site.

---

## 10. Four answers that would make the service pages win more searches 🟡 reply in chat

**Why Claude can't:** these are facts about your business that only you know.
Claude will not put a claim on the site that isn't true.

The new pages (ห้องเรียนอัจฉริยะ, รับติดตั้งจอ, ติดตั้งกล้องวงจรปิด, จอ interactive)
compete with installers who show all four of these. Each one you can confirm
goes straight onto the pages:

1. **Is the site survey (สำรวจหน้างาน) free?** Competitors lead with
   "สำรวจหน้างานฟรี". If yours is free too, say so - it's a strong reason to call.
2. **How long is your installation warranty?** (e.g. 1 year on workmanship,
   plus the manufacturer's warranty on the product)
3. **A "starting from" price for common jobs?** e.g. "กระดานอัจฉริยะ 75 นิ้ว
   พร้อมติดตั้ง เริ่มต้น ___ บาท", "กล้องวงจรปิด 4 ตัวพร้อมติดตั้ง เริ่มต้น ___ บาท".
   People search "ราคา" constantly; a real starting price ranks and converts.
4. **Photos of real installs** - especially an interactive board in a classroom
   and a CCTV job. Your project list today has LED screens, a queue system and
   stage hoists, but no classroom board or CCTV install, so those pages can't
   show proof yet. Even 3-4 phone photos help.

---

## Already done — nothing for you to do

- ✅ Accessibility: 0 violations, checked automatically on every push, at both
  desktop and phone width
- ✅ Colour contrast fixed (the brand green and grey both failed WCAG AA)
- ✅ Canonical links, Open Graph tags + share image, JSON-LD business data
- ✅ robots.txt + 705-URL sitemap
- ✅ Content-Security-Policy and Referrer-Policy (the two that *can* be set
  without response headers)
- ✅ Hero image 839 KB → 66 KB
- ✅ Dependabot alerts enabled
- ✅ Phone home page: 16 screens of scrolling → 8
- ✅ Domain live on HTTPS, www redirect, old github.io link redirects
- ✅ Dell on the brands page verified against your Company Profile (it is correct)
- ✅ Quote form sends for real; no more false success screen
- ✅ Google Search Console TXT record added and live in DNS
- ✅ Every product, category and brand has its own searchable page (2026-11-09)
- ✅ Service pages for ห้องเรียนอัจฉริยะ, รับติดตั้งจอ, ติดตั้งกล้องวงจรปิด, จอ interactive (2026-11-09)
- ✅ Internal notes (this file, CHANGELOG, README) no longer published on the site
