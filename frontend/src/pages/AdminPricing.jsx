import React, { useState, useEffect } from 'react'


const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/pricing` : 'http://localhost:4000/api/pricing'

const SERVICE_TYPES = [
  { value: 'sea_fcl', label: '🚢 Biển FCL' },
  { value: 'sea_lcl', label: '📦 Biển LCL' },
  { value: 'air', label: '✈️ Hàng không' },
  { value: 'road', label: '🚛 Đường bộ' },
  { value: 'warehouse', label: '🏭 Kho bãi' },
]

const EMPTY_FORM = {
  service_type: 'sea_fcl',
  service_type_en: '',
  route: '',
  route_en: '',
  unit: '',
  price_from: '',
  currency: 'USD',
  transit_time: '',
  note: '',
  note_en: '',
  is_active: 1,
}

function formatPrice(price, currency) {
  if (currency === 'USD') return `$${Number(price).toLocaleString('en-US')}`
  return `${Number(price).toLocaleString('vi-VN')} ₫`
}

function formatUpdated(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('vi-VN')
}

const css = `
  .ap-wrap { padding: 28px 32px; }
  .ap-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .ap-title { font-size: 22px; font-weight: 800; color: #0f2b57; margin: 0; }
  .ap-subtitle { font-size: 13px; color: #7b8a9a; margin: 4px 0 0; }
  .ap-btn-add {
    display: flex; align-items: center; gap: 8px; padding: 11px 22px;
    background: linear-gradient(135deg, #f36c1f, #e05a10); color: #fff;
    border: none; border-radius: 10px; font-size: 14px; font-weight: 700;
    cursor: pointer; box-shadow: 0 4px 14px rgba(243,108,31,.3); transition: all .22s;
  }
  .ap-btn-add:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(243,108,31,.4); }

  /* Filters */
  .ap-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 22px; }
  .ap-filter-btn {
    padding: 8px 18px; border-radius: 20px; border: 1.5px solid #d5dde6;
    background: #fff; color: #5a6f82; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s;
  }
  .ap-filter-btn:hover { border-color: #0f2b57; color: #0f2b57; }
  .ap-filter-btn.active { background: #0f2b57; color: #fff; border-color: #0f2b57; }

  /* Table card */
  .ap-card { background: #fff; border-radius: 14px; box-shadow: 0 4px 24px rgba(10,20,40,.06); border: 1px solid #edf1f7; overflow: hidden; }
  .ap-table-wrap { overflow-x: auto; }
  .ap-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .ap-table th { background: #f5f8fb; text-align: left; padding: 13px 16px; font-size: 11px; color: #7b8a9a; text-transform: uppercase; letter-spacing: .7px; font-weight: 700; border-bottom: 1px solid #edf1f7; white-space: nowrap; }
  .ap-table td { padding: 14px 16px; border-bottom: 1px solid #f3f5f8; vertical-align: middle; }
  .ap-table tr:last-child td { border-bottom: none; }
  .ap-table tr:hover td { background: #fafbfd; }
  .ap-svc-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; }
  .ap-svc-sea_fcl { background: #e0f0ff; color: #0369a1; }
  .ap-svc-sea_lcl { background: #e0f0ff; color: #0369a1; }
  .ap-svc-air { background: #ede9fe; color: #6d28d9; }
  .ap-svc-road { background: #dcfce7; color: #15803d; }
  .ap-svc-warehouse { background: #fff7ed; color: #c2410c; }
  .ap-price-cell { font-weight: 800; color: #f36c1f; font-size: 15px; }
  .ap-route { font-weight: 600; color: #0f2b57; max-width: 200px; }
  .ap-transit { color: #22c55e; font-weight: 600; }
  .ap-note { color: #7b8a9a; font-size: 12px; max-width: 180px; }
  .ap-ts { font-size: 11px; color: #9aabbb; white-space: nowrap; }

  /* Row actions */
  .ap-actions { display: flex; gap: 6px; }
  .ap-btn-edit {
    padding: 6px 14px; border-radius: 7px; border: 1.5px solid #0f2b57; color: #0f2b57;
    background: #fff; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .2s;
  }
  .ap-btn-edit:hover { background: #0f2b57; color: #fff; }
  .ap-btn-del {
    padding: 6px 14px; border-radius: 7px; border: 1.5px solid #e53e3e; color: #e53e3e;
    background: #fff; font-size: 12px; font-weight: 700; cursor: pointer; transition: all .2s;
  }
  .ap-btn-del:hover { background: #e53e3e; color: #fff; }
  .ap-status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
  .ap-status-dot.on { background: #22c55e; }
  .ap-status-dot.off { background: #d1d5db; }

  /* Empty */
  .ap-empty { text-align: center; padding: 60px 24px; color: #9aabbb; }
  .ap-empty-icon { font-size: 40px; margin-bottom: 12px; }

  /* Modal overlay */
  .ap-overlay { position: fixed; inset: 0; background: rgba(10,20,40,.5); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn .2s ease; }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  .ap-modal {
    background: #fff; border-radius: 18px; width: 100%; max-width: 600px; max-height: 92vh;
    overflow-y: auto; box-shadow: 0 24px 80px rgba(0,0,0,.25); animation: slideUp .25s ease;
  }
  @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
  .ap-modal-header { padding: 24px 28px 0; display: flex; align-items: center; justify-content: space-between; }
  .ap-modal-header h3 { margin: 0; font-size: 18px; color: #0f2b57; font-weight: 800; }
  .ap-modal-close { background: none; border: none; font-size: 22px; cursor: pointer; color: #9aabbb; line-height: 1; padding: 4px; border-radius: 6px; transition: color .2s; }
  .ap-modal-close:hover { color: #0f2b57; }
  .ap-modal-body { padding: 20px 28px 28px; }
  .ap-field { margin-bottom: 16px; }
  .ap-field label { display: block; font-size: 12px; font-weight: 700; color: #0f2b57; letter-spacing: .5px; margin-bottom: 6px; }
  .ap-field input, .ap-field select, .ap-field textarea {
    width: 100%; padding: 11px 14px; border: 1.5px solid #e1e8ef; border-radius: 9px;
    font-size: 14px; font-family: inherit; color: #1a2744; transition: border-color .2s; box-sizing: border-box;
  }
  .ap-field input:focus, .ap-field select:focus, .ap-field textarea:focus { outline: none; border-color: #f36c1f; box-shadow: 0 0 0 3px rgba(243,108,31,.08); }
  .ap-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ap-modal-footer { padding: 16px 28px 24px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #f0f4f8; }
  .ap-btn-cancel { padding: 11px 24px; border: 1.5px solid #d5dde6; border-radius: 9px; background: #fff; color: #5a6f82; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; }
  .ap-btn-cancel:hover { border-color: #9aabbb; }
  .ap-btn-save { padding: 11px 28px; background: linear-gradient(135deg, #f36c1f, #e05a10); color: #fff; border: none; border-radius: 9px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(243,108,31,.3); transition: all .22s; }
  .ap-btn-save:hover { transform: translateY(-1px); }
  .ap-success { padding: 10px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 9px; color: #15803d; font-size: 13px; font-weight: 600; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
`

export default function AdminPricing() {
  const [rates, setRates] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const load = () => {
    setLoading(true)
    fetch(API + '?type=')
      // Fetch all including inactive for admin
      .then(r => r.json())
      .then(d => { setRates(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => { setRates([]); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const filtered = filterType === 'all' ? rates : rates.filter(r => r.service_type === filterType)

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true) }
  const openEdit = (r) => {
    setEditing(r)
    setForm({
      service_type: r.service_type,
      service_type_en: r.service_type_en || '',
      route: r.route,
      route_en: r.route_en || '',
      unit: r.unit,
      price_from: r.price_from,
      currency: r.currency,
      transit_time: r.transit_time || '',
      note: r.note || '',
      note_en: r.note_en || '',
      is_active: r.is_active,
    })
    setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setEditing(null) }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }))
  }

  const handleSave = async () => {
    if (!form.route || !form.unit || !form.price_from) return alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    setSaving(true)
    try {
      const method = editing ? 'PUT' : 'POST'
      const url = editing ? `${API}/${editing.id}` : API
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      closeModal()
      load()
      setSuccess(editing ? 'Đã cập nhật giá thành công!' : 'Đã thêm giá mới thành công!')
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa dòng giá này?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <>
      <style>{css}</style>
      <div className="ap-wrap">

        {/* Header */}
        <div className="ap-header">
          <div>
            <h1 className="ap-title">💰 Quản lý Bảng giá</h1>
            <p className="ap-subtitle">Cập nhật giá cước hàng ngày — thay đổi sẽ hiện ngay trên trang Bảng giá</p>
          </div>
          <button className="ap-btn-add" onClick={openAdd}>
            + Thêm dòng giá mới
          </button>
        </div>

        {success && <div className="ap-success">✅ {success}</div>}

        {/* Filter tabs */}
        <div className="ap-filters">
          <button className={`ap-filter-btn${filterType === 'all' ? ' active' : ''}`} onClick={() => setFilterType('all')}>
            Tất cả ({rates.length})
          </button>
          {SERVICE_TYPES.map(t => (
            <button
              key={t.value}
              className={`ap-filter-btn${filterType === t.value ? ' active' : ''}`}
              onClick={() => setFilterType(t.value)}
            >
              {t.label} ({rates.filter(r => r.service_type === t.value).length})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="ap-card">
          <div className="ap-table-wrap">
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9aabbb' }}>Đang tải...</div>
            ) : filtered.length === 0 ? (
              <div className="ap-empty">
                <div className="ap-empty-icon">📋</div>
                <p>Chưa có dữ liệu giá</p>
              </div>
            ) : (
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Loại DV</th>
                    <th>Tuyến / Dịch vụ</th>
                    <th>Đơn vị</th>
                    <th>Giá từ</th>
                    <th>Thời gian</th>
                    <th>Ghi chú</th>
                    <th>Trạng thái</th>
                    <th>Cập nhật</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id}>
                      <td>
                        <span className={`ap-svc-badge ap-svc-${r.service_type}`}>
                          {SERVICE_TYPES.find(t => t.value === r.service_type)?.label || r.service_type}
                        </span>
                      </td>
                      <td><span className="ap-route">{r.route}</span></td>
                      <td><code style={{ background: '#f0f4f8', padding: '2px 8px', borderRadius: 5, fontSize: 12 }}>{r.unit}</code></td>
                      <td><span className="ap-price-cell">{formatPrice(r.price_from, r.currency)}</span></td>
                      <td>{r.transit_time ? <span className="ap-transit">{r.transit_time}</span> : <span style={{ color: '#d1d5db' }}>—</span>}</td>
                      <td><span className="ap-note">{r.note || '—'}</span></td>
                      <td>
                        <span className={`ap-status-dot ${r.is_active ? 'on' : 'off'}`} />
                        {r.is_active ? 'Hiển thị' : 'Ẩn'}
                      </td>
                      <td><span className="ap-ts">{formatUpdated(r.updated_at)}</span></td>
                      <td>
                        <div className="ap-actions">
                          <button className="ap-btn-edit" onClick={() => openEdit(r)}>✏️ Sửa</button>
                          <button className="ap-btn-del" onClick={() => handleDelete(r.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal thêm/sửa ── */}
      {showModal && (
        <div className="ap-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="ap-modal">
            <div className="ap-modal-header">
              <h3>{editing ? '✏️ Sửa dòng giá' : '➕ Thêm dòng giá mới'}</h3>
              <button className="ap-modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="ap-modal-body">
              <div className="ap-field-row">
                <div className="ap-field">
                  <label>LOẠI DỊCH VỤ (MÃ) *</label>
                  <select name="service_type" value={form.service_type} onChange={handleChange}>
                    {SERVICE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="ap-field">
                  <label>TÊN DỊCH VỤ (EN) *</label>
                  <input name="service_type_en" placeholder="VD: Ocean Freight (FCL)" value={form.service_type_en} onChange={handleChange} />
                </div>
              </div>
              <div className="ap-field-row">
                <div className="ap-field">
                  <label>TUYẾN ĐƯỜNG / DỊCH VỤ (VI) *</label>
                  <input name="route" placeholder="VD: TP.HCM → Shanghai (Trung Quốc)" value={form.route} onChange={handleChange} />
                </div>
                <div className="ap-field">
                  <label>TUYẾN ĐƯỜNG / DỊCH VỤ (EN)</label>
                  <input name="route_en" placeholder="VD: HCMC → Shanghai (China)" value={form.route_en} onChange={handleChange} />
                </div>
              </div>
              <div className="ap-field-row">
                <div className="ap-field">
                  <label>ĐƠN VỊ TÍNH *</label>
                  <input name="unit" placeholder="VD: 20' DC, kg, CBM, pallet/tháng" value={form.unit} onChange={handleChange} />
                </div>
                <div className="ap-field">
                  <label>THỜI GIAN VẬN CHUYỂN</label>
                  <input name="transit_time" placeholder="VD: 14–16 ngày" value={form.transit_time} onChange={handleChange} />
                </div>
              </div>
              <div className="ap-field-row">
                <div className="ap-field">
                  <label>GIÁ TỪ *</label>
                  <input type="number" name="price_from" placeholder="0" value={form.price_from} onChange={handleChange} min="0" step="0.01" />
                </div>
                <div className="ap-field">
                  <label>ĐƠN VỊ TIỀN</label>
                  <select name="currency" value={form.currency} onChange={handleChange}>
                    <option value="USD">USD ($)</option>
                    <option value="VND">VNĐ (₫)</option>
                  </select>
                </div>
              </div>
              <div className="ap-field-row">
                <div className="ap-field">
                  <label>GHI CHÚ (VI)</label>
                  <textarea name="note" rows={2} placeholder="Ghi chú về giá, điều kiện áp dụng..." value={form.note} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>
                <div className="ap-field">
                  <label>GHI CHÚ (EN)</label>
                  <textarea name="note_en" rows={2} placeholder="Notes, conditions..." value={form.note_en} onChange={handleChange} style={{ resize: 'vertical' }} />
                </div>
              </div>
              <div className="ap-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" name="is_active" checked={form.is_active === 1} onChange={handleChange} style={{ width: 'auto', margin: 0 }} />
                  Hiển thị trên trang công khai
                </label>
              </div>
            </div>
            <div className="ap-modal-footer">
              <button className="ap-btn-cancel" onClick={closeModal}>Hủy</button>
              <button className="ap-btn-save" onClick={handleSave} disabled={saving}>
                {saving ? 'Đang lưu...' : '💾 Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
