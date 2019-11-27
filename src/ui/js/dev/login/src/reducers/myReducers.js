import {
  GET_ERRORS,
  ADD_NEW_USER,
  CHECK_IF_EMAIL_EXISTS_FROM_USERS,
  LOGIN,
} from '../actions/types';

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state, error: action.payload,
      };
    case ADD_NEW_USER:
      return {
        ...state, userAddInfo: action.payload,
      };
    case CHECK_IF_EMAIL_EXISTS_FROM_USERS:
      return {
        ...state, isEmailExistsFromUsers: action.payload,
      };
    case LOGIN:
      return {
        ...state, loginInfo: action.payload,
      };
    default:
      return state;
  }
}
