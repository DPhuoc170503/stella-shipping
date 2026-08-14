import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useArticles } from '../context/ArticlesContext'

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

const CATEGORIES = ['Tất cả', 'Công ty', 'Thị trường', 'Dịch vụ', 'Công nghệ', 'Bền vững', 'Sự kiện']

const TRENDING = [
  { title: 'Cước vận tải biển quý 4 dự kiến tăng 20%', views: '12.5K' },
  { title: 'Top 5 cảng container bận rộn nhất ĐNA', views: '9.8K' },
  { title: 'Hải quan điện tử: Hướng dẫn từ A-Z', views: '8.2K' },
  { title: 'So sánh chi phí FCL vs LCL cho SME', views: '7.6K' },
  { title: 'Stella đạt chứng nhận AEO 2024', views: '6.9K' },
]

/* ═══════════════════════════════════════════ CSS ═══════════════════════════════════════════ */
const newsCSS = `
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rv.fl{transform:translateX(-48px) translateY(0)}.rv.fr{transform:translateX(48px) translateY(0)}
  .rv.su{transform:scale(.93) translateY(18px)}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}
  .rv.d4{transition-delay:.4s}.rv.d5{transition-delay:.5s}

  /* ── Hero ── */
  .nw-hero{position:relative;background:linear-gradient(135deg,#061e2d 0%,#0f2b57 60%,#1a3a6a 100%);color:#fff;padding:80px 24px 100px;text-align:center;overflow:hidden}
  .nw-hero::before{content:'';position:absolute;top:-50%;right:-20%;width:600px;height:600px;background:radial-gradient(circle,rgba(243,108,31,.08) 0%,transparent 70%);border-radius:50%}
  .nw-hero::after{content:'';position:absolute;bottom:-30%;left:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(243,108,31,.05) 0%,transparent 70%);border-radius:50%}
  .nw-hero .kicker{display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;border:1px solid rgba(243,108,31,.35);padding:5px 16px;border-radius:20px;margin-bottom:16px}
  .nw-hero h1{font-size:46px;margin:0 0 16px;font-weight:800;position:relative;z-index:1}
  .nw-hero>p{font-size:16px;color:rgba(255,255,255,.75);max-width:620px;margin:0 auto;line-height:1.65;position:relative;z-index:1}

  /* ── Search bar ── */
  .nw-search{max-width:560px;margin:28px auto 0;position:relative;z-index:1}
  .nw-search input{width:100%;padding:16px 52px 16px 20px;border:none;border-radius:12px;font-size:15px;background:rgba(255,255,255,.1);color:#fff;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);transition:all .25s}
  .nw-search input::placeholder{color:rgba(255,255,255,.5)}
  .nw-search input:focus{outline:none;background:rgba(255,255,255,.15);border-color:rgba(243,108,31,.5)}
  .nw-search-icon{position:absolute;right:18px;top:50%;transform:translateY(-50%);font-size:18px;color:rgba(255,255,255,.5)}

  /* ── Featured ── */
  .nw-featured{max-width:1200px;margin:-48px auto 48px;padding:0 24px;position:relative;z-index:2}
  .nw-feat-card{display:grid;grid-template-columns:1.3fr 1fr;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 16px 48px rgba(10,20,40,.1)}
  .nw-feat-img{min-height:400px;background-size:cover;background-position:center;position:relative}
  .nw-feat-img::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 60%,rgba(0,0,0,.04) 100%)}
  .nw-feat-badge{position:absolute;top:20px;left:20px;background:rgba(243,108,31,.92);color:#fff;padding:6px 16px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:1px;z-index:1}
  .nw-feat-body{padding:44px 40px;display:flex;flex-direction:column;justify-content:center}
  .nw-feat-body .cat{color:#f36c1f;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
  .nw-feat-body h2{font-size:28px;margin:0 0 16px;color:#0f2b57;line-height:1.3;font-weight:800}
  .nw-feat-body .meta{font-size:13px;color:#8a9bb0;margin-bottom:16px;display:flex;gap:16px;align-items:center}
  .nw-feat-body .meta .dot{width:4px;height:4px;background:#c0cadb;border-radius:50%}
  .nw-feat-body>p{color:#5a6f82;line-height:1.65;margin-bottom:24px;font-size:15px}
  .nw-read-btn{display:inline-flex;align-items:center;gap:8px;background:#0f2b57;color:#fff;padding:13px 24px;border-radius:10px;font-weight:700;text-decoration:none;font-size:14px;transition:all .25s;align-self:flex-start}
  .nw-read-btn:hover{background:#f36c1f}

  /* ── Filters ── */
  .nw-filters{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:1200px;margin:0 auto 40px;padding:0 24px}
  .nw-fbtn{background:transparent;border:1.5px solid #d5dde6;padding:9px 20px;border-radius:30px;color:#5a6f82;font-weight:600;font-size:13px;cursor:pointer;transition:all .22s;letter-spacing:.3px}
  .nw-fbtn.active,.nw-fbtn:hover{background:#0f2b57;color:#fff;border-color:#0f2b57}
  .nw-fbtn .count{background:rgba(0,0,0,.08);padding:2px 8px;border-radius:10px;font-size:11px;margin-left:6px}
  .nw-fbtn.active .count{background:rgba(255,255,255,.2)}

  /* ── Main layout ── */
  .nw-main{display:grid;grid-template-columns:1fr 340px;gap:36px;max-width:1200px;margin:0 auto;padding:0 24px 60px}

  /* ── Article cards ── */
  .nw-articles{display:flex;flex-direction:column;gap:0}
  .nw-art{display:grid;grid-template-columns:280px 1fr;gap:24px;padding:28px 0;border-bottom:1px solid #edf1f5;transition:all .3s}
  .nw-art:first-child{padding-top:0}
  .nw-art:hover{background:rgba(243,108,31,.015);padding-left:8px}
  .nw-art-img{width:100%;height:190px;object-fit:cover;border-radius:12px;transition:transform .4s}
  .nw-art:hover .nw-art-img{transform:scale(1.02)}
  .nw-art-body{display:flex;flex-direction:column;justify-content:center}
  .nw-art-top{display:flex;align-items:center;gap:12px;margin-bottom:10px}
  .nw-art-cat{background:rgba(243,108,31,.08);color:#f36c1f;font-size:11px;font-weight:700;padding:4px 12px;border-radius:14px;letter-spacing:.3px}
  .nw-art-date{color:#8a9bb0;font-size:12px}
  .nw-art-read{color:#8a9bb0;font-size:12px;display:flex;align-items:center;gap:4px}
  .nw-art-body h3{font-size:19px;margin:0 0 10px;color:#0f2b57;line-height:1.4;font-weight:700}
  .nw-art-body h3:hover{color:#f36c1f}
  .nw-art-body>p{color:#5a6f82;font-size:14px;line-height:1.6;margin:0 0 14px}
  .nw-art-author{font-size:12px;color:#8a9bb0;font-weight:500}
  .nw-art-link{color:#0f2b57;font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:color .2s}
  .nw-art-link:hover{color:#f36c1f}

  /* ── Sidebar ── */
  .nw-sidebar{display:flex;flex-direction:column;gap:28px}
  .nw-side-card{background:#fff;border-radius:14px;padding:24px;box-shadow:0 4px 20px rgba(10,20,40,.04);border:1px solid #f0f3f6}
  .nw-side-card h3{margin:0 0 18px;font-size:17px;color:#0f2b57;display:flex;align-items:center;gap:8px}
  
  /* trending */
  .nw-trend-item{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid #f0f3f6}
  .nw-trend-item:last-child{border-bottom:none;padding-bottom:0}
  .nw-trend-item:first-child{padding-top:0}
  .nw-trend-num{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,rgba(243,108,31,.1),rgba(243,108,31,.03));color:#f36c1f;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .nw-trend-text{font-size:14px;color:#0f2b57;font-weight:600;line-height:1.4;cursor:pointer;transition:color .2s}
  .nw-trend-text:hover{color:#f36c1f}
  .nw-trend-views{font-size:11px;color:#8a9bb0;margin-top:3px;font-weight:400}

  /* newsletter sidebar */
  .nw-nl-card{background:linear-gradient(135deg,#0f2b57,#1a3a6a);color:#fff;border:none}
  .nw-nl-card h3{color:#fff}
  .nw-nl-card p{color:rgba(255,255,255,.7);font-size:13px;line-height:1.55;margin:0 0 18px}
  .nw-nl-input{width:100%;padding:13px 16px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:rgba(255,255,255,.08);color:#fff;font-size:14px;margin-bottom:10px;transition:border-color .2s}
  .nw-nl-input::placeholder{color:rgba(255,255,255,.4)}
  .nw-nl-input:focus{outline:none;border-color:rgba(243,108,31,.6)}
  .nw-nl-btn{width:100%;padding:13px;background:#f36c1f;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;transition:background .2s}
  .nw-nl-btn:hover{background:#e05a10}

  /* categories sidebar */
  .nw-cat-item{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f0f3f6;cursor:pointer;transition:color .2s}
  .nw-cat-item:last-child{border-bottom:none}
  .nw-cat-item:hover{color:#f36c1f}
  .nw-cat-item span:first-child{font-size:14px;color:#0f2b57;font-weight:500}
  .nw-cat-item:hover span:first-child{color:#f36c1f}
  .nw-cat-count{background:#f0f3f6;padding:2px 10px;border-radius:10px;font-size:12px;color:#5a6f82;font-weight:600}

  /* ── Load more ── */
  .nw-load-more{text-align:center;padding:32px 0 0}
  .nw-load-btn{background:transparent;border:2px solid #0f2b57;color:#0f2b57;padding:14px 36px;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;transition:all .25s;letter-spacing:.3px}
  .nw-load-btn:hover{background:#0f2b57;color:#fff}

  /* ── Bottom newsletter full-width ── */
  .nw-subscribe{background:#f5f8fb;padding:72px 24px;text-align:center}
  .nw-sub-inner{max-width:640px;margin:0 auto}
  .nw-sub-inner h2{font-size:30px;color:#0f2b57;margin:0 0 12px;font-weight:800}
  .nw-sub-inner>p{color:#5a6f82;margin-bottom:28px;line-height:1.6}
  .nw-sub-form{display:flex;gap:10px}
  .nw-sub-form input{flex:1;padding:16px 20px;border:1.5px solid #d5dde6;border-radius:10px;font-size:15px;transition:border-color .2s}
  .nw-sub-form input:focus{outline:none;border-color:#f36c1f}
  .nw-sub-form button{background:#f36c1f;color:#fff;border:none;padding:0 28px;border-radius:10px;font-weight:700;cursor:pointer;transition:background .2s;white-space:nowrap;font-size:15px}
  .nw-sub-form button:hover{background:#e05a10}
  .nw-sub-tags{display:flex;gap:8px;justify-content:center;margin-top:18px;flex-wrap:wrap}
  .nw-sub-tag{background:#fff;border:1px solid #e1e8ef;padding:5px 14px;border-radius:20px;font-size:12px;color:#5a6f82;font-weight:500}

  /* ── Responsive ── */
  @media(max-width:1024px){
    .nw-main{grid-template-columns:1fr}
    .nw-sidebar{flex-direction:row;flex-wrap:wrap}
    .nw-side-card{flex:1;min-width:280px}
  }
  @media(max-width:900px){
    .nw-feat-card{grid-template-columns:1fr}.nw-feat-img{min-height:260px}
    .nw-hero h1{font-size:32px}
  }
  @media(max-width:700px){
    .nw-art{grid-template-columns:1fr}.nw-art-img{height:200px}
    .nw-sub-form{flex-direction:column}
    .nw-sub-form button{padding:16px}
  }
`

