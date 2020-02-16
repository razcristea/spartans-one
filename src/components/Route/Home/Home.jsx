import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import CoachProfile from "./CoachProfile/CoachProfile";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Home({ handleLogin, handleLogout, isLoggedIn }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.removeItem("access-token");
    const token = localStorage.getItem("access-token");
    handleLogout(token);
  };
  return (
    <div>
      <div className="headingStyle">
        <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
          Welcome to My|PT|Helper
        </h3>
      </div>
      <div className="text-center">
        {!isLoggedIn ? (
          <div>
            <h4 className="text-center p-3 m-5 text-white">
              Please click the button bellow to Login in order to start using
              the app!
            </h4>
            <MDBBtn color="success" onClick={() => setShowLogin(true)}>
              Login
            </MDBBtn>
          </div>
        ) : (
          <div>
            <CoachProfile />
            <MDBBtn color="danger" onClick={logout}>
              Logout
            </MDBBtn>
          </div>
        )}
      </div>
      <LoginModal
        showLogin={showLogin}
        toggle={setShowLogin}
        handleLogin={handleLogin}
        showRegister={setShowRegister}
      />
      <RegisterModal
        showRegister={showRegister}
        toggle={setShowRegister}
        handleLogin={handleLogin}
        showLogin={setShowLogin}
      />
    </div>
  );
}
