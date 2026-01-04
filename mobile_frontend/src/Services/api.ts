
// Get Investments
export type Investment = {
  id: number;
  user_id?: number;
  farmer_name: string;
  crop: string;
  amount: number;
  created_at: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

const BASE = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";

// Login
export async function login(username: string, password: string): Promise<User> {
  const res = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const message = res.status === 401 ? 'Invalid username or password' : `HTTP ${res.status}`;
    throw new Error(message);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Server did not return JSON. Check EXPO_PUBLIC_BACKEND_URL and that the backend is running.');
  }

  const data = await res.json();
  return data.user as User;
}

export async function getInvestments(): Promise<Investment[]> {
  const res = await fetch(`${BASE}/api/investments`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Post Investment
export async function createInvestment(payload: {
  user_id?: number;
  farmer_name: string;
  crop: string;
  amount: number;
}): Promise<Investment> {
  const res = await fetch(`${BASE}/api/investments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
