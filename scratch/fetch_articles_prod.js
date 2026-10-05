async function testAPI() {
  try {
    const res = await fetch('https://stella-shipping.onrender.com/api/articles');
    const articles = await res.json();
    console.log(`Fetched ${articles.length} articles`);
    for (let a of articles) {
      if (a.id === 38 || a.title.includes('MỸ: GIÁ HỢP ĐỒNG')) {
        console.log(`Article ${a.id}: ${a.title}`);
        console.log(`img: ${a.img}`);
        console.log(`galleryImages: ${a.galleryImages}`);
      }
    }
  } catch(e) {
    console.log('Fetch error:', e.message);
  }
}
testAPI();
