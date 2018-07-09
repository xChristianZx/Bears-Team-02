import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { Router } from "react-router-dom";
import history from "./hoc/history"; // Allows us to programmatically redirect the user, on signIn for example.

ReactDOM.render(
  // <UserProvider>
    <Router history={history}>
      <App />
    </Router>,
  // </UserProvider>,
  document.getElementById("root")
);
registerServiceWorker();
