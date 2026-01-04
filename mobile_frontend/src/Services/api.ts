
// Get Investments
export type Investment = {
  id: number;
  farmer_name: string;
  crop: string;
  amount: number;
  created_at: string;
};

const BASE = process.env.EXPO_PUBLIC_BACKEND_URL!;

export async function getInvestments(): Promise<Investment[]> {
  const res = await fetch(`${BASE}/api/investments`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Post Investment
export async function createInvestment(payload: {
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
