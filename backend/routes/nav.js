const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/nav - returns navigation items in order
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT `label`, `label_en`, `path` FROM navigation ORDER BY `position` ASC');
    if (!rows || rows.length === 0) {
      // fallback default
      return res.json([
        { label: 'Trang chủ', path: '/' },
        { label: 'Dịch vụ', path: '/services' },
        { label: 'Bảng giá', path: '/pricing' },
        { label: 'Về chúng tôi', path: '/about' },
        { label: 'Tin tức', path: '/news' },
        { label: 'Liên hệ', path: '/contact' }
      ]);
    }
    res.json(rows.map(r => ({ label: r.label, label_en: r.label_en || '', path: r.path })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
