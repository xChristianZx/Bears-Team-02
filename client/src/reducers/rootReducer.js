import { combineReducers } from "redux";
import userReducer from "./userReducer";
import connectionReducer from './connectionReducer';
import messageReducer from './messageReducer';
import uiReducer from "./uiReducer";
import { reducer as form } from "redux-form";

const rootReducer = combineReducers({
  User: userReducer,
  Connection: connectionReducer,
  Message: messageReducer,
  UI: uiReducer,
  form
});

export default rootReducer;
