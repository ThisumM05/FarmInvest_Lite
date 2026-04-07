import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/Login";
import InvestmentScreen from "../Screens/Investments";
import NewInvestmentScreen from "../Screens/NewInvetments";
import FarmersScreen from "../Screens/Farmers";
import YieldPredictionScreen from "../Screens/YieldPrediction";
import RiskScoringScreen from "../Screens/RiskScoring";
import { RootStackParamList, SCREEN_NAMES, ROUTES } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Simple linking configuration
const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: ROUTES.LOGIN,
      Investments: ROUTES.INVESTMENTS,
      NewInvestments: ROUTES.NEW_INVESTMENTS,
      Farmers: ROUTES.FARMERS,
      YieldPrediction: ROUTES.YIELD_PREDICTION,
      RiskScoring: ROUTES.RISK_SCORING,
    },
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator 
        initialRouteName={SCREEN_NAMES.LOGIN} 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAMES.INVESTMENTS} component={InvestmentScreen} />
        <Stack.Screen name={SCREEN_NAMES.NEW_INVESTMENTS} component={NewInvestmentScreen} />
        <Stack.Screen name={SCREEN_NAMES.FARMERS} component={FarmersScreen} />
        <Stack.Screen name={SCREEN_NAMES.YIELD_PREDICTION} component={YieldPredictionScreen} />
        <Stack.Screen name={SCREEN_NAMES.RISK_SCORING} component={RiskScoringScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}