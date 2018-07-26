import React, { Component } from "react";
import "./Navigation.css";
import { connect } from "react-redux";
import NavigationComp from "../../components/UI/Navigation/Navigation";

const linksIn = [
  { name: "Connections", url: "/connect", class: "navbar-item" },
  { name: "Dashboard", url: "/dashboard", class: "navbar-item" },
  { name: "Log Out", url: "/logout", class: "navbar-item" }
];
const linksOut = [
  { name: "Sign Up", url: "/signup", class: "navbar-item" },
  { name: "Log In", url: "/login", class: "navbar-item" }
];

class Navigation extends Component {
  state = { toggleBurger: false };

  componentDidMount() {
    console.log("CWD Navigation", this.props);
  }

  handleBurgerClick = () => {
    this.setState(prevState => ({ toggleBurger: !prevState.toggleBurger }));
  };

  render() {
    return (
      <NavigationComp
        handleBurgerClick={this.handleBurgerClick}
        toggleBurger={this.state.toggleBurger}
        authenticated={this.props.authenticated}
        linksIn={linksIn}
        linksOut={linksOut}
      />
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.User.authenticated };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: true }
)(Navigation);

/* Saving for now - Handler for navBar Burger */
// document.addEventListener("DOMContentLoaded", () => {
//   // Get all "navbar-burger" elements
//   const $navbarBurgers = Array.prototype.slice.call(
//     document.querySelectorAll(".navbar-burger"),
//     0
//   );

//   // Check if there are any navbar burgers
//   if ($navbarBurgers.length > 0) {
//     // Add a click event on each of them
//     $navbarBurgers.forEach(el => {
//       el.addEventListener("click", () => {
//         // Get the target from the "data-target" attribute
//         const target = el.dataset.target;
//         const $target = document.getElementById(target);

//         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//         el.classList.toggle("is-active");
//         $target.classList.toggle("is-active");
//       });
//     });
//   }
// });
