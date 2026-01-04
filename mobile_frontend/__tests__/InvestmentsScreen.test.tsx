import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import InvestmentScreen from '../src/Screens/Investments';

// Mock navigation and route
const navigation: any = { replace: jest.fn(), navigate: jest.fn() };

jest.mock('../src/Services/api', () => ({
  getInvestments: jest.fn().mockResolvedValue([
    {
      id: 1,
      farmer_name: 'Farmer Test',
      crop: 'Wheat',
      amount: 1234.56,
      created_at: new Date().toISOString(),
    },
  ]),
}));

describe('InvestmentScreen', () => {
  it('renders investments from API', async () => {
    const route: any = { params: { user: { id: 1, username: 'demo', email: 'demo@example.com' } } };

    const { getByText } = render(<InvestmentScreen navigation={navigation} route={route} />);

    // Wait for mocked investments to appear
    await waitFor(() => {
      expect(getByText('Farmer Test')).toBeTruthy();
      expect(getByText('Wheat')).toBeTruthy();
    });
  });
});
