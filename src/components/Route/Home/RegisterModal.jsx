import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput
} from "mdbreact";

const registerURL = "https://mypthelperapi.herokuapp.com/users/register";

export default function Login({
  showRegister,
  toggle,
  handleLogin,
  showLogin
}) {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerNewUser = async () => {
    try {
      if (!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required!");
      }

      const registerData = { firstName, lastName, email, password };

      const response = await fetch(registerURL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(registerData)
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("access-token", data.accessToken);
      localStorage.setItem("userName", data.name);

      const token = localStorage.getItem("access-token");
      const userName = localStorage.getItem("userName");

      handleLogin(token, userName);

      history.push("/schedule");
    } catch (error) {
      setErrorMessage(error.message);
    }
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
            onChange={e => {
              setFirstName(e.target.value);
              setErrorMessage("");
            }}
          ></MDBInput>
          <MDBInput
            type="text"
            name="lastName"
            label="Last Name"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
            onChange={e => {
              setLastName(e.target.value);
              setErrorMessage("");
            }}
          ></MDBInput>
          <MDBInput
            type="email"
            name="email"
            label="Email"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
            onChange={e => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
          ></MDBInput>
          <MDBInput
            type="password"
            name="password"
            label="Password"
            labelClass="labelClass"
            className="mx-auto appointmentInput"
            onChange={e => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          ></MDBInput>
        </div>
        {errorMessage ? (
          <p className="text-danger mt-0 mb-2 w-50 mx-auto">{errorMessage}</p>
        ) : null}
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
        <MDBBtn
          color="danger"
          size="sm"
          onClick={() => {
            toggle(false);
            setErrorMessage("");
          }}
        >
          <i className="fas fa-ban mr-1"></i> Cancel
        </MDBBtn>
        <MDBBtn color="success" size="sm" onClick={registerNewUser}>
          <i className="fas fa-share-square mr-1"></i> Submit
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}
