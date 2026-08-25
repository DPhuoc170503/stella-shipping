import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

/* ═══════════════════════ DEMO DATA ═══════════════════════ */
const DEMO_SHIPMENTS = {
  'STLA20260001': {
    status: 'in_transit',
    origin: 'TP. Hồ Chí Minh, Việt Nam',
    destination: 'Hamburg, Đức',
    vessel: 'MSC ISABELLA',
    container: 'MSCU1234567',
    service: 'FCL - Vận tải biển',
    etd: '10/08/2026',
    eta: '05/09/2026',
    weight: '18,500 kg',
    timeline: [
      { date: '10/08/2026', time: '08:30', status: 'done', title_vi: 'Xuất phát từ cảng Cát Lái', title_en: 'Departed Cat Lai Port', location: 'TP.HCM, VN', icon: '🚢' },
      { date: '12/08/2026', time: '14:00', status: 'done', title_vi: 'Đã qua cảng Singapore', title_en: 'Passed Singapore Port', location: 'Singapore', icon: '🏗️' },
      { date: '16/08/2026', time: '06:15', status: 'done', title_vi: 'Qua kênh đào Suez', title_en: 'Passed Suez Canal', location: 'Egypt', icon: '🌊' },
      { date: '19/08/2026', time: '—', status: 'current', title_vi: 'Đang trên Địa Trung Hải', title_en: 'In Mediterranean Sea', location: 'Mediterranean', icon: '📍' },
      { date: '28/08/2026', time: '—', status: 'pending', title_vi: 'Dự kiến đến cảng Hamburg', title_en: 'Expected arrival Hamburg', location: 'Hamburg, DE', icon: '🏁' },
      { date: '05/09/2026', time: '—', status: 'pending', title_vi: 'Giao hàng tại kho', title_en: 'Warehouse delivery', location: 'Hamburg, DE', icon: '📦' },
    ]
  },
  'STLA20260002': {
    status: 'delivered',
    origin: 'Thượng Hải, Trung Quốc',
    destination: 'Hà Nội, Việt Nam',
    vessel: 'COSCO SHIPPING ARIES',
    container: 'COSU9876543',
    service: 'LCL - Vận tải biển',
    etd: '01/08/2026',
    eta: '10/08/2026',
    weight: '3,200 kg',
    timeline: [
      { date: '01/08/2026', time: '10:00', status: 'done', title_vi: 'Xuất phát từ Thượng Hải', title_en: 'Departed Shanghai', location: 'Shanghai, CN', icon: '🚢' },
      { date: '05/08/2026', time: '16:30', status: 'done', title_vi: 'Đến cảng Hải Phòng', title_en: 'Arrived Hai Phong Port', location: 'Hải Phòng, VN', icon: '⚓' },
      { date: '06/08/2026', time: '09:00', status: 'done', title_vi: 'Thông quan hải quan', title_en: 'Customs clearance', location: 'Hải Phòng, VN', icon: '📋' },
      { date: '08/08/2026', time: '07:30', status: 'done', title_vi: 'Vận chuyển nội địa', title_en: 'Domestic transport', location: 'Hà Nội, VN', icon: '🚛' },
      { date: '10/08/2026', time: '14:00', status: 'done', title_vi: 'Đã giao hàng thành công', title_en: 'Delivered successfully', location: 'Hà Nội, VN', icon: '✅' },
    ]
  },
}

