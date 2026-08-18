const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET all categories
router.get('/', async (req, res) => {
    try {
        const { lang } = req.query;
        const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
        const categories = rows.map(r => ({
            ...r,
            name: lang === 'en' ? (r.name_en || r.name) : r.name,
            description: lang === 'en' ? (r.description_en || r.description) : r.description
        }));
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi server khi lấy danh sách danh mục' });
    }
});

// POST new category
router.post('/', verifyToken, isAdmin, async (req, res) => {
    const { name, slug, description, name_en, description_en } = req.body;
    if (!name) return res.status(400).json({ error: 'Tên danh mục là bắt buộc' });
    
    try {
        const [result] = await db.query(
            'INSERT INTO categories (name, slug, description, name_en, description_en) VALUES (?, ?, ?, ?, ?)',
            [name, slug || '', description || '', name_en || '', description_en || '']
        );
        const [newCategory] = await db.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
        res.status(201).json(newCategory[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi thêm danh mục mới' });
    }
});

// PUT update category
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, slug, description, name_en, description_en } = req.body;
    if (!name) return res.status(400).json({ error: 'Tên danh mục là bắt buộc' });
    
    try {
        const [result] = await db.query(
            'UPDATE categories SET name = ?, slug = ?, description = ?, name_en = ?, description_en = ? WHERE id = ?',
            [name, slug || '', description || '', name_en || '', description_en || '', id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy danh mục' });
        }
        
        const [updatedCategory] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
        res.json(updatedCategory[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi cập nhật danh mục' });
    }
});

// DELETE category
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy danh mục' });
        }
        
        res.json({ message: 'Đã xóa danh mục thành công' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi khi xóa danh mục' });
    }
});

module.exports = router;
