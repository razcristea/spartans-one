import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./AthleteDetails.css";

const buttonText = ["Edit PR", "Save", "Saving..."];
const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default function AthleteDetails({ info, getAthletes }) {
  const [percentage, setPercentage] = useState(50);
  const { name, age, sex, email, photo, _id, personalBest } = info;
  const GoBack = withRouter(({ history }) => (
    <Button
      variant="secondary"
      type="button"
      className="m-1 p-2"
      onClick={() => {
        history.push("/athletes");
      }}
    >
      <i className="fas fa-backward fa-lg"></i> Back To Athletes
    </Button>
  ));

  const updateRecords = e => {
    const athleteID = info._id;
    // first, target the scores for current id, and select all scores
    const elements = document
      .getElementById("scores-" + athleteID)
      .getElementsByClassName("scores-best form-control");
    if (e.target.innerText.includes(buttonText[0])) {
      // remove 'disabled' attribute
      Object.keys(elements).map(key => (elements[key].disabled = false));
      Array.from(elements).map(
        element => (element.style.backgroundColor = "#dabd00")
      );
      Array.from(elements).map(element => (element.style.color = "#fff"));
      // change button text:
      e.target.innerHTML = `<div><i class="fas fa-save fa-lg"></i> ${buttonText[1]}</div>`;
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
      e.target.innerHTML = `<div><i class="fas fa-share-square fa-lg"></i> ${buttonText[2]}</div>`;
    }
  };
  return (
    <Fragment>
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
            <Card.Title as={"h3"}>{name}</Card.Title>
            <Card.Text>
              <small className="text-muted">{email}</small>
              <span style={{ display: "block" }}>
                {" "}
                Age: {age} | Sex: {sex}
              </span>
            </Card.Text>
            <ListGroup
              variant="flush"
              style={{ padding: "0.5rem 0", color: "black" }}
              id={"scores-" + _id}
            >
              <div className="p-1 percentage-dropdown text-light">
                <span className="mr-2">0%</span>
                <input
                  style={{ minWidth: "250px" }}
                  type="range"
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
                <span className="ml-2">100%</span>
              </div>
              <div className="font-weight-bold mb-2 text-light">
                Percentage: {percentage} %
              </div>
              {Object.keys(personalBest).map((key, index) => (
                <ListGroup.Item
                  as={Form}
                  key={index}
                  style={{
                    backgroundColor: "#353539",
                    color: "white"
                  }}
                >
                  <Row>
                    <Col>
                      <Form.Label>
                        <div style={{ textTransform: "capitalize" }}>{key}</div>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={true}
                        type="number"
                        className="scores-best text-center"
                        name={key}
                        defaultValue={personalBest[key]}
                      />
                    </Col>
                    <div className="ml-2">
                      <i className="far fa-arrow-alt-circle-right fa"></i>
                    </div>
                    <Col>
                      <div>
                        {(parseInt(personalBest[key]) * percentage) / 100} kg
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ButtonGroup size="sm" aria-label="Action Buttons">
              <Button variant="success" className="m-1" onClick={updateRecords}>
                <i className="fas fa-user-cog fa-lg"></i> Edit PR
              </Button>
              <GoBack />
            </ButtonGroup>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
