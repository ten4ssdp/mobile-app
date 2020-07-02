import React, { createContext } from 'react';

import mainReducer from '../reducer/main';

/**
 * @type {Object} initialState
 * @property {Boolean} hasToRenderCalendar
 * @property {Array} visits
 * @property {Object} team
 * @property {Boolean} isModalOpen
 * @property {Boolean} refresh
 */
const initialState = {
  hasToRenderCalendar: false,
  visits: null,
  team: null,
  currentDayVisits: null,
  isModalOpen: false,
  hotelInfo: { hotelName: '', visitId: null },
  refresh: false
};

export const MainStore = createContext();

export default function MainProvider({ children }) {
  const [state, dispatch] = React.useReducer(mainReducer, initialState);
  return <MainStore.Provider value={{ state, dispatch }}>{children}</MainStore.Provider>;
}
