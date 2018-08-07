import React from "react";
import { Link } from "react-router-dom";
import "./Links.css";

const Links = props => {
  const NavLink = props.links.map((link, i) => {
    // if(link.name === 'User') {
    //   console.log('props', props)
    //   link.name = props.user.username
    // }
    if(link.name === 'Notifications') {
      return (
        <Link to={`${link.url}`} className="Notification" key={i}>
          {props.pendingRequests}
        </Link>
      )
    }

    return (
      <Link to={`${link.url}`} className={link.class} key={i}>
        {link.name}
      </Link>
    );
  });

  return NavLink;
};

export default Links;
