// Script trực tiếp sửa URL bị lỗi trong database
// Chạy từ thư mục backend: node fix_db_urls_direct.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

function cleanUrl(url) {
  if (!url) return url;
  // Nếu URL có chứa 2 lần "http", lấy từ lần "http" cuối cùng
  if (url.includes('http') && url.lastIndexOf('http') > 0) {
    return url.substring(url.lastIndexOf('http'));
  }
  return url;
}

async function fixAllUrls() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'defaultdb',
    ...(process.env.DB_HOST !== 'localhost' && {
      ssl: { rejectUnauthorized: false }
    }),
    charset: 'utf8mb4',
  });

  try {
    // Lấy tất cả bài viết
    const [articles] = await pool.query('SELECT id, img, img2, img3, img4, gallery_images FROM articles');
    console.log(`Found ${articles.length} articles`);

    let fixed = 0;
    for (const article of articles) {
      const updates = {};
      let needsUpdate = false;

      // Sửa img
      const cleanedImg = cleanUrl(article.img);
      if (cleanedImg !== article.img) {
        updates.img = cleanedImg;
        needsUpdate = true;
        console.log(`[${article.id}] img: ${article.img} => ${cleanedImg}`);
      }

      // Sửa img2, img3, img4
      for (const field of ['img2', 'img3', 'img4']) {
        if (article[field]) {
          const cleaned = cleanUrl(article[field]);
          if (cleaned !== article[field]) {
            updates[field] = cleaned;
            needsUpdate = true;
            console.log(`[${article.id}] ${field}: ${article[field]} => ${cleaned}`);
          }
        }
      }

      // Sửa gallery_images (JSON string hoặc comma-separated)
      if (article.gallery_images) {
        let galleryArr;
        try {
          galleryArr = JSON.parse(article.gallery_images);
        } catch {
          galleryArr = article.gallery_images.split(',').map(s => s.trim()).filter(Boolean);
        }
        
        if (Array.isArray(galleryArr) && galleryArr.length > 0) {
          const cleanedGallery = galleryArr.map(cleanUrl);
          if (JSON.stringify(cleanedGallery) !== JSON.stringify(galleryArr)) {
            updates.gallery_images = JSON.stringify(cleanedGallery);
            needsUpdate = true;
            console.log(`[${article.id}] gallery_images: fixed ${cleanedGallery.length} URLs`);
            cleanedGallery.forEach((u, i) => console.log(`  [${i}]: ${u}`));
          }
        }
      }

      if (needsUpdate) {
        const setClauses = Object.keys(updates).map(k => `\`${k}\` = ?`).join(', ');
        const values = [...Object.values(updates), article.id];
        await pool.query(`UPDATE articles SET ${setClauses} WHERE id = ?`, values);
        console.log(`  ✅ Article ${article.id} updated`);
        fixed++;
      }
    }

    console.log(`\n✅ Done! Fixed ${fixed} articles out of ${articles.length} total.`);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

fixAllUrls();
