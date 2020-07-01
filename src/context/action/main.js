import { SWICTH_SCREEN, GET_VISITS, GET_TEAM, GET_CURRENT_DAY_VISITS } from '../constant/main';

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
