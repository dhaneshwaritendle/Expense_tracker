const pool = require("./db");

class Expense {
    static async create(title, amount, category, date) {
    const sql = `
      INSERT INTO expenses (title, amount, category, date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    console.log('sql:', sql);
    const values = [title, amount, category, date];
    console.log('values:', values);
    const { rows } = await pool.query(sql, values);
    return rows[0];
  }

  static async findAll() {
    const sql = `select * from expenses order by created_at desc;`;
    const { rows } = await pool.query(sql);
    console.log('rows:', rows);
    return rows;
  }
  static async findById(id) {
    const sql = 'SELECT * FROM expenses WHERE id = $1;';
    const { rows } = await pool.query(sql, [id]);
    return rows[0] || null;
  }
}
module.exports = Expense;
