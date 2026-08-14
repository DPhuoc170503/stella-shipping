import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── Scroll-reveal ─── */
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

/* ═══ DATA ═══ */
const CARRIERS = [
  { name: 'CMA CGM', logo: '🚢', origin: 'Pháp', fleet: '600+ tàu', routes: '420+ cảng', desc: 'Hãng tàu container lớn thứ 3 thế giới. Đầu tư mạnh vào hạ tầng cảng Việt Nam (Gemalink, VICT). Cung cấp dịch vụ FCL/LCL trên toàn bộ tuyến Á-Âu và xuyên Thái Bình Dương.', color: '#003DA5' },
  { name: 'MSC', logo: '⚓', origin: 'Thụy Sĩ', fleet: '800+ tàu', routes: '500+ cảng', desc: 'Hãng tàu lớn nhất thế giới tính theo sức chứa TEU. Mạng lưới phủ sóng toàn cầu với tần suất dày đặc, đặc biệt mạnh trên các tuyến Á-Âu và Á-Mỹ.', color: '#1B365D' },
  { name: 'Maersk', logo: '⭐', origin: 'Đan Mạch', fleet: '700+ tàu', routes: '350+ cảng', desc: 'Tiên phong trong logistics tích hợp end-to-end. Nền tảng booking số hóa hàng đầu ngành. Cam kết Net-Zero vào năm 2040 với đội tàu xanh methanol.', color: '#003F5C' },
  { name: 'Hapag-Lloyd', logo: '🔷', origin: 'Đức', fleet: '260+ tàu', routes: '600+ cảng', desc: 'Nổi tiếng về độ tin cậy lịch trình (schedule reliability) cao nhất ngành. Chuyên mạnh tuyến châu Á – Bắc Âu và châu Á – Bắc Mỹ.', color: '#FF6600' },
  { name: 'COSCO Shipping', logo: '🌊', origin: 'Trung Quốc', fleet: '500+ tàu', routes: '370+ cảng', desc: 'Hãng tàu quốc doanh lớn nhất Trung Quốc. Tuyến nội Á cực mạnh, transit time ngắn cho hàng xuất nhập Việt Nam – Trung Quốc.', color: '#E31937' },
  { name: 'ONE (Ocean Network Express)', logo: '🟣', origin: 'Nhật Bản', fleet: '210+ tàu', routes: '200+ cảng', desc: 'Liên minh 3 hãng tàu Nhật (NYK, MOL, K Line). Dịch vụ chất lượng cao, đặc biệt phù hợp hàng điện tử, ô tô và máy móc chính xác.', color: '#FF00FF' },
  { name: 'Evergreen', logo: '🌿', origin: 'Đài Loan', fleet: '200+ tàu', routes: '300+ cảng', desc: 'Hãng tàu hàng đầu châu Á. Đội tàu hiện đại với nhiều siêu tàu 24.000 TEU. Mạng lưới phủ sóng tốt tuyến xuyên Thái Bình Dương.', color: '#00843D' },
  { name: 'HMM (Hyundai)', logo: '🔵', origin: 'Hàn Quốc', fleet: '80+ tàu', routes: '100+ cảng', desc: 'Hãng tàu lớn nhất Hàn Quốc, thành viên liên minh THE Alliance. Đặc biệt mạnh trên tuyến Việt Nam – Hàn Quốc với transit time chỉ 3-4 ngày.', color: '#003087' },
]

const FCL_SERVICES = [
  { icon: '📦', title: "Container 20' DC", desc: 'Hàng khô tiêu chuẩn. Tải trọng tối đa 28 tấn. Phù hợp hàng tiêu dùng, nguyên vật liệu.' },
  { icon: '📦', title: "Container 40' HC", desc: 'Container cao 2.7m. Tải trọng 26 tấn. Lý tưởng cho hàng nhẹ cồng kềnh, may mặc, nội thất.' },
  { icon: '❄️', title: 'Reefer Container', desc: 'Kiểm soát nhiệt độ -25°C đến +25°C. Phù hợp thủy sản, nông sản, dược phẩm, hóa chất.' },
  { icon: '⚠️', title: 'Open Top / Flat Rack', desc: 'Chuyên chở hàng quá khổ, máy móc công nghiệp, thiết bị nặng, project cargo.' },
  { icon: '☣️', title: 'DG (Dangerous Goods)', desc: 'Vận chuyển hàng nguy hiểm theo quy chuẩn IMDG Code. Chuyên viên DG xử lý hồ sơ.' },
  { icon: '🔒', title: 'SOC (Shipper Own Container)', desc: 'Sử dụng container riêng của chủ hàng. Tiết kiệm chi phí detention & demurrage.' },
]

