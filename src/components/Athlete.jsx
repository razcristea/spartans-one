import React, { Component, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

const buttonText = ["Edit Records", "Update Records"];

export default class Athlete extends Component {
  deleteAthlete = event => {
    const athleteID = event.target.id;
    console.log(athleteID);
    fetch(athletesAPI + athleteID, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(
        answer => {
          console.log(answer);
        },
        error => console.log(error)
      );

    // re-render here !!!
  };

  updateRecords = e => {
    // first, target the scores for current id, and select all scores
    const elements = document
      .getElementById("scores-" + this.props.info._id)
      .getElementsByClassName("scores-best form-control");
    if (e.target.innerText === buttonText[0]) {
      // remove 'disabled' attribute
      Object.keys(elements).map(key => (elements[key].disabled = false));

      // change button text:
      e.target.innerText = buttonText[1];
    } else {
      // initialize a new object
      const newScore = {};
      // add new scores to the newScore object
      Object.keys(elements).map(
        key =>
          (newScore[elements[key].name] = parseInt(elements[key].value) || 0)
        // remove 0 from numbers starting with 0 (ex: 0123) and if nothing entered, puts 0
      );

      const URI = athletesAPI + this.props.info._id;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // ABSOLUTELY necessary to specify Content-Type!

      fetch(URI, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ personalBest: newScore })
      }).then(
        response => {
          console.log(response.json());
        },
        error => {
          console.log(error);
        }
      );

      // disable input fields
      Object.keys(elements).map(key => (elements[key].disabled = true));
      // change button text back to "Edit Records"
      e.target.innerText = buttonText[0];
    }
  };

  render() {
    const { name, age, sex, email, photo, _id, personalBest } = this.props.info;

    return (
      <Fragment>
        <Card key={_id} className="rounded-0">
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={_id}>
            <span style={{ fontSize: "1.5rem" }}>{name}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body>
              <Card.Img
                as={Image}
                src={photo}
                style={{ maxHeight: 300, objectFit: "contain" }}
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
                <Button variant="success" onClick={this.updateRecords}>
                  {buttonText[0]}
                </Button>
                <Button variant="warning">Edit Athlete</Button>
                <Button variant="danger" onClick={this.deleteAthlete} id={_id}>
                  Detele Athlete
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}
