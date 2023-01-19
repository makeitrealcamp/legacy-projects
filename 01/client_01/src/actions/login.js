import axios from '../utils/axios';
import { LOGIN, LOGIN_FAILED, TOKEN } from './constants';
import history from '../utils/history';

function login({ email, password }) {
  return async function (dispatch) {
    await axios
      .post('/login', { email, password })
      .then((response) => {
        const token = response.data.token;
        const userData = response.data.userData;
        dispatch({ type: LOGIN, payload: { token, userData } });
        localStorage.setItem(TOKEN, token);
        history.push('/home');
      })
      .catch(() => {
        dispatch({ type: LOGIN_FAILED });
      });
  };
}

export default login;
