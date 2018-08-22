import React, { Component, Fragment } from "react";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Navigation from "./containers/Navigation/Navigation";
import SignUp from "./containers/User/SignUp/SignUp";

import Logout from "./containers/User/Logout/Logout";
import Login from "./containers/User/Login/Login";
import Dashboard from "./containers/User/Dashboard/Dashboard";
import Connect from "./containers/User/Connect/Connect";
import DeleteAccount from "./containers/User/DeleteAccount/DeleteAccount";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fragment>
          <Navigation />
          <div className="content-layout-wrapper">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/connect" component={Connect} />
              <Route path="/signup" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/delete" component={DeleteAccount} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </div>
    );
  }
}

export default App;
