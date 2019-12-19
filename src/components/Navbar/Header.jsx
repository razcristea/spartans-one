import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const links = [
  { path: "Home", route: "/", icon: "fas fa-home" },
  { path: "Athletes", route: "/athletes", icon: "fas fa-users" },
  { path: "Wods", route: "/wods", icon: "fas fa-dumbbell" },
  { path: "Search", route: "/find", icon: "fas fa-search" }
];

const activeStyle = {
  fontWeight: "bold",
  color: "#f5ec47"
};
export default class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand>
          <NavLink to="/" className="text-decoration-none text-light">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            My|PT|Helper
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link, i) => (
              <NavLink
                key={i}
                exact
                to={`${link.route}`}
                className="m-2 text-decoration-none"
                activeClassName="selected"
                activeStyle={activeStyle}
                style={{ color: "white" }}
              >
                <i className={link.icon}></i>
                <span> </span>
                {link.path}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
