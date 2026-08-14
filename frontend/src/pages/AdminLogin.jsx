import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const loginCSS = `
  .login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#061e2d 0%,#0f2b57 50%,#1a3a6a 100%);padding:24px;position:relative;overflow:hidden}
  .login-page::before{content:'';position:absolute;top:-30%;right:-15%;width:600px;height:600px;background:radial-gradient(circle,rgba(243,108,31,.1) 0%,transparent 70%);border-radius:50%}
  .login-page::after{content:'';position:absolute;bottom:-20%;left:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(243,108,31,.06) 0%,transparent 70%);border-radius:50%}

  .login-card{background:#fff;border-radius:20px;padding:48px 40px;width:100%;max-width:420px;box-shadow:0 24px 64px rgba(0,0,0,.25);position:relative;z-index:1}
  .login-logo{text-align:center;margin-bottom:32px}
  .login-logo-icon{width:56px;height:56px;background:linear-gradient(135deg,#f36c1f,#e05a10);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:26px;color:#fff}
  .login-logo h1{font-size:22px;color:#0f2b57;margin:0 0 4px;font-weight:800}
  .login-logo p{color:#7b8a9a;font-size:13px;margin:0}

  .login-form .form-group{margin-bottom:20px}
  .login-form label{display:block;font-size:13px;font-weight:600;color:#0f2b57;margin-bottom:6px}
  .login-form .input-wrap{position:relative}
  .login-form .input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;color:#7b8a9a}
  .login-form input{width:100%;padding:14px 16px 14px 42px;border:1.5px solid #e1e8ef;border-radius:12px;font-size:14px;transition:border-color .25s,box-shadow .25s}
  .login-form input:focus{outline:none;border-color:#f36c1f;box-shadow:0 0 0 3px rgba(243,108,31,.08)}
  .login-form .show-pass{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:#7b8a9a;padding:4px}

  .login-error{background:rgba(239,68,68,.08);color:#dc2626;padding:10px 14px;border-radius:10px;font-size:13px;margin-bottom:18px;display:flex;align-items:center;gap:8px}
  .login-remember{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
  .login-remember label{display:flex;align-items:center;gap:8px;font-size:13px;color:#5a6f82;cursor:pointer}
  .login-remember input[type=checkbox]{width:16px;height:16px;accent-color:#f36c1f}
  .login-remember a{font-size:13px;color:#f36c1f;text-decoration:none;font-weight:600}

  .login-btn{width:100%;padding:15px;background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;box-shadow:0 4px 16px rgba(243,108,31,.25)}
  .login-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(243,108,31,.35)}
  .login-btn:active{transform:translateY(0)}
  .login-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}

  .login-footer{text-align:center;margin-top:28px;padding-top:20px;border-top:1px solid #f0f3f6}
  .login-footer p{font-size:13px;color:#7b8a9a;margin:0 0 8px}
  .login-footer a{color:#f36c1f;font-weight:600;text-decoration:none}
  .login-demo{background:#f8fafc;border-radius:10px;padding:14px;margin-top:20px}
  .login-demo h4{margin:0 0 8px;font-size:12px;color:#7b8a9a;text-transform:uppercase;letter-spacing:.5px}
  .login-demo-row{display:flex;gap:8px}
  .login-demo-btn{flex:1;padding:8px;background:transparent;border:1.5px solid #e1e8ef;border-radius:8px;cursor:pointer;font-size:12px;color:#5a6f82;font-weight:600;transition:all .2s;text-align:center}
  .login-demo-btn:hover{border-color:#f36c1f;color:#f36c1f;background:rgba(243,108,31,.03)}
`

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate slight delay for UX
    setTimeout(() => {
      const result = login(username, password)
      if (result.success) {
        navigate('/admin/news')
      } else {
        setError(result.error)
      }
      setLoading(false)
    }, 600)
  }

  const fillDemo = (u, p) => {
    setUsername(u)
    setPassword(p)
    setError('')
  }

  return (
    <div>
      <style>{loginCSS}</style>
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">🚢</div>
            <h1>Stella Shipping</h1>
            <p>Đăng nhập vào trang quản trị</p>
          </div>

          {error && (
            <div className="login-error">⚠️ {error}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  type="text" placeholder="Nhập tên đăng nhập..."
                  value={username} onChange={e => setUsername(e.target.value)}
                  required autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu..."
                  value={password} onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="show-pass" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="login-remember">
              <label><input type="checkbox" /> Ghi nhớ đăng nhập</label>
              <a href="#forgot">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '⏳ Đang đăng nhập...' : '🔐 Đăng nhập'}
            </button>
          </form>

          <div className="login-demo">
            <h4>Tài khoản demo</h4>
            <div className="login-demo-row">
              <button type="button" className="login-demo-btn" onClick={() => fillDemo('admin', 'admin123')}>
                👑 Admin<br /><small>admin / admin123</small>
              </button>
              <button type="button" className="login-demo-btn" onClick={() => fillDemo('editor', 'editor123')}>
                ✏️ Editor<br /><small>editor / editor123</small>
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p>← <a href="/">Quay lại trang chủ</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
