import axios from '../utils/axios';
import { GET_USER_DATA, AUTH_FAILED } from './constants';

function getUserData(token) {
  return async function (dispatch) {
    try {
      const response = await axios.get('/login', { params: { token } });
      const { _id, name, profile_photo, email, focus, description, schedule, price } = response.data.userData;
      const { type } = response.data;
      dispatch({
        type: GET_USER_DATA,
        payload: { _id, name, type, profile_photo, email, focus, description, schedule, price },
      });
    } catch (err) {
      dispatch({
        type: AUTH_FAILED,
      });
    }
  };
}

export default getUserData;
