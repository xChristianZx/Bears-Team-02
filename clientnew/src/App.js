import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
// import Connections from "./components/Connections/Connections";
import Footer from "./components/Footer/Footer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
        {/* <Connections /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
