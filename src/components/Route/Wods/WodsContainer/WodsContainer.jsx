import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "../../Athletes/AthleteDetails/Select";
import Wod from "../Wod/Wod";
import Accordion from "react-bootstrap/Accordion";
import AlertMessage from "../../Athletes/AlertMessage/AlertMessage";
import AddWods from "../AddWods/AddWods";
import "./WodsContainer.css";

const options = [
  { name: "EMOM" },
  { name: "AMRAP" },
  { name: "FOR TIME" },
  { name: "CHIPPER" },
  { name: "SPECIAL" }
];

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default class WodsContainer extends Component {
  state = {
    isSelected: "",
    isFiltering: false,
    displayModal: false,
    willDelete: false,
    idToDelete: "",
    alertDeleted: false,
    messageAlertDeleted: ""
  };
  getValue = value => {
    console.log(value);
  };
  showFilterOptions = () => {
    this.setState({ isFiltering: !this.state.isFiltering });
  };
  toggleAddModal = () => {
    this.setState({
      displayModal: !this.state.displayModal
    });
  };

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
  deleteWod = () => {
    fetch(wodsApi + this.state.idToDelete, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(answer => {
        this.closeDeleteModal();
        this.displayAlertDeleted(answer);
      })
      .then(
        setTimeout(() => {
          this.props.getWods();
        }, 2000)
      );
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.willDelete}
          onHide={this.closeDeleteModal}
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="delete-message">
            Are you sure you want to delete this wod?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteWod}>
              Yes
            </Button>
            <Button variant="success" onClick={this.closeDeleteModal}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <AlertMessage
          show={this.state.alertDeleted}
          messageAlertDeleted={this.state.messageAlertDeleted}
        />
        <div
          style={{
            backgroundColor: "rgba(255, 206, 0, 0.15)",
            boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
          }}
        >
          <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
            <i className="fas fa-dumbbell mr-2"></i>My Wods
          </h3>
        </div>
        {this.state.isFiltering ? (
          <div
            className="text-center"
            autoFocus
            onBlur={this.showFilterOptions}
          >
            <Select
              options={options}
              getValue={this.getValue}
              defaultValue="Filter Wods"
              className="w-25"
            />
          </div>
        ) : null}
        <Accordion
          onSelect={ev => this.setState({ isSelected: ev })}
          className="mb-5"
        >
          {this.props.wods.map(wod => (
            <Wod
              isSelected={this.state.isSelected}
              toggleWillDelete={this.toggleWillDeleteModal}
              getWods={this.props.getWods}
              key={wod._id}
              wodInfo={wod}
            />
          ))}
        </Accordion>
        <div className="wodButton">
          <MDBBtn
            color="warning"
            style={searchWodBtnStyles}
            onClick={this.showFilterOptions}
            className="hoverable"
          >
            <i className="fas fa-filter "></i>
          </MDBBtn>
        </div>
        {/* BUTTON ALWAYS VISIBLE FOR ADDING NEW ATHLETE */}
        <MDBBtn
          color="warning"
          style={addWodBtnStyles}
          onClick={this.toggleAddModal}
          className="hoverable"
        >
          <i className="fas fa-plus"></i>
        </MDBBtn>
        {this.state.displayModal ? (
          <AddWods
            toggleModal={this.toggleAddModal}
            options={options}
            exercises={[]}
            showServerResponse={this.displayAlertDeleted}
            getWods={this.props.getWods}
          />
        ) : null}
      </div>
    );
  }
}

const addWodBtnStyles = {
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
const searchWodBtnStyles = {
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
