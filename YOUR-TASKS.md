# สิ่งที่คุณต้องทำเอง — Tasks only you can do

Last updated: 2026-10-09

Claude cannot do these, for one of three reasons: they need **your Google /
Squarespace / GitHub login**, they need a **payment**, or they need a
**decision that is yours to make**. Everything else from the EngineeringScore
report is already done and pushed.

Tell Claude the number of any task and it will walk you through it.

---

## 1. Google Search Console — connect the site 🔴 important

**Why Claude can't:** it needs you to sign in to your Google account.

**Why it matters:** right now you have no idea what Google sees. No indexing
errors, no idea which searches bring people to you, no way to ask Google to
re-crawl after a change. It is also how you check whether "lallath" is
actually finding you.

**Already prepared for you:** `robots.txt` and `sitemap.xml` (705 URLs) are
live, so you only need to point Search Console at them.

**Steps**
1. Go to https://search.google.com/search-console
2. Add property → **Domain** → `lallathailand.com`
3. It gives you a **TXT record**. Add it in Squarespace:
   `account.squarespace.com/domains` → lallathailand.com → DNS → Custom Records
   → TYPE `TXT`, NAME `@`, DATA = the value Google gives you
4. Back in Google, click **Verify** (may take a few minutes)
5. Left menu → **Sitemaps** → enter `sitemap.xml` → Submit
6. Check back in ~1 week: Pages report, and Performance to see your queries

---

## 2. Web3Forms key — make the quote form actually send 🔴 important

**Why Claude can't:** the key is emailed to you.

**Why it matters:** this is the one that is costing you money today. The
ขอใบเสนอราคา form opens the visitor's email app instead of submitting. If they
have no mail app set up, **the request disappears and the page still shows a
green "sent" checkmark** — so the customer thinks they contacted you, and you
never learn they existed.

**Steps**
1. Go to https://web3forms.com
2. Type `lallath2002@gmail.com`, press the button
3. Check your Gmail — it sends you an **Access Key**
4. Give that key to Claude. It will wire the form up and fix the false
   success screen.

Free for 250 submissions/month. No account, no card.

---

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
