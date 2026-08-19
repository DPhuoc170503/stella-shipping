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