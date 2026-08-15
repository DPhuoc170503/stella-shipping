const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'stella-shipping-secret-key-2024';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    }

    // Query DB to check credentials
    const [rows] = await pool.query(
      'SELECT id, username, password, name, role FROM admin_users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    const user = rows[0];
    
    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    delete user.password;

    return res.json({ success: true, user, token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, error: 'Lỗi máy chủ.' });
  }
});

module.exports = router;
