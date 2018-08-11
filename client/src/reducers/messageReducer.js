import { GET_MESSAGES } from '../actions/types'

const initialState = {
  authenticated: false,
  // connections: null,
  // pendingConnections: null,
  // pendingRequests: null,
  // flashMessage: null,
  // user: null,
  // users: null,
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state
  }
}

