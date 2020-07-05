import {
  SWICTH_SCREEN,
  GET_VISITS,
  GET_TEAM,
  GET_CURRENT_DAY_VISITS,
  IS_MODAL_OPEN,
  SET_HOTEL_INFO,
  REFRESH,
  URGENCES
} from '../constant/main';

/**
 *
 * @param {Object} dispatch
 * @param {Boolean} payload
 */

export const onSwitchScreen = (dispatch, payload) => {
  return dispatch({
    type: SWICTH_SCREEN,
    payload
  });
};

export const getVisitsAction = (dispatch, payload) => {
  return dispatch({
    type: GET_VISITS,
    payload
  });
};

export const getTeams = (dispatch, payload) => {
  return dispatch({
    type: GET_TEAM,
    payload
  });
};

export const getCurrentDayVisits = (dispatch, payload) => {
  return dispatch({
    type: GET_CURRENT_DAY_VISITS,
    payload
  });
};

export const onOpenModal = (dispatch, payload) => {
  return dispatch({
    type: IS_MODAL_OPEN,
    payload
  });
};

export const setHotelName = (dispatch, payload) => {
  return dispatch({
    type: SET_HOTEL_INFO,
    payload
  });
};

export const onRefresh = (dispatch, payload) => {
  return dispatch({
    type: REFRESH,
    payload
  });
};

export const getUrgences = (dispatch, payload) => {
  return dispatch({
    type: URGENCES,
    payload
  });
};
