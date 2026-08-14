import React, { useState, useEffect, useRef, useCallback } from 'react'

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

/* ═══════════════════════════════════════ CSS ═══════════════════════════════════════ */
const css = `
  /* ── Reveal ── */
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rv.fl{transform:translateX(-48px) translateY(0)}
  .rv.fr{transform:translateX(48px) translateY(0)}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}.rv.d5{transition-delay:.5s}

  .ct-page{font-family:'Inter',sans-serif;color:#1a2744}

  /* ── Hero ── */
  .ct-hero{
    position:relative;min-height:400px;display:flex;align-items:center;
    background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);
    color:#fff;overflow:hidden;
  }
  .ct-hero::before{
    content:'';position:absolute;top:-30%;right:-10%;width:550px;height:550px;
    background:radial-gradient(circle,rgba(243,108,31,.12) 0%,transparent 70%);border-radius:50%;
  }
  .ct-hero::after{
    content:'';position:absolute;bottom:-40%;left:-8%;width:450px;height:450px;
    background:radial-gradient(circle,rgba(37,99,235,.08) 0%,transparent 70%);border-radius:50%;
  }
  .ct-hero-inner{position:relative;z-index:1;max-width:820px;margin:0 auto;text-align:center;padding:72px 28px}
  .ct-hero .kicker{
    display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;
    border:1px solid rgba(243,108,31,.4);padding:5px 16px;border-radius:20px;margin-bottom:18px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .ct-hero h1{font-size:46px;font-weight:800;margin:0 0 16px;line-height:1.1;font-family:'Be Vietnam Pro',sans-serif}
  .ct-hero h1 .hl{color:#f36c1f}
  .ct-hero p{font-size:16px;color:rgba(255,255,255,.78);max-width:600px;margin:0 auto;line-height:1.65}

  /* ── Quick info strip ── */
  .ct-strip{
    max-width:1200px;margin:-48px auto 0;position:relative;z-index:10;padding:0 24px;
  }
  .ct-strip-inner{
    display:grid;grid-template-columns:repeat(4,1fr);gap:0;
    background:#fff;border-radius:16px;overflow:hidden;
    box-shadow:0 14px 48px rgba(10,20,40,.1);
  }
  .ct-strip-item{
    padding:28px 20px;text-align:center;
    border-right:1px solid #f0f4f8;
    transition:background .25s;
  }
  .ct-strip-item:last-child{border-right:none}
  .ct-strip-item:hover{background:#fafcfe}
  .ct-strip-icon{
    width:50px;height:50px;border-radius:14px;margin:0 auto 12px;
    display:flex;align-items:center;justify-content:center;font-size:22px;
  }
  .ct-strip-icon.orange{background:rgba(243,108,31,.1)}
  .ct-strip-icon.blue{background:rgba(15,43,87,.08)}
  .ct-strip-icon.green{background:rgba(34,197,94,.1)}
  .ct-strip-icon.purple{background:rgba(124,58,237,.1)}
  .ct-strip-item h4{margin:0 0 4px;font-size:13px;color:#0f2b57;font-weight:700;font-family:'Be Vietnam Pro',sans-serif}
  .ct-strip-item p{margin:0;font-size:13px;color:#5a6f82;line-height:1.5}
  .ct-strip-item a{color:#f36c1f;text-decoration:none;font-weight:600}
  .ct-strip-item a:hover{text-decoration:underline}

  /* ── Main section ── */
  .ct-main{max-width:1200px;margin:0 auto;padding:64px 24px 80px}

  /* ── Layout grid ── */
  .ct-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:start}

  /* ── Form card ── */
  .ct-form-card{
    background:#fff;border-radius:18px;padding:40px;
    box-shadow:0 8px 36px rgba(10,20,40,.06);
    border:1px solid #edf1f7;
  }
  .ct-form-card h2{margin:0 0 6px;font-size:24px;color:#0f2b57;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .ct-form-card .ct-form-sub{margin:0 0 28px;font-size:14px;color:#7b8a9a;line-height:1.5}

  .ct-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
  .ct-form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:0}
  .ct-form-group.full{grid-column:1/-1}
  .ct-form-group label{
    font-size:12px;font-weight:700;color:#3a4f65;letter-spacing:.5px;
    text-transform:uppercase;font-family:'Be Vietnam Pro',sans-serif;
  }
  .ct-form-group input,.ct-form-group select,.ct-form-group textarea{
    padding:13px 16px;border:1.5px solid #e1e8ef;border-radius:10px;
    background:#f8fafc;color:#1a2744;font-size:14px;font-family:inherit;
    transition:border-color .25s,background .25s,box-shadow .25s;
    outline:none;box-sizing:border-box;
  }
  .ct-form-group input::placeholder,.ct-form-group textarea::placeholder{color:#a0b0c0}
  .ct-form-group input:focus,.ct-form-group select:focus,.ct-form-group textarea:focus{
    border-color:#f36c1f;background:#fff;box-shadow:0 0 0 3px rgba(243,108,31,.08);
  }
  .ct-form-group textarea{resize:vertical;min-height:120px}

  .ct-submit{
    width:100%;padding:15px;background:linear-gradient(135deg,#f36c1f,#e05a10);
    color:#fff;font-weight:700;font-size:15px;border:none;border-radius:10px;
    cursor:pointer;transition:all .25s;margin-top:8px;
    box-shadow:0 4px 14px rgba(243,108,31,.35);
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .ct-submit:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(243,108,31,.4)}
  .ct-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}

  .ct-success{
    text-align:center;padding:40px 0;
  }
  .ct-success .icon{font-size:52px;margin-bottom:14px}
  .ct-success h3{margin:0 0 8px;font-size:20px;color:#0f2b57;font-family:'Be Vietnam Pro',sans-serif}
  .ct-success p{margin:0;color:#7b8a9a;font-size:14px}

  /* ── Right side ── */
  .ct-right{display:flex;flex-direction:column;gap:24px}

  /* ── Info card ── */
  .ct-info-card{
    background:linear-gradient(135deg,#0f2b57,#1a3a6a);
    border-radius:18px;padding:36px;color:#fff;
  }
  .ct-info-card h3{margin:0 0 24px;font-size:18px;font-weight:700;font-family:'Be Vietnam Pro',sans-serif}
  .ct-info-item{display:flex;gap:16px;margin-bottom:22px}
  .ct-info-item:last-child{margin-bottom:0}
  .ct-info-icon{
    width:44px;height:44px;border-radius:12px;
    background:rgba(243,108,31,.15);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;font-size:18px;
    transition:background .25s,transform .25s;
  }
  .ct-info-item:hover .ct-info-icon{background:rgba(243,108,31,.25);transform:scale(1.08)}
  .ct-info-text strong{display:block;color:#fff;font-size:13px;margin-bottom:3px;font-family:'Be Vietnam Pro',sans-serif}
  .ct-info-text span{color:rgba(255,255,255,.65);font-size:13.5px;line-height:1.5}
  .ct-info-text a{color:#f36c1f;text-decoration:none}
  .ct-info-text a:hover{text-decoration:underline}

  /* ── Hours card ── */
  .ct-hours-card{
    background:#fff;border-radius:18px;padding:28px;
    box-shadow:0 6px 24px rgba(10,20,40,.05);
    border:1px solid #edf1f7;
  }
  .ct-hours-card h4{margin:0 0 16px;font-size:15px;color:#0f2b57;font-weight:700;font-family:'Be Vietnam Pro',sans-serif}
  .ct-hours-row{
    display:flex;justify-content:space-between;align-items:center;
    padding:10px 0;border-bottom:1px solid #f3f5f8;
    font-size:13.5px;
  }
  .ct-hours-row:last-child{border-bottom:none}
  .ct-hours-row .day{color:#3a4f65;font-weight:600}
  .ct-hours-row .time{color:#5a6f82}
  .ct-hours-row .closed{color:#ef4444;font-weight:600}
  .ct-hours-status{
    display:inline-flex;align-items:center;gap:8px;
    padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;
    margin-bottom:16px;
  }
  .ct-hours-status.open{background:rgba(34,197,94,.1);color:#16a34a}
  .ct-hours-status.closed{background:rgba(239,68,68,.1);color:#ef4444}
  .ct-hours-pulse{
    width:8px;height:8px;border-radius:50%;
    animation:ct-pulse 2s ease-in-out infinite;
  }
  .ct-hours-status.open .ct-hours-pulse{background:#16a34a}
  .ct-hours-status.closed .ct-hours-pulse{background:#ef4444}
  @keyframes ct-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}

  /* ── Branch card ── */
  .ct-branch-card{
    background:#fff;border-radius:18px;padding:28px;
    box-shadow:0 6px 24px rgba(10,20,40,.05);
    border:1px solid #edf1f7;
  }
  .ct-branch-card h4{margin:0 0 16px;font-size:15px;color:#0f2b57;font-weight:700;font-family:'Be Vietnam Pro',sans-serif}
  .ct-branch{
    display:flex;gap:14px;padding:14px;
    background:#f8fafc;border-radius:12px;
    transition:background .25s;
  }
  .ct-branch:hover{background:#f0f5fa}
  .ct-branch-pin{
    width:40px;height:40px;border-radius:10px;
    background:rgba(15,43,87,.08);
    display:flex;align-items:center;justify-content:center;
    font-size:18px;flex-shrink:0;
  }
  .ct-branch-info strong{display:block;color:#0f2b57;font-size:14px;margin-bottom:2px}
  .ct-branch-info span{display:block;color:#7b8a9a;font-size:12.5px;line-height:1.5}
  .ct-branch-info .ct-branch-phone{color:#f36c1f;font-weight:600;font-size:13px;margin-top:4px}

  /* ── Map section ── */
  .ct-map-section{background:#f5f8fb;padding:64px 24px}
  .ct-map-inner{max-width:1200px;margin:0 auto}
  .ct-map-hdr{text-align:center;margin-bottom:36px}
  .ct-map-hdr .kicker{color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;margin-bottom:8px;font-family:'Be Vietnam Pro',sans-serif}
  .ct-map-hdr h2{font-size:32px;color:#0f2b57;margin:0 0 10px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .ct-map-hdr p{color:#5a6f82;font-size:14px}
  .ct-map-frame{
    border-radius:18px;overflow:hidden;
    box-shadow:0 12px 40px rgba(10,20,40,.08);
    border:4px solid #fff;
  }
  .ct-map-frame iframe{width:100%;height:400px;border:none;display:block}

  /* ── FAQ ── */
  .ct-faq-section{padding:64px 24px;max-width:800px;margin:0 auto}
  .ct-faq-hdr{text-align:center;margin-bottom:36px}
  .ct-faq-hdr .kicker{color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;margin-bottom:8px;font-family:'Be Vietnam Pro',sans-serif}
  .ct-faq-hdr h2{font-size:32px;color:#0f2b57;margin:0 0 10px;font-weight:800;font-family:'Be Vietnam Pro',sans-serif}
  .ct-faq-item{
    background:#fff;border-radius:14px;padding:0;margin-bottom:12px;
    box-shadow:0 4px 16px rgba(10,20,40,.04);
    border:1px solid #edf1f7;overflow:hidden;
    transition:box-shadow .25s;
  }
  .ct-faq-item:hover{box-shadow:0 6px 24px rgba(10,20,40,.08)}
  .ct-faq-q{
    padding:18px 24px;cursor:pointer;display:flex;align-items:center;
    justify-content:space-between;gap:16px;
    font-size:15px;font-weight:600;color:#0f2b57;
    background:none;border:none;width:100%;text-align:left;
    font-family:'Be Vietnam Pro',sans-serif;
    transition:color .2s;
  }
  .ct-faq-q:hover{color:#f36c1f}
  .ct-faq-arrow{
    font-size:18px;transition:transform .3s;flex-shrink:0;color:#f36c1f;
  }
  .ct-faq-arrow.open{transform:rotate(180deg)}
  .ct-faq-a{
    padding:0 24px 18px;color:#5a6f82;font-size:14px;line-height:1.65;
    border-top:1px solid #f3f5f8;margin-top:0;padding-top:14px;
  }

  /* ── Responsive ── */
  @media(max-width:1024px){
    .ct-strip-inner{grid-template-columns:repeat(2,1fr)}
    .ct-strip-item:nth-child(2){border-right:none}
    .ct-strip-item:nth-child(3),.ct-strip-item:nth-child(4){border-top:1px solid #f0f4f8}
  }
  @media(max-width:900px){
    .ct-grid{grid-template-columns:1fr}
    .ct-hero h1{font-size:32px}
  }
  @media(max-width:600px){
    .ct-strip-inner{grid-template-columns:1fr}
    .ct-strip-item{border-right:none;border-bottom:1px solid #f0f4f8}
    .ct-strip-item:last-child{border-bottom:none}
    .ct-form-row{grid-template-columns:1fr}
    .ct-hero-inner{padding:48px 20px}
  }
`

