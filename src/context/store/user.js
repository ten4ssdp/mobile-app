import React, { createContext } from 'react';

import userReducer from '../reducer/user';

const userInitialState = {
  token: null
};

export const UserStore = createContext(userInitialState);

export default function AuthProvider({ children }) {
  const [userState, dispatch] = React.useReducer(userReducer, userInitialState);
  return <UserStore.Provider value={{ userState, dispatch }}>{children}</UserStore.Provider>;
}
