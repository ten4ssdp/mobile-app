import { SIGNIN_USER, SIGNOUT_USER } from '../constant/user';

function userReducer(state, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return state;
    case SIGNOUT_USER:
      return state;
    default:
      return state;
  }
}

export default userReducer;
