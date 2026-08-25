import React from 'react'
import { Link } from 'react-router-dom'

const css = `
  .eb-container{
    min-height:60vh;display:flex;align-items:center;justify-content:center;
    padding:40px 20px;font-family:'Inter',sans-serif;
  }
  .eb-card{
    text-align:center;max-width:500px;background:#fff;padding:48px 36px;
    border-radius:20px;box-shadow:0 12px 40px rgba(10,20,40,.08);
    border:1px solid #edf1f7;
  }
  .eb-icon{font-size:56px;margin-bottom:16px}
  .eb-title{font-size:24px;font-weight:800;color:#0f2b57;margin:0 0 12px;font-family:'Be Vietnam Pro',sans-serif}
  .eb-desc{font-size:15px;color:#5a6f82;margin:0 0 28px;line-height:1.65}
  .eb-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .eb-btn{
    padding:12px 24px;border-radius:10px;font-size:14px;font-weight:700;
    text-decoration:none;cursor:pointer;transition:all .25s;border:none;
    display:inline-flex;align-items:center;gap:8px;
  }
  .eb-btn-primary{
    background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;
    box-shadow:0 6px 18px rgba(243,108,31,.2);
  }
  .eb-btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(243,108,31,.3)}
  .eb-btn-secondary{background:#f5f7fa;color:#0f2b57;border:1px solid #edf1f7}
  .eb-btn-secondary:hover{background:#edf1f7}
`

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <style>{css}</style>
          <div className="eb-container">
            <div className="eb-card">
              <div className="eb-icon">⚠️</div>
              <h2 className="eb-title">Đã xảy ra lỗi</h2>
              <p className="eb-desc">
                Xin lỗi, đã có lỗi không mong muốn xảy ra. 
                Vui lòng thử tải lại trang hoặc quay về trang chủ.
              </p>
              <div className="eb-actions">
                <button className="eb-btn eb-btn-primary" onClick={this.handleReload}>
                  🔄 Tải lại trang
                </button>
                <a href="/" className="eb-btn eb-btn-secondary">
                  🏠 Về trang chủ
                </a>
              </div>
            </div>
          </div>
        </>
      )
    }
    return this.props.children
  }
}
