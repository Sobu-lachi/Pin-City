/* eslint-disable no-undef */
import pg from 'pg';
import argon2 from 'argon2';

const {Pool} = pg;

const pool = new Pool({
    user:process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}); 

// eslint-disable-next-line no-unused-vars
pool.query('SELECT NOW()',  (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

// at:', res.rows[0].now

const argon2Options = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism:1,
  hashLength: 16,
  // raw: true,
}

export {pool, argon2Options};