const t_ui = {
  vi: {
    kicker: 'THEO DÕI LÔ HÀNG',
    hero_h1: 'Track & Trace',
    hero_p: 'Nhập mã vận đơn để theo dõi trạng thái lô hàng của bạn theo thời gian thực.',
    placeholder: 'Nhập mã vận đơn (VD: STLA20260001)',
    btn: '🔍 Tra cứu',
    demo_hint: 'Thử mã demo: STLA20260001 hoặc STLA20260002',
    not_found_title: 'Không tìm thấy lô hàng',
    not_found_desc: 'Mã vận đơn không tồn tại trong hệ thống. Vui lòng kiểm tra lại hoặc liên hệ bộ phận hỗ trợ.',
    contact_support: 'Liên hệ hỗ trợ',
    shipment_info: 'Thông tin lô hàng',
    origin: 'Nơi đi',
    destination: 'Nơi đến',
    vessel: 'Tàu / Phương tiện',
    container: 'Số container',
    service: 'Loại dịch vụ',
    weight: 'Trọng lượng',
    etd: 'Ngày khởi hành',
    eta: 'Dự kiến đến',
    timeline_title: 'Hành trình lô hàng',
    status_in_transit: '🚢 Đang vận chuyển',
    status_delivered: '✅ Đã giao hàng',
    status_pending: '⏳ Chờ xử lý',
    new_search: '← Tra cứu mã khác',
    features_title: 'Tại sao chọn tracking của Stella?',
    f1_title: 'Real-time Tracking',
    f1_desc: 'Cập nhật vị trí lô hàng 24/7 với độ chính xác 95% nhờ AI.',
    f2_title: 'Thông báo tự động',
    f2_desc: 'Nhận email/SMS khi lô hàng thay đổi trạng thái.',
    f3_title: 'Hỗ trợ đa nền tảng',
    f3_desc: 'Tra cứu mọi lúc, mọi nơi trên điện thoại hoặc máy tính.',
  },
  en: {
    kicker: 'SHIPMENT TRACKING',
    hero_h1: 'Track & Trace',
    hero_p: 'Enter your tracking number to monitor your shipment status in real time.',
    placeholder: 'Enter tracking number (e.g., STLA20260001)',
    btn: '🔍 Track',
    demo_hint: 'Try demo codes: STLA20260001 or STLA20260002',
    not_found_title: 'Shipment not found',
    not_found_desc: 'The tracking number does not exist in our system. Please verify or contact support.',
    contact_support: 'Contact support',
    shipment_info: 'Shipment Information',
    origin: 'Origin',
    destination: 'Destination',
    vessel: 'Vessel',
    container: 'Container No.',
    service: 'Service Type',
    weight: 'Weight',
    etd: 'Departure',
    eta: 'Estimated Arrival',
    timeline_title: 'Shipment Journey',
    status_in_transit: '🚢 In Transit',
    status_delivered: '✅ Delivered',
    status_pending: '⏳ Pending',
    new_search: '← Track another',
    features_title: 'Why track with Stella?',
    f1_title: 'Real-time Tracking',
    f1_desc: 'Track your shipment 24/7 with 95% accuracy powered by AI.',
    f2_title: 'Auto Notifications',
    f2_desc: 'Get email/SMS alerts when your shipment status changes.',
    f3_title: 'Multi-platform',
    f3_desc: 'Track anytime, anywhere on your phone or computer.',
  },
}

