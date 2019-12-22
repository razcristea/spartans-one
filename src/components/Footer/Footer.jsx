import React, { Component } from "react";

const footerStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  background: "#343a40",
  color: "#fff",
  fontSize: "0.9rem",
  fontWeight: "bold",
  padding: ".75rem 1.175rem",
  zIndex: "100",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
};

export default class Footer extends Component {
  render() {
    return (
      <footer style={footerStyle}>
        <div>Welcome, Coach Valy!</div>
        <div>You are coaching: </div>
        <div className="text-center">
          <div>
            <i className="fas fa-users fa-lg"></i> 12
          </div>
          <div>
            5 <i className="fas fa-mars fa-lg"></i> | 7{" "}
            <i className="fas fa-venus fa-lg"></i>
          </div>
        </div>
      </footer>
    );
  }
}
