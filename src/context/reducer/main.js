import {
  SWICTH_SCREEN,
  GET_VISITS,
  GET_TEAM,
  GET_CURRENT_DAY_VISITS,
  IS_MODAL_OPEN,
  SET_HOTEL_INFO,
  REFRESH,
  URGENCES,
  CONFIRMATION_MODAL,
  GET_USER_LOCATION,
  SHOW_BANNER,
  RESET_STATE
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
    case REFRESH: {
      return {
        ...state,
        refresh: action.payload
      };
    }
    case URGENCES: {
      return {
        ...state,
        urgences: action.payload
      };
    }
    case GET_TEAM:
      return {
        ...state,
        team: action.payload
      };
    case CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpen: action.payload
      };
    case GET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload
      };
    case SHOW_BANNER:
      return {
        ...state,
        showBanner: action.payload
      };
    case RESET_STATE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

export default mainReducer;
