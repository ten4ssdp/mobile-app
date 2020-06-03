import { ISUSERLOGIN, SET_USER } from '../constant/user';

/**
 *
 * @param {Object} dispatch
 * @param {Boolean} payload
 */

export const setIsUserLogin = (dispatch, payload) => {
  return dispatch({
    type: ISUSERLOGIN,
    payload
  });
};

/**
 *
 * @param {Object} dispatch
 * @param {Object} payload
 */

export const setUser = (dispatch, payload) => {
  return dispatch({
    type: SET_USER,
    payload
  });
};
