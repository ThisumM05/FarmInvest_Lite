import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/Login";
import InvestmentScreen from "../Screens/Investments";
import NewInvestmentScreen from "../Screens/NewInvetments";
import FarmersScreen from "../Screens/Farmers";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}