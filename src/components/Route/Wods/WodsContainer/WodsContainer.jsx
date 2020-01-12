import React, { Component, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { MDBBtn, MDBBtnGroup } from "mdbreact";
import "./Wod.css";

export default class WodsContainer extends Component {
  render() {
    const { isSelected } = this.props;
    const {
      description,
      type,
      time,
      _id,
      name,
      exercises
    } = this.props.wodInfo;
    return (
      <Fragment>
        <Card
          key={_id}
          className="rounded-0 text-white"
          style={{ backgroundColor: "#333333d6" }}
        >
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="p-1 text-center wodHeader"
            eventKey={_id}
            style={{
              backgroundColor: isSelected !== _id ? "#1c1c1cbd" : "#fff",
              color: isSelected !== _id ? "white" : "black"
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{name}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body
              className="text-center wodBody border border-white m-2"
              style={{ backgroundColor: "#333333" }}
            >
              <Card.Title as={"h5"} className="pt-0">
                - {type} -
              </Card.Title>
              {description !== "N/A" ? <p>{description}</p> : null}
              {time ? <h5>{time} min</h5> : null}
              <div className="mt-4">
                <div className="textWhite ">
                  {exercises.map((exercise, i) => {
                    return (
                      <p key={i}>
                        {exercise.reps ? (
                          <span className="m-2">{exercise.reps}</span>
                        ) : null}
                        <span className="m-2">{exercise.name}</span>
                        {exercise.weight ? (
                          <span className="m-2">{exercise.weight}kg</span>
                        ) : null}
                      </p>
                    );
                  })}
                </div>
                <MDBBtnGroup>
                  <MDBBtn className="m-2">
                    <i className="fas fa-info-circle fa-lg mr-1"></i> Details
                  </MDBBtn>
                  <MDBBtn className="m-2" color="danger">
                    <i className="fas fa-trash fa-lg mr-1"></i> Delete
                  </MDBBtn>
                </MDBBtnGroup>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}
