import React, { useState, useEffect } from 'react';


const adminCSS = `
  .adm-wrap { max-width: 1300px; margin: 0 auto; padding: 24px; min-height: 100vh; }
  .adm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
  .adm-header h1 { font-size: 28px; color: #0f2b57; margin: 0; font-weight: 800; }
  
  .adm-btn { padding: 10px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all .2s; border: none; display: inline-flex; align-items: center; gap: 6px; }
  .adm-btn-primary { background: #f36c1f; color: #fff; } .adm-btn-primary:hover { background: #e05a10; }
  .adm-btn-outline { background: transparent; border: 1.5px solid #d5dde6; color: #5a6f82; } .adm-btn-outline:hover { border-color: #0f2b57; color: #0f2b57; }
  .adm-btn-danger { background: #ef4444; color: #fff; } .adm-btn-danger:hover { background: #dc2626; }
  .adm-btn-ghost { background: transparent; color: #5a6f82; padding: 6px 10px; } .adm-btn-ghost:hover { color: #0f2b57; background: rgba(15,43,87,.04); }
  .adm-btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 8px; }

  .adm-table-wrap { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 12px rgba(10,20,40,.04); border: 1px solid #edf1f5; }
  .adm-table { width: 100%; border-collapse: collapse; }
  .adm-table th { background: #f8fafc; text-align: left; padding: 14px 16px; font-size: 12px; color: #7b8a9a; text-transform: uppercase; font-weight: 700; border-bottom: 1px solid #edf1f5; }
  .adm-table td { padding: 14px 16px; border-bottom: 1px solid #f0f3f6; font-size: 14px; vertical-align: middle; }
  .adm-table tr:hover td { background: #fafbfc; }

  .adm-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; backdrop-filter: blur(4px); }
  .adm-modal { background: #fff; border-radius: 16px; width: 100%; max-width: 500px; box-shadow: 0 24px 64px rgba(0,0,0,.2); }
  .adm-modal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 28px 0; margin-bottom: 16px; }
  .adm-modal-header h2 { margin: 0; font-size: 20px; color: #0f2b57; font-weight: 800; }
  .adm-modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #7b8a9a; transition: color .2s; }
  .adm-modal-body { padding: 0 28px 28px; }

  .adm-form-group { margin-bottom: 18px; }
  .adm-form-group label { display: block; font-size: 13px; font-weight: 600; color: #0f2b57; margin-bottom: 6px; }
  .adm-form-group input, .adm-form-group textarea { width: 100%; padding: 12px 16px; border: 1.5px solid #e1e8ef; border-radius: 10px; font-size: 14px; box-sizing: border-box; }
  .adm-form-group input:focus, .adm-form-group textarea:focus { outline: none; border-color: #f36c1f; }
  .adm-form-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
`;

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', name_en: '', description_en: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Lỗi tải danh mục:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', slug: '', description: '', name_en: '', description_en: '' });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditingId(cat.id);
    setForm({ 
      name: cat.name, 
      slug: cat.slug || '', 
      description: cat.description || '',
      name_en: cat.name_en || '',
      description_en: cat.description_en || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Tên danh mục không được để trống');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/api/categories/${editingId}` : `${API_URL}/api/categories`;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        fetchCategories(); // Reload list
        setShowModal(false);
      } else {
        const err = await res.json();
        alert(err.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Không thể xóa');
      }
    } catch (err) {
      alert('Lỗi kết nối');
    }
  };

  return (
    <>
      <style>{adminCSS}</style>
      <div className="adm-wrap">
        <div className="adm-header">
          <h1>📂 Quản lý Danh mục</h1>
          <button className="adm-btn adm-btn-primary" onClick={openCreate}>➕ Thêm danh mục</button>
        </div>

        <div className="adm-table-wrap">
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>
          ) : categories.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Chưa có danh mục nào.</div>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>ID</th>
                  <th>Tên danh mục</th>
                  <th>Slug / Đường dẫn</th>
                  <th>Mô tả</th>
                  <th style={{ width: 120, textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td style={{ color: '#7b8a9a', fontWeight: 600 }}>#{cat.id}</td>
                    <td style={{ fontWeight: 600, color: '#0f2b57' }}>{cat.name}</td>
                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{cat.slug}</code></td>
                    <td style={{ color: '#5a6f82' }}>{cat.description || '-'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => openEdit(cat)} title="Sửa">✏️</button>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => handleDelete(cat.id, cat.name)} title="Xóa" style={{ color: '#ef4444' }}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="adm-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2>{editingId ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}</h2>
              <button className="adm-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form className="adm-modal-body" onSubmit={handleSave}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 12px', color: '#0f2b57' }}>Tiếng Việt</h4>
                  <div className="adm-form-group">
                    <label>Tên danh mục *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="VD: Tin khuyến mãi"
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Mô tả</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      rows={3}
                      placeholder="Mô tả ngắn gọn về danh mục này..."
                    />
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 12px', color: '#0f2b57' }}>Tiếng Anh</h4>
                  <div className="adm-form-group">
                    <label>Category Name</label>
                    <input
                      value={form.name_en}
                      onChange={e => setForm({ ...form, name_en: e.target.value })}
                      placeholder="VD: Promotions"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label>Description</label>
                    <textarea
                      value={form.description_en}
                      onChange={e => setForm({ ...form, description_en: e.target.value })}
                      rows={3}
                      placeholder="Short description for this category..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="adm-form-group">
                <label>Slug (Đường dẫn tĩnh)</label>
                <input
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  placeholder="VD: tin-khuyen-mai"
                />
              </div>
              <div className="adm-form-footer">
                <button type="button" className="adm-btn adm-btn-outline" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="adm-btn adm-btn-primary">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
