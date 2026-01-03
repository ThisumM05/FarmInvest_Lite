import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/Screens/Login";
import InvestmentScreen from "./src/Screens/Investments";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Investments" component={InvestmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}