import axios from 'axios';
import {
  GET_ERRORS, SEND_NEW_APPLICATION_FORM,
} from './types';

export const submitNewApplicationForm = (newApplicationForm) => (dispatch) => {
  axios.post('/applications/apply-for-a-job', newApplicationForm)
    .then((res) => {
      dispatch({
        type: SEND_NEW_APPLICATION_FORM,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const submitLoginForm = () => () => {

};
