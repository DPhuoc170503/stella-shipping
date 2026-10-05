// Script sửa URL bị lỗi trong database
// Chạy: node fix_db_urls.js

const API_URL = 'http://localhost:4000';
const TOKEN = process.env.ADMIN_TOKEN || '';

function cleanUrl(url) {
  if (!url) return url;
  // Nếu URL có chứa 2 lần "http", lấy từ lần "http" cuối cùng
  if (url.includes('http') && url.lastIndexOf('http') > 0) {
    return url.substring(url.lastIndexOf('http'));
  }
  return url;
}

async function fixArticles() {
  // Lấy token từ login
  let token = TOKEN;
  if (!token) {
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: process.env.ADMIN_USER || 'admin', password: process.env.ADMIN_PASS || '' })
    });
    const loginData = await loginRes.json();
    token = loginData.token;
    if (!token) {
      console.log('Không lấy được token. Hãy đặt ADMIN_TOKEN=<token> và chạy lại.');
      console.log('Lấy token từ localStorage trên trình duyệt: localStorage.getItem("adminToken")');
      return;
    }
  }

  // Lấy tất cả bài viết
  const res = await fetch(`${API_URL}/api/articles`);
  const articles = await res.json();
  console.log(`Fetched ${articles.length} articles`);

  let fixed = 0;
  for (const article of articles) {
    let needsUpdate = false;
    const updates = {};

    // Kiểm tra img
    const cleanedImg = cleanUrl(article.img);
    if (cleanedImg !== article.img) {
      updates.img = cleanedImg;
      needsUpdate = true;
      console.log(`[${article.id}] img: ${article.img} => ${cleanedImg}`);
    }

    // Kiểm tra img2, img3, img4
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

    // Kiểm tra galleryImages
    if (Array.isArray(article.galleryImages) && article.galleryImages.length > 0) {
      const cleanedGallery = article.galleryImages.map(cleanUrl);
      if (JSON.stringify(cleanedGallery) !== JSON.stringify(article.galleryImages)) {
        updates.galleryImages = cleanedGallery;
        needsUpdate = true;
        console.log(`[${article.id}] galleryImages fixed: ${cleanedGallery.length} images`);
      }
    }

    if (needsUpdate) {
      const updateRes = await fetch(`${API_URL}/api/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...article, ...updates })
      });
      if (updateRes.ok) {
        console.log(`  ✅ Article ${article.id} updated`);
        fixed++;
      } else {
        console.log(`  ❌ Article ${article.id} failed: ${updateRes.status}`);
      }
    }
  }

  console.log(`\nDone! Fixed ${fixed} articles.`);
}

fixArticles().catch(console.error);
