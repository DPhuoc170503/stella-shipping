const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Apply verifyToken and isAdmin to all user management routes
router.use(verifyToken, isAdmin);

// Lấy danh sách người dùng
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, name, role, created_at FROM admin_users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Thêm người dùng mới
router.post('/', async (req, res) => {
  const { username, password, name, role } = req.body;
  if (!username || !password || !name) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }
  
  try {
    // Check if username exists
    const [existing] = await pool.query('SELECT id FROM admin_users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại, vui lòng chọn tên khác' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO admin_users (username, password, name, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, name, role || 'Biên tập viên']
    );
    
    // Fetch inserted user without password
    const [newUser] = await pool.query('SELECT id, username, name, role, created_at FROM admin_users WHERE id = ?', [result.insertId]);
    res.status(201).json(newUser[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// Xóa người dùng
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Prevent deleting the main admin account (id = 1)
    if (parseInt(id) === 1) {
      return res.status(403).json({ error: 'Không thể xóa tài khoản Quản trị viên gốc' });
    }
    
    // Prevent deleting yourself
    if (parseInt(id) === req.user.id) {
      return res.status(403).json({ error: 'Bạn không thể tự xóa tài khoản của chính mình' });
    }
    
    await pool.query('DELETE FROM admin_users WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

module.exports = router;
