import React, { createContext } from 'react';

import mainReducer from '../reducer/main';

/**
 * @type {Object}
 * @property {Boolean} hasToRenderCalendar
 *
 */
const initialState = {
  hasToRenderCalendar: false
};

export const MainStore = createContext();

export default function MainProvider({ children }) {
  const [state, dispatch] = React.useReducer(mainReducer, initialState);
  return <MainStore.Provider value={{ state, dispatch }}>{children}</MainStore.Provider>;
}
