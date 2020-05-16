import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useContext } from 'react';
import { AsyncStorage, Alert } from 'react-native';

import { UserStore } from './context/store/user';
import Login from './views/Auth/Login';
import Home from './views/Home/Home';

const Stack = createStackNavigator();

export default function AppStack() {
  const [token, setToken] = useState('');

  const { userState } = useContext(UserStore);

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
  }, [userState.isLogin]);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
