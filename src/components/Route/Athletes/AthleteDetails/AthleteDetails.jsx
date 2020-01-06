import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MDBIcon, MDBBtn } from "mdbreact";
import "./AthleteDetails.css";
import Workouts from "./Workouts";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

const goBackBtnStyles = {
  position: "fixed",
  bottom: "8px",
  right: "25%",
  fontSize: "1rem",
  borderRadius: "10%",
  backgroundColor: "#333333",
  border: "0.5px solid white",
  color: "white",
  zIndex: "1000"
};
const editPRBtnStyles = {
  border: "none",
  fontSize: "1rem",
  backgroundColor: "#00bf06",
  color: "white"
};

export default function AthleteDetails({ info, getAthletes }) {
  const [percentage, setPercentage] = useState(50);
  const { name, age, sex, email, photo, _id, personalBest } = info;
  const GoBack = withRouter(({ history }) => (
    <MDBBtn
      type="button"
      style={goBackBtnStyles}
      onClick={() => {
        history.push("/athletes");
      }}
    >
      <i className="fas fa-backward fa-lg"></i>
    </MDBBtn>
  ));
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("updatePr").focus();
      updateRecords(e);
    }
  };
  const updateRecords = e => {
    const athleteID = info._id;
    // first, target the scores for current id, and select all scores
    const elements = document
      .getElementById("scores-" + athleteID)
      .getElementsByClassName("scores-best form-control");
    const editBtn = document.getElementById("updatePr");
    if (e.target.id === "triggerEdit" || e.target.tagName === "INPUT") {
      // remove 'disabled' attribute
      e.target.autofocus = true;
      Object.keys(elements).map(key => (elements[key].disabled = false));
      Array.from(elements).map(
        element => (element.style.backgroundColor = "#00bf06")
      );
      Array.from(elements).map(element => {
        element.style.color = "#fff";
        return (element.style.fontWeight = "bold");
      });
      // change button text:
      editBtn.innerHTML = `<div> <i class="fas fa-save fa-lg"> </i> Save</div>`;
    } else {
      // initialize a new object
      const newScore = {};
      // add new scores to the newScore object
      Object.keys(elements).map(
        key =>
          (newScore[elements[key].name] = parseInt(elements[key].value) || 0)
        // remove 0 from numbers starting with 0 (ex: 0123) and if nothing entered, puts 0
      );

      const URI = athletesAPI + athleteID;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // ABSOLUTELY necessary to specify Content-Type!

      fetch(URI, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ personalBest: newScore })
      })
        .then(response => {
          return response.json();
        })
        .then(
          answer => {
            console.log("Answer is: " + answer);
          },
          error => console.log(error)
        )

        .then(getAthletes)
        .then(console.log(`Updated ${info.name}'s Personal Best!`)) // display message
        .then(
          setTimeout(() => console.log("hidding modal after 1.5sec"), 1500)
        ); // hide it afte one second

      // disable input fields
      Object.keys(elements).map(key => (elements[key].disabled = true));
      // change button text back to "Edit Records"
      editBtn.innerHTML = `<div>...</div>`;
    }
  };
  return (
    <Fragment>
      <GoBack />
      <Card
        key={_id}
        className="rounded-0 mb-5 text-light"
        style={{ backgroundColor: "#353535" }}
      >
        <div eventkey={_id}>
          <Card.Body className="text-center">
            <Card.Img
              as={Image}
              src={photo}
              style={{
                maxHeight: 250,
                objectFit: "contain",
                imageOrientation: "from-image"
              }}
            />
            <Card.Title as={"h3"} className="mt-3">
              {name}
            </Card.Title>
            <Card.Text>
              <small className="text-muted">{email}</small>
              <span style={{ display: "block" }}>
                {" "}
                Age: {age} | Sex: {sex}
              </span>
            </Card.Text>
            <h3 className="text-light mt-5 mb-1">
              <MDBIcon icon="dumbbell" /> Personal Best
            </h3>
            <div className="detailsContainer mb-3 mt-0">
              <ListGroup
                variant="flush"
                style={{ padding: "0.5rem 0", color: "black" }}
                id={"scores-" + _id}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}
                >
                  <div>
                    <Button
                      className="m-2"
                      onClick={updateRecords}
                      id="updatePr"
                      style={editPRBtnStyles}
                    >
                      <i className="fas fa-user-cog fa-lg" id="triggerEdit"></i>{" "}
                      Update
                    </Button>
                  </div>
                  <div className="font-weight-bold mb-2 text-light">
                    Percentage: {percentage} %
                  </div>
                </div>

                {Object.keys(personalBest).map((key, index) => (
                  <ListGroup.Item
                    as={Form}
                    key={index}
                    onClick={updateRecords}
                    onKeyPress={handleKeyPress}
                    style={{
                      backgroundColor: "#353539",
                      color: "white"
                    }}
                  >
                    <Row style={{ lineHeight: "30px" }}>
                      <Col className="p-0 w-25 ml-0">
                        <Form.Label>
                          <div style={{ textTransform: "capitalize" }}>
                            {key}
                          </div>
                        </Form.Label>
                      </Col>
                      <Col className="p-0 w-25 ml-4">
                        <Form.Control
                          disabled={true}
                          type="number"
                          className="scores-best text-center"
                          name={key}
                          defaultValue={personalBest[key]}
                        />
                      </Col>
                      <div className="ml-4">
                        <i className="far fa-arrow-alt-circle-right fa"></i>
                      </div>
                      <Col className="p-0 w-25">
                        <div>
                          {(parseInt(personalBest[key]) * percentage) / 100} kg
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="p-1 text-light mt-5">
                <div className="m-1 ml-2 font-weight-bold">100%</div>
                <input
                  style={{
                    width: "15px",
                    minHeight: "475px",
                    WebkitAppearance: "slider-vertical"
                  }}
                  type="range"
                  orient="vertical"
                  name="percentage"
                  id="percentageSlider"
                  min="1"
                  max="100"
                  step="1"
                  onChange={() =>
                    setPercentage(
                      document.getElementById("percentageSlider").value
                    )
                  }
                />
                <div className="m-1 font-weight-bold">0%</div>
              </div>
            </div>
            <div className="details-workouts mt-3">
              <h3 className="text-light">
                <MDBIcon icon="bolt" /> {name}'s Workouts
              </h3>
              <div className="addwod mt-5">
                <Workouts />
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
