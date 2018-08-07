import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "react-router-dom";
import history from "./hoc/history"; // Allows us to programmatically redirect the user, on signIn for example.
import { Provider } from "react-redux";
import store from './store/store';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './hoc/flashMessageTemplate'
import { dashboard } from './actions/UserActions';
import { AUTHENTICATED, LOGGED_OUT } from "./actions/types";

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
