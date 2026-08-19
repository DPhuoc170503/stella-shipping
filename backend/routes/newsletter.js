const express = require('express');
const router = express.Router();
const pool = require('../db');

// ─── POST /api/newsletter/subscribe ─── Đăng ký nhận bản tin
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email là bắt buộc' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Email không hợp lệ' });
    }

    // Kiểm tra email đã tồn tại chưa
    const [existing] = await pool.query('SELECT id, is_active FROM subscribers WHERE email = ?', [email.trim()]);

    if (existing.length > 0) {
      if (existing[0].is_active) {
        return res.status(409).json({ error: 'Email này đã được đăng ký rồi' });
      }
      // Nếu đã hủy trước đó → kích hoạt lại
      await pool.query('UPDATE subscribers SET is_active = 1 WHERE id = ?', [existing[0].id]);
      return res.json({ success: true, message: 'Đăng ký lại thành công!' });
    }

    // Thêm subscriber mới
    await pool.query('INSERT INTO subscribers (email) VALUES (?)', [email.trim()]);
    res.status(201).json({ success: true, message: 'Đăng ký nhận bản tin thành công!' });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    res.status(500).json({ error: 'Lỗi hệ thống' });
  }
});

// ─── GET /api/newsletter/unsubscribe ─── Hủy đăng ký
router.get('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send(buildUnsubscribePage('Thiếu thông tin email.', false));
    }

    const [existing] = await pool.query('SELECT id, is_active FROM subscribers WHERE email = ?', [email.trim()]);

    if (existing.length === 0) {
      return res.send(buildUnsubscribePage('Email này chưa được đăng ký.', false));
    }

    if (!existing[0].is_active) {
      return res.send(buildUnsubscribePage('Email này đã được hủy đăng ký trước đó.', true));
    }

    await pool.query('UPDATE subscribers SET is_active = 0 WHERE email = ?', [email.trim()]);
    res.send(buildUnsubscribePage('Bạn đã hủy đăng ký nhận bản tin thành công.', true));
  } catch (err) {
    console.error('Newsletter unsubscribe error:', err);
    res.status(500).send(buildUnsubscribePage('Lỗi hệ thống, vui lòng thử lại sau.', false));
  }
});

// ─── Helper: Trang HTML xác nhận hủy đăng ký ───
function buildUnsubscribePage(message, success) {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stella Shipping - Hủy đăng ký</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #081d34, #0f2b57);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 48px 40px;
          max-width: 460px;
          text-align: center;
          backdrop-filter: blur(20px);
        }
        .icon { font-size: 48px; margin-bottom: 16px; }
        h1 { font-size: 22px; margin-bottom: 12px; }
        p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; }
        .back-link {
          display: inline-block;
          margin-top: 24px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #f36c1f, #e05a10);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: transform 0.2s;
        }
        .back-link:hover { transform: translateY(-2px); }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${success ? '✅' : '⚠️'}</div>
        <h1>Stella Shipping</h1>
        <p>${message}</p>
        <a href="https://stellashipping.com.vn" class="back-link">Về trang chủ</a>
      </div>
    </body>
    </html>
  `;
}

module.exports = router;
