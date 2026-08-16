import React, { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { useTranslation } from 'react-i18next'

const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/pricing` : 'https://stella-shipping.onrender.com/api/pricing'

const t_ui = {
  vi: {
    title: "Bảng giá cước vận tải",
    desc: "Tham khảo bảng giá cước vận tải biển FCL, LCL, vận tải hàng không và dịch vụ kho bãi được cập nhật liên tục.",
    kicker: "BẢNG GIÁ THAM KHẢO",
    hero_h1: "Cước vận tải & Phí dịch vụ",
    hero_p: "Giá cước logistics thay đổi hàng ngày theo thị trường. Chúng tôi cập nhật bảng giá thường xuyên để bạn có thông tin tham khảo chính xác nhất.",
    b1: "🌍 120+ Quốc gia",
    b2: "⚡ Báo giá trong 2 giờ",
    b3: "💰 Giá cạnh tranh nhất",
    b4: "🔄 Cập nhật hàng ngày",
    disc_warn: "Lưu ý quan trọng:",
    disc_text: "Bảng giá dưới đây chỉ mang tính tham khảo — giá thực tế phụ thuộc vào thời điểm booking, loại hàng, thể tích và các phụ phí phát sinh. Vui lòng yêu cầu báo giá chính xác từ đội ngũ của chúng tôi.",
    updated: "Cập nhật lần cuối",
    tab_sea_fcl: "🚢 FCL",
    tab_sea_lcl: "📦 LCL",
    tab_air: "✈️ Hàng không",
    tab_road: "🚛 Đường bộ",
    tab_warehouse: "🏭 Kho bãi",
    full_sea_fcl: "Vận tải biển (FCL)",
    full_sea_lcl: "Hàng lẻ (LCL)",
    full_air: "Vận tải hàng không",
    full_road: "Vận tải đường bộ",
    full_warehouse: "Dịch vụ kho bãi",
    th_route: "Tuyến đường / Dịch vụ",
    th_unit: "Đơn vị",
    th_price: "Giá từ",
    th_time: "Thời gian",
    th_note: "Ghi chú",
    no_data: "Chưa có dữ liệu — đang cập nhật...",
    req_title: "📋 Yêu cầu báo giá chính xác",
    req_desc: "Điền thông tin để nhận báo giá chi tiết, chính xác trong vòng 2 giờ làm việc.",
    succ_title: "Gửi thành công!",
    succ_desc: "Chúng tôi sẽ phản hồi trong 2 giờ làm việc.",
    f_name: "HỌ TÊN *",
    f_name_ph: "Nguyễn Văn A",
    f_company: "CÔNG TY",
    f_company_ph: "Tên công ty",
    f_email: "EMAIL *",
    f_email_ph: "email@company.com",
    f_phone: "ĐIỆN THOẠI",
    f_phone_ph: "0901 234 567",
    f_origin: "NƠI ĐI",
    f_origin_ph: "TP.HCM, Việt Nam",
    f_dest: "NƠI ĐẾN",
    f_dest_ph: "Rotterdam, Hà Lan",
    f_service: "LOẠI DỊCH VỤ",
    f_cargo: "HÀNG HÓA",
    f_cargo_ph: "VD: 2 cont 40HC hàng điện tử",
    f_note: "GHI CHÚ",
    f_note_ph: "Yêu cầu đặc biệt, thời gian dự kiến...",
    btn_send: "🚀 Gửi yêu cầu báo giá",
    btn_sending: "⏳ Đang gửi...",
    info_title: "Lưu ý về bảng giá",
    i1_title: "Cập nhật hàng ngày",
    i1_desc: "Giá cước biển, không và đường bộ thay đổi theo thị trường. Bảng giá được đội ngũ cập nhật mỗi ngày làm việc.",
    i2_title: "Giá chưa bao gồm phụ phí",
    i2_desc: "Các mức giá hiển thị là giá cước thuần (ocean/air freight). Phụ phí địa phương, THC, DOC fee... tính riêng.",
    i3_title: "Báo giá chính xác trong 2 giờ",
    i3_desc: "Điền form bên cạnh để nhận báo giá all-in chính xác nhất, kèm lịch trình tàu/máy bay cụ thể.",
    sur_title: "⚡ Các phụ phí thường gặp:",
    sur_1: "THC (Terminal Handling Charge): $60–120 / cont",
    sur_2: "D/O Fee (Delivery Order): $25–40 / lô hàng",
    sur_3: "B/L Fee: $30–50 / B/L",
    sur_4: "Fumigation (kiểm dịch): theo từng lô",
    sur_5: "Phụ phí nhiên liệu (BAF/FAF): biến động hàng tuần",
    sur_6: "Phụ phí tắc nghẽn cảng (PSS): theo thông báo hãng tàu"
  },
  en: {
    title: "Freight Rates",
    desc: "Reference our continuously updated freight rates for sea (FCL, LCL), air freight, and warehousing services.",
    kicker: "REFERENCE PRICING",
    hero_h1: "Freight Rates & Services",
    hero_p: "Logistics rates fluctuate daily with the market. We update our prices regularly to provide you with the most accurate reference information.",
    b1: "🌍 120+ Countries",
    b2: "⚡ Quote in 2 hours",
    b3: "💰 Most Competitive",
    b4: "🔄 Daily Updates",
    disc_warn: "Important Note:",
    disc_text: "The prices below are for reference only — actual rates depend on booking time, cargo type, volume, and applicable surcharges. Please request an exact quote from our team.",
    updated: "Last updated",
    tab_sea_fcl: "🚢 FCL",
    tab_sea_lcl: "📦 LCL",
    tab_air: "✈️ Air Freight",
    tab_road: "🚛 Road Freight",
    tab_warehouse: "🏭 Warehousing",
    full_sea_fcl: "Sea Freight (FCL)",
    full_sea_lcl: "Less than Container Load (LCL)",
    full_air: "Air Freight",
    full_road: "Road Freight",
    full_warehouse: "Warehousing Services",
    th_route: "Route / Service",
    th_unit: "Unit",
    th_price: "From",
    th_time: "Transit Time",
    th_note: "Notes",
    no_data: "No data available — updating...",
    req_title: "📋 Request Exact Quote",
    req_desc: "Fill in the details to receive an exact, detailed quote within 2 working hours.",
    succ_title: "Sent Successfully!",
    succ_desc: "We will respond within 2 working hours.",
    f_name: "FULL NAME *",
    f_name_ph: "John Doe",
    f_company: "COMPANY",
    f_company_ph: "Company Name",
    f_email: "EMAIL *",
    f_email_ph: "email@company.com",
    f_phone: "PHONE",
    f_phone_ph: "+1 234 567 890",
    f_origin: "ORIGIN",
    f_origin_ph: "HCMC, Vietnam",
    f_dest: "DESTINATION",
    f_dest_ph: "Rotterdam, Netherlands",
    f_service: "SERVICE TYPE",
    f_cargo: "CARGO",
    f_cargo_ph: "Ex: 2x40HC electronics",
    f_note: "NOTES",
    f_note_ph: "Special requirements, estimated time...",
    btn_send: "🚀 Send Quote Request",
    btn_sending: "⏳ Sending...",
    info_title: "Pricing Notes",
    i1_title: "Daily Updates",
    i1_desc: "Sea, air, and road freight rates fluctuate with the market. Our team updates the pricing every working day.",
    i2_title: "Excluding Surcharges",
    i2_desc: "The displayed prices are pure freight rates (ocean/air). Local surcharges, THC, DOC fee... are charged separately.",
    i3_title: "Exact Quote in 2 Hours",
    i3_desc: "Fill out the form to receive the most accurate all-in quote, along with a specific vessel/flight schedule.",
    sur_title: "⚡ Common Surcharges:",
    sur_1: "THC (Terminal Handling Charge): $60–120 / cont",
    sur_2: "D/O Fee (Delivery Order): $25–40 / shipment",
    sur_3: "B/L Fee: $30–50 / B/L",
    sur_4: "Fumigation: per shipment",
    sur_5: "Bunker Adjustment Factor (BAF/FAF): weekly fluctuation",
    sur_6: "Peak Season Surcharge (PSS): per carrier notice"
  }
}

/* ── Format tiền tệ ── */
function formatPrice(price, currency) {
  if (currency === 'USD') {
    return `$${Number(price).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
  }
  return `${Number(price).toLocaleString('vi-VN')} ₫`
}

