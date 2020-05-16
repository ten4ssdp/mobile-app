import { ISUSERLOGIN } from '../constant/user';

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
