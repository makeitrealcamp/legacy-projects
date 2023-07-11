export const FLIP = 'FLIP';
export const FLIPMENU = 'FLIPMENU';
export const FALSE = 'FALSE';
export const LOCATE = 'LOCATE';
export const COORDINATES = 'COORDINATES';
//action creator
export const flip = () => {
  return {
    type: FLIP,
    payload:
      initialState.headerPopover === ''
        ? (initialState.headerPopover = 'something')
        : (initialState.headerPopover = ''),
  };
};
export const flipMenu = (value) => {
  return {
    type: FLIPMENU,
    payload: (initialState.menuPopover = value),
  };
};
export const locate = (value) => {
  return {
    type: LOCATE,
    payload: (initialState.location = value),
  };
};
export const coordinates = (value) => {
  console.log(value);
  return {
    type: COORDINATES,
    payload: (initialState.coordinates = value),
  };
};
// state
const initialState = {
  headerPopover: '',
  menuPopover: '',
  location: '',
  coordinates: [],
};

//reducer
const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIP:
      return {
        ...state,
        headerPopover: action.payload,
      };
    case FLIPMENU:
      return {
        ...state,
        menuPopover: action.payload,
      };
    case LOCATE:
      return {
        ...state,
        location: action.payload,
      };
    case COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
      };
    default:
      return state;
  }
};

export default headerReducer;
