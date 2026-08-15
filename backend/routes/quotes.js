const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../db');
const { verifyToken } = require('../middleware/auth');

// ─── GET /api/quotes ─── Lấy danh sách báo giá (Dành cho Admin)
router.get('/', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Lỗi lấy danh sách báo giá:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// ─── PUT /api/quotes/:id ─── Cập nhật trạng thái báo giá
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query('UPDATE quotes SET status = ? WHERE id = ?', [status, id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// ─── POST /api/quotes ─── Gửi email yêu cầu báo giá VÀ lưu vào DB
router.post('/', async (req, res) => {
  const { name, company, email, phone, origin, destination, service, cargo, note } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Thiếu tên hoặc email' });
  }

  // 1. Lưu vào Database
  try {
    await db.query(
      `INSERT INTO quotes (name, email, phone, company, origin, destination, service, cargo, note)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, company || null, origin || null, destination || null, service || null, cargo || null, note || null]
    );
  } catch (dbError) {
    console.error('Lỗi lưu báo giá vào DB:', dbError);
    // Vẫn tiếp tục để cố gắng gửi email
  }

  // 2. Cấu hình transporter với Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // Tên dịch vụ cho đẹp
  const serviceNames = {
    sea_fcl: 'Vận tải biển FCL',
    sea_lcl: 'Vận tải biển LCL',
    air: 'Vận tải hàng không',
    road: 'Vận tải đường bộ',
    warehouse: 'Dịch vụ kho bãi'
  };
  const serviceDisplay = serviceNames[service] || service;

  const mailOptions = {
    from: `"${name}" <${email}>`, // Người gửi là email khách (tuy nhiên Gmail sẽ ghi đè sender thật là GMAIL_USER, dùng replyTo để rep khách)
    replyTo: email,
    to: process.env.GMAIL_USER, // Gửi thẳng về mail của bạn
    subject: `[Stella Shipping] Yêu cầu báo giá mới từ ${name} ${company ? `(${company})` : ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #0f2b57; border-bottom: 2px solid #f36c1f; padding-bottom: 10px;">YÊU CẦU BÁO GIÁ MỚI</h2>
        <p>Hệ thống vừa nhận được một yêu cầu báo giá từ website Stella Shipping:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 130px;"><strong>👤 Khách hàng:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>🏢 Công ty:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${company || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>✉️ Email:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>📞 Số điện thoại:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>🚀 Dịch vụ:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #f36c1f; font-weight: bold;">${serviceDisplay}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>📍 Điểm đi (Origin):</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${origin || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>🎯 Điểm đến (Dest):</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${destination || '-'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>📦 Hàng hóa:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${cargo || '-'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0f2b57;">
          <strong style="display: block; margin-bottom: 5px;">Ghi chú của khách hàng:</strong>
          <p style="margin: 0; white-space: pre-wrap;">${note || 'Không có ghi chú'}</p>
        </div>
        
        <p style="margin-top: 30px; font-size: 12px; color: #888;">
          Email này được gửi tự động từ hệ thống website Stella Shipping.<br>
          Bạn có thể truy cập <strong>Admin Panel</strong> để xem danh sách và quản lý các yêu cầu báo giá.
        </p>
      </div>
    `
  };

  try {
    // Tạm thời tắt gửi email vì Render chặn cổng SMTP trên gói Miễn phí
    // await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Đã lưu yêu cầu báo giá thành công' });
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    res.json({ success: true, message: 'Đã lưu yêu cầu báo giá thành công (Email bị lỗi)' });
  }
});

module.exports = router;
