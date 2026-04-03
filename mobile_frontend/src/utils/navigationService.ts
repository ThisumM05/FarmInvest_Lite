import { NavigationProp } from '@react-navigation/native';

// Define the navigation types locally to avoid import issues
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

export type AppNavigationProp = NavigationProp<RootStackParamList>;

// Simple navigation helpers
export const NavigationService = {
  
  goToLogin(navigation: AppNavigationProp) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  },

  goToInvestments(navigation: AppNavigationProp, params: RootStackParamList['Investments']) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Investments', params }],
    });
  },

  goToNewInvestment(navigation: AppNavigationProp, params: RootStackParamList['NewInvestments']) {
    navigation.navigate('NewInvestments', params);
  },

  goToFarmers(navigation: AppNavigationProp) {
    navigation.navigate('Farmers');
  },

  goBack(navigation: AppNavigationProp) {
    navigation.goBack();
  },
};