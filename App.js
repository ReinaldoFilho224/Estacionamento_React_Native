// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckInPage from './src/pages/checkin';
import Checkout from './src/pages/checkout';
import Home from './src/pages/home';
import Config from './src/pages/config';
import LoginScreen from './src/components/auth/login';
import RegisterScreen from './src/components/auth/register';
import { GlobalStateProvider } from './src/config/refresh';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from './src/config';
import { onAuthStateChanged } from 'firebase/auth';

const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Registro" component={RegisterScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'E-Park Manager') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Checkin') {
                iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              } else if (route.name === 'Checkout') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Configuração') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="E-Park Manager" component={Home} />
          <Tab.Screen name="Checkin" component={CheckInPage} />
          <Tab.Screen name="Checkout" component={Checkout} />
          <Tab.Screen name="Configuração" component={Config} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
};

export default App;
