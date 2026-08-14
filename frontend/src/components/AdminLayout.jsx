import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

const layoutCSS = `
  .al-wrap{display:flex;min-height:100vh;background:#f5f7fa}

  /* ── Sidebar ── */
  .al-sidebar{width:260px;background:#0f2b57;color:#fff;display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;transition:transform .3s}
  .al-sidebar.collapsed{transform:translateX(-260px)}
  .al-sb-brand{padding:24px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.08)}
  .al-sb-logo{width:40px;height:40px;background:linear-gradient(135deg,#f36c1f,#e05a10);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
  .al-sb-brand-text h3{margin:0;font-size:15px;font-weight:700;color:#fff}
  .al-sb-brand-text span{font-size:11px;color:rgba(255,255,255,.5);letter-spacing:.5px}

  .al-sb-nav{flex:1;padding:16px 12px;overflow-y:auto}
  .al-sb-section{margin-bottom:20px}
  .al-sb-section-title{font-size:10px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1.5px;padding:0 8px;margin-bottom:8px;font-weight:700}
  .al-sb-link{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:10px;color:rgba(255,255,255,.7);text-decoration:none;font-size:14px;font-weight:500;transition:all .2s;cursor:pointer;border:none;background:transparent;width:100%;text-align:left}
  .al-sb-link:hover{background:rgba(255,255,255,.06);color:#fff}
  .al-sb-link.active{background:rgba(243,108,31,.15);color:#f36c1f;font-weight:600}
  .al-sb-link .icon{font-size:18px;width:24px;text-align:center;flex-shrink:0}

  .al-sb-footer{padding:16px 12px;border-top:1px solid rgba(255,255,255,.08)}
  .al-sb-user{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;background:rgba(255,255,255,.04)}
  .al-sb-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#f36c1f,#e05a10);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0}
  .al-sb-user-info{flex:1;min-width:0}
  .al-sb-user-info strong{display:block;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .al-sb-user-info span{font-size:11px;color:rgba(255,255,255,.5)}

  /* ── Main ── */
  .al-main{flex:1;margin-left:260px;transition:margin-left .3s}
  .al-sidebar.collapsed ~ .al-main{margin-left:0}

  /* ── Top bar ── */
  .al-topbar{background:#fff;padding:14px 28px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 4px rgba(10,20,40,.04);position:sticky;top:0;z-index:50}
  .al-topbar-left{display:flex;align-items:center;gap:14px}
  .al-hamburger{background:none;border:none;font-size:20px;cursor:pointer;padding:6px;color:#5a6f82;border-radius:8px;transition:all .2s}
  .al-hamburger:hover{background:#f5f7fa;color:#0f2b57}
  .al-breadcrumb{font-size:14px;color:#7b8a9a;display:flex;align-items:center;gap:6px}
  .al-breadcrumb strong{color:#0f2b57}
  .al-topbar-right{display:flex;align-items:center;gap:12px}
  .al-topbar-btn{background:none;border:none;font-size:18px;cursor:pointer;padding:8px;border-radius:8px;color:#5a6f82;position:relative;transition:all .2s}
  .al-topbar-btn:hover{background:#f5f7fa;color:#0f2b57}
  .al-notif-dot{position:absolute;top:6px;right:6px;width:8px;height:8px;background:#ef4444;border-radius:50%;border:2px solid #fff}
  .al-logout-btn{display:flex;align-items:center;gap:6px;background:transparent;border:1.5px solid #e1e8ef;padding:8px 16px;border-radius:10px;font-size:13px;font-weight:600;color:#5a6f82;cursor:pointer;transition:all .2s}
  .al-logout-btn:hover{border-color:#ef4444;color:#ef4444;background:rgba(239,68,68,.03)}

  .al-content{padding:24px 28px}

  /* ── Mobile overlay ── */
  .al-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:99}
  
  @media(max-width:900px){
    .al-sidebar{transform:translateX(-260px)}
    .al-sidebar.open{transform:translateX(0)}
    .al-main{margin-left:0!important}
    .al-overlay.show{display:block}
  }
`

const NAV_ITEMS = [
  { section: 'Quản lý nội dung', items: [
    { icon: '📰', label: 'Bài viết', path: '/admin/news' },
    { icon: '📂', label: 'Danh mục', path: '/admin/categories' },
    { icon: '🖼️', label: 'Media', path: '/admin/media' },
  ]},
  { section: 'Khách hàng & Kinh doanh', items: [
    { icon: '💼', label: 'Báo giá (Leads)', path: '/admin/quotes' },
  ]},
  { section: 'Quản lý hệ thống', items: [
    { icon: '📊', label: 'Thống kê', path: '/admin/stats' },
    { icon: '👥', label: 'Người dùng', path: '/admin/users' },
    { icon: '⚙️', label: 'Cài đặt', path: '/admin/settings' },
  ]},
]

export default function AdminLayout({ children }) {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const currentLabel = NAV_ITEMS.flatMap(s => s.items).find(i => i.path === location.pathname)?.label || 'Dashboard'

  return (
    <div>
      <style>{layoutCSS}</style>
      <div className="al-wrap">
        {/* Overlay for mobile */}
        <div className={`al-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <aside className={`al-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="al-sb-brand">
            <div className="al-sb-logo">🚢</div>
            <div className="al-sb-brand-text">
              <h3>Stella Admin</h3>
              <span>Quản trị hệ thống</span>
            </div>
          </div>

          <nav className="al-sb-nav">
            {NAV_ITEMS.map((section, si) => (
              <div key={si} className="al-sb-section">
                <div className="al-sb-section-title">{section.section}</div>
                {section.items.map((item) => (
                  <button
                    key={item.path}
                    className={`al-sb-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => { navigate(item.path); setSidebarOpen(false) }}
                  >
                    <span className="icon">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            ))}

            <div className="al-sb-section">
              <div className="al-sb-section-title">Trang công khai</div>
              <a href="/" className="al-sb-link" target="_blank" rel="noopener noreferrer">
                <span className="icon">🌐</span> Xem website
              </a>
              <a href="/news" className="al-sb-link" target="_blank" rel="noopener noreferrer">
                <span className="icon">📄</span> Xem trang tin tức
              </a>
            </div>
          </nav>

          <div className="al-sb-footer">
            <div className="al-sb-user">
              <div className="al-sb-avatar">{user?.name?.[0] || 'A'}</div>
              <div className="al-sb-user-info">
                <strong>{user?.name}</strong>
                <span>{user?.role}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="al-main">
          <header className="al-topbar">
            <div className="al-topbar-left">
              <button className="al-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
              <div className="al-breadcrumb">
                <span>Admin</span> / <strong>{currentLabel}</strong>
              </div>
            </div>
            <div className="al-topbar-right">
              <button className="al-topbar-btn" title="Thông báo">
                🔔
                <span className="al-notif-dot" />
              </button>
              <button className="al-logout-btn" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </div>
          </header>

          <div className="al-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
