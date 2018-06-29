import React, { Component } from "react";
import "./App.css";
import Connections from "./components/Connections/Connections";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <Route path="/connect" component={Connections} />
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
