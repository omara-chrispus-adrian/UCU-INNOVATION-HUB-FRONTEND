require('dotenv').config();

console.log('Environment Variables Check:');
console.log('============================');
console.log('DB_HOST:', process.env.DB_HOST || '(not set)');
console.log('DB_PORT:', process.env.DB_PORT || '(not set)');
console.log('DB_NAME:', process.env.DB_NAME || '(not set)');
console.log('DB_USER:', process.env.DB_USER || '(not set)');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***SET***' : '(EMPTY OR NOT SET)');
console.log('============================');

if (!process.env.DB_PASSWORD) {
    console.log('\n⚠️  WARNING: DB_PASSWORD is empty or not set in .env file');
    console.log('\nPlease edit .env file and set:');
    console.log('DB_PASSWORD=your_mysql_password_here');
} else {
    console.log('\n✓ DB_PASSWORD is set');
}
