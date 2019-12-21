import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";
// const athletesAPIDEV = "http://localhost:3000/athletes/";

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
          console.log("Answer is: " + answer);
          // display a popup with the response from server
          this.props.displayMessage(answer);
          // hide it after 1.5 seconds
          setTimeout(this.props.displayMessage, 1500);
        },
        error => console.log(error)
      )
      .then(this.props.getAthletes); // re-fetch from API
  };

  render() {
    const { name, age, sex, email, photo, _id } = this.props.info;
    return (
      <Fragment>
        <Card key={_id} className="rounded-0">
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={_id}>
            <span style={{ fontSize: "1.5rem" }}>
              {sex === "M" ? (
                <i className="fas fa-mars fa-lg"></i>
              ) : (
                <i className="fas fa-venus fa-lg"></i>
              )}{" "}
              {name}
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body className="text-center">
              <Card.Img
                as={Image}
                src={photo}
                style={{
                  maxHeight: 300,
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
              <ButtonGroup size="sm" aria-label="Action Buttons">
                <Button variant="secondary" className="m-1">
                  <i className="fas fa-user-edit fa-lg"></i> Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={this.deleteAthlete}
                  id={_id}
                  className="m-1"
                >
                  <i className="fas fa-user-slash fa-lg"></i> Delete
                </Button>
                <NavLink to={`/athletes/${_id}`}>
                  <Button variant="primary" className="m-1">
                    <i className="fas fa-dumbbell fa-lg"></i> PR's
                  </Button>
                </NavLink>
              </ButtonGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}