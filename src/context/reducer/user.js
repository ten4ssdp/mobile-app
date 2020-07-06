import { SET_USER, ISUSERLOGIN } from '../constant/user';

function userReducer(state, action) {
  switch (action.type) {
    case ISUSERLOGIN:
      return { ...state, isLogin: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default userReducer;
