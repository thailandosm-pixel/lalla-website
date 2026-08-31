/* ============================================================
   Dahua product catalogue
   ------------------------------------------------------------
   Category and series structure mirrored from the official
   Dahua Thailand catalogue:
   https://www.dahuasecurity.com/th/Products

   Each series links to its official Dahua page, where the full
   model list and datasheets live. Products that Lalla stocks are
   given a local page instead — see `localProducts` in products.js
   and the `local` field below.
   ============================================================ */

const DAHUA_CATALOG = [
  {
    slug: "Network-Cameras",
    name: "Network Cameras",
    nameTh: "กล้องวงจรปิดระบบเครือข่าย",
    icon: "camera",
    blurb: "กล้อง IP ความละเอียดสูง พร้อม AI วิเคราะห์ภาพ WizMind และ WizSense",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras",
    series: [
      { name: "WizMind Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/WizMind-8-Series" },
      { name: "WizSense Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/WizSense-Series" },
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/Pro-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/Lite-Series" },
      { name: "Special Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/Special-Series" },
      { name: "Panoramic Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/Panoramic-Series" },
      { name: "WizMind X Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/WizMind-X-Series" },
      { name: "3 Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/3-Series" },
      { name: "2 Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/2-Series" },
      { name: "WITHS series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Cameras/WITHS-series" },
    ]
  },
  {
    slug: "HDCVI-Cameras",
    name: "HDCVI Cameras",
    nameTh: "กล้องระบบ HDCVI",
    icon: "camera-hd",
    blurb: "กล้องอนาล็อกความละเอียดสูงผ่านสายโคแอกเชียล ติดตั้งง่าย ใช้สายเดิมได้",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras",
    series: [
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/Pro-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/Lite-Series" },
      { name: "Cooper Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/Cooper-Series" },
      { name: "PT Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/PT-Series" },
      { name: "Panorama Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/Panorama-Series" },
      { name: "Micro-size Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/Micro-size-Series" },
      { name: "HDCVI accessories", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Cameras/HDCVI-Accessories" },
    ]
  },
  {
    slug: "Thermal-Cameras",
    name: "Thermal Cameras",
    nameTh: "กล้องถ่ายภาพความร้อน",
    icon: "thermal",
    blurb: "ตรวจจับความร้อนและเปลวไฟ สำหรับงานอุตสาหกรรมและพื้นที่เสี่ยง",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Thermal-Cameras",
    series: [
      { name: "Ultra Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Thermal-Cameras/Ultra-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Thermal-Cameras/Lite-Series" },
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Thermal-Cameras/Pro-Series" },
    ]
  },
  {
    slug: "PTZ-Cameras",
    name: "PTZ Cameras",
    nameTh: "กล้องหมุนส่ายซูม",
    icon: "ptz",
    blurb: "หมุน ส่าย ซูมได้รอบทิศ ติดตามวัตถุอัตโนมัติ ครอบคลุมพื้นที่กว้าง",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras",
    series: [
      { name: "WizMind Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/WizMind-Series" },
      { name: "WizSense Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/WizSense-Series" },
      { name: "Ultra Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/Ultra-Series" },
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/Pro-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/Lite-Series" },
      { name: "HDCVI PTZ Cameras", url: "https://www.dahuasecurity.com/th/Products/All-Products/PTZ-Cameras/HDCVI-PTZ-Cameras" },
    ]
  },
  {
    slug: "PT-Cameras",
    name: "PT Cameras",
    nameTh: "กล้องปรับมุมมอง",
    icon: "pt",
    blurb: "ปรับมุมกล้องซ้าย-ขวา ก้ม-เงย เหมาะกับพื้นที่ภายในอาคาร",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/PT-Cameras",
    series: [
      { name: "IP PT 1 Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PT-Cameras/IP-PT-1-Series" },
      { name: "IP PT 2 Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PT-Cameras/IP-PT-2-Series" },
      { name: "IP PT 3 Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PT-Cameras/IP-PT-3-Series" },
      { name: "HAC PT Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/PT-Cameras/HAC-PT-Series" },
    ]
  },
  {
    slug: "Network-Recorders",
    name: "NVR",
    nameTh: "เครื่องบันทึกภาพเครือข่าย",
    icon: "nvr",
    blurb: "เครื่องบันทึกภาพผ่านเครือข่าย รองรับ AI และหลายช่องสัญญาณ",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders",
    series: [
      { name: "WizMind Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders/WizMind-Series" },
      { name: "WizSense", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders/WizSense-Series" },
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders/Pro-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders/Lite-Series" },
      { name: "SSD NVR", url: "https://www.dahuasecurity.com/th/Products/All-Products/Network-Recorders/SSD-NVR" },
    ]
  },
  {
    slug: "HDCVI-Recorders",
    name: "HDCVI Recorders",
    nameTh: "เครื่องบันทึก HDCVI",
    icon: "dvr",
    blurb: "เครื่องบันทึก XVR รองรับทั้งกล้องอนาล็อกและกล้อง IP ในเครื่องเดียว",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders",
    series: [
      { name: "4K series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/4K-series" },
      { name: "4K Value/5MP Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/4K-Value5MP-Series" },
      { name: "5MP Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/5MP-Series" },
      { name: "5MP Value/1080p Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/5MP-Value1080p-Series" },
      { name: "1080N/720p Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/1080N720p-Series" },
      { name: "Cooper-I Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/Cooper-I-Series" },
      { name: "S-XVR Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/HDCVI-Recorders/S-XVR-Series" },
    ]
  },
  {
    slug: "Video-Intercoms",
    name: "Video Intercom",
    nameTh: "อินเตอร์คอมภาพ",
    icon: "intercom",
    blurb: "ระบบอินเตอร์คอมภาพสำหรับบ้าน อาคารชุด และสำนักงาน",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms",
    series: [
      { name: "IP Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms/IP-Series" },
      { name: "2-Wire Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms/2-Wire-Series" },
      { name: "4-Wire Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms/4-Wire-Series" },
      { name: "Emergency Phone Terminals", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms/Emergency-Phone-Terminals" },
      { name: "Accessory", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Intercoms/Accessories" },
    ]
  },
  {
    slug: "Access-Control",
    name: "Access Control",
    nameTh: "ระบบควบคุมการเข้าออก",
    icon: "access",
    blurb: "ควบคุมประตู สแกนใบหน้า บัตร ลายนิ้วมือ และระบบบันทึกเวลาทำงาน",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control",
    series: [
      { name: "Controller", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Controllers" },
      { name: "Standalone", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Standalone" },
      { name: "Time Attendance", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Time-Attendance" },
      { name: "Reader", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Readers" },
      { name: "Module", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Modules" },
      { name: "Accessory", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Accessories" },
      { name: "Turnstiles", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/Turnstiles" },
      { name: "AI", url: "https://www.dahuasecurity.com/th/Products/All-Products/Access-Control/AI" },
    ]
  },
  {
    slug: "Alarms",
    name: "Alarms",
    nameTh: "ระบบแจ้งเตือน",
    icon: "alarm",
    blurb: "ระบบสัญญาณกันขโมยแบบมีสายและไร้สาย พร้อมชุดเฝ้าระวังภาคสนาม",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Alarms",
    series: [
      { name: "Wireless Alarm", url: "https://www.dahuasecurity.com/th/Products/All-Products/Alarms/Wireless-Alarm" },
      { name: "Wired Alarm", url: "https://www.dahuasecurity.com/th/Products/All-Products/Alarms/Wired-Alarm" },
      { name: "Field Surveillance Unit", url: "https://www.dahuasecurity.com/th/Products/All-Products/Alarms/Field-Surveillance-Unit" },
    ]
  },
  {
    slug: "Display--Control",
    name: "Display & Control",
    nameTh: "จอแสดงผลและระบบควบคุม",
    icon: "display",
    blurb: "จอมอนิเตอร์ วิดีโอวอลล์ ป้ายดิจิทัล และจอ LED รวมถึงระบบควบคุมศูนย์สั่งการ",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control",
    series: [
      { name: "Control", url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control/Control" },
      { name: "Monitor", url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control/Monitors" },
      { name: "LCD Display Unit", url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control/LCD-Video-Walls" },
      { name: "LCD Digital Signage", url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control/LCD-Digital-Signage" },
      { name: "LED Display", url: "https://www.dahuasecurity.com/th/Products/All-Products/Display--Control/LED-Displays" },
    ]
  },
  {
    slug: "Interactive-Whiteboards",
    name: "Interactive Whiteboards",
    nameTh: "กระดานอัจฉริยะ",
    icon: "board",
    blurb: "กระดานอัจฉริยะสำหรับห้องประชุมและห้องเรียน พร้อมซอฟต์แวร์และอุปกรณ์เสริม",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards",
    series: [
      { name: "Pro Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards/Pro-Series" },
      { name: "Lite Series", url: "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards/Lite-Series" },
      { name: "Accessories", url: "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards/Accessories" },
      { name: "Software", url: "https://www.dahuasecurity.com/th/Products/All-Products/Interactive-Whiteboards/Software" },
    ]
  },
  {
    slug: "Video-Conferencing",
    name: "Video Conferencing",
    nameTh: "ระบบประชุมทางไกล",
    icon: "conference",
    blurb: "กล้องประชุม ไมค์ ลำโพง และระบบประชุมทางไกลครบชุด",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Conferencing",
    series: [
      { name: "USB Camera", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Conferencing/USB-Camera" },
      { name: "Mic & Speaker", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Conferencing/Mic--Speaker" },
      { name: "Conference Camera", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Conferencing/Conference-Camera" },
      { name: "Video Conference System", url: "https://www.dahuasecurity.com/th/Products/All-Products/Video-Conferencing/Video-Conference-System" },
    ]
  },
  {
    slug: "Transmission",
    name: "Transmission",
    nameTh: "อุปกรณ์เครือข่าย",
    icon: "switch",
    blurb: "สวิตช์ PoE, ePoE, Core Switch และอุปกรณ์ไร้สายสำหรับงานระบบกล้อง",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission",
    series: [
      { name: "PoE Switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/PoE-Switches" },
      { name: "ePoE Switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/ePoE-Switches" },
      { name: "Cloud Managed Switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Cloud-Managed-Switches" },
      { name: "Access Switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Access-Switches" },
      { name: "Aggregation switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Aggregation-Switches" },
      { name: "Core Switches", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Core-Switches" },
      { name: "Wireless Devices", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Wireless-Devices" },
      { name: "Accessories", url: "https://www.dahuasecurity.com/th/Products/All-Products/Transmission/Accessories" },
    ]
  },
  {
    slug: "Storage",
    name: "Storage",
    nameTh: "อุปกรณ์จัดเก็บข้อมูล",
    icon: "storage",
    blurb: "ระบบจัดเก็บข้อมูลภาพแบบ IP Storage สำหรับงานขนาดใหญ่",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Storage",
    series: [
      { name: "IP Storage", url: "https://www.dahuasecurity.com/th/Products/All-Products/Storage/IP-Storage" },
    ]
  },
  {
    slug: "Software",
    name: "Software",
    nameTh: "ซอฟต์แวร์",
    icon: "software",
    blurb: "DSS สำหรับศูนย์ควบคุม และ DMSS สำหรับดูผ่านมือถือ",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Software",
    series: [
      { name: "DSS", url: "https://www.dahuasecurity.com/th/Products/All-Products/Software/DSS" },
      { name: "DMSS", url: "https://www.dahuasecurity.com/th/Products/All-Products/Software/DMSS" },
    ]
  },
  {
    slug: "Traffic",
    name: "Traffic",
    nameTh: "ระบบจราจร",
    icon: "traffic",
    blurb: "ระบบตรวจจับจราจร ที่จอดรถอัจฉริยะ และเครื่องชาร์จรถยนต์ไฟฟ้า",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Traffic",
    series: [
      { name: "Intelligent Traffic Products", url: "https://www.dahuasecurity.com/th/Products/All-Products/Traffic/Intelligent-Traffic-Products" },
      { name: "Smart Parking Products", url: "https://www.dahuasecurity.com/th/Products/All-Products/Traffic/Smart-Parking-Products" },
      { name: "EV Charger", url: "https://www.dahuasecurity.com/th/Products/All-Products/Traffic/EV-Charger" },
    ]
  },
  {
    slug: "Intelligent-EV-Charger",
    name: "Intelligent EV Charger",
    nameTh: "เครื่องชาร์จรถยนต์ไฟฟ้า",
    icon: "ev",
    blurb: "เครื่องชาร์จ EV ตระกูล D-Volt ทั้งรุ่นบ้านและเชิงพาณิชย์",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger",
    series: [
      { name: "D-Volt Air", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Air" },
      { name: "D-Volt Pro", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Pro" },
      { name: "D-Volt Mini", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Mini" },
      { name: "D-Volt Desktop & D-Volt APP", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Desktop--D-Volt-APP" },
      { name: "D-Volt Nova", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Nova" },
      { name: "D-Volt Ultra", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-EV-Charger/D-Volt-Ultra" },
    ]
  },
  {
    slug: "Security-Screening",
    name: "Security Screening",
    nameTh: "ระบบตรวจคัดกรอง",
    icon: "screening",
    blurb: "เครื่องตรวจจับโลหะและระบบคัดกรองความปลอดภัยทางเข้า",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Security-Screening",
    series: [
      { name: "Security Screening Server", url: "https://www.dahuasecurity.com/th/Products/All-Products/Security-Screening/Security-Screening-Server" },
      { name: "Metal Detector", url: "https://www.dahuasecurity.com/th/Products/All-Products/Security-Screening/Metal-Detector" },
    ]
  },
  {
    slug: "Explosion-Proof--Anti-Corrosion",
    name: "Explosion-Proof & Anti-Corrosion",
    nameTh: "กล้องกันระเบิดและกันการกัดกร่อน",
    icon: "shield2",
    blurb: "กล้องสำหรับพื้นที่เสี่ยงระเบิดและสภาพแวดล้อมที่มีการกัดกร่อนสูง",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Explosion-Proof--Anti-Corrosion",
    series: [
      { name: "Explosion-proof", url: "https://www.dahuasecurity.com/th/Products/All-Products/Explosion-Proof--Anti-Corrosion/Explosion-Proof-Cameras" },
    ]
  },
  {
    slug: "Intelligent-Computing",
    name: "Intelligent Computing",
    nameTh: "เซิร์ฟเวอร์ประมวลผล AI",
    icon: "cpu",
    blurb: "เซิร์ฟเวอร์ประมวลผลภาพและวิเคราะห์ข้อมูลด้วย AI",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-Computing",
    series: [
      { name: "Intelligent Video Server", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-Computing/Intelligent-Video-Server" },
      { name: "Intelligent Video Surveillance Server", url: "https://www.dahuasecurity.com/th/Products/All-Products/Intelligent-Computing/Intelligent-Video-Surveillance-Server" },
    ]
  },
  {
    slug: "Drone",
    name: "Drone",
    nameTh: "โดรน",
    icon: "drone",
    blurb: "โดรนสำหรับงานอุตสาหกรรม พร้อมอุปกรณ์ติดตั้ง (Payload)",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Drone",
    series: [
      { name: "Industrial Drone", url: "https://www.dahuasecurity.com/th/Products/All-Products/Drone/Industrial-Drone" },
      { name: "Payload", url: "https://www.dahuasecurity.com/th/Products/All-Products/Drone/Payload" },
    ]
  },
  {
    slug: "Mobile",
    name: "Mobile",
    nameTh: "ระบบติดตั้งบนยานพาหนะ",
    icon: "mobile",
    blurb: "กล้องและอุปกรณ์บันทึกสำหรับยานพาหนะและงานภาคสนาม",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Mobile",
    series: [
      { name: "Mobile", url: "https://www.dahuasecurity.com/th/Products/All-Products/Mobile/Mobile" },
      { name: "MPT", url: "https://www.dahuasecurity.com/th/Products/All-Products/Mobile/MPT" },
    ]
  },
  {
    slug: "Kits",
    name: "Kits",
    nameTh: "ชุดอุปกรณ์สำเร็จ",
    icon: "kit",
    blurb: "ชุดกล้องพร้อมเครื่องบันทึก ติดตั้งง่าย จบในกล่องเดียว",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Kits",
    series: [
    ]
  },
  {
    slug: "Accessories",
    name: "Accessories",
    nameTh: "อุปกรณ์เสริม",
    icon: "parts",
    blurb: "ขายึด อะแดปเตอร์ สายสัญญาณ อุปกรณ์เสียง เซนเซอร์ และ UPS",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories",
    series: [
      { name: "Camera Accessory", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/Camera-Accessories" },
      { name: "Power adapter", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/Power" },
      { name: "Cabling", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/Cabling" },
      { name: "Audio", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/Audio" },
      { name: "Detector", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/Detectors" },
      { name: "UPS", url: "https://www.dahuasecurity.com/th/Products/All-Products/Accessories/UPS" },
    ]
  },
  {
    slug: "Dahua-Memory",
    name: "Dahua Memory",
    nameTh: "หน่วยความจำ",
    icon: "memory",
    blurb: "การ์ดหน่วยความจำและอุปกรณ์จัดเก็บข้อมูลของ Dahua",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Dahua-Memory",
    series: [
    ]
  },
  {
    slug: "Dedicated-Products",
    name: "Dedicated Products",
    nameTh: "สินค้าเฉพาะโครงการ",
    icon: "project",
    blurb: "สินค้าสำหรับงานโครงการโดยเฉพาะ",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Dedicated-Products",
    series: [
      { name: "Project Exclusive", url: "https://www.dahuasecurity.com/th/Products/All-Products/Dedicated-Products/Project-Exclusive" },
      { name: "Traffic", url: "https://www.dahuasecurity.com/th/Products/All-Products/Dedicated-Products/Traffic" },
    ]
  },
  {
    slug: "DE-2564",
    name: "DE64 Compliance",
    nameTh: "ผลิตภัณฑ์ตรงตามข้อกำหนด DE64",
    icon: "cert",
    blurb: "รุ่นที่ตรงตามเกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (DE64)",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564",
    series: [
      { name: "01.กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายในสำนักงาน", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/-" },
      { name: "02. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายนอกสำนักงาน", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/02.--" },
      { name: "03. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายในอาคาร สำหรับใช้ในงานรักษา", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/03.---" },
      { name: "04. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายนอกอาคาร สำหรับใช้ในงานรักษา ความปลอดภัยทั่วไปและงานอื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/04.----" },
      { name: "05. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบปรับมุมมอง สำหรับใช้ในงานรักษาความปลอดภัยทั่วไปและงาน อื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/05.----" },
      { name: "06. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายในอาคาร แบบที่ 1 สำหรับใช้ใน งานรักษาความปลอดภัย วิเคราะห์ภาพ และงานอื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/06.----1----" },
      { name: "07. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายในอาคาร แบบที่ 2 สำหรับใช้ใน งานรักษาความปลอดภัย วิเคราะห์ภาพ และงานอื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/07.----2----" },
      { name: "08. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายนอกอาคาร แบบที่ 1 สำหรับใช้ใน งานรักษาความปลอดภัย วิเคราะห์ภาพ และงานอื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/08.----1----" },
      { name: "09. กล้องโทรทัศน์วงจรปิดชนิดเครือข่าย แบบมุมมองคงที่สำหรับติดตั้งภายนอกอาคาร แบบที่ 2 สำหรับใช้ใน งานรักษาความปลอดภัย วิเคราะห์ภาพ และงานอื่นๆ", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/09.----2----" },
      { name: "10. อุปกรณ์บันทึกภาพผ่านเครือข่าย (Network Video Recorder) แบบ 8 ช่อง", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/10.--(Network-Video-Recorder)--8-" },
      { name: "11. อุปกรณ์บันทึกภาพผ่านเครือข่าย (Network Video Recorder) แบบ 16 ช่อง", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/11.--(Network-Video-Recorder)--16-" },
      { name: "12. อุปกรณ์บันทึกภาพผ่านเครือข่าย (Network Video Recorder) แบบ 32 ช่อง", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/12.--(Network-Video-Recorder)--32-" },
      { name: "13. อุปกรณ์กระจายสัญญาณแบบ PoE (PoE L2 Switch) ขนาด 8 ช่อง", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/13.--PoE-(PoE-L2-Switch)--8-" },
      { name: "14. อุปกรณ์กระจายสัญญาณแบบ PoE (PoE L2 Switch) ขนาด 16 ช่อง", url: "https://www.dahuasecurity.com/th/Products/All-Products/DE-2564/14.--PoE-(PoE-L2-Switch)--16-" },
    ]
  },
  {
    slug: "Discontinued-Products",
    name: "Discontinued",
    nameTh: "สินค้าที่เลิกผลิต",
    icon: "archive",
    blurb: "รุ่นที่เลิกผลิตแล้ว สำหรับอ้างอิงและหาอะไหล่ทดแทน",
    url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products",
    series: [
      { name: "Network Cameras", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Network-Cameras" },
      { name: "HDCVI Cameras", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/HDCVI-Cameras" },
      { name: "PTZ Cameras", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/PTZ-Cameras" },
      { name: "Network Recorders", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Network-Recorders" },
      { name: "Thermal Cameras", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Thermal-Cameras" },
      { name: "HDCVI Recorders", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/HDCVI-Recorders" },
      { name: "Display", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Display--Control" },
      { name: "Video Intercoms", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Video-Intercoms" },
      { name: "Access Control", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Access-Control" },
      { name: "Mobile & Traffic", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Mobile--Traffic" },
      { name: "Software", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Software" },
      { name: "Accessories", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Accessories" },
      { name: "Kits", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Kits" },
      { name: "Transmission", url: "https://www.dahuasecurity.com/th/Products/All-Products/Discontinued-Products/Transmission" },
    ]
  },
];
