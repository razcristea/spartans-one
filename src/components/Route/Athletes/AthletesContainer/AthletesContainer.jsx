import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
import MessageModal from "../MessageModal/MessageModal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AthleteCard from "../AthleteCard/AthleteCard";
import "../AthletesContainer/AthletesContainer.css";
import AlertMessage from "../AlertMessage/AlertMessage";
import AddAthleteV2 from "../AddAthleteModal/AddAthletev2";
import { MDBBtn } from "mdbreact";

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
      isScreenSmall: window.innerWidth <= 697,
      isSelected: "",
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
    const filteredAthletes = [...this.props.athletes];
    const result = filteredAthletes.filter(athlete =>
      athlete.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
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
      .then(answer => {
        console.log("Answer is: " + answer);
        this.closeDeleteModal();
        this.displayAlertDeleted(answer);
      })
      .then(
        setTimeout(() => {
          this.props.changeCount();
        }, 2000)
      );
  };

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.resize);
  }

  render() {
    return (
      <Fragment>
        {/*MODAL THAT APPEARS AT CLICK DELETE BUTTON*/}
        <Modal
          show={this.state.willDelete}
          onHide={this.closeDeleteModal}
          centered
        >
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
        <h3 className="text-center text-white p-3 m-1 w-100 mx-auto bg-dark">
          <i className="fas fa-users mr-2"></i>My Athletes
        </h3>
        <div className="ml-5 mr-5 mb-1 text-center">
          {this.state.isSearching ? (
            <div>
              <i className="fas fa-search text-white fa-lg mr-2"></i>
              <input
                type="search"
                autoFocus
                placeholder="Athlete Name..."
                className="p-1 pl-2 searchInput border"
                onChange={this.doTheSearch}
                onBlur={this.showSearchInput}
              />
            </div>
          ) : null}
        </div>
        {this.state.isScreenSmall ? (
          <Accordion onSelect={ev => this.setState({ isSelected: ev })}>
            {this.state.athletes.map(athlete => (
              <Athlete
                key={athlete._id}
                isSelected={this.state.isSelected}
                info={athlete}
                toggleWillDeleteModal={this.toggleWillDeleteModal}
                changeCount={this.props.changeCount}
              />
            ))}
          </Accordion>
        ) : (
          <div className="cards-container">
            {this.state.athletes.map((athlete, i) => (
              <AthleteCard
                key={i}
                athlete={athlete}
                toggleWillDeleteModal={this.toggleWillDeleteModal}
                changeCount={this.props.changeCount}
              />
            ))}
          </div>
        )}
        <div style={{ paddingBottom: "3.5rem" }}></div>
        <div
          style={{
            position: "fixed",
            bottom: 63,
            left: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <MDBBtn
            color="warning"
            style={searchAthleteBtnStyles}
            onClick={this.showSearchInput}
            className="hoverable"
          >
            <i className="fas fa-search"></i>
          </MDBBtn>
        </div>
        {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
        <MDBBtn
          color="warning"
          style={addAthleteBtnStyles}
          onClick={this.showModal}
          className="hoverable"
        >
          <i className="fas fa-user-plus"></i>
        </MDBBtn>
        {/* MODAL ADD ATHLETE */}
        <AddAthleteV2
          show={this.state.modalShow}
          onHide={this.hideModal}
          showServerResponse={this.displayAlertDeleted}
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

const addAthleteBtnStyles = {
  width: "2.3rem",
  height: "2.3rem",
  fontSize: "1.1rem",
  padding: "0.1rem 0.45rem",
  borderRadius: "50%",
  position: "fixed",
  bottom: 63,
  right: 7,
  color: "black",
  border: "2px double white"
};
const searchAthleteBtnStyles = {
  width: "2.3rem",
  height: "2.3rem",
  fontSize: "1.1em",
  padding: "0.30rem 0.20rem",
  borderRadius: "50%",
  backgroundColor: "#dabc01",
  color: "black",
  border: "2px double white"
};
