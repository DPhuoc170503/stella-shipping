import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useArticles } from '../context/ArticlesContext'
import { useTranslation } from 'react-i18next'
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
  .hm-form-group{display:flex;flex-direction:column;gap:5px;flex:1;min-width:0;}
  .hm-form-group label{font-size:12px;font-weight:600;color:#0f2b57;letter-spacing:.5px;text-align:left;}
  .hm-quote input,.hm-quote select,.hm-quote textarea{width:100%;min-width:0;padding:12px 14px;border:1px solid #e1e8ef;border-radius:8px;font-size:14px;background:#f8fafc;transition:border-color .2s;box-sizing:border-box;font-family:inherit}
  .hm-quote input:focus,.hm-quote select:focus,.hm-quote textarea:focus{outline:none;border-color:#f36c1f}
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
  .hm-news-grid{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:24px;max-width:1200px;margin:0 auto;padding-bottom:16px;scroll-behavior:smooth;scrollbar-width:none;}
  .hm-news-grid::-webkit-scrollbar { display: none; }
  .hm-news-card{flex:0 0 calc(33.333% - 16px);border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,20,40,.05);background:#fff;transition:transform .3s;scroll-snap-align:start;}
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
    .hm-quote textarea,
    .hm-tracking-form input,
    .hm-tracking-form .btn-primary{width:100%}
    .hm-tracking-bar{padding:20px 16px;margin-top:-20px}
    .hm-tracking-content h3{font-size:16px}
    .hm-section{padding:40px 16px}
    .hm-section-hdr{margin-bottom:28px}
    .hm-section-hdr h2{font-size:28px}
    .hm-cta-banner h2{font-size:27px}
    .hm-cta-banner p{font-size:15px}
    /* Mobile horizontal slider for cards */
    .hm-mobile-slider {
      display: flex !important;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 16px;
      padding-bottom: 24px;
      margin-left: -16px;
      margin-right: -16px;
      padding-left: 16px;
      padding-right: 16px;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .hm-mobile-slider::-webkit-scrollbar { display: none; }
    .hm-mobile-slider > * {
      flex: 0 0 85% !important;
      scroll-snap-align: center;
    }
    .hm-ind-grid.hm-mobile-slider > * {
      flex: 0 0 45% !important;
    }
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
  const { t, i18n } = useTranslation()
  const pageRef = useScrollReveal()
  const { articles } = useArticles()
  const [quote, setQuote] = useState({ name: '', company: '', email: '', phone: '', origin: '', destination: '', service: 'sea_fcl', quantity: '', note: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [settings, setSettings] = useState(null)

  const newsSliderRef = useRef(null)
  const scrollNews = (dir) => {
    if (newsSliderRef.current) {
      newsSliderRef.current.scrollBy({ left: dir * 350, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com'
    fetch(`${API_URL}/api/settings/home_page?lang=${i18n.language}`)
      .then(res => res.json())
      .then(data => {
        let val = data;
        if (typeof val === 'string') {
          try { val = JSON.parse(val); } catch (e) { }
        }
        if (!val.error) setSettings(val)
      })
      .catch(console.error)
  }, [i18n.language])

  const lang = i18n.language === 'en' ? 'en' : 'vi'
  
  // Convert flat defaultSettings to match API structure
  const defaultSettings = {
    hero: {
      eyebrow: "ĐỐI TÁC LOGISTICS TIN CẬY", eyebrow_en: "TRUSTED LOGISTICS PARTNER",
      title_line1: "Vận chuyển ", title_line1_en: "Safe, ",
      title_hl1: "an toàn", title_hl1_en: "fast",
      title_line2: "\nnhanh chóng và ", title_line2_en: "\nand ",
      title_hl2: "toàn diện", title_hl2_en: "comprehensive",
      title_line3: "\ncho doanh nghiệp của bạn", title_line3_en: "\ntransport for your business",
      lead: "Kết nối 120+ quốc gia — giải pháp vận tải biển, hàng không, đường bộ và kho bãi tối ưu chi phí cho chuỗi cung ứng của bạn. Cam kết giao hàng đúng hẹn 98%.",
      lead_en: "Connecting 120+ countries — cost-optimized sea, air, road freight and warehousing solutions for your supply chain. 98% on-time delivery commitment."
    },
    services: [
      { img: '/Shippinglines.jpg', badge: 'SHIPPING', badge_en: 'SHIPPING', title: 'Vận tải biển (FCL & LCL)', title_en: 'Sea Freight (FCL & LCL)', desc: 'Booking container tuyến toàn cầu, đàm phán giá cước cạnh tranh với 50+ hãng tàu hàng đầu. Hỗ trợ hàng nguy hiểm, quá khổ, reefer và project cargo.', desc_en: 'Global route container booking, competitive freight negotiation with 50+ top shipping lines. Support dangerous goods, oversized, reefer and project cargo.', link: '/services/shipping-lines' },
      { img: '/AirFreight.jpg', badge: 'AIR FREIGHT', badge_en: 'AIR FREIGHT', title: 'Vận tải hàng không', title_en: 'Air Freight', desc: 'Giải pháp air freight cho hàng khẩn cấp và giá trị cao. Kết nối 80+ sân bay quốc tế với thời gian transit nhanh nhất thị trường.', desc_en: 'Air freight solutions for urgent and high-value cargo. Connecting 80+ international airports with the fastest transit time.', link: '/services/scheduled-flights' },
      { img: '/INTERMODA.jpg', badge: 'INTERMODAL', badge_en: 'INTERMODAL', title: 'Vận tải đa phương thức', title_en: 'Intermodal Transport', desc: 'Kết hợp linh hoạt đường biển – bộ – sắt – hàng không. Tối ưu chi phí và thời gian cho từng tuyến vận chuyển cụ thể.', desc_en: 'Flexible combination of sea - road - rail - air. Optimize cost and time for each specific route.', link: '/services/intermodal' },
      { img: '/Logictis.jpg', badge: 'LOGISTICS', badge_en: 'LOGISTICS', title: 'Kho bãi & Phân phối', title_en: 'Warehousing & Distribution', desc: 'Hệ thống kho 15.000m² với WMS hiện đại. Cross-docking, pick-pack, quản lý tồn kho và dịch vụ last-mile delivery.', desc_en: '15,000m² warehouse system with modern WMS. Cross-docking, pick-pack, inventory management and last-mile delivery services.', link: '/services/logistics' },
      { img: '/OURRANGE.jpg', badge: 'CUSTOMS', badge_en: 'CUSTOMS', title: 'Thủ tục Hải quan', title_en: 'Customs Clearance', desc: 'Đội ngũ chuyên viên hải quan giàu kinh nghiệm. Tư vấn mã HS, C/O, xử lý hồ sơ XNK. Cam kết thông quan trong 24 giờ.', desc_en: 'Experienced customs specialists. HS code, C/O consulting, import-export profile handling. 24-hour clearance commitment.', link: '/services/dedicated' },
      { img: '/Chacracter.jpg', badge: 'CONSULTING', badge_en: 'CONSULTING', title: 'Tư vấn chuỗi cung ứng', title_en: 'Supply Chain Consulting', desc: 'Phân tích và tối ưu toàn bộ supply chain: lộ trình, chi phí, rủi ro. Thiết kế giải pháp SCM tùy chỉnh cho từng ngành hàng.', desc_en: 'Analyze and optimize entire supply chain: routing, cost, risk. Design custom SCM solutions for each industry.', link: '/services/charters' }
    ],
    why_choose_us: [
      { icon: '🌐', title: 'Mạng lưới toàn cầu', title_en: 'Global Network', desc: 'Đối tác đại lý tại 120+ quốc gia. Kết nối liền mạch từ cảng xuất đến kho nhận hàng cuối cùng.', desc_en: 'Agent partners in 120+ countries. Seamless connection from export port to final receiving warehouse.' },
      { icon: '💰', title: 'Chi phí tối ưu', title_en: 'Optimal Cost', desc: 'Hợp đồng dài hạn với hãng tàu & hãng bay. Cam kết giá cước cạnh tranh nhất thị trường.', desc_en: 'Long-term contracts with shipping lines & airlines. Committed to the most competitive rates.' },
      { icon: '📊', title: 'Công nghệ hiện đại', title_en: 'Modern Technology', desc: 'Cổng khách hàng online, tracking real-time, API tích hợp ERP. Quản lý lô hàng mọi lúc, mọi nơi.', desc_en: 'Online customer portal, real-time tracking, ERP integrated API. Manage shipments anytime, anywhere.' },
      { icon: '⏰', title: 'Phản hồi nhanh 2h', title_en: '2h Fast Response', desc: 'Đội ngũ chuyên viên response trong 2 giờ làm việc. Account Manager riêng cho mỗi khách hàng.', desc_en: 'Specialist response within 2 working hours. Dedicated Account Manager for each client.' },
      { icon: '🛡️', title: 'An toàn & Bảo hiểm', title_en: 'Safety & Insurance', desc: 'Bảo hiểm hàng hóa toàn trình. Quy trình đóng gói, xếp dỡ và vận chuyển đạt chuẩn quốc tế.', desc_en: 'End-to-end cargo insurance. Packaging, loading and transport process meets international standards.' },
      { icon: '📋', title: 'Chứng chỉ quốc tế', title_en: 'International Certificates', desc: 'ISO 9001, ISO 14001, AEO, FIATA, IATA. Đảm bảo chất lượng dịch vụ ở tiêu chuẩn cao nhất.', desc_en: 'ISO 9001, ISO 14001, AEO, FIATA, IATA. Ensure service quality at the highest standard.' },
      { icon: '🌱', title: 'Logistics xanh', title_en: 'Green Logistics', desc: 'Cam kết Net-Zero 2035. Ưu tiên phương tiện thân thiện môi trường và tối ưu carbon footprint.', desc_en: 'Net-Zero 2035 commitment. Prioritize eco-friendly vehicles and optimize carbon footprint.' },
      { icon: '🤝', title: 'Đồng hành dài hạn', title_en: 'Long-term Partnership', desc: 'Tư vấn chiến lược SCM, không chỉ xử lý đơn hàng. Mối quan hệ đối tác thay vì giao dịch ngắn hạn.', desc_en: 'SCM strategy consulting, not just order processing. Partnership over short-term transactions.' }
    ],
    process: [
      { num: '01', title: 'Yêu cầu báo giá', title_en: 'Quote Request', desc: 'Gửi thông tin lô hàng qua form, email hoặc hotline. Nhận báo giá chi tiết trong 2 giờ.', desc_en: 'Send shipment details via form, email or hotline. Receive detailed quote in 2 hours.' },
      { num: '02', title: 'Xác nhận & Booking', title_en: 'Confirm & Booking', desc: 'Chốt phương án vận chuyển, xác nhận lịch trình và booking slot tàu/máy bay.', desc_en: 'Finalize transport plan, confirm schedule and book vessel/flight slot.' },
      { num: '03', title: 'Vận chuyển & Tracking', title_en: 'Transport & Tracking', desc: 'Lô hàng được xử lý chuyên nghiệp. Theo dõi real-time qua cổng khách hàng.', desc_en: 'Shipment handled professionally. Real-time tracking via customer portal.' },
      { num: '04', title: 'Giao hàng & Báo cáo', title_en: 'Delivery & Report', desc: 'Nhận hàng đúng hẹn. Báo cáo chi tiết về chi phí, thời gian và hiệu suất.', desc_en: 'On-time delivery. Detailed reporting on cost, time and performance.' }
    ]
  }

  const s = settings || defaultSettings;
  const getF = (obj, field, defObj) => {
    if (lang === 'en') {
      if (obj[`${field}_en`]) return obj[`${field}_en`];
      if (defObj && defObj[`${field}_en`]) return defObj[`${field}_en`];
    }
    return obj[field] || (defObj && defObj[field]) || '';
  }

  const t_ui = {
    vi: {
      btn_quote: "Tính cước ngay",
      btn_explore: "Khám phá dịch vụ →",
      news_kicker: "TIN TỨC & INSIGHTS",
      news_h2: "Cập nhật mới nhất từ ngành logistics",
      news_read_more: "Đọc thêm →",
      svc_kicker: "DỊCH VỤ CỦA CHÚNG TÔI",
      svc_h2: "Giải pháp logistics toàn diện",
      svc_p: "Với năng lực vận hành đa kênh, chúng tôi thiết kế và triển khai giải pháp vận tải tối ưu cho mọi loại hàng hóa trên toàn chuỗi cung ứng.",
      svc_find_more: "Tìm hiểu thêm →",
      why_kicker: "TẠI SAO CHỌN STELLA",
      why_h2: "Lợi thế cạnh tranh vượt trội",
      why_p: "Chúng tôi không chỉ vận chuyển hàng hóa — chúng tôi kiến tạo giải pháp giúp doanh nghiệp bạn phát triển.",
      proc_kicker: "QUY TRÌNH",
      proc_h2: "Vận hành đơn giản, hiệu quả tối đa",
      proc_p: "Chỉ cần 4 bước đơn giản để lô hàng của bạn được vận chuyển an toàn đến đích.",
      ind_kicker: "NGÀNH HÀNG",
      ind_h2: "Phục vụ đa dạng lĩnh vực",
      ind_p: "Chúng tôi am hiểu đặc thù từng ngành để đưa ra giải pháp logistics phù hợp nhất.",
      inds: [
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
      ],
      promo_kicker: "CÔNG NGHỆ SỐ",
      promo_h2: "Cổng khách hàng trực tuyến",
      promo_p: "Quản lý toàn bộ lô hàng, chứng từ và báo cáo trên một nền tảng duy nhất — mọi lúc, mọi nơi.",
      promo_lis: [
        "Tracking lô hàng real-time 24/7",
        "Quản lý chứng từ điện tử (B/L, Invoice, Packing List)",
        "Dashboard báo cáo chi phí & hiệu suất",
        "API tích hợp trực tiếp với ERP/WMS",
        "Thông báo tự động qua email & SMS"
      ],
      partner_kicker: "ĐỐI TÁC & CHỨNG CHỈ",
      partner_h2: "Đồng hành cùng các tổ chức hàng đầu",
      cta_h2: "Sẵn sàng tối ưu chuỗi cung ứng?",
      cta_p: "Liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá chi tiết từ đội ngũ chuyên gia logistics Stella Shipping.",
      cta_btn1: "Yêu cầu tư vấn miễn phí",
      cta_btn2: "Tính cước vận chuyển"
    },
    en: {
      btn_quote: "Get Quote Now",
      btn_explore: "Explore Services →",
      news_kicker: "NEWS & INSIGHTS",
      news_h2: "Latest updates from logistics industry",
      news_read_more: "Read more →",
      svc_kicker: "OUR SERVICES",
      svc_h2: "Comprehensive logistics solutions",
      svc_p: "With multi-channel operational capacity, we design and implement optimal transport solutions for all cargo types across the supply chain.",
      svc_find_more: "Find out more →",
      why_kicker: "WHY CHOOSE STELLA",
      why_h2: "Outstanding competitive advantages",
      why_p: "We don't just transport goods — we create solutions to help your business grow.",
      proc_kicker: "PROCESS",
      proc_h2: "Simple operation, maximum efficiency",
      proc_p: "Just 4 simple steps to get your cargo transported safely to its destination.",
      ind_kicker: "INDUSTRIES",
      ind_h2: "Serving diverse sectors",
      ind_p: "We understand industry specifics to provide the most suitable logistics solutions.",
      inds: [
        { icon: '🏭', name: 'Manufacturing' },
        { icon: '🛒', name: 'Retail & FMCG' },
        { icon: '💻', name: 'Electronics & IT' },
        { icon: '🏗️', name: 'Construction' },
        { icon: '🧪', name: 'Chemicals' },
        { icon: '🥗', name: 'Food' },
        { icon: '👗', name: 'Textile & Footwear' },
        { icon: '🚗', name: 'Automotive & Parts' },
        { icon: '💊', name: 'Pharmaceuticals' },
        { icon: '⚡', name: 'Energy' },
        { icon: '🪵', name: 'Wood & Furniture' },
        { icon: '🌾', name: 'Agriculture' },
      ],
      promo_kicker: "DIGITAL TECHNOLOGY",
      promo_h2: "Online Customer Portal",
      promo_p: "Manage all shipments, documents and reports on a single platform — anytime, anywhere.",
      promo_lis: [
        "24/7 real-time shipment tracking",
        "Electronic document management (B/L, Invoice, Packing List)",
        "Cost & performance reporting dashboard",
        "Direct API integration with ERP/WMS",
        "Automated email & SMS notifications"
      ],
      partner_kicker: "PARTNERS & CERTIFICATES",
      partner_h2: "Partnering with leading organizations",
      cta_h2: "Ready to optimize your supply chain?",
      cta_p: "Contact us today to get a free consultation and detailed quote from Stella Shipping's logistics expert team.",
      cta_btn1: "Request free consultation",
      cta_btn2: "Calculate freight cost"
    }
  }

  const tt = t_ui[lang];


  function handleChange(e) {
    const { name, value } = e.target
    setQuote((s) => ({ ...s, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com'
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quote.name,
          company: quote.company,
          email: quote.email,
          phone: quote.phone,
          origin: quote.origin,
          destination: quote.destination,
          service: quote.service,
          cargo: quote.quantity,
          note: quote.note || `Yêu cầu từ form báo giá nhanh trang chủ`
        })
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setQuote({ name: '', company: '', email: '', phone: '', origin: '', destination: '', service: 'sea_fcl', quantity: '', note: '' })
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
            <div className="eyebrow rv">{getF(s.hero, 'eyebrow', defaultSettings.hero)}</div>
            <h1 className="rv d1">
              {getF(s.hero, 'title_line1', defaultSettings.hero)} <span className="hl">{getF(s.hero, 'title_hl1', defaultSettings.hero)}</span><br />
              {getF(s.hero, 'title_line2', defaultSettings.hero)} <span className="hl">{getF(s.hero, 'title_hl2', defaultSettings.hero)}</span><br />
              {getF(s.hero, 'title_line3', defaultSettings.hero)}
            </h1>
            <p className="lead rv d2">
              {getF(s.hero, 'lead', defaultSettings.hero)}
            </p>
            <div className="hm-hero-cta rv d3">
              <a className="btn btn-primary" href="/pricing">{tt.btn_quote}</a>
              <a className="btn-ghost" href="/services">{tt.btn_explore}</a>
            </div>
          </div>

          <div className="hm-quote rv d2">
            <h4>{t('home.quote_title')}</h4>
            <p className="sub">{t('home.quote_sub')}</p>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '28px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
                <p style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0f2b57' }}>{t('home.quote_success_title')}</p>
                <p style={{ color: '#7b8a9a', margin: '8px 0 0', fontSize: 13 }}>{t('home.quote_success_sub')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '👤 Full Name *' : '👤 Họ tên *'}</label>
                    <input name="name" placeholder={i18n.language === 'en' ? 'John Doe' : 'Nguyễn Văn A'} value={quote.name} onChange={handleChange} required />
                  </div>
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '🏢 Company' : '🏢 Tên công ty'}</label>
                    <input name="company" placeholder={i18n.language === 'en' ? 'Company Name' : 'Tên công ty'} value={quote.company} onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '✉️ Email *' : '✉️ Email *'}</label>
                    <input name="email" type="email" placeholder={i18n.language === 'en' ? 'email@company.com' : 'email@company.com'} value={quote.email} onChange={handleChange} required />
                  </div>
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '📞 Phone' : '📞 Điện thoại'}</label>
                    <input name="phone" placeholder={i18n.language === 'en' ? '+1 234 567 890' : '0901 234 567'} value={quote.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '📍 Origin' : '📍 Nơi đi'}</label>
                    <input name="origin" placeholder={i18n.language === 'en' ? 'HCMC, Vietnam' : 'TP.HCM, Việt Nam'} value={quote.origin} onChange={handleChange} />
                  </div>
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '🚩 Destination' : '🚩 Nơi đến'}</label>
                    <input name="destination" placeholder={i18n.language === 'en' ? 'Rotterdam, Netherlands' : 'Rotterdam, Hà Lan'} value={quote.destination} onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '📦 Service' : '📦 Dịch vụ'}</label>
                    <select name="service" value={quote.service} onChange={handleChange}>
                      <option value="sea_fcl">{i18n.language === 'en' ? '🚢 Sea Freight (FCL)' : '🚢 Vận tải biển (FCL)'}</option>
                      <option value="sea_lcl">{i18n.language === 'en' ? '📦 Sea Freight (LCL)' : '📦 Vận tải biển (LCL)'}</option>
                      <option value="air">{i18n.language === 'en' ? '✈️ Air Freight' : '✈️ Vận tải hàng không'}</option>
                      <option value="road">{i18n.language === 'en' ? '🚛 Road Freight' : '🚛 Vận tải đường bộ'}</option>
                      <option value="warehouse">{i18n.language === 'en' ? '🏭 Warehousing' : '🏭 Kho bãi'}</option>
                    </select>
                  </div>
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '⚖️ Quantity / Cargo' : '⚖️ Số lượng / Hàng hóa'}</label>
                    <input name="quantity" placeholder={i18n.language === 'en' ? 'Ex: 2x40HC electronics' : 'VD: 2 cont 40HC hàng điện tử'} value={quote.quantity} onChange={handleChange} />
                  </div>
                </div>
                <div className="row" style={{ marginBottom: 16 }}>
                  <div className="hm-form-group">
                    <label>{i18n.language === 'en' ? '📝 Notes' : '📝 Ghi chú'}</label>
                    <textarea name="note" placeholder={i18n.language === 'en' ? 'Special requirements, estimated time...' : 'Yêu cầu đặc biệt, thời gian dự kiến...'} value={quote.note} onChange={handleChange} rows={2} style={{ resize: 'vertical' }} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? (i18n.language === 'en' ? 'Sending...' : 'Đang gửi...') : (i18n.language === 'en' ? 'Send Request' : 'Gửi yêu cầu')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>




      {/* ═══════════════ 9. TIN TỨC & INSIGHTS ═══════════════ */}
      <section className="hm-section">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.news_kicker}</div>
          <h2>{tt.news_h2}</h2>
          <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button onClick={() => scrollNews(-1)} style={{ background: '#fff', border: '1px solid #e1e8ef', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: '#0f2b57', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#f36c1f'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e8ef'}>❮</button>
            <button onClick={() => scrollNews(1)} style={{ background: '#fff', border: '1px solid #e1e8ef', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', color: '#0f2b57', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = '#f36c1f'} onMouseLeave={e => e.currentTarget.style.borderColor = '#e1e8ef'}>❯</button>
          </div>
        </div>
        <div className="hm-news-grid hm-mobile-slider" ref={newsSliderRef}>
          {(articles && articles.filter(a => a.status === 'published').length > 0
            ? articles.filter(a => a.status === 'published')
            : [
              { id: 1, img: '/Banner.jpg', category: 'NGÀNH', title: 'Xu hướng logistics xanh 2024: Cơ hội và thách thức', desc: 'Phân tích chi tiết về các sáng kiến giảm carbon trong vận tải biển và tác động đến chi phí chuỗi cung ứng.', date: '12/08/2024' },
              { id: 2, img: '/AirFreight.jpg', category: 'DỊCH VỤ', title: 'Stella mở tuyến air freight trực tiếp TP.HCM – Frankfurt', desc: 'Rút ngắn thời gian transit xuống 2 ngày so với tuyến truyền thống, phục vụ nhu cầu hàng khẩn cấp sang EU.', date: '05/08/2024' },
              { id: 3, img: '/INTERMODA.jpg', category: 'CÔNG NGHỆ', title: 'Ra mắt Cổng khách hàng 3.0 với AI dự đoán ETA', desc: 'Ứng dụng trí tuệ nhân tạo để dự đoán thời gian đến chính xác đến 95%, giúp khách hàng chủ động lên kế hoạch.', date: '28/07/2024' }
            ]
          ).map((n, i) => (
            <div key={i} className="hm-news-card">
              <img src={n.img || '/Banner.jpg'} alt={n.title} />
              <div className="hm-news-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div className="tag" style={{ marginBottom: 0 }}>{n.category || 'TIN TỨC'}</div>
                  <div style={{ fontSize: 12, color: '#7b8a9a', fontWeight: 600 }}>
                    {n.date ? n.date : n.created_at ? new Date(n.created_at).toLocaleDateString('vi-VN') : ''}
                  </div>
                </div>
                <h4>{n.title}</h4>
                <p>{n.desc}</p>
                <a href={n.id ? `/news/${n.id}` : "/news"}>{tt.news_read_more}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 4. DỊCH VỤ CHÍNH ═══════════════ */}
      <section className="hm-section hm-section-alt">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.svc_kicker}</div>
          <h2>{tt.svc_h2}</h2>
          <p>{tt.svc_p}</p>
        </div>
        <div className="hm-svc-grid hm-mobile-slider">
          {s.services.map((svc, i) => {
            const dSvc = defaultSettings.services[i] || {};
            return (
              <div key={i} className={`hm-svc-card rv d${Math.min(i + 1, 5)}`}>
                <div className="hm-svc-badge">{getF(svc, 'badge', dSvc)}</div>
                <img src={svc.img} alt={getF(svc, 'title', dSvc)} />
                <div className="hm-svc-card-body">
                  <h3>{getF(svc, 'title', dSvc)}</h3>
                  <p>{getF(svc, 'desc', dSvc)}</p>
                  <a className="hm-svc-link" href={svc.link}>{tt.svc_find_more}</a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════ 5. TẠI SAO CHỌN CHÚNG TÔI ═══════════════ */}
      <section className="hm-section hm-section-alt">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.why_kicker}</div>
          <h2>{tt.why_h2}</h2>
          <p>{tt.why_p}</p>
        </div>
        <div className="hm-why-grid hm-mobile-slider">
          {s.why_choose_us.map((w, i) => {
            const dWhy = defaultSettings.why_choose_us[i] || {};
            return (
              <div key={i} className={`hm-why-card rv d${Math.min(i + 1, 5)}`}>
                <div className="hm-why-icon">{w.icon}</div>
                <h4>{getF(w, 'title', dWhy)}</h4>
                <p>{getF(w, 'desc', dWhy)}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════ 6. QUY TRÌNH LÀM VIỆC ═══════════════ */}
      <section className="hm-section">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.proc_kicker}</div>
          <h2>{tt.proc_h2}</h2>
          <p>{tt.proc_p}</p>
        </div>
        <div className="hm-process hm-mobile-slider">
          {s.process.map((step, i) => {
            const dStep = defaultSettings.process[i] || {};
            return (
              <div key={i} className={`hm-step rv d${i + 1}`}>
                <div className="hm-step-num">{step.num}</div>
                <h4>{getF(step, 'title', dStep)}</h4>
                <p>{getF(step, 'desc', dStep)}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════ 7. NGÀNH HÀNG PHỤC VỤ ═══════════════ */}
      <section className="hm-section hm-section-dark">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.ind_kicker}</div>
          <h2>{tt.ind_h2}</h2>
          <p>{tt.ind_p}</p>
        </div>
        <div className="hm-ind-grid hm-mobile-slider">
          {tt.inds.map((ind, i) => (
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
            <div className="kicker">{tt.promo_kicker}</div>
            <h2>{tt.promo_h2}</h2>
            <p>{tt.promo_p}</p>
            <ul>
              {tt.promo_lis.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ 11. ĐỐI TÁC ═══════════════ */}
      <section className="hm-section hm-section-alt">
        <div className="hm-section-hdr rv">
          <div className="kicker">{tt.partner_kicker}</div>
          <h2>{tt.partner_h2}</h2>
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
        <h2 className="rv">{tt.cta_h2}</h2>
        <p className="rv d1">{tt.cta_p}</p>
        <div className="hm-cta-btns rv d2">
          <a href="/contact" className="cta-w">{tt.cta_btn1}</a>
          <a href="/pricing" className="cta-o">{tt.cta_btn2}</a>
        </div>
      </section>
    </div>
  )
}
