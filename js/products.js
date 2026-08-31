/* ============================================================
   Product data
   ------------------------------------------------------------
   HOW TO ADD A PRODUCT
   1. Copy one of the `placeholder: true` entries below.
   2. Remove the `placeholder: true` line.
   3. Fill in id / name / subtitle / category / images / specs.
   The home page and product page render themselves from this file.
   ============================================================ */

const products = [
  {
    id: "dhi-phria2-5-pl",
    name: "DHI-PHRIA2.5-PL",
    subtitle: "Dahua LED Poster Screen",
    category: "Poster PL Series",

    /* Hero copy */
    tagline: "Poster. Perfected.",
    heroLead: "จอ LED Poster ความละเอียด 2.5 มม. พับได้ ต่อกันได้แบบไร้รอยต่อ เสียบปุ๊บเล่นปั๊บ",

    brandLogo: "assets/cutout/dahua-logo.png",
    coverImage: "assets/cutout/poster-views.png",
    images: ["assets/cutout/poster-views.png"],
    showcaseImage: "assets/S__102096899.jpg",
    showcaseTitle: "ต่อกันได้ ไร้รอยต่อ",
    showcaseText: "โครงสร้างพับได้ นำหลายเครื่องมาเรียงต่อกันเป็นจอผืนใหญ่แบบ Seamless Splicing",
    datasheet: "pdf/DHI-PHRIA2.5-PL _ Dahua LED Poster Screen.pdf",

    /* Numbers pulled from the spec table below */
    keyStats: [
      { num: "2.5", unit: "mm", label: "Pixel Pitch" },
      { num: "80", unit: "″",  label: "ขนาดหน้าจอ" },
      { num: "3840", unit: "Hz", label: "Refresh Rate" },
      { num: "600", unit: "nit", label: "ความสว่างสูงสุด" }
    ],

    /* "Get the highlights" cards */
    highlights: [
      {
        icon: "shield",
        title: "GOB Technology",
        body: "เคลือบกาวเต็มผิวหน้าจอ (Glue on Board) กันชื้น กันฝุ่น กันไฟฟ้าสถิต ทนการกระแทก เม็ด LED ไม่หลุดร่วง"
      },
      {
        icon: "fold",
        title: "พับได้ สองด้าน",
        body: "รองรับการพับขึ้น–ลงของตัวจอ และแสดงผลได้สองด้าน (Double-Sided Display)"
      },
      {
        icon: "grid",
        title: "Seamless Splicing",
        body: "โครงสร้างจอพับได้ นำหลายเครื่องมาต่อกันเป็นจอขนาดใหญ่แบบไร้รอยต่อ"
      },
      {
        icon: "play",
        title: "Plug and Play",
        body: "เชื่อมต่อวิดีโอแล้วแสดงผลเต็มหน้าจออัตโนมัติ ไม่ต้องตั้งค่าซับซ้อน"
      },
      {
        icon: "tools",
        title: "Front Maintenance",
        body: "ซ่อมบำรุงจากด้านหน้าได้ทั้งหมด ถอดหรือซ่อมง่ายโดยไม่ต้องรื้อด้านหลัง"
      },
      {
        icon: "bolt",
        title: "ทนทุกสภาพการใช้งาน",
        body: "ป้องกันความชื้น ไฟฟ้าสถิต และการแผ่รังสี พร้อมระบบระบายความร้อนประสิทธิภาพสูง"
      }
    ],

    descriptionHtml: `
      <p class="feat-header">Features</p>
      <ul class="feat-list">
        <li>GOB (Glue on Board) technology.</li>
        <li>Supports folding up and down, double-sided display.</li>
        <li>The frame is foldable, allowing for seamless splicing of multiple units.</li>
        <li>Plug and play, any video automatically plays full screen, zero setting, quick and simple.</li>
        <li>User-level front maintenance, all-weather protection technology, anti-broken LED, moisture-proof, anti-static, radiation-proof, wear-resisting and high-efficiency heat dissipation.</li>
      </ul>
      <hr class="feat-divider" />
      <div class="feat-icons-row">
        <div class="feat-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="6" height="10" rx="1" fill="#e53935"/><rect x="9" y="7" width="6" height="10" rx="1" fill="#43a047"/><rect x="16" y="7" width="6" height="10" rx="1" fill="#1e88e5"/></svg>
          <span>RGB<small>Rich Colour</small></span>
        </div>
        <div class="feat-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M18 18v2M6 18v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 10h12M6 14h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span>HDMI<small>×2 in / out</small></span>
        </div>
        <div class="feat-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.5C6.8 10.2 9.2 9 12 9s5.2 1.2 7 3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 15.5c1.1-1.2 2.4-1.9 4-1.9s2.9.7 4 1.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>
          <span>Wireless<small>WiFi / LAN</small></span>
        </div>
        <div class="feat-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"/><path d="M8 20h8M12 17v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <span>No Seam<small>Splicing</small></span>
        </div>
      </div>
    `,

    highlightFeatures: [
      "รองรับ การพับขึ้น-ลงของตัวจอ",
      "สามารถ แสดงผลได้สองด้าน (Double-Sided Display)",
      "โครงสร้างจอ สามารถพับได้ และนำหลายเครื่องมาต่อกันแบบไร้รอยต่อ (Seamless Splicing) เพื่อสร้างจอขนาดใหญ่",
      "เมื่อเชื่อมต่อวิดีโอ ระบบจะแสดงผลเต็มหน้าจออัตโนมัติ",
      "ไม่ต้องตั้งค่าซับซ้อน ใช้งานได้รวดเร็วและสะดวก",
      "รองรับการ ซ่อมบำรุงจากด้านหน้า (Front Maintenance)",
      "ถอดหรือซ่อมได้ง่ายโดยไม่ต้องรื้อด้านหลัง"
    ],

    specs: [
      { label: "Model", value: "DHI-PHRIA2.5-PL" },
      { label: "Pixel Pitch", value: "2.5mm" },
      { label: "Screen Size", value: "80 inch" },
      { label: "Module Size (W×H)", value: "320×160mm" },
      { label: "Module Resolution (W×H)", value: "128×64" },
      { label: "Pixel Type", value: "1R1G1B (GOB)" },
      { label: "LED Type", value: "SMD2121" },
      { label: "Overall Dimension (W×H×D)", value: "664mm×2074mm×440mm" },
      { label: "Viewing Area (W×H×D)", value: "640mm×1920mm×62mm" },
      { label: "Screen Resolution (W×H)", value: "256×768" },
      { label: "Screen Material", value: "Die-cast Aluminum+Profile" },
      { label: "Screen Weight", value: "50 kg" },
      { label: "Pixel Density", value: "196,608 dots/Panel" },
      { label: "Brightness (Max)", value: "600 nit" },
      { label: "Grey Level", value: "12–14 bits" },
      { label: "Refresh Rate", value: "3840 Hz" },
      { label: "Contrast", value: "4000:1" },
      { label: "Response Time", value: "≤0.5ms (Typ)" },
      { label: "Viewing Angle", value: "160°/140°" },
      { label: "Ingress Protection (front/rear)", value: "IP40" },
      { label: "Input Voltage", value: "AC 200~240V (+/-10%)" },
      { label: "Operating Temperature/Humidity", value: "-10°C~+40°C / 10%~80%RH" },
      { label: "Storage Temperature/Humidity", value: "-20°C~+50°C / 10%~80%RH" },
      { label: "Input Power (max)", value: "600 W/m²" },
      { label: "Input Power (avg)", value: "200 W/m²" },
      { label: "Video Interface", value: "HDMIx2 (1in1out), USB 3.0×1" },
      { label: "Audio Interface", value: "Audio Out ×1 interface" },
      { label: "Communication Connection", value: "USB / WiFi / Ethernet" },
      { label: "Installation Mode", value: "Movable Base" },
      { label: "Maintenance Mode", value: "Front Maintenance" },
      { label: "Accessories", value: "Spare Parts" }
    ]
  },

  /* ── Empty slots — waiting for product info ─────────────── */
  { placeholder: true, id: "slot-2", name: "", subtitle: "", category: "", specs: [] },
  { placeholder: true, id: "slot-3", name: "", subtitle: "", category: "", specs: [] },
  { placeholder: true, id: "slot-4", name: "", subtitle: "", category: "", specs: [] },
  { placeholder: true, id: "slot-5", name: "", subtitle: "", category: "", specs: [] },
  { placeholder: true, id: "slot-6", name: "", subtitle: "", category: "", specs: [] }
];
