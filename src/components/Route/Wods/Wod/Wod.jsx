import React, { Component, Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { MDBBtn, MDBBtnGroup } from "mdbreact";
import "./Wod.css";
import { NavLink } from "react-router-dom";

export default class Wod extends Component {
  state = { icon: "" };
  componentDidMount() {
    this.setIconForWod(this.props.wodInfo.type);
  }
  setIconForWod = type => {
    switch (type) {
      case "FOR TIME":
        this.setState({ icon: "fas fa-stopwatch" });
        break;
      case "EMOM":
        this.setState({ icon: "far fa-hourglass" });
        break;
      case "CHIPPER":
        this.setState({ icon: "fas fa-hammer" });
        break;
      case "AMRAP":
        this.setState({ icon: "fas fa-bolt" });
        break;
      default:
        this.setState({ icon: "fas fa-radiation" });
    }
  };

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
          style={{ backgroundColor: "#3333339c" }}
        >
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="p-1 text-center wodHeader d-flex justify-content-between"
            eventKey={_id}
            style={{
              backgroundColor: isSelected !== _id ? "#1c1c1cbd" : "#fff",
              color: isSelected !== _id ? "white" : "black"
            }}
          >
            <div className="ml-1" style={{ fontSize: "1.3rem" }}>
              <i className={this.state.icon + " mr-2"}></i>
              {name}
            </div>
            <div className="text-muted mr-1" style={{ fontSize: "0.6rem" }}>
              {type}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={_id}>
            <Card.Body
              className="text-center wodBody border border-white m-3"
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
                        {exercise.weight !== "0" &&
                        exercise.weight !== "/ kg" ? (
                          <span className="m-2">{exercise.weight}</span>
                        ) : null}
                      </p>
                    );
                  })}
                </div>
                <MDBBtnGroup>
                  <MDBBtn
                    className="m-2"
                    color="danger"
                    size="sm"
                    onClick={() => this.props.toggleWillDelete(_id)}
                  >
                    <i className="fas fa-trash fa-lg mr-1"></i> Delete
                  </MDBBtn>
                  <NavLink to={`/wods/${_id}`}>
                    <MDBBtn className="m-2" size="sm">
                      <i className="fas fa-info-circle fa-lg mr-1"></i> Details
                    </MDBBtn>
                  </NavLink>
                </MDBBtnGroup>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Fragment>
    );
  }
}
