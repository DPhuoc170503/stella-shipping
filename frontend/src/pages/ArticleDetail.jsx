import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useArticles } from '../context/ArticlesContext'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function ArticleDetail() {
  const { i18n } = useTranslation()
  const { id } = useParams()
  const { articles, loading } = useArticles()
  const navigate = useNavigate()

  const article = articles.find(a => a.id === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  const imgUrl = article.img?.startsWith('/') ? `${API_URL}${article.img}` : article.img;

  return (
    <div>
      <SEO 
        title={i18n.language === 'en' && article.title_en ? article.title_en : article.title} 
        description={i18n.language === 'en' && article.desc_en ? article.desc_en : (article.desc || article.description)} 
        image={imgUrl} 
        url={`${window.location.origin}/news/${article.id}`} 
      />
      <style>{detailCSS}</style>

      {/* ═══════ HEADER ═══════ */}
      <div className="dt-hero" style={{ backgroundImage: `linear-gradient(rgba(15,43,87,0.7), rgba(15,43,87,0.85)), url(${imgUrl || '/Banner.jpg'})` }}>
        <div className="dt-hero-inner">
          <Link to="/news" className="dt-back">← Quay lại Tin tức</Link>
          <div className="dt-cat">{article.category}</div>
          <h1>{i18n.language === 'en' && article.title_en ? article.title_en : article.title}</h1>
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
          <p className="dt-lead">{i18n.language === 'en' && article.desc_en ? article.desc_en : article.desc}</p>
          <div className="dt-body" dangerouslySetInnerHTML={{ __html: (i18n.language === 'en' && article.fullDesc_en ? article.fullDesc_en : article.fullDesc)?.replace(/\n/g, '<br/>') || 'Đang cập nhật nội dung...' }} />
          
          <div className="dt-share">
            <strong>Chia sẻ bài viết:</strong>
            <button onClick={() => alert('Đã sao chép link!')}>🔗 Copy Link</button>
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
                    <h4>{i18n.language === 'en' && r.title_en ? r.title_en : r.title}</h4>
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
  }
`
