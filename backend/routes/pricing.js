const express = require('express');
const router = express.Router();
const pool = require('../db');

// ─── GET /api/pricing ─── lấy tất cả giá đang active
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let sql = 'SELECT * FROM pricing_rates WHERE is_active = 1 ORDER BY service_type, id ASC';
    const params = [];
    if (type) {
      sql = 'SELECT * FROM pricing_rates WHERE is_active = 1 AND service_type = ? ORDER BY id ASC';
      params.push(type);
    }
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── GET /api/pricing/last-updated ─── timestamp cập nhật gần nhất
router.get('/last-updated', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT MAX(updated_at) AS last_updated FROM pricing_rates'
    );
    res.json({ last_updated: rows[0].last_updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── POST /api/pricing ─── tạo dòng giá mới (admin)
router.post('/', async (req, res) => {
  try {
    const { service_type, service_type_en, route, route_en, unit, price_from, currency, transit_time, note, note_en, is_active } = req.body;
    if (!service_type || !route || !unit || price_from === undefined) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
    }
    const [result] = await pool.query(
      `INSERT INTO pricing_rates (service_type, service_type_en, route, route_en, unit, price_from, currency, transit_time, note, note_en, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [service_type, service_type_en || '', route, route_en || '', unit, price_from, currency || 'USD', transit_time || null, note || null, note_en || null, is_active !== undefined ? is_active : 1]
    );
    const [rows] = await pool.query('SELECT * FROM pricing_rates WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── PUT /api/pricing/:id ─── cập nhật dòng giá (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { service_type, service_type_en, route, route_en, unit, price_from, currency, transit_time, note, note_en, is_active } = req.body;

    const [check] = await pool.query('SELECT id FROM pricing_rates WHERE id = ?', [id]);
    if (!check.length) return res.status(404).json({ error: 'Not found' });

    await pool.query(
      `UPDATE pricing_rates SET
        service_type = COALESCE(?, service_type),
        service_type_en = COALESCE(?, service_type_en),
        route        = COALESCE(?, route),
        route_en     = COALESCE(?, route_en),
        unit         = COALESCE(?, unit),
        price_from   = COALESCE(?, price_from),
        currency     = COALESCE(?, currency),
        transit_time = ?,
        note         = ?,
        note_en      = ?,
        is_active    = COALESCE(?, is_active)
       WHERE id = ?`,
      [service_type, service_type_en, route, route_en, unit, price_from, currency, transit_time ?? null, note ?? null, note_en ?? null, is_active, id]
    );

    const [rows] = await pool.query('SELECT * FROM pricing_rates WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// ─── DELETE /api/pricing/:id ─── xóa dòng giá
router.delete('/:id', async (req, res) => {
  try {
    const [check] = await pool.query('SELECT id FROM pricing_rates WHERE id = ?', [req.params.id]);
    if (!check.length) return res.status(404).json({ error: 'Not found' });
    await pool.query('DELETE FROM pricing_rates WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