/* ═══════════════════════ CSS ═══════════════════════ */
const css = `
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}

  .tt-page{font-family:'Inter',sans-serif;color:#1a2744}

  /* Hero */
  .tt-hero{
    position:relative;min-height:420px;display:flex;align-items:center;
    background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);
    color:#fff;overflow:hidden;
  }
  .tt-hero::before{
    content:'';position:absolute;top:-30%;right:-10%;width:600px;height:600px;
    background:radial-gradient(circle,rgba(243,108,31,.1) 0%,transparent 70%);border-radius:50%;
  }
  .tt-hero::after{
    content:'';position:absolute;bottom:-50%;left:-15%;width:500px;height:500px;
    background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%);border-radius:50%;
  }
  .tt-hero-inner{position:relative;z-index:1;max-width:820px;margin:0 auto;text-align:center;padding:72px 28px 36px}
  .tt-hero .kicker{
    display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;
    border:1px solid rgba(243,108,31,.4);padding:5px 16px;border-radius:20px;margin-bottom:18px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .tt-hero h1{font-size:48px;font-weight:800;margin:0 0 16px;font-family:'Be Vietnam Pro',sans-serif}
  .tt-hero p{font-size:16px;color:rgba(255,255,255,.75);max-width:520px;margin:0 auto 32px;line-height:1.65}

  /* Search bar */
  .tt-search{
    max-width:640px;margin:0 auto;display:flex;gap:0;
    background:#fff;border-radius:14px;overflow:hidden;
    box-shadow:0 16px 48px rgba(0,0,0,.15);
  }
  .tt-search input{
    flex:1;padding:18px 24px;border:none;font-size:16px;color:#1a2744;outline:none;
    font-family:'Inter',sans-serif;
  }
  .tt-search input::placeholder{color:#b0bec5}
  .tt-search button{
    padding:18px 32px;background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;
    border:none;font-size:15px;font-weight:700;cursor:pointer;
    transition:all .25s;white-space:nowrap;font-family:'Be Vietnam Pro',sans-serif;
  }
  .tt-search button:hover{background:linear-gradient(135deg,#e05a10,#c74e0d)}
  .tt-demo{font-size:13px;color:rgba(255,255,255,.45);margin-top:14px;text-align:center}

  /* Main */
  .tt-main{max-width:1000px;margin:0 auto;padding:48px 24px 80px}

  /* Result card */
  .tt-result{
    background:#fff;border-radius:20px;overflow:hidden;
    box-shadow:0 12px 40px rgba(10,20,40,.06);
    border:1px solid #edf1f7;
  }

  .tt-result-header{
    background:linear-gradient(135deg,#0f2b57 0%,#1e3f7a 100%);
    color:#fff;padding:28px 32px;display:flex;align-items:center;justify-content:space-between;
    flex-wrap:wrap;gap:16px;
  }
  .tt-result-id{font-size:22px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .tt-status-badge{
    padding:8px 18px;border-radius:20px;font-size:13px;font-weight:700;
    display:inline-flex;align-items:center;gap:6px;
  }
  .tt-status-badge.in_transit{background:rgba(59,130,246,.15);color:#60a5fa}
  .tt-status-badge.delivered{background:rgba(34,197,94,.15);color:#4ade80}
  .tt-status-badge.pending{background:rgba(250,204,21,.15);color:#facc15}

  /* Info grid */
  .tt-info-grid{
    display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:0;border-bottom:1px solid #edf1f7;
  }
  .tt-info-cell{
    padding:20px 24px;border-right:1px solid #edf1f7;
    border-bottom:1px solid #edf1f7;
  }
  .tt-info-cell:last-child{border-right:none}
  .tt-info-label{font-size:11px;font-weight:700;color:#8a9ab5;letter-spacing:.5px;text-transform:uppercase;margin:0 0 4px}
  .tt-info-val{font-size:15px;font-weight:600;color:#1a2744;margin:0}

  /* Route visualization */
  .tt-route{
    padding:28px 32px;display:flex;align-items:center;gap:16px;
    background:#fafbfc;border-bottom:1px solid #edf1f7;
  }
  .tt-route-point{text-align:center;flex-shrink:0}
  .tt-route-point .emoji{font-size:28px}
  .tt-route-point .city{font-size:13px;font-weight:700;color:#0f2b57;margin-top:4px}
  .tt-route-line{
    flex:1;height:4px;background:#e8edf3;border-radius:4px;position:relative;overflow:hidden;
  }
  .tt-route-progress{
    height:100%;background:linear-gradient(90deg,#f36c1f,#e05a10);border-radius:4px;
    transition:width 1.5s cubic-bezier(.22,1,.36,1);
  }
  .tt-route-ship{
    position:absolute;top:-10px;font-size:20px;
    transition:left 1.5s cubic-bezier(.22,1,.36,1);
  }

  /* Timeline */
  .tt-timeline{padding:32px}
  .tt-timeline-title{font-size:18px;font-weight:800;margin:0 0 24px;font-family:'Be Vietnam Pro',sans-serif;color:#0f2b57}
  .tt-tl-item{display:flex;gap:20px;position:relative;padding-bottom:28px}
  .tt-tl-item:last-child{padding-bottom:0}
  .tt-tl-item::before{
    content:'';position:absolute;left:23px;top:40px;bottom:0;width:2px;
    background:#e8edf3;
  }
  .tt-tl-item:last-child::before{display:none}
  .tt-tl-item.done::before{background:linear-gradient(180deg,#4ade80,#e8edf3)}
  .tt-tl-item.current::before{background:linear-gradient(180deg,#f36c1f,#e8edf3)}

  .tt-tl-dot{
    width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;
    font-size:20px;flex-shrink:0;z-index:1;
  }
  .tt-tl-item.done .tt-tl-dot{background:rgba(34,197,94,.1)}
  .tt-tl-item.current .tt-tl-dot{background:rgba(243,108,31,.1);box-shadow:0 0 0 4px rgba(243,108,31,.15);animation:tt-pulse 2s ease-in-out infinite}
  .tt-tl-item.pending .tt-tl-dot{background:#f5f7fa}
  @keyframes tt-pulse{0%,100%{box-shadow:0 0 0 4px rgba(243,108,31,.15)}50%{box-shadow:0 0 0 8px rgba(243,108,31,.08)}}

  .tt-tl-content{flex:1}
  .tt-tl-title{font-size:15px;font-weight:700;color:#1a2744;margin:0 0 4px}
  .tt-tl-item.pending .tt-tl-title{color:#8a9ab5}
  .tt-tl-meta{font-size:13px;color:#8a9ab5;display:flex;gap:16px;flex-wrap:wrap}
  .tt-tl-item.current .tt-tl-title{color:#f36c1f}

  /* Not found */
  .tt-not-found{text-align:center;padding:60px 24px}
  .tt-not-found .icon{font-size:56px;margin-bottom:16px}
  .tt-not-found h3{font-size:22px;font-weight:800;margin:0 0 8px;font-family:'Be Vietnam Pro',sans-serif}
  .tt-not-found p{font-size:15px;color:#5a6f82;margin:0 0 24px;max-width:400px;margin-left:auto;margin-right:auto}
  .tt-not-found-btn{
    display:inline-flex;align-items:center;gap:8px;padding:12px 24px;
    background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;border-radius:10px;
    font-weight:700;text-decoration:none;transition:all .25s;
  }
  .tt-not-found-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(243,108,31,.3)}

  /* New search button */
  .tt-new-search{
    display:inline-flex;align-items:center;gap:6px;padding:10px 20px;
    background:#f5f7fa;border:1px solid #edf1f7;border-radius:10px;
    font-size:14px;font-weight:600;color:#5a6f82;cursor:pointer;
    transition:all .25s;margin-bottom:24px;text-decoration:none;
  }
  .tt-new-search:hover{background:#edf1f7;color:#0f2b57}

  /* Features */
  .tt-features{
    max-width:1000px;margin:0 auto;padding:0 24px 80px;
  }
  .tt-features-title{
    text-align:center;font-size:28px;font-weight:800;margin:0 0 40px;
    font-family:'Be Vietnam Pro',sans-serif;color:#0f2b57;
  }
  .tt-features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
  .tt-feat-card{
    background:#fff;border-radius:16px;padding:32px;text-align:center;
    border:1px solid #edf1f7;box-shadow:0 4px 20px rgba(10,20,40,.03);
    transition:all .35s cubic-bezier(.22,1,.36,1);
  }
  .tt-feat-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(10,20,40,.08);border-color:#f36c1f}
  .tt-feat-icon{
    width:64px;height:64px;border-radius:16px;margin:0 auto 16px;
    display:flex;align-items:center;justify-content:center;font-size:28px;
  }
  .tt-feat-icon.orange{background:rgba(243,108,31,.08)}
  .tt-feat-icon.blue{background:rgba(15,43,87,.06)}
  .tt-feat-icon.green{background:rgba(34,197,94,.08)}
  .tt-feat-card h3{font-size:17px;font-weight:800;margin:0 0 8px;font-family:'Be Vietnam Pro',sans-serif;color:#0f2b57}
  .tt-feat-card p{font-size:14px;color:#5a6f82;margin:0;line-height:1.6}

  @media(max-width:700px){
    .tt-hero h1{font-size:32px}
    .tt-search{flex-direction:column}
    .tt-search button{border-radius:0}
    .tt-result-header{flex-direction:column;align-items:flex-start}
    .tt-route{flex-direction:column}
    .tt-route-line{width:100%;height:4px}
    .tt-timeline{padding:20px}
  }
`