const ROUTES = [
  { from: 'TP.HCM', to: 'Shanghai', transit: '5–7 ngày', freq: '7 chuyến/tuần' },
  { from: 'TP.HCM', to: 'Busan', transit: '5–6 ngày', freq: '5 chuyến/tuần' },
  { from: 'TP.HCM', to: 'Singapore', transit: '2–3 ngày', freq: '10 chuyến/tuần' },
  { from: 'TP.HCM', to: 'Rotterdam', transit: '28–32 ngày', freq: '3 chuyến/tuần' },
  { from: 'TP.HCM', to: 'Hamburg', transit: '30–34 ngày', freq: '2 chuyến/tuần' },
  { from: 'TP.HCM', to: 'Los Angeles', transit: '18–22 ngày', freq: '4 chuyến/tuần' },
  { from: 'Hải Phòng', to: 'Tokyo', transit: '6–8 ngày', freq: '3 chuyến/tuần' },
  { from: 'Hải Phòng', to: 'Incheon', transit: '4–5 ngày', freq: '4 chuyến/tuần' },
]

export default function ShippingLines() {
  const pageRef = useRef(null)
  useReveal(pageRef)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div ref={pageRef}>
      <style>{css}</style>

      {/* ═══ HERO ═══ */}
      <section className="sl-hero">
        <div className="sl-hero-overlay" />
        <div className="sl-hero-inner">
          <Link to="/services" className="sl-back rv">← Quay lại Dịch vụ</Link>
          <div className="sl-hero-badge rv">OCEAN FREIGHT</div>
          <h1 className="rv d1">Vận tải biển<br /><span>FCL & LCL</span></h1>
          <p className="rv d2">
            Booking container tuyến toàn cầu với 50+ hãng tàu hàng đầu thế giới.
            Giải pháp linh hoạt cho mọi loại hàng hóa — từ hàng khô tiêu chuẩn
            đến hàng đông lạnh, hàng nguy hiểm và project cargo.
          </p>
          <div className="sl-hero-stats rv d3">
            <div><strong>50+</strong><span>Hãng tàu đối tác</span></div>
            <div><strong>420+</strong><span>Cảng kết nối</span></div>
            <div><strong>120+</strong><span>Quốc gia</span></div>
            <div><strong>98%</strong><span>Giao đúng hẹn</span></div>
          </div>
        </div>
      </section>

      {/* ═══ FCL vs LCL ═══ */}
      <section className="sl-section">
        <div className="sl-section-hdr rv">
          <div className="kicker">SO SÁNH DỊCH VỤ</div>
          <h2>FCL vs LCL — Giải pháp nào phù hợp?</h2>
        </div>
        <div className="sl-compare rv">
          <div className="sl-compare-card">
            <div className="sl-cc-header fcl">
              <h3>📦 FCL</h3>
              <p>Full Container Load</p>
            </div>
            <ul>
              <li>Sử dụng <strong>nguyên container</strong> riêng</li>
              <li>Phù hợp lô hàng <strong>&gt; 15 CBM</strong></li>
              <li>Transit time <strong>nhanh hơn</strong> (không cần gom hàng)</li>
              <li>An toàn hơn — <strong>không chia sẻ</strong> không gian</li>
              <li>Chi phí cố định theo container</li>
              <li>Lý tưởng cho hàng giá trị cao, nhạy cảm</li>
            </ul>
            <Link to="/pricing" className="sl-cc-cta">Xem giá FCL →</Link>
          </div>
          <div className="sl-compare-card">
            <div className="sl-cc-header lcl">
              <h3>📤 LCL</h3>
              <p>Less than Container Load</p>
            </div>
            <ul>
              <li>Chia sẻ container với các chủ hàng khác</li>
              <li>Phù hợp lô hàng <strong>&lt; 15 CBM</strong></li>
              <li>Tính cước theo <strong>CBM hoặc tấn</strong></li>
              <li>Tiết kiệm chi phí cho lô nhỏ</li>
              <li>Transit time dài hơn 3–5 ngày (cần gom/tách)</li>
              <li>Linh hoạt cho đơn hàng không đều</li>
            </ul>
            <Link to="/pricing" className="sl-cc-cta">Xem giá LCL →</Link>
          </div>
        </div>
      </section>

      {/* ═══ LOẠI CONTAINER ═══ */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-hdr rv">
          <div className="kicker">LOẠI CONTAINER</div>
          <h2>Đa dạng giải pháp vận chuyển FCL</h2>
          <p>Chúng tôi cung cấp đầy đủ các loại container phù hợp mọi nhu cầu hàng hóa.</p>
        </div>
        <div className="sl-container-grid">
          {FCL_SERVICES.map((s, i) => (
            <div key={i} className={`sl-ctn-card rv d${(i % 4) + 1}`}>
              <div className="sl-ctn-icon">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HÃNG TÀU ĐỐI TÁC ═══ */}
      <section className="sl-section">
        <div className="sl-section-hdr rv">
          <div className="kicker">ĐỐI TÁC HÃNG TÀU</div>
          <h2>Hợp tác với các hãng tàu hàng đầu thế giới</h2>
          <p>Nhờ quan hệ đối tác chiến lược, Stella Shipping đảm bảo giá cước cạnh tranh và chỗ (space) ổn định quanh năm.</p>
        </div>
        <div className="sl-carrier-grid">
          {CARRIERS.map((c, i) => (
            <div key={i} className={`sl-carrier-card rv d${(i % 4) + 1}`}>
              <div className="sl-carrier-logo" style={{ background: c.color }}>{c.logo}</div>
              <div className="sl-carrier-body">
                <h4>{c.name}</h4>
                <div className="sl-carrier-meta">
                  <span>🏳️ {c.origin}</span>
                  <span>🚢 {c.fleet}</span>
                  <span>🌐 {c.routes}</span>
                </div>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TUYẾN ĐƯỜNG ═══ */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-hdr rv">
          <div className="kicker">TUYẾN VẬN CHUYỂN CHÍNH</div>
          <h2>Mạng lưới tuyến đường phủ sóng toàn cầu</h2>
        </div>
        <div className="sl-route-table rv">
          <table>
            <thead>
              <tr>
                <th>CẢNG ĐI</th>
                <th>CẢNG ĐẾN</th>
                <th>TRANSIT TIME</th>
                <th>TẦN SUẤT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r, i) => (
                <tr key={i}>
                  <td><strong>🚩 {r.from}</strong></td>
                  <td><strong>📍 {r.to}</strong></td>
                  <td><span className="sl-transit">⏱️ {r.transit}</span></td>
                  <td>{r.freq}</td>
                  <td><Link to="/pricing" className="sl-route-btn">Báo giá</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ QUY TRÌNH ═══ */}
      <section className="sl-section">
        <div className="sl-section-hdr rv">
          <div className="kicker">QUY TRÌNH LÀM VIỆC</div>
          <h2>5 bước đơn giản để vận chuyển hàng hóa</h2>
        </div>
        <div className="sl-steps">
          {[
            { step: '01', title: 'Yêu cầu báo giá', desc: 'Gửi thông tin tuyến đường, loại hàng và khối lượng. Nhận báo giá trong 2 giờ.' },
            { step: '02', title: 'Booking & Xác nhận', desc: 'Chọn hãng tàu, lịch trình phù hợp. Chúng tôi book chỗ và gửi xác nhận.' },
            { step: '03', title: 'Chuẩn bị chứng từ', desc: 'Hỗ trợ làm B/L, C/O, Packing List, Invoice. Khai hải quan xuất khẩu.' },
            { step: '04', title: 'Vận chuyển & Tracking', desc: 'Hàng lên tàu. Theo dõi real-time qua hệ thống tracking trực tuyến.' },
            { step: '05', title: 'Giao hàng tại đích', desc: 'Thông quan nhập khẩu, kéo container về kho. Hoàn tất giao nhận.' },
          ].map((s, i) => (
            <div key={i} className={`sl-step rv d${i + 1}`}>
              <div className="sl-step-num">{s.step}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="sl-cta rv">
        <h2>Bạn cần vận chuyển hàng bằng đường biển?</h2>
        <p>Liên hệ ngay để nhận báo giá tốt nhất từ 50+ hãng tàu đối tác.</p>
        <div className="sl-cta-btns">
          <Link to="/pricing" className="btn btn-primary">Nhận báo giá ngay</Link>
          <Link to="/contact" className="sl-cta-ghost">Liên hệ tư vấn →</Link>
        </div>
      </section>
    </div>
  )
}

const css = `
  /* ═══ HERO ═══ */
  .sl-hero { position:relative; min-height:480px; display:flex; align-items:center; color:#fff; overflow:hidden; margin:-24px -24px 0 -24px; }
  .sl-hero-overlay { position:absolute; inset:0; background: linear-gradient(135deg, rgba(15,43,87,0.92), rgba(21,52,104,0.85)), url('/Shippinglines.jpg') center/cover; z-index:1; }
  .sl-hero-inner { position:relative; z-index:2; max-width:1200px; margin:0 auto; padding:80px 32px; width:100%; }
  .sl-back { color:rgba(255,255,255,0.6); text-decoration:none; font-size:14px; display:inline-block; margin-bottom:24px; transition:color .2s; }
  .sl-back:hover { color:#fff; }
  .sl-hero-badge { display:inline-block; background:#f36c1f; padding:6px 16px; border-radius:4px; font-size:12px; font-weight:700; letter-spacing:2px; margin-bottom:20px; }
  .sl-hero h1 { font-size:52px; margin:0 0 20px; line-height:1.15; font-weight:800; }
  .sl-hero h1 span { color:#f36c1f; }
  .sl-hero p { max-width:640px; color:rgba(255,255,255,0.8); font-size:17px; line-height:1.7; margin-bottom:36px; }
  .sl-hero-stats { display:flex; gap:40px; flex-wrap:wrap; }
  .sl-hero-stats > div { text-align:center; }
  .sl-hero-stats strong { display:block; font-size:36px; font-weight:800; color:#f36c1f; }
  .sl-hero-stats span { font-size:13px; color:rgba(255,255,255,0.7); }

  /* ═══ SECTIONS ═══ */
  .sl-section { padding:72px 24px; max-width:1200px; margin:0 auto; }
  .sl-section-alt { background:#f7f9fb; max-width:100%; padding-left:calc((100% - 1200px)/2 + 24px); padding-right:calc((100% - 1200px)/2 + 24px); }
  .sl-section-hdr { text-align:center; margin-bottom:48px; }
  .sl-section-hdr .kicker { color:#f36c1f; font-size:12px; font-weight:700; letter-spacing:3px; margin-bottom:10px; }
  .sl-section-hdr h2 { font-size:34px; color:#0f2b57; font-weight:800; margin:0 0 12px; }
  .sl-section-hdr p { color:#5a6f82; max-width:640px; margin:0 auto; line-height:1.6; }

  /* ═══ COMPARE ═══ */
  .sl-compare { display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:900px; margin:0 auto; }
  .sl-compare-card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 8px 32px rgba(10,20,40,0.06); transition:transform .3s,box-shadow .3s; }
  .sl-compare-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(10,20,40,0.1); }
  .sl-cc-header { padding:28px 24px; color:#fff; text-align:center; }
  .sl-cc-header.fcl { background:linear-gradient(135deg, #0f2b57, #1a4a8a); }
  .sl-cc-header.lcl { background:linear-gradient(135deg, #f36c1f, #e05a10); }
  .sl-cc-header h3 { margin:0; font-size:28px; }
  .sl-cc-header p { margin:6px 0 0; opacity:0.85; font-size:14px; }
  .sl-compare-card ul { padding:24px 24px 24px 40px; margin:0; list-style:none; }
  .sl-compare-card li { position:relative; padding:10px 0; color:#33475b; font-size:14.5px; line-height:1.6; border-bottom:1px solid #f0f2f5; }
  .sl-compare-card li:last-child { border-bottom:none; }
  .sl-compare-card li::before { content:'✓'; position:absolute; left:-24px; color:#f36c1f; font-weight:700; }
  .sl-cc-cta { display:block; text-align:center; padding:16px; background:#f7f9fb; color:#0f2b57; font-weight:700; text-decoration:none; transition:background .2s,color .2s; }
  .sl-cc-cta:hover { background:#0f2b57; color:#fff; }

  /* ═══ CONTAINER GRID ═══ */
  .sl-container-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1200px; margin:0 auto; }
  .sl-ctn-card { background:#fff; padding:28px; border-radius:12px; box-shadow:0 4px 20px rgba(10,20,40,0.05); transition:transform .3s,box-shadow .3s; }
  .sl-ctn-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(10,20,40,0.1); }
  .sl-ctn-icon { font-size:36px; margin-bottom:14px; }
  .sl-ctn-card h4 { color:#0f2b57; font-size:17px; margin:0 0 10px; font-weight:700; }
  .sl-ctn-card p { color:#5a6f82; font-size:14px; line-height:1.6; margin:0; }

  /* ═══ CARRIERS ═══ */
  .sl-carrier-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:1200px; margin:0 auto; }
  .sl-carrier-card { display:flex; gap:20px; background:#fff; padding:24px; border-radius:12px; box-shadow:0 4px 20px rgba(10,20,40,0.05); transition:transform .3s,box-shadow .3s; }
  .sl-carrier-card:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(10,20,40,0.1); }
  .sl-carrier-logo { width:60px; height:60px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; }
  .sl-carrier-body h4 { margin:0 0 6px; color:#0f2b57; font-size:17px; font-weight:700; }
  .sl-carrier-meta { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:8px; }
  .sl-carrier-meta span { font-size:12px; color:#5a6f82; }
  .sl-carrier-body p { margin:0; color:#5a6f82; font-size:13.5px; line-height:1.55; }

  /* ═══ ROUTES TABLE ═══ */
  .sl-route-table { max-width:1200px; margin:0 auto; overflow-x:auto; }
  .sl-route-table table { width:100%; border-collapse:collapse; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(10,20,40,0.05); }
  .sl-route-table thead { background:linear-gradient(135deg, #0f2b57, #153468); color:#fff; }
  .sl-route-table th { padding:16px 20px; text-align:left; font-size:12px; letter-spacing:1.5px; font-weight:600; }
  .sl-route-table td { padding:16px 20px; border-bottom:1px solid #f0f2f5; font-size:14.5px; color:#33475b; }
  .sl-route-table tr:last-child td { border-bottom:none; }
  .sl-route-table tr:hover td { background:#f7f9fb; }
  .sl-transit { color:#f36c1f; font-weight:600; }
  .sl-route-btn { display:inline-block; padding:6px 16px; background:#f36c1f; color:#fff; border-radius:6px; text-decoration:none; font-size:13px; font-weight:600; transition:background .2s; }
  .sl-route-btn:hover { background:#e05a10; }

  /* ═══ STEPS ═══ */
  .sl-steps { display:flex; gap:20px; max-width:1200px; margin:0 auto; }
  .sl-step { flex:1; background:#fff; padding:28px; border-radius:12px; box-shadow:0 4px 20px rgba(10,20,40,0.05); text-align:center; position:relative; transition:transform .3s; }
  .sl-step:hover { transform:translateY(-4px); }
  .sl-step-num { display:inline-flex; width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,#0f2b57,#1a4a8a); color:#fff; font-size:18px; font-weight:800; align-items:center; justify-content:center; margin-bottom:16px; }
  .sl-step h4 { color:#0f2b57; margin:0 0 8px; font-size:15px; font-weight:700; }
  .sl-step p { color:#5a6f82; font-size:13.5px; line-height:1.55; margin:0; }

  /* ═══ CTA ═══ */
  .sl-cta { text-align:center; padding:72px 24px; background:linear-gradient(135deg, #0f2b57, #153468); color:#fff; margin:0 -24px -24px -24px; }
  .sl-cta h2 { font-size:34px; margin:0 0 14px; font-weight:800; }
  .sl-cta p { color:rgba(255,255,255,0.75); font-size:16px; margin-bottom:32px; }
  .sl-cta-btns { display:flex; gap:16px; justify-content:center; align-items:center; }
  .sl-cta-ghost { color:rgba(255,255,255,0.8); text-decoration:none; font-weight:600; transition:color .2s; }
  .sl-cta-ghost:hover { color:#fff; }

  /* ═══ REVEAL ═══ */
  .rv { opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease; }
  .rvd { opacity:1; transform:translateY(0); }
  .d1 { transition-delay:.1s } .d2 { transition-delay:.2s } .d3 { transition-delay:.3s } .d4 { transition-delay:.4s } .d5 { transition-delay:.5s }

  /* ═══ RESPONSIVE ═══ */
  @media(max-width:900px) {
    .sl-hero h1 { font-size:34px; }
    .sl-hero-stats { gap:20px; }
    .sl-compare { grid-template-columns:1fr; }
    .sl-container-grid { grid-template-columns:1fr 1fr; }
    .sl-carrier-grid { grid-template-columns:1fr; }
    .sl-steps { flex-direction:column; }
  }
  @media(max-width:600px) {
    .sl-container-grid { grid-template-columns:1fr; }
    .sl-hero-stats { flex-direction:column; gap:12px; }
  }
`
