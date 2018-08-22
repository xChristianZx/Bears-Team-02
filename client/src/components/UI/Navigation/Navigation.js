import React from "react";
import Links from "./Links";
import classNames from "classnames";
import { Link } from "react-router-dom";

const NavigationComp = ({
  authenticated,
  handleBurgerClick,
  linksIn,
  linksOut,
  location,
  notifications,
  toggleBurger
}) => {
  let navBurger = classNames("navbar-burger", {
    "is-active": toggleBurger
  });
  let navMenu = classNames("navbar-menu", {
    "is-active": toggleBurger
  });

  /* Style overrides for home page */
  const navbarWrapper = location.pathname !== "/" ? "is-info" : "is-transparent";
  const navbarWrapperStyle =
    location.pathname === "/"
      ? { backgroundColor: "transparent", position: "absolute", width: "100%" }
      : null;

  return (
    <nav className={`navbar is-spaced ${navbarWrapper}`} style={navbarWrapperStyle}>
      <div className="container">
        <div className="navbar-brand">
          {location.pathname === "/" ? null : (
            <Link to="/" className="navbar-item">
              <h2 className="subtitle is-5 has-text-white">Founder Connect</h2>
            </Link>
          )}
          <a
            role="button"
            className={navBurger}
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
            onClick={handleBurgerClick}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navMenu" className={navMenu}>
          <div className="navbar-end">
            {authenticated ? (
              <Links links={linksIn} notifications={notifications} location={location.pathname} />
            ) : (
              <Links links={linksOut} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationComp;
