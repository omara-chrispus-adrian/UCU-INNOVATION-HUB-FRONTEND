const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
    try {
        // Connect without specifying database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('✓ Connected to MySQL server');

        // Create database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'ucu_innovation_hub'}`);
        console.log(`✓ Database '${process.env.DB_NAME || 'ucu_innovation_hub'}' created or already exists`);

        await connection.end();
        console.log('\n✅ Database setup complete! You can now run: npm run seed\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating database:', error.message);
        console.error('\nPlease check:');
        console.error('1. MySQL is running (you confirmed it is)');
        console.error('2. DB_PASSWORD in .env file is correct');
        console.error('3. DB_USER has permission to create databases\n');
        process.exit(1);
    }
}

createDatabase();
