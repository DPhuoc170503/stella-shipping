const mysql = require('mysql2/promise');

async function checkLocal() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Phuoc123',
            database: 'vietlogis_demo'
        });
        const [rows] = await db.query('SELECT username, name, role FROM admin_users');
        console.log('Local users:', rows);
        db.end();
    } catch(err) {
        console.error(err);
    }
}

checkLocal();
