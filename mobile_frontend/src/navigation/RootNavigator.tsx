import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/Login";
import InvestmentScreen from "../Screens/Investments";
import NewInvestmentScreen from "../Screens/NewInvetments";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Investments" component={InvestmentScreen} />
        <Stack.Screen name="NewInvestments" component={NewInvestmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}