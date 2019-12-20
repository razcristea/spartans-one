import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";
// const athletesAPIDEV = "http://localhost:3000/athletes/";

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

  updateRecords = e => {
    const athleteID = this.props.info._id;
    // first, target the scores for current id, and select all scores
    const elements = document
      .getElementById("scores-" + athleteID)
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

      const URI = athletesAPI + athleteID;
      console.log(URI);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      // ABSOLUTELY necessary to specify Content-Type!

      fetch(URI, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ personalBest: newScore })
      })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(
          answer => {
            console.log("Answer is: " + answer);
          },
          error => console.log(error)
        )

        .then(this.props.getAthletes)
        .then(
          this.props.displayMessage(
            `Updated ${this.props.info.name}'s Personal Best!`
          )
        ) // display message
        .then(setTimeout(this.props.displayMessage, 1500)); // hide it afte one second

      // disable input fields
      Object.keys(elements).map(key => (elements[key].disabled = true));
      // change button text back to "Edit Records"
      e.target.innerText = buttonText[0];
    }
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
                <Button
                  variant="success"
                  onClick={this.updateRecords}
                  className="m-1"
                >
                  <i className="fas fa-user-cog"></i> {buttonText[0]}
                </Button>
                <Button variant="secondary" className="m-1">
                  <i className="fas fa-user-edit"></i> Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={this.deleteAthlete}
                  id={_id}
                  className="m-1"
                >
                  <i className="fas fa-user-slash"></i> Detele
                </Button>
                <NavLink to={`/athletes/${_id}`}>
                  <Button variant="primary" className="m-1">
                    <i className="fas fa-dumbbell"></i> PR's
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
