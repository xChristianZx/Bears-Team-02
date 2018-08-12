import { GET_MESSAGES, LOGGED_OUT, GET_CONVERSATIONS } from "../actions/types";

const initialState = {
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case LOGGED_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
