require('dotenv').config();
const pool = require('./db');

async function migrate() {
  try {
    console.log('Starting i18n database migration...');

    const queries = [
      "ALTER TABLE articles ADD COLUMN title_en VARCHAR(500) AFTER title;",
      "ALTER TABLE articles ADD COLUMN description_en TEXT AFTER description;",
      "ALTER TABLE articles ADD COLUMN full_content_en TEXT AFTER full_content;",
      
      "ALTER TABLE categories ADD COLUMN name_en VARCHAR(255) AFTER name;",
      "ALTER TABLE categories ADD COLUMN description_en TEXT AFTER description;",
      
      "ALTER TABLE navigation ADD COLUMN label_en VARCHAR(255) AFTER label;",
      
      "ALTER TABLE pricing_rates ADD COLUMN route_en VARCHAR(255) AFTER route;",
      "ALTER TABLE pricing_rates ADD COLUMN origin_en VARCHAR(255) AFTER origin;",
      "ALTER TABLE pricing_rates ADD COLUMN destination_en VARCHAR(255) AFTER destination;",
      "ALTER TABLE pricing_rates ADD COLUMN service_en VARCHAR(100) AFTER service;",
      "ALTER TABLE pricing_rates ADD COLUMN service_type_en VARCHAR(100) AFTER service_type;",
      "ALTER TABLE pricing_rates ADD COLUMN note_en TEXT AFTER note;",
      "ALTER TABLE pricing_rates ADD COLUMN notes_en TEXT AFTER notes;"
    ];

    for (const query of queries) {
      try {
        await pool.query(query);
        console.log(`Success: ${query}`);
      } catch (err) {
        // Ignore duplicate column errors
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`Skipped (already exists): ${query}`);
        } else {
          console.error(`Error on query: ${query}`, err.message);
        }
      }
    }

    // Duplicate home_page settings to home_page_en if it doesn't exist
    const [rows] = await pool.query("SELECT * FROM settings WHERE setting_key = 'home_page'");
    if (rows.length > 0) {
      const homePage = rows[0].setting_value;
      try {
        await pool.query("INSERT INTO settings (setting_key, setting_value) VALUES ('home_page_en', ?)", [JSON.stringify(homePage)]);
        console.log("Success: Created home_page_en setting");
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log("Skipped: home_page_en already exists");
        } else {
          console.error("Error creating home_page_en:", err.message);
        }
      }
    }

    console.log('Migration finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
