import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
import AddAthleteModal from "../AddAthleteModal/AddAthleteModal";
import MessageModal from "../MessageModal/MessageModal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export default class AthletesContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      messageShow: false,
      message: ""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
  }

  showModal() {
    this.setState({
      modalShow: true
    });
  }

  hideModal() {
    this.setState({
      modalShow: false
    });
    this.props.getAthletes();
    this.displayMessage("Modal AddAthlete inchis"); // NEEDS IMPLEMENTATION OF CUSTOM MESSAGE
    setTimeout(this.displayMessage, 1500);
  }

  displayMessage(message) {
    const newState = !this.state.messageShow;
    this.setState({
      messageShow: newState,
      message: message
    });
  }

  render() {
    const alwaysVisible = {
      width: "3rem",
      height: "3rem",
      fontSize: "1.25em",
      borderRadius: "50%",
      position: "fixed",
      bottom: 100,
      right: 50
    };

    return (
      <Fragment>
        {/* TEXT DISPLAYED WHILE FETCH IS RUNNING */}
        {this.props.athletes.length === 0 && <h3>Loading athletes...</h3>}
        {/* DISPLAYNG ATHLETES */}
        <Accordion>
          {this.props.athletes.map(athlete => (
            <Athlete
              info={athlete}
              key={athlete._id}
              getAthletes={this.props.getAthletes}
              displayMessage={this.displayMessage}
            />
          ))}
        </Accordion>
        <div style={{ paddingBottom: "3.5rem" }}></div>
        {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
        <Button style={alwaysVisible} onClick={this.showModal}>
          +
        </Button>
        {/* MODAL ADD ATHLETE */}
        <AddAthleteModal
          show={this.state.modalShow}
          onHide={this.hideModal}
          message={this.state.message}
        />
        {/* MODAL TO DISPLAY MESSAGES */}
        <MessageModal
          show={this.state.messageShow}
          onHide={this.displayMessage}
          message={this.state.message}
        />
      </Fragment>
    );
  }
}
