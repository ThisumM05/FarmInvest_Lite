import 'dotenv/config';
import { pool } from './db';

(async () => {
  try {
    console.log('Testing database connection...');
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log('Database test query result:', rows);
    console.log('Database connection: OK');
    process.exit(0);
  } catch (err) {
    console.error('Database connection: FAILED');
    console.error(err);
    process.exit(1);
  }
})();
