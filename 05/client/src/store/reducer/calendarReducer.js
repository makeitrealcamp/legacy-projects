export const CHANGE_DATE = "CHANGE_DATE";
export const CHANGE_TITLEDATE = "CHANGE_TITLEDATE";
export const CHANGE_HEADDATE = "CHANGE_HEADDATE";
export const CHANGE_FLEXRANGE = "CHANGE_FLEXRANGE";
export const CHANGE_NIGHTS = "CHANGE_NIGHTS";

//action creator
export const changeDate = (value) => {
  return {
    type: CHANGE_DATE,
    payload: value,
  };
};

export const changeTitle = (value) => {
  return {
    type: CHANGE_TITLEDATE,
    payload: value,
  };
};
export const changeDateHead = (value) => {
  return {
    type: CHANGE_HEADDATE,
    payload: value,
  };
};
export const changeFlexRange = (value) => {
  return {
    type: CHANGE_FLEXRANGE,
    payload: value,
  };
};
export const changeNights = (value) => {
  return {
    type: CHANGE_NIGHTS,
    payload: value,
  };
};

// state
const initialState = {
  dates: [null, null],
  title: "",
  head: "",
  flexRange: "normal",
  nights: 0,
};

//reducer
const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        ...state,
        dates: action.payload,
      };
    case CHANGE_TITLEDATE:
      return {
        ...state,
        title: action.payload,
      };
    case CHANGE_HEADDATE:
      return {
        ...state,
        head: action.payload,
      };
    case CHANGE_FLEXRANGE:
      return {
        ...state,
        flexRange: action.payload,
      };
    case CHANGE_NIGHTS:
      return {
        ...state,
        nights: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
