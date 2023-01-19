import {
  LOGOUT,
  GET_USER_DATA,
  REGISTER,
  LOGIN,
  LOGIN_FAILED,
  TOKEN,
  LOADING,
  AUTH_FAILED,
  AUTHORIZED,
  UNAUTHORIZED,
  TOGGLEPROFILETOOLTIP,
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem(TOKEN) || null,
  currentUser: {
    _id: null,
    name: null,
    type: null,
    profile_photo: null,
    email: null,
    focus: null,
    description: null,
    schedule: null,
    price: null,
  },
  login_failed: false,
  auth_status: LOADING,
  emailIsTaken: false,
  isProfileTooltipCollapsed: true,
};

// Modify the reducer in order to receive the actions
const reducer = function (state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      token: action.payload.token,
      auth_status: LOADING,
    };
  } else if (action.type === LOGOUT) {
    localStorage.removeItem(TOKEN);
    return {
      ...state,
      token: null,
      currentUser: {},
      login_failed: false,
      auth_status: UNAUTHORIZED,
    };
  } else if (action.type === LOGIN_FAILED) {
    return { ...state, login_failed: true };
  } else if (action.type === GET_USER_DATA) {
    return {
      ...state,
      token: localStorage.getItem(TOKEN),
      currentUser: {
        _id: action.payload._id,
        name: action.payload.name,
        type: action.payload.type,
        profile_photo: action.payload.profile_photo,
        email: action.payload.email,
        focus: action.payload.focus || null,
        description: action.payload.description || null,
        schedule: action.payload.schedule || null,
        price: action.payload.price || null,
      },
      auth_status: AUTHORIZED,
    };
  } else if (action.type === REGISTER) {
    return {
      ...state,
      token: action.payload.token,
      auth_status: LOADING,
    };
  } else if (action.type === AUTH_FAILED) {
    return {
      ...state,
      auth_status: UNAUTHORIZED,
    };
  } else if (action.type === TOGGLEPROFILETOOLTIP) {
    return {
      ...state,
      isProfileTooltipCollapsed: !state.isProfileTooltipCollapsed,
    };
  }
  return state;
};

export default reducer;
