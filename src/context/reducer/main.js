import { SWICTH_SCREEN } from '../constant/main';

function mainReducer(state, action) {
  switch (action.type) {
    case SWICTH_SCREEN:
      return {
        ...state,
        hasToRenderCalendar: action.payload
      };
    default:
      return state;
  }
}

export default mainReducer;
