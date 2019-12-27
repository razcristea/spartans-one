import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
import AddAthleteModal from "../AddAthleteModal/AddAthleteModal";
import MessageModal from "../MessageModal/MessageModal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AthleteCard from "../AthleteCard/AthleteCard";
import "../AthletesContainer/AthletesContainer.css";
import AlertMessage from "../AlertMessage/AlertMessage";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

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
      isSearching: false,
      willDelete: false,
      alertDeleted: false,
      messageAlertDeleted: "",
      idToDelete: ""
    };
  }

  showSearchInput = () => {
    this.setState({ isSearching: !this.state.isSearching });
  };

  doTheSearch = event => {
    const filteredAthletes = [...this.state.athletes];
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
    this.props.getAthletes();
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

  //delete functionality

  _isMounted = false;

  toggleWillDeleteModal = id => {
    this.setState({ willDelete: true, idToDelete: id });
  };

  closeDeleteModal = () => {
    this.setState({ willDelete: false });
  };

  displayAlertDeleted = messagedelete => {
    this.setState({
      alertDeleted: true,
      messageAlertDeleted: messagedelete
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this._isMounted = true;
  }

  deleteAthlete = () => {
    const athleteID = this.state.idToDelete;
    console.log(athleteID);
    fetch(athletesAPI + athleteID, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(
        answer => {
          console.log("Answer is: " + answer);

          this.closeDeleteModal();

          this.displayAlertDeleted(answer);
        },
        error => console.log(error)
      )
      .then(setTimeout(() => this.props.getAthletes(), 5000)); // re-fetch from API
  };

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.resize);
  }

  // componentDidMount() {
  //   window.addEventListener("resize", this.resize);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.resize);
  // }

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
        {this.state.athletes.length === 0 && (
          <h3 className="text-center mt-5 pt-5 text-light">
            Loading athletes...
          </h3>
        )}

        {/* DISPLAYNG ATHLETES */}
        {/*MODAL THAT APPEARS AT CLICK DELETE BUTTON*/}
        <Modal show={this.state.willDelete} onHide={this.closeDeleteModal}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="delete-message">
            Are you sure you want to delete this athlete?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteAthlete}>
              Yes
            </Button>
            <Button variant="success" onClick={this.closeDeleteModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>

        {/*ALERT THAT DISPLAYS SERVER ANSWER AFTER DELETE */}
        <AlertMessage
          show={this.state.alertDeleted}
          messageAlertDeleted={this.state.messageAlertDeleted}
        />

        <Accordion style={this.state.isScreenSmall ? {} : { display: "none" }}>
          {this.state.athletes.map(athlete => (
            <Athlete
              key={athlete._id}
              info={athlete}
              toggleWillDeleteModal={this.toggleWillDeleteModal}
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
              toggleWillDeleteModal={this.toggleWillDeleteModal}
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
          // message={this.state.message}
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
