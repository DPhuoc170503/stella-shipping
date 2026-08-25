import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

/* ─── Scroll-reveal hook ─── */
function useScrollReveal() {
  const containerRef = useRef(null)
  const observe = useCallback(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll('.rv')
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('rvd'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => { const c = observe(); return c }, [observe])
  return containerRef
}

/* ═══════════════════════ DATA ═══════════════════════ */
const OFFICES = [
  {
    id: 'hcm',
    city_vi: 'TP. Hồ Chí Minh',
    city_en: 'Ho Chi Minh City',
    type_vi: 'Trụ sở chính',
    type_en: 'Headquarters',
    address_vi: 'Số 26 Đường T2, Khu Dân Cư và Công Viên Phước Thiện (Khu C), Số 88 Đường Phước Thiện, Phường Long Bình, TP. Thủ Đức',
    address_en: 'No 26 Street T2, Phuoc Thien Residential & Park (Zone C), No 88 Phuoc Thien St, Long Binh Ward, Thu Duc City',
    phone: '0901 048 137',
    email: 'stella@stellashipping.com.vn',
    hours_vi: 'Thứ 2 - Thứ 6: 8:00 - 17:30 | Thứ 7: 8:00 - 12:00',
    hours_en: 'Mon - Fri: 8:00 - 17:30 | Sat: 8:00 - 12:00',
    lat: 10.8548,
    lng: 106.8325,
    region_vi: 'Miền Nam',
    region_en: 'Southern',
    services_vi: ['Vận tải biển', 'Hàng không', 'Hải quan', 'Kho bãi'],
    services_en: ['Ocean Freight', 'Air Freight', 'Customs', 'Warehousing'],
  },
  {
    id: 'hanoi',
    city_vi: 'Hà Nội',
    city_en: 'Hanoi',
    type_vi: 'Chi nhánh',
    type_en: 'Branch Office',
    address_vi: 'Tầng 12, Tòa nhà Hà Nội Landmark, 83 Lê Văn Lương, Thanh Xuân',
    address_en: 'Floor 12, Hanoi Landmark Tower, 83 Le Van Luong, Thanh Xuan',
    phone: '024 3773 8899',
    email: 'hanoi@stellashipping.com.vn',
    hours_vi: 'Thứ 2 - Thứ 6: 8:00 - 17:30',
    hours_en: 'Mon - Fri: 8:00 - 17:30',
    lat: 21.0076,
    lng: 105.8185,
    region_vi: 'Miền Bắc',
    region_en: 'Northern',
    services_vi: ['Vận tải biển', 'Hàng không', 'Hải quan'],
    services_en: ['Ocean Freight', 'Air Freight', 'Customs'],
  },
  {
    id: 'danang',
    city_vi: 'Đà Nẵng',
    city_en: 'Da Nang',
    type_vi: 'Chi nhánh',
    type_en: 'Branch Office',
    address_vi: 'Tầng 5, Tòa nhà Indochina Riverside, 74 Bạch Đằng, Hải Châu',
    address_en: 'Floor 5, Indochina Riverside Tower, 74 Bach Dang, Hai Chau',
    phone: '0236 388 5566',
    email: 'danang@stellashipping.com.vn',
    hours_vi: 'Thứ 2 - Thứ 6: 8:00 - 17:30',
    hours_en: 'Mon - Fri: 8:00 - 17:30',
    lat: 16.0544,
    lng: 108.2242,
    region_vi: 'Miền Trung',
    region_en: 'Central',
    services_vi: ['Vận tải biển', 'Hải quan', 'Kho bãi'],
    services_en: ['Ocean Freight', 'Customs', 'Warehousing'],
  },
  {
    id: 'haiphong',
    city_vi: 'Hải Phòng',
    city_en: 'Hai Phong',
    type_vi: 'Văn phòng đại diện',
    type_en: 'Representative Office',
    address_vi: 'Tầng 8, Tòa nhà TD Business Center, 18 Lê Hồng Phong, Ngô Quyền',
    address_en: 'Floor 8, TD Business Center, 18 Le Hong Phong, Ngo Quyen',
    phone: '0225 384 7799',
    email: 'haiphong@stellashipping.com.vn',
    hours_vi: 'Thứ 2 - Thứ 6: 8:00 - 17:30',
    hours_en: 'Mon - Fri: 8:00 - 17:30',
    lat: 20.8574,
    lng: 106.6831,
    region_vi: 'Miền Bắc',
    region_en: 'Northern',
    services_vi: ['Vận tải biển', 'Hải quan'],
    services_en: ['Ocean Freight', 'Customs'],
  },
  {
    id: 'binhduong',
    city_vi: 'Bình Dương',
    city_en: 'Binh Duong',
    type_vi: 'Trung tâm Logistics',
    type_en: 'Logistics Center',
    address_vi: 'Lô A12, Đường N3, KCN VSIP II-A, Phường Vĩnh Tân, Tân Uyên',
    address_en: 'Lot A12, Road N3, VSIP II-A Industrial Park, Vinh Tan Ward, Tan Uyen',
    phone: '0274 376 8800',
    email: 'logistics@stellashipping.com.vn',
    hours_vi: 'Thứ 2 - Thứ 7: 7:00 - 18:00',
    hours_en: 'Mon - Sat: 7:00 - 18:00',
    lat: 11.0564,
    lng: 106.6542,
    region_vi: 'Miền Nam',
    region_en: 'Southern',
    services_vi: ['Kho bãi', 'Cross-docking', 'Phân phối'],
    services_en: ['Warehousing', 'Cross-docking', 'Distribution'],
  },
]

const t_ui = {
  vi: {
    kicker: 'VĂN PHÒNG CỦA CHÚNG TÔI',
    hero_h1: 'Tìm văn phòng\ngần bạn nhất',
    hero_p: 'Mạng lưới văn phòng và trung tâm logistics trải dài trên toàn quốc, sẵn sàng hỗ trợ mọi nhu cầu vận chuyển của bạn.',
    filter_all: 'Tất cả',
    filter_north: 'Miền Bắc',
    filter_central: 'Miền Trung',
    filter_south: 'Miền Nam',
    search_placeholder: 'Tìm theo tên thành phố...',
    phone: 'Điện thoại',
    email: 'Email',
    hours: 'Giờ làm việc',
    services_label: 'Dịch vụ tại đây',
    directions: 'Chỉ đường',
    call: 'Gọi ngay',
    no_results: 'Không tìm thấy văn phòng nào phù hợp.',
    cta_title: 'Không tìm thấy văn phòng gần bạn?',
    cta_desc: 'Liên hệ với chúng tôi, đội ngũ sẽ kết nối bạn với văn phòng hoặc đại lý phù hợp nhất.',
    cta_btn: 'Liên hệ ngay',
    offices_count: 'văn phòng',
    map_view: 'Bản đồ',
    list_view: 'Danh sách',
  },
  en: {
    kicker: 'OUR OFFICES',
    hero_h1: 'Find your\nlocal office',
    hero_p: 'Our nationwide network of offices and logistics centers is ready to support all your shipping needs.',
    filter_all: 'All',
    filter_north: 'Northern',
    filter_central: 'Central',
    filter_south: 'Southern',
    search_placeholder: 'Search by city name...',
    phone: 'Phone',
    email: 'Email',
    hours: 'Working hours',
    services_label: 'Services available',
    directions: 'Get directions',
    call: 'Call now',
    no_results: 'No offices found.',
    cta_title: "Can't find an office near you?",
    cta_desc: 'Contact us and our team will connect you with the most suitable office or agent.',
    cta_btn: 'Contact us',
    offices_count: 'offices',
    map_view: 'Map',
    list_view: 'List',
  },
}

/* ═══════════════════════ CSS ═══════════════════════ */
const css = `
  /* Reveal */
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}.rv.d5{transition-delay:.5s}

  .fo-page{font-family:'Inter',sans-serif;color:#1a2744}

  /* ── Hero ── */
  .fo-hero{
    position:relative;min-height:380px;display:flex;align-items:center;
    background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);
    color:#fff;overflow:hidden;
  }
  .fo-hero::before{
    content:'';position:absolute;top:-30%;right:-10%;width:550px;height:550px;
    background:radial-gradient(circle,rgba(243,108,31,.12) 0%,transparent 70%);border-radius:50%;
  }
  .fo-hero::after{
    content:'';position:absolute;bottom:-40%;left:-8%;width:450px;height:450px;
    background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%);border-radius:50%;
  }
  .fo-hero-inner{position:relative;z-index:1;max-width:820px;margin:0 auto;text-align:center;padding:72px 28px 48px}
  .fo-hero .kicker{
    display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;
    border:1px solid rgba(243,108,31,.4);padding:5px 16px;border-radius:20px;margin-bottom:18px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .fo-hero h1{font-size:46px;font-weight:800;margin:0 0 16px;line-height:1.15;font-family:'Be Vietnam Pro',sans-serif;white-space:pre-line}
  .fo-hero h1 .hl{color:#f36c1f}
  .fo-hero p{font-size:16px;color:rgba(255,255,255,.78);max-width:600px;margin:0 auto;line-height:1.65}

  /* ── Toolbar ── */
  .fo-toolbar{
    max-width:1200px;margin:-36px auto 0;position:relative;z-index:10;padding:0 24px;
  }
  .fo-toolbar-inner{
    background:#fff;border-radius:16px;padding:20px 28px;
    box-shadow:0 14px 48px rgba(10,20,40,.08);
    display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  }
  .fo-search{
    flex:1;min-width:200px;display:flex;align-items:center;gap:10px;
    background:#f5f7fa;border:1px solid #e8edf3;border-radius:10px;padding:10px 16px;
    transition:border-color .25s;
  }
  .fo-search:focus-within{border-color:#f36c1f}
  .fo-search input{
    border:none;background:transparent;outline:none;font-size:14px;color:#1a2744;width:100%;
    font-family:'Inter',sans-serif;
  }
  .fo-search input::placeholder{color:#8a9ab5}
  .fo-search-icon{font-size:18px;flex-shrink:0;opacity:.5}
  .fo-filters{display:flex;gap:8px;flex-wrap:wrap}
  .fo-filter-btn{
    padding:8px 18px;border-radius:8px;border:1px solid #e8edf3;background:#fff;
    font-size:13px;font-weight:600;color:#5a6f82;cursor:pointer;
    transition:all .25s;font-family:'Inter',sans-serif;
  }
  .fo-filter-btn.active,.fo-filter-btn:hover{
    background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;border-color:#f36c1f;
  }
  .fo-view-toggle{display:flex;gap:4px;margin-left:auto}
  .fo-view-btn{
    padding:8px 14px;border:1px solid #e8edf3;background:#fff;border-radius:8px;
    font-size:13px;cursor:pointer;transition:all .25s;color:#5a6f82;display:flex;align-items:center;gap:6px;
  }
  .fo-view-btn.active{background:#0f2b57;color:#fff;border-color:#0f2b57}
  .fo-count{font-size:13px;color:#8a9ab5;font-weight:600;white-space:nowrap}

  /* ── Main ── */
  .fo-main{max-width:1200px;margin:0 auto;padding:40px 24px 80px}

  /* ── Map section ── */
  .fo-map-container{
    border-radius:16px;overflow:hidden;height:400px;
    box-shadow:0 8px 32px rgba(10,20,40,.08);
    margin-bottom:40px;position:relative;
    background:#e8edf3;
  }
  .fo-map-placeholder{
    width:100%;height:100%;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#e8edf3 0%,#d5dce6 100%);position:relative;
  }
  .fo-map-vn{
    position:relative;width:200px;height:400px;
  }
  .fo-map-dot{
    position:absolute;width:14px;height:14px;border-radius:50%;
    background:#f36c1f;cursor:pointer;z-index:2;
    box-shadow:0 0 0 4px rgba(243,108,31,.2);
    transition:transform .3s,box-shadow .3s;
  }
  .fo-map-dot:hover{transform:scale(1.4);box-shadow:0 0 0 8px rgba(243,108,31,.3)}
  .fo-map-dot.active{background:#0f2b57;box-shadow:0 0 0 8px rgba(15,43,87,.3)}
  .fo-map-dot::after{
    content:attr(data-label);position:absolute;left:50%;top:-28px;transform:translateX(-50%);
    background:#0f2b57;color:#fff;padding:4px 10px;border-radius:6px;font-size:11px;
    white-space:nowrap;font-weight:600;opacity:0;transition:opacity .2s;pointer-events:none;
  }
  .fo-map-dot:hover::after,.fo-map-dot.active::after{opacity:1}
  .fo-map-pulse{
    position:absolute;inset:-4px;border-radius:50%;border:2px solid #f36c1f;
    animation:fo-pulse 2s ease-out infinite;
  }
  @keyframes fo-pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.5);opacity:0}}

  /* ── Office grid ── */
  .fo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:24px}
  .fo-card{
    background:#fff;border-radius:16px;padding:0;overflow:hidden;
    border:1px solid #edf1f7;
    box-shadow:0 4px 20px rgba(10,20,40,.04);
    transition:all .35s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
  }
  .fo-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(10,20,40,.1);border-color:#f36c1f}
  .fo-card.active{border-color:#f36c1f;box-shadow:0 12px 40px rgba(243,108,31,.12)}

  .fo-card-header{
    background:linear-gradient(135deg,#0f2b57 0%,#1e3f7a 100%);
    color:#fff;padding:24px;position:relative;overflow:hidden;
  }
  .fo-card-header::before{
    content:'';position:absolute;top:-20px;right:-20px;width:100px;height:100px;
    background:radial-gradient(circle,rgba(243,108,31,.2) 0%,transparent 70%);border-radius:50%;
  }
  .fo-card-type{
    display:inline-block;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;
    letter-spacing:1px;margin-bottom:8px;text-transform:uppercase;
  }
  .fo-card-type.hq{background:rgba(243,108,31,.2);color:#f36c1f}
  .fo-card-type.branch{background:rgba(255,255,255,.12);color:rgba(255,255,255,.8)}
  .fo-card-type.logistics{background:rgba(34,197,94,.2);color:#4ade80}
  .fo-card-city{font-size:22px;font-weight:800;margin:0;font-family:'Be Vietnam Pro',sans-serif}

  .fo-card-body{padding:24px}
  .fo-info-row{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px}
  .fo-info-icon{
    width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;
    flex-shrink:0;font-size:16px;
  }
  .fo-info-icon.loc{background:rgba(243,108,31,.08)}
  .fo-info-icon.tel{background:rgba(15,43,87,.06)}
  .fo-info-icon.mail{background:rgba(34,197,94,.08)}
  .fo-info-icon.time{background:rgba(124,58,237,.08)}
  .fo-info-label{font-size:11px;color:#8a9ab5;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin:0 0 2px}
  .fo-info-value{font-size:14px;color:#1a2744;margin:0;line-height:1.5}
  .fo-info-value a{color:#f36c1f;text-decoration:none;transition:color .2s}
  .fo-info-value a:hover{text-decoration:underline}

  .fo-services{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
  .fo-service-tag{
    padding:4px 10px;background:#f5f7fa;border-radius:6px;font-size:12px;
    color:#5a6f82;font-weight:500;border:1px solid #edf1f7;
  }

  .fo-card-actions{display:flex;gap:10px;margin-top:20px;padding-top:20px;border-top:1px solid #edf1f7}
  .fo-card-btn{
    flex:1;padding:10px;border-radius:10px;text-align:center;font-size:13px;
    font-weight:700;text-decoration:none;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:6px;
    cursor:pointer;border:none;
  }
  .fo-card-btn.primary{background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;box-shadow:0 4px 14px rgba(243,108,31,.2)}
  .fo-card-btn.primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(243,108,31,.3)}
  .fo-card-btn.secondary{background:#f5f7fa;color:#0f2b57;border:1px solid #edf1f7}
  .fo-card-btn.secondary:hover{background:#edf1f7}

  /* ── No results ── */
  .fo-empty{text-align:center;padding:60px 20px;color:#8a9ab5}
  .fo-empty-icon{font-size:48px;margin-bottom:16px;opacity:.5}
  .fo-empty p{font-size:16px;margin:0}

  /* ── CTA ── */
  .fo-cta{
    max-width:1200px;margin:0 auto;padding:0 24px 80px;
  }
  .fo-cta-inner{
    background:linear-gradient(135deg,#0f2b57 0%,#1e3f7a 100%);
    border-radius:20px;padding:60px 40px;text-align:center;color:#fff;
    position:relative;overflow:hidden;
  }
  .fo-cta-inner::before{
    content:'';position:absolute;top:-60%;right:-10%;width:500px;height:500px;
    background:radial-gradient(circle,rgba(243,108,31,.1) 0%,transparent 70%);border-radius:50%;
  }
  .fo-cta h2{font-size:30px;font-weight:800;margin:0 0 12px;font-family:'Be Vietnam Pro',sans-serif;position:relative;z-index:1}
  .fo-cta p{font-size:16px;color:rgba(255,255,255,.7);margin:0 0 28px;max-width:500px;margin-left:auto;margin-right:auto;position:relative;z-index:1}
  .fo-cta-btn{
    display:inline-flex;align-items:center;gap:8px;padding:14px 32px;
    background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;border-radius:12px;
    font-weight:700;font-size:15px;text-decoration:none;
    transition:all .3s cubic-bezier(.22,1,.36,1);position:relative;z-index:1;
    box-shadow:0 8px 24px rgba(243,108,31,.3);
  }
  .fo-cta-btn:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(243,108,31,.4)}

  @media(max-width:800px){
    .fo-hero h1{font-size:32px}
    .fo-toolbar-inner{flex-direction:column;align-items:stretch}
    .fo-view-toggle{margin-left:0;justify-content:center}
    .fo-grid{grid-template-columns:1fr}
    .fo-map-container{height:300px}
    .fo-cta-inner{padding:40px 24px}
    .fo-cta h2{font-size:24px}
  }
`

/* ═══════════════════════ Component ═══════════════════════ */
export default function FindYourLocalOffices() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const t = t_ui[lang]
  const containerRef = useScrollReveal()

  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('all')
  const [activeOffice, setActiveOffice] = useState(null)
  const [viewMode, setViewMode] = useState('list') // 'list' | 'map'

  const regions = [
    { key: 'all', label: t.filter_all },
    { key: 'north', label: t.filter_north, match_vi: 'Miền Bắc', match_en: 'Northern' },
    { key: 'central', label: t.filter_central, match_vi: 'Miền Trung', match_en: 'Central' },
    { key: 'south', label: t.filter_south, match_vi: 'Miền Nam', match_en: 'Southern' },
  ]

  const filtered = OFFICES.filter((o) => {
    const city = lang === 'en' ? o.city_en : o.city_vi
    const matchSearch = city.toLowerCase().includes(search.toLowerCase())
    const regionData = lang === 'en' ? o.region_en : o.region_vi
    const matchRegion = region === 'all' || regions.find(r => r.key === region)?.[`match_${lang}`] === regionData
    return matchSearch && matchRegion
  })

  // Map dot positions (approximate relative to Vietnam map)
  const mapPositions = {
    hanoi: { top: '18%', left: '52%' },
    haiphong: { top: '22%', left: '60%' },
    danang: { top: '48%', left: '55%' },
    hcm: { top: '78%', left: '48%' },
    binhduong: { top: '75%', left: '42%' },
  }

  const getTypeClass = (office) => {
    const type = lang === 'en' ? office.type_en : office.type_vi
    if (type.includes('Trụ sở') || type.includes('Headquarters')) return 'hq'
    if (type.includes('Logistics')) return 'logistics'
    return 'branch'
  }

  return (
    <div className="fo-page" ref={containerRef}>
      <SEO
        title={lang === 'en' ? 'Find Your Local Offices' : 'Tìm Văn Phòng'}
        description={t.hero_p}
      />
      <style>{css}</style>

      {/* ── Hero ── */}
      <section className="fo-hero">
        <div className="fo-hero-inner">
          <div className="rv">
            <span className="kicker">{t.kicker}</span>
          </div>
          <h1 className="rv d1">{t.hero_h1}</h1>
          <p className="rv d2">{t.hero_p}</p>
        </div>
      </section>

      {/* ── Toolbar ── */}
      <div className="fo-toolbar rv d2">
        <div className="fo-toolbar-inner">
          <div className="fo-search">
            <span className="fo-search-icon">🔍</span>
            <input
              type="text"
              placeholder={t.search_placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="fo-filters">
            {regions.map(r => (
              <button
                key={r.key}
                className={`fo-filter-btn${region === r.key ? ' active' : ''}`}
                onClick={() => setRegion(r.key)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <span className="fo-count">{filtered.length} {t.offices_count}</span>
          <div className="fo-view-toggle">
            <button className={`fo-view-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')}>
              ☰ {t.list_view}
            </button>
            <button className={`fo-view-btn${viewMode === 'map' ? ' active' : ''}`} onClick={() => setViewMode('map')}>
              📍 {t.map_view}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="fo-main">
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="fo-map-container rv">
            <div className="fo-map-placeholder">
              <div className="fo-map-vn">
                {/* Vietnam map shape SVG */}
                <svg viewBox="0 0 200 500" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.15}}>
                  <path d="M90,10 C95,20 105,25 110,40 C115,55 100,70 105,90 C108,100 115,110 112,125 C110,135 105,145 108,160 C112,180 120,190 118,210 C115,230 108,240 110,260 C115,280 125,290 120,310 C115,330 105,340 108,360 C112,380 120,390 115,410 C110,430 100,440 95,460 C90,475 85,485 80,490 L70,480 C65,470 68,455 72,440 C75,425 70,415 65,400 C60,385 55,370 58,355 C62,340 70,330 68,315 C65,300 55,290 58,275 C62,260 70,250 68,235 C65,220 58,210 60,195 C62,180 70,170 72,155 C75,140 70,130 65,115 C60,100 65,85 70,70 C75,55 80,40 85,25Z" fill="#0f2b57"/>
                </svg>
                {/* Dots */}
                {filtered.map(o => (
                  <div
                    key={o.id}
                    className={`fo-map-dot${activeOffice === o.id ? ' active' : ''}`}
                    style={mapPositions[o.id] || {top:'50%',left:'50%'}}
                    data-label={lang === 'en' ? o.city_en : o.city_vi}
                    onClick={() => { setActiveOffice(o.id); setViewMode('list') }}
                  >
                    {o.id === 'hcm' && <div className="fo-map-pulse" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Office Cards */}
        {filtered.length > 0 ? (
          <div className="fo-grid">
            {filtered.map((o, i) => {
              const city = lang === 'en' ? o.city_en : o.city_vi
              const type = lang === 'en' ? o.type_en : o.type_vi
              const address = lang === 'en' ? o.address_en : o.address_vi
              const hours = lang === 'en' ? o.hours_en : o.hours_vi
              const services = lang === 'en' ? o.services_en : o.services_vi
              return (
                <div
                  key={o.id}
                  className={`fo-card rv d${Math.min(i + 1, 5)}${activeOffice === o.id ? ' active' : ''}`}
                  onClick={() => setActiveOffice(activeOffice === o.id ? null : o.id)}
                >
                  <div className="fo-card-header">
                    <span className={`fo-card-type ${getTypeClass(o)}`}>{type}</span>
                    <h3 className="fo-card-city">{city}</h3>
                  </div>
                  <div className="fo-card-body">
                    <div className="fo-info-row">
                      <div className="fo-info-icon loc">📍</div>
                      <div>
                        <p className="fo-info-label">{lang === 'en' ? 'Address' : 'Địa chỉ'}</p>
                        <p className="fo-info-value">{address}</p>
                      </div>
                    </div>
                    <div className="fo-info-row">
                      <div className="fo-info-icon tel">📞</div>
                      <div>
                        <p className="fo-info-label">{t.phone}</p>
                        <p className="fo-info-value"><a href={`tel:${o.phone.replace(/\s/g,'')}`}>{o.phone}</a></p>
                      </div>
                    </div>
                    <div className="fo-info-row">
                      <div className="fo-info-icon mail">✉️</div>
                      <div>
                        <p className="fo-info-label">{t.email}</p>
                        <p className="fo-info-value"><a href={`mailto:${o.email}`}>{o.email}</a></p>
                      </div>
                    </div>
                    <div className="fo-info-row">
                      <div className="fo-info-icon time">🕐</div>
                      <div>
                        <p className="fo-info-label">{t.hours}</p>
                        <p className="fo-info-value">{hours}</p>
                      </div>
                    </div>

                    <p className="fo-info-label" style={{marginTop:16}}>{t.services_label}</p>
                    <div className="fo-services">
                      {services.map(s => <span key={s} className="fo-service-tag">{s}</span>)}
                    </div>

                    <div className="fo-card-actions">
                      <a
                        className="fo-card-btn primary"
                        href={`https://www.google.com/maps?q=${o.lat},${o.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        🗺️ {t.directions}
                      </a>
                      <a
                        className="fo-card-btn secondary"
                        href={`tel:${o.phone.replace(/\s/g,'')}`}
                        onClick={e => e.stopPropagation()}
                      >
                        📞 {t.call}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="fo-empty">
            <div className="fo-empty-icon">🏢</div>
            <p>{t.no_results}</p>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="fo-cta">
        <div className="fo-cta-inner rv">
          <h2>{t.cta_title}</h2>
          <p>{t.cta_desc}</p>
          <a href="/contact" className="fo-cta-btn">📞 {t.cta_btn}</a>
        </div>
      </div>
    </div>
  )
}
