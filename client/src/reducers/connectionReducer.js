import { GET_CONNECTIONS, GET_USERS } from '../actions/types'

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
    case GET_CONNECTIONS:
      return {
		...state,
        pendingConnections: action.payload.connectionRequests,
        pendingRequests: action.payload.pendingRequests
      };
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state
  }
}