import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "./logoV2.png";
import Vali from "./vali.jpeg";

const links = [
  { path: "Schedule", route: "/", icon: "fas fa-clipboard-list mr-1" },
  { path: "Athletes", route: "/athletes", icon: "fas fa-users mr-1" },
  { path: "Wods", route: "/wods", icon: "fas fa-dumbbell mr-1" }
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
          className="text-white font-weight-bold"
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
        <div
          className="text-white h-50 border text-center d-flex align-items-center justify-content-center"
          style={{
            position: "absolute",
            width: "170px",
            left: "30px",
            bottom: "30px",
            borderRadius: "2%",
            backgroundColor: "white",
            backgroundImage: `url("${Vali}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        ></div>
        <Nav className="ml-auto">
          {links.map((link, i) => (
            <NavLink
              onClick={() => setExpanded(false)}
              key={i}
              exact
              to={`${link.route}`}
              className="m-1 mr-3 p-2 text-decoration-none text-right"
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
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
