import {
  GET_ERRORS,
  CHECK_IF_EMAIL_EXISTS_FROM_DB,
  SEND_NEW_APPLICATION_FORM,
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
    case SEND_NEW_APPLICATION_FORM:
      return {
        ...state, applyInfo: action.payload,
      };
    default:
      return state;
  }
}
