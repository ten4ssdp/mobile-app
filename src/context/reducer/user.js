import { SIGNIN_USER, SIGNOUT_USER, ISUSERLOGIN } from '../constant/user';

function userReducer(state, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return state;
    case SIGNOUT_USER:
      return state;
    case ISUSERLOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}

export default userReducer;
