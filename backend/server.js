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

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Đường dẫn hỗ trợ khởi tạo Database trực tiếp từ trình duyệt
app.get('/api/init-db', async (req, res) => {
    try {
        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const migrationSql = fs.readFileSync(path.join(__dirname, 'pricing_migration.sql'), 'utf8');

        await db.query(schemaSql);
        await db.query(migrationSql);

        res.send("✅ Đã khởi tạo cơ sở dữ liệu thành công!");
    } catch (err) {
        res.status(500).send("❌ Lỗi khởi tạo DB: " + err.message);
    }
});

app.use('/api/nav', navRoute);
app.use('/api/articles', articlesRoute);
app.use('/api/pricing', pricingRoute);
app.use('/api/quotes', quotesRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));