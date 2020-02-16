import React from "react";
import { useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from "mdbreact";

const registerURL = "http://localhost:3000/users/register";

export default function Login({
  showRegister,
  toggle,
  handleLogin,
  showLogin
}) {
  const history = useHistory();
  const registerNewUser = () => {
    localStorage.setItem("access-token", "ceva");
    const token = localStorage.getItem("access-token");
    handleLogin(token);
    history.push("/schedule");
  };
  return (
    <MDBModal isOpen={showRegister} toggle={() => toggle(false)} centered>
      <MDBModalHeader className="border bg-dark text-white modalHeader">
        <i className="fas fa-user-plus mr-2"></i>{" "}
        <span style={{ fontWeight: "500" }}>Register</span>
      </MDBModalHeader>
      <MDBModalBody
        className="text-center border"
        style={{ backgroundColor: "#383838", overflow: "auto" }}
      >
        <div className="m-5">
          <MDBInput
            type="text"
            name="firstName"
            label="First Name"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
          ></MDBInput>
          <MDBInput
            type="text"
            name="lastName"
            label="Last Name"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
          ></MDBInput>
          <MDBInput
            type="email"
            name="email"
            label="Email"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
          ></MDBInput>
          <MDBInput
            type="password"
            name="password"
            label="Password"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
          ></MDBInput>
        </div>
        <p className="text-white">Already have an account?</p>
        <MDBBtn
          size="sm"
          color="warning"
          onClick={() => {
            toggle(false);
            showLogin(true);
          }}
        >
          Login
        </MDBBtn>
      </MDBModalBody>
      <MDBModalFooter className="bg-dark border d-flex justify-content-around modalFooter">
        <MDBBtn color="danger" size="sm" onClick={() => toggle(false)}>
          <i className="fas fa-ban mr-1"></i> Cancel
        </MDBBtn>
        <MDBBtn color="success" size="sm" onClick={registerNewUser}>
          <i className="fas fa-share-square mr-1"></i> Submit
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}
