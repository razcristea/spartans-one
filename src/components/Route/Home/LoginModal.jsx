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

const loginURL = "https://mypthelperapi.herokuapp.com/users/login";
// const loginURL = "http://localhost:3000/users/login";
export default function Login({
  showLogin,
  toggle,
  handleLogin,
  showRegister,
  changeCount
}) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginToAPI = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email & Password are required!");
      }
      const loginData = { email, password };
      const response = await fetch(loginURL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(loginData)
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
      changeCount();
      history.push("/schedule");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <MDBModal isOpen={showLogin} toggle={() => toggle(false)} centered>
      <MDBModalHeader className="border bg-dark text-white modalHeader">
        <i className="fas fa-sign-in-alt mr-2"></i>{" "}
        <span style={{ fontWeight: "500" }}>Login</span>
      </MDBModalHeader>
      <MDBModalBody
        className="text-center border"
        style={{ backgroundColor: "#383838", overflow: "auto" }}
      >
        <div className="mt-5 mx-5 mb-3">
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
        <p className="text-white mb-1">No account yet?</p>
        <MDBBtn
          size="sm"
          color="white"
          className="text-dark"
          onClick={() => {
            toggle(false);
            setErrorMessage("");
            showRegister(true);
          }}
        >
          Register
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
        <MDBBtn color="success" size="sm" onClick={loginToAPI}>
          <i className="fas fa-share-square mr-1"></i> Submit
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}
