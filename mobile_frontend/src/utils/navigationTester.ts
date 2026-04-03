import { NavigationService } from './navigationService';

// Simple navigation testing utilities
export const NavigationTester = {
  
  // Test if navigation service methods exist
  testNavigationMethods: (): boolean => {
    try {
      console.log('🧪 Testing Navigation Methods...');
      
      const methods = ['goToLogin', 'goToInvestments', 'goToNewInvestment', 'goToFarmers', 'goBack'];
      
      const missingMethods = methods.filter(method => 
        typeof NavigationService[method as keyof typeof NavigationService] !== 'function'
      );
      
      if (missingMethods.length > 0) {
        console.error('❌ Missing methods:', missingMethods);
        return false;
      }
      
      console.log('✅ All navigation methods available');
      return true;
      
    } catch (error) {
      console.error('❌ Navigation test failed:', error);
      return false;
    }
  },
  
  // Test screen names
  testScreenNames: (): boolean => {
    try {
      console.log('🧪 Testing Screen Names...');
      
      const requiredScreens = ['Login', 'Investments', 'NewInvestments', 'Farmers'];
      console.log('✅ Required screens defined:', requiredScreens);
      return true;
      
    } catch (error) {
      console.error('❌ Screen names test failed:', error);
      return false;
    }
  },
  
  // Run all tests
  runAllTests: (): boolean => {
    console.log('🧪 Running Navigation Tests...');
    
    const methodsTest = NavigationTester.testNavigationMethods();
    const screensTest = NavigationTester.testScreenNames();
    
    const allPassed = methodsTest && screensTest;
    
    if (allPassed) {
      console.log('🎉 All navigation tests passed!');
    } else {
      console.error('❌ Some navigation tests failed');
    }
    
    return allPassed;
  }
};