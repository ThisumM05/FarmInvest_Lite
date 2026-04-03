import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock data for testing
const mockInvestments = [
  { id: 1, user_id: 1, farmer_name: 'Harish Kumar', crop: 'Wheat', amount: 12500.00, created_at: '2024-10-12T00:00:00.000Z' },
  { id: 2, user_id: 1, farmer_name: 'Anita Devi', crop: 'Rice', amount: 8200.00, created_at: '2024-09-28T00:00:00.000Z' },
  { id: 3, user_id: 1, farmer_name: 'Rajesh Singh', crop: 'Barley', amount: 15000.00, created_at: '2024-08-15T00:00:00.000Z' },
  { id: 4, user_id: 1, farmer_name: 'Sunita Rao', crop: 'Corn', amount: 9580.00, created_at: '2024-07-30T00:00:00.000Z' },
];

const mockUser = { id: 1, username: 'Alex Rivera', email: 'alex@example.com' };

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Simple mock authentication
  if ((username === 'demo' && password === 'demo') || (username === 'Alex Rivera' && password === 'alex123')) {
    res.json({ user: mockUser });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get investments
app.get('/api/investments', (req, res) => {
  res.json(mockInvestments);
});

// Create investment
app.post('/api/investments', (req, res) => {
  const { farmer_name, crop, amount } = req.body;
  
  if (!farmer_name || !crop || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newInvestment = {
    id: mockInvestments.length + 1,
    user_id: 1,
    farmer_name,
    crop,
    amount: parseFloat(amount),
    created_at: new Date().toISOString()
  };

  mockInvestments.push(newInvestment);
  res.json(newInvestment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 Using mock data (MySQL not connected)');
  console.log('🎯 Login with: username="demo", password="demo"');
});