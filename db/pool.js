const { Pool } = require('pg');

// allow use of .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});
