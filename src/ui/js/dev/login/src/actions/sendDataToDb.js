import axios from 'axios';
import {
  GET_ERRORS, ADD_NEW_USER, LOGIN,
} from './types';

export const submitNewUser = (newUser) => (dispatch) => {
  axios.post('/users/register-new-user', newUser)
    .then((res) => {
      const { login, token } = res.data;
      if (login) {
        window.localStorage.setItem('oauth', token);
        window.location.replace(`/auth/auth-user?redirect=true&oauth=${window.localStorage.getItem('oauth')}`);
      }
      dispatch({
        type: ADD_NEW_USER,
        payload: res.data,
      });
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const submitLoginForm = (loginInfo) => (dispatch) => {
  axios.post('/users/login', loginInfo).then((res) => {
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    /** redirecting to the user page */
    const gotenLoginInfo = res.data;
    if (gotenLoginInfo.login) {
      window.localStorage.setItem('oauth', gotenLoginInfo.token);
      window.location.replace(`/auth/auth-user?redirect=true&oauth=${window.localStorage.getItem('oauth')}`);
    }
  }).catch((err) => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  });
};
