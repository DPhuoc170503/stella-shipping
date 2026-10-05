// Script kiểm tra articles trong DB và xem thử DB nào đang dùng
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function checkDB() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defaultdb',
    charset: 'utf8mb4',
  });

  try {
    const [rows] = await pool.query('SELECT id, img, gallery_images FROM articles ORDER BY id DESC LIMIT 5');
    console.log('Latest 5 articles:');
    rows.forEach(r => {
      console.log(`  id=${r.id}, img=${r.img}`);
      if (r.gallery_images) console.log(`    gallery_images=${r.gallery_images.substring(0, 100)}`);
    });
    const [cnt] = await pool.query('SELECT COUNT(*) as c FROM articles');
    console.log(`Total articles: ${cnt[0].c}`);
  } finally {
    await pool.end();
  }
}
checkDB().catch(console.error);
