const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

// Simple error handler for unexpected idle client errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

module.exports = pool;