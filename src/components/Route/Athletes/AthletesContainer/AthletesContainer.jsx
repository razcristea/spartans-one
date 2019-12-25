import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
import AddAthleteModal from "../AddAthleteModal/AddAthleteModal";
import MessageModal from "../MessageModal/MessageModal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import AthleteCard from "../AthleteCard/AthleteCard";
import "../AthletesContainer/AthletesContainer.css";

export default class AthletesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: this.props.athletes,
      searchfield: "",
      modalShow: false,
      messageShow: false,
      message: "",
      isScreenSmall: window.innerWidth <= 414,
      isSearching: false
    };
  }

  showSearchInput = () => {
    this.setState({ isSearching: !this.state.isSearching });
  };

  doTheSearch = event => {
    const filteredAthletes = [...this.props.athletes];
    const result = filteredAthletes.filter(athlete =>
      athlete.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(result);
    this.setState({
      athletes: event.target.value.length <= 1 ? this.props.athletes : result
    });
  };
  showModal = () => {
    this.setState({
      modalShow: true
    });
  };

  hideModal = () => {
    this.setState({
      modalShow: false
    });
    // this.props.getAthletes();
    this.displayMessage("Modal AddAthlete inchis"); // NEEDS IMPLEMENTATION OF CUSTOM MESSAGE
    setTimeout(this.displayMessage, 1500);
  };

  displayMessage = message => {
    const newState = !this.state.messageShow;
    this.setState({
      messageShow: newState,
      message: message
    });
  };

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
    const addAthleteBtnStyles = {
      width: "3rem",
      height: "3rem",
      fontSize: "1.25em",
      borderRadius: "50%",
      position: "fixed",
      bottom: 77,
      right: 7,
      backgroundColor: "#dabc01",
      color: "black",
      border: "2px double white"
    };
    const searchAthleteBtnStyles = {
      width: "3rem",
      height: "3rem",
      fontSize: "1.25em",
      borderRadius: "50%",
      backgroundColor: "#dabc01",
      color: "black",
      border: "2px double white"
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
          {this.state.athletes.map(athlete => (
            <Athlete
              key={athlete._id}
              info={athlete}
              getAthletes={this.props.getAthletes}
              displayMessage={this.displayMessage}
              changeCount={this.props.changeCount}
            />
          ))}
        </Accordion>

        <div
          className="cards-container"
          style={this.state.isScreenSmall ? { display: "none" } : {}}
        >
          {this.state.athletes.map((athlete, i) => (
            <AthleteCard
              key={i}
              athlete={athlete}
              changeCount={this.props.changeCount}
            />
          ))}
        </div>
        <div style={{ paddingBottom: "3.5rem" }}></div>
        <div
          style={{
            position: "fixed",
            bottom: 77,
            left: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            style={searchAthleteBtnStyles}
            onClick={this.showSearchInput}
            className="hoverable"
          >
            <i className="fas fa-search"></i>
          </Button>
          {this.state.isSearching ? (
            <input
              type="search"
              autoFocus
              placeholder="Type Athlete Name..."
              className="ml-2 p-2 searchInput"
              onChange={this.doTheSearch}
              onBlur={this.showSearchInput}
            />
          ) : null}
        </div>
        {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
        <Button
          style={addAthleteBtnStyles}
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
          changeCount={this.props.changeCount}
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
