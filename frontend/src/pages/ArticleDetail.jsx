import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useArticles } from '../context/ArticlesContext'

import SEO from '../components/SEO'

export default function ArticleDetail() {
  const { id } = useParams()
  const { articles, loading } = useArticles()
  const navigate = useNavigate()

  const article = articles.find(a => a.id === parseInt(id))

  const [lightbox, setLightbox] = useState(null)

  const magazineRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLightbox(null)
  }, [id])

  // Scroll-reveal animation for inline magazine sections
  useEffect(() => {
    if (!magazineRef.current) return
    const sections = magazineRef.current.querySelectorAll('[data-animate]')
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dt-il-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  })



  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#153468' }}>
        <h2>Đang tải bài viết...</h2>
      </div>
    )
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#153468' }}>
        <h2 style={{ fontSize: '32px' }}>Không tìm thấy bài viết</h2>
        <p style={{ color: '#5a6f82', marginBottom: '24px' }}>Bài viết này không tồn tại hoặc đã bị xóa.</p>
        <button className="btn btn-primary" onClick={() => navigate('/news')}>← Quay lại Tin tức</button>
      </div>
    )
  }

  // Lấy danh sách bài viết liên quan (cùng danh mục, trừ bài hiện tại)
  const related = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com';
  const resolveImg = (src) => {
    if (!src) return '/Banner.jpg'
    if (src.includes('http') && src.lastIndexOf('http') > 0) {
      src = src.substring(src.lastIndexOf('http'))
    }
    if (src.startsWith('http')) return src
    if (src.startsWith('/uploads/')) return `${API_URL}${src}`
    return src
  }
  const imgUrl = resolveImg(article.img)

  const template = article.template || 'single'

  return (
    <div>
      <SEO
        title={article.title}
        description={article.desc || article.description}
        image={imgUrl}
        url={`${window.location.origin}/news/${article.id}`}
      />
      <style>{detailCSS}</style>

      {/* ═══════ HEADER ═══════ */}
      <div className="dt-hero" style={{ backgroundImage: `linear-gradient(rgba(15,43,87,0.7), rgba(15,43,87,0.85)), url(${imgUrl || '/Banner.jpg'})` }}>
        <div className="dt-hero-inner">
          <Link to="/news" className="dt-back">← Quay lại Tin tức</Link>
          <div className="dt-cat">{article.category}</div>
          <h1>{article.title}</h1>
          <div className="dt-meta">
            <span>✍️ {article.author || 'Stella Shipping'}</span>
            <span className="dot" />
            <span>📅 {article.date || 'Đang cập nhật'}</span>
            <span className="dot" />
            <span>📖 {article.readTime || '3 phút'}</span>
          </div>
        </div>
      </div>

      {/* ═══════ BODY ═══════ */}
      <div className="dt-container">
        <div className="dt-content">
          <div className="dt-lead" dangerouslySetInnerHTML={{ __html: article.desc }} />

          {/* ══════ TEMPLATE: SINGLE ══════ */}
          {template === 'single' && (
            <img src={imgUrl || '/Banner.jpg'} alt={article.title} className="dt-main-img" />
          )}


          {/* ══════ TEMPLATE: FLOW (alternating text + image) ══════ */}
          {template === 'flow' && (() => {
            const textBlocks = article.fullDesc ? article.fullDesc.split('<!-- SPLIT -->') : [''];
            const flowImgs = (article.galleryImages || []).map(resolveImg);
            const blockCount = Math.max(textBlocks.length, flowImgs.length);

            return (
              <div className="rp-report" ref={magazineRef}>
                {Array.from({ length: blockCount }).map((_, idx) => (
                  <div key={idx} className="rp-page" data-animate="true">
                    
                    {/* Header bar only on the first block */}
                    {idx === 0 && (
                      <div className="rp-page-header">
                        <span className="rp-brand">STELLA SHIPPING</span>
                        <span className="rp-sep">|</span>
                        <span className="rp-type">{article.category?.toUpperCase() || 'ARTICLE'}</span>
                      </div>
                    )}

                    {/* Image at TOP for subsequent blocks (matching inline style) */}
                    {idx > 0 && flowImgs[idx] && (
                      <div className="rp-img-container rp-img-top" onClick={() => setLightbox(flowImgs[idx])}>
                        <img src={flowImgs[idx]} alt={`Minh hoạ ${idx + 1}`} className="rp-img" />
                        <div className="rp-img-caption"><em>Ảnh: Stella Shipping</em></div>
                      </div>
                    )}

                    {/* Text content */}
                    <div className="rp-page-body">
                      {textBlocks[idx] && textBlocks[idx].trim() && (
                        <div
                          className="rp-text-block"
                          dangerouslySetInnerHTML={{ __html: textBlocks[idx].replace(/\n/g, '<br/>') }}
                        />
                      )}
                    </div>

                    {/* Image at BOTTOM for the first block */}
                    {idx === 0 && flowImgs[idx] && (
                      <div className="rp-img-container" onClick={() => setLightbox(flowImgs[idx])}>
                        <img src={flowImgs[idx]} alt={`Minh hoạ ${idx + 1}`} className="rp-img" />
                        <div className="rp-img-caption"><em>Ảnh: Stella Shipping</em></div>
                      </div>
                    )}

                    {/* Footer bar for all blocks */}
                    <div className="rp-page-footer">
                      <span>Stella Shipping</span>
                      <span>|</span>
                      <span>Trang {idx + 1} / {blockCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* ══════ TEMPLATE: INLINE (Professional Report Style) ══════ */}
          {template === 'inline' && (() => {
            const textBlocks = article.fullDesc ? article.fullDesc.split('<!-- SPLIT -->') : [''];
            const inlineImgs = [article.img2, article.img3, article.img4].map(src => src ? resolveImg(src) : null);
            // Collect pages: each page = { text, img (shown at top of that page) }
            // Page 1: intro text + main image (imgUrl)
            // Page 2: img2 + text block 2
            // Page 3: img3 + text block 3
            // Page 4 (optional): img4 or text block 4 (conclusion)
            
            return (
              <div className="rp-report" ref={magazineRef}>

                {/* ═══ PAGE 1 ═══ */}
                <div className="rp-page" data-animate="true">
                  <div className="rp-page-header">
                    <span className="rp-brand">STELLA SHIPPING</span>
                    <span className="rp-sep">|</span>
                    <span className="rp-type">{article.category?.toUpperCase() || 'MARKET UPDATE'}</span>
                  </div>

                  <div className="rp-page-body">
                    {/* Intro / Lead text */}
                    {textBlocks[0] && textBlocks[0].trim() && (
                      <div className="rp-text-block" dangerouslySetInnerHTML={{ __html: textBlocks[0].replace(/\n/g, '<br/>') }} />
                    )}
                  </div>

                  <div className="rp-page-footer">
                    <span>Stella Shipping</span>
                    <span>|</span>
                    <span>Logistics Market Update</span>
                  </div>
                </div>

                {/* ═══ PAGE 2 ═══ */}
                {(inlineImgs[0] || (textBlocks[1] && textBlocks[1].trim())) && (
                  <div className="rp-page" data-animate="true">
                    {inlineImgs[0] && (
                      <div className="rp-img-container rp-img-top" onClick={() => setLightbox(inlineImgs[0])}>
                        <img src={inlineImgs[0]} alt="Minh hoạ 2" className="rp-img" />
                      </div>
                    )}

                    <div className="rp-page-body">
                      {textBlocks[1] && textBlocks[1].trim() && (
                        <div className="rp-text-block" dangerouslySetInnerHTML={{ __html: textBlocks[1].replace(/\n/g, '<br/>') }} />
                      )}
                    </div>

                    <div className="rp-page-footer">
                      <span>Stella Shipping</span>
                      <span>|</span>
                      <span>Logistics Market Update</span>
                    </div>
                  </div>
                )}

                {/* ═══ PAGE 3 ═══ */}
                {(inlineImgs[1] || (textBlocks[2] && textBlocks[2].trim()) || inlineImgs[2] || (textBlocks[3] && textBlocks[3].trim())) && (
                  <div className="rp-page" data-animate="true">
                    {inlineImgs[1] && (
                      <div className="rp-img-container rp-img-top" onClick={() => setLightbox(inlineImgs[1])}>
                        <img src={inlineImgs[1]} alt="Minh hoạ 3" className="rp-img" />
                      </div>
                    )}

                    <div className="rp-page-body">
                      {textBlocks[2] && textBlocks[2].trim() && (
                        <div className="rp-text-block" dangerouslySetInnerHTML={{ __html: textBlocks[2].replace(/\n/g, '<br/>') }} />
                      )}

                      {/* If there's a 3rd image or 4th text block, include in same page */}
                      {inlineImgs[2] && (
                        <div className="rp-img-container rp-img-inline" onClick={() => setLightbox(inlineImgs[2])}>
                          <img src={inlineImgs[2]} alt="Minh hoạ 4" className="rp-img" />
                        </div>
                      )}

                      {textBlocks[3] && textBlocks[3].trim() && (
                        <div className="rp-text-block rp-text-sources" dangerouslySetInnerHTML={{ __html: textBlocks[3].replace(/\n/g, '<br/>') }} />
                      )}
                    </div>

                    <div className="rp-page-footer">
                      <span>Stella Shipping</span>
                      <span>|</span>
                      <span>Logistics Market Update</span>
                    </div>
                  </div>
                )}

              </div>
            );
          })()}

          {template !== 'inline' && template !== 'flow' && (
            <div className="dt-body" dangerouslySetInnerHTML={{ __html: article.fullDesc ? article.fullDesc.replace(/\n/g, '<br/>') : 'Đang cập nhật nội dung...' }} />
          )}

          <div className="dt-share">
            <strong>Chia sẻ bài viết:</strong>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Đã sao chép link!') }}>🔗 Copy Link</button>
            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}>📘 Facebook</button>
          </div>
        </div>

        {/* ═══════ SIDEBAR ═══════ */}
        <div className="dt-sidebar">
          <h3>Bài viết liên quan</h3>
          {related.length > 0 ? (
            <div className="dt-related-list">
              {related.map(r => (
                <Link key={r.id} to={`/news/${r.id}`} className="dt-related-card">
                  <img src={r.img || '/Banner.jpg'} alt={r.title} />
                  <div className="dt-rc-body">
                    <span className="dt-rc-cat">{r.category}</span>
                    <h4>{r.title}</h4>
                    <span className="dt-rc-date">📅 {r.date || 'Đang cập nhật'}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: '#8a9bb0', fontSize: '14px' }}>Không có bài viết liên quan.</p>
          )}

          <div className="dt-promo">
            <h4>Cần hỗ trợ vận chuyển?</h4>
            <p>Liên hệ ngay với đội ngũ chuyên gia của chúng tôi để nhận báo giá tốt nhất.</p>
            <Link to="/pricing" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px' }}>Nhận Báo Giá</Link>
          </div>
        </div>
      </div>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightbox && (
        <div className="dt-lightbox" onClick={() => setLightbox(null)}>
          <button className="dt-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Phóng to" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

const detailCSS = `
  .dt-hero {
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 80px 24px;
    margin: -24px -24px 40px -24px; /* compensate for main padding */
  }
  .dt-hero-inner {
    max-width: 900px;
    margin: 0 auto;
  }
  .dt-back {
    display: inline-block;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 24px;
    transition: color 0.2s;
  }
  .dt-back:hover {
    color: #fff;
  }
  .dt-cat {
    display: inline-block;
    background: #f36c1f;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
  .dt-hero-inner h1 {
    font-size: 42px;
    margin: 0 0 24px 0;
    line-height: 1.2;
  }
  .dt-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
  }
  .dt-meta .dot {
    width: 4px;
    height: 4px;
    background: rgba(255,255,255,0.4);
    border-radius: 50%;
  }

  .dt-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 48px;
    align-items: start;
  }

  .dt-content {
    background: #fff;
    padding-right: 24px;
  }
  .dt-lead {
    font-size: 18px;
    font-weight: 600;
    color: #153468;
    line-height: 1.6;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e1e6ea;
  }

  /* ══════ Main Image ══════ */
  .dt-main-img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 32px;
    cursor: pointer;
    transition: transform .3s;
  }
  .dt-main-img:hover {
    transform: scale(1.005);
  }




  /* ══════ LIGHTBOX ══════ */
  .dt-lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.88);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    cursor: pointer;
    backdrop-filter: blur(8px);
    animation: lbFadeIn .25s ease;
  }
  @keyframes lbFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .dt-lightbox img {
    max-width: 92%;
    max-height: 88vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 24px 80px rgba(0,0,0,.4);
    cursor: default;
  }
  .dt-lightbox-close {
    position: absolute;
    top: 24px;
    right: 32px;
    background: rgba(255,255,255,.15);
    border: none;
    color: #fff;
    font-size: 28px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s;
  }
  .dt-lightbox-close:hover {
    background: rgba(243,108,31,.8);
  }

  .dt-body {
    font-size: 16px;
    color: #33475b;
    line-height: 1.8;
  }
  .dt-body p {
    margin-bottom: 24px;
  }

  /* ══════ REPORT TEMPLATE (Word Document Style) ══════ */
  .rp-report {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: -24px -24px 0 -24px;
    padding: 0;
  }

  /* ── Page wrapper (paper feel) ── */
  .rp-page {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 20px rgba(15,43,87,.08), 0 1px 4px rgba(0,0,0,.04);
    border: 1px solid #e8ecf1;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .rp-page.dt-il-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Page header bar ── */
  .rp-page-header {
    background: #0f2b57;
    padding: 14px 40px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .rp-brand {
    color: #fff;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .rp-sep {
    color: rgba(255,255,255,.3);
    font-size: 16px;
    font-weight: 300;
  }
  .rp-type {
    color: #f36c1f;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }

  /* ── Page body ── */
  .rp-page-body {
    padding: 36px 40px;
  }

  /* ── Text block ── */
  .rp-text-block {
    font-size: 14.5px;
    line-height: 1.85;
    color: #2c3e50;
    margin-bottom: 28px;
    text-align: justify;
    word-break: break-word;
  }
  .rp-text-block h2, .rp-text-block h3, .rp-text-block strong {
    color: #0f2b57;
  }
  .rp-text-block h2 {
    font-size: 20px;
    margin: 32px 0 14px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #f36c1f;
    display: inline-block;
    line-height: 1.3;
  }
  .rp-text-block h3 {
    font-size: 17px;
    margin: 24px 0 10px 0;
    line-height: 1.3;
  }
  .rp-text-block p {
    margin-bottom: 14px;
  }
  .rp-text-block ul, .rp-text-block ol {
    padding-left: 20px;
    margin-bottom: 14px;
  }
  .rp-text-block li {
    margin-bottom: 6px;
  }
  .rp-text-block a {
    color: #f36c1f;
    text-decoration: none;
    font-weight: 600;
  }
  .rp-text-block a:hover {
    text-decoration: underline;
  }

  /* Sources / conclusion block */
  .rp-text-sources {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e1e6ea;
    font-size: 13.5px;
    color: #5a6f82;
  }

  /* ── Images ── */
  .rp-img-container {
    position: relative;
    margin-bottom: 24px;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    transition: box-shadow 0.3s;
  }
  .rp-img-container:hover {
    box-shadow: 0 4px 20px rgba(15,43,87,.12);
  }
  .rp-img {
    width: 100%;
    height: auto;
    max-height: 420px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .rp-img-container:hover .rp-img {
    transform: scale(1.02);
  }

  /* Image at top of page (no padding, full bleed) */
  .rp-img-top {
    margin: 0;
    border-radius: 0;
  }
  .rp-img-top .rp-img {
    max-height: 380px;
    border-radius: 0;
  }

  /* Inline image within text */
  .rp-img-inline {
    margin: 20px 0 24px 0;
  }
  .rp-img-inline .rp-img {
    max-height: 360px;
    border-radius: 6px;
  }

  /* Image caption */
  .rp-img-caption {
    padding: 10px 16px;
    font-size: 12.5px;
    color: #7b8a9a;
    font-style: italic;
    background: #f8fafc;
    border-top: 1px solid #edf1f5;
  }

  /* ── Page footer ── */
  .rp-page-footer {
    padding: 12px 40px;
    background: #f8fafc;
    border-top: 1px solid #edf1f5;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11.5px;
    color: #8a9bb0;
    font-weight: 600;
    letter-spacing: 0.3px;
  }
  .rp-page-footer span:nth-child(2) {
    color: #d5dde6;
    font-weight: 300;
    font-size: 14px;
  }

  /* ── Responsive ── */
  @media(max-width: 768px) {
    .rp-report {
      margin: -12px -12px 0 -12px;
      gap: 24px;
    }
    .rp-page-header {
      padding: 12px 20px;
    }
    .rp-brand {
      font-size: 11px;
      letter-spacing: 1px;
    }
    .rp-type {
      font-size: 10px;
    }
    .rp-page-body {
      padding: 24px 20px;
    }
    .rp-text-block {
      font-size: 14px;
      text-align: left;
    }
    .rp-img-top .rp-img {
      max-height: 220px;
    }
    .rp-page-footer {
      padding: 10px 20px;
      font-size: 10px;
    }
  }

  .dt-share {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 1px solid #e1e6ea;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .dt-share button {
    background: #f7f9fb;
    border: 1px solid #e1e6ea;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    color: #153468;
    transition: all 0.2s;
  }
  .dt-share button:hover {
    background: #e1e6ea;
  }

  .dt-sidebar {
    position: sticky;
    top: 24px;
  }
  .dt-sidebar h3 {
    font-size: 18px;
    color: #153468;
    margin: 0 0 20px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #f36c1f;
    display: inline-block;
  }

  .dt-related-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .dt-related-card {
    display: flex;
    gap: 12px;
    text-decoration: none;
    color: inherit;
    group: hover;
  }
  .dt-related-card img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 6px;
  }
  .dt-rc-body {
    flex: 1;
  }
  .dt-rc-cat {
    color: #f36c1f;
    font-size: 11px;
    font-weight: 700;
  }
  .dt-rc-body h4 {
    margin: 4px 0;
    font-size: 14px;
    line-height: 1.4;
    color: #153468;
    transition: color 0.2s;
  }
  .dt-related-card:hover h4 {
    color: #f36c1f;
  }
  .dt-rc-date {
    font-size: 12px;
    color: #8a9bb0;
  }

  .dt-promo {
    background: #153468;
    color: #fff;
    padding: 24px;
    border-radius: 8px;
    margin-top: 40px;
    text-align: center;
  }
  .dt-promo h4 {
    margin: 0 0 12px 0;
    font-size: 18px;
  }
  .dt-promo p {
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    margin-bottom: 20px;
  }

  @media(max-width: 900px) {
    .dt-container {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .dt-content {
      padding-right: 0;
    }
    .dt-hero h1 {
      font-size: 32px;
    }
    .dt-multi-main {
      height: 260px;
    }
    .dt-multi-sub {
      height: 100px;
    }
    .dt-gallery-slide {
      height: 280px;
    }
  }
`
