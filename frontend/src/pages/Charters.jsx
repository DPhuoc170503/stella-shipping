import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rvd'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    ref.current.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ref])
}

const SERVICES = [
  { icon: '🔍', title: 'Phân tích & Đánh giá chuỗi cung ứng', desc: 'Khảo sát toàn diện supply chain hiện tại: chi phí, thời gian, rủi ro, bottleneck. So sánh benchmark với ngành để xác định cơ hội cải thiện.', result: 'Giảm 15–30% chi phí logistics' },
  { icon: '🗺️', title: 'Thiết kế mạng lưới phân phối', desc: 'Xác định vị trí kho tối ưu, tuyến vận chuyển hiệu quả, mô hình hub-and-spoke phù hợp nhất cho thị trường mục tiêu.', result: 'Tối ưu network coverage' },
  { icon: '📈', title: 'Dự báo & Lập kế hoạch nhu cầu', desc: 'Ứng dụng AI/ML phân tích dữ liệu lịch sử, mùa vụ, xu hướng thị trường để dự báo demand chính xác. Giảm tồn kho thừa và hết hàng.', result: 'Chính xác dự báo 85%+' },
  { icon: '🔄', title: 'Tối ưu hóa quy trình (Process Optimization)', desc: 'Tái cấu trúc quy trình procurement, production planning, order fulfillment. Áp dụng Lean/Six Sigma cho logistics operations.', result: 'Giảm 40% lead time' },
  { icon: '💻', title: 'Chuyển đổi số SCM', desc: 'Tư vấn triển khai TMS, WMS, ERP integration. Xây dựng control tower và dashboard KPIs cho supply chain visibility.', result: 'Real-time visibility 100%' },
  { icon: '🌿', title: 'Supply Chain bền vững (Green SCM)', desc: 'Thiết kế chiến lược logistics xanh: giảm carbon footprint, bao bì tái chế, tối ưu tuyến đường giảm phát thải. Tuân thủ EU ETS.', result: 'Giảm 30% CO2 emissions' },
]

const INDUSTRIES = [
  { icon: '🏭', name: 'Sản xuất', clients: 'Nhà máy FDI, KCN', focus: 'JIT delivery, raw material planning, production logistics' },
  { icon: '🛒', name: 'Bán lẻ & FMCG', clients: 'Chuỗi siêu thị, đại lý', focus: 'Demand forecasting, multi-channel fulfillment, promotions planning' },
  { icon: '📱', name: 'Công nghệ', clients: 'OEM, ODM điện tử', focus: 'Component sourcing, reverse logistics, global procurement' },
  { icon: '🥫', name: 'F&B & Nông sản', clients: 'Xuất khẩu nông sản', focus: 'Cold chain design, shelf-life optimization, traceability' },
  { icon: '👗', name: 'Thời trang', clients: 'Brands, OEM may mặc', focus: 'Seasonal planning, fast fashion logistics, returns management' },
  { icon: '💊', name: 'Dược & Y tế', clients: 'Nhà phân phối dược', focus: 'GDP compliance, temperature mapping, batch tracking' },
]

const PROCESS = [
  { phase: 'Phase 1', title: 'Discovery & Assessment', duration: '2–3 tuần', desc: 'Khảo sát hiện trạng, phỏng vấn stakeholders, thu thập dữ liệu vận hành.' },
  { phase: 'Phase 2', title: 'Analysis & Benchmarking', duration: '2–4 tuần', desc: 'Phân tích data, so sánh benchmark ngành, xác định pain points và cơ hội.' },
  { phase: 'Phase 3', title: 'Solution Design', duration: '2–3 tuần', desc: 'Thiết kế giải pháp tối ưu, mô phỏng kịch bản, tính toán ROI.' },
  { phase: 'Phase 4', title: 'Implementation', duration: '4–12 tuần', desc: 'Triển khai theo roadmap, đào tạo nhân sự, go-live và stabilization.' },
  { phase: 'Phase 5', title: 'Monitoring & Optimization', duration: 'Liên tục', desc: 'Theo dõi KPIs, điều chỉnh liên tục, báo cáo kết quả định kỳ.' },
]

