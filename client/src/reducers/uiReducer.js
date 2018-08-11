import { FLASH_MESSAGE } from "../actions/types";

const initialState = { flashMessage: null };

export default function(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, flashMessage: action.payload };
    default:
      return state;
  }
}
