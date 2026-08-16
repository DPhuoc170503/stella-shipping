import React, { useState, useEffect } from 'react';
import axios from 'axios';

const css = `
  .aq-wrap {
    font-family: 'Inter', sans-serif;
  }
  .aq-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
  }
  .aq-title h2 { margin: 0 0 8px; font-size: 24px; color: #0f2b57; }
  .aq-title p { margin: 0; color: #5a6f82; font-size: 14px; }
  
  .aq-filters {
    display: flex;
    gap: 8px;
    background: #fff;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .aq-filter-btn {
    padding: 8px 16px;
    border: none;
    background: transparent;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #5a6f82;
    cursor: pointer;
    transition: all 0.2s;
  }
  .aq-filter-btn.active { background: #f5f7fa; color: #0f2b57; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

  .aq-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(10,20,40,0.06);
    overflow: hidden;
  }
  .aq-table-wrap { overflow-x: auto; }
  .aq-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;
  }
  .aq-table th {
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 16px 20px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  .aq-table td {
    padding: 16px 20px;
    font-size: 14px;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }
  .aq-table tbody tr:hover { background: #fbfcfd; }
  
  .aq-client-info { display: flex; flex-direction: column; gap: 4px; }
  .aq-client-name { font-weight: 600; color: #0f2b57; }
  .aq-client-meta { font-size: 12px; color: #64748b; display: flex; gap: 8px; align-items: center; }
  
  .aq-route { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .aq-route-point { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #475569; }
  
  .aq-select {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid transparent;
    cursor: pointer;
    outline: none;
    appearance: none;
  }
  .status-new { background: #fee2e2; color: #b91c1c; border-color: #fca5a5; }
  .status-contacted { background: #fef3c7; color: #b45309; border-color: #fde68a; }
  .status-closed { background: #dcfce7; color: #15803d; border-color: #86efac; }
  .status-rejected { background: #f1f5f9; color: #475569; border-color: #cbd5e1; }
  
  .aq-date { font-size: 13px; color: #64748b; }
  .aq-note { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 13px; color: #64748b; }
`;

const STATUS_OPTIONS = [
  { value: 'new', label: 'Chờ xử lý', class: 'status-new' },
  { value: 'contacted', label: 'Đã liên hệ', class: 'status-contacted' },
  { value: 'closed', label: 'Thành công', class: 'status-closed' },
  { value: 'rejected', label: 'Hủy/Từ chối', class: 'status-rejected' },
];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchQuotes = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com'
      const res = await axios.get(`${API_URL}/api/quotes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setQuotes(res.data);
    } catch (error) {
      console.error('Lỗi lấy danh sách báo giá', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://stella-shipping.onrender.com'
      await axios.put(`${API_URL}/api/quotes/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
    } catch (error) {
      alert('Không thể cập nhật trạng thái');
    }
  };

  const filteredQuotes = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getServiceLabel = (srv) => {
    const map = { sea_fcl: 'Biển (FCL)', sea_lcl: 'Biển (LCL)', air: 'Hàng không', road: 'Đường bộ', warehouse: 'Kho bãi' };
    return map[srv] || srv || '-';
  };

  return (
    <div className="aq-wrap">
      <style>{css}</style>
      
      <div className="aq-header">
        <div className="aq-title">
          <h2>Quản lý Báo giá</h2>
          <p>Danh sách các yêu cầu báo giá từ khách hàng ({quotes.length} yêu cầu)</p>
        </div>
        
        <div className="aq-filters">
          <button className={`aq-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
          <button className={`aq-filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>Chờ xử lý</button>
          <button className={`aq-filter-btn ${filter === 'contacted' ? 'active' : ''}`} onClick={() => setFilter('contacted')}>Đã liên hệ</button>
          <button className={`aq-filter-btn ${filter === 'closed' ? 'active' : ''}`} onClick={() => setFilter('closed')}>Thành công</button>
        </div>
      </div>

      <div className="aq-card">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Đang tải dữ liệu...</div>
        ) : filteredQuotes.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Không có yêu cầu báo giá nào.</div>
        ) : (
          <div className="aq-table-wrap">
            <table className="aq-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Dịch vụ</th>
                  <th>Tuyến vận chuyển</th>
                  <th>Ghi chú</th>
                  <th>Ngày gửi</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map(q => (
                  <tr key={q.id}>
                    <td>
                      <div className="aq-client-info">
                        <span className="aq-client-name">{q.name}</span>
                        <div className="aq-client-meta">
                          <span>📧 {q.email}</span>
                          {q.phone && <span>📞 {q.phone}</span>}
                        </div>
                        {q.company && <div style={{ fontSize: 12, color: '#94a3b8' }}>🏢 {q.company}</div>}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: '#f36c1f' }}>{getServiceLabel(q.service)}</span>
                      <br/>
                      <span style={{ fontSize: 12, color: '#64748b' }}>📦 {q.cargo || '-'}</span>
                    </td>
                    <td>
                      <div className="aq-route">
                        <span className="aq-route-point">{q.origin || 'N/A'}</span>
                        <span style={{ color: '#cbd5e1' }}>→</span>
                        <span className="aq-route-point">{q.destination || 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="aq-note" title={q.note}>{q.note || '-'}</div>
                    </td>
                    <td>
                      <span className="aq-date">{formatDate(q.created_at)}</span>
                    </td>
                    <td>
                      <select 
                        className={`aq-select status-${q.status}`} 
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
