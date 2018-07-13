/* landing page view */

import React from "react";
import "./Header.css";

console.log("connected to header.js");

const Header = () => {
  return (
    <section className="hero is-info is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          {/* <figure className="image" id="logo-image">
            <img
              src="https://bulma.io/images/placeholders/256x256.png"
              alt="placeholder"
            />
          </figure> */}
          <h1 className="title">Founder Connect</h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
