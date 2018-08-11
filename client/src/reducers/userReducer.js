import {
  AUTHENTICATED,
  LOG_IN,
  LOGGED_OUT,
  SIGN_UP,
  USER_DASHBOARD,
  USER_UPDATE,
} from "../actions/types";

// User state shape and initial state
const initialState = {
  authenticated: false,
  connections: null,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, authenticated: true, user: action.payload.user };
    case LOG_IN:
      return { ...state, authenticated: true, user: action.payload.user };
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case USER_DASHBOARD:
      return {
        ...state,
        user: action.payload.user,
        connections: action.payload.user.connections
      };
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload.user
      };
    case LOGGED_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
