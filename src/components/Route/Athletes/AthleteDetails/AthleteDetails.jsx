import React, { Fragment, useState, useEffect, useRef } from "react";
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
import EditInfoModal from "./EditInfoModal";
import RangeTouch from "rangetouch";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

const goBackBtnStyles = {
  position: "fixed",
  bottom: "5px",
  right: "25%",
  border: "0.5px solid white",
  color: "white",
  zIndex: "1000"
};
export default function AthleteDetails({ info, getAthletes }) {
  const inputRef = useRef(null);
  useEffect(() => {
    new RangeTouch(inputRef.current);
  }, []);
  const [percentage, setPercentage] = useState(50);
  const [isEditing, setisEditing] = useState(false);
  const [editingPersonalBest, setEditingPersonalBest] = useState(false);
  const {
    name,
    age,
    sex,
    email,
    photo,
    _id,
    personalBest,
    phoneNumber,
    wods
  } = info;
  const GoBack = withRouter(({ history }) => (
    <MDBBtn
      size="sm"
      color="dark"
      style={goBackBtnStyles}
      onMouseDown={() => setTimeout(() => history.goBack(), 300)}
    >
      <i className="fas fa-backward"></i> <span> Back</span>
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
    if (
      e.target.id === "triggerEdit" ||
      e.target.innerHTML.includes("Modify") ||
      e.target.className.includes("prfield") ||
      e.target.tagName === "INPUT"
    ) {
      // remove 'disabled' attribute
      e.target.autofocus = true;
      Object.keys(elements).map(key => (elements[key].disabled = false));
      Array.from(elements).map(
        element => (element.style.backgroundColor = "#33b5e5")
      );
      Array.from(elements).map(element => (element.style.color = "#fff"));
      // change button text:
      setEditingPersonalBest(true);
      editBtn.innerHTML = `<div> <i class="fas fa-save fa-2x mr-1"> </i> Update</div>`;
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
        .then(console.log(`Updated ${info.name}'s Personal Best!`)); // display message

      // disable input fields
      Object.keys(elements).map(key => (elements[key].disabled = true));
      // change button text back to "Edit Records"
      // editBtn.innerText = `...`;     Nu uita: TREBUIE REPARAT AICI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setEditingPersonalBest(false);
    }
  };
  return (
    <Fragment>
      <GoBack />
      <EditInfoModal show={setisEditing} isShowing={isEditing} info={info} />
      <Card
        key={_id}
        className="rounded-0 mb-5 text-light"
        style={{ backgroundColor: "#353535" }}
      >
        <div eventkey={_id}>
          <Card.Body className="text-center">
            <div className="infoSection border">
              <img
                alt={name}
                as={Image}
                src={photo}
                className="thumbnail"
                style={{
                  maxWidth: 200,
                  objectFit: "contain",
                  imageOrientation: "from-image"
                }}
              />
              <div className="ml-2">
                <Card.Title as={"h3"} className="mt-3">
                  {name}
                </Card.Title>
                <Card.Text className="text-white">
                  <span className="p-1 d-block">
                    <i className="fas fa-phone-square fa-lg"></i>{" "}
                    {phoneNumber.substring(0, 4)}-{phoneNumber.substring(4, 7)}-
                    {phoneNumber.substring(7, 10)}
                  </span>
                  <small className="text-muted">{email}</small>
                  <span style={{ display: "block" }}>
                    {" "}
                    Age: {age} | Sex: {sex}
                  </span>
                </Card.Text>
                <MDBBtn
                  color="warning"
                  size="sm"
                  onClick={() => setisEditing(!isEditing)}
                >
                  <i className="fas fa-user-edit fa-lg mr-1"></i> Edit
                </MDBBtn>
              </div>
            </div>
            <h3 className="text-light mt-5 mb-3">
              <MDBIcon icon="dumbbell" /> Personal Best
            </h3>
            <div className="detailsContainer mb-3 mt-0">
              <ListGroup
                className="card bg-dark p-0 w-100"
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
                      variant={!editingPersonalBest ? "info" : "success"}
                      size="sm"
                    >
                      <i
                        className="fas fa-user-cog fa-2x mr-1"
                        id="triggerEdit"
                      ></i>{" "}
                      Modify
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
                      color: "white",
                      paddingLeft: "25px"
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
                      <Col className="p-0 w-25 ml-4 prfield">
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
                          {(parseInt(personalBest[key]) * percentage) / 100}
                          <small>kg</small>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="p-0 text-light mt-1 ml-3 card bg-info text-center">
                <div className="m-1 font-weight-bold">98%</div>
                <input
                  ref={inputRef}
                  className="mx-auto prSlider"
                  type="range"
                  name="percentage"
                  id="percentageSlider"
                  min="10"
                  max="98"
                  draggable
                  step="1"
                  onTouchEnd={() => (document.body.style.overflow = "unset")}
                  onChange={() => {
                    document.body.style.overflow = "hidden";
                    setPercentage(
                      document.getElementById("percentageSlider").value
                    );
                  }}
                />
                <div className="m-1 font-weight-bold">10%</div>
              </div>
            </div>
            <div className="details-workouts mt-5">
              <h3 className="text-light">
                <MDBIcon icon="bolt" /> {name}'s Workouts
              </h3>
              <div className="addwod mt-3">
                <Workouts wods={wods} id={_id} updateWods={getAthletes} />
              </div>
            </div>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
