import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Book from '../pages/Book';
import List from '../pages/List';
import Login from '../pages/Login';
import NewSpots from '../pages/New';
import MyResquests from '../pages/Requests';

const Stack = createNativeStackNavigator();

const TabStack = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const OtherStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="Dashboard" component={List} />
      <TabStack.Screen name="New" component={NewSpots} />
      <TabStack.Screen name="Requests" component={MyResquests} />
    </TabStack.Navigator>
  );
};

export function AppRoutes(){
  return (
    <Stack.Navigator initialRouteName="HomeStack" headerMode="none" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginStack" component={LoginStack} />
        <Stack.Screen name="Tabs" component={HomeStack} />
        <Stack.Screen name="OtherStack" component={OtherStack} />
    </Stack.Navigator>
  );
}