import {
  SWICTH_SCREEN,
  GET_VISITS,
  GET_TEAM,
  GET_CURRENT_DAY_VISITS,
  IS_MODAL_OPEN,
  SET_HOTEL_INFO
} from '../constant/main';

function mainReducer(state, action) {
  switch (action.type) {
    case SWICTH_SCREEN:
      return {
        ...state,
        hasToRenderCalendar: action.payload
      };
    case GET_VISITS:
      return {
        ...state,
        visits: action.payload
      };
    case GET_CURRENT_DAY_VISITS: {
      return {
        ...state,
        currentDayVisits: action.payload
      };
    }
    case IS_MODAL_OPEN: {
      return {
        ...state,
        isModalOpen: action.payload
      };
    }
    case SET_HOTEL_INFO: {
      return {
        ...state,
        hotelInfo: action.payload
      };
    }
    case GET_TEAM:
      return {
        ...state,
        team: action.payload
      };
    default:
      return state;
  }
}

export default mainReducer;
