import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList, User, Investment } from '../types/navigation';

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

  goToYieldPrediction(navigation: AppNavigationProp) {
    navigation.navigate('YieldPrediction');
  },

  goToRiskScoring(navigation: AppNavigationProp) {
    navigation.navigate('RiskScoring');
  },

  goBack(navigation: AppNavigationProp) {
    navigation.goBack();
  },
};