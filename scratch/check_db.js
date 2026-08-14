const pool = require('../backend/db');
async function checkDB() {
  const [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = "home_page"');
  console.log('Type from DB:', typeof rows[0].setting_value);
  console.log('Value from DB:', rows[0].setting_value);
  if (typeof rows[0].setting_value === 'string') {
     console.log('Parsed type:', typeof JSON.parse(rows[0].setting_value));
  }
  process.exit();
}
checkDB();
