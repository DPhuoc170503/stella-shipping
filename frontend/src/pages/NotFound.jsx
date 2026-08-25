import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const css = `
  .nf-page{font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);color:#fff;position:relative;overflow:hidden;padding:40px 20px}

  /* Waves bg */
  .nf-waves{position:absolute;bottom:0;left:0;width:100%;height:180px;z-index:0}
  .nf-wave{position:absolute;bottom:0;left:0;width:200%;height:100%;animation:nf-wave-move 8s ease-in-out infinite alternate;opacity:.15}
  .nf-wave:nth-child(2){animation-duration:6s;animation-direction:alternate-reverse;opacity:.1;bottom:10px}
  .nf-wave:nth-child(3){animation-duration:10s;opacity:.07;bottom:20px}
  @keyframes nf-wave-move{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

  /* Floating particles */
  .nf-particles{position:absolute;inset:0;pointer-events:none;z-index:0}
  .nf-particle{position:absolute;width:4px;height:4px;background:rgba(243,108,31,.3);border-radius:50%;animation:nf-float 6s ease-in-out infinite}
  .nf-particle:nth-child(2){width:6px;height:6px;left:20%;top:30%;animation-duration:8s;animation-delay:1s;background:rgba(243,108,31,.2)}
  .nf-particle:nth-child(3){width:3px;height:3px;left:70%;top:20%;animation-duration:7s;animation-delay:2s;background:rgba(255,255,255,.15)}
  .nf-particle:nth-child(4){width:5px;height:5px;left:80%;top:60%;animation-duration:9s;animation-delay:.5s;background:rgba(243,108,31,.15)}
  .nf-particle:nth-child(5){width:4px;height:4px;left:40%;top:70%;animation-duration:6.5s;animation-delay:3s;background:rgba(255,255,255,.1)}
  @keyframes nf-float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-30px) rotate(180deg)}}

  .nf-content{position:relative;z-index:2;text-align:center;max-width:600px}

  /* Ship animation */
  .nf-ship{font-size:80px;margin-bottom:24px;display:inline-block;animation:nf-rock 3s ease-in-out infinite}
  @keyframes nf-rock{0%,100%{transform:rotate(-5deg) translateY(0)}50%{transform:rotate(5deg) translateY(-10px)}}

  .nf-code{font-size:120px;font-weight:900;margin:0;line-height:1;font-family:'Be Vietnam Pro',sans-serif;
    background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.6) 100%);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    text-shadow:none;letter-spacing:-2px}
  .nf-title{font-size:28px;font-weight:700;margin:12px 0 16px;font-family:'Be Vietnam Pro',sans-serif}
  .nf-desc{font-size:16px;color:rgba(255,255,255,.65);line-height:1.7;margin:0 0 36px}

  /* Buttons */
  .nf-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
  .nf-btn{padding:14px 28px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;transition:all .3s cubic-bezier(.22,1,.36,1);display:inline-flex;align-items:center;gap:8px;cursor:pointer;border:none}
  .nf-btn-primary{background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;box-shadow:0 8px 24px rgba(243,108,31,.3)}
  .nf-btn-primary:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(243,108,31,.4)}
  .nf-btn-ghost{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15)}
  .nf-btn-ghost:hover{background:rgba(255,255,255,.14);transform:translateY(-3px)}

  /* Quick links */
  .nf-links{margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08)}
  .nf-links-title{font-size:13px;color:rgba(255,255,255,.4);letter-spacing:2px;font-weight:700;margin:0 0 16px;text-transform:uppercase}
  .nf-links-grid{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .nf-qlink{padding:8px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:rgba(255,255,255,.7);font-size:13px;text-decoration:none;transition:all .25s;font-weight:500}
  .nf-qlink:hover{background:rgba(243,108,31,.12);border-color:rgba(243,108,31,.3);color:#f36c1f}

  @media(max-width:600px){
    .nf-code{font-size:80px}
    .nf-title{font-size:22px}
    .nf-ship{font-size:56px}
    .nf-actions{flex-direction:column;align-items:center}
  }
`

export default function NotFound() {
  const [seconds, setSeconds] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timer)
          window.location.href = '/'
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="nf-page">
      <SEO title="404 - Không tìm thấy trang" />
      <style>{css}</style>

      {/* Background effects */}
      <div className="nf-particles">
        <div className="nf-particle" style={{left:'10%',top:'15%'}} />
        <div className="nf-particle" />
        <div className="nf-particle" />
        <div className="nf-particle" />
        <div className="nf-particle" />
      </div>
      <div className="nf-waves">
        <svg className="nf-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,100 L0,100Z" fill="rgba(243,108,31,.3)"/>
        </svg>
        <svg className="nf-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,60 C240,10 480,90 720,40 C960,0 1200,80 1440,30 L1440,100 L0,100Z" fill="rgba(255,255,255,.15)"/>
        </svg>
        <svg className="nf-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,30 C300,90 600,10 900,60 C1100,90 1300,20 1440,50 L1440,100 L0,100Z" fill="rgba(15,43,87,.4)"/>
        </svg>
      </div>

      <div className="nf-content">
        <div className="nf-ship">🚢</div>
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Lô hàng không tìm thấy!</h2>
        <p className="nf-desc">
          Trang bạn đang tìm kiếm đã bị di chuyển, xóa hoặc không tồn tại.
          Đừng lo — hãy để chúng tôi đưa bạn về đúng hướng.
          <br/>
          <span style={{fontSize:'13px',opacity:.5}}>Tự động chuyển về trang chủ sau {seconds}s</span>
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn-primary">
            🏠 Về Trang Chủ
          </Link>
          <Link to="/contact" className="nf-btn nf-btn-ghost">
            📞 Liên hệ hỗ trợ
          </Link>
        </div>

        <div className="nf-links">
          <p className="nf-links-title">Trang phổ biến</p>
          <div className="nf-links-grid">
            <Link to="/services" className="nf-qlink">Dịch vụ</Link>
            <Link to="/pricing" className="nf-qlink">Bảng giá</Link>
            <Link to="/news" className="nf-qlink">Tin tức</Link>
            <Link to="/about" className="nf-qlink">Về chúng tôi</Link>
            <Link to="/contact" className="nf-qlink">Liên hệ</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
