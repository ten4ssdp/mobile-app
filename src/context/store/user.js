import React, { createContext, useEffect } from 'react';

import userReducer from '../reducer/user';
import { AsyncStorage } from 'react-native';

import { setLoading, setIsUserLogin, setUser } from '../action/user';
import jwtDecode from 'jwt-decode';
/**
 * @type {Object}
 * @property {Boolean} isLogin
 * @property {Object} user
 *
 */
const userInitialState = {
  isLogin: false,
  loading: true,
  user: {}
};

export const UserStore = createContext();

export default function AuthProvider({ children }) {
  const [userState, dispatch] = React.useReducer(userReducer, userInitialState);

  const setToken = async (token) => {
    try{
      await AsyncStorage.setItem('token', token);
      await setIsUserLogin(dispatch, true);

    }catch(err){
      console.log(err);
    }
  }

  const getToken = async () => {
    try{
      let tokenFound = await AsyncStorage.getItem('token');
      console.log(tokenFound)
      if(tokenFound) {
        const userInfo = jwtDecode(tokenFound);
        await setUser(dispatch, userInfo);
        await setIsUserLogin(dispatch, true);
      }
      await setLoading(dispatch, false);
    }catch(err){
      console.log(err)
    }
  }

  const disconnect = async () => {
    try{
      await AsyncStorage.removeItem('token');
      setIsUserLogin(dispatch, false);
      setUser(dispatch, {});

    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [])


  return <UserStore.Provider value={{ userState, setToken, disconnect, dispatch }}>{children}</UserStore.Provider>;
}
