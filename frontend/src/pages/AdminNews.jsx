import React, { useState } from 'react'
import { useArticles } from '../context/ArticlesContext'

const IMAGES = ['/Banner.jpg', '/Shippinglines.jpg', '/AirFreight.jpg', '/INTERMODA.jpg', '/Logictis.jpg', '/OURRANGE.jpg', '/Chacracter.jpg']

const TEMPLATES = [
  {
    id: 'single',
    icon: '🖼️',
    title: 'Cơ bản — 1 ảnh',
    desc: 'Bài viết đơn giản với 1 ảnh đại diện. Phù hợp cho tin tức ngắn, thông báo.',
    preview: '┌──────────┐\n│  🖼️ Ảnh  │\n│          │\n│  Nội     │\n│  dung    │\n└──────────┘'
  },
  {
    id: 'multi',
    icon: '🎨',
    title: 'Đa ảnh — 4 ảnh',
    desc: 'Bài viết với 1 ảnh chính + 3 ảnh phụ hiển thị dạng lưới. Phù hợp tin tức sự kiện, ra mắt.',
    preview: '┌──────────┐\n│  🖼️ Chính│\n│ ┌──┬──┬──┐\n│ │P1│P2│P3│\n│ └──┴──┴──┘\n└──────────┘'
  },
  {
    id: 'gallery',
    icon: '📸',
    title: 'Gallery — Nhiều ảnh',
    desc: 'Thêm không giới hạn ảnh, hiển thị dạng carousel/slideshow. Phù hợp sự kiện, triển lãm, review.',
    preview: '┌──────────┐\n│  🖼️ Chính│\n│ ← 📷📷📷 →\n│  Slide   │\n│  show    │\n└──────────┘'
  },
  {
    id: 'inline',
    icon: '📝',
    title: 'Trộn ảnh — Xen kẽ',
    desc: 'Bài viết với 1 ảnh chính và 3 ảnh phụ xen kẽ trong nội dung. Phù hợp bài phân tích dài.',
    preview: '┌──────────┐\n│  🖼️ Chính│\n│  Text    │\n│  🖼️ Phụ 1│\n│  Text    │\n└──────────┘'
  }
]