export default function News() {
  const pageRef = useScrollReveal()
  const { articles: allArticles } = useArticles()
  const [filter, setFilter] = useState('Tất cả')
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  // Only show published articles on the public News page
  const publishedArticles = allArticles.filter(a => a.status === 'published')

  const filtered = publishedArticles.filter(a => {
    const matchCat = filter === 'Tất cả' || a.category === filter
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const visible = filtered.slice(0, visibleCount)

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'Tất cả' ? publishedArticles.length : publishedArticles.filter(a => a.category === cat).length
    return acc
  }, {})

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Cảm ơn bạn đã đăng ký nhận bản tin với email: ${email}`)
    setEmail('')
  }

  // ── Fix: reveal các bài viết đã ở trong viewport sau khi filter thay đổi ──
  useEffect(() => {
    if (!pageRef.current) return
    const timer = setTimeout(() => {
      pageRef.current.querySelectorAll('.rv:not(.rvd)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight + 60) {
          el.classList.add('rvd')
        }
      })
    }, 50) // chờ React render xong
    return () => clearTimeout(timer)
  }, [filter, search, visibleCount, pageRef])

  return (
    <div ref={pageRef}>
      <style>{newsCSS}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="nw-hero">
        <div className="kicker rv">TIN TỨC & INSIGHTS</div>
        <h1 className="rv d1">Cập nhật mới nhất từ<br />ngành Logistics</h1>
        <p className="rv d2">Phân tích thị trường, xu hướng chuỗi cung ứng, tin tức công ty và kiến thức chuyên ngành từ đội ngũ chuyên gia Stella Shipping.</p>

      </section>

      {/* ═══════ FEATURED ═══════ */}
      <section className="nw-featured rv su">
        <div className="nw-feat-card">
          <div className="nw-feat-img" style={{ backgroundImage: `url('/Banner.jpg')` }}>
            <div className="nw-feat-badge">⭐ TIÊU ĐIỂM</div>
          </div>
          <div className="nw-feat-body">
            <div className="cat">CÔNG TY</div>
            <h2>Stella Shipping  Doanh Nghiệp Logistics Uy Tín Tại Việt Nam </h2>
            <div className="meta">
              <span>Ban Truyền Thông</span>
              <span className="dot" />
              <span>25 Thg 08, 2024</span>
              <span className="dot" />
              <span>5 phút đọc</span>
            </div>
            <p>Vượt qua các tiêu chí đánh giá khắt khe về năng lực tài chính, uy tín truyền thông, mức độ hài lòng khách hàng và chuyển đổi số. </p>
            <Link to="/news/1" className="nw-read-btn">Đọc bài viết đầy đủ →</Link>
          </div>
        </div>
      </section>

      {/* ═══════ FILTERS ═══════ */}
      <div className="nw-filters rv">
        {CATEGORIES.map(c => (
          <button key={c} className={`nw-fbtn ${filter === c ? 'active' : ''}`} onClick={() => { setFilter(c); setVisibleCount(6) }}>
            {c}<span className="count">{categoryCounts[c]}</span>
          </button>
        ))}
      </div>

      {/* ═══════ MAIN: ARTICLES + SIDEBAR ═══════ */}
      <div className="nw-main">
        {/* articles */}
        <div className="nw-articles">
          {visible.map((a, i) => (
            <article key={a.id} className={`nw-art rv d${(i % 3) + 1}`}>
              <img src={a.img} alt={a.title} className="nw-art-img" />
              <div className="nw-art-body">
                <div className="nw-art-top">
                  <span className="nw-art-cat">{a.category}</span>
                  <span className="nw-art-date">{a.date}</span>
                  <span className="nw-art-read">📖 {a.readTime}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="nw-art-author">✍️ {a.author}</span>
                  <Link to={`/news/${a.id}`} className="nw-art-link">Đọc tiếp →</Link>
                </div>
              </div>
            </article>
          ))}

          {visible.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#5a6f82' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <p style={{ fontSize: 16 }}>Không tìm thấy bài viết nào phù hợp.</p>
              <button className="nw-fbtn" onClick={() => { setFilter('Tất cả'); setSearch('') }} style={{ marginTop: 12 }}>Xem tất cả bài viết</button>
            </div>
          )}

          {visible.length < filtered.length && (
            <div className="nw-load-more rv">
              <button className="nw-load-btn" onClick={() => setVisibleCount(v => v + 3)}>
                Xem thêm bài viết ({filtered.length - visible.length} còn lại)
              </button>
            </div>
          )}
        </div>

        {/* sidebar */}
        <aside className="nw-sidebar">
          {/* Trending */}
          <div className="nw-side-card rv">
            <h3>🔥 Đang thịnh hành</h3>
            {TRENDING.map((t, i) => (
              <div key={i} className="nw-trend-item">
                <div className="nw-trend-num">{i + 1}</div>
                <div>
                  <div className="nw-trend-text">{t.title}</div>
                  <div className="nw-trend-views">👁️ {t.views} lượt xem</div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="nw-side-card nw-nl-card rv d1">
            <h3>📬 Bản tin hàng tuần</h3>
            <p>Nhận phân tích thị trường, cập nhật cước vận tải và insights logistics trực tiếp qua email mỗi thứ Hai.</p>
            <form onSubmit={handleSubscribe}>
              <input className="nw-nl-input" type="email" placeholder="Email của bạn..." required value={email} onChange={e => setEmail(e.target.value)} />
              <button className="nw-nl-btn" type="submit">Đăng ký miễn phí</button>
            </form>
          </div>

          {/* Categories */}
          <div className="nw-side-card rv d2">
            <h3>📂 Danh mục</h3>
            {CATEGORIES.filter(c => c !== 'Tất cả').map(c => (
              <div key={c} className="nw-cat-item" onClick={() => { setFilter(c); setVisibleCount(6) }}>
                <span>{c}</span>
                <span className="nw-cat-count">{categoryCounts[c]}</span>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="nw-side-card rv d3">
            <h3>🔗 Liên kết nhanh</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📊', text: 'Báo cáo thị trường Q3/2024', href: '#report' },
                { icon: '📥', text: 'Media Kit & Logo', href: '#media' },
                { icon: '📋', text: 'Thông cáo báo chí', href: '#press' },
                { icon: '📞', text: 'Liên hệ phòng truyền thông', href: '/contact' },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #f0f3f6', textDecoration: 'none', color: '#0f2b57', fontWeight: 500, fontSize: 14, transition: 'color .2s' }}>
                  <span>{l.icon}</span> {l.text}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ═══════ BOTTOM NEWSLETTER ═══════ */}
      <section className="nw-subscribe rv">
        <div className="nw-sub-inner">
          <h2>Không bỏ lỡ tin tức logistics quan trọng</h2>
          <p>Tham gia cùng 5.000+ chuyên gia logistics nhận bản tin hàng tuần — phân tích thị trường, xu hướng chuỗi cung ứng và cập nhật cước vận tải mới nhất.</p>
          <form className="nw-sub-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Nhập email của bạn..." required value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit">Đăng ký ngay</button>
          </form>
          <div className="nw-sub-tags">
            <span className="nw-sub-tag">📈 Phân tích thị trường</span>
            <span className="nw-sub-tag">🚢 Cước vận tải</span>
            <span className="nw-sub-tag">🌱 Logistics xanh</span>
            <span className="nw-sub-tag">💡 Case studies</span>
          </div>
        </div>
      </section>
    </div>
  )
}
