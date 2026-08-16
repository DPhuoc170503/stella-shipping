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
  { icon: '🏭', title: 'Kho hàng khô (Dry Storage)', desc: 'Hệ thống kho khô 15.000m² tại TP.HCM và Hà Nội. Kiểm soát độ ẩm, an ninh 24/7 với CCTV và bảo vệ chuyên nghiệp. Phù hợp hàng tiêu dùng, nguyên liệu, máy móc.', specs: 'Diện tích: 15.000m² · Pallet: 20.000+' },
  { icon: '❄️', title: 'Kho lạnh (Cold Storage)', desc: 'Kho đông lạnh -25°C đến +8°C với hệ thống IoT giám sát nhiệt độ real-time. Đạt chuẩn HACCP cho thực phẩm và GDP cho dược phẩm.', specs: 'Nhiệt độ: -25°C → +8°C · Chuẩn HACCP' },
  { icon: '🔄', title: 'Cross-docking', desc: 'Tiếp nhận hàng từ tàu/xe → phân loại → chuyển tiếp trong ngày mà không cần lưu kho. Giảm 50% thời gian xử lý và chi phí lưu trữ.', specs: 'Xử lý: 500+ tấn/ngày · Dock: 12 cửa' },
  { icon: '📦', title: 'Pick & Pack', desc: 'Dịch vụ đóng gói, dán nhãn, đóng thùng theo yêu cầu. Tích hợp hệ thống WMS quét mã vạch/QR code. Lý tưởng cho thương mại điện tử.', specs: 'Xử lý: 5.000 đơn/ngày · Tỷ lệ chính xác: 99.8%' },
  { icon: '🚚', title: 'Last-mile Delivery', desc: 'Giao hàng chặng cuối nội thành và liên tỉnh. Đội xe 50+ chiếc (bao gồm xe điện). Tracking GPS real-time cho từng đơn hàng.', specs: 'Xe: 50+ · Phủ sóng: 63 tỉnh thành' },
  { icon: '📊', title: 'Quản lý tồn kho (WMS)', desc: 'Hệ thống WMS hiện đại tích hợp API với ERP khách hàng. Báo cáo tồn kho real-time, cảnh báo hết hàng tự động, FIFO/LIFO/FEFO.', specs: 'API: REST/SOAP · Báo cáo: Real-time' },
]

const PROCESS = [
  { step: '01', title: 'Nhận hàng (Inbound)', desc: 'Tiếp nhận hàng từ container/xe tải. Kiểm tra số lượng, chất lượng. Scan mã vạch nhập kho.' },
  { step: '02', title: 'Lưu trữ (Storage)', desc: 'Phân bổ vị trí kho tối ưu theo loại hàng. Quản lý bằng hệ thống WMS.' },
  { step: '03', title: 'Xử lý đơn (Processing)', desc: 'Pick & pack theo đơn hàng. Dán nhãn, đóng gói, kiểm tra chất lượng trước khi xuất.' },
  { step: '04', title: 'Xuất hàng (Outbound)', desc: 'Phân tuyến giao hàng tối ưu. Load xe và dispatch. Tracking GPS real-time.' },
  { step: '05', title: 'Báo cáo (Reporting)', desc: 'Báo cáo xuất nhập tồn hàng ngày. KPIs hiệu suất kho. Đề xuất tối ưu hóa.' },
]

const INDUSTRIES = [
  { icon: '🛒', title: 'Thương mại điện tử', desc: 'Fulfillment center cho Shopee, Lazada, TikTok Shop. Xử lý đơn hàng lẻ số lượng lớn.' },
  { icon: '🥫', title: 'Thực phẩm & Đồ uống', desc: 'Kho lạnh đạt chuẩn HACCP. Quản lý hạn sử dụng FEFO. Vận chuyển cold chain.' },
  { icon: '💊', title: 'Dược phẩm', desc: 'Kho GDP certified. Kiểm soát nhiệt độ 2–8°C. Truy xuất nguồn gốc đầy đủ.' },
  { icon: '🔧', title: 'Sản xuất & Công nghiệp', desc: 'Quản lý linh kiện JIT (Just-in-Time). Kho nguyên vật liệu gần KCN.' },
  { icon: '👗', title: 'Thời trang & Bán lẻ', desc: 'Xử lý hàng theo mùa, quản lý SKU phức tạp. Dịch vụ treo móc, ủi hơi.' },
  { icon: '📱', title: 'Công nghệ & Điện tử', desc: 'Kho ESD-safe cho linh kiện nhạy cảm. Bảo hiểm giá trị cao. Kiểm soát truy cập.' },
]

