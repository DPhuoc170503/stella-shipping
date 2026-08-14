import React, { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const res = await fetch(`${API_URL}/api/settings/home_page`);
      if (!res.ok) throw new Error('Không thể tải cấu hình');
      let data = await res.json();
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch(e) {}
      }
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const res = await fetch(`${API_URL}/api/settings/home_page`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Lỗi khi lưu cấu hình');
      alert('Đã lưu cấu hình thành công!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Helper cho Hero
  const handleHeroChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  // Helper cho Array (Services, Why, Process)
  const handleArrayChange = (key, index, field, value) => {
    setSettings(prev => {
      const newArray = [...prev[key]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [key]: newArray };
    });
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>Lỗi: {error}</div>;
  if (!settings) return null;

  return (
    <div className="admin-page">
      <style>{`
        .admin-page { padding: 24px; color: #153468; max-width: 900px; margin: 0 auto; }
        .admin-page h2 { margin-top: 0; }
        .form-section { background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 24px; }
        .form-section h3 { margin-top: 0; padding-bottom: 12px; border-bottom: 1px solid #eee; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px; }
        .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .array-item { border: 1px solid #eee; padding: 16px; border-radius: 4px; margin-bottom: 16px; background: #fafafa; }
        .array-item h4 { margin: 0 0 12px; color: #f36c1f; }
        .btn-save { background: #f36c1f; color: #fff; border: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer; }
        .btn-save:hover { background: #d95a12; }
        .btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>⚙️ Cài đặt Trang chủ</h2>
        <button className="btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Đang lưu...' : '💾 Lưu Thay Đổi'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="form-section">
        <h3>1. Cấu hình Hero Banner (Phần đầu trang)</h3>
        <div className="form-group">
          <label>Eyebrow (Chữ nhỏ phía trên)</label>
          <input value={settings.hero.eyebrow} onChange={e => handleHeroChange('eyebrow', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Tiêu đề Dòng 1</label>
            <input value={settings.hero.title_line1} onChange={e => handleHeroChange('title_line1', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Nổi bật Dòng 1</label>
            <input value={settings.hero.title_hl1} onChange={e => handleHeroChange('title_hl1', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Tiêu đề Dòng 2</label>
            <input value={settings.hero.title_line2} onChange={e => handleHeroChange('title_line2', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Nổi bật Dòng 2</label>
            <input value={settings.hero.title_hl2} onChange={e => handleHeroChange('title_hl2', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Tiêu đề Dòng 3</label>
          <input value={settings.hero.title_line3} onChange={e => handleHeroChange('title_line3', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Đoạn văn mô tả (Lead)</label>
          <textarea rows={3} value={settings.hero.lead} onChange={e => handleHeroChange('lead', e.target.value)} />
        </div>
      </div>

      {/* Services Section */}
      <div className="form-section">
        <h3>2. Cấu hình Dịch vụ (6 thẻ)</h3>
        {settings.services.map((item, idx) => (
          <div key={idx} className="array-item">
            <h4>Dịch vụ #{idx + 1}</h4>
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Tiêu đề</label>
                <input value={item.title} onChange={e => handleArrayChange('services', idx, 'title', e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Nhãn (Badge)</label>
                <input value={item.badge} onChange={e => handleArrayChange('services', idx, 'badge', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Link Ảnh</label>
              <input value={item.img} onChange={e => handleArrayChange('services', idx, 'img', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Mô tả ngắn</label>
              <textarea rows={2} value={item.desc} onChange={e => handleArrayChange('services', idx, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="form-section">
        <h3>3. Lợi thế cạnh tranh (8 thẻ)</h3>
        {settings.why_choose_us.map((item, idx) => (
          <div key={idx} className="array-item">
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="form-group" style={{ width: 80 }}>
                <label>Icon</label>
                <input value={item.icon} onChange={e => handleArrayChange('why_choose_us', idx, 'icon', e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Tiêu đề</label>
                <input value={item.title} onChange={e => handleArrayChange('why_choose_us', idx, 'title', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <input value={item.desc} onChange={e => handleArrayChange('why_choose_us', idx, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Process */}
      <div className="form-section">
        <h3>4. Quy trình làm việc (4 bước)</h3>
        {settings.process.map((item, idx) => (
          <div key={idx} className="array-item">
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="form-group" style={{ width: 80 }}>
                <label>Số</label>
                <input value={item.num} disabled />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Tiêu đề bước</label>
                <input value={item.title} onChange={e => handleArrayChange('process', idx, 'title', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <input value={item.desc} onChange={e => handleArrayChange('process', idx, 'desc', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
