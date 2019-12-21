import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
import AddAthleteModal from "../AddAthleteModal/AddAthleteModal";
import MessageModal from "../MessageModal/MessageModal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import AthleteCard from "../AthleteCard/AthleteCard";
import "../AthletesContainer/AthletesContainer.css";

export default class AthletesContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      messageShow: false,
      message: "",
      isScreenSmall: window.innerWidth <= 414
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

  resize = () => {
    if (window.innerWidth <= 697) {
      this.setState({ isScreenSmall: true });
    } else {
      this.setState({ isScreenSmall: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    const alwaysVisible = {
      width: "3rem",
      height: "3rem",
      fontSize: "1.25em",
      borderRadius: "50%",
      position: "fixed",
      bottom: 65,
      right: 25,
      backgroundColor: "#f5ec47",
      color: "black",
      border: "1px dashed gray"
    };

    return (
      <Fragment>
        {/* TEXT DISPLAYED WHILE FETCH IS RUNNING */}
        {this.props.athletes.length === 0 && (
          <h3 className="text-center mt-5 pt-5 text-light">
            Loading athletes...
          </h3>
        )}
        {/* DISPLAYNG ATHLETES */}

        <Accordion style={this.state.isScreenSmall ? {} : { display: "none" }}>
          {this.props.athletes.map(athlete => (
            <Athlete
              key={athlete._id}
              info={athlete}
              getAthletes={this.props.getAthletes}
              displayMessage={this.displayMessage}
            />
          ))}
        </Accordion>

        <div
          className="cards-container"
          style={this.state.isScreenSmall ? { display: "none" } : {}}
        >
          {this.props.athletes.map((athlete, i) => (
            <AthleteCard key={i} athlete={athlete} />
          ))}
        </div>

        <div style={{ paddingBottom: "3.5rem" }}></div>
        {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
        <Button
          style={alwaysVisible}
          onClick={this.showModal}
          className="hoverable"
        >
          <i className="fas fa-user-plus"></i>
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
