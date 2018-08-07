import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Router
import { Router } from "react-router-dom";
import history from "./hoc/history"; // Allows us to programmatically redirect the user, on signIn for example.

// Flash Messages
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './hoc/flashMessageTemplate'

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import Async from "./middleware/async";
import rootReducer from "./reducers/rootReducer";
import { createLogger } from "redux-logger";
import { dashboard } from './actions/UserActions';

import { AUTHENTICATED, LOGGED_OUT } from "./actions/types";

// Wrapper for Redux DevTools Extension for Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Currently filtering reduxForm actions, comment out predicate line to disable
const reduxLogger = createLogger({
  // predicate: (getState, action) => !action.type.includes("@@redux-form")
});

// Create Store - Note: reduxLogger needs to be the last middleware in chain
const storeMiddleware = composeEnhancers(
  applyMiddleware(Async, reduxThunk, reduxLogger)
)(createStore);
const store = storeMiddleware(rootReducer);

// Load JWT if exists
const token = localStorage.getItem("token");
if (token) {
  dashboard();
  store.dispatch({ type: AUTHENTICATED });
} else {
  store.dispatch({ type: LOGGED_OUT });
}

// Flash Messages Options
const options = {
  position: 'top center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AlertProvider template={AlertTemplate} { ...options }>
        <App />
      </AlertProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
