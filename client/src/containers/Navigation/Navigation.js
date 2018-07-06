import React, { Component } from "react";
import Links from "../../components/UI/Links";
import "./Navigation.css";
import { UserConsumer } from "../../Providers/UserProvider";

const linksIn = [
  { name: "LOGO", url: "/", class: "Logo" },
  { name: "Log Out", url: "/logout", class: "Item" },
  { name: "User", url: "/user", class: "Item" }
];
const linksOut = [
  { name: "LOGO", url: "/", class: "Logo" },
  { name: "Sign Up", url: "/signup", class: "Item" },
  { name: "Log In", url: "/login", class: "Item" }
];

// class Navigation extends Component {
//   render() {
//     return (
//       <nav className="Nav">
//         <UserConsumer>
//           {({ isLoggedIn }) =>
//             isLoggedIn ? <Links links={linksIn} /> : <Links links={linksOut} />
//           }
//         </UserConsumer>
//       </nav>
//     );
//   }
// }

const Navigation = () => {
  return (
    <nav className="Nav">
      <UserConsumer>
        {({ isLoggedIn }) =>
          isLoggedIn ? <Links links={linksIn} /> : <Links links={linksOut} />
        }
      </UserConsumer>
    </nav>
  );
};

export default Navigation;
