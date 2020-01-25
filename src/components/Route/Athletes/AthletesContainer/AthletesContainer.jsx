import React, { Component, Fragment } from "react";
import Athlete from "../Athlete/Athlete";
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

  toggleModal = () => {
    this.setState({
      modalShow: !this.state.modalShow
    });
  };

  hideModal = () => {
    this.setState({
      modalShow: false
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
    fetch(athletesAPI + athleteID, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(answer => {
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
        <div className="headingStyle">
          <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
            <i className="fas fa-users mr-2"></i>My Athletes
          </h3>
        </div>
        <div className="ml-5 mr-5 mb-1 text-center">
          {this.state.isSearching ? (
            <div className="m-1 mt-2">
              <i className="fas fa-search text-white fa-lg mr-2"></i>
              <input
                type="search"
                autoFocus
                placeholder="Athlete Name..."
                className="p-1 pl-2 searchInput"
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
          onClick={this.toggleModal}
          className="hoverable"
        >
          <i className="fas fa-user-plus"></i>
        </MDBBtn>
        {/* MODAL ADD ATHLETE */}
        {this.state.modalShow ? (
          <AddAthleteV2
            onHide={this.toggleModal}
            showServerResponse={this.displayAlertDeleted}
            changeCount={this.props.changeCount}
          />
        ) : null}
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
  border: "2px double white",
  boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
};
const searchAthleteBtnStyles = {
  width: "2.3rem",
  height: "2.3rem",
  fontSize: "1.1em",
  padding: "0.30rem 0.20rem",
  borderRadius: "50%",
  backgroundColor: "#dabc01",
  color: "black",
  border: "2px double white",
  boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
};
