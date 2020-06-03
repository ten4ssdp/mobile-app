import { SWICTH_SCREEN } from '../constant/main';

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
