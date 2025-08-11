
const pool = require('../db');

async function addSchool({ name, address, latitude, longitude }) {
  const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(sql, [name, address, latitude, longitude]);
  return { id: result.insertId };
}

async function getAllSchools() {
  const sql = `SELECT id, name, address, latitude, longitude FROM schools`;
  const [rows] = await pool.query(sql);
  return rows;
}

module.exports = { addSchool, getAllSchools };
