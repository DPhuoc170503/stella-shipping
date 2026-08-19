const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// ─── Helper: Gửi email bài viết mới đến tất cả subscribers ───
async function sendNewsletterEmail(article) {
  try {
    // Lấy tất cả subscriber đang active
    const [subscribers] = await pool.query('SELECT email FROM subscribers WHERE is_active = 1');
    if (!subscribers.length) return;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const SITE_URL = process.env.SITE_URL || 'https://stellashipping.com.vn';
    const API_URL = process.env.API_URL || 'https://stella-shipping.onrender.com';
    const articleUrl = `${SITE_URL}/news/${article.id}`;
    const imgUrl = article.img ? (article.img.startsWith('http') ? article.img : `${API_URL}${article.img}`) : '';

    // Gửi email cho từng subscriber
    for (const sub of subscribers) {
      const unsubscribeUrl = `${API_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}`;

      const mailOptions = {
        from: `"Stella Shipping" <${process.env.GMAIL_USER}>`,
        to: sub.email,
        subject: `📰 Bài viết mới: ${article.title}`,
        html: `
          <div style="font-family:'Inter','Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#081d34,#0f2b57);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">🚢 Stella Shipping</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:2px;">BẢN TIN MỚI NHẤT</p>
            </div>

            <!-- Image -->
            ${imgUrl ? `<img src="${imgUrl}" alt="${article.title}" style="width:100%;height:240px;object-fit:cover;display:block;" />` : ''}

            <!-- Content -->
            <div style="padding:28px 32px;">
              <span style="display:inline-block;background:rgba(243,108,31,0.1);color:#f36c1f;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:12px;letter-spacing:1px;">${article.category || 'TIN TỨC'}</span>
              <h2 style="margin:0 0 12px;font-size:20px;color:#0f2b57;line-height:1.4;">${article.title}</h2>
              <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.7;">${article.description || ''}</p>
              <a href="${articleUrl}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;">Đọc bài viết →</a>
            </div>

            <!-- Footer -->
            <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Bạn nhận được email này vì đã đăng ký bản tin Stella Shipping.</p>
              <a href="${unsubscribeUrl}" style="color:#f36c1f;font-size:12px;text-decoration:underline;margin-top:4px;display:inline-block;">Hủy đăng ký</a>
            </div>
          </div>
        `
      };

      // Gửi không đồng bộ, không block response
      transporter.sendMail(mailOptions).catch(err => {
        console.error(`Lỗi gửi newsletter đến ${sub.email}:`, err.message);
      });
    }

    console.log(`Newsletter đã gửi đến ${subscribers.length} subscriber(s)`);
  } catch (err) {
    console.error('Lỗi gửi newsletter:', err);
  }
}

// ─── GET /api/articles ─── lấy tất cả bài (có thể filter ?status=published)
router.get('/', async (req, res) => {
  try {
    const { status, lang } = req.query;
    let sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    const params = [];
    if (status) {
      sql = 'SELECT * FROM articles WHERE status = ? ORDER BY created_at DESC';
      params.push(status);
    }
    const [rows] = await pool.query(sql, params);
    // Map DB fields → frontend field names
    const articles = rows.map(r => ({
      id: r.id,
      title: lang === 'en' ? (r.title_en || r.title) : r.title,
      title_en: r.title_en,
      desc_en: r.description_en,
      fullDesc_en: r.full_content_en,
      category_en: r.category_en,
      desc: lang === 'en' ? (r.description_en || r.description) : r.description,
      fullDesc: lang === 'en' ? (r.full_content_en || r.full_content || '') : (r.full_content || ''),
      category: lang === 'en' ? (r.category_en || r.category) : r.category,
      author: r.author,
      img: r.img,
      readTime: r.read_time,
      status: r.status,
      date: formatDate(r.created_at),
    }));
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── GET /api/articles/:id ─── lấy 1 bài
router.get('/:id', async (req, res) => {
  try {
    const { lang } = req.query;
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const r = rows[0];
    res.json({
      id: r.id,
      title: lang === 'en' ? (r.title_en || r.title) : r.title,
      title_en: r.title_en,
      desc_en: r.description_en,
      fullDesc_en: r.full_content_en,
      category_en: r.category_en,
      desc: lang === 'en' ? (r.description_en || r.description) : r.description,
      fullDesc: lang === 'en' ? (r.full_content_en || r.full_content || '') : (r.full_content || ''),
      category: lang === 'en' ? (r.category_en || r.category) : r.category,
      author: r.author,
      img: r.img,
      readTime: r.read_time,
      status: r.status,
      date: formatDate(r.created_at),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── POST /api/articles ─── tạo bài mới
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, desc, fullDesc, category, author, img, readTime, status, title_en, desc_en, fullDesc_en, category_en } = req.body;
    if (!title || !desc) return res.status(400).json({ error: 'title và desc là bắt buộc' });

    const [result] = await pool.query(
      `INSERT INTO articles (title, description, full_content, category, author, img, read_time, status, title_en, description_en, full_content_en, category_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        desc,
        fullDesc || '',
        category || 'Công ty',
        author || '',
        img || '/Banner.jpg',
        readTime || '3 phút',
        status || 'draft',
        title_en || '',
        desc_en || '',
        fullDesc_en || '',
        category_en || ''
      ]
    );

    // Lấy bài vừa tạo để trả về
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [result.insertId]);
    const r = rows[0];
    res.status(201).json({
      id: r.id,
      title: r.title,
      desc: r.description,
      fullDesc: r.full_content || '',
      category: r.category,
      author: r.author,
      img: r.img,
      readTime: r.read_time,
      status: r.status,
      date: formatDate(r.created_at),
    });

    // Gửi newsletter nếu bài viết được publish
    if ((status || 'draft') === 'published') {
      sendNewsletterEmail(r);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── PUT /api/articles/:id ─── cập nhật bài
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, desc, fullDesc, category, author, img, readTime, status, title_en, desc_en, fullDesc_en, category_en } = req.body;
    const { id } = req.params;

    const [check] = await pool.query('SELECT id, status FROM articles WHERE id = ?', [id]);
    if (!check.length) return res.status(404).json({ error: 'Not found' });
    const oldStatus = check[0].status;

    await pool.query(
      `UPDATE articles SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        full_content = COALESCE(?, full_content),
        category = COALESCE(?, category),
        author = COALESCE(?, author),
        img = COALESCE(?, img),
        read_time = COALESCE(?, read_time),
        status = COALESCE(?, status),
        title_en = COALESCE(?, title_en),
        description_en = COALESCE(?, description_en),
        full_content_en = COALESCE(?, full_content_en),
        category_en = COALESCE(?, category_en)
       WHERE id = ?`,
      [title, desc, fullDesc, category, author, img, readTime, status, title_en, desc_en, fullDesc_en, category_en, id]
    );

    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    const r = rows[0];
    res.json({
      id: r.id,
      title: r.title,
      desc: r.description,
      fullDesc: r.full_content || '',
      category: r.category,
      author: r.author,
      img: r.img,
      readTime: r.read_time,
      status: r.status,
      date: formatDate(r.created_at),
    });

    // Chỉ gửi newsletter nếu bài viết vừa được chuyển từ draft -> published
    if (status === 'published' && oldStatus !== 'published') {
      sendNewsletterEmail(r);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── DELETE /api/articles/:id ─── xóa bài
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const [check] = await pool.query('SELECT id FROM articles WHERE id = ?', [req.params.id]);
    if (!check.length) return res.status(404).json({ error: 'Not found' });

    await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── Helper ───
function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day} Thg ${month}, ${d.getFullYear()}`;
}

module.exports = router;
