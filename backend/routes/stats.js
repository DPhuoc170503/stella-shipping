const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/stats
router.get('/', verifyToken, async (req, res) => {
  try {
    // 1. Thống kê Quotes
    const [quotesSummary] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_quotes,
        SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) as contacted,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
      FROM quotes
    `);

    // 2. Thống kê Articles
    const [articlesSummary] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as drafts
      FROM articles
    `);

    // 2.5 Thống kê Danh mục và Người dùng
    const [categoriesSummary] = await pool.query('SELECT COUNT(*) as total FROM categories');
    const [usersSummary] = await pool.query('SELECT COUNT(*) as total FROM admin_users');

    // 3. 5 Quotes mới nhất
    const [recentQuotes] = await pool.query(`
      SELECT id, name, company, service, status, created_at 
      FROM quotes 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // 4. Trend: Số lượng Quotes 6 tháng gần nhất
    const [quotesTrend] = await pool.query(`
      SELECT 
        DATE_FORMAT(created_at, '%m/%Y') as month,
        COUNT(*) as count
      FROM quotes
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%m/%Y'), YEAR(created_at), MONTH(created_at)
      ORDER BY YEAR(created_at) ASC, MONTH(created_at) ASC
    `);

    res.json({
      quotes: {
        total: quotesSummary[0].total || 0,
        new: quotesSummary[0].new_quotes || 0,
        contacted: quotesSummary[0].contacted || 0,
        closed: quotesSummary[0].closed || 0,
        rejected: quotesSummary[0].rejected || 0,
      },
      articles: {
        total: articlesSummary[0].total || 0,
        published: articlesSummary[0].published || 0,
        drafts: articlesSummary[0].drafts || 0,
      },
      categories: { total: categoriesSummary[0].total || 0 },
      users: { total: usersSummary[0].total || 0 },
      recentQuotes,
      quotesTrend
    });
  } catch (err) {
    console.error('Stats Error:', err);
    res.status(500).json({ error: 'DB Error' });
  }
});

module.exports = router;
