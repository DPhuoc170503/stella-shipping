import React, { useState, useEffect } from 'react'

const API = 'http://localhost:4000/api/pricing'

/* ── Cấu hình tabs dịch vụ ── */
const TABS = [
  { key: 'sea_fcl', label: '🚢 FCL', full: 'Vận tải biển (FCL)' },
  { key: 'sea_lcl', label: '📦 LCL', full: 'Hàng lẻ (LCL)' },
  { key: 'air', label: '✈️ Hàng không', full: 'Vận tải hàng không' },
  { key: 'road', label: '🚛 Đường bộ', full: 'Vận tải đường bộ' },
  { key: 'warehouse', label: '🏭 Kho bãi', full: 'Dịch vụ kho bãi' },
]

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
  const currentTab = TABS.find(t => t.key === activeTab)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('http://localhost:4000/api/quotes', {
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
      <style>{css}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="pr-hero">
        <div className="pr-hero-inner">
          <div className="pr-kicker">BẢNG GIÁ THAM KHẢO</div>
          <h1>Cước vận tải & Phí dịch vụ</h1>
          <p>Giá cước logistics thay đổi hàng ngày theo thị trường. Chúng tôi cập nhật bảng giá thường xuyên để bạn có thông tin tham khảo chính xác nhất.</p>
          <div className="pr-hero-badges">
            <span className="pr-badge">🌍 120+ Quốc gia</span>
            <span className="pr-badge">⚡ Báo giá trong 2 giờ</span>
            <span className="pr-badge">💰 Giá cạnh tranh nhất</span>
            <span className="pr-badge">🔄 Cập nhật hàng ngày</span>
          </div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <div style={{ padding: '0 24px', maxWidth: 1248, margin: '0 auto' }}>
        <div className="pr-disclaimer">
          <div className="pr-disclaimer-icon">⚠️</div>
          <p>
            <strong>Lưu ý quan trọng:</strong> Bảng giá dưới đây chỉ mang tính <strong>tham khảo</strong> — giá thực tế phụ thuộc vào thời điểm booking, loại hàng, thể tích và các phụ phí phát sinh. Vui lòng <strong>yêu cầu báo giá chính xác</strong> từ đội ngũ của chúng tôi.
          </p>
          <div className="pr-updated">
            Cập nhật lần cuối
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
            <span className="count">{loading ? '...' : `${rates.length} tuyến`}</span>
          </div>
          <div className="pr-table-wrap">
            {loading ? <PriceSkeleton /> : (
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>Tuyến đường / Dịch vụ</th>
                    <th>Đơn vị</th>
                    <th>Giá từ</th>
                    {activeTab !== 'warehouse' && <th>Thời gian</th>}
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#9aabbb' }}>
                        Chưa có dữ liệu — đang cập nhật...
                      </td>
                    </tr>
                  ) : rates.map(r => (
                    <tr key={r.id}>
                      <td><span className="pr-route">{r.route}</span></td>
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
                      <td><span className="pr-note">{r.note || '—'}</span></td>
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
              <h3>📋 Yêu cầu báo giá chính xác</h3>
              <p>Điền thông tin để nhận báo giá chi tiết, chính xác trong vòng 2 giờ làm việc.</p>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Gửi thành công!</p>
                  <p style={{ color: 'rgba(255,255,255,.7)', margin: '8px 0 0', fontSize: 13 }}>Chúng tôi sẽ phản hồi trong 2 giờ làm việc.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>HỌ TÊN *</label>
                      <input name="name" placeholder="Nguyễn Văn A" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="pr-form-group">
                      <label>CÔNG TY</label>
                      <input name="company" placeholder="Tên công ty" value={form.company} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>EMAIL *</label>
                      <input type="email" name="email" placeholder="email@company.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="pr-form-group">
                      <label>ĐIỆN THOẠI</label>
                      <input name="phone" placeholder="0901 234 567" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>NƠI ĐI</label>
                      <input name="origin" placeholder="TP.HCM, Việt Nam" value={form.origin} onChange={handleChange} />
                    </div>
                    <div className="pr-form-group">
                      <label>NƠI ĐẾN</label>
                      <input name="destination" placeholder="Rotterdam, Hà Lan" value={form.destination} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-row">
                    <div className="pr-form-group">
                      <label>LOẠI DỊCH VỤ</label>
                      <select name="service" value={form.service} onChange={handleChange}>
                        <option value="sea_fcl">🚢 Vận tải biển FCL</option>
                        <option value="sea_lcl">📦 Vận tải biển LCL</option>
                        <option value="air">✈️ Hàng không</option>
                        <option value="road">🚛 Đường bộ</option>
                        <option value="warehouse">🏭 Kho bãi</option>
                      </select>
                    </div>
                    <div className="pr-form-group">
                      <label>HÀNG HÓA</label>
                      <input name="cargo" placeholder="VD: 2 cont 40HC hàng điện tử" value={form.cargo} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="pr-form-group" style={{ marginBottom: 14 }}>
                    <label>GHI CHÚ</label>
                    <textarea name="note" placeholder="Yêu cầu đặc biệt, thời gian dự kiến..." value={form.note} onChange={handleChange} rows={2} style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="pr-form-submit" disabled={sending}>
                    {sending ? '⏳ Đang gửi...' : '🚀 Gửi yêu cầu báo giá'}
                  </button>
                </form>
              )}
            </div>

            {/* Info card */}
            <div className="pr-info-card">
              <h3>Lưu ý về bảng giá</h3>
              <div className="pr-info-item">
                <div className="pr-info-icon orange">🔄</div>
                <div className="pr-info-text">
                  <strong>Cập nhật hàng ngày</strong>
                  <span>Giá cước biển, không và đường bộ thay đổi theo thị trường. Bảng giá được đội ngũ cập nhật mỗi ngày làm việc.</span>
                </div>
              </div>
              <div className="pr-info-item">
                <div className="pr-info-icon blue">💵</div>
                <div className="pr-info-text">
                  <strong>Giá chưa bao gồm phụ phí</strong>
                  <span>Các mức giá hiển thị là giá cước thuần (ocean/air freight). Phụ phí địa phương, THC, DOC fee... tính riêng.</span>
                </div>
              </div>
              <div className="pr-info-item">
                <div className="pr-info-icon green">⚡</div>
                <div className="pr-info-text">
                  <strong>Báo giá chính xác trong 2 giờ</strong>
                  <span>Điền form bên cạnh để nhận báo giá all-in chính xác nhất, kèm lịch trình tàu/máy bay cụ thể.</span>
                </div>
              </div>
              <div className="pr-surcharge">
                <p>⚡ Các phụ phí thường gặp:</p>
                <ul>
                  <li>THC (Terminal Handling Charge): $60–120 / cont</li>
                  <li>D/O Fee (Delivery Order): $25–40 / lô hàng</li>
                  <li>B/L Fee: $30–50 / B/L</li>
                  <li>Fumigation (kiểm dịch): theo từng lô</li>
                  <li>Phụ phí nhiên liệu (BAF/FAF): biến động hàng tuần</li>
                  <li>Phụ phí tắc nghẽn cảng (PSS): theo thông báo hãng tàu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
