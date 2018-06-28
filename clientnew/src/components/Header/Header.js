/* landing page view */

import React from "react";
import "./Header.css";

console.log("connected to header.js");

const Header = () => {
  return (
    <div className="container-fluid">
      <figure className="image" id="logo-image">
        <img src="https://bulma.io/images/placeholders/256x256.png" />
      </figure>
      <h1 id="site-title">Founder Connect</h1>
      <div id="log-in">
        <h2>Already a member?</h2>
        <input id="username" type="text" placeholder="Enter username" />
        <input id="password" type="text" placeholder="Enter password" />
        <h2>
          <button className="button is-outlined is-large">Log In</button>
        </h2>
      </div>
    </div>
  );
};

export default Header;
