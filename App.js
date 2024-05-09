import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckInPage from './src/pages/checkin';
import Checkout from './src/pages/checkout';
import Home from './src/pages/home';
import Config from './src/pages/config';
import { GlobalStateProvider } from './src/config/refresh';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  return (
    <GlobalStateProvider>
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="E-Park Manager" component={Home} />
        <Tab.Screen name="Checkin" component={CheckInPage} />
        <Tab.Screen name="Checkout" component={Checkout} />
        <Tab.Screen name="Configuração" component={Config} />
      </Tab.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}