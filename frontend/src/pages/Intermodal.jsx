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

const MODES = [
  { icon: '🚢', title: 'Đường biển + Đường bộ', desc: 'Container từ cảng về kho hoặc nhà máy. Drayage nội địa kết hợp FCL/LCL quốc tế. Tối ưu cho hàng xuất nhập khẩu lượng lớn.', transit: '3–35 ngày', cost: '💰💰' },
  { icon: '✈️', title: 'Hàng không + Đường bộ', desc: 'Giao hàng khẩn cấp door-to-door. Kết hợp air freight quốc tế với xe tải nội địa. Lý tưởng cho hàng giá trị cao, linh kiện điện tử.', transit: '2–5 ngày', cost: '💰💰💰💰' },
  { icon: '🚂', title: 'Đường sắt + Đường bộ', desc: 'Tuyến Việt Nam – Trung Quốc – châu Âu qua đường sắt liên vận. Rẻ hơn hàng không 40%, nhanh hơn đường biển 50%. Phù hợp hàng công nghiệp.', transit: '12–18 ngày', cost: '💰💰💰' },
  { icon: '🌊', title: 'Sea-Air (Biển + Không)', desc: 'Kết hợp đường biển chặng dài + hàng không chặng cuối qua hub Singapore/Dubai. Tiết kiệm 30% so với air thuần túy.', transit: '8–14 ngày', cost: '💰💰💰' },
]

const ADVANTAGES = [
  { icon: '📋', title: 'Một hợp đồng duy nhất', desc: 'Chỉ cần ký 1 hợp đồng vận tải. Stella Shipping chịu trách nhiệm toàn bộ chuỗi vận chuyển từ cửa đến cửa.' },
  { icon: '💲', title: 'Tối ưu chi phí 20–40%', desc: 'Kết hợp linh hoạt các phương thức để tìm ra phương án chi phí thấp nhất mà vẫn đảm bảo thời gian.' },
  { icon: '📡', title: 'Tracking xuyên suốt', desc: 'Theo dõi hàng hóa real-time qua tất cả các phương thức trên một nền tảng duy nhất.' },
  { icon: '🛡️', title: 'Bảo hiểm toàn trình', desc: 'Một đơn bảo hiểm bao phủ toàn bộ hành trình, bất kể bao nhiêu phương thức vận tải.' },
  { icon: '📄', title: 'Chứng từ tập trung', desc: 'Một bộ B/L, một đầu mối liên hệ. Giảm 70% thủ tục giấy tờ so với booking riêng lẻ.' },
  { icon: '🌿', title: 'Giảm carbon footprint', desc: 'Tối ưu tuyến đường và phương thức giúp giảm phát thải CO2 lên tới 30% so với vận tải đơn lẻ.' },
]

const ROUTES_DATA = [
  { from: 'TP.HCM', to: 'Côn Minh (TQ)', mode: '🚛+🚂', transit: '5–7 ngày', note: 'Đường bộ → Đường sắt qua Lào Cai' },
  { from: 'Hà Nội', to: 'Trùng Khánh (TQ)', mode: '🚂+🚛', transit: '4–6 ngày', note: 'Đường sắt liên vận Đồng Đăng' },
  { from: 'TP.HCM', to: 'Hamburg (Đức)', mode: '🚢+🚂', transit: '20–25 ngày', note: 'Biển → Rail qua Trung Quốc–Âu' },
  { from: 'TP.HCM', to: 'Dubai (UAE)', mode: '🚢+✈️', transit: '10–14 ngày', note: 'Sea-Air via Singapore hub' },
  { from: 'Hải Phòng', to: 'Moscow (Nga)', mode: '🚂', transit: '15–18 ngày', note: 'Đường sắt xuyên lục địa' },
  { from: 'TP.HCM', to: 'Bangkok (Thái)', mode: '🚛', transit: '2–3 ngày', note: 'Cross-border trucking Mộc Bài' },
]

