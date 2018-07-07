import React, { Component } from "react";
import "./App.css";
import Connections from "./components/Connections/Connections";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Navigation from "./containers/Navigation/Navigation";
import SignUp from "./containers/SignUp/SignUp";

import { UserProvider } from "./Providers/UserProvider";
import Logout from "./components/User/Logout";
import Login from "./containers/User/Login/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserProvider>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/connect" component={Connections} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/login" component={Login} />
          </Switch>

          <Footer />
        </UserProvider>
      </div>
    );
  }
}

export default App;
