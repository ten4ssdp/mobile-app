import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';

import Login from './views/Auth/Login';
import Home from './views/Home/Home';

const Stack = createStackNavigator();

export default function AppStack() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      try {
        const tokenFound = await AsyncStorage.getItem('token');
        setToken(tokenFound);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
    getToken();
  }, [token]);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
