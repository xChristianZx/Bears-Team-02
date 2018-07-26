import { combineReducers } from "redux";
import userReducer from "./User/userReducer";
import { reducer as form } from "redux-form";

/* Moved initial state inside of User; letting form handle it's own initial state for now */
// const initialState = {
//   authenticated: false
// };

const rootReducer = combineReducers({
  User: userReducer,
  form
});

export default rootReducer;
