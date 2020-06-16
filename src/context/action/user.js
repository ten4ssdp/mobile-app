import { ISUSERLOGIN, SET_USER, SIGNOUT_USER, SET_LOADING } from '../constant/user';

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

/**
 *
 * @param {Object} dispatch
 */
export const signoutUser = (dispatch) => {
  return dispatch({
    type: SIGNOUT_USER,
  });
};


export const setLoading = (dispatch, bool) => {
  return dispatch({
    type: SET_LOADING,
    payload: bool
  })
}