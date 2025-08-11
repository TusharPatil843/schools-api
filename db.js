// // db.js
// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: Number(process.env.DB_PORT),
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = pool;


// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

(async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection
    const conn = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    conn.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // stop app if DB connection fails
  }
})();

module.exports = () => pool;