const emptyForm = {
  title: '', desc: '', fullDesc: '', category: '', author: '',
  title_en: '', desc_en: '', fullDesc_en: '',
  img: '/Banner.jpg', img2: '', img3: '', img4: '',
  galleryImages: [],
  template: 'single',
  readTime: '3 phút', status: 'draft'
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

  /* template badge */
  .adm-tpl-badge{padding:3px 10px;border-radius:12px;font-size:10px;font-weight:700;letter-spacing:.3px;display:inline-flex;align-items:center;gap:3px}
  .adm-tpl-single{background:rgba(15,43,87,.06);color:#0f2b57}
  .adm-tpl-multi{background:rgba(139,92,246,.08);color:#7c3aed}
  .adm-tpl-gallery{background:rgba(243,108,31,.08);color:#ea580c}

  /* category tag */
  .adm-cat{background:rgba(15,43,87,.06);color:#0f2b57;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600}

  /* actions */
  .adm-actions{display:flex;gap:4px}

  /* modal */
  .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(4px)}
  .adm-modal{background:#fff;border-radius:16px;width:100%;max-width:800px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.2)}
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

  /* ══════ TEMPLATE SELECTOR ══════ */
  .tpl-selector{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px}
  .tpl-card{border:2px solid #e1e8ef;border-radius:14px;padding:20px 18px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;text-align:center}
  .tpl-card:hover{border-color:#c0cadb;transform:translateY(-2px);box-shadow:0 8px 24px rgba(10,20,40,.06)}
  .tpl-card.active{border-color:#f36c1f;background:rgba(243,108,31,.02);box-shadow:0 4px 20px rgba(243,108,31,.12)}
  .tpl-card.active::before{content:'✓';position:absolute;top:10px;right:12px;background:#f36c1f;color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}
  .tpl-icon{font-size:36px;margin-bottom:10px;display:block}
  .tpl-title{font-size:14px;font-weight:700;color:#0f2b57;margin-bottom:6px}
  .tpl-desc{font-size:12px;color:#7b8a9a;line-height:1.5}
  .tpl-preview{font-family:'Courier New',monospace;font-size:10px;color:#b0b8c4;white-space:pre;line-height:1.3;margin-top:10px;background:#f8fafc;padding:8px;border-radius:6px;text-align:left}

  /* ══════ MULTI-IMAGE SECTION ══════ */
  .img-section{background:#f8fafc;border:1px solid #edf1f5;border-radius:12px;padding:20px;margin-bottom:18px}
  .img-section-title{font-size:14px;font-weight:700;color:#0f2b57;margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .img-section-title .badge{background:#f36c1f;color:#fff;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600}
  .img-slot{margin-bottom:16px}
  .img-slot:last-child{margin-bottom:0}
  .img-slot-label{font-size:12px;font-weight:600;color:#5a6f82;margin-bottom:6px;display:flex;align-items:center;gap:6px}
  .img-slot-label .num{background:#0f2b57;color:#fff;width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:800}

  /* ══════ GALLERY MANAGER ══════ */
  .gallery-manager{background:#f8fafc;border:1px solid #edf1f5;border-radius:12px;padding:20px;margin-bottom:18px}
  .gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px;margin-top:12px}
  .gallery-item{position:relative;border-radius:8px;overflow:hidden;aspect-ratio:1;cursor:pointer}
  .gallery-item img{width:100%;height:100%;object-fit:cover}
  .gallery-item .remove-btn{position:absolute;top:4px;right:4px;background:rgba(239,68,68,.9);color:#fff;border:none;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s}
  .gallery-item:hover .remove-btn{opacity:1}
  .gallery-item .order-badge{position:absolute;bottom:4px;left:4px;background:rgba(15,43,87,.8);color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px}
  .gallery-add{border:2px dashed #d5dde6;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 8px;cursor:pointer;transition:all .2s;aspect-ratio:1;font-size:11px;color:#7b8a9a;gap:2px}
  .gallery-add:hover{border-color:#f36c1f;color:#f36c1f;background:rgba(243,108,31,.02)}

  /* ══════ GALLERY PICKER MODAL ══════ */
  .picker-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;max-height:300px;overflow-y:auto;padding:4px}
  .picker-item{border-radius:8px;overflow:hidden;aspect-ratio:1.4;cursor:pointer;border:2.5px solid transparent;transition:all .2s;opacity:.7}
  .picker-item:hover{opacity:1}
  .picker-item.selected{border-color:#f36c1f;opacity:1}
  .picker-item img{width:100%;height:100%;object-fit:cover}

  /* steps indicator */
  .adm-steps{display:flex;align-items:center;gap:0;margin-bottom:24px;padding:0 4px}
  .adm-step{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#b0b8c4;transition:color .2s}
  .adm-step.active{color:#0f2b57}
  .adm-step.done{color:#22c55e}
  .adm-step-num{width:28px;height:28px;border-radius:50%;border:2px solid #d5dde6;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;transition:all .2s}
  .adm-step.active .adm-step-num{border-color:#f36c1f;background:#f36c1f;color:#fff}
  .adm-step.done .adm-step-num{border-color:#22c55e;background:#22c55e;color:#fff}
  .adm-step-line{flex:1;height:2px;background:#e1e8ef;margin:0 12px}

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
    .tpl-selector{grid-template-columns:1fr}
  }
  @media(max-width:600px){
    .adm-stats{grid-template-columns:1fr}
    .adm-header{flex-direction:column;align-items:flex-start}
  }
`

/* ═══════════════════ Image Picker Component ═══════════════════ */
function ImagePicker({ value, onChange, images, mediaFiles, apiUrl, label }) {
  return (
    <div className="img-slot">
      {label && <div className="img-slot-label">{label}</div>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="URL ảnh hoặc chọn bên dưới..."
        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e1e8ef', borderRadius: '8px', fontSize: '13px', marginBottom: 6, fontFamily: 'inherit' }}
      />
      <div className="adm-img-preview" style={{ maxHeight: 120, overflowY: 'auto', padding: 4, background: '#fff', borderRadius: 6, border: '1px solid #edf1f5' }}>
        {[...images, ...mediaFiles.map(f => `${apiUrl}${f.url}`)].map(img => (
          <img
            key={img}
            src={img}
            alt=""
            className={`adm-img-opt ${value === img ? 'selected' : ''}`}
            onClick={() => onChange(img)}
          />
        ))}
      </div>
    </div>
  )
}

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
  const [editorStep, setEditorStep] = useState(1) // 1 = template select, 2 = form
  const [showGalleryPicker, setShowGalleryPicker] = useState(false)

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
    setEditorStep(1) // start with template selection
    setShowEditor(true)
  }

  const openEdit = (article) => {
    setEditingId(article.id)
    setForm({
      title: article.title,
      desc: article.desc,
      fullDesc: article.fullDesc || '',
      title_en: article.title_en || '',
      desc_en: article.desc_en || '',
      fullDesc_en: article.fullDesc_en || '',
      category: article.category,
      author: article.author,
      img: article.img,
      img2: article.img2 || '',
      img3: article.img3 || '',
      img4: article.img4 || '',
      galleryImages: article.galleryImages || [],
      template: article.template || 'single',
      readTime: article.readTime,
      status: article.status || 'published',
    })
    setEditorStep(2) // skip template selection when editing
    setShowEditor(true)
  }

  /* ── Save ── */
  const handleSave = (e, targetStatus) => {
    if (e) e.preventDefault()
    if (!form.title.trim() || !form.desc.trim()) return alert('Vui lòng điền tiêu đề và mô tả.')
    
    // Sử dụng targetStatus được truyền vào, hoặc giữ nguyên form.status nếu không có
    const payload = { ...form }
    if (targetStatus) {
      payload.status = targetStatus
    }

    if (editingId) {
      updateArticle(editingId, payload)
    } else {
      addArticle(payload)
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

  /* ── Gallery helpers ── */
  const addToGallery = (imgUrl) => {
    setForm(f => ({
      ...f,
      galleryImages: [...(f.galleryImages || []), imgUrl]
    }))
  }

  const removeFromGallery = (index) => {
    setForm(f => ({
      ...f,
      galleryImages: f.galleryImages.filter((_, i) => i !== index)
    }))
  }

  /* ── Template label helper ── */
  const getTemplateBadge = (tpl) => {
    switch (tpl) {
      case 'multi': return <span className="adm-tpl-badge adm-tpl-multi">🎨 Đa ảnh</span>
      case 'gallery': return <span className="adm-tpl-badge adm-tpl-gallery">📸 Gallery</span>
      case 'inline': return <span className="adm-tpl-badge adm-tpl-inline" style={{background: 'rgba(34,197,94,.08)', color: '#16a34a'}}>📝 Xen kẽ</span>
      default: return <span className="adm-tpl-badge adm-tpl-single">🖼️ Cơ bản</span>
    }
  }

  const resolveImg = (src) => {
    if (!src) return '/Banner.jpg'
    if (src.startsWith('http')) return src
    if (src.startsWith('/uploads/')) return `${API_URL}${src}`
    return src
  }

  /* ── Inline template helpers ── */
  const getInlineParts = (text) => {
    if (!text) return ['', '', '', ''];
    const parts = text.split('<!-- SPLIT -->');
    while (parts.length < 4) parts.push('');
    return parts;
  }
  
  const updateInlinePart = (index, value, isEn = false) => {
    const key = isEn ? 'fullDesc_en' : 'fullDesc';
    const parts = getInlineParts(form[key]);
    parts[index] = value;
    setForm(f => ({ ...f, [key]: parts.join('<!-- SPLIT -->') }));
  }

  const allImages = [...IMAGES, ...mediaFiles.map(f => `${API_URL}${f.url}`)]

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
                <th>Mẫu</th>
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
                      <img src={resolveImg(a.img)} alt="" className="adm-art-thumb" />
                      <span className="adm-art-title">{a.title}</span>
                    </div>
                  </td>
                  <td>{getTemplateBadge(a.template)}</td>
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
            <div className="adm-modal-body">

              {/* ── Steps Indicator ── */}
              {!editingId && (
                <div className="adm-steps">
                  <div className={`adm-step ${editorStep === 1 ? 'active' : editorStep > 1 ? 'done' : ''}`}>
                    <div className="adm-step-num">{editorStep > 1 ? '✓' : '1'}</div>
                    <span>Chọn mẫu</span>
                  </div>
                  <div className="adm-step-line" />
                  <div className={`adm-step ${editorStep === 2 ? 'active' : ''}`}>
                    <div className="adm-step-num">2</div>
                    <span>Nội dung & Ảnh</span>
                  </div>
                </div>
              )}

              {/* ══════ STEP 1: TEMPLATE SELECTOR ══════ */}
              {editorStep === 1 && !editingId && (
                <div>
                  <p style={{ color: '#5a6f82', fontSize: 14, marginBottom: 20, textAlign: 'center' }}>
                    Chọn bố cục ảnh cho bài viết của bạn. Bạn có thể thay đổi sau khi chỉnh sửa.
                  </p>
                  <div className="tpl-selector">
                    {TEMPLATES.map(tpl => (
                      <div
                        key={tpl.id}
                        className={`tpl-card ${form.template === tpl.id ? 'active' : ''}`}
                        onClick={() => setForm(f => ({ ...f, template: tpl.id }))}
                      >
                        <span className="tpl-icon">{tpl.icon}</span>
                        <div className="tpl-title">{tpl.title}</div>
                        <div className="tpl-desc">{tpl.desc}</div>
                        <div className="tpl-preview">{tpl.preview}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button className="adm-btn adm-btn-outline" onClick={() => setShowEditor(false)}>Hủy</button>
                    <button className="adm-btn adm-btn-primary" onClick={() => setEditorStep(2)}>
                      Tiếp tục →
                    </button>
                  </div>
                </div>
              )}

              {/* ══════ STEP 2: ARTICLE FORM ══════ */}
              {editorStep === 2 && (
                <form onSubmit={handleSave}>
                  {/* Template indicator for editing */}
                  {editingId && (
                    <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, color: '#7b8a9a', fontWeight: 600 }}>Mẫu đang dùng:</span>
                      {getTemplateBadge(form.template)}
                      <select
                        value={form.template}
                        onChange={e => setForm(f => ({ ...f, template: e.target.value }))}
                        style={{ padding: '6px 12px', border: '1.5px solid #e1e8ef', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        <option value="single">🖼️ Cơ bản — 1 ảnh</option>
                        <option value="multi">🎨 Đa ảnh — 4 ảnh</option>
                        <option value="gallery">📸 Gallery — Nhiều ảnh</option>
                      </select>
                    </div>
                  )}

                  {/* Back to template select (for new articles) */}
                  {!editingId && (
                    <div style={{ marginBottom: 16 }}>
                      <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setEditorStep(1)} style={{ fontSize: 13, padding: '6px 12px' }}>
                        ← Đổi mẫu ({TEMPLATES.find(t => t.id === form.template)?.title})
                      </button>
                    </div>
                  )}

                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Tiêu đề (VI) *</label>
                      <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Nhập tiêu đề (VI)..." required />
                    </div>
                    <div className="adm-form-group">
                      <label>Tiêu đề (EN)</label>
                      <input type="text" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder="Enter title (EN)..." />
                    </div>
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

                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Mô tả ngắn (VI) *</label>
                      <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Mô tả ngắn (VI)..." rows={3} required />
                    </div>
                    <div className="adm-form-group">
                      <label>Mô tả ngắn (EN)</label>
                      <textarea value={form.desc_en} onChange={e => setForm(f => ({ ...f, desc_en: e.target.value }))} placeholder="Short description (EN)..." rows={3} />
                    </div>
                  </div>

                  {form.template !== 'inline' && (
                    <div className="adm-form-row">
                      <div className="adm-form-group">
                        <label>Nội dung chi tiết (VI)</label>
                        <textarea value={form.fullDesc} onChange={e => setForm(f => ({ ...f, fullDesc: e.target.value }))} placeholder="Nội dung đầy đủ (VI)..." rows={6} />
                      </div>
                      <div className="adm-form-group">
                        <label>Nội dung chi tiết (EN)</label>
                        <textarea value={form.fullDesc_en} onChange={e => setForm(f => ({ ...f, fullDesc_en: e.target.value }))} placeholder="Full content (EN)..." rows={6} />
                      </div>
                    </div>
                  )}

                  {/* ══════ IMAGE SECTIONS BY TEMPLATE ══════ */}

                  {/* === SINGLE: 1 ảnh === */}
                  <div className="img-section">
                    <div className="img-section-title">
                      🖼️ Ảnh đại diện (chính)
                      <span className="badge">Bắt buộc</span>
                    </div>
                    <ImagePicker
                      value={form.img}
                      onChange={v => setForm(f => ({ ...f, img: v }))}
                      images={IMAGES}
                      mediaFiles={mediaFiles}
                      apiUrl={API_URL}
                    />
                  </div>

                  {/* === MULTI: 3 ảnh phụ grid === */}
                  {form.template === 'multi' && (
                    <div className="img-section">
                      <div className="img-section-title">
                        🎨 Ảnh phụ (3 ảnh grid)
                        <span className="badge">Mẫu đa ảnh</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#7b8a9a', margin: '0 0 14px', lineHeight: 1.5 }}>
                        3 ảnh này sẽ hiển thị dạng lưới bên dưới ảnh chính trong bài viết.
                      </p>
                      <ImagePicker
                        value={form.img2}
                        onChange={v => setForm(f => ({ ...f, img2: v }))}
                        images={IMAGES}
                        mediaFiles={mediaFiles}
                        apiUrl={API_URL}
                        label={<><span className="num">1</span> Ảnh phụ 1</>}
                      />
                      <ImagePicker
                        value={form.img3}
                        onChange={v => setForm(f => ({ ...f, img3: v }))}
                        images={IMAGES}
                        mediaFiles={mediaFiles}
                        apiUrl={API_URL}
                        label={<><span className="num">2</span> Ảnh phụ 2</>}
                      />
                      <ImagePicker
                        value={form.img4}
                        onChange={v => setForm(f => ({ ...f, img4: v }))}
                        images={IMAGES}
                        mediaFiles={mediaFiles}
                        apiUrl={API_URL}
                        label={<><span className="num">3</span> Ảnh phụ 3</>}
                      />
                    </div>
                  )}

                  {/* === INLINE: Nội dung xen kẽ ảnh === */}
                  {form.template === 'inline' && (() => {
                    const partsVi = getInlineParts(form.fullDesc);
                    const partsEn = getInlineParts(form.fullDesc_en);
                    return (
                      <div className="img-section" style={{ background: '#f8fafc' }}>
                        <div className="img-section-title">
                          📝 Nội dung xen kẽ ảnh
                          <span className="badge">Mẫu xen kẽ</span>
                        </div>
                        <p style={{ fontSize: 12, color: '#7b8a9a', margin: '0 0 20px', lineHeight: 1.5 }}>
                          Điền nội dung đoạn 1, chọn ảnh 1, rồi tiếp tục điền nội dung đoạn 2... Hệ thống sẽ ghép lại thành 1 bài viết hoàn chỉnh.
                        </p>

                        <div className="adm-form-row">
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 1 (VI)</label>
                            <textarea value={partsVi[0]} onChange={e => updateInlinePart(0, e.target.value)} rows={4} placeholder="Văn bản nằm dưới ảnh đại diện..." />
                          </div>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 1 (EN)</label>
                            <textarea value={partsEn[0]} onChange={e => updateInlinePart(0, e.target.value, true)} rows={4} />
                          </div>
                        </div>

                        <ImagePicker value={form.img2} onChange={v => setForm(f => ({ ...f, img2: v }))} images={IMAGES} mediaFiles={mediaFiles} apiUrl={API_URL} label={<><span className="num">1</span> Ảnh xen kẽ 1</>} />

                        <div className="adm-form-row" style={{ marginTop: 24 }}>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 2 (VI)</label>
                            <textarea value={partsVi[1]} onChange={e => updateInlinePart(1, e.target.value)} rows={4} placeholder="Văn bản nằm dưới ảnh xen kẽ 1..." />
                          </div>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 2 (EN)</label>
                            <textarea value={partsEn[1]} onChange={e => updateInlinePart(1, e.target.value, true)} rows={4} />
                          </div>
                        </div>

                        <ImagePicker value={form.img3} onChange={v => setForm(f => ({ ...f, img3: v }))} images={IMAGES} mediaFiles={mediaFiles} apiUrl={API_URL} label={<><span className="num">2</span> Ảnh xen kẽ 2</>} />

                        <div className="adm-form-row" style={{ marginTop: 24 }}>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 3 (VI)</label>
                            <textarea value={partsVi[2]} onChange={e => updateInlinePart(2, e.target.value)} rows={4} placeholder="Văn bản nằm dưới ảnh xen kẽ 2..." />
                          </div>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn 3 (EN)</label>
                            <textarea value={partsEn[2]} onChange={e => updateInlinePart(2, e.target.value, true)} rows={4} />
                          </div>
                        </div>

                        <ImagePicker value={form.img4} onChange={v => setForm(f => ({ ...f, img4: v }))} images={IMAGES} mediaFiles={mediaFiles} apiUrl={API_URL} label={<><span className="num">3</span> Ảnh xen kẽ 3</>} />

                        <div className="adm-form-row" style={{ marginTop: 24 }}>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn cuối (VI)</label>
                            <textarea value={partsVi[3]} onChange={e => updateInlinePart(3, e.target.value)} rows={4} placeholder="Đoạn văn kết luận..." />
                          </div>
                          <div className="adm-form-group">
                            <label>Nội dung đoạn cuối (EN)</label>
                            <textarea value={partsEn[3]} onChange={e => updateInlinePart(3, e.target.value, true)} rows={4} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* === GALLERY: unlimited images === */}
                  {form.template === 'gallery' && (
                    <div className="gallery-manager">
                      <div className="img-section-title">
                        📸 Gallery ảnh
                        <span className="badge">{(form.galleryImages || []).length} ảnh</span>
                      </div>
                      <p style={{ fontSize: 12, color: '#7b8a9a', margin: '0 0 14px', lineHeight: 1.5 }}>
                        Thêm ảnh vào gallery. Các ảnh sẽ hiển thị dạng slideshow/carousel trong bài viết.
                      </p>
                      <div className="gallery-grid">
                        {(form.galleryImages || []).map((img, i) => (
                          <div key={i} className="gallery-item">
                            <img src={img} alt="" />
                            <button
                              type="button"
                              className="remove-btn"
                              onClick={() => removeFromGallery(i)}
                              title="Xóa ảnh"
                            >✕</button>
                            <span className="order-badge">{i + 1}</span>
                          </div>
                        ))}
                        <div className="gallery-add" onClick={() => setShowGalleryPicker(true)}>
                          <span style={{ fontSize: 20 }}>➕</span>
                          <span>Thêm ảnh</span>
                        </div>
                      </div>
                    </div>
                  )}

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
                      <button type="button" className="adm-btn adm-btn-secondary" onClick={(e) => handleSave(e, 'draft')}>💾 Lưu nháp</button>
                    )}
                    <button type="button" className="adm-btn adm-btn-primary" onClick={(e) => handleSave(e, 'published')}>
                      {editingId ? '💾 Cập nhật' : '🚀 Xuất bản'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ GALLERY PICKER MODAL ══════════════════ */}
      {showGalleryPicker && (
        <div className="adm-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setShowGalleryPicker(false)}>
          <div className="adm-modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>📸 Chọn ảnh cho Gallery</h2>
              <button className="adm-modal-close" onClick={() => setShowGalleryPicker(false)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <p style={{ fontSize: 13, color: '#7b8a9a', marginBottom: 16 }}>
                Click vào ảnh để thêm vào gallery. Bạn có thể thêm nhiều ảnh.
              </p>

              {/* URL input */}
              <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                <input
                  id="gallery-url-input"
                  type="text"
                  placeholder="Hoặc dán URL ảnh..."
                  style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e1e8ef', borderRadius: 8, fontSize: 13, fontFamily: 'inherit' }}
                />
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => {
                    const input = document.getElementById('gallery-url-input')
                    if (input?.value?.trim()) {
                      addToGallery(input.value.trim())
                      input.value = ''
                    }
                  }}
                >
                  Thêm URL
                </button>
              </div>

              <div className="picker-grid">
                {allImages.map(img => (
                  <div
                    key={img}
                    className={`picker-item ${(form.galleryImages || []).includes(img) ? 'selected' : ''}`}
                    onClick={() => addToGallery(img)}
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <button type="button" className="adm-btn adm-btn-primary" onClick={() => setShowGalleryPicker(false)}>
                  ✓ Xong ({(form.galleryImages || []).length} ảnh)
                </button>
              </div>
            </div>
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
