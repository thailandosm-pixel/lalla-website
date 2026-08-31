/* ============================================================
   Partner brands and their product groups.
   Product counts are live counts from js/models.js.
   ============================================================ */

const BRANDS = [
  {
    "id": "dahua",
    "name": "Dahua",
    "nameTh": "ดาห์ัว เทคโนโลยี",
    "wordmark": "",
    "logo": "assets/cutout/dahua-logo.png",
    "tagline": "Security & Display Solutions",
    "blurb": "ผู้ผลิตระบบกล้องวงจรปิด จอ LED และระบบภาพระดับโลก ครอบคลุมตั้งแต่กล้อง AI ไปจนถึงจอ LED ขนาดใหญ่",
    "site": "https://www.dahuasecurity.com/th/Products",
    "accent": "#e2231a",
    "groups": [
      {
        "slug": "Network-Cameras",
        "name": "Network Cameras",
        "nameTh": "กล้องวงจรปิดระบบเครือข่าย",
        "icon": "camera",
        "blurb": "กล้อง IP ความละเอียดสูง พร้อม AI วิเคราะห์ภาพ WizMind และ WizSense",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras",
        "count": 73
      },
      {
        "slug": "HDCVI-Cameras",
        "name": "HDCVI Cameras",
        "nameTh": "กล้องระบบ HDCVI",
        "icon": "camera-hd",
        "blurb": "กล้องอนาล็อกความละเอียดสูงผ่านสายโคแอกเชียล ติดตั้งง่าย ใช้สายเดิมได้",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras",
        "count": 63
      },
      {
        "slug": "Thermal-Cameras",
        "name": "Thermal Cameras",
        "nameTh": "กล้องถ่ายภาพความร้อน",
        "icon": "thermal",
        "blurb": "ตรวจจับความร้อนและเปลวไฟ สำหรับงานอุตสาหกรรมและพื้นที่เสี่ยง",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Thermal-Cameras",
        "count": 38
      },
      {
        "slug": "PTZ-Cameras",
        "name": "PTZ Cameras",
        "nameTh": "กล้องหมุนส่ายซูม",
        "icon": "ptz",
        "blurb": "หมุน ส่าย ซูมได้รอบทิศ ติดตามวัตถุอัตโนมัติ ครอบคลุมพื้นที่กว้าง",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras",
        "count": 20
      },
      {
        "slug": "Network-Recorders",
        "name": "NVR",
        "nameTh": "เครื่องบันทึกภาพเครือข่าย",
        "icon": "nvr",
        "blurb": "เครื่องบันทึกภาพผ่านเครือข่าย รองรับ AI และหลายช่องสัญญาณ",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders",
        "count": 13
      },
      {
        "slug": "HDCVI-Recorders",
        "name": "HDCVI Recorders",
        "nameTh": "เครื่องบันทึก HDCVI",
        "icon": "dvr",
        "blurb": "เครื่องบันทึก XVR รองรับทั้งกล้องอนาล็อกและกล้อง IP ในเครื่องเดียว",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders",
        "count": 68
      },
      {
        "slug": "Video-Intercoms",
        "name": "Video Intercom",
        "nameTh": "อินเตอร์คอมภาพ",
        "icon": "intercom",
        "blurb": "ระบบอินเตอร์คอมภาพสำหรับบ้าน อาคารชุด และสำนักงาน",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms",
        "count": 6
      },
      {
        "slug": "Access-Control",
        "name": "Access Control",
        "nameTh": "ระบบควบคุมการเข้าออก",
        "icon": "access",
        "blurb": "ควบคุมประตู สแกนใบหน้า บัตร ลายนิ้วมือ และระบบบันทึกเวลาทำงาน",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control",
        "count": 51
      },
      {
        "slug": "Alarms",
        "name": "Alarms",
        "nameTh": "ระบบแจ้งเตือน",
        "icon": "alarm",
        "blurb": "ระบบสัญญาณกันขโมยแบบมีสายและไร้สาย พร้อมชุดเฝ้าระวังภาคสนาม",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Alarms",
        "count": 1
      },
      {
        "slug": "Display--Control",
        "name": "Display & Control",
        "nameTh": "จอแสดงผลและระบบควบคุม",
        "icon": "display",
        "blurb": "จอมอนิเตอร์ วิดีโอวอลล์ ป้ายดิจิทัล และจอ LED รวมถึงระบบควบคุมศูนย์สั่งการ",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control",
        "count": 27
      },
      {
        "slug": "Interactive-Whiteboards",
        "name": "Interactive Whiteboards",
        "nameTh": "กระดานอัจฉริยะ",
        "icon": "board",
        "blurb": "กระดานอัจฉริยะสำหรับห้องประชุมและห้องเรียน พร้อมซอฟต์แวร์และอุปกรณ์เสริม",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards",
        "count": 12
      },
      {
        "slug": "Transmission",
        "name": "Transmission",
        "nameTh": "อุปกรณ์เครือข่าย",
        "icon": "switch",
        "blurb": "สวิตช์ PoE, ePoE, Core Switch และอุปกรณ์ไร้สายสำหรับงานระบบกล้อง",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Transmission",
        "count": 78
      },
      {
        "slug": "Storage",
        "name": "Storage",
        "nameTh": "อุปกรณ์จัดเก็บข้อมูล",
        "icon": "storage",
        "blurb": "ระบบจัดเก็บข้อมูลภาพแบบ IP Storage สำหรับงานขนาดใหญ่",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Storage",
        "count": 11
      },
      {
        "slug": "Traffic",
        "name": "Traffic",
        "nameTh": "ระบบจราจร",
        "icon": "traffic",
        "blurb": "ระบบตรวจจับจราจร ที่จอดรถอัจฉริยะ และเครื่องชาร์จรถยนต์ไฟฟ้า",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Traffic",
        "count": 15
      },
      {
        "slug": "Intelligent-EV-Charger",
        "name": "Intelligent EV Charger",
        "nameTh": "เครื่องชาร์จรถยนต์ไฟฟ้า",
        "icon": "ev",
        "blurb": "เครื่องชาร์จ EV ตระกูล D-Volt ทั้งรุ่นบ้านและเชิงพาณิชย์",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger",
        "count": 12
      },
      {
        "slug": "Explosion-Proof--Anti-Corrosion",
        "name": "Explosion-Proof & Anti-Corrosion",
        "nameTh": "กล้องกันระเบิดและกันการกัดกร่อน",
        "icon": "shield2",
        "blurb": "กล้องสำหรับพื้นที่เสี่ยงระเบิดและสภาพแวดล้อมที่มีการกัดกร่อนสูง",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Explosion-Proof--Anti-Corrosion",
        "count": 2
      },
      {
        "slug": "Intelligent-Computing",
        "name": "Intelligent Computing",
        "nameTh": "เซิร์ฟเวอร์ประมวลผล AI",
        "icon": "cpu",
        "blurb": "เซิร์ฟเวอร์ประมวลผลภาพและวิเคราะห์ข้อมูลด้วย AI",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-Computing",
        "count": 10
      },
      {
        "slug": "Drone",
        "name": "Drone",
        "nameTh": "โดรน",
        "icon": "drone",
        "blurb": "โดรนสำหรับงานอุตสาหกรรม พร้อมอุปกรณ์ติดตั้ง (Payload)",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Drone",
        "count": 12
      },
      {
        "slug": "Mobile",
        "name": "Mobile",
        "nameTh": "ระบบติดตั้งบนยานพาหนะ",
        "icon": "mobile",
        "blurb": "กล้องและอุปกรณ์บันทึกสำหรับยานพาหนะและงานภาคสนาม",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Mobile",
        "count": 7
      },
      {
        "slug": "Accessories",
        "name": "Accessories",
        "nameTh": "อุปกรณ์เสริม",
        "icon": "parts",
        "blurb": "ขายึด อะแดปเตอร์ สายสัญญาณ อุปกรณ์เสียง เซนเซอร์ และ UPS",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Accessories",
        "count": 37
      },
      {
        "slug": "Dedicated-Products",
        "name": "Dedicated Products",
        "nameTh": "สินค้าเฉพาะโครงการ",
        "icon": "project",
        "blurb": "สินค้าสำหรับงานโครงการโดยเฉพาะ",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/Dedicated-Products",
        "count": 9
      },
      {
        "slug": "DE-2564",
        "name": "DE64 Compliance",
        "nameTh": "ผลิตภัณฑ์ตรงตามข้อกำหนด DE64",
        "icon": "cert",
        "blurb": "รุ่นที่ตรงตามเกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (DE64)",
        "url": "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564",
        "count": 33
      }
    ]
  },
  {
    "id": "samsung",
    "name": "Samsung",
    "nameTh": "ซัมซุง สมาร์ทซิกเนจ",
    "wordmark": "SAMSUNG",
    "logo": "",
    "tagline": "Smart Signage",
    "blurb": "จอป้ายดิจิทัลและจอสัมผัสเชิงพาณิชย์ ตั้งแต่ Interactive Display จนถึง Neo QLED 8K และ Video Wall",
    "site": "https://www.samsung.com/th/business/smart-signage/",
    "accent": "#1428a0",
    "groups": [
      {
        "slug": "interactive-display",
        "name": "Interactive Display",
        "nameTh": "จอสัมผัสอินเทอร์แอคทีฟ",
        "icon": "board",
        "blurb": "จอสัมผัสสำหรับห้องประชุมและห้องเรียน เขียน วาด และแชร์หน้าจอได้ทันที",
        "url": "https://www.samsung.com/th/business/smart-signage/interactive-display/",
        "count": 11
      },
      {
        "slug": "qled-8k-signage",
        "name": "Neo QLED 8K",
        "nameTh": "จอ Neo QLED 8K",
        "icon": "display",
        "blurb": "จอป้ายดิจิทัลความละเอียด 8K ภาพคมชัดระดับสูงสุด",
        "url": "https://www.samsung.com/th/business/smart-signage/qled-8k-signage/",
        "count": 12
      },
      {
        "slug": "uhd-4k-signage",
        "name": "UHD 4K",
        "nameTh": "จอ UHD 4K",
        "icon": "display",
        "blurb": "จอป้ายดิจิทัล 4K สำหรับงานค้าปลีกและองค์กร",
        "url": "https://www.samsung.com/th/business/smart-signage/uhd-4k-signage/",
        "count": 11
      },
      {
        "slug": "video-wall",
        "name": "Video Wall",
        "nameTh": "จอวิดีโอวอลล์",
        "icon": "grid",
        "blurb": "จอวิดีโอวอลล์ขอบบางพิเศษ ต่อกันเป็นผืนใหญ่",
        "url": "https://www.samsung.com/th/business/smart-signage/video-wall/",
        "count": 6
      },
      {
        "slug": "outdoor-signage",
        "name": "Outdoor & Window",
        "nameTh": "จอกลางแจ้งและติดกระจก",
        "icon": "display",
        "blurb": "จอกลางแจ้งและจอติดกระจก ความสว่างสูง ทนทุกสภาพอากาศ",
        "url": "https://www.samsung.com/th/business/smart-signage/outdoor-signage/",
        "count": 8
      }
    ]
  },
  {
    "id": "maxhub",
    "name": "MAXHUB",
    "nameTh": "แม็กซ์ฮับ",
    "wordmark": "MAXHUB",
    "logo": "",
    "tagline": "Meeting Room Solutions",
    "blurb": "โซลูชันห้องประชุมครบวงจร จอสัมผัสอัจฉริยะ จอ LED และอุปกรณ์ประชุมทางไกลที่รับรองโดย Microsoft Teams",
    "site": "https://www.maxhub.com/us/",
    "accent": "#ff6a00",
    "groups": [
      {
        "slug": "interactive-flat-panel",
        "name": "Interactive Flat Panel",
        "nameTh": "จอสัมผัสอัจฉริยะ",
        "icon": "board",
        "blurb": "จอสัมผัสอัจฉริยะสำหรับห้องประชุมและการเรียนการสอน",
        "url": "https://www.maxhub.com/us/interactive-flat-panel/",
        "count": 1
      },
      {
        "slug": "commercial-display",
        "name": "Commercial Display",
        "nameTh": "จอแสดงผลเชิงพาณิชย์",
        "icon": "display",
        "blurb": "จอแสดงผลเชิงพาณิชย์ขนาดใหญ่สำหรับองค์กร",
        "url": "https://www.maxhub.com/us/commercial-display/",
        "count": 1
      },
      {
        "slug": "dvled",
        "name": "Direct View LED",
        "nameTh": "จอ LED แบบ Direct View",
        "icon": "grid",
        "blurb": "จอ LED แบบ Direct View ทั้งภายในและภายนอกอาคาร",
        "url": "https://www.maxhub.com/us/dvled/",
        "count": 4
      },
      {
        "slug": "audio-video",
        "name": "Audio & Video",
        "nameTh": "อุปกรณ์เสียงและภาพ",
        "icon": "conference",
        "blurb": "กล้อง ไมค์ ลำโพง และอุปกรณ์ประชุมทางไกล",
        "url": "https://www.maxhub.com/us/audio-video/",
        "count": 6
      },
      {
        "slug": "mtr",
        "name": "Microsoft Teams Rooms",
        "nameTh": "ชุดห้องประชุม Teams",
        "icon": "conference",
        "blurb": "ชุดอุปกรณ์ห้องประชุมที่รับรองโดย Microsoft Teams Rooms",
        "url": "https://www.maxhub.com/us/mtr/",
        "count": 6
      },
      {
        "slug": "accessories",
        "name": "Accessories",
        "nameTh": "อุปกรณ์เสริม",
        "icon": "parts",
        "blurb": "อุปกรณ์เสริมสำหรับระบบห้องประชุม",
        "url": "https://www.maxhub.com/us/accessories/",
        "count": 2
      },
      {
        "slug": "software",
        "name": "Software",
        "nameTh": "ซอฟต์แวร์",
        "icon": "software",
        "blurb": "ซอฟต์แวร์บริหารจัดการและแชร์หน้าจอ",
        "url": "https://www.maxhub.com/us/software/",
        "count": 1
      }
    ]
  },
];

