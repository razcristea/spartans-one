import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const links = [
  { path: "Home", route: "/" },
  { path: "Athletes", route: "/athletes" },
  { path: "Wods", route: "/wods" },
  { path: "Search", route: "/find" }
];

const activeStyle = {
  fontWeight: "bold"
};
export default class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          My|PT|Helper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link, i) => (
              <NavLink
                key={i}
                exact
                to={`${link.route}`}
                className="m-2 white text-light text-decoration-none"
                activeClassName="selected"
                activeStyle={activeStyle}
              >
                {link.path}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
