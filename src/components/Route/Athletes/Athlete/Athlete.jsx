import React, { PureComponent, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { MDBBtn } from "mdbreact";
import "./Athlete.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";
// const athletesAPIDEV = "http://localhost:3000/athletes/";

export default class Athlete extends PureComponent {
  render() {
    const { isSelected } = this.props;
    const { name, age, sex, email, photo, _id, phoneNumber } = this.props.info;
    return (
      <Fragment>
        <Card
          key={_id}
          className="rounded-0 text-white"
          style={{ backgroundColor: "#3333339c" }}
        >
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="p-0 athleteheader"
            eventKey={_id}
            style={{
              backgroundColor: isSelected !== _id ? "#1c1c1cbd" : "#fff",
              color: isSelected !== _id ? "white" : "black"
            }}
          >
            <span style={{ fontSize: "1.3rem" }}>
              <img className="m-2 imageIcon" src={photo} alt="athlete" /> {name}
            </span>
            {sex === "M" ? (
              <div className="m-2">
                <i className="fas fa-mars fa-2x"></i>
              </div>
            ) : (
              <div className="m-2">
                <i className="fas fa-venus fa-2x"></i>
              </div>
            )}{" "}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body
              className="text-center m-2 ml-4 mr-4 border"
              style={{ backgroundColor: "#333333" }}
            >
              <Card.Img
                className="p-0"
                as={Image}
                src={photo}
                style={{
                  maxHeight: 300,
                  objectFit: "contain",
                  imageOrientation: "from-image"
                }}
              />
              <Card.Title as={"h3"} className="pt-2">
                {name}
              </Card.Title>
              <Card.Text className="text-white">
                <span className="p-1 d-block">
                  <i className="fas fa-phone-square fa-lg"></i>{" "}
                  {phoneNumber.substring(0, 4)}-{phoneNumber.substring(4, 7)}-
                  {phoneNumber.substring(7, 10)}
                </span>
                <small className="text-muted">
                  <i className="fas fa-envelope fa-lg"></i> {email}
                </small>
                <span style={{ display: "block" }}>
                  {" "}
                  Age: {age} | Sex: {sex}
                </span>
              </Card.Text>
              <ButtonGroup aria-label="Action Buttons">
                <NavLink to={`/athletes/${_id}`}>
                  <MDBBtn color="default" className="m-1" size="sm">
                    <i className="fas fa-info-circle fa-lg mr-1"></i> Details
                  </MDBBtn>
                </NavLink>
                <MDBBtn
                  color="danger"
                  onClick={() => this.props.toggleWillDeleteModal(_id)}
                  className="m-1"
                  size="sm"
                >
                  <i className="fas fa-user-slash fa-lg mr-1"></i> Delete
                </MDBBtn>
              </ButtonGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}
