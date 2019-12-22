import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./theboxlogo.png";

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
export default function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      expanded={expanded}
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
    >
      <Navbar.Brand>
        <NavLink
          to="/"
          className="text-decoration-none text-light font-weight-bold"
        >
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          My|PT|Helper
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />
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
              onClick={() => setTimeout(() => setExpanded(false), 100)}
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
