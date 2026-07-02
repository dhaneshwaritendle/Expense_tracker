const pool = require("./db");
const bcrypt = require("bcrypt");

class User {
  static async create(fullName, email, username, plainPassword) {
    try {
       const passwordHash = await bcrypt.hash(plainPassword, 10);

    const sql = `
      INSERT INTO users (full_name, email, username, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, username, created_at;
    `;
    const values = [fullName, email, username, passwordHash];
      console.log("create user:", sql );
    const { rows } = await pool.query(sql, values);
    console.log("create sucess");
    return rows[0]; 
      
    } catch (error) {
      console.error('database error:', error.message);
    }
   
  }

  static async findByUsername(username) {
    const sql = "SELECT * FROM users WHERE username = $1;";
    const { rows } = await pool.query(sql, [username]);
    return rows[0] || null;
  }
}

module.exports = User;
