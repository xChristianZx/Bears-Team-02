import {
  SIGN_UP,
  LOG_IN,
  USER_DASHBOARD,
  LOGGED_OUT,
  AUTHENTICATED,
  GET_USERS,
  FLASH_MESSAGE,
  GET_CONNECTIONS,
  GET_MESSAGES
} from "../../actions/types";

// User state shape and initial state
const initialState = {
  authenticated: false,
  connections: null,
  pendingConnections: null,
  pendingRequests: null,
  flashMessage: null,
  user: null,
  users: null,
  messages: null
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
    case LOGGED_OUT:
      return { ...state, ...initialState };
    case GET_USERS:
      return { ...state, users: action.payload };
    case FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    case GET_CONNECTIONS:
      return {
		...state,
        pendingConnections: action.payload.connectionRequests,
        pendingRequests: action.payload.pendingRequests
      };
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}
