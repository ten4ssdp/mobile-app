import { SET_USER, SIGNOUT_USER, ISUSERLOGIN, SET_LOADING } from '../constant/user';

function userReducer(state, action) {
  switch (action.type) {
    case SIGNOUT_USER:
      return { user: {}, isLogin: false, loading: true };
    case ISUSERLOGIN:
      return { ...state, isLogin: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default userReducer;
