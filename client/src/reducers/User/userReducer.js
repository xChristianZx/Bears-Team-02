import { SIGN_UP, LOG_IN, USER_DASHBOARD } from '../../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case SIGN_UP:
			return { ...state, authenticated: true, user: action.payload };
		case LOG_IN:
			return { ...state, authenticated: true, user: action.payload };
		case USER_DASHBOARD:
			return { ...state, user: action.payload }
		default:
			return state;
	}
}