export default function Logistics() {
  const pageRef = useRef(null)
  useReveal(pageRef)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      <section className="lg-hero">
        <div className="lg-hero-overlay" />
        <div className="lg-hero-inner">
          <Link to="/services" className="lg-back rv">← Quay lại Dịch vụ</Link>
          <div className="lg-badge rv">WAREHOUSING & DISTRIBUTION</div>
          <h1 className="rv d1">Kho bãi &<br /><span>Phân phối</span></h1>
          <p className="rv d2">Hệ thống kho hiện đại 15.000m² với WMS tiên tiến. Cross-docking, pick-pack, quản lý tồn kho và dịch vụ last-mile delivery phủ sóng 63 tỉnh thành.</p>
          <div className="lg-hero-stats rv d3">
            <div><strong>15.000m²</strong><span>Diện tích kho</span></div>
            <div><strong>20.000+</strong><span>Vị trí pallet</span></div>
            <div><strong>99.8%</strong><span>Tỷ lệ chính xác</span></div>
            <div><strong>63</strong><span>Tỉnh thành phủ sóng</span></div>
          </div>
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-hdr rv"><div className="kicker">DỊCH VỤ KHO BÃI</div><h2>Giải pháp lưu trữ và phân phối toàn diện</h2></div>
        <div className="lg-svc-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className={`lg-svc-card rv d${(i % 4) + 1}`}>
              <div className="lg-svc-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="lg-svc-specs">{s.specs}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="lg-section lg-section-alt">
        <div className="lg-hdr rv"><div className="kicker">QUY TRÌNH VẬN HÀNH</div><h2>Quy trình kho bãi chuyên nghiệp</h2></div>
        <div className="lg-steps">
          {PROCESS.map((s, i) => (
            <div key={i} className={`lg-step rv d${i + 1}`}>
              <div className="lg-step-num">{s.step}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-hdr rv"><div className="kicker">NGÀNH HÀNG PHỤC VỤ</div><h2>Chuyên biệt theo từng ngành</h2></div>
        <div className="lg-ind-grid">
          {INDUSTRIES.map((ind, i) => (
            <div key={i} className={`lg-ind-card rv d${(i % 4) + 1}`}>
              <div className="lg-ind-icon">{ind.icon}</div>
              <h4>{ind.title}</h4>
              <p>{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lg-cta rv">
        <h2>Cần giải pháp kho bãi và phân phối?</h2>
        <p>Liên hệ ngay để được tư vấn giải pháp lưu trữ phù hợp cho ngành hàng của bạn.</p>
        <div className="lg-cta-btns">
          <Link to="/contact" className="btn btn-primary">Liên hệ tư vấn</Link>
          <Link to="/pricing" className="lg-cta-ghost">Xem bảng giá →</Link>
        </div>
      </section>
    </div>
  )
}

const css = `
  .lg-hero{position:relative;min-height:480px;display:flex;align-items:center;color:#fff;overflow:hidden;margin:-24px -24px 0 -24px}
  .lg-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,43,87,.92),rgba(21,52,104,.85)),url('/Logictis.jpg') center/cover;z-index:1}
  .lg-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 32px;width:100%}
  .lg-back{color:rgba(255,255,255,.6);text-decoration:none;font-size:14px;display:inline-block;margin-bottom:24px;transition:color .2s}.lg-back:hover{color:#fff}
  .lg-badge{display:inline-block;background:#f36c1f;padding:6px 16px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:20px}
  .lg-hero h1{font-size:52px;margin:0 0 20px;line-height:1.15;font-weight:800}.lg-hero h1 span{color:#f36c1f}
  .lg-hero p{max-width:640px;color:rgba(255,255,255,.8);font-size:17px;line-height:1.7;margin-bottom:36px}
  .lg-hero-stats{display:flex;gap:40px;flex-wrap:wrap}
  .lg-hero-stats>div{text-align:center}
  .lg-hero-stats strong{display:block;font-size:36px;font-weight:800;color:#f36c1f}
  .lg-hero-stats span{font-size:13px;color:rgba(255,255,255,.7)}

  .lg-section{padding:72px 24px;max-width:1200px;margin:0 auto}
  .lg-section-alt{background:#f7f9fb;max-width:100%;padding-left:calc((100% - 1200px)/2 + 24px);padding-right:calc((100% - 1200px)/2 + 24px)}
  .lg-hdr{text-align:center;margin-bottom:48px}
  .lg-hdr .kicker{color:#f36c1f;font-size:12px;font-weight:700;letter-spacing:3px;margin-bottom:10px}
  .lg-hdr h2{font-size:34px;color:#0f2b57;font-weight:800;margin:0}

  .lg-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .lg-svc-card{background:#fff;padding:28px;border-radius:14px;box-shadow:0 6px 24px rgba(10,20,40,.05);transition:transform .3s,box-shadow .3s}
  .lg-svc-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(10,20,40,.1)}
  .lg-svc-icon{font-size:36px;margin-bottom:14px}
  .lg-svc-card h4{color:#0f2b57;font-size:17px;margin:0 0 10px;font-weight:700}
  .lg-svc-card p{color:#5a6f82;font-size:14px;line-height:1.6;margin:0 0 14px}
  .lg-svc-specs{font-size:12px;color:#f36c1f;font-weight:600;padding:8px 12px;background:#fff5f0;border-radius:6px}

  .lg-steps{display:flex;gap:20px}
  .lg-step{flex:1;background:#fff;padding:28px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);text-align:center;transition:transform .3s}
  .lg-step:hover{transform:translateY(-4px)}
  .lg-step-num{display:inline-flex;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#0f2b57,#1a4a8a);color:#fff;font-size:18px;font-weight:800;align-items:center;justify-content:center;margin-bottom:16px}
  .lg-step h4{color:#0f2b57;margin:0 0 8px;font-size:15px;font-weight:700}
  .lg-step p{color:#5a6f82;font-size:13.5px;line-height:1.55;margin:0}

  .lg-ind-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .lg-ind-card{background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);text-align:center;transition:transform .3s}
  .lg-ind-card:hover{transform:translateY(-4px)}
  .lg-ind-icon{font-size:36px;margin-bottom:12px}
  .lg-ind-card h4{color:#0f2b57;margin:0 0 8px;font-weight:700}
  .lg-ind-card p{color:#5a6f82;font-size:13.5px;line-height:1.55;margin:0}

  .lg-cta{text-align:center;padding:72px 24px;background:linear-gradient(135deg,#0f2b57,#153468);color:#fff;margin:0 -24px -24px -24px}
  .lg-cta h2{font-size:34px;margin:0 0 14px;font-weight:800}
  .lg-cta p{color:rgba(255,255,255,.75);font-size:16px;margin-bottom:32px}
  .lg-cta-btns{display:flex;gap:16px;justify-content:center;align-items:center}
  .lg-cta-ghost{color:rgba(255,255,255,.8);text-decoration:none;font-weight:600;transition:color .2s}.lg-cta-ghost:hover{color:#fff}

  .rv{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}.rvd{opacity:1;transform:translateY(0)}
  .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}

  @media(max-width:900px){.lg-hero h1{font-size:34px}.lg-svc-grid,.lg-ind-grid{grid-template-columns:1fr 1fr}.lg-steps{flex-direction:column}}
  @media(max-width:600px){.lg-svc-grid,.lg-ind-grid{grid-template-columns:1fr}.lg-hero-stats{flex-direction:column;gap:12px}}
`
