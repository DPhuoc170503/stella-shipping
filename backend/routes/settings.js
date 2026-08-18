const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/settings/:key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { lang } = req.query;
    let searchKey = key;
    if (lang === 'en') {
      searchKey = `${key}_en`;
    }

    let [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = ?', [searchKey]);
    
    // Fallback to default if English setting doesn't exist
    if (!rows.length && lang === 'en') {
        [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = ?', [key]);
    }

    if (!rows.length) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    // Return the JSON object directly (mysql2 usually parses JSON columns automatically)
    res.json(rows[0].setting_value);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT /api/settings/:key
router.put('/:key', verifyToken, async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body;

    // UPSERT (Insert if not exists, otherwise update)
    await pool.query(
      `INSERT INTO settings (setting_key, setting_value) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [key, JSON.stringify(value)]
    );

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
