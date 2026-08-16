import React, { useState } from 'react'
import { useArticles } from '../context/ArticlesContext'

const IMAGES = ['/Banner.jpg', '/Shippinglines.jpg', '/AirFreight.jpg', '/INTERMODA.jpg', '/Logictis.jpg', '/OURRANGE.jpg', '/Chacracter.jpg']

const emptyForm = {
  title: '', desc: '', fullDesc: '', category: '', author: '',
  img: '/Banner.jpg', readTime: '3 phút', status: 'draft'
}

/* ═══════════════════════════════ CSS ═══════════════════════════════ */
const adminCSS = `
  .adm-wrap{max-width:1300px;margin:0 auto;padding:24px;min-height:100vh}

  /* header */
  .adm-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:16px}
  .adm-header h1{font-size:28px;color:#0f2b57;margin:0;font-weight:800;display:flex;align-items:center;gap:10px}
  .adm-header-actions{display:flex;gap:10px;flex-wrap:wrap}

  /* stats row */
  .adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
  .adm-stat-card{background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 12px rgba(10,20,40,.04);border:1px solid #edf1f5;display:flex;align-items:center;gap:16px}
  .adm-stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px}
  .adm-stat-icon.blue{background:rgba(15,43,87,.08)}.adm-stat-icon.orange{background:rgba(243,108,31,.08)}
  .adm-stat-icon.green{background:rgba(34,197,94,.08)}.adm-stat-icon.purple{background:rgba(139,92,246,.08)}
  .adm-stat-num{font-size:28px;font-weight:800;color:#0f2b57;line-height:1}
  .adm-stat-lbl{font-size:13px;color:#7b8a9a;margin-top:2px}

  /* toolbar */
  .adm-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px}
  .adm-toolbar-left{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .adm-search{padding:10px 16px;border:1.5px solid #e1e8ef;border-radius:10px;font-size:14px;width:280px;transition:border-color .2s}
  .adm-search:focus{outline:none;border-color:#f36c1f}
  .adm-select{padding:10px 14px;border:1.5px solid #e1e8ef;border-radius:10px;font-size:13px;background:#fff;cursor:pointer}

  /* buttons */
  .adm-btn{padding:10px 20px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;transition:all .2s;border:none;display:inline-flex;align-items:center;gap:6px}
  .adm-btn-primary{background:#f36c1f;color:#fff}.adm-btn-primary:hover{background:#e05a10}
  .adm-btn-secondary{background:#0f2b57;color:#fff}.adm-btn-secondary:hover{background:#1a3a6a}
  .adm-btn-outline{background:transparent;border:1.5px solid #d5dde6;color:#5a6f82}.adm-btn-outline:hover{border-color:#0f2b57;color:#0f2b57}
  .adm-btn-danger{background:#ef4444;color:#fff}.adm-btn-danger:hover{background:#dc2626}
  .adm-btn-success{background:#22c55e;color:#fff}.adm-btn-success:hover{background:#16a34a}
  .adm-btn-sm{padding:6px 14px;font-size:12px;border-radius:8px}
  .adm-btn-ghost{background:transparent;color:#5a6f82;padding:6px 10px}.adm-btn-ghost:hover{color:#0f2b57;background:rgba(15,43,87,.04)}

  /* table */
  .adm-table-wrap{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(10,20,40,.04);border:1px solid #edf1f5}
  .adm-table{width:100%;border-collapse:collapse}
  .adm-table th{background:#f8fafc;text-align:left;padding:14px 16px;font-size:12px;color:#7b8a9a;text-transform:uppercase;letter-spacing:.5px;font-weight:700;border-bottom:1px solid #edf1f5}
  .adm-table td{padding:14px 16px;border-bottom:1px solid #f0f3f6;font-size:14px;vertical-align:middle}
  .adm-table tr:last-child td{border-bottom:none}
  .adm-table tr:hover td{background:#fafbfc}
  .adm-art-title{font-weight:600;color:#0f2b57;max-width:320px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .adm-art-row{display:flex;align-items:center;gap:12px}
  .adm-art-thumb{width:56px;height:40px;border-radius:6px;object-fit:cover}

  /* status badges */
  .adm-badge{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.3px}
  .adm-badge-pub{background:rgba(34,197,94,.1);color:#16a34a}
  .adm-badge-draft{background:rgba(245,158,11,.1);color:#d97706}

  /* category tag */
  .adm-cat{background:rgba(15,43,87,.06);color:#0f2b57;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600}

  /* actions */
  .adm-actions{display:flex;gap:4px}

  /* modal */
  .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(4px)}
  .adm-modal{background:#fff;border-radius:16px;width:100%;max-width:720px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.2)}
  .adm-modal-header{display:flex;justify-content:space-between;align-items:center;padding:24px 28px 0;margin-bottom:8px}
  .adm-modal-header h2{margin:0;font-size:22px;color:#0f2b57;font-weight:800}
  .adm-modal-close{background:none;border:none;font-size:24px;cursor:pointer;color:#7b8a9a;padding:4px;transition:color .2s}
  .adm-modal-close:hover{color:#0f2b57}
  .adm-modal-body{padding:20px 28px 28px}

  /* form */
  .adm-form-group{margin-bottom:18px}
  .adm-form-group label{display:block;font-size:13px;font-weight:600;color:#0f2b57;margin-bottom:6px}
  .adm-form-group input,.adm-form-group select,.adm-form-group textarea{width:100%;padding:12px 16px;border:1.5px solid #e1e8ef;border-radius:10px;font-size:14px;transition:border-color .2s;font-family:inherit}
  .adm-form-group input:focus,.adm-form-group select:focus,.adm-form-group textarea:focus{outline:none;border-color:#f36c1f}
  .adm-form-group textarea{min-height:100px;resize:vertical}
  .adm-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .adm-form-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
  .adm-img-preview{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}
  .adm-img-opt{width:64px;height:44px;border-radius:8px;object-fit:cover;cursor:pointer;border:2.5px solid transparent;transition:border-color .2s;opacity:.6}
  .adm-img-opt.selected{border-color:#f36c1f;opacity:1}
  .adm-img-opt:hover{opacity:1}
  .adm-form-footer{display:flex;justify-content:flex-end;gap:10px;padding-top:8px;border-top:1px solid #f0f3f6;margin-top:8px}

  /* empty */
  .adm-empty{text-align:center;padding:60px 20px;color:#7b8a9a}
  .adm-empty-icon{font-size:48px;margin-bottom:12px}

  /* confirm dialog */
  .adm-confirm{text-align:center;padding:36px 28px}
  .adm-confirm-icon{font-size:48px;margin-bottom:16px}
  .adm-confirm h3{margin:0 0 8px;color:#0f2b57;font-size:20px}
  .adm-confirm p{color:#5a6f82;margin-bottom:24px}
  .adm-confirm-btns{display:flex;gap:10px;justify-content:center}

  /* pagination */
  .adm-pagination{display:flex;justify-content:space-between;align-items:center;padding:16px;border-top:1px solid #f0f3f6}
  .adm-pagination span{font-size:13px;color:#7b8a9a}
  .adm-page-btns{display:flex;gap:4px}
  .adm-page-btn{width:36px;height:36px;border:1px solid #e1e8ef;border-radius:8px;background:#fff;cursor:pointer;font-size:13px;font-weight:600;color:#5a6f82;display:flex;align-items:center;justify-content:center;transition:all .2s}
  .adm-page-btn.active{background:#0f2b57;color:#fff;border-color:#0f2b57}
  .adm-page-btn:hover:not(.active){background:#f5f8fb}

  /* responsive */
  @media(max-width:900px){
    .adm-stats{grid-template-columns:repeat(2,1fr)}
    .adm-form-row,.adm-form-row3{grid-template-columns:1fr}
    .adm-table-wrap{overflow-x:auto}
    .adm-toolbar{flex-direction:column;align-items:stretch}
    .adm-toolbar-left{flex-direction:column}
    .adm-search{width:100%}
  }
  @media(max-width:600px){
    .adm-stats{grid-template-columns:1fr}
    .adm-header{flex-direction:column;align-items:flex-start}
  }
`

