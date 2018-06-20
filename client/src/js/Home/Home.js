/* landing page view */

import React from "react";
import "./Home.css";

console.log('connected to home.js');

const technicalFounder = () => {
  console.log('You selected technical');
};

const nonTechnicalFounder = () => {
  console.log('You selected nontechnical');
};

const Home = () => {
        return (
            <div id="main-section">
              <div id="user-role"> 
              <h1 id="create-profile"> Create your profile </h1>
                  <a onClick={technicalFounder} className="button is-dark is-large">I'm a technical founder</a>
                  <a onClick={nonTechnicalFounder} className="button is-dark is-large">I'm a non-technical founder</a>
                </div>
              <aside id="about">
               <div id="description">
                <p>
                  Founder Connect is a social networking site that connects technical and non-technical startup founders. 
                </p>
                <p>
                  Find your future partner by creating a Founder Connect profile today.
                </p>
                </div>
              </aside>
            </div>
      );
};
export default Home;
