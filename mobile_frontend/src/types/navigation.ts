// Simple navigation types
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Investment {
  id: number;
  farmer_name: string;
  crop: string;
  amount: number;
  created_at: string;
}

export type RootStackParamList = {
  Login: undefined;
  Investments: {
    user: User;
  };
  NewInvestments: {
    onAdd: (investment: Investment) => void;
    user: User;
  };
  Farmers: undefined;
};

// Screen names - must match RootStackParamList keys exactly
export const SCREEN_NAMES = {
  LOGIN: 'Login',
  INVESTMENTS: 'Investments',
  NEW_INVESTMENTS: 'NewInvestments',
  FARMERS: 'Farmers',
} as const;

// Route paths
export const ROUTES = {
  LOGIN: '/login',
  INVESTMENTS: '/investments',
  NEW_INVESTMENTS: '/investments/new',
  FARMERS: '/farmers',
} as const;