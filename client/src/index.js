import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router } from "react-router-dom";
import history from "./hoc/history"; // Allows us to programmatically redirect the user, on signIn for example.

import { UserProvider } from "./Providers/UserProvider";

ReactDOM.render(
  // <UserProvider>
    <Router history={history}>
      <App />
    </Router>,
  // </UserProvider>,
  document.getElementById("root")
);
registerServiceWorker();
