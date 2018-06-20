/* landing page view */

import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./Header.css";

console.log('connected to home.js');

const technicalFounder = () => {
  console.log('You selected technical');
};

const nonTechnicalFounder = () => {
  console.log('You selected nontechnical');
};

const Header = () => {
        return (
            <div>
            <div className="flexbox-container">
            <figure className="image" id="logo-image">
              <img src="https://bulma.io/images/placeholders/256x256.png" />
            </figure>
              <h1 id="site-title">Founder Connect</h1>
              <div className="container" id="log-in">
                <h2>Already a member?</h2>
                <input id="username" type="text" placeholder="Enter username" />
                <input id="password" type="text" placeholder="Enter password" />
                <h2><button className="button is-outlined is-large">Log In</button></h2>
              </div>
            </div>
            </div>
        );
    }

export default Header;