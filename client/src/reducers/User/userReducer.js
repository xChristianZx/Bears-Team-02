import { SIGN_UP, LOG_IN, USER_DASHBOARD, LOGGED_OUT, AUTHENTICATED, ERROR, GET_USERS, FLASH_MESSAGE, GET_CONNECTIONS } from '../../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case SIGN_UP:
			return { ...state, authenticated: true };
		case LOG_IN:
			return { ...state, authenticated: true };
		case AUTHENTICATED:
				return { ...state, authenticated: true };
		case ERROR:
			return { ...state, error: action.payload };
		case USER_DASHBOARD:
			return { ...state, user: action.payload.user, connections: ["adasd"] };
		case LOGGED_OUT:
			return { ...state, authenticated: false };
		case GET_USERS: 
			return { ...state, users: action.payload };
		case FLASH_MESSAGE: 
			return { ...state, flashMessage: action.payload };
		case GET_CONNECTIONS:
			return { ...state, pendingConnections: action.payload }
		default:
			return state;
	}
}
