import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CheckInPage from './src/pages/checkin';
import Checkout from './src/pages/checkout';
import Home from './src/pages/home';
import Config from './src/pages/config';
import { GlobalStateProvider } from './src/config/refresh';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
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

              // Retorne o ícone com o nome e tamanho apropriados
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
