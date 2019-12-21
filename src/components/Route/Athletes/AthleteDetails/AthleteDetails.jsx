import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const buttonText = ["Edit", "Save", "Saving..."];
const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default function AthleteDetails({ info, getAthletes }) {
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
      <i className="fas fa-backward fa-lg"></i> Back
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
      <Card key={_id} className="rounded-0 mb-5">
        <div eventkey={_id}>
          <Card.Body className="text-center">
            <Card.Img
              as={Image}
              src={photo}
              style={{
                maxHeight: 150,
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
              style={{ padding: "1rem 0" }}
              id={"scores-" + _id}
            >
              {Object.keys(personalBest).map((key, index) => (
                <ListGroup.Item as={Form} key={index}>
                  <Row>
                    <Col>
                      <Form.Label>
                        <span style={{ textTransform: "capitalize" }}>
                          {key}
                        </span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={true}
                        type="number"
                        className="scores-best"
                        name={key}
                        defaultValue={personalBest[key]}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <ButtonGroup size="sm" aria-label="Action Buttons">
              <Button variant="success" className="m-1" onClick={updateRecords}>
                <i className="fas fa-user-cog fa-lg"></i> Edit
              </Button>
              <GoBack />
            </ButtonGroup>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
