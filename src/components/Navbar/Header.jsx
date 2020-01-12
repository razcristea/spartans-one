import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logoV2.png";

const links = [
  { path: "Home", route: "/", icon: "fas fa-home" },
  { path: "Athletes", route: "/athletes", icon: "fas fa-users" },
  { path: "Wods", route: "/wods", icon: "fas fa-dumbbell" }
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
        <div
          className="text-light font-weight-bold"
          style={{ lineHeight: "45px" }}
        >
          <img
            alt=""
            src={Logo}
            height="45"
            className="d-inline-block align-top"
          />{" "}
          My|PT|Helper
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onMouseDown={() => setExpanded(expanded ? false : true)}
        onBlur={() => setTimeout(() => setExpanded(false), 300)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {links.map((link, i) => (
            <NavLink
              onClick={() => setExpanded(false)}
              key={i}
              exact
              to={`${link.route}`}
              className="m-2 text-decoration-none text-center"
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
