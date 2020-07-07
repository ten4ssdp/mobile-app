import { NavigationContainer } from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import AppStack from './AppStack';
import LoginStack from './LoginStack';
import { setUser } from './context/action/user';
import { UserStore } from './context/store/user';

function Routes() {
  const { userState, dispatch } = useContext(UserStore);

  const [token, setToken] = useState('');
  useEffect(() => {
    async function getToken() {
      try {
        const tokenFound = await AsyncStorage.getItem('token');
        if (!tokenFound) {
          setToken('');
          setUser(dispatch, {});
          return undefined;
        }
        setToken(tokenFound);
        const decoded = jwtDecode(tokenFound);
        setUser(dispatch, decoded);
      } catch (error) {
        console.log(error.message);
      }
    }
    getToken();
  }, [userState.isLogin]);

  return <NavigationContainer>{token ? <AppStack /> : <LoginStack />}</NavigationContainer>;
}

export default Routes;
