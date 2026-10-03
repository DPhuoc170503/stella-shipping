const fs = require('fs');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const executeSqlFile = async (filePath) => {
    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return;
    }
    const sqlContent = fs.readFileSync(filePath, 'utf8');

    const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
        try {
            console.log("Executing:", statement.substring(0, 80) + "...");
            await db.query(statement);
            console.log("✓ Success.");
        } catch (err) {
            if (err.message.includes('Duplicate column')) {
                console.log("⚠ Column already exists, skipping.");
            } else {
                console.error("✗ Error:", err.message);
            }
        }
    }
    console.log("\n✅ Template migration complete.");
    process.exit(0);
};

executeSqlFile(path.join(__dirname, 'template_migration.sql'));
