import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const adminCSS = `
  .adm-wrap { max-width: 1300px; margin: 0 auto; padding: 24px; min-height: 100vh; color: #153468; }
  .adm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
  .adm-header h1 { font-size: 28px; margin: 0; font-weight: 800; display: flex; align-items: center; gap: 10px; }
  
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px; }
  .stat-card { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #f0f3f6; }
  .stat-card-title { font-size: 14px; color: #7b8a9a; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
  .stat-card-value { font-size: 32px; font-weight: 800; color: #0f2b57; }
  .stat-card-desc { font-size: 13px; color: #22c55e; margin-top: 8px; font-weight: 600; }

  .chart-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px; }
  .chart-box { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #f0f3f6; }
  .chart-title { font-size: 18px; font-weight: 700; color: #0f2b57; margin-top: 0; margin-bottom: 20px; }
  
  .table-box { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); border: 1px solid #f0f3f6; }
  .adm-table { width: 100%; border-collapse: collapse; }
  .adm-table th { background: #f8fafc; text-align: left; padding: 14px 16px; font-size: 12px; color: #7b8a9a; text-transform: uppercase; border-bottom: 1px solid #edf1f5; }
  .adm-table td { padding: 14px 16px; border-bottom: 1px solid #f0f3f6; font-size: 14px; }
  .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
  .badge-new { background: #eef2f7; color: #0f2b57; }
  .badge-contacted { background: #fff7ed; color: #ea580c; }
  .badge-closed { background: #f0fdf4; color: #16a34a; }
  .badge-rejected { background: #fef2f2; color: #dc2626; }

  @media(max-width: 1024px) {
    .chart-grid { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media(max-width: 600px) {
    .stat-grid { grid-template-columns: 1fr; }
  }
`;

const PIE_COLORS = ['#0f2b57', '#f36c1f', '#22c55e', '#ef4444'];

export default function AdminStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        if (!res.ok) throw new Error('Lỗi khi tải dữ liệu thống kê');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!data) return null;

  // Chuẩn bị dữ liệu cho biểu đồ tròn
  const pieData = [
    { name: 'Mới', value: Number(data.quotes.new) },
    { name: 'Đang liên hệ', value: Number(data.quotes.contacted) },
    { name: 'Thành công', value: Number(data.quotes.closed) },
    { name: 'Hủy/Từ chối', value: Number(data.quotes.rejected) }
  ].filter(item => item.value > 0);

  const formatStatus = (st) => {
    switch (st) {
      case 'new': return <span className="badge badge-new">MỚI</span>;
      case 'contacted': return <span className="badge badge-contacted">ĐANG XỬ LÝ</span>;
      case 'closed': return <span className="badge badge-closed">THÀNH CÔNG</span>;
      case 'rejected': return <span className="badge badge-rejected">HỦY</span>;
      default: return <span className="badge badge-new">{st}</span>;
    }
  };

  return (
    <div>
      <style>{adminCSS}</style>
      <div className="adm-wrap">
        <div className="adm-header">
          <h1>📊 Bảng Điều Khiển (Dashboard)</h1>
        </div>

        {/* 1. Summary Cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-title">Tổng Yêu Cầu (Leads)</div>
            <div className="stat-card-value">{data.quotes.total}</div>
            <div className="stat-card-desc">Tất cả thời gian</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Yêu Cầu Mới</div>
            <div className="stat-card-value" style={{ color: '#f36c1f' }}>{data.quotes.new}</div>
            <div className="stat-card-desc" style={{ color: '#ea580c' }}>Cần xử lý ngay</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Tổng Bài Viết</div>
            <div className="stat-card-value">{data.articles.total}</div>
            <div className="stat-card-desc">Đã đăng {data.articles.published} bài</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Nhân Sự</div>
            <div className="stat-card-value" style={{ color: '#8b5cf6' }}>{data.users.total}</div>
            <div className="stat-card-desc" style={{ color: '#7c3aed' }}>Quản trị viên</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Tỷ Lệ Chốt Sale</div>
            <div className="stat-card-value" style={{ color: '#22c55e' }}>
              {data.quotes.total > 0 ? Math.round((data.quotes.closed / data.quotes.total) * 100) : 0}%
            </div>
            <div className="stat-card-desc">Thành công / Tổng</div>
          </div>
        </div>

        {/* 2. Charts */}
        <div className="chart-grid">
          <div className="chart-box">
            <h3 className="chart-title">📈 Xu hướng Yêu cầu báo giá (6 tháng)</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.quotesTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#7b8a9a', fontSize: 13}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#7b8a9a', fontSize: 13}} dx={-10} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="count" name="Số lượng" stroke="#f36c1f" strokeWidth={3} dot={{r: 5, fill: '#f36c1f', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-box">
            <h3 className="chart-title">🥧 Trạng thái Yêu cầu</h3>
            <div style={{ height: 300 }}>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ textAlign: 'center', color: '#999', paddingTop: 100 }}>Chưa có dữ liệu</div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Recent Leads Table */}
        <div className="table-box">
          <h3 className="chart-title">🔔 5 Yêu cầu báo giá mới nhất</h3>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Công ty</th>
                <th>Dịch vụ quan tâm</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.recentQuotes.length > 0 ? data.recentQuotes.map(q => (
                <tr key={q.id}>
                  <td style={{ fontWeight: 600 }}>{q.name}</td>
                  <td style={{ color: '#5a6f82' }}>{q.company || '-'}</td>
                  <td>{q.service}</td>
                  <td style={{ color: '#5a6f82', fontSize: 13 }}>{new Date(q.created_at).toLocaleDateString('vi-VN')}</td>
                  <td>{formatStatus(q.status)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#7b8a9a' }}>Chưa có yêu cầu báo giá nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
