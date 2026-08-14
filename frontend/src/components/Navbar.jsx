import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

/* ── Fallback dùng khi backend không chạy ── */
const FALLBACK_NAV = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Dịch vụ', path: '/services' },
  { label: 'Bảng giá', path: '/pricing' },
  { label: 'Về chúng tôi', path: '/about' },
  { label: 'Tin tức', path: '/news' },
  { label: 'Liên hệ', path: '/contact' },
]

const navLinkCSS = `
  .nb-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 12px 24px;
    border-bottom: 1px solid #eee;
    background: #fff;
    position: relative;
    z-index: 20;
  }

  .nb-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
    flex-shrink: 0;
  }

  .nb-better {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
    font-size: 0.85em;
    white-space: nowrap;
  }

  .nb-logo-wrap {
    display: inline-block;
    text-decoration: none;
  }

  .nb-logo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .nb-logo {
    height: 60px;
    display: block;
  }

  .nb-tag {
    font-size: 11px;
    color: #6b7a8a;
    letter-spacing: 1px;
    text-align: center;
    white-space: nowrap;
  }

  .nb-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }

  .nb-link {
    position: relative;
    display: inline-block;
    margin: 0 10px;
    padding: 6px 2px;
    font-size: 14.5px;
    font-weight: 600;
    color: #3a4a5c;
    text-decoration: none;
    letter-spacing: 0.2px;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .nb-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #f36c1f;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s cubic-bezier(.22,1,.36,1);
  }
  .nb-link:hover {
    color: #0f2b57;
  }
  .nb-link:hover::after {
    transform: scaleX(1);
  }
  .nb-link.active {
    color: #0f2b57;
  }
  .nb-link.active::after {
    transform: scaleX(1);
  }

  .nb-phone {
    background: #f36c1f;
    padding: 8px 16px;
    color: #fff;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    box-shadow: 0 8px 18px rgba(243, 108, 31, 0.2);
  }

  .nb-toggle {
    display: none;
    border: 1px solid #e8edf3;
    background: #fff;
    border-radius: 10px;
    width: 42px;
    height: 42px;
    font-size: 20px;
    color: #16324a;
    cursor: pointer;
  }

  @media (max-width: 980px) {
    .nb-shell {
      flex-wrap: wrap;
      padding: 12px 16px;
    }

    .nb-brand {
      flex: 1;
      min-width: 0;
    }

    .nb-better {
      display: none;
    }

    .nb-logo {
      height: 46px;
    }

    .nb-tag {
      font-size: 9px;
      letter-spacing: 0.6px;
    }

    .nb-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .nb-phone {
      margin-left: auto;
      padding: 8px 12px;
      font-size: 12px;
    }

    .nb-nav {
      display: none;
      width: 100%;
      order: 4;
      flex-direction: column;
      align-items: stretch;
      border-top: 1px solid #edf1f5;
      padding-top: 10px;
      margin-top: 4px;
    }

    .nb-nav.open {
      display: flex;
    }

    .nb-link {
      margin: 0;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 14px;
      color: #16324a;
    }

    .nb-link.active {
      background: #fff5ef;
    }

    .nb-link::after {
      display: none;
    }
  }
`

export default function Navbar() {
  const [items, setItems] = useState(FALLBACK_NAV)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    axios
      .get(`${API_URL}/api/nav`)
      .then((r) => {
        if (r.data && r.data.length > 0) setItems(r.data)
      })
      .catch(() => {
        // giữ nguyên FALLBACK_NAV
      })
  }, [])

  return (
    <header>
      <style>{navLinkCSS}</style>
      <div className="nb-shell">
        <div className="nb-brand">
          <span className="nb-better">better ways</span>
          <NavLink to="/" className="nb-logo-wrap" aria-label="home" onClick={() => setMobileOpen(false)}>
            <div className="nb-logo-box">
              <img src="/stella-logo.png" alt="Stella Shipping" className="nb-logo" />
              <div className="nb-tag">LOGISTICS · CUSTOMS · FREIGHT</div>
            </div>
          </NavLink>
        </div>

        <button
          className="nb-toggle"
          type="button"
          aria-label="Mở menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`nb-nav ${mobileOpen ? 'open' : ''}`}>
          {items.map((it) => (
            <NavLink
              key={it.path}
              to={it.path}
              className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}
              end={it.path === '/'}
              onClick={() => setMobileOpen(false)}
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        <a href="tel:19006868" className="nb-phone">📞 1900 6868</a>
      </div>
    </header>
  )
}
