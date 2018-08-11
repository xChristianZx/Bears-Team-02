import { GET_MESSAGES, LOGGED_OUT } from "../actions/types";

const initialState = {
  authenticated: false,
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case LOGGED_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