export default function AdminNews() {
  const { articles, addArticle, updateArticle, deleteArticle, resetToSeed } = useArticles()

  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 8

  // Categories & Media files
  const [categories, setCategories] = useState([])
  const [mediaFiles, setMediaFiles] = useState([])
  const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com';

  React.useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const catNames = data.map(c => c.name)
          setCategories(catNames)
          if (catNames.length > 0) emptyForm.category = catNames[0]
        }
      })
      .catch(console.error)

    fetch(`${API_URL}/api/media`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMediaFiles(data)
      })
      .catch(console.error)
  }, [])

  // modal states
  const [showEditor, setShowEditor] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  /* ── Filter & search ── */
  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.author.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || a.category === filterCat
    const matchStatus = filterStatus === 'all' || a.status === filterStatus
    return matchSearch && matchCat && matchStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  /* ── Stats ── */
  const totalArticles = articles.length
  const published = articles.filter(a => a.status === 'published').length
  const drafts = articles.filter(a => a.status === 'draft').length
  const uniqueCatCount = [...new Set(articles.map(a => a.category))].length

  /* ── Open editor ── */
  const openCreate = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setShowEditor(true)
  }

  const openEdit = (article) => {
    setEditingId(article.id)
    setForm({
      title: article.title,
      desc: article.desc,
      fullDesc: article.fullDesc || '',
      category: article.category,
      author: article.author,
      img: article.img,
      readTime: article.readTime,
      status: article.status || 'published',
    })
    setShowEditor(true)
  }

  /* ── Save ── */
  const handleSave = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.desc.trim()) return alert('Vui lòng điền tiêu đề và mô tả.')
    if (editingId) {
      updateArticle(editingId, form)
    } else {
      addArticle(form)
    }
    setShowEditor(false)
    setForm({ ...emptyForm })
  }

  /* ── Toggle status ── */
  const toggleStatus = (id, currentStatus) => {
    updateArticle(id, { status: currentStatus === 'published' ? 'draft' : 'published' })
  }

  /* ── Delete ── */
  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteArticle(deleteConfirm)
      setDeleteConfirm(null)
    }
  }

  return (
    <div>
      <style>{adminCSS}</style>
      <div className="adm-wrap">
        {/* ── Header ── */}
        <div className="adm-header">
          <h1>📰 Quản lý Bài viết</h1>
          <div className="adm-header-actions">
            <button className="adm-btn adm-btn-outline" onClick={resetToSeed}>🔄 Reset dữ liệu mẫu</button>
            <button className="adm-btn adm-btn-primary" onClick={openCreate}>✏️ Tạo bài viết mới</button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="adm-stats">
          <div className="adm-stat-card">
            <div className="adm-stat-icon blue">📄</div>
            <div><div className="adm-stat-num">{totalArticles}</div><div className="adm-stat-lbl">Tổng bài viết</div></div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon green">✅</div>
            <div><div className="adm-stat-num">{published}</div><div className="adm-stat-lbl">Đã xuất bản</div></div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon orange">📝</div>
            <div><div className="adm-stat-num">{drafts}</div><div className="adm-stat-lbl">Bản nháp</div></div>
          </div>
          <div className="adm-stat-card">
            <div className="adm-stat-icon purple">📂</div>
            <div><div className="adm-stat-num">{uniqueCatCount}</div><div className="adm-stat-lbl">Danh mục</div></div>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className="adm-toolbar">
          <div className="adm-toolbar-left">
            <input className="adm-search" type="text" placeholder="🔍 Tìm kiếm bài viết..." value={search} onChange={e => setSearch(e.target.value)} />
            <select className="adm-select" value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1) }}>
              <option value="all">Tất cả danh mục</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="adm-select" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
          <span style={{ fontSize: 13, color: '#7b8a9a' }}>{filtered.length} kết quả</span>
        </div>

        {/* ── Table ── */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Bài viết</th>
                <th>Danh mục</th>
                <th>Tác giả</th>
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th style={{ width: 160 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((a, i) => (
                <tr key={a.id}>
                  <td style={{ color: '#7b8a9a', fontWeight: 600 }}>{(currentPage - 1) * perPage + i + 1}</td>
                  <td>
                    <div className="adm-art-row">
                      <img src={a.img} alt="" className="adm-art-thumb" />
                      <span className="adm-art-title">{a.title}</span>
                    </div>
                  </td>
                  <td><span className="adm-cat">{a.category}</span></td>
                  <td style={{ fontSize: 13, color: '#5a6f82' }}>{a.author}</td>
                  <td style={{ fontSize: 13, color: '#5a6f82', whiteSpace: 'nowrap' }}>{a.date}</td>
                  <td>
                    <span className={`adm-badge ${a.status === 'published' ? 'adm-badge-pub' : 'adm-badge-draft'}`}>
                      {a.status === 'published' ? '● Xuất bản' : '● Nháp'}
                    </span>
                  </td>
                  <td>
                    <div className="adm-actions">
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => openEdit(a)} title="Chỉnh sửa">✏️</button>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggleStatus(a.id, a.status)} title={a.status === 'published' ? 'Chuyển nháp' : 'Xuất bản'}>
                        {a.status === 'published' ? '📥' : '🚀'}
                      </button>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setDeleteConfirm(a.id)} title="Xóa" style={{ color: '#ef4444' }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {paginated.length === 0 && (
            <div className="adm-empty">
              <div className="adm-empty-icon">📭</div>
              <p>Không tìm thấy bài viết nào.</p>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > perPage && (
            <div className="adm-pagination">
              <span>Hiển thị {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} / {filtered.length} bài viết</span>
              <div className="adm-page-btns">
                <button className="adm-page-btn" disabled={currentPage <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={`adm-page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                ))}
                <button className="adm-page-btn" disabled={currentPage >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════ EDITOR MODAL ══════════════════ */}
      {showEditor && (
        <div className="adm-modal-overlay" onClick={() => setShowEditor(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>{editingId ? '✏️ Chỉnh sửa bài viết' : '📝 Tạo bài viết mới'}</h2>
              <button className="adm-modal-close" onClick={() => setShowEditor(false)}>✕</button>
            </div>
            <form className="adm-modal-body" onSubmit={handleSave}>
              <div className="adm-form-group">
                <label>Tiêu đề bài viết *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nhập tiêu đề bài viết..." required />
              </div>

              <div className="adm-form-row3">
                <div className="adm-form-group">
                  <label>Danh mục</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Tác giả</label>
                  <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Tên tác giả" />
                </div>
                <div className="adm-form-group">
                  <label>Thời gian đọc</label>
                  <input type="text" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} placeholder="VD: 5 phút" />
                </div>
              </div>

              <div className="adm-form-group">
                <label>Mô tả ngắn *</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Mô tả ngắn gọn hiển thị trong danh sách tin tức..." rows={3} required />
              </div>

              <div className="adm-form-group">
                <label>Nội dung chi tiết</label>
                <textarea value={form.fullDesc} onChange={e => setForm(f => ({ ...f, fullDesc: e.target.value }))} placeholder="Nội dung đầy đủ của bài viết..." rows={6} />
              </div>

              <div className="adm-form-group">
                <label>Ảnh đại diện (Chọn ảnh mẫu hoặc ảnh đã tải lên từ thư viện Media)</label>
                <input type="text" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="Ví dụ: https://stella-shipping.onrender.com/uploads/..." style={{ marginBottom: 12 }} />
                <div className="adm-img-preview" style={{ maxHeight: 200, overflowY: 'auto', padding: 4, background: '#f8fafc', borderRadius: 8, border: '1px solid #e1e8ef' }}>
                  {[...IMAGES, ...mediaFiles.map(f => `${API_URL}${f.url}`)].map(img => (
                    <img key={img} src={img} alt="" className={`adm-img-opt ${form.img === img ? 'selected' : ''}`} onClick={() => setForm(f => ({ ...f, img }))} />
                  ))}
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Trạng thái</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="draft">📝 Bản nháp</option>
                    <option value="published">✅ Xuất bản ngay</option>
                  </select>
                </div>
                <div />
              </div>

              <div className="adm-form-footer">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setShowEditor(false)}>Hủy</button>
                {!editingId && (
                  <button type="submit" className="adm-btn adm-btn-secondary" onClick={() => setForm(f => ({ ...f, status: 'draft' }))}>💾 Lưu nháp</button>
                )}
                <button type="submit" className="adm-btn adm-btn-primary" onClick={() => { if (!editingId) setForm(f => ({ ...f, status: 'published' })) }}>
                  {editingId ? '💾 Cập nhật' : '🚀 Xuất bản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════ DELETE CONFIRM ══════════════════ */}
      {deleteConfirm && (
        <div className="adm-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="adm-modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="adm-confirm">
              <div className="adm-confirm-icon">⚠️</div>
              <h3>Xác nhận xóa bài viết</h3>
              <p>Bài viết sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn có chắc chắn muốn tiếp tục?</p>
              <div className="adm-confirm-btns">
                <button className="adm-btn adm-btn-outline" onClick={() => setDeleteConfirm(null)}>Hủy</button>
                <button className="adm-btn adm-btn-danger" onClick={confirmDelete}>🗑️ Xóa bài viết</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
