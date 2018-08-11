import { FLASH_MESSAGE, LOGGED_OUT } from "../actions/types";

const initialState = { flashMessage: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    case LOGGED_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
