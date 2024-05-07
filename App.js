import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckInPage from './src/pages/checkin';
import Checkout from './src/pages/checkout';
import Home from './src/pages/home';
import Config from './src/pages/config';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="E-Park Manager" component={Home} />
        <Tab.Screen name="Checkin" component={CheckInPage} />
        <Tab.Screen name="Checkout" component={Checkout} />
        <Tab.Screen name="Configuração" component={Config} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
