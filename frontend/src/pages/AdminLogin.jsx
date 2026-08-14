import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const loginCSS = `
  .login-container {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  /* Left Side - Image & Branding */
  .login-left {
    flex: 1;
    background: url('/Shippinglines.jpg') center/cover no-repeat;
    position: relative;
    display: none;
  }
  
  @media (min-width: 900px) {
    .login-left {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 60px;
    }
  }
  
  .login-left-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 43, 87, 0.2) 0%, rgba(15, 43, 87, 0.95) 100%);
  }
  
  .login-brand-content {
    position: relative;
    z-index: 10;
    color: #fff;
  }
  
  .login-brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .login-brand-icon {
    width: 48px;
    height: 48px;
    background: #f36c1f;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
  }
  
  .login-brand-logo h1 {
    font-size: 28px;
    margin: 0;
    font-weight: 800;
    letter-spacing: 0.5px;
  }
  
  .login-brand-content p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    max-width: 400px;
    margin: 0;
  }
  
  /* Right Side - Form */
  .login-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 24px;
    position: relative;
  }
  
  .login-form-wrapper {
    width: 100%;
    max-width: 400px;
  }
  
  .login-header {
    margin-bottom: 40px;
  }
  
  .login-header h2 {
    font-size: 32px;
    color: #0f2b57;
    margin: 0 0 8px;
    font-weight: 800;
  }
  
  .login-header p {
    color: #7b8a9a;
    font-size: 15px;
    margin: 0;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #0f2b57;
    margin-bottom: 8px;
  }
  
  .input-wrap {
    position: relative;
  }
  
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 18px;
  }
  
  .login-input {
    width: 100%;
    padding: 16px 16px 16px 46px;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    color: #0f2b57;
    transition: all 0.2s ease;
  }
  
  .login-input:focus {
    outline: none;
    background: #fff;
    border-color: #f36c1f;
    box-shadow: 0 0 0 4px rgba(243, 108, 31, 0.1);
  }
  
  .show-pass {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #a0aec0;
    padding: 4px;
  }
  
  .login-error {
    background: rgba(239, 68, 68, 0.08);
    color: #dc2626;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
  
  .login-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }
  
  .login-options label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #4a5568;
    cursor: pointer;
  }
  
  .login-options input[type=checkbox] {
    width: 18px;
    height: 18px;
    accent-color: #f36c1f;
  }
  
  .forgot-link {
    font-size: 14px;
    color: #f36c1f;
    text-decoration: none;
    font-weight: 600;
  }
  
  .login-btn {
    width: 100%;
    padding: 16px;
    background: #f36c1f;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(243, 108, 31, 0.2);
  }
  
  .login-btn:hover {
    background: #e05a10;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(243, 108, 31, 0.3);
  }
  
  .login-btn:active {
    transform: translateY(0);
  }
  
  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .back-home {
    display: block;
    text-align: center;
    margin-top: 32px;
    color: #7b8a9a;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
  }
  
  .back-home:hover {
    color: #0f2b57;
  }
`

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(username, password)
    if (result.success) {
      navigate('/admin/news')
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div>
      <style>{loginCSS}</style>
      <div className="login-container">
        
        {/* Left Side: Branding & Image */}
        <div className="login-left">
          <div className="login-left-overlay"></div>
          <div className="login-brand-content">
            <div className="login-brand-logo">
              <div className="login-brand-icon">🚢</div>
              <h1>Stella Shipping</h1>
            </div>
            <p>
              Hệ thống quản trị Nội dung & Dữ liệu khách hàng. 
              Cung cấp công cụ mạnh mẽ để quản lý chuỗi cung ứng logistics toàn cầu.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>Đăng nhập</h2>
              <p>Vui lòng điền thông tin để truy cập hệ thống quản trị.</p>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <div className="input-wrap">
                  <span className="input-icon">👤</span>
                  <input
                    type="text" 
                    className="login-input"
                    placeholder="Nhập tên đăng nhập"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    required 
                    autoFocus
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mật khẩu</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'} 
                    className="login-input"
                    placeholder="Nhập mật khẩu"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="show-pass" 
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label>
                  <input type="checkbox" defaultChecked /> Ghi nhớ đăng nhập
                </label>
                <a href="#forgot" className="forgot-link">Quên mật khẩu?</a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}
              </button>
            </form>

            <a href="/" className="back-home">
              ← Quay lại Trang chủ
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