/* ═══════ FAQ DATA ═══════ */
const FAQS = [
  { q: 'Thời gian phản hồi báo giá mất bao lâu?', a: 'Chúng tôi cam kết phản hồi báo giá trong vòng 2 giờ làm việc. Với các yêu cầu phức tạp (project cargo, hàng nguy hiểm), thời gian có thể kéo dài đến 24 giờ để đảm bảo báo giá chính xác nhất.' },
  { q: 'Stella Shipping có hỗ trợ thủ tục hải quan không?', a: 'Có. Chúng tôi cung cấp dịch vụ khai báo hải quan trọn gói: khai báo VNACCS/VCIS, phân loại mã HS, xin C/O, giấy phép XNK đặc biệt và tư vấn thuế XNK.' },
  { q: 'Tôi có thể theo dõi hàng hóa bằng cách nào?', a: 'Bạn có thể tracking hàng hóa 24/7 thông qua hệ thống trên website hoặc liên hệ hotline. Chúng tôi cũng gửi thông báo tự động qua email/SMS về trạng thái lô hàng.' },
  { q: 'Có hỗ trợ vận chuyển hàng nguy hiểm (DG cargo) không?', a: 'Có. Đội ngũ chúng tôi có chứng chỉ IMDG/IATA DG và kinh nghiệm xử lý hàng nguy hiểm tất cả các nhóm. Chi phí phụ thu tùy loại hàng và tuyến vận chuyển.' },
]

