import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useArticles } from '../context/ArticlesContext'
import SEO from '../components/SEO'

/* ─── Scroll-reveal hook (reused) ─── */
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

/* ─── Animated counter ─── */
function AnimNum({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const run = (now) => {
          const p = Math.min((now - t0) / 2000, 1)
          setCount(Math.floor(p * target))
          if (p < 1) requestAnimationFrame(run)
        }
        requestAnimationFrame(run)
      }
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [target])
  return (
    <div className="hm-stat" ref={ref}>
      <span className="hm-stat-num">{count}{suffix}</span>
      <span className="hm-stat-lbl">{label}</span>
    </div>
  )
}


/* ═══════════════════════════════════════════ CSS ═══════════════════════════════════════════ */
const homeCSS = `
  /* ── Reveal ── */
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rv.fl{transform:translateX(-48px) translateY(0)}
  .rv.fr{transform:translateX(48px) translateY(0)}
  .rv.su{transform:scale(.93) translateY(18px)}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}.rv.d5{transition-delay:.5s}

  /* ── Hero enhanced ── */
  .hm-hero{position:relative;min-height:600px;display:flex;align-items:center;color:#fff;overflow:hidden}
  .hm-hero-bg{position:absolute;inset:0;background:url('/Banner.jpg') center/cover no-repeat;z-index:0}
  .hm-hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(6,22,45,.82) 0%,rgba(15,43,87,.55) 50%,rgba(243,108,31,.1) 100%)}
  .hm-hero-inner{position:relative;z-index:2;display:flex;gap:36px;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;padding:72px 28px;width:100%}
  .hm-hero-text{max-width:640px}
  .hm-hero-text .eyebrow{display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;border:1px solid rgba(243,108,31,.35);padding:5px 14px;border-radius:20px;margin-bottom:18px}
  .hm-hero-text h1{font-size:56px;line-height:1.15;margin:0 0 20px;font-weight:800;letter-spacing:-1px;text-shadow:0 8px 32px rgba(0,0,0,0.35)}
  .hm-hero-text h1 .hl{background:linear-gradient(135deg, #f36c1f 0%, #ffad66 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block}
  .hm-hero-text .lead{font-size:18px;color:rgba(255,255,255,.9);line-height:1.65;max-width:540px;margin-bottom:28px;text-shadow:0 4px 16px rgba(0,0,0,0.2)}
  .hm-hero-cta{display:flex;gap:14px;flex-wrap:wrap}
  .hm-hero-cta .btn-ghost{background:rgba(255,255,255,.06);color:#fff;border:2px solid rgba(255,255,255,.25);padding:13px 22px;border-radius:8px;font-weight:600;text-decoration:none;transition:all .25s}
  .hm-hero-cta .btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff}

  /* Quote card */
  .hm-quote{background:#fff;border-radius:14px;padding:28px;min-width:400px;color:#16324a;box-shadow:0 14px 44px rgba(0,0,0,.18);box-sizing:border-box}
  .hm-quote h4{margin:0 0 6px;font-size:18px;color:#0f2b57}
  .hm-quote .sub{color:#7b8a9a;font-size:13px;margin-bottom:16px}
  .hm-quote .row{display:flex;gap:10px;margin-bottom:12px}
  .hm-quote input,.hm-quote select{flex:1;min-width:0;padding:12px 14px;border:1px solid #e1e8ef;border-radius:8px;font-size:14px;background:#f8fafc;transition:border-color .2s;box-sizing:border-box}
  .hm-quote input:focus,.hm-quote select:focus{outline:none;border-color:#f36c1f}
  .hm-quote .btn-primary{width:100%;margin-top:6px;padding:14px;border-radius:8px;font-size:15px;box-sizing:border-box}

  /* ── Tracking bar ── */
  .hm-tracking-bar{background:#fff;border-radius:14px;max-width:1200px;margin:-40px auto 0;position:relative;z-index:10;padding:28px 32px;box-shadow:0 12px 40px rgba(10,20,40,.08)}
  .hm-tracking-inner{display:flex;gap:20px;align-items:center}
  .hm-tracking-icon{font-size:36px;flex-shrink:0}
  .hm-tracking-content{flex:1}
  .hm-tracking-content h3{margin:0 0 4px;font-size:17px;color:#0f2b57}
  .hm-tracking-content p{margin:0;color:#7b8a9a;font-size:13px}
  .hm-tracking-form{display:flex;gap:10px;flex:1.5}
  .hm-tracking-form input{flex:1;padding:12px 16px;border:2px solid #e1e8ef;border-radius:8px;font-size:14px;transition:border-color .2s}
  .hm-tracking-form input:focus{outline:none;border-color:#f36c1f}
  .hm-tracking-form .btn-primary{width:auto;margin-top:0;padding:12px 28px;border-radius:8px;white-space:nowrap}

  /* ── Section common ── */
  .hm-section{padding:72px 24px}
  .hm-section-alt{background:#f5f8fb}
  .hm-section-dark{background:#0a1e3d;color:#fff}
  .hm-section-hdr{text-align:center;max-width:680px;margin:0 auto 44px}
  .hm-section-hdr .kicker{color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;margin-bottom:8px}
  .hm-section-hdr h2{font-size:36px;color:#0f2b57;margin:0 0 12px;font-weight:800}
  .hm-section-dark .hm-section-hdr h2{color:#fff}
  .hm-section-hdr p{color:#5a6f82;font-size:15px;line-height:1.65}
  .hm-section-dark .hm-section-hdr p{color:rgba(255,255,255,.7)}

  /* ── Stats strip ── */
  .hm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1200px;margin:0 auto;padding:48px 0}
  .hm-stat{text-align:center;padding:24px;background:rgba(255,255,255,.04);border-radius:12px;border:1px solid rgba(255,255,255,.08)}
  .hm-stat-num{display:block;font-size:48px;font-weight:800;color:#f36c1f;line-height:1}
  .hm-stat-lbl{display:block;font-size:13px;color:rgba(255,255,255,.7);margin-top:8px;letter-spacing:.5px}

  /* ── Services mega-grid ── */
  .hm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto}
  .hm-svc-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 28px rgba(10,20,40,.05);transition:transform .35s,box-shadow .35s;position:relative}
  .hm-svc-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(10,20,40,.12)}
  .hm-svc-card img{width:100%;height:200px;object-fit:cover;display:block}
  .hm-svc-card-body{padding:22px}
  .hm-svc-card-body h3{margin:0 0 8px;font-size:18px;color:#0f2b57}
  .hm-svc-card-body p{margin:0 0 14px;color:#5a6f82;font-size:14px;line-height:1.6}
  .hm-svc-link{color:#f36c1f;font-weight:600;text-decoration:none;font-size:14px;display:inline-flex;align-items:center;gap:6px;transition:gap .2s}
  .hm-svc-link:hover{gap:10px}
  .hm-svc-badge{position:absolute;top:16px;left:16px;background:rgba(243,108,31,.9);color:#fff;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px}

  /* ── Why choose us ── */
  .hm-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1200px;margin:0 auto}
  .hm-why-card{text-align:center;padding:32px 20px;border-radius:14px;background:#fff;box-shadow:0 6px 24px rgba(10,20,40,.04);transition:transform .3s,box-shadow .3s}
  .hm-why-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(10,20,40,.09)}
  .hm-why-icon{width:64px;height:64px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(243,108,31,.12),rgba(243,108,31,.03));font-size:28px}
  .hm-why-card h4{margin:0 0 8px;color:#0f2b57;font-size:16px}
  .hm-why-card p{margin:0;color:#5a6f82;font-size:13px;line-height:1.6}

  /* ── Process / How it works ── */
  .hm-process{display:flex;gap:0;max-width:1200px;margin:0 auto;position:relative}
  .hm-process::before{content:'';position:absolute;top:40px;left:60px;right:60px;height:3px;background:linear-gradient(90deg,#f36c1f,#0f2b57);z-index:0}
  .hm-step{flex:1;text-align:center;position:relative;z-index:1;padding:0 12px}
  .hm-step-num{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center;margin:16px auto;box-shadow:0 4px 16px rgba(243,108,31,.3)}
  .hm-step h4{color:#0f2b57;margin:12px 0 6px;font-size:15px}
  .hm-step p{color:#5a6f82;font-size:13px;line-height:1.55;margin:0}

  /* ── Industries ── */
  .hm-ind-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;max-width:1200px;margin:0 auto}
  .hm-ind-card{text-align:center;padding:28px 14px;border-radius:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);transition:background .3s,transform .3s;cursor:default}
  .hm-ind-card:hover{background:rgba(255,255,255,.1);transform:translateY(-4px)}
  .hm-ind-icon{font-size:32px;margin-bottom:10px}
  .hm-ind-card h4{margin:0;color:#fff;font-size:13px;font-weight:600}

  /* ── Promo split ── */
  .hm-promo{display:grid;grid-template-columns:1fr 1fr;gap:0;max-width:1200px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 16px 48px rgba(10,20,40,.08)}
  .hm-promo-img{min-height:360px;background:url('/Banner.jpg') center/cover}
  .hm-promo-content{background:linear-gradient(135deg,#0f2b57,#153468);color:#fff;padding:48px 40px;display:flex;flex-direction:column;justify-content:center}
  .hm-promo-content .kicker{color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;margin-bottom:10px}
  .hm-promo-content h2{font-size:30px;margin:0 0 14px;font-weight:800}
  .hm-promo-content p{color:rgba(255,255,255,.75);line-height:1.65;margin-bottom:14px;font-size:15px}
  .hm-promo-content ul{padding-left:18px;color:rgba(255,255,255,.8);line-height:2;margin:0 0 22px}
  .hm-promo-content ul li::marker{color:#f36c1f}
  .hm-promo-cta{display:inline-block;background:#f36c1f;color:#fff;padding:13px 28px;border-radius:8px;font-weight:700;text-decoration:none;transition:background .25s;font-size:15px}
  .hm-promo-cta:hover{background:#e05a10}

  /* ── News/Insights ── */
  .hm-news-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1200px;margin:0 auto}
  .hm-news-card{border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,20,40,.05);background:#fff;transition:transform .3s}
  .hm-news-card:hover{transform:translateY(-5px)}
  .hm-news-card img{width:100%;height:180px;object-fit:cover}
  .hm-news-body{padding:20px}
  .hm-news-body .tag{display:inline-block;background:rgba(243,108,31,.1);color:#f36c1f;font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;margin-bottom:10px;letter-spacing:.5px}
  .hm-news-body h4{margin:0 0 8px;color:#0f2b57;font-size:16px}
  .hm-news-body p{margin:0 0 12px;color:#5a6f82;font-size:13px;line-height:1.55}
  .hm-news-body a{color:#f36c1f;font-weight:600;font-size:13px;text-decoration:none}

  /* ── Partners strip ── */
  .hm-partners{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;max-width:1200px;margin:0 auto;align-items:center}
  .hm-partner{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.6;transition:opacity .3s;font-size:13px;color:#5a6f82;font-weight:600;letter-spacing:.5px}
  .hm-partner:hover{opacity:1}
  .hm-partner .p-icon{font-size:32px}

  /* ── CTA banner ── */
  .hm-cta-banner{position:relative;padding:80px 24px;text-align:center;overflow:hidden;background:linear-gradient(135deg,#f36c1f 0%,#e05a10 50%,#c94d0e 100%);color:#fff}
  .hm-cta-banner h2{font-size:36px;margin:0 0 14px;font-weight:800}
  .hm-cta-banner p{font-size:16px;opacity:.92;max-width:580px;margin:0 auto 32px}
  .hm-cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
  .hm-cta-btns a{padding:15px 32px;border-radius:8px;font-weight:700;text-decoration:none;transition:all .25s;font-size:15px}
  .hm-cta-btns .cta-w{background:#fff;color:#0f2b57}
  .hm-cta-btns .cta-w:hover{background:#f0f4f8}
  .hm-cta-btns .cta-o{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.5)}
  .hm-cta-btns .cta-o:hover{border-color:#fff;background:rgba(255,255,255,.1)}

  /* ── Responsive ── */
  @media(max-width:1024px){
    .hm-hero-inner{flex-direction:column;text-align:center;padding:48px 20px}
    .hm-hero-text{max-width:100%}
    .hm-hero-cta{justify-content:center}
    .hm-quote{min-width:auto;width:100%;max-width:480px}
    .hm-tracking-inner{flex-direction:column;text-align:center}
    .hm-tracking-form{width:100%}
    .hm-cta-btns{flex-direction:column;align-items:center}
    .hm-cta-btns a{width:min(100%,260px)}
  }
  @media(max-width:900px){
    .hm-hero{min-height:540px}
    .hm-hero-text h1{font-size:34px}
    .hm-svc-grid,.hm-news-grid,.hm-promo{grid-template-columns:1fr}
    .hm-why-grid{grid-template-columns:repeat(2,1fr)}
    .hm-stats{grid-template-columns:repeat(2,1fr)}
    .hm-ind-grid{grid-template-columns:repeat(3,1fr)}
    .hm-process{flex-direction:column;gap:24px}
    .hm-process::before{display:none}
    .hm-promo-img{min-height:240px}
  }
  @media(max-width:768px){
    .hm-hero{min-height:100%}
    .hm-hero-bg::after{background:linear-gradient(180deg,rgba(6,22,45,.82) 0%,rgba(15,43,87,.70) 55%,rgba(15,43,87,.82) 100%)}
    .hm-hero-inner{padding:38px 16px 18px}
    .hm-hero-text h1{font-size:30px;line-height:1.2}
    .hm-hero-text .lead{font-size:15px;line-height:1.6}
    .hm-hero-cta{flex-direction:column;align-items:stretch}
    .hm-hero-cta .btn,
    .hm-hero-cta .btn-ghost{width:100%;text-align:center}
    .hm-quote{padding:20px 16px}
    .hm-quote .row,
    .hm-tracking-form{flex-direction:column}
    .hm-quote input,
    .hm-quote select,
    .hm-tracking-form input,
    .hm-tracking-form .btn-primary{width:100%}
    .hm-tracking-bar{padding:20px 16px;margin-top:-20px}
    .hm-tracking-content h3{font-size:16px}
    .hm-section{padding:56px 16px}
    .hm-section-hdr h2{font-size:28px}
    .hm-cta-banner h2{font-size:27px}
    .hm-cta-banner p{font-size:15px}
  }
  @media(max-width:600px){
    .hm-why-grid,.hm-stats{grid-template-columns:1fr}
    .hm-ind-grid{grid-template-columns:repeat(2,1fr)}
    .hm-hero-text .eyebrow{font-size:11px;letter-spacing:2px;padding:5px 10px}
    .hm-news-body h4{font-size:15px}
    .hm-svc-card img{height:180px}
    .hm-partners{gap:18px 20px}
    .hm-partner{flex-basis:calc(50% - 20px)}
  }
`