/* ============================================================
   Other brands we supply and support.
   Source: Lalla Company Profile — "Brands: the brands we supply
   and support". These are sourcing brands, not dealerships —
   the three authorised dealer brands are in BRANDS above.
   ============================================================ */

const MORE_BRANDS = [
  { name: "Logitech",  th: "อุปกรณ์ประชุมทางไกลและอุปกรณ์ต่อพ่วง" },
  { name: "Ricoh",     th: "โปรเจกเตอร์และเครื่องพิมพ์" },
  { name: "Panasonic", th: "โปรเจกเตอร์และจอแสดงผล" },
  { name: "LG",        th: "จอแสดงผลและป้ายดิจิทัล" },
  { name: "Hikvision", th: "กล้องวงจรปิดและระบบความปลอดภัย" },
  { name: "Hisense",   th: "ทีวีและจอเชิงพาณิชย์" },
  { name: "Dell",      th: "คอมพิวเตอร์และจอมอนิเตอร์" },
  { name: "Lenovo",    th: "คอมพิวเตอร์และโน้ตบุ๊ก" },
  { name: "ASUS",      th: "คอมพิวเตอร์และโน้ตบุ๊ก" },
  { name: "Acer",      th: "คอมพิวเตอร์และโปรเจกเตอร์" },
  { name: "Xiaomi",    th: "เครื่องใช้ไฟฟ้าและอุปกรณ์อัจฉริยะ" },
  { name: "Brother",   th: "เครื่องพิมพ์และเครื่องใช้สำนักงาน" },
  { name: "Canon",     th: "กล้องและเครื่องพิมพ์" },
  { name: "Nikon",     th: "กล้องและอุปกรณ์ถ่ายภาพ" }
];
