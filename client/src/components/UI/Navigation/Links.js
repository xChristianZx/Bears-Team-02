import React from "react";
import { Link } from "react-router-dom";
import "./Links.css";

const Links = props => {
  const NavLink = props.links.map((link, i) => {
    const isActive = link.url === props.location ? "is-active" : "";

    if (link.name === "Dashboard") {
      return (
        <Link to={`${link.url}`} className={`${link.class} ${isActive}`} key={i}>
          {props.notifications < 1 ? (
            link.name
          ) : (
            <span className="badge is-badge-small" data-badge={props.notifications}>
              {link.name}
            </span>
          )}
        </Link>
      );
    }

    return (
      <Link to={`${link.url}`} className={`${link.class} ${isActive}`} key={i}>
        {link.name}
      </Link>
    );
  });

  return NavLink;
};

export default Links;