export default function Intermodal() {
  const pageRef = useRef(null)
  useReveal(pageRef)
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      {/* HERO */}
      <section className="im-hero">
        <div className="im-hero-overlay" />
        <div className="im-hero-inner">
          <Link to="/services" className="im-back rv">← Quay lại Dịch vụ</Link>
          <div className="im-badge rv">INTERMODAL</div>
          <h1 className="rv d1">Vận tải<br /><span>Đa phương thức</span></h1>
          <p className="rv d2">Kết hợp linh hoạt đường biển – đường bộ – đường sắt – hàng không trong một giải pháp tối ưu. Một hợp đồng, một đầu mối, một mức giá.</p>
          <div className="im-hero-stats rv d3">
            <div><strong>4+</strong><span>Phương thức kết hợp</span></div>
            <div><strong>20–40%</strong><span>Tiết kiệm chi phí</span></div>
            <div><strong>15+</strong><span>Tuyến liên vận</span></div>
            <div><strong>1</strong><span>Hợp đồng duy nhất</span></div>
          </div>
        </div>
      </section>

      {/* MODES */}
      <section className="im-section">
        <div className="im-hdr rv"><div className="kicker">PHƯƠNG THỨC KẾT HỢP</div><h2>Linh hoạt theo nhu cầu hàng hóa</h2></div>
        <div className="im-mode-grid">
          {MODES.map((m, i) => (
            <div key={i} className={`im-mode-card rv d${i + 1}`}>
              <div className="im-mode-icon">{m.icon}</div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
              <div className="im-mode-meta">
                <span>⏱️ {m.transit}</span>
                <span>Chi phí: {m.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="im-section im-section-alt">
        <div className="im-hdr rv"><div className="kicker">LỢI THẾ</div><h2>Tại sao chọn vận tải đa phương thức?</h2></div>
        <div className="im-adv-grid">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className={`im-adv-card rv d${(i % 4) + 1}`}>
              <div className="im-adv-icon">{a.icon}</div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROUTES */}
      <section className="im-section">
        <div className="im-hdr rv"><div className="kicker">TUYẾN VẬN CHUYỂN</div><h2>Các tuyến đa phương thức phổ biến</h2></div>
        <div className="im-route-table rv">
          <table>
            <thead><tr><th>ĐIỂM ĐI</th><th>ĐIỂM ĐẾN</th><th>PHƯƠNG THỨC</th><th>TRANSIT</th><th>GHI CHÚ</th><th></th></tr></thead>
            <tbody>
              {ROUTES_DATA.map((r, i) => (
                <tr key={i}>
                  <td><strong>🚩 {r.from}</strong></td>
                  <td><strong>📍 {r.to}</strong></td>
                  <td>{r.mode}</td>
                  <td className="im-transit">{r.transit}</td>
                  <td className="im-note">{r.note}</td>
                  <td><Link to="/pricing" className="im-route-btn">Báo giá</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="im-cta rv">
        <h2>Cần giải pháp vận tải tối ưu chi phí?</h2>
        <p>Đội ngũ chuyên gia sẽ thiết kế phương án đa phương thức phù hợp nhất cho hàng hóa của bạn.</p>
        <div className="im-cta-btns">
          <Link to="/pricing" className="btn btn-primary">Nhận báo giá ngay</Link>
          <Link to="/contact" className="im-cta-ghost">Liên hệ tư vấn →</Link>
        </div>
      </section>
    </div>
  )
}

const css = `
  .im-hero{position:relative;min-height:480px;display:flex;align-items:center;color:#fff;overflow:hidden;margin:-24px -24px 0 -24px}
  .im-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,43,87,.92),rgba(21,52,104,.85)),url('/INTERMODA.jpg') center/cover;z-index:1}
  .im-hero-inner{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:80px 32px;width:100%}
  .im-back{color:rgba(255,255,255,.6);text-decoration:none;font-size:14px;display:inline-block;margin-bottom:24px;transition:color .2s}
  .im-back:hover{color:#fff}
  .im-badge{display:inline-block;background:#f36c1f;padding:6px 16px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:20px}
  .im-hero h1{font-size:52px;margin:0 0 20px;line-height:1.15;font-weight:800}
  .im-hero h1 span{color:#f36c1f}
  .im-hero p{max-width:640px;color:rgba(255,255,255,.8);font-size:17px;line-height:1.7;margin-bottom:36px}
  .im-hero-stats{display:flex;gap:40px;flex-wrap:wrap}
  .im-hero-stats>div{text-align:center}
  .im-hero-stats strong{display:block;font-size:36px;font-weight:800;color:#f36c1f}
  .im-hero-stats span{font-size:13px;color:rgba(255,255,255,.7)}

  .im-section{padding:72px 24px;max-width:1200px;margin:0 auto}
  .im-section-alt{background:#f7f9fb;max-width:100%;padding-left:calc((100% - 1200px)/2 + 24px);padding-right:calc((100% - 1200px)/2 + 24px)}
  .im-hdr{text-align:center;margin-bottom:48px}
  .im-hdr .kicker{color:#f36c1f;font-size:12px;font-weight:700;letter-spacing:3px;margin-bottom:10px}
  .im-hdr h2{font-size:34px;color:#0f2b57;font-weight:800;margin:0}

  .im-mode-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
  .im-mode-card{background:#fff;padding:32px;border-radius:14px;box-shadow:0 6px 24px rgba(10,20,40,.05);transition:transform .3s,box-shadow .3s}
  .im-mode-card:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(10,20,40,.1)}
  .im-mode-icon{font-size:40px;margin-bottom:14px}
  .im-mode-card h4{color:#0f2b57;font-size:18px;margin:0 0 10px;font-weight:700}
  .im-mode-card p{color:#5a6f82;font-size:14.5px;line-height:1.6;margin:0 0 16px}
  .im-mode-meta{display:flex;gap:20px;font-size:13px;color:#f36c1f;font-weight:600}

  .im-adv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .im-adv-card{background:#fff;padding:28px;border-radius:12px;box-shadow:0 4px 20px rgba(10,20,40,.05);text-align:center;transition:transform .3s}
  .im-adv-card:hover{transform:translateY(-4px)}
  .im-adv-icon{font-size:36px;margin-bottom:12px}
  .im-adv-card h4{color:#0f2b57;margin:0 0 8px;font-weight:700}
  .im-adv-card p{color:#5a6f82;font-size:13.5px;line-height:1.55;margin:0}

  .im-route-table{overflow-x:auto}
  .im-route-table table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(10,20,40,.05)}
  .im-route-table thead{background:linear-gradient(135deg,#0f2b57,#153468);color:#fff}
  .im-route-table th{padding:16px 18px;text-align:left;font-size:12px;letter-spacing:1.5px;font-weight:600}
  .im-route-table td{padding:16px 18px;border-bottom:1px solid #f0f2f5;font-size:14px;color:#33475b}
  .im-route-table tr:last-child td{border-bottom:none}
  .im-route-table tr:hover td{background:#f7f9fb}
  .im-transit{color:#f36c1f;font-weight:600}
  .im-note{color:#5a6f82;font-size:13px}
  .im-route-btn{display:inline-block;padding:6px 16px;background:#f36c1f;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;transition:background .2s}
  .im-route-btn:hover{background:#e05a10}

  .im-cta{text-align:center;padding:72px 24px;background:linear-gradient(135deg,#0f2b57,#153468);color:#fff;margin:0 -24px -24px -24px}
  .im-cta h2{font-size:34px;margin:0 0 14px;font-weight:800}
  .im-cta p{color:rgba(255,255,255,.75);font-size:16px;margin-bottom:32px}
  .im-cta-btns{display:flex;gap:16px;justify-content:center;align-items:center}
  .im-cta-ghost{color:rgba(255,255,255,.8);text-decoration:none;font-weight:600;transition:color .2s}
  .im-cta-ghost:hover{color:#fff}

  .rv{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
  .rvd{opacity:1;transform:translateY(0)}
  .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}

  @media(max-width:900px){.im-hero h1{font-size:34px}.im-mode-grid{grid-template-columns:1fr}.im-adv-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.im-adv-grid{grid-template-columns:1fr}.im-hero-stats{flex-direction:column;gap:12px}}
`
