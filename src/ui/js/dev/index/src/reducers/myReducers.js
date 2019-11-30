import {
  GET_ERRORS,
  CHECK_IF_EMAIL_EXISTS_FROM_DB,
} from '../actions/types';

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state, error: action.payload,
      };
    case CHECK_IF_EMAIL_EXISTS_FROM_DB:
      return {
        ...state, isEmailExistsFromDatabase: action.payload,
      };
    default:
      return state;
  }
}
