import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home';
import Config from './src/pages/config';
import LoginScreen from './src/components/auth/login';
import RegisterScreen from './src/components/auth/register';
import { GlobalStateProvider } from './src/config/refresh';
import { auth } from './src/config';
import { onAuthStateChanged } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

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
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Registro" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <GlobalStateProvider initialUser={user} setInitialUser={setUser}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="E-Park Manager">
            <Stack.Screen name="E-Park Manager" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Configuração" component={Config} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </GlobalStateProvider>
  );
};

export default App;
