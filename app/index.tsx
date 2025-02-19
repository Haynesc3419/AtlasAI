import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { Text, View } from "react-native";
import { CardStyleInterpolators, createStackNavigator, Header, HeaderStyleInterpolators } from '@react-navigation/stack';
import { LoginPage } from "./pages/login";
import { PlannerPage } from "./pages/planner";

export default function Index() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
      initialRouteName="login"
      screenOptions={{ headerShown: true,
        headerTitle: "AtlasAI"
       }}
      >
      <Stack.Screen name="login" component={LoginPage} />
      <Stack.Screen name="planner" component={PlannerPage} />
    </Stack.Navigator>
  );
}
