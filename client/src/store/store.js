import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import Async from '../middleware/async';
import rootReducer from '../reducers/rootReducer';
// import { createLogger } from 'redux-logger';  // * Commented for deploy

// Wrapper for Redux DevTools Extension for Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// * Commented for deploy
// Currently filtering reduxForm actions, comment out predicate line to disable
/* const reduxLogger = createLogger({
  predicate: (getState, action) => !action.type.includes("@@redux-form")
});  */

// * Commented for deploy
const storeMiddleware = composeEnhancers(
  applyMiddleware(Async, reduxThunk, /* reduxLogger */)
)(createStore);

const store = storeMiddleware(rootReducer);

export default store