import React, { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

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

/* ═══ DATA ═══ */
const SERVICES = [
  {
    icon: '🚢',
    title: 'Vận tải biển',
    subtitle: 'FCL & LCL',
    desc: 'Booking container quốc tế với 50+ hãng tàu hàng đầu. Dịch vụ FCL nguyên container và LCL ghép hàng trên tuyến toàn cầu. Hỗ trợ hàng nguy hiểm, quá khổ, reefer và project cargo.',
    features: ['FCL — Nguyên container 20\'/40\'/40HC', 'LCL — Ghép hàng lẻ linh hoạt', 'Hàng nguy hiểm (DG Cargo)', 'Hàng đông lạnh (Reefer)', 'Hàng quá khổ (OOG/Project)'],
    stats: { routes: '420+ cảng', carriers: '50+ hãng tàu', delivery: '98% đúng hẹn' },
    color: '#0f2b57',
    accent: '#2563eb',
    link: '/services/shipping-lines',
    img: '/Shippinglines.jpg'
  },
  {
    icon: '✈️',
    title: 'Vận tải hàng không',
    subtitle: 'Air Freight',
    desc: 'Giải pháp vận tải hàng không cho hàng khẩn cấp và giá trị cao. Kết nối 80+ sân bay quốc tế với thời gian transit nhanh nhất thị trường. Hợp tác với các hãng bay lớn.',
    features: ['General Cargo', 'Express / Time-critical', 'Hàng dược phẩm (GDP)', 'E-Commerce Fulfillment', 'Charter flights theo yêu cầu'],
    stats: { routes: '80+ sân bay', carriers: '20+ hãng bay', delivery: '1-5 ngày transit' },
    color: '#7c3aed',
    accent: '#a855f7',
    link: '/services/scheduled-flights',
    img: '/AirFreight.jpg'
  },
  {
    icon: '🚛',
    title: 'Vận tải đa phương thức',
    subtitle: 'Intermodal',
    desc: 'Kết hợp linh hoạt đường biển – bộ – sắt – hàng không. Tối ưu chi phí và thời gian cho từng tuyến vận chuyển cụ thể. Chỉ cần 1 hợp đồng duy nhất.',
    features: ['Biển + Đường bộ', 'Hàng không + Đường bộ', 'Đường sắt liên vận quốc tế', 'Sea-Air kết hợp', 'Door-to-door tracking'],
    stats: { routes: '120+ quốc gia', carriers: 'Đa phương thức', delivery: 'Tiết kiệm 20-40%' },
    color: '#059669',
    accent: '#34d399',
    link: '/services/intermodal',
    img: '/INTERMODA.jpg'
  },
  {
    icon: '🏭',
    title: 'Kho bãi & Logistics',
    subtitle: 'Warehousing & Distribution',
    desc: 'Hệ thống kho 15.000m² với WMS hiện đại. Cross-docking, pick-pack, quản lý tồn kho và dịch vụ last-mile delivery. Kho lạnh đạt chuẩn HACCP.',
    features: ['Kho khô & kho lạnh (-25°C)', 'Cross-docking xử lý nhanh', 'Pick & Pack cho E-commerce', 'Last-mile Delivery 63 tỉnh', 'WMS tích hợp ERP/API'],
    stats: { routes: '15.000m² kho', carriers: '50+ xe', delivery: '99.8% chính xác' },
    color: '#d97706',
    accent: '#fbbf24',
    link: '/services/logistics',
    img: '/Logictis.jpg'
  },
  {
    icon: '📋',
    title: 'Thủ tục Hải quan',
    subtitle: 'Customs Brokerage',
    desc: 'Dịch vụ khai báo hải quan điện tử, phân loại mã HS, xin C/O, giấy phép XNK đặc biệt. Tư vấn thuế và hỗ trợ kiểm tra sau thông quan.',
    features: ['Khai báo VNACCS/VCIS', 'Phân loại mã HS chính xác', 'Chứng nhận xuất xứ (15+ form)', 'Giấy phép XNK đặc biệt', 'Tư vấn thuế & hoàn thuế'],
    stats: { routes: 'Thông quan 24h', carriers: '15+ form C/O', delivery: 'Tiết kiệm 15% thuế' },
    color: '#dc2626',
    accent: '#f87171',
    link: '/services/dedicated',
    img: '/OURRANGE.jpg'
  },
  {
    icon: '🔍',
    title: 'Tư vấn Supply Chain',
    subtitle: 'SCM Consulting',
    desc: 'Phân tích, đánh giá và tối ưu hóa chuỗi cung ứng. Thiết kế mạng lưới phân phối, dự báo nhu cầu bằng AI/ML, chuyển đổi số SCM và Green logistics.',
    features: ['Phân tích & benchmark', 'Thiết kế mạng lưới phân phối', 'Dự báo nhu cầu AI/ML', 'Chuyển đổi số SCM', 'Green Supply Chain'],
    stats: { routes: '85%+ chính xác', carriers: 'AI/ML powered', delivery: 'Giảm 30% CO2' },
    color: '#0891b2',
    accent: '#22d3ee',
    link: '/services/charters',
    img: '/Chacracter.jpg'
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Tư vấn & Khảo sát', desc: 'Lắng nghe nhu cầu, phân tích loại hàng, tuyến đường và timeline để đề xuất giải pháp phù hợp nhất.', icon: '💬' },
  { num: '02', title: 'Báo giá & Hợp đồng', desc: 'Báo giá all-in minh bạch trong 2 giờ. Ký hợp đồng rõ ràng về phạm vi dịch vụ và SLA.', icon: '📝' },
  { num: '03', title: 'Vận hành & Tracking', desc: 'Triển khai booking, vận chuyển, thông quan. Tracking real-time và cập nhật trạng thái tự động.', icon: '🚀' },
  { num: '04', title: 'Giao hàng & Báo cáo', desc: 'Giao hàng đúng hẹn tại điểm đến. Báo cáo hoàn tất, hóa đơn và đánh giá chất lượng dịch vụ.', icon: '✅' },
]

const WHY_CHOOSE = [
  { icon: '🌍', title: '120+ Quốc gia', desc: 'Mạng lưới đối tác phủ sóng toàn cầu, kết nối bạn với mọi thị trường.' },
  { icon: '⚡', title: 'Báo giá 2 giờ', desc: 'Nhận báo giá chính xác, cạnh tranh trong vòng 2 giờ làm việc.' },
  { icon: '📡', title: 'Tracking Real-time', desc: 'Theo dõi hàng hóa 24/7 trên mọi phương thức vận tải.' },
  { icon: '🤝', title: 'Đội ngũ chuyên gia', desc: 'Nhân sự kinh nghiệm 10+ năm trong logistics và supply chain.' },
  { icon: '💰', title: 'Giá cạnh tranh', desc: 'Tận dụng volume và đàm phán với hãng tàu/bay để có giá tốt nhất.' },
  { icon: '🔒', title: 'Bảo hiểm toàn trình', desc: 'Hàng hóa được bảo hiểm 100% giá trị trên toàn bộ hành trình vận chuyển.' },
]

/* ═══════════════════════════════════════ CSS ═══════════════════════════════════════ */
const css = `
  /* ── Reveal ── */
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rv.fl{transform:translateX(-48px) translateY(0)}
  .rv.fr{transform:translateX(48px) translateY(0)}
  .rv.su{transform:scale(.93) translateY(18px)}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}.rv.d5{transition-delay:.5s}.rv.d6{transition-delay:.6s}

  .sv-page{font-family:'Inter',sans-serif;color:#1a2744}

  /* ── Hero ── */
  .sv-hero{
    position:relative;min-height:480px;display:flex;align-items:center;
    background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);
    color:#fff;overflow:hidden;
  }
  .sv-hero::before{
    content:'';position:absolute;top:-30%;right:-10%;width:600px;height:600px;
    background:radial-gradient(circle,rgba(243,108,31,.12) 0%,transparent 70%);
    border-radius:50%;
  }
  .sv-hero::after{
    content:'';position:absolute;bottom:-40%;left:-5%;width:500px;height:500px;
    background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%);
    border-radius:50%;
  }
  .sv-hero-inner{position:relative;z-index:1;max-width:900px;margin:0 auto;text-align:center;padding:80px 28px}
  .sv-hero .kicker{
    display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;
    border:1px solid rgba(243,108,31,.4);padding:5px 16px;border-radius:20px;margin-bottom:18px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .sv-hero h1{font-size:48px;font-weight:800;margin:0 0 16px;line-height:1.1;font-family:'Be Vietnam Pro',sans-serif}
  .sv-hero h1 .hl{color:#f36c1f}
  .sv-hero p{font-size:16px;color:rgba(255,255,255,.78);max-width:640px;margin:0 auto 32px;line-height:1.65}
  .sv-hero-badges{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .sv-badge{
    background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
    padding:8px 18px;border-radius:30px;font-size:13px;font-weight:600;
    color:rgba(255,255,255,.9);
  }

  /* ── Section ── */
  .sv-section{padding:80px 24px}
  .sv-section-alt{background:#f5f8fb}
  .sv-section-dark{background:#0a1e3d;color:#fff}
  .sv-section-hdr{text-align:center;max-width:680px;margin:0 auto 52px}
  .sv-section-hdr .kicker{color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;margin-bottom:8px;font-family:'Be Vietnam Pro',sans-serif}
  .sv-section-hdr h2{font-size:36px;color:#0f2b57;margin:0 0 14px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .sv-section-dark .sv-section-hdr h2{color:#fff}
  .sv-section-hdr p{color:#5a6f82;font-size:15px;line-height:1.65}
  .sv-section-dark .sv-section-hdr p{color:rgba(255,255,255,.7)}

  /* ── Service cards grid ── */
  .sv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:1200px;margin:0 auto}
  .sv-card{
    position:relative;background:#fff;border-radius:18px;overflow:hidden;
    box-shadow:0 8px 32px rgba(10,20,40,.06);
    transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s;
    display:flex;flex-direction:column;
  }
  .sv-card:hover{transform:translateY(-10px);box-shadow:0 20px 56px rgba(10,20,40,.14)}

  .sv-card-img{position:relative;height:200px;overflow:hidden}
  .sv-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
  .sv-card:hover .sv-card-img img{transform:scale(1.08)}
  .sv-card-overlay{
    position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55) 100%);
    display:flex;align-items:flex-end;padding:20px;
  }
  .sv-card-icon{
    width:52px;height:52px;border-radius:14px;
    display:flex;align-items:center;justify-content:center;
    font-size:24px;color:#fff;
    box-shadow:0 4px 16px rgba(0,0,0,.2);
    position:absolute;top:16px;right:16px;
  }
  .sv-card-overlay h3{margin:0;color:#fff;font-size:22px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif;text-shadow:0 2px 8px rgba(0,0,0,.3)}
  .sv-card-overlay .sv-sub{display:block;color:rgba(255,255,255,.8);font-size:12px;letter-spacing:1.5px;font-weight:600;margin-top:4px}

  .sv-card-body{padding:24px;flex:1;display:flex;flex-direction:column}
  .sv-card-body p{color:#5a6f82;font-size:14px;line-height:1.65;margin:0 0 18px}

  .sv-features{list-style:none;padding:0;margin:0 0 20px;flex:1}
  .sv-features li{
    padding:6px 0;font-size:13px;color:#3a4f65;
    display:flex;align-items:center;gap:8px;
  }
  .sv-features li::before{content:'✓';color:#f36c1f;font-weight:700;font-size:12px;flex-shrink:0}

  .sv-card-stats{
    display:flex;gap:1px;background:#f0f4f8;border-radius:10px;overflow:hidden;margin-bottom:16px;
  }
  .sv-card-stat{
    flex:1;text-align:center;padding:10px 6px;background:#fff;
  }
  .sv-card-stat:first-child{border-radius:10px 0 0 10px}
  .sv-card-stat:last-child{border-radius:0 10px 10px 0}
  .sv-card-stat strong{display:block;font-size:13px;color:#0f2b57;font-weight:700}
  .sv-card-stat span{font-size:11px;color:#8a9bb0}

  .sv-card-link{
    display:flex;align-items:center;justify-content:center;gap:8px;
    padding:13px;border-radius:10px;font-weight:700;font-size:14px;
    text-decoration:none;color:#fff;
    transition:all .25s;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .sv-card-link:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.2)}
  .sv-card-link .arrow{transition:transform .2s}
  .sv-card-link:hover .arrow{transform:translateX(4px)}

  /* ── Process ── */
  .sv-process{display:flex;gap:0;max-width:1200px;margin:0 auto;position:relative}
  .sv-process::before{
    content:'';position:absolute;top:46px;left:80px;right:80px;height:3px;
    background:linear-gradient(90deg,#f36c1f,#0f2b57);z-index:0;border-radius:3px;
  }
  .sv-step{flex:1;text-align:center;position:relative;z-index:1;padding:0 16px}
  .sv-step-icon{
    width:56px;height:56px;border-radius:50%;
    background:linear-gradient(135deg,#f36c1f,#e05a10);
    color:#fff;font-size:22px;
    display:flex;align-items:center;justify-content:center;
    margin:16px auto;
    box-shadow:0 6px 20px rgba(243,108,31,.3);
  }
  .sv-step h4{color:#0f2b57;margin:14px 0 6px;font-size:15px;font-family:'Be Vietnam Pro',sans-serif}
  .sv-step p{color:#5a6f82;font-size:13px;line-height:1.55;margin:0}

  /* ── Why choose ── */
  .sv-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto}
  .sv-why-card{
    text-align:center;padding:36px 24px;border-radius:16px;
    background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
    transition:background .3s,transform .3s,border-color .3s;
  }
  .sv-why-card:hover{background:rgba(255,255,255,.1);transform:translateY(-5px);border-color:rgba(243,108,31,.2)}
  .sv-why-icon{
    width:64px;height:64px;border-radius:50%;margin:0 auto 16px;
    display:flex;align-items:center;justify-content:center;
    background:rgba(243,108,31,.12);font-size:28px;
  }
  .sv-why-card h4{margin:0 0 8px;color:#fff;font-size:16px;font-family:'Be Vietnam Pro',sans-serif}
  .sv-why-card p{margin:0;color:rgba(255,255,255,.65);font-size:13px;line-height:1.6}

  /* ── CTA banner ── */
  .sv-cta{
    position:relative;padding:80px 24px;text-align:center;overflow:hidden;
    background:linear-gradient(135deg,#f36c1f 0%,#e05a10 50%,#c94d0e 100%);color:#fff;
  }
  .sv-cta h2{font-size:36px;margin:0 0 14px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .sv-cta p{font-size:16px;opacity:.92;max-width:580px;margin:0 auto 32px}
  .sv-cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
  .sv-cta-btns a{padding:15px 32px;border-radius:8px;font-weight:700;text-decoration:none;transition:all .25s;font-size:15px}
  .sv-cta-btns .cta-w{background:#fff;color:#0f2b57}
  .sv-cta-btns .cta-w:hover{background:#f0f4f8}
  .sv-cta-btns .cta-o{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.5)}
  .sv-cta-btns .cta-o:hover{border-color:#fff;background:rgba(255,255,255,.1)}

  /* ── Responsive ── */
  @media(max-width:1024px){
    .sv-grid{grid-template-columns:repeat(2,1fr)}
    .sv-why-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .sv-hero h1{font-size:32px}
    .sv-hero-inner{padding:48px 20px}
    .sv-grid{grid-template-columns:1fr}
    .sv-process{flex-direction:column;gap:28px}
    .sv-process::before{display:none}
    .sv-why-grid{grid-template-columns:1fr}
    .sv-section{padding:52px 20px}
  }
`

/* ═══════════════════════════ Component ═══════════════════════════ */
export default function Services() {
  const pageRef = useScrollReveal()

  return (
    <div className="sv-page" ref={pageRef}>
      <style>{css}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="sv-hero">
        <div className="sv-hero-inner">
          <div className="kicker rv">STELLA SHIPPING</div>
          <h1 className="rv d1">Giải pháp <span className="hl">Logistics</span> toàn diện cho doanh nghiệp</h1>
          <p className="rv d2">
            Từ vận tải biển, hàng không, đa phương thức đến kho bãi, hải quan và tư vấn supply chain — chúng tôi cung cấp mọi dịch vụ bạn cần cho chuỗi cung ứng hiệu quả.
          </p>
          <div className="sv-hero-badges rv d3">
            <span className="sv-badge">🌍 120+ Quốc gia</span>
            <span className="sv-badge">🚢 50+ Hãng tàu</span>
            <span className="sv-badge">✈️ 80+ Sân bay</span>
            <span className="sv-badge">⚡ Báo giá 2 giờ</span>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN SERVICES ═══════ */}
      <section className="sv-section">
        <div className="sv-section-hdr rv">
          <div className="kicker">DỊCH VỤ CỦA CHÚNG TÔI</div>
          <h2>6 nhóm dịch vụ cốt lõi</h2>
          <p>Mỗi giải pháp được thiết kế riêng để đáp ứng nhu cầu đa dạng của doanh nghiệp trong chuỗi cung ứng toàn cầu.</p>
        </div>

        <div className="sv-grid">
          {SERVICES.map((svc, i) => (
            <div className={`sv-card rv d${i + 1}`} key={svc.title}>
              <div className="sv-card-img">
                <img src={svc.img} alt={svc.title} />
                <div className="sv-card-overlay">
                  <div>
                    <h3>{svc.title}</h3>
                    <span className="sv-sub">{svc.subtitle}</span>
                  </div>
                </div>
                <div className="sv-card-icon" style={{ background: `linear-gradient(135deg, ${svc.color}, ${svc.accent})` }}>
                  {svc.icon}
                </div>
              </div>

              <div className="sv-card-body">
                <p>{svc.desc}</p>

                <ul className="sv-features">
                  {svc.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div className="sv-card-stats">
                  <div className="sv-card-stat">
                    <strong>{svc.stats.routes}</strong>
                    <span>Phạm vi</span>
                  </div>
                  <div className="sv-card-stat">
                    <strong>{svc.stats.carriers}</strong>
                    <span>Đối tác</span>
                  </div>
                  <div className="sv-card-stat">
                    <strong>{svc.stats.delivery}</strong>
                    <span>Hiệu suất</span>
                  </div>
                </div>

                <Link to={svc.link} className="sv-card-link" style={{ background: `linear-gradient(135deg, ${svc.color}, ${svc.accent})` }}>
                  Xem chi tiết <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ QUY TRÌNH ═══════ */}
      <section className="sv-section sv-section-alt">
        <div className="sv-section-hdr rv">
          <div className="kicker">QUY TRÌNH LÀM VIỆC</div>
          <h2>4 bước đơn giản để bắt đầu</h2>
          <p>Quy trình minh bạch, rõ ràng — bạn chỉ cần liên hệ, mọi việc còn lại để Stella Shipping lo.</p>
        </div>

        <div className="sv-process">
          {PROCESS_STEPS.map((step, i) => (
            <div className={`sv-step rv d${i + 1}`} key={step.num}>
              <div className="sv-step-icon">{step.icon}</div>
              <h4>{step.num}. {step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ WHY CHOOSE US ═══════ */}
      <section className="sv-section sv-section-dark">
        <div className="sv-section-hdr rv">
          <div className="kicker">TẠI SAO CHỌN CHÚNG TÔI</div>
          <h2>Cam kết đồng hành cùng doanh nghiệp</h2>
          <p>Hơn 10 năm kinh nghiệm, chúng tôi hiểu rằng logistics không chỉ là vận chuyển — mà là xây dựng niềm tin.</p>
        </div>

        <div className="sv-why-grid">
          {WHY_CHOOSE.map((item, i) => (
            <div className={`sv-why-card rv d${i + 1}`} key={item.title}>
              <div className="sv-why-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="sv-cta">
        <h2 className="rv">Bạn cần giải pháp logistics?</h2>
        <p className="rv d1">Liên hệ ngay để nhận tư vấn miễn phí và báo giá cạnh tranh nhất trong vòng 2 giờ.</p>
        <div className="sv-cta-btns rv d2">
          <Link to="/contact" className="cta-w">📋 Yêu cầu báo giá</Link>
          <Link to="/pricing" className="cta-o">💰 Xem bảng giá</Link>
        </div>
      </section>
    </div>
  )
}
