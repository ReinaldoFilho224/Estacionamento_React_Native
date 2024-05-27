import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/pages/home';
import Config from './src/pages/config';
import LoginScreen from './src/components/auth/login';
import RegisterScreen from './src/components/auth/register';
import { GlobalStateProvider } from './src/config/refresh';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from './src/config';
import { onAuthStateChanged } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
          <Tab.Screen name="Login" component={LoginScreen} options={{ tabBarLabel: 'Entrar', tabBarIcon: ({ color, size }) => (<Icon name="log-in-outline" size={size} color={color} />) }} />
          <Tab.Screen name="Registro" component={RegisterScreen} options={{ tabBarLabel: 'Registrar', tabBarIcon: ({ color, size }) => (<Icon name="person-add-outline" size={size} color={color} />) }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <GlobalStateProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              headerShown: false, 
            })}
            tabBarOptions={{
              style: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 0 },
              activeTintColor: '#FF5733',
              inactiveTintColor: '#666',
            }}
          >
            <Tab.Screen name="Checkin" component={Config} options={{ tabBarLabel: 'Check-in', tabBarIcon: ({ color, size }) => (<Icon name="checkmark-circle-outline" size={size} color={color} />) }} />
            <Tab.Screen name="E-Park Manager" component={Home} options={{ tabBarLabel: 'E-Park', tabBarIcon: ({ color, size }) => (<Icon name="home-outline" size={size} color={color} />) }} />
            <Tab.Screen name="Configuração" component={Config} options={{ tabBarLabel: 'Configurações', tabBarIcon: ({ color, size }) => (<Icon name="settings-outline" size={size} color={color} />) }} />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </GlobalStateProvider>
  );
};

export default App;