export default function Charters() {
  const pageRef = useRef(null)
  useReveal(pageRef)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      <section className="ch-hero">
        <div className="ch-hero-overlay" />
        <div className="ch-hero-inner">
          <Link to="/services" className="ch-back rv">← Quay lại Dịch vụ</Link>
          <div className="ch-badge rv">SUPPLY CHAIN CONSULTING</div>
          <h1 className="rv d1">Tư vấn<br /><span>Chuỗi cung ứng</span></h1>
          <p className="rv d2">Phân tích và tối ưu toàn bộ supply chain: lộ trình, chi phí, rủi ro. Thiết kế giải pháp SCM tùy chỉnh cho từng ngành hàng với đội ngũ chuyên gia 10+ năm kinh nghiệm.</p>
          <div className="ch-hero-stats rv d3">
            <div><strong>10+</strong><span>Năm kinh nghiệm</span></div>
            <div><strong>200+</strong><span>Dự án hoàn thành</span></div>
            <div><strong>15–30%</strong><span>Tiết kiệm chi phí</span></div>
            <div><strong>50+</strong><span>Khách hàng FDI</span></div>
          </div>
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-hdr rv"><div className="kicker">DỊCH VỤ TƯ VẤN</div><h2>Giải pháp tối ưu chuỗi cung ứng</h2></div>
        <div className="ch-svc-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`ch-svc-card rv d${(i % 4) + 1}`}>
              <div className="ch-svc-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="ch-result">🎯 {s.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-section ch-section-alt">
        <div className="ch-hdr rv"><div className="kicker">NGÀNH HÀNG CHUYÊN SÂU</div><h2>Kinh nghiệm đa ngành</h2></div>
        <div className="ch-ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <div key={i} className={`ch-ind-card rv d${(i % 4) + 1}`}>
              <div className="ch-ind-icon">{ind.icon}</div>
              <h4>{ind.name}</h4>
              <div className="ch-ind-clients">{ind.clients}</div>
              <p>{ind.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-section">
        <div className="ch-hdr rv"><div className="kicker">PHƯƠNG PHÁP LUẬN</div><h2>Quy trình tư vấn 5 giai đoạn</h2></div>
        <div className="ch-timeline">
          {PROCESS.map((p, i) => (
            <div key={i} className={`ch-tl-item rv d${i + 1}`}>
              <div className="ch-tl-phase">{p.phase}</div>
              <div className="ch-tl-body">
                <h4>{p.title}</h4>
                <div className="ch-tl-dur">⏱️ {p.duration}</div>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ch-cta rv">
        <h2>Muốn tối ưu chuỗi cung ứng?</h2>
        <p>Đặt lịch tư vấn miễn phí 30 phút với chuyên gia SCM của chúng tôi.</p>
        <div className="ch-cta-btns">
          <Link to="/contact" className="btn btn-primary">Đặt lịch tư vấn miễn phí</Link>
          <Link to="/pricing" className="ch-cta-ghost">Xem bảng giá →</Link>
        </div>
      </section>
    </div>
  )
}

const css = `
  .ch-hero{position:relative;min-height:480px;display:flex;align-items:center;color:#fff;overflow:hidden;margin:-24px -24px 0 -24px}
  .ch-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,43,87,.92),rgba(21,52,104,.85)),url('/Chacracter.jpg') center/cover;z-index:1}
  .ch-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 32px;width:100%}
  .ch-back{color:rgba(255,255,255,.6);text-decoration:none;font-size:14px;display:inline-block;margin-bottom:24px;transition:color .2s}.ch-back:hover{color:#fff}
  .ch-badge{display:inline-block;background:#f36c1f;padding:6px 16px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:20px}
  .ch-hero h1{font-size:52px;margin:0 0 20px;line-height:1.15;font-weight:800}.ch-hero h1 span{color:#f36c1f}
  .ch-hero p{max-width:640px;color:rgba(255,255,255,.8);font-size:17px;line-height:1.7;margin-bottom:36px}
  .ch-hero-stats{display:flex;gap:40px;flex-wrap:wrap}
  .ch-hero-stats>div{text-align:center}
  .ch-hero-stats strong{display:block;font-size:36px;font-weight:800;color:#f36c1f}
  .ch-hero-stats span{font-size:13px;color:rgba(255,255,255,.7)}

  .ch-section{padding:72px 24px;max-width:1200px;margin:0 auto}
  .ch-section-alt{background:#f7f9fb;max-width:100%;padding-left:calc((100% - 1200px)/2 + 24px);padding-right:calc((100% - 1200px)/2 + 24px)}
  .ch-hdr{text-align:center;margin-bottom:48px}
  .ch-hdr .kicker{color:#f36c1f;font-size:12px;font-weight:700;letter-spacing:3px;margin-bottom:10px}
  .ch-hdr h2{font-size:34px;color:#0f2b57;font-weight:800;margin:0}

  .ch-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .ch-svc-card{background:#fff;padding:28px;border-radius:14px;box-shadow:0 6px 24px rgba(10,20,40,.05);transition:transform .3s,box-shadow .3s}
  .ch-svc-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(10,20,40,.1)}
  .ch-svc-icon{font-size:36px;margin-bottom:14px}
  .ch-svc-card h4{color:#0f2b57;font-size:17px;margin:0 0 10px;font-weight:700}
  .ch-svc-card p{color:#5a6f82;font-size:14px;line-height:1.6;margin:0 0 14px}
  .ch-result{font-size:12px;color:#f36c1f;font-weight:700;padding:8px 12px;background:#fff5f0;border-radius:6px;display:inline-block}

  .ch-ind-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .ch-ind-card{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);text-align:center;transition:transform .3s}
  .ch-ind-card:hover{transform:translateY(-4px)}
  .ch-ind-icon{font-size:40px;margin-bottom:10px}
  .ch-ind-card h4{color:#0f2b57;margin:0 0 4px;font-weight:700;font-size:16px}
  .ch-ind-clients{color:#f36c1f;font-size:12px;font-weight:600;margin-bottom:10px}
  .ch-ind-card p{color:#5a6f82;font-size:13px;line-height:1.5;margin:0}

  .ch-timeline{max-width:800px;margin:0 auto;position:relative}
  .ch-timeline::before{content:'';position:absolute;left:60px;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#f36c1f,#0f2b57)}
  .ch-tl-item{display:flex;gap:24px;margin-bottom:36px;position:relative}
  .ch-tl-phase{width:120px;text-align:right;font-size:13px;font-weight:700;color:#f36c1f;padding-top:4px;flex-shrink:0}
  .ch-tl-body{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);flex:1}
  .ch-tl-body h4{color:#0f2b57;margin:0 0 6px;font-weight:700}
  .ch-tl-dur{color:#f36c1f;font-size:13px;font-weight:600;margin-bottom:8px}
  .ch-tl-body p{color:#5a6f82;font-size:14px;line-height:1.55;margin:0}

  .ch-cta{text-align:center;padding:72px 24px;background:linear-gradient(135deg,#0f2b57,#153468);color:#fff;margin:0 -24px -24px -24px}
  .ch-cta h2{font-size:34px;margin:0 0 14px;font-weight:800}
  .ch-cta p{color:rgba(255,255,255,.75);font-size:16px;margin-bottom:32px}
  .ch-cta-btns{display:flex;gap:16px;justify-content:center;align-items:center}
  .ch-cta-ghost{color:rgba(255,255,255,.8);text-decoration:none;font-weight:600;transition:color .2s}.ch-cta-ghost:hover{color:#fff}

  .rv{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.rvd{opacity:1;transform:translateY(0)}
  .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}

  @media(max-width:900px){.ch-hero h1{font-size:34px}.ch-svc-grid,.ch-ind-grid{grid-template-columns:1fr 1fr}.ch-timeline::before{left:20px}.ch-tl-phase{width:40px;font-size:11px}}
  @media(max-width:600px){.ch-svc-grid,.ch-ind-grid{grid-template-columns:1fr}.ch-hero-stats{flex-direction:column;gap:12px}}
`