export default function TrackTrace() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const t = t_ui[lang]
  const containerRef = useScrollReveal()

  const [trackingId, setTrackingId] = useState('')
  const [result, setResult] = useState(null) // null=initial, 'not_found', or shipment object
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!trackingId.trim()) return
    setLoading(true)
    setSearched(true)

    // Simulate API call
    setTimeout(() => {
      const shipment = DEMO_SHIPMENTS[trackingId.trim().toUpperCase()]
      setResult(shipment || 'not_found')
      setLoading(false)
    }, 1200)
  }

  const resetSearch = () => {
    setResult(null)
    setSearched(false)
    setTrackingId('')
  }

  const getProgress = (shipment) => {
    if (!shipment || shipment === 'not_found') return 0
    const total = shipment.timeline.length
    const done = shipment.timeline.filter(t => t.status === 'done').length
    const current = shipment.timeline.find(t => t.status === 'current') ? 0.5 : 0
    return Math.round(((done + current) / total) * 100)
  }

  const getStatusText = (status) => {
    if (status === 'in_transit') return t.status_in_transit
    if (status === 'delivered') return t.status_delivered
    return t.status_pending
  }

  return (
    <div className="tt-page" ref={containerRef}>
      <SEO title="Track & Trace" description={t.hero_p} />
      <style>{css}</style>

      {/* Hero */}
      <section className="tt-hero">
        <div className="tt-hero-inner">
          <span className="kicker rv">{t.kicker}</span>
          <h1 className="rv d1">{t.hero_h1}</h1>
          <p className="rv d2">{t.hero_p}</p>
          <form className="tt-search rv d3" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t.placeholder}
              value={trackingId}
              onChange={e => setTrackingId(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? '⏳' : t.btn}
            </button>
          </form>
          <p className="tt-demo rv d4">{t.demo_hint}</p>
        </div>
      </section>

      {/* Results */}
      {searched && (
        <div className="tt-main">
          {loading ? (
            <div style={{textAlign:'center',padding:'60px 0'}}>
              <div style={{fontSize:'48px',animation:'tt-pulse 1.5s ease-in-out infinite'}}>🔍</div>
              <p style={{color:'#8a9ab5',marginTop:'16px'}}>{lang === 'en' ? 'Searching...' : 'Đang tìm kiếm...'}</p>
            </div>
          ) : result === 'not_found' ? (
            <div className="tt-not-found rv">
              <div className="icon">📭</div>
              <h3>{t.not_found_title}</h3>
              <p>{t.not_found_desc}</p>
              <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
                <button className="tt-new-search" onClick={resetSearch}>{t.new_search}</button>
                <Link to="/contact" className="tt-not-found-btn">📞 {t.contact_support}</Link>
              </div>
            </div>
          ) : result ? (
            <>
              <button className="tt-new-search" onClick={resetSearch}>{t.new_search}</button>
              <div className="tt-result rv">
                {/* Header */}
                <div className="tt-result-header">
                  <span className="tt-result-id">{trackingId.toUpperCase()}</span>
                  <span className={`tt-status-badge ${result.status}`}>
                    {getStatusText(result.status)}
                  </span>
                </div>

                {/* Route visualization */}
                <div className="tt-route">
                  <div className="tt-route-point">
                    <div className="emoji">📦</div>
                    <div className="city">{result.origin.split(',')[0]}</div>
                  </div>
                  <div className="tt-route-line">
                    <div className="tt-route-progress" style={{width:`${getProgress(result)}%`}} />
                    <div className="tt-route-ship" style={{left:`${Math.max(getProgress(result)-3,0)}%`}}>🚢</div>
                  </div>
                  <div className="tt-route-point">
                    <div className="emoji">🏁</div>
                    <div className="city">{result.destination.split(',')[0]}</div>
                  </div>
                </div>

                {/* Info grid */}
                <div className="tt-info-grid">
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.origin}</p>
                    <p className="tt-info-val">{result.origin}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.destination}</p>
                    <p className="tt-info-val">{result.destination}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.vessel}</p>
                    <p className="tt-info-val">{result.vessel}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.container}</p>
                    <p className="tt-info-val">{result.container}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.service}</p>
                    <p className="tt-info-val">{result.service}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.weight}</p>
                    <p className="tt-info-val">{result.weight}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.etd}</p>
                    <p className="tt-info-val">{result.etd}</p>
                  </div>
                  <div className="tt-info-cell">
                    <p className="tt-info-label">{t.eta}</p>
                    <p className="tt-info-val">{result.eta}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="tt-timeline">
                  <h3 className="tt-timeline-title">📍 {t.timeline_title}</h3>
                  {result.timeline.map((step, i) => (
                    <div key={i} className={`tt-tl-item ${step.status}`}>
                      <div className="tt-tl-dot">{step.icon}</div>
                      <div className="tt-tl-content">
                        <p className="tt-tl-title">{lang === 'en' ? step.title_en : step.title_vi}</p>
                        <div className="tt-tl-meta">
                          <span>📅 {step.date}</span>
                          {step.time !== '—' && <span>🕐 {step.time}</span>}
                          <span>📍 {step.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* Features section (shown when no search) */}
      {!searched && (
        <div className="tt-features">
          <h2 className="tt-features-title rv">{t.features_title}</h2>
          <div className="tt-features-grid">
            <div className="tt-feat-card rv d1">
              <div className="tt-feat-icon orange">📡</div>
              <h3>{t.f1_title}</h3>
              <p>{t.f1_desc}</p>
            </div>
            <div className="tt-feat-card rv d2">
              <div className="tt-feat-icon blue">🔔</div>
              <h3>{t.f2_title}</h3>
              <p>{t.f2_desc}</p>
            </div>
            <div className="tt-feat-card rv d3">
              <div className="tt-feat-icon green">📱</div>
              <h3>{t.f3_title}</h3>
              <p>{t.f3_desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
