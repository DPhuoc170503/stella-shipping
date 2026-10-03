import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useArticles } from '../context/ArticlesContext'

import SEO from '../components/SEO'

export default function ArticleDetail() {
  const { id } = useParams()
  const { articles, loading } = useArticles()
  const navigate = useNavigate()

  const article = articles.find(a => a.id === parseInt(id))

  // Gallery slideshow state
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setGalleryIndex(0)
    setLightbox(null)
  }, [id])

  // Auto-advance gallery slideshow
  useEffect(() => {
    if (!article || article.template !== 'gallery') return
    const imgs = article.galleryImages || []
    if (imgs.length <= 1) return
    const interval = setInterval(() => {
      setGalleryIndex(prev => (prev + 1) % imgs.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [article, galleryIndex])

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
    if (src.startsWith('http')) return src
    if (src.startsWith('/uploads/')) return `${API_URL}${src}`
    return src
  }
  const imgUrl = resolveImg(article.img)

  // Template-specific image collections
  const template = article.template || 'single'
  const multiImages = [article.img2, article.img3, article.img4].filter(Boolean).map(resolveImg)
  const galleryImages = (article.galleryImages || []).map(resolveImg)

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
          <p className="dt-lead">{article.desc}</p>

          {/* ══════ TEMPLATE: SINGLE ══════ */}
          {template === 'single' && (
            <img src={imgUrl || '/Banner.jpg'} alt={article.title} className="dt-main-img" />
          )}

          {/* ══════ TEMPLATE: MULTI (1 main + 3 sub grid) ══════ */}
          {template === 'multi' && (
            <div className="dt-multi">
              <img
                src={imgUrl || '/Banner.jpg'}
                alt={article.title}
                className="dt-main-img dt-multi-main"
                onClick={() => setLightbox(imgUrl)}
              />
              {multiImages.length > 0 && (
                <div className="dt-multi-grid">
                  {multiImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${article.title} - ảnh ${i + 2}`}
                      className="dt-multi-sub"
                      onClick={() => setLightbox(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════ TEMPLATE: GALLERY (slideshow + thumbnails) ══════ */}
          {template === 'gallery' && (
            <div className="dt-gallery">
              {/* Main slideshow */}
              <div className="dt-gallery-main">
                <img
                  src={galleryImages[galleryIndex] || imgUrl}
                  alt={`${article.title} - slide ${galleryIndex + 1}`}
                  className="dt-gallery-slide"
                  onClick={() => setLightbox(galleryImages[galleryIndex] || imgUrl)}
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      className="dt-gallery-nav dt-gallery-prev"
                      onClick={() => setGalleryIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    >‹</button>
                    <button
                      className="dt-gallery-nav dt-gallery-next"
                      onClick={() => setGalleryIndex(prev => (prev + 1) % galleryImages.length)}
                    >›</button>
                    <div className="dt-gallery-counter">
                      {galleryIndex + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="dt-gallery-thumbs">
                  {galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className={`dt-gallery-thumb ${i === galleryIndex ? 'active' : ''}`}
                      onClick={() => setGalleryIndex(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════ TEMPLATE: INLINE (interspersed images) ══════ */}
          {template === 'inline' && (
            <div className="dt-inline">
              {(() => {
                // Chia fullDesc thành 4 phần bằng dấu <!-- SPLIT -->
                const textBlocks = article.fullDesc ? article.fullDesc.split('<!-- SPLIT -->') : [''];
                // img2=ảnh sau đoạn 1, img3=ảnh sau đoạn 2, img4=ảnh sau đoạn 3, đoạn 4 là đoạn cuối
                const inlineImgs = [article.img2, article.img3, article.img4].map(src => src ? resolveImg(src) : null);
                
                return (
                  <>
                    {/* Đoạn 1 */}
                    {textBlocks[0] && textBlocks[0].trim() && (
                      <div className="dt-body" style={{marginBottom: '24px'}} dangerouslySetInnerHTML={{ __html: textBlocks[0].replace(/\n/g, '<br/>') }} />
                    )}
                    {/* Ảnh 1 */}
                    {inlineImgs[0] && (
                      <img src={inlineImgs[0]} alt="Ảnh minh hoạ 1"
                        style={{marginBottom: '32px', borderRadius: '12px', width: '100%', maxHeight: '480px', objectFit: 'cover', cursor: 'pointer', display: 'block'}}
                        onClick={(e) => setLightbox(e.target.src)} />
                    )}
                    {/* Đoạn 2 */}
                    {textBlocks[1] && textBlocks[1].trim() && (
                      <div className="dt-body" style={{marginBottom: '24px'}} dangerouslySetInnerHTML={{ __html: textBlocks[1].replace(/\n/g, '<br/>') }} />
                    )}
                    {/* Ảnh 2 */}
                    {inlineImgs[1] && (
                      <img src={inlineImgs[1]} alt="Ảnh minh hoạ 2"
                        style={{marginBottom: '32px', borderRadius: '12px', width: '100%', maxHeight: '480px', objectFit: 'cover', cursor: 'pointer', display: 'block'}}
                        onClick={(e) => setLightbox(e.target.src)} />
                    )}
                    {/* Đoạn 3 */}
                    {textBlocks[2] && textBlocks[2].trim() && (
                      <div className="dt-body" style={{marginBottom: '24px'}} dangerouslySetInnerHTML={{ __html: textBlocks[2].replace(/\n/g, '<br/>') }} />
                    )}
                    {/* Ảnh 3 */}
                    {inlineImgs[2] && (
                      <img src={inlineImgs[2]} alt="Ảnh minh hoạ 3"
                        style={{marginBottom: '32px', borderRadius: '12px', width: '100%', maxHeight: '480px', objectFit: 'cover', cursor: 'pointer', display: 'block'}}
                        onClick={(e) => setLightbox(e.target.src)} />
                    )}
                    {/* Đoạn cuối */}
                    {textBlocks[3] && textBlocks[3].trim() && (
                      <div className="dt-body" style={{marginBottom: '24px'}} dangerouslySetInnerHTML={{ __html: textBlocks[3].replace(/\n/g, '<br/>') }} />
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {template !== 'inline' && (
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

  /* ══════ MULTI TEMPLATE ══════ */
  .dt-multi {
    margin-bottom: 32px;
  }
  .dt-multi-main {
    width: 100%;
    height: 380px;
    object-fit: cover;
    border-radius: 14px 14px 4px 4px;
    margin-bottom: 6px;
    cursor: pointer;
    transition: filter .3s;
  }
  .dt-multi-main:hover {
    filter: brightness(1.05);
  }
  .dt-multi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  .dt-multi-sub {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s;
  }
  .dt-multi-sub:first-child { border-radius: 0 0 0 14px; }
  .dt-multi-sub:last-child { border-radius: 0 0 14px 0; }
  .dt-multi-sub:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  /* ══════ GALLERY TEMPLATE ══════ */
  .dt-gallery {
    margin-bottom: 32px;
  }
  .dt-gallery-main {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    background: #000;
  }
  .dt-gallery-slide {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;
    cursor: pointer;
    transition: opacity .5s ease;
  }
  .dt-gallery-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,.9);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 22px;
    font-weight: 700;
    cursor: pointer;
    color: #0f2b57;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    box-shadow: 0 4px 16px rgba(0,0,0,.15);
    z-index: 2;
  }
  .dt-gallery-nav:hover {
    background: #f36c1f;
    color: #fff;
  }
  .dt-gallery-prev { left: 16px; }
  .dt-gallery-next { right: 16px; }
  .dt-gallery-counter {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(15,43,87,.75);
    color: #fff;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .5px;
    backdrop-filter: blur(4px);
  }
  .dt-gallery-thumbs {
    display: flex;
    gap: 6px;
    margin-top: 10px;
    overflow-x: auto;
    padding: 4px 0;
  }
  .dt-gallery-thumb {
    width: 72px;
    height: 52px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    border: 3px solid transparent;
    opacity: .5;
    transition: all .2s;
    flex-shrink: 0;
  }
  .dt-gallery-thumb.active {
    border-color: #f36c1f;
    opacity: 1;
  }
  .dt-gallery-thumb:hover {
    opacity: .85;
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
