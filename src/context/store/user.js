import React, { createContext } from 'react';

import userReducer from '../reducer/user';

/**
 * @type {String} token
 * @property {Boolean} isLogin
 * @property {Object} user
 *
 */
const userInitialState = {
  isLogin: false,
  token: '',
  user: {}
};

export const UserStore = createContext();

export default function AuthProvider({ children }) {
  const [userState, dispatch] = React.useReducer(userReducer, userInitialState);
  return <UserStore.Provider value={{ userState, dispatch }}>{children}</UserStore.Provider>;
}
