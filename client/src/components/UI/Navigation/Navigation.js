import React from 'react'
import Links from './Links'
import classNames from "classnames";
import { Link } from 'react-router-dom'

const NavigationComp = ({ handleBurgerClick, toggleBurger, authenticated, linksIn, linksOut }) => {
  let navBurger = classNames("navbar-burger", {
    "is-active": toggleBurger
  });
  let navMenu = classNames("navbar-menu", {
    "is-active": toggleBurger
  });
  return (
    <nav className="navbar is-info is-spaced">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            FC
          </Link>
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
              <Links links={linksIn} />
            ) : (
              <Links links={linksOut} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationComp