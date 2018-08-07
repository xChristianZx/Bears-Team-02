import { combineReducers } from "redux";
import userReducer from "./userReducer";
import connectionReducer from './connectionReducer';
import messageReducer from './messageReducer';
import { reducer as form } from "redux-form";

/* Moved initial state inside of User; letting form handle it's own initial state for now */

const rootReducer = combineReducers({
  User: userReducer,
  Connection: connectionReducer,
  Message: messageReducer,
  form
});

export default rootReducer;