/* ── Format ngày cập nhật ── */
function formatUpdated(ts) {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/* ═══════════════════════════════════ CSS ═══════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .pr-page { font-family: 'Inter', sans-serif; color: #1a2744; }

  /* ── Hero ── */
  .pr-hero {
    background: linear-gradient(135deg, #061e2d 0%, #0f2b57 55%, #1e3f7a 100%);
    color: #fff; padding: 80px 24px 110px; text-align: center; position: relative; overflow: hidden;
  }
  .pr-hero::before {
    content: ''; position: absolute; top: -40%; right: -15%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(243,108,31,.12) 0%, transparent 70%); border-radius: 50%;
  }
  .pr-hero::after {
    content: ''; position: absolute; bottom: -30%; left: -10%; width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(243,108,31,.07) 0%, transparent 70%); border-radius: 50%;
  }
  .pr-hero-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
  .pr-kicker {
    display: inline-block; color: #f36c1f; font-weight: 700; letter-spacing: 3px; font-size: 12px;
    border: 1px solid rgba(243,108,31,.4); padding: 5px 16px; border-radius: 20px; margin-bottom: 18px;
  }
  .pr-hero h1 { font-size: 48px; font-weight: 800; margin: 0 0 16px; line-height: 1.1; }
  .pr-hero p { font-size: 16px; color: rgba(255,255,255,.78); max-width: 600px; margin: 0 auto 28px; line-height: 1.65; }
  .pr-hero-badges { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .pr-badge {
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
    padding: 8px 18px; border-radius: 30px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.9);
  }

  /* ── Disclaimer banner ── */
  .pr-disclaimer {
    background: linear-gradient(90deg, #fff8f3, #fff3ea);
    border-left: 4px solid #f36c1f; max-width: 1200px; margin: -40px auto 0;
    position: relative; z-index: 10; border-radius: 12px;
    padding: 16px 24px; display: flex; align-items: center; gap: 14px;
    box-shadow: 0 8px 32px rgba(243,108,31,.1);
  }
  .pr-disclaimer-icon { font-size: 24px; flex-shrink: 0; }
  .pr-disclaimer p { margin: 0; font-size: 13.5px; color: #7a4010; line-height: 1.55; }
  .pr-disclaimer strong { color: #c94d0e; }
  .pr-updated {
    margin-left: auto; flex-shrink: 0; text-align: right;
    font-size: 12px; color: #a0522d; font-weight: 500; white-space: nowrap;
  }
  .pr-updated span { display: block; font-size: 13px; font-weight: 700; color: #c94d0e; }

  /* ── Main layout ── */
  .pr-main { max-width: 1200px; margin: 40px auto; padding: 0 24px 80px; }

  /* ── Tabs ── */
  .pr-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
  .pr-tab {
    padding: 11px 22px; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer;
    border: 1.5px solid #d5dde6; background: #fff; color: #5a6f82;
    transition: all 0.22s; display: flex; align-items: center; gap: 7px;
  }
  .pr-tab:hover { border-color: #0f2b57; color: #0f2b57; background: rgba(15,43,87,.04); }
  .pr-tab.active { background: #0f2b57; color: #fff; border-color: #0f2b57; box-shadow: 0 4px 14px rgba(15,43,87,.2); }

  /* ── Table card ── */
  .pr-card {
    background: #fff; border-radius: 16px; overflow: hidden;
    box-shadow: 0 4px 24px rgba(10,20,40,.06); border: 1px solid #edf1f7;
    animation: fadeSlide .3s ease;
  }
  @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .pr-card-header {
    background: linear-gradient(135deg, #0f2b57, #1a3a6a);
    padding: 20px 28px; display: flex; align-items: center; justify-content: space-between;
  }
  .pr-card-header h2 { margin: 0; font-size: 20px; color: #fff; font-weight: 700; }
  .pr-card-header .count {
    background: rgba(255,255,255,.15); color: rgba(255,255,255,.9);
    padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
  }

  /* ── Price table ── */
  .pr-table-wrap { overflow-x: auto; }
  .pr-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .pr-table th {
    background: #f5f8fb; text-align: left; padding: 14px 18px;
    font-size: 11px; color: #7b8a9a; text-transform: uppercase; letter-spacing: .8px;
    font-weight: 700; border-bottom: 1px solid #edf1f7; white-space: nowrap;
  }
  .pr-table td { padding: 15px 18px; border-bottom: 1px solid #f3f5f8; vertical-align: middle; }
  .pr-table tr:last-child td { border-bottom: none; }
  .pr-table tr:hover td { background: #fafbfd; }
  .pr-route { font-weight: 600; color: #0f2b57; }
  .pr-unit { background: rgba(15,43,87,.07); color: #0f2b57; padding: 3px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; white-space: nowrap; }
  .pr-price { font-size: 17px; font-weight: 800; color: #f36c1f; white-space: nowrap; }
  .pr-price-label { font-size: 11px; color: #9aabbb; font-weight: 500; display: block; }
  .pr-transit { color: #22c55e; font-weight: 600; font-size: 13px; white-space: nowrap; }
  .pr-note { color: #7b8a9a; font-size: 12.5px; max-width: 260px; line-height: 1.45; }

  /* ── Loading skeleton ── */
  .pr-skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .pr-skel-row { display: flex; gap: 12px; padding: 15px 18px; border-bottom: 1px solid #f3f5f8; }
  .pr-skel-bar { height: 16px; background: #e8ecf0; border-radius: 6px; }

  /* ── Quote CTA ── */
  .pr-cta-section { margin-top: 40px; }
  .pr-cta-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; }
  .pr-cta-card {
    background: linear-gradient(135deg, #0f2b57, #1a3a6a);
    border-radius: 16px; padding: 36px 36px 32px; color: #fff;
  }
  .pr-cta-card h3 { margin: 0 0 10px; font-size: 22px; font-weight: 800; }
  .pr-cta-card p { margin: 0 0 24px; color: rgba(255,255,255,.75); line-height: 1.6; font-size: 14px; }
  .pr-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
  .pr-form-group { display: flex; flex-direction: column; gap: 5px; }
  .pr-form-group label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.7); letter-spacing: .5px; }
  .pr-form-group input, .pr-form-group select, .pr-form-group textarea {
    padding: 11px 14px; border: 1.5px solid rgba(255,255,255,.15); border-radius: 9px;
    background: rgba(255,255,255,.08); color: #fff; font-size: 13.5px;
    transition: border-color .2s; font-family: inherit;
  }
  .pr-form-group input::placeholder, .pr-form-group textarea::placeholder { color: rgba(255,255,255,.35); }
  .pr-form-group input:focus, .pr-form-group select:focus, .pr-form-group textarea:focus {
    outline: none; border-color: #f36c1f; background: rgba(255,255,255,.12);
  }
  .pr-form-group select option { background: #0f2b57; color: #fff; }
  .pr-form-submit {
    width: 100%; padding: 14px; background: linear-gradient(135deg, #f36c1f, #e05a10);
    color: #fff; font-weight: 700; font-size: 15px; border: none; border-radius: 10px;
    cursor: pointer; transition: all .25s; margin-top: 4px; box-shadow: 0 4px 14px rgba(243,108,31,.35);
  }
  .pr-form-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(243,108,31,.5); }

  .pr-info-card { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #edf1f7; }
  .pr-info-card h3 { margin: 0 0 20px; font-size: 18px; color: #0f2b57; font-weight: 700; }
  .pr-info-item { display: flex; gap: 14px; margin-bottom: 18px; }
  .pr-info-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .pr-info-icon.orange { background: rgba(243,108,31,.1); }
  .pr-info-icon.blue   { background: rgba(15,43,87,.08); }
  .pr-info-icon.green  { background: rgba(34,197,94,.1); }
  .pr-info-text strong { display: block; font-size: 14px; color: #0f2b57; font-weight: 700; margin-bottom: 3px; }
  .pr-info-text span { font-size: 13px; color: #7b8a9a; line-height: 1.5; }
  .pr-surcharge { margin-top: 18px; padding: 14px 16px; background: #f8fafc; border-radius: 10px; border-left: 3px solid #f36c1f; }
  .pr-surcharge p { margin: 0 0 8px; font-size: 12.5px; font-weight: 700; color: #0f2b57; }
  .pr-surcharge ul { margin: 0; padding-left: 16px; }
  .pr-surcharge li { font-size: 12px; color: #5a6f82; margin-bottom: 4px; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .pr-hero h1 { font-size: 32px; }
    .pr-cta-grid { grid-template-columns: 1fr; }
    .pr-disclaimer { flex-direction: column; text-align: center; }
    .pr-updated { margin-left: 0; text-align: center; }
  }
  @media (max-width: 600px) {
    .pr-form-row { grid-template-columns: 1fr; }
    .pr-tabs { gap: 6px; }
    .pr-tab { padding: 9px 14px; font-size: 13px; }
  }
`

/* ── Skeleton loading ── */
function PriceSkeleton() {
  return (
    <div className="pr-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="pr-skel-row">
          <div className="pr-skel-bar" style={{ flex: 2 }} />
          <div className="pr-skel-bar" style={{ flex: 0.6 }} />
          <div className="pr-skel-bar" style={{ flex: 0.8 }} />
          <div className="pr-skel-bar" style={{ flex: 0.7 }} />
          <div className="pr-skel-bar" style={{ flex: 1.5 }} />
        </div>
      ))}
    </div>
  )
}

export default function Pricing() {
  const { i18n } = useTranslation()
  const t = t_ui[i18n.language === 'en' ? 'en' : 'vi']
  
  const TABS = [
    { key: 'sea_fcl', label: t.tab_sea_fcl, full: t.full_sea_fcl },
    { key: 'sea_lcl', label: t.tab_sea_lcl, full: t.full_sea_lcl },
    { key: 'air', label: t.tab_air, full: t.full_air },
    { key: 'road', label: t.tab_road, full: t.full_road },
    { key: 'warehouse', label: t.tab_warehouse, full: t.full_warehouse },
  ]

  const [activeTab, setActiveTab] = useState('sea_fcl')
  const [allRates, setAllRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', origin: '', destination: '', service: 'sea_fcl', cargo: '', note: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  /* ── Load giá từ API ── */
  useEffect(() => {
    setLoading(true)
    fetch(API)
      .then(r => r.json())
      .then(data => { setAllRates(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => { setAllRates([]); setLoading(false) })

    fetch(`${API}/last-updated`)
      .then(r => r.json())
      .then(d => setLastUpdated(d.last_updated))
      .catch(() => { })
  }, [])

  const rates = allRates.filter(r => r.service_type === activeTab)
  const currentTab = TABS.find(tab => tab.key === activeTab)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com'
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setTimeout(() => setSent(false), 5000)
      setForm({ name: '', company: '', email: '', phone: '', origin: '', destination: '', service: 'sea_fcl', cargo: '', note: '' })
    } catch (err) {
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pr-page">
      <SEO title={t.title} description={t.desc} />
      <style>{css}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="pr-hero">
        <div className="pr-hero-inner">
          <div className="pr-kicker">{t.kicker}</div>
          <h1>{t.hero_h1}</h1>
          <p>{t.hero_p}</p>
          <div className="pr-hero-badges">
            <span className="pr-badge">{t.b1}</span>
            <span className="pr-badge">{t.b2}</span>
            <span className="pr-badge">{t.b3}</span>
            <span className="pr-badge">{t.b4}</span>
          </div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div style={{ padding: '0 24px', maxWidth: 1248, margin: '0 auto' }}>
        <div className="pr-disclaimer">
          <div className="pr-disclaimer-icon">⚠️</div>
          <p>
            <strong>{t.disc_warn}</strong> {t.disc_text}
          </p>
          <div className="pr-updated">
            {t.updated}
            <span>{formatUpdated(lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN ═══════ */}
      <div className="pr-main">

        {/* Tabs */}
        <div className="pr-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`pr-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bảng giá */}
        <div className="pr-card">
          <div className="pr-card-header">
            <h2>{currentTab?.full}</h2>
            <span className="count">{loading ? '...' : rates.length}</span>
          </div>
          <div className="pr-table-wrap">
            {loading ? <PriceSkeleton /> : (
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>{t.th_route}</th>
                    <th>{t.th_unit}</th>
                    <th>{t.th_price}</th>
                    {activeTab !== 'warehouse' && <th>{t.th_time}</th>}
                    <th>{t.th_note}</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9aabbb' }}>
                        {t.no_data}
                      </td>
                    </tr>
                  ) : rates.map(r => (
                    <tr key={r.id}>
                      <td><span className="pr-route">{i18n.language === 'en' && r.route_en ? r.route_en : r.route}</span></td>
                      <td><span className="pr-unit">{r.unit}</span></td>
                      <td>
                        <span className="pr-price">{formatPrice(r.price_from, r.currency)}</span>
                        <span className="pr-price-label">/ {r.unit}</span>
                      </td>
                      {activeTab !== 'warehouse' && (
                        <td>
                          {r.transit_time
                            ? <span className="pr-transit">🕐 {r.transit_time}</span>
                            : <span style={{ color: '#c0cadb' }}>—</span>
                          }
                        </td>
                      )}
                      <td><span className="pr-note">{i18n.language === 'en' && r.note_en ? r.note_en : (r.note || '—')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* CTA + Info */}
        <div className="pr-cta-section">
          <div className="pr-cta-grid">

            {/* Form báo giá */}
            <div className="pr-cta-card">
              <h3>{t.req_title}</h3>
              <p>{t.req_desc}</p>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{t.succ_title}</p>
                  <p style={{ color: 'rgba(255,255,255,.7)', margin: '8px 0 0', fontSize: 13 }}>{t.succ_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>{t.f_name}</label>
                      <input name="name" placeholder={t.f_name_ph} value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="pr-form-group">
                      <label>{t.f_company}</label>
                      <input name="company" placeholder={t.f_company_ph} value={form.company} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>{t.f_email}</label>
                      <input type="email" name="email" placeholder={t.f_email_ph} value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="pr-form-group">
                      <label>{t.f_phone}</label>
                      <input name="phone" placeholder={t.f_phone_ph} value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>{t.f_origin}</label>
                      <input name="origin" placeholder={t.f_origin_ph} value={form.origin} onChange={handleChange} />
                    </div>
                    <div className="pr-form-group">
                      <label>{t.f_dest}</label>
                      <input name="destination" placeholder={t.f_dest_ph} value={form.destination} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>{t.f_service}</label>
                      <select name="service" value={form.service} onChange={handleChange}>
                        {TABS.map(tab => (
                          <option key={tab.key} value={tab.key}>{tab.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="pr-form-group">
                      <label>{t.f_cargo}</label>
                      <input name="cargo" placeholder={t.f_cargo_ph} value={form.cargo} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-group" style={{ marginBottom: 14 }}>
                    <label>{t.f_note}</label>
                    <textarea name="note" placeholder={t.f_note_ph} value={form.note} onChange={handleChange} rows={2} style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="pr-form-submit" disabled={sending}>
                    {sending ? t.btn_sending : t.btn_send}
                  </button>
                </form>
              )}
            </div>

            {/* Info card */}
            <div className="pr-info-card">
              <h3>{t.info_title}</h3>
              <div className="pr-info-item">
                <div className="pr-info-icon orange">🔄</div>
                <div className="pr-info-text">
                  <strong>{t.i1_title}</strong>
                  <span>{t.i1_desc}</span>
                </div>
              </div>
              <div className="pr-info-item">
                <div className="pr-info-icon blue">💵</div>
                <div className="pr-info-text">
                  <strong>{t.i2_title}</strong>
                  <span>{t.i2_desc}</span>
                </div>
              </div>
              <div className="pr-info-item">
                <div className="pr-info-icon green">⚡</div>
                <div className="pr-info-text">
                  <strong>{t.i3_title}</strong>
                  <span>{t.i3_desc}</span>
                </div>
              </div>
              <div className="pr-surcharge">
                <p>{t.sur_title}</p>
                <ul>
                  <li>{t.sur_1}</li>
                  <li>{t.sur_2}</li>
                  <li>{t.sur_3}</li>
                  <li>{t.sur_4}</li>
                  <li>{t.sur_5}</li>
                  <li>{t.sur_6}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