export default function Home() {
  const pageRef = useScrollReveal()
  const { articles } = useArticles()
  const [quote, setQuote] = useState({ name: '', email: '', phone: '', origin: '', destination: '', mode: 'sea_fcl', weight: '', type: 'fcl' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    fetch(`${API_URL}/api/settings/home_page`)
      .then(res => res.json())
      .then(data => {
        let val = data;
        if (typeof val === 'string') {
          try { val = JSON.parse(val); } catch (e) { }
        }
        if (!val.error) setSettings(val)
      })
      .catch(console.error)
  }, [])

  // Mảng fallback nếu chưa gọi được API
  const defaultSettings = {
    hero: {
      eyebrow: "ĐỐI TÁC LOGISTICS TIN CẬY",
      title_line1: "Vận chuyển ",
      title_hl1: "an toàn",
      title_line2: "\nnhanh chóng và ",
      title_hl2: "toàn diện",
      title_line3: "\ncho doanh nghiệp của bạn",
      lead: "Kết nối 120+ quốc gia — giải pháp vận tải biển, hàng không, đường bộ và kho bãi tối ưu chi phí cho chuỗi cung ứng của bạn. Cam kết giao hàng đúng hẹn 98%."
    },
    services: [
      { img: '/Shippinglines.jpg', badge: 'SHIPPING', title: 'Vận tải biển (FCL & LCL)', desc: 'Booking container tuyến toàn cầu, đàm phán giá cước cạnh tranh với 50+ hãng tàu hàng đầu. Hỗ trợ hàng nguy hiểm, quá khổ, reefer và project cargo.', link: '/services/shipping-lines' },
      { img: '/AirFreight.jpg', badge: 'AIR FREIGHT', title: 'Vận tải hàng không', desc: 'Giải pháp air freight cho hàng khẩn cấp và giá trị cao. Kết nối 80+ sân bay quốc tế với thời gian transit nhanh nhất thị trường.', link: '/services/scheduled-flights' },
      { img: '/INTERMODA.jpg', badge: 'INTERMODAL', title: 'Vận tải đa phương thức', desc: 'Kết hợp linh hoạt đường biển – bộ – sắt – hàng không. Tối ưu chi phí và thời gian cho từng tuyến vận chuyển cụ thể.', link: '/services/intermodal' },
      { img: '/Logictis.jpg', badge: 'LOGISTICS', title: 'Kho bãi & Phân phối', desc: 'Hệ thống kho 15.000m² với WMS hiện đại. Cross-docking, pick-pack, quản lý tồn kho và dịch vụ last-mile delivery.', link: '/services/logistics' },
      { img: '/OURRANGE.jpg', badge: 'CUSTOMS', title: 'Thủ tục Hải quan', desc: 'Đội ngũ chuyên viên hải quan giàu kinh nghiệm. Tư vấn mã HS, C/O, xử lý hồ sơ XNK. Cam kết thông quan trong 24 giờ.', link: '/services/dedicated' },
      { img: '/Chacracter.jpg', badge: 'CONSULTING', title: 'Tư vấn chuỗi cung ứng', desc: 'Phân tích và tối ưu toàn bộ supply chain: lộ trình, chi phí, rủi ro. Thiết kế giải pháp SCM tùy chỉnh cho từng ngành hàng.', link: '/services/charters' }
    ],
    why_choose_us: [
      { icon: '🌐', title: 'Mạng lưới toàn cầu', desc: 'Đối tác đại lý tại 120+ quốc gia. Kết nối liền mạch từ cảng xuất đến kho nhận hàng cuối cùng.' },
      { icon: '💰', title: 'Chi phí tối ưu', desc: 'Hợp đồng dài hạn với hãng tàu & hãng bay. Cam kết giá cước cạnh tranh nhất thị trường.' },
      { icon: '📊', title: 'Công nghệ hiện đại', desc: 'Cổng khách hàng online, tracking real-time, API tích hợp ERP. Quản lý lô hàng mọi lúc, mọi nơi.' },
      { icon: '⏰', title: 'Phản hồi nhanh 2h', desc: 'Đội ngũ chuyên viên response trong 2 giờ làm việc. Account Manager riêng cho mỗi khách hàng.' },
      { icon: '🛡️', title: 'An toàn & Bảo hiểm', desc: 'Bảo hiểm hàng hóa toàn trình. Quy trình đóng gói, xếp dỡ và vận chuyển đạt chuẩn quốc tế.' },
      { icon: '📋', title: 'Chứng chỉ quốc tế', desc: 'ISO 9001, ISO 14001, AEO, FIATA, IATA. Đảm bảo chất lượng dịch vụ ở tiêu chuẩn cao nhất.' },
      { icon: '🌱', title: 'Logistics xanh', desc: 'Cam kết Net-Zero 2035. Ưu tiên phương tiện thân thiện môi trường và tối ưu carbon footprint.' },
      { icon: '🤝', title: 'Đồng hành dài hạn', desc: 'Tư vấn chiến lược SCM, không chỉ xử lý đơn hàng. Mối quan hệ đối tác thay vì giao dịch ngắn hạn.' }
    ],
    process: [
      { num: '01', title: 'Yêu cầu báo giá', desc: 'Gửi thông tin lô hàng qua form, email hoặc hotline. Nhận báo giá chi tiết trong 2 giờ.' },
      { num: '02', title: 'Xác nhận & Booking', "desc": 'Chốt phương án vận chuyển, xác nhận lịch trình và booking slot tàu/máy bay.' },
      { num: '03', title: 'Vận chuyển & Tracking', "desc": 'Lô hàng được xử lý chuyên nghiệp. Theo dõi real-time qua cổng khách hàng.' },
      { num: '04', title: 'Giao hàng & Báo cáo', "desc": 'Nhận hàng đúng hẹn. Báo cáo chi tiết về chi phí, thời gian và hiệu suất.' }
    ]
  }

  const s = settings || defaultSettings;


  function handleChange(e) {
    const { name, value } = e.target
    setQuote((s) => ({ ...s, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quote.name,
          email: quote.email,
          phone: quote.phone,
          origin: quote.origin,
          destination: quote.destination,
          service: quote.mode,
          cargo: `${quote.type === 'fcl' ? 'FCL' : quote.type === 'lcl' ? 'LCL' : 'Hàng rời'} — ${quote.weight ? quote.weight + ' kg' : 'Chưa xác định trọng lượng'}`,
          note: `Yêu cầu từ form báo giá nhanh trang chủ`
        })
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setQuote({ name: '', email: '', phone: '', origin: '', destination: '', mode: 'sea_fcl', weight: '', type: 'fcl' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div ref={pageRef}>
      <SEO />
      <style>{homeCSS}</style>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="hm-hero">
        <div className="hm-hero-bg" />
        <div className="hm-hero-inner">
          <div className="hm-hero-text">
            <div className="eyebrow rv">{s.hero.eyebrow}</div>
            <h1 className="rv d1">
              {s.hero.title_line1} <span className="hl">{s.hero.title_hl1}</span><br />
              {s.hero.title_line2} <span className="hl">{s.hero.title_hl2}</span><br />
              {s.hero.title_line3}
            </h1>
            <p className="lead rv d2">
              {s.hero.lead}
            </p>
            <div className="hm-hero-cta rv d3">
              <a className="btn btn-primary" href="/pricing">Tính cước ngay</a>
              <a className="btn-ghost" href="/services">Khám phá dịch vụ →</a>
            </div>
          </div>

          <div className="hm-quote rv d2">
            <h4>💬 Yêu cầu báo giá nhanh</h4>
            <p className="sub">Nhận báo giá trong vòng 2 giờ làm việc</p>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '28px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
                <p style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0f2b57' }}>Gửi thành công!</p>
                <p style={{ color: '#7b8a9a', margin: '8px 0 0', fontSize: 13 }}>Chúng tôi sẽ phản hồi trong 2 giờ làm việc.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <input name="name" placeholder="👤 Họ tên *" value={quote.name} onChange={handleChange} required />
                  <input name="email" type="email" placeholder="✉️ Email *" value={quote.email} onChange={handleChange} required />
                </div>
                <div className="row">
                  <input name="phone" placeholder="📞 Số điện thoại" value={quote.phone} onChange={handleChange} />
                </div>
                <div className="row">
                  <input name="origin" placeholder="🚩 Nơi đi (VD: TP.HCM)" value={quote.origin} onChange={handleChange} />
                  <input name="destination" placeholder="📍 Nơi đến (VD: Hamburg)" value={quote.destination} onChange={handleChange} />
                </div>
                <div className="row">
                  <select name="mode" value={quote.mode} onChange={handleChange}>
                    <option value="sea_fcl">🚢 Đường biển (FCL)</option>
                    <option value="sea_lcl">📦 Đường biển (LCL)</option>
                    <option value="air">✈️ Hàng không</option>
                    <option value="road">🚛 Đường bộ</option>
                    <option value="warehouse">🏭 Kho bãi</option>
                  </select>
                  <input name="weight" placeholder="⚖️ Trọng lượng (kg)" value={quote.weight} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? '⏳ Đang gửi...' : '🚀 Gửi yêu cầu báo giá'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>




      {/* ═══════════════ 4. DỊCH VỤ CHÍNH ═══════════════ */}
      <section className="hm-section">
        <div className="hm-section-hdr rv">
          <div className="kicker">DỊCH VỤ CỦA CHÚNG TÔI</div>
          <h2>Giải pháp logistics toàn diện</h2>
          <p>Với năng lực vận hành đa kênh, chúng tôi thiết kế và triển khai giải pháp vận tải tối ưu cho mọi loại hàng hóa trên toàn chuỗi cung ứng.</p>
        </div>
        <div className="hm-svc-grid">
          {s.services.map((svc, i) => (
            <div key={i} className={`hm-svc-card rv d${Math.min(i + 1, 5)}`}>
              <div className="hm-svc-badge">{svc.badge}</div>
              <img src={svc.img} alt={svc.title} />
              <div className="hm-svc-card-body">
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <a className="hm-svc-link" href={svc.link}>Tìm hiểu thêm →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 5. TẠI SAO CHỌN CHÚNG TÔI ═══════════════ */}
      <section className="hm-section hm-section-alt">
        <div className="hm-section-hdr rv">
          <div className="kicker">TẠI SAO CHỌN STELLA</div>
          <h2>Lợi thế cạnh tranh vượt trội</h2>
          <p>Chúng tôi không chỉ vận chuyển hàng hóa — chúng tôi kiến tạo giải pháp giúp doanh nghiệp bạn phát triển.</p>
        </div>
        <div className="hm-why-grid">
          {s.why_choose_us.map((w, i) => (
            <div key={i} className={`hm-why-card rv d${Math.min(i + 1, 5)}`}>
              <div className="hm-why-icon">{w.icon}</div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 6. QUY TRÌNH LÀM VIỆC ═══════════════ */}
      <section className="hm-section">
        <div className="hm-section-hdr rv">
          <div className="kicker">QUY TRÌNH</div>
          <h2>Vận hành đơn giản, hiệu quả tối đa</h2>
          <p>Chỉ cần 4 bước đơn giản để lô hàng của bạn được vận chuyển an toàn đến đích.</p>
        </div>
        <div className="hm-process">
          {s.process.map((step, i) => (
            <div key={i} className={`hm-step rv d${i + 1}`}>
              <div className="hm-step-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 7. NGÀNH HÀNG PHỤC VỤ ═══════════════ */}
      <section className="hm-section hm-section-dark">
        <div className="hm-section-hdr rv">
          <div className="kicker">NGÀNH HÀNG</div>
          <h2>Phục vụ đa dạng lĩnh vực</h2>
          <p>Chúng tôi am hiểu đặc thù từng ngành để đưa ra giải pháp logistics phù hợp nhất.</p>
        </div>
        <div className="hm-ind-grid">
          {[
            { icon: '🏭', name: 'Sản xuất' },
            { icon: '🛒', name: 'Bán lẻ & FMCG' },
            { icon: '💻', name: 'Điện tử & CNTT' },
            { icon: '🏗️', name: 'Xây dựng' },
            { icon: '🧪', name: 'Hóa chất' },
            { icon: '🥗', name: 'Thực phẩm' },
            { icon: '👗', name: 'Dệt may & Da giày' },
            { icon: '🚗', name: 'Ô tô & Phụ tùng' },
            { icon: '💊', name: 'Dược phẩm' },
            { icon: '⚡', name: 'Năng lượng' },
            { icon: '🪵', name: 'Gỗ & Nội thất' },
            { icon: '🌾', name: 'Nông sản' },
          ].map((ind, i) => (
            <div key={i} className={`hm-ind-card rv d${Math.min(i + 1, 5)}`}>
              <div className="hm-ind-icon">{ind.icon}</div>
              <h4>{ind.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 8. PROMO - CỔNG KHÁCH HÀNG ═══════════════ */}
      <section className="hm-section">
        <div className="hm-promo rv su">
          <div className="hm-promo-img" />
          <div className="hm-promo-content">
            <div className="kicker">CÔNG NGHỆ SỐ</div>
            <h2>Cổng khách hàng trực tuyến</h2>
            <p>Quản lý toàn bộ lô hàng, chứng từ và báo cáo trên một nền tảng duy nhất — mọi lúc, mọi nơi.</p>
            <ul>
              <li>Tracking lô hàng real-time 24/7</li>
              <li>Quản lý chứng từ điện tử (B/L, Invoice, Packing List)</li>
              <li>Dashboard báo cáo chi phí & hiệu suất</li>
              <li>API tích hợp trực tiếp với ERP/WMS</li>
              <li>Thông báo tự động qua email & SMS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. TIN TỨC & INSIGHTS ═══════════════ */}
      <section className="hm-section">
        <div className="hm-section-hdr rv">
          <div className="kicker">TIN TỨC & INSIGHTS</div>
          <h2>Cập nhật mới nhất từ ngành logistics</h2>
        </div>
        <div className="hm-news-grid">
          {(articles && articles.filter(a => a.status === 'published').length > 0
            ? articles.filter(a => a.status === 'published').slice(0, 3)
            : [
              { id: 1, img: '/Banner.jpg', category: 'NGÀNH', title: 'Xu hướng logistics xanh 2024: Cơ hội và thách thức', desc: 'Phân tích chi tiết về các sáng kiến giảm carbon trong vận tải biển và tác động đến chi phí chuỗi cung ứng.', date: '12/08/2024' },
              { id: 2, img: '/AirFreight.jpg', category: 'DỊCH VỤ', title: 'Stella mở tuyến air freight trực tiếp TP.HCM – Frankfurt', desc: 'Rút ngắn thời gian transit xuống 2 ngày so với tuyến truyền thống, phục vụ nhu cầu hàng khẩn cấp sang EU.', date: '05/08/2024' },
              { id: 3, img: '/INTERMODA.jpg', category: 'CÔNG NGHỆ', title: 'Ra mắt Cổng khách hàng 3.0 với AI dự đoán ETA', desc: 'Ứng dụng trí tuệ nhân tạo để dự đoán thời gian đến chính xác đến 95%, giúp khách hàng chủ động lên kế hoạch.', date: '28/07/2024' }
            ]
          ).map((n, i) => (
            <div key={i} className={`hm-news-card rv d${i + 1}`}>
              <img src={n.img || '/Banner.jpg'} alt={n.title} />
              <div className="hm-news-body">
                <div className="tag">{n.category || 'TIN TỨC'}</div>
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
                <a href={n.id ? `/news/${n.id}` : "/news"}>Đọc thêm →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 11. ĐỐI TÁC ═══════════════ */}
      <section className="hm-section hm-section-alt">
        <div className="hm-section-hdr rv">
          <div className="kicker">ĐỐI TÁC & CHỨNG CHỈ</div>
          <h2>Đồng hành cùng các tổ chức hàng đầu</h2>
        </div>
        <div className="hm-partners rv">
          {[
            { icon: '🚢', name: 'Maersk' },
            { icon: '🚢', name: 'CMA CGM' },
            { icon: '🚢', name: 'MSC' },
            { icon: '✈️', name: 'Emirates SkyCargo' },
            { icon: '🏆', name: 'ISO 9001' },
            { icon: '📋', name: 'ISO 14001' },
            { icon: '🔒', name: 'AEO' },
            { icon: '🌐', name: 'FIATA' },
            { icon: '✈️', name: 'IATA' },
          ].map((p, i) => (
            <div key={i} className="hm-partner">
              <div className="p-icon">{p.icon}</div>
              {p.name}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 12. CTA BANNER ═══════════════ */}
      <section className="hm-cta-banner">
        <h2 className="rv">Sẵn sàng tối ưu chuỗi cung ứng?</h2>
        <p className="rv d1">Liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá chi tiết từ đội ngũ chuyên gia logistics Stella Shipping.</p>
        <div className="hm-cta-btns rv d2">
          <a href="/contact" className="cta-w">Yêu cầu tư vấn miễn phí</a>
          <a href="/pricing" className="cta-o">Tính cước vận chuyển</a>
        </div>
      </section>
    </div>
  )
}
