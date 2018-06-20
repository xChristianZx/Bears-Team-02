import React, { Component } from "react";
import ReactDOM from "react-dom";
import Home from "./Home/Home.js";
import Header from "./Header/Header.js";
class App extends Component {
  render() {
    //return <div>Welcome to the world of React</div>;
    return (
      <div>
        <Header />
        <Home />

      </div>
      
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));

export default App;
