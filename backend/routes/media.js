const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Tạo tên file duy nhất tránh trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'media-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép ảnh
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ được phép upload file ảnh (jpg, png, webp, gif...)!'));
    }
  }
});

// GET /api/media - Lấy danh sách file ảnh đã upload
router.get('/', (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    // Lọc chỉ lấy các file ảnh
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });

    // Tạo mảng thông tin file kèm URL
    const mediaList = imageFiles.map(file => {
      const stats = fs.statSync(path.join(uploadDir, file));
      return {
        name: file,
        url: `/uploads/${file}`,
        size: stats.size,
        createdAt: stats.birthtime
      };
    });

    // Sắp xếp mới nhất lên đầu
    mediaList.sort((a, b) => b.createdAt - a.createdAt);

    res.json(mediaList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Không thể đọc thư mục media' });
  }
});

// POST /api/media/upload - Upload file mới
router.post('/upload', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Không tìm thấy file' });
    }

    res.json({
      success: true,
      message: 'Upload thành công',
      url: `/uploads/${req.file.filename}`,
      name: req.file.filename
    });
  });
});

// DELETE /api/media/:filename - Xóa file
router.delete('/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(uploadDir, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.json({ success: true, message: 'Đã xóa file' });
    } else {
      res.status(404).json({ error: 'Không tìm thấy file' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi xóa file' });
  }
});

module.exports = router;
