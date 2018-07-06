import React from "react";
import Aux from "../../hoc/aux";
import { Link } from "react-router-dom";
import "./Links.css";

const Links = props => {
  const NavLink = props.links.map((link, i) => {
    return (
      <Link to={`${link.url}`} className={link.class} key={i}>
        {link.name}
      </Link>
    );
  });

  return NavLink;
};

export default Links;
