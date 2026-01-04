import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db';

const app = express();
app.use(cors());
app.use(express.json());

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
  if (!user_id || !farmer_name || !crop || !amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO investments (user_id, farmer_name, crop, amount) VALUES (?, ?, ?, ?)',
      [user_id, farmer_name, crop, amount]
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
app.listen(port, () => console.log(`Backend running at http://localhost:${port}`));
