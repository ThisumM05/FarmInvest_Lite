import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool, initializeDatabase } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Simple DB health check
app.get('/api/health/db', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (err) {
    console.error('DB health check failed:', err);
    res.status(500).json({ ok: false, error: 'Database connection failed' });
  }
});

// Test endpoint - no authentication required  
app.get('/api/test', (_req, res) => {
  res.json({ 
    message: 'FarmInvest API is working!', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Get all users (for testing)
app.get('/api/users', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Users fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Basic login API (expects a `users` table with password_hash column)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username, password: password ? '[PROVIDED]' : '[MISSING]' });
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, username, email FROM users WHERE username = ? AND password_hash = ? LIMIT 1',
      [username, password]
    );

    console.log('Query result:', rows);

    // @ts-ignore
    if (!rows.length) {
      // Check if user exists but password is wrong
      const [userExists] = await pool.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
      // @ts-ignore
      if (userExists.length > 0) {
        console.log('User exists but password incorrect');
        return res.status(401).json({ error: 'Invalid password' });
      } else {
        console.log('User does not exist');
        return res.status(401).json({ error: 'User not found' });
      }
    }

    // @ts-ignore
    const user = rows[0];
    console.log('Login successful for user:', user);
    res.json({ user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET investments
app.get('/api/investments', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, farmer_name, crop, amount, created_at FROM investments ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new investment
app.post('/api/investments', async (req, res) => {
  const { user_id, farmer_name, crop, amount } = req.body;
  if (!farmer_name || !crop || !amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO investments (user_id, farmer_name, crop, amount) VALUES (?, ?, ?, ?)',
      [user_id ?? null, farmer_name, crop, amount]
    );
    // @ts-ignore
    const id = result.insertId;
    const [rows] = await pool.query('SELECT * FROM investments WHERE id = ?', [id]);
    // @ts-ignore
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Backend running at http://localhost:${port}`);

  // Initialize MariaDB database
  const dbConnected = await initializeDatabase();
  if (dbConnected) {
    console.log('Database connection: OK');
  } else {
    console.error('Database connection: FAILED');
  }
});
