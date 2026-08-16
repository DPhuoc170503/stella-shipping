import React, { useState, useEffect, useRef } from 'react';

export default function AdminMedia() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com';

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/media`);
      if (!res.ok) throw new Error('Không thể tải thư viện ảnh');
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn! Vui lòng chọn file dưới 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await fetch(`${API_URL}/api/media/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Lỗi khi upload ảnh');
      
      alert('Upload thành công!');
      fetchMedia(); // Refresh list
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ảnh này không? Hành động này không thể hoàn tác.')) return;
    
    try {
      const res = await fetch(`${API_URL}/api/media/${filename}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi khi xóa ảnh');
      
      // Update local state to avoid refetching
      setFiles(files.filter(f => f.name !== filename));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCopy = (url) => {
    const fullUrl = `${API_URL}${url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert(`Đã copy link: ${fullUrl}`);
    }).catch(() => {
      alert('Không thể copy. Vui lòng thử lại.');
    });
  };

  return (
    <div className="admin-media">
      <style>{`
        .admin-media { padding: 24px; color: #153468; max-width: 1000px; margin: 0 auto; }
        .admin-media h2 { margin-top: 0; margin-bottom: 24px; }
        
        .upload-area {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          background: #fafafa;
          margin-bottom: 32px;
          transition: all 0.2s;
        }
        .upload-area:hover {
          border-color: #f36c1f;
          background: #fff;
        }
        .upload-btn {
          background: #f36c1f;
          color: #fff;
          border: none;
          padding: 10px 24px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 600;
        }
        .upload-btn:hover { background: #d95a12; }
        .upload-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }
        .media-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          position: relative;
        }
        .media-img-wrapper {
          height: 150px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .media-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .media-info {
          padding: 12px;
        }
        .media-name {
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
          color: #555;
        }
        .media-actions {
          display: flex;
          gap: 8px;
        }
        .btn-copy, .btn-del {
          flex: 1;
          padding: 6px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
        }
        .btn-copy { background: #eef2f7; color: #153468; }
        .btn-copy:hover { background: #dfe6ef; }
        .btn-del { background: #ffeeee; color: #d32f2f; }
        .btn-del:hover { background: #fcd5d5; }
      `}</style>

      <h2>🖼️ Quản lý Thư viện Ảnh (Media)</h2>

      <div className="upload-area">
        <h3 style={{ margin: '0 0 16px' }}>Tải ảnh mới lên máy chủ</h3>
        <p style={{ color: '#666', marginBottom: 20 }}>Định dạng hỗ trợ: JPG, PNG, WEBP, GIF (Tối đa 5MB)</p>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleUpload}
        />
        <button 
          className="upload-btn" 
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          {uploading ? '⏳ Đang tải lên...' : '☁️ Chọn ảnh tải lên'}
        </button>
      </div>

      {error && <div style={{ padding: 16, background: '#fee', color: 'red', borderRadius: 4, marginBottom: 24 }}>{error}</div>}

      <h3>Danh sách ảnh đã tải lên ({files.length})</h3>
      
      {loading ? (
        <p>Đang tải thư viện ảnh...</p>
      ) : files.length === 0 ? (
        <p style={{ color: '#888' }}>Chưa có hình ảnh nào. Hãy tải lên hình ảnh đầu tiên của bạn!</p>
      ) : (
        <div className="media-grid">
          {files.map(file => (
            <div key={file.name} className="media-card">
              <div className="media-img-wrapper">
                <img src={`${API_URL}${file.url}`} alt={file.name} loading="lazy" />
              </div>
              <div className="media-info">
                <div className="media-name" title={file.name}>{file.name}</div>
                <div className="media-actions">
                  <button className="btn-copy" onClick={() => handleCopy(file.url)}>📋 Copy URL</button>
                  <button className="btn-del" onClick={() => handleDelete(file.name)}>🗑️ Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
