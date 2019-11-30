import axios from 'axios';
import {
  CHECK_IF_EMAIL_EXISTS_FROM_DB,
  GET_ERRORS,
} from './types';

export const checkEmailFromBb = (email) => (dispatch) => {
  axios.post('/applications/check-email-from-table-application-and-table-users',
    { email }).then((res) => {
    dispatch({
      type: CHECK_IF_EMAIL_EXISTS_FROM_DB,
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
