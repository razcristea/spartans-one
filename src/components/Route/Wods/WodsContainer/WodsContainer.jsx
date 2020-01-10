import React, { Component, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

export default class WodsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wods: this.props.wods
    };
  }

  render() {
    const { description, _id, name, exercises } = this.props.wodInfo;
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
            className="p-1 wodheader"
            eventKey={_id}
          >
            <span style={{ fontSize: "1.3rem" }}>{name}</span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body
              className="text-center"
              style={{ backgroundColor: "#333333" }}
            >
              <Card.Title as={"h3"} className="pt-2">
                {name} - {description}
              </Card.Title>
              <MDBTable>
                <MDBTableHead color="primary-color" textWhite>
                  <tr>
                    <th>Exercise name</th>
                    <th>Number of reps</th>
                    <th>Weight</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody textWhite>
                  {exercises.map((exercise, i) => {
                    return (
                      <tr key={i}>
                        <td>{exercise.name}</td>
                        <td>{exercise.nrOfReps}</td>
                        <td>{exercise.weight}</td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}
