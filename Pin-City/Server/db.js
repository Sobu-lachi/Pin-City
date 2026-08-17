import pg from 'pg';

const {Pool} = pg;

const pool = new Pool({
    user:process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}); 

pool.query('SELECT NOW()',  (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

// at:', res.rows[0].now

export default pool;