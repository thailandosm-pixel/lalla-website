/* ============================================================
   Project references
   Source: Lalla (Thailand) Co., Ltd. — Company Profile deck.
   Photos live in assets/works/.
   ============================================================ */

const WORKS = [
  {
    id: "sacred-heart-chiangmai",
    title: "Sacred Heart College",
    titleTh: "โรงเรียนพระหฤทัย เชียงใหม่",
    place: "Chiang Mai",
    product: "Outdoor LED Screen",
    productTh: "จอ LED กลางแจ้ง",
    facts: [
      { label: "Product",    value: "Outdoor LED Screen" },
      { label: "Dimensions", value: "W 11.00 m × H 6.00 m" },
      { label: "Total area", value: "66.00 sq.m" },
      { label: "Location",   value: "Chiang Mai" }
    ],
    blurb: "จอ LED กลางแจ้งขนาด 66 ตารางเมตร สำหรับลานกิจกรรมของโรงเรียน มองเห็นชัดแม้กลางแดด",
    cover: "assets/works/sacredheart-1.webp",
    photos: ["sacredheart-1","sacredheart-4","sacredheart-3","sacredheart-5"]
      .map(n => `assets/works/${n}.webp`)
  },
  {
    id: "saint-louis-bangkok",
    title: "Saint Louis College",
    titleTh: "วิทยาลัยเซนต์หลุยส์ กรุงเทพฯ",
    place: "Bangkok",
    product: "Indoor LED Screen",
    productTh: "จอ LED ภายในอาคาร",
    facts: [
      { label: "Product",    value: "Indoor LED Screen" },
      { label: "Dimensions", value: "W 6.40 m × H 3.84 m" },
      { label: "Total area", value: "24.58 sq.m" },
      { label: "Location",   value: "Bangkok" }
    ],
    blurb: "จอ LED ภายในอาคารขนาด 24.58 ตารางเมตร ติดตั้งในห้องประชุมใหญ่ ภาพต่อเนื่องไร้รอยต่อ",
    cover: "assets/works/stlouis-1.webp",
    photos: ["stlouis-1","stlouis-2","stlouis-3"].map(n => `assets/works/${n}.webp`)
  },
  {
    id: "shrine-nicholas-sampran",
    title: "Shrine of Blessed Nicholas Bunkerd Kitbamrung",
    titleTh: "สักการสถานบุญราศีนิโคลาส บุญเกิด กฤษบำรุง",
    place: "Sampran, Nakhon Pathom",
    product: "Laser Projector System",
    productTh: "ระบบโปรเจกเตอร์เลเซอร์",
    facts: [
      { label: "Product",  value: "Laser Projector System" },
      { label: "Scope",    value: "Installation & High-Level Cable Wiring" },
      { label: "Location", value: "Sampran, Nakhon Pathom" }
    ],
    blurb: "ติดตั้งระบบโปรเจกเตอร์เลเซอร์พร้อมงานเดินสายในที่สูง ภายในอาคารสักการสถาน",
    cover: "assets/works/shrine-2.webp",
    photos: ["shrine-2","shrine-1"].map(n => `assets/works/${n}.webp`)
  },
  {
    id: "saint-gabriel-bangkok",
    title: "Saint Gabriel's College",
    titleTh: "โรงเรียนเซนต์คาเบรียล",
    place: "SG Lounge, Bangkok",
    product: "Queueing Machine",
    productTh: "ระบบเครื่องออกบัตรคิว",
    facts: [
      { label: "Product",  value: "Queueing Machine" },
      { label: "Scope",    value: "Ticket kiosk & queue display" },
      { label: "Location", value: "SG Lounge, Bangkok" }
    ],
    blurb: "ระบบบัตรคิวพร้อมจอแสดงผลคิวและตู้คีออสก์ ติดตั้งภายใน SG Lounge",
    cover: "assets/works/stgabriel-1.webp",
    photos: ["stgabriel-1","stgabriel-2","stgabriel-3"].map(n => `assets/works/${n}.webp`)
  },
  {
    id: "mahidol-university",
    title: "Mahidol University",
    titleTh: "มหาวิทยาลัยมหิดล",
    place: "Nakhon Pathom",
    product: "Lighting Hoist System",
    productTh: "ระบบรอกไฟเวทีและหอประชุม",
    facts: [
      { label: "Product",  value: "Stage & auditorium lighting hoist system" },
      { label: "Scope",    value: "Fabrication, high-level installation and commissioning" },
      { label: "Location", value: "Mahidol University" }
    ],
    blurb: "ระบบรอกไฟสำหรับเวทีและหอประชุม ตั้งแต่งานผลิตโครงสร้าง ติดตั้งในที่สูง จนถึงทดสอบระบบ",
    cover: "assets/works/mahidol-4.webp",
    photos: ["mahidol-4","mahidol-1","mahidol-2","mahidol-3","mahidol-5","mahidol-6",
             "mahidol-7","mahidol-8","mahidol-9"].map(n => `assets/works/${n}.webp`)
  },
  {
    id: "kis-international-school",
    title: "KIS International School",
    titleTh: "โรงเรียนนานาชาติ KIS",
    place: "Bangkok",
    product: "Lighting Studio Hoist",
    productTh: "ระบบรอกไฟโรงละคร",
    facts: [
      { label: "Product",  value: "Lighting studio hoist system" },
      { label: "Scope",    value: "Delivery, assembly and installation on site" },
      { label: "Location", value: "School theatre, Bangkok" }
    ],
    blurb: "ระบบรอกไฟสำหรับโรงละครของโรงเรียน ส่งมอบ ประกอบ และติดตั้งหน้างาน",
    cover: "assets/works/kis-1.webp",
    photos: ["kis-1","kis-2","kis-3","kis-4"].map(n => `assets/works/${n}.webp`)
  }
];
