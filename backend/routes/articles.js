const express = require('express');
const router = express.Router();
const pool = require('../db');

// ─── GET /api/articles ─── lấy tất cả bài (có thể filter ?status=published)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
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
      title: r.title,
      desc: r.description,
      fullDesc: r.full_content || '',
      category: r.category,
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
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── POST /api/articles ─── tạo bài mới
router.post('/', async (req, res) => {
  try {
    const { title, desc, fullDesc, category, author, img, readTime, status } = req.body;
    if (!title || !desc) return res.status(400).json({ error: 'title và desc là bắt buộc' });

    const [result] = await pool.query(
      `INSERT INTO articles (title, description, full_content, category, author, img, read_time, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        desc,
        fullDesc || '',
        category || 'Công ty',
        author || '',
        img || '/Banner.jpg',
        readTime || '3 phút',
        status || 'draft',
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── PUT /api/articles/:id ─── cập nhật bài
router.put('/:id', async (req, res) => {
  try {
    const { title, desc, fullDesc, category, author, img, readTime, status } = req.body;
    const { id } = req.params;

    const [check] = await pool.query('SELECT id FROM articles WHERE id = ?', [id]);
    if (!check.length) return res.status(404).json({ error: 'Not found' });

    await pool.query(
      `UPDATE articles SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        full_content = COALESCE(?, full_content),
        category = COALESCE(?, category),
        author = COALESCE(?, author),
        img = COALESCE(?, img),
        read_time = COALESCE(?, read_time),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [title, desc, fullDesc, category, author, img, readTime, status, id]
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── DELETE /api/articles/:id ─── xóa bài
router.delete('/:id', async (req, res) => {
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
