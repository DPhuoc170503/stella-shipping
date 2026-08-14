async function testAPI() {
  try {
    const res = await fetch('http://localhost:4000/api/settings/home_page');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text.substring(0, 500));
    try {
      const json = JSON.parse(text);
      console.log('Is valid JSON?', true);
      console.log('Type of hero:', typeof json.hero);
    } catch(e) {
      console.log('Is valid JSON?', false);
    }
  } catch(e) {
    console.log('Fetch error:', e.message);
  }
}
testAPI();