/* ═══════════════════════════ Component ═══════════════════════════ */
export default function Contact() {
  const pageRef = useScrollReveal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', subject: 'quote', origin: '', destination: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const subjectNames = { quote: 'Yêu cầu báo giá', consult: 'Tư vấn vận chuyển', partner: 'Hợp tác kinh doanh', support: 'Hỗ trợ kỹ thuật', other: 'Khác' }
      const res = await fetch('http://localhost:4000/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          origin: form.origin,
          destination: form.destination,
          service: form.subject,
          cargo: '',
          note: `[${subjectNames[form.subject] || form.subject}] ${form.message}`
        })
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setForm({ name: '', phone: '', email: '', company: '', subject: 'quote', origin: '', destination: '', message: '' })
      setTimeout(() => setSent(false), 6000)
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline.')
    } finally {
      setSending(false)
    }
  }

  /* Determine if currently open */
  const now = new Date()
  const day = now.getDay() // 0=Sun, 6=Sat
  const hour = now.getHours()
  const isOpen = day >= 1 && day <= 5 ? (hour >= 8 && hour < 17) : (day === 6 ? (hour >= 8 && hour < 12) : false)

  return (
    <div className="ct-page" ref={pageRef}>
      <style>{css}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="ct-hero">
        <div className="ct-hero-inner">
          <div className="kicker rv">LUÔN SẴN SÀNG HỖ TRỢ</div>
          <h1 className="rv d1">Liên hệ với <span className="hl">Stella Shipping</span></h1>
          <p className="rv d2">Đội ngũ chuyên gia sẵn sàng tư vấn miễn phí và báo giá cạnh tranh trong vòng 2 giờ làm việc.</p>
        </div>
      </section>

      {/* ═══════ QUICK INFO STRIP ═══════ */}
      <div className="ct-strip rv">
        <div className="ct-strip-inner">
          <div className="ct-strip-item">
            <div className="ct-strip-icon orange">📞</div>
            <h4>Hotline</h4>
            <p><a href="tel:19006868">1900 6868</a></p>
          </div>
          <div className="ct-strip-item">
            <div className="ct-strip-icon blue">✉️</div>
            <h4>Email</h4>
            <p><a href="mailto:stella@stellashipping.com.vn">stella@stellashipping.com.vn</a></p>
          </div>
          <div className="ct-strip-item">
            <div className="ct-strip-icon green">⚡</div>
            <h4>Phản hồi</h4>
            <p>Trong vòng 2 giờ làm việc</p>
          </div>
          <div className="ct-strip-item">
            <div className="ct-strip-icon purple">🌍</div>
            <h4>Phạm vi</h4>
            <p>120+ quốc gia toàn cầu</p>
          </div>
        </div>
      </div>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="ct-main">
        <div className="ct-grid">

          {/* ── Form ── */}
          <div className="ct-form-card rv">
            <h2>📋 Gửi yêu cầu cho chúng tôi</h2>
            <p className="ct-form-sub">Điền thông tin bên dưới — chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</p>

            {sent ? (
              <div className="ct-success">
                <div className="icon">✅</div>
                <h3>Gửi thành công!</h3>
                <p>Chúng tôi đã nhận được yêu cầu và sẽ phản hồi trong vòng 2 giờ làm việc.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label>Họ và tên *</label>
                    <input name="name" placeholder="Nguyễn Văn A" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="ct-form-group">
                    <label>Số điện thoại *</label>
                    <input name="phone" placeholder="0912 345 678" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label>Email *</label>
                    <input type="email" name="email" placeholder="email@congty.vn" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="ct-form-group">
                    <label>Công ty</label>
                    <input name="company" placeholder="Tên công ty (nếu có)" value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="ct-form-row">
                  <div className="ct-form-group">
                    <label>Chủ đề yêu cầu</label>
                    <select name="subject" value={form.subject} onChange={handleChange}>
                      <option value="quote">📋 Yêu cầu báo giá</option>
                      <option value="consult">💬 Tư vấn vận chuyển</option>
                      <option value="partner">🤝 Hợp tác kinh doanh</option>
                      <option value="support">🛠️ Hỗ trợ kỹ thuật</option>
                      <option value="other">📝 Khác</option>
                    </select>
                  </div>
                  <div className="ct-form-group">
                    <label>Tuyến vận chuyển</label>
                    <input name="origin" placeholder="VD: TP.HCM → Hamburg" value={form.origin} onChange={handleChange} />
                  </div>
                </div>

                <div className="ct-form-group full" style={{ marginBottom: 16 }}>
                  <label>Nội dung chi tiết *</label>
                  <textarea
                    name="message"
                    placeholder="Mô tả chi tiết hàng hóa, khối lượng, thời gian mong muốn, yêu cầu đặc biệt..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="ct-submit" disabled={sending}>
                  {sending ? '⏳ Đang gửi...' : '🚀 Gửi yêu cầu'}
                </button>
              </form>
            )}
          </div>

          {/* ── Right side ── */}
          <div className="ct-right">

            {/* Info card */}
            <div className="ct-info-card rv d1">
              <h3>Thông tin liên hệ</h3>

              <div className="ct-info-item">
                <div className="ct-info-icon">📞</div>
                <div className="ct-info-text">
                  <strong>Hotline</strong>
                  <span><a href="tel:19006868">1900 6868</a> (miễn phí)</span>
                </div>
              </div>

              <div className="ct-info-item">
                <div className="ct-info-icon">✉️</div>
                <div className="ct-info-text">
                  <strong>Email</strong>
                  <span><a href="mailto:stella@stellashipping.com.vn">stella@stellashipping.com.vn</a></span>
                </div>
              </div>

              <div className="ct-info-item">
                <div className="ct-info-icon">📍</div>
                <div className="ct-info-text">
                  <strong>Trụ sở chính</strong>
                  <span>Số 26 Đường T2, Khu Dân Cư và Công Viên Phước Thiện ( Khu C), Số 88 Đường Phước Thiện, Phường Long Bình, Thành phố Hồ Chí Minh, Việt Nam</span>
                </div>
              </div>

              <div className="ct-info-item">
                <div className="ct-info-icon">🌐</div>
                <div className="ct-info-text">
                  <strong>Zalo / Facebook</strong>
                  <span><a href="https://www.facebook.com/CDPlayer.StellaHouse" target="_blank" rel="noopener noreferrer">Facebook Stella Shipping</a></span>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="ct-hours-card rv d2">
              <h4>🕐 Giờ làm việc</h4>
              <div className={`ct-hours-status ${isOpen ? 'open' : 'closed'}`}>
                <span className="ct-hours-pulse" />
                {isOpen ? 'Đang mở cửa' : 'Ngoài giờ làm việc'}
              </div>
              <div className="ct-hours-row"><span className="day">Thứ 2 – Thứ 6</span><span className="time">08:00 – 17:30</span></div>
              <div className="ct-hours-row"><span className="day">Thứ 7</span><span className="time">08:00 – 12:00</span></div>
              <div className="ct-hours-row"><span className="day">Chủ nhật</span><span className="closed">Nghỉ</span></div>
            </div>

            {/* Branch card */}
            <div className="ct-branch-card rv d3">
              <h4>📍 Chi nhánh</h4>
              <div className="ct-branch">
                <div className="ct-branch-pin">🏢</div>
                <div className="ct-branch-info">
                  <strong>TP. Hồ Chí Minh</strong>
                  <span>Số 26 Đường T2, Khu Dân Cư và Công Viên Phước Thiện ( Khu C), Số 88 Đường Phước Thiện, Phường Long Bình, Thành phố Hồ Chí Minh, Việt Nam</span>
                  <div className="ct-branch-phone">028 3925 6868</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MAP ═══════ */}
      <section className="ct-map-section">
        <div className="ct-map-inner">
          <div className="ct-map-hdr rv">
            <div className="kicker">VỊ TRÍ</div>
            <h2>Tìm chúng tôi trên bản đồ</h2>
            <p>Ghé thăm văn phòng để được tư vấn trực tiếp</p>
          </div>
          <div className="ct-map-frame rv d1">
            <iframe
              title="Stella Shipping Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370224!2d106.8413!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ5JzIzLjIiTiAxMDbCsDUwJzI4LjciRQ!5e0!3m2!1svi!2svn!4v1600000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="ct-faq-section">
        <div className="ct-faq-hdr rv">
          <div className="kicker">CÂU HỎI THƯỜNG GẶP</div>
          <h2>Bạn cần biết thêm?</h2>
        </div>
        {FAQS.map((faq, i) => (
          <div className={`ct-faq-item rv d${i + 1}`} key={i}>
            <button className="ct-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              {faq.q}
              <span className={`ct-faq-arrow ${openFaq === i ? 'open' : ''}`}>▼</span>
            </button>
            {openFaq === i && <div className="ct-faq-a">{faq.a}</div>}
          </div>
        ))}
      </section>
    </div>
  )
}
