const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const navRoute = require('./routes/nav');
const articlesRoute = require('./routes/articles');
const pricingRoute = require('./routes/pricing');
const quotesRoute = require('./routes/quotes');
const settingsRoute = require('./routes/settings');
const mediaRoute = require('./routes/media');
const statsRoute = require('./routes/stats');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const categoriesRoute = require('./routes/categories');
const newsletterRoute = require('./routes/newsletter');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Hàm hỗ trợ đọc và thực thi từng câu lệnh SQL lẻ
const executeSqlFile = async (filePath) => {
    if (!fs.existsSync(filePath)) return;
    const sqlContent = fs.readFileSync(filePath, 'utf8');

    // Tách các câu lệnh theo dấu chấm phẩy ;
    const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
        await db.query(statement);
    }
};

// LƯU Ý BẢO MẬT: Route khởi tạo Database đã được comment lại để bảo vệ dữ liệu trên Production.
// Nếu bạn muốn chạy lại khi đang code ở máy cá nhân (development), hãy mở comment ra.
/*
app.get('/api/init-db', async (req, res) => {
    try {
        await executeSqlFile(path.join(__dirname, 'schema.sql'));
        await executeSqlFile(path.join(__dirname, 'pricing_migration.sql'));

        res.send("✅ Đã khởi tạo cơ sở dữ liệu thành công!");
    } catch (err) {
        res.status(500).send("❌ Lỗi khởi tạo DB: " + err.message);
    }
});
*/

// TẠM THỜI: Endpoint tạo bảng subscribers trên production (xóa sau khi chạy xong)
app.get('/api/init-newsletter', async (req, res) => {
    try {
        await executeSqlFile(path.join(__dirname, 'newsletter_migration.sql'));
        res.send("✅ Bảng subscribers đã được tạo thành công!");
    } catch (err) {
        res.status(500).send("❌ Lỗi: " + err.message);
    }
});

// TẠM THỜI: Endpoint chạy i18n_migration trên production
app.get('/api/init-i18n', async (req, res) => {
    try {
        const queries = [
            "ALTER TABLE articles ADD COLUMN title_en VARCHAR(500) AFTER title",
            "ALTER TABLE articles ADD COLUMN description_en TEXT AFTER description",
            "ALTER TABLE articles ADD COLUMN full_content_en TEXT AFTER full_content",
            "ALTER TABLE articles ADD COLUMN category_en VARCHAR(100) AFTER category",
            "ALTER TABLE categories ADD COLUMN name_en VARCHAR(255) AFTER name",
            "ALTER TABLE categories ADD COLUMN description_en TEXT AFTER description",
            "ALTER TABLE navigation ADD COLUMN label_en VARCHAR(255) AFTER label",
            "ALTER TABLE pricing_rates ADD COLUMN route_en VARCHAR(255) AFTER route",
            "ALTER TABLE pricing_rates ADD COLUMN origin_en VARCHAR(255) AFTER origin",
            "ALTER TABLE pricing_rates ADD COLUMN destination_en VARCHAR(255) AFTER destination",
            "ALTER TABLE pricing_rates ADD COLUMN service_en VARCHAR(100) AFTER service",
            "ALTER TABLE pricing_rates ADD COLUMN service_type_en VARCHAR(100) AFTER service_type",
            "ALTER TABLE pricing_rates ADD COLUMN note_en TEXT AFTER note",
            "ALTER TABLE pricing_rates ADD COLUMN notes_en TEXT AFTER notes"
        ];
        for (const query of queries) {
            try { await db.query(query); } catch (e) { /* ignore duplicate column */ }
        }
        res.send("✅ Đã chạy i18n migration thành công!");
    } catch (err) {
        res.status(500).send("❌ Lỗi: " + err.message);
    }
});

// TẠM THỜI: Endpoint kiểm tra schema
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await db.query("DESCRIBE articles;");
        res.json(rows);
    } catch (err) {
        res.status(500).send("Lỗi: " + err.message);
    }
});

app.get('/api/test-add-article', async (req, res) => {
    try {
        const [result] = await db.query(
          `INSERT INTO articles (title, description, full_content, category, author, img, read_time, status, title_en, description_en, full_content_en, category_en)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          ['T', 'D', '', 'Công ty', '', '/Banner.jpg', '3 phút', 'draft', '', '', '', '']
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/api/nav', navRoute);
app.use('/api/articles', articlesRoute);
app.use('/api/pricing', pricingRoute);
app.use('/api/quotes', quotesRoute);
app.use('/api/settings', settingsRoute);
app.use('/api/media', mediaRoute);
app.use('/api/stats', statsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/newsletter', newsletterRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));