import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calendarReducer from "./reducer/calendarReducer";
import peopleReducer from "./reducer/peopleReducer";
import headerReducer from "./reducer/headerReducer";
import filterReducer from "./reducer/filterReducer";
import reservationReducer from "./reducer/hostReservation.Reducer";

const rootReducer = combineReducers({
  calendarReducer,
  peopleReducer,
  headerReducer,
  filterReducer,
  reservationReducer,
});

const middleware = applyMiddleware(thunk);

export const store = legacy_createStore(rootReducer, middleware);
