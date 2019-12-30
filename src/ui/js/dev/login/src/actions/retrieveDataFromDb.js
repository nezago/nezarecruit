import axios from 'axios';
import {
  CHECK_IF_EMAIL_EXISTS_FROM_USERS,
  GET_ERRORS,
} from './types';

export const checkEmailFromTableUsers = (email) => (dispatch) => {
  axios.post('/users/check-existance-of-email', email).then((res) => {
    dispatch({
      type: CHECK_IF_EMAIL_EXISTS_FROM_USERS,
      payload: res.data,
    });
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  });
};

export const descholar = () => { };
