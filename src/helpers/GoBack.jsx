import React from "react";
import { withRouter } from "react-router-dom";
import { MDBBtn } from "mdbreact";

const GoBack = withRouter(({ history }) => (
  <MDBBtn
    size="sm"
    color="dark"
    style={goBackBtnStyles}
    onMouseDown={() => setTimeout(() => history.goBack(), 300)}
  >
    <span>Go Back</span>
  </MDBBtn>
));

export default GoBack;

const goBackBtnStyles = {
  position: "fixed",
  bottom: "5px",
  right: "25%",
  border: "0.5px solid white",
  color: "white",
  zIndex: "1000"
};
