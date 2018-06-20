import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./Home/Home.js";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
      
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));

