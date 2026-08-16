import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/* ═══════════════════════════════════════════ CSS ═══════════════════════════════════════════ */
const footerCSS = `
  /* ── Footer main ── */
  .sf-footer{
    background:linear-gradient(180deg,#081d34 0%,#0a1e3d 40%,#0f2b57 100%);
    color:rgba(255,255,255,.85);
    padding:0;
    margin-top:0;
    font-family:'Inter',sans-serif;
    position:relative;
    overflow:hidden;
  }
  .sf-footer::before{
    content:'';position:absolute;top:-180px;right:-120px;
    width:500px;height:500px;
    background:radial-gradient(circle,rgba(243,108,31,.06) 0%,transparent 70%);
    pointer-events:none;
  }
  .sf-footer::after{
    content:'';position:absolute;bottom:-200px;left:-150px;
    width:600px;height:600px;
    background:radial-gradient(circle,rgba(15,43,87,.3) 0%,transparent 70%);
    pointer-events:none;
  }

  /* ── Top accent bar ── */
  .sf-accent-bar{
    height:4px;
    background:linear-gradient(90deg,#f36c1f,#e05a10,#f36c1f);
    background-size:200% 100%;
    animation:sf-shimmer 3s ease-in-out infinite;
  }
  @keyframes sf-shimmer{
    0%,100%{background-position:0% 50%}
    50%{background-position:100% 50%}
  }

  /* ── Container ── */
  .sf-inner{
    max-width:1200px;margin:0 auto;
    padding:64px 28px 40px;
    position:relative;z-index:1;
  }

  /* ── Grid layout ── */
  .sf-grid{
    display:grid;
    grid-template-columns:1.4fr 1fr 1fr 1.2fr;
    gap:48px;
    margin-bottom:48px;
  }

  /* ── Brand column ── */
  .sf-brand-logo{
    height:54px;display:block;margin-bottom:8px;
    /* giữ nguyên màu gốc của logo */
    transition:transform .3s ease;
  }
  .sf-brand-logo:hover{transform:scale(1.04)}
  .sf-brand-tagline{
    display:inline-block;
    color:#f36c1f;font-weight:700;letter-spacing:3px;
    font-size:11px;margin-bottom:16px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .sf-brand-desc{
    color:rgba(255,255,255,.6);font-size:14px;line-height:1.7;
    margin:0 0 24px;max-width:320px;
  }

  /* ── Newsletter box ── */
  .sf-newsletter{
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    border-radius:12px;padding:20px;
  }
  .sf-newsletter h5{
    margin:0 0 6px;font-size:14px;color:#fff;
    font-family:'Be Vietnam Pro',sans-serif;font-weight:700;
  }
  .sf-newsletter p{
    margin:0 0 14px;font-size:12px;color:rgba(255,255,255,.5);
  }
  .sf-newsletter-form{display:flex;gap:8px}
  .sf-newsletter-input{
    flex:1;padding:10px 14px;
    border:1px solid rgba(255,255,255,.12);
    border-radius:8px;background:rgba(255,255,255,.06);
    color:#fff;font-size:13px;
    transition:border-color .25s,background .25s;
    outline:none;
  }
  .sf-newsletter-input::placeholder{color:rgba(255,255,255,.35)}
  .sf-newsletter-input:focus{
    border-color:#f36c1f;background:rgba(255,255,255,.08);
  }
  .sf-newsletter-btn{
    padding:10px 18px;background:linear-gradient(135deg,#f36c1f,#e05a10);
    color:#fff;border:none;border-radius:8px;font-weight:700;
    font-size:13px;cursor:pointer;
    transition:transform .2s,box-shadow .2s;
    white-space:nowrap;
  }
  .sf-newsletter-btn:hover{
    transform:translateY(-1px);
    box-shadow:0 6px 20px rgba(243,108,31,.35);
  }
  .sf-newsletter-ok{color:#4ade80;font-size:13px;margin-top:8px}

  /* ── Column titles ── */
  .sf-col-title{
    font-family:'Be Vietnam Pro',sans-serif;
    font-size:13px;font-weight:700;letter-spacing:2.5px;
    color:#fff;margin:0 0 20px;
    text-transform:uppercase;
    position:relative;padding-bottom:12px;
  }
  .sf-col-title::after{
    content:'';position:absolute;bottom:0;left:0;
    width:28px;height:3px;border-radius:3px;
    background:linear-gradient(90deg,#f36c1f,#e05a10);
  }

  /* ── Link lists ── */
  .sf-links{list-style:none;padding:0;margin:0}
  .sf-links li{margin:0 0 12px}
  .sf-links a{
    color:rgba(255,255,255,.6);text-decoration:none;
    font-size:14px;display:inline-flex;align-items:center;gap:8px;
    transition:color .2s,transform .2s,gap .2s;
  }
  .sf-links a:hover{color:#f36c1f;transform:translateX(4px);gap:12px}
  .sf-links a .sf-arrow{
    font-size:10px;opacity:0;transition:opacity .2s;
  }
  .sf-links a:hover .sf-arrow{opacity:1}

  /* ── Contact items ── */
  .sf-contact-item{
    display:flex;align-items:flex-start;gap:14px;
    margin-bottom:18px;
  }
  .sf-contact-icon{
    width:38px;height:38px;border-radius:10px;
    background:rgba(243,108,31,.1);
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;transition:background .25s,transform .25s;
  }
  .sf-contact-item:hover .sf-contact-icon{
    background:rgba(243,108,31,.2);transform:scale(1.08);
  }
  .sf-contact-icon svg{width:16px;height:16px;fill:#f36c1f}
  .sf-contact-text{font-size:14px;color:rgba(255,255,255,.6);line-height:1.5}
  .sf-contact-text strong{display:block;color:rgba(255,255,255,.85);font-size:13px;margin-bottom:2px}

  /* ── Social row ── */
  .sf-social-row{display:flex;gap:10px;margin-top:24px}
  .sf-social-link{
    width:40px;height:40px;border-radius:10px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.08);
    display:flex;align-items:center;justify-content:center;
    transition:all .3s cubic-bezier(.22,1,.36,1);
    text-decoration:none;
  }
  .sf-social-link svg{width:18px;height:18px;fill:rgba(255,255,255,.6);transition:fill .3s}
  .sf-social-link:hover{
    background:rgba(243,108,31,.15);
    border-color:#f36c1f;
    transform:translateY(-3px);
  }
  .sf-social-link:hover svg{fill:#f36c1f}

  /* ── Divider ── */
  .sf-divider{
    border:none;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    margin:0 0 28px;
  }

  /* ── Bottom bar ── */
  .sf-bottom{
    display:flex;align-items:center;justify-content:space-between;
    flex-wrap:wrap;gap:16px;
  }
  .sf-copy{font-size:13px;color:rgba(255,255,255,.4)}
  .sf-copy a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
  .sf-copy a:hover{color:#f36c1f}
  .sf-bottom-links{display:flex;gap:24px}
  .sf-bottom-links a{
    font-size:13px;color:rgba(255,255,255,.4);
    text-decoration:none;transition:color .2s;
  }
  .sf-bottom-links a:hover{color:#f36c1f}
  .sf-bottom-badge{
    display:flex;align-items:center;gap:8px;
    padding:6px 14px;border-radius:20px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.06);
    font-size:12px;color:rgba(255,255,255,.5);
  }
  .sf-bottom-badge .sf-pulse{
    width:8px;height:8px;border-radius:50%;
    background:#4ade80;
    animation:sf-pulse-anim 2s ease-in-out infinite;
  }
  @keyframes sf-pulse-anim{
    0%,100%{opacity:1;transform:scale(1)}
    50%{opacity:.5;transform:scale(1.4)}
  }

  /* ── Responsive ── */
  @media(max-width:1024px){
    .sf-grid{grid-template-columns:1fr 1fr;gap:36px}
  }
  @media(max-width:600px){
    .sf-grid{grid-template-columns:1fr;gap:32px}
    .sf-inner{padding:40px 20px 28px}
    .sf-bottom{flex-direction:column;text-align:center}
    .sf-bottom-links{justify-content:center}
    .sf-newsletter-form{flex-direction:column}
  }
`

