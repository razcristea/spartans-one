import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logoV2.png";

export default function Header({ isLoggedIn }) {
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
        <div className="text-white" style={{ lineHeight: "45px" }}>
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
          {isLoggedIn ? (
            links.map((link, i) => (
              <NavLink
                onClick={() => setExpanded(false)}
                key={i}
                exact
                to={`${link.route}`}
                className="m-1 mr-3 p-1 text-decoration-none text-center"
                activeClassName="selected"
                activeStyle={activeStyle}
                style={{
                  boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121",
                  color: "white"
                }}
              >
                <i className={link.icon}></i>
                <span> </span>
                {link.path}
              </NavLink>
            ))
          ) : (
            <NavLink
              onClick={() => setExpanded(false)}
              to="/"
              exact
              className="m-1 mr-3 p-1 text-decoration-none text-center"
              activeClassName="selected"
              activeStyle={activeStyle}
              style={{
                boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121",
                color: "white"
              }}
            >
              <i className="far fa-id-card mr-1"></i>
              <span> </span>
              {isLoggedIn ? "Profile/Logout" : "Login/Register"}
            </NavLink>
          )}
          {}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

const links = [
  { path: "Profile", route: "/", icon: "far fa-id-card mr-1" },
  { path: "Schedule", route: "/schedule", icon: "fas fa-clipboard-list mr-1" },
  { path: "Athletes", route: "/athletes", icon: "fas fa-users mr-1" },
  { path: "Workouts", route: "/wods", icon: "fas fa-dumbbell mr-1" },
  { path: "Notes", route: "/notes", icon: "far fa-comment-dots mr-1" }
];

const activeStyle = {
  fontWeight: "bold",
  color: "#f5ec47"
};
