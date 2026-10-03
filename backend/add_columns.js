require('dotenv').config();
const pool = require('./db');

async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE articles 
      ADD COLUMN img2 VARCHAR(500) DEFAULT '',
      ADD COLUMN img3 VARCHAR(500) DEFAULT '',
      ADD COLUMN img4 VARCHAR(500) DEFAULT '',
      ADD COLUMN gallery_images TEXT,
      ADD COLUMN template VARCHAR(50) DEFAULT 'single'
    `);
    console.log('SUCCESS: Added img2, img3, img4, gallery_images, template columns!');
  } catch (err) {
    if (err.message.includes('Duplicate column')) {
      console.log('Columns already exist, skipping.');
    } else {
      console.error('ERROR:', err.message);
    }
  }
  process.exit(0);
}

migrate();
