import React, { useState, useEffect } from 'react';


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    role: 'Biên tập viên'
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Lỗi lấy danh sách người dùng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUsers([data, ...users]);
        setSuccess('Đã thêm nhân viên thành công!');
        setShowModal(false);
        setForm({ username: '', password: '', name: '', role: 'Biên tập viên' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, username) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${username}" không?`)) return;
    
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        setSuccess('Đã xóa tài khoản thành công!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        alert(data.error || 'Có lỗi xảy ra khi xóa');
      }
    } catch (err) {
      alert('Lỗi kết nối đến máy chủ');
    }
  };

  return (
    <>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: '#0f2b57', margin: 0, fontWeight: 800 }}>👥 Quản lý Nhân viên</h1>
            <p style={{ color: '#7b8a9a', fontSize: '14px', marginTop: '4px' }}>Thêm, xóa và quản lý quyền truy cập của nhân viên vào hệ thống</p>
          </div>
          <button 
            onClick={() => { setShowModal(true); setError(''); }}
            style={{
              padding: '10px 20px', background: '#f36c1f', color: '#fff', border: 'none', 
              borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            ➕ Thêm nhân viên
          </button>
        </div>

        {success && (
          <div style={{ padding: '12px 16px', background: '#dcfce7', color: '#166534', borderRadius: '8px', marginBottom: '20px', fontWeight: 500 }}>
            ✅ {success}
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e1e8ef', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#7b8a9a' }}>Đang tải danh sách...</div>
          ) : users.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#7b8a9a' }}>Chưa có nhân viên nào.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e1e8ef' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontSize: '13px' }}>ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontSize: '13px' }}>TÊN NHÂN VIÊN</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontSize: '13px' }}>TÀI KHOẢN</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontSize: '13px' }}>VAI TRÒ</th>
                  <th style={{ padding: '16px', textAlign: 'right', color: '#64748b', fontSize: '13px' }}>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>#{u.id}</td>
                    <td style={{ padding: '16px', color: '#0f2b57', fontWeight: 600, fontSize: '15px' }}>{u.name}</td>
                    <td style={{ padding: '16px', color: '#334155', fontSize: '14px' }}>
                      <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>{u.username}</code>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        background: u.role === 'Quản trị viên' ? '#fee2e2' : '#e0f2fe', 
                        color: u.role === 'Quản trị viên' ? '#991b1b' : '#0369a1', 
                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      {u.id !== 1 ? (
                        <button 
                          onClick={() => handleDelete(u.id, u.username)}
                          style={{ background: 'none', border: '1px solid #fee2e2', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                        >
                          Xóa
                        </button>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>Không thể xóa</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Thêm nhân viên */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0f2b57' }}>➕ Thêm nhân viên mới</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
              </div>
              
              <form onSubmit={handleAddSubmit} style={{ padding: '24px' }}>
                {error && (
                  <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                    ⚠️ {error}
                  </div>
                )}
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Tên hiển thị (Tên thật)</label>
                  <input 
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="VD: Nguyễn Văn A"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Tên đăng nhập (Username)</label>
                  <input 
                    type="text" name="username" value={form.username} onChange={handleChange} required
                    placeholder="VD: nhanvien1"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Mật khẩu</label>
                  <input 
                    type="password" name="password" value={form.password} onChange={handleChange} required
                    placeholder="Nhập mật khẩu"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>Vai trò</label>
                  <select 
                    name="role" value={form.role} onChange={handleChange}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    <option value="Biên tập viên">Biên tập viên (Đăng tin, sửa giá)</option>
                    <option value="Quản trị viên">Quản trị viên (Toàn quyền)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Hủy
                  </button>
                  <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#0f2b57', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    {saving ? 'Đang lưu...' : 'Lưu nhân viên'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