/* ═══════════════════════════ Component ═══════════════════════════ */
export default function FFotter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="sf-footer">
      <style>{footerCSS}</style>

      {/* Accent bar */}
      <div className="sf-accent-bar" />

      <div className="sf-inner">
        <div className="sf-grid">

          {/* ── 1. Brand & Newsletter ── */}
          <div>
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/stella-logo.png" alt="Stella Shipping" className="sf-brand-logo" />
            </Link>
            <span className="sf-brand-tagline">{t('footer.tagline')}</span>
            <p className="sf-brand-desc">
              {t('footer.desc')}
            </p>

            <div className="sf-newsletter">
              <h5>{t('footer.newsletter_title')}</h5>
              <p>{t('footer.newsletter_desc')}</p>
              <form className="sf-newsletter-form" onSubmit={handleSubscribe}>
                <input
                  className="sf-newsletter-input"
                  type="email"
                  placeholder={t('footer.newsletter_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="sf-newsletter-btn" type="submit">{t('footer.newsletter_btn')}</button>
              </form>
              {subscribed && <div className="sf-newsletter-ok">{t('footer.newsletter_success')}</div>}
            </div>
          </div>

          {/* ── 2. Quick Links ── */}
          <div>
            <h4 className="sf-col-title">{t('footer.explore')}</h4>
            <ul className="sf-links">
              <li><Link to="/about">{t('footer.about_us')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services">{t('footer.services')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/pricing">{t('footer.pricing')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/news">{t('footer.news_media')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/contact">{t('footer.contact')} <span className="sf-arrow">→</span></Link></li>
            </ul>
          </div>

          {/* ── 3. Services ── */}
          <div>
            <h4 className="sf-col-title">{t('footer.services_title')}</h4>
            <ul className="sf-links">
              <li><Link to="/services/shipping-lines">{t('footer.ocean_freight')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services/scheduled-flights">{t('footer.air_freight')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services/intermodal">{t('footer.intermodal')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services/logistics">{t('footer.logistics')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services/dedicated">{t('footer.dedicated')} <span className="sf-arrow">→</span></Link></li>
              <li><Link to="/services/charters">{t('footer.chartering')} <span className="sf-arrow">→</span></Link></li>
            </ul>
          </div>

          {/* ── 4. Contact & Social ── */}
          <div>
            <h4 className="sf-col-title">{t('footer.contact_title')}</h4>

            <div className="sf-contact-item">
              <div className="sf-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
              </div>
              <div className="sf-contact-text">
                <strong>{t('footer.hq')}</strong>
                {t('footer.hq_address')}
              </div>
            </div>

            <div className="sf-contact-item">
              <div className="sf-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </div>
              <div className="sf-contact-text">
                <strong>{t('footer.hotline')}</strong>
                +84 (28) 3822 xxxx
              </div>
            </div>

            <div className="sf-contact-item">
              <div className="sf-contact-icon">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>
              <div className="sf-contact-text">
                <strong>{t('footer.email')}</strong>
                stella@stellashipping.com.vn
              </div>
            </div>

            {/* Social */}
            <div className="sf-social-row">
              <a href="https://www.facebook.com/CDPlayer.StellaHouse" target="_blank" rel="noopener noreferrer" className="sf-social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom ── */}
        <hr className="sf-divider" />
        <div className="sf-bottom">
          <div className="sf-copy">
            © {new Date().getFullYear()} <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Stella Shipping</Link>. {t('footer.rights')}
          </div>
          <div className="sf-bottom-links">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.cookie')}</a>
          </div>
          <div className="sf-bottom-badge">
            <span className="sf-pulse" />
            {t('footer.system_status')}
          </div>
        </div>
      </div>
    </footer>
  )
}
