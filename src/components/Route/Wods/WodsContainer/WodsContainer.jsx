import React, { Component, Fragment } from "react";
import {
  MDBBtn,
  MDBModalHeader,
  MDBModalFooter,
  MDBModalBody,
  MDBModal
} from "mdbreact";
import Select from "react-select";
import Wod from "../Wod/Wod";
import Accordion from "react-bootstrap/Accordion";
import AlertMessage from "../../Athletes/AlertMessage/AlertMessage";
import AddWods from "../AddWods/AddWods";
import "./WodsContainer.css";

let changeWodIcon = (wodName, icon) => {
  return (
    <div className="text-dark">
      <span className={`fas p-2 mr-1 ${icon}`} />
      <span className="ml-1 mx-1">{wodName}</span>
    </div>
  );
};

const options = [
  { value: "", label: changeWodIcon("All Wods", "fa-dumbbell") },
  { value: "emom", label: changeWodIcon("EMOM", "fa-hourglass") },
  { value: "amrap", label: changeWodIcon("AMRAP", "fa-bolt") },
  { value: "for time", label: changeWodIcon("FOR TIME", "fa-stopwatch") },
  { value: "chipper", label: changeWodIcon("CHIPPER", "fa-hammer") },
  { value: "special", label: changeWodIcon("SPECIAL", "fa-radiation") }
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
    messageAlertDeleted: "",
    selectedOption: null,
    wods: this.props.wods
  };

  showFilterOptions = () => {
    this.setState({ isFiltering: !this.state.isFiltering });
    this.clearFilters();
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    const filterWods = [...this.props.wods];
    const resultfilteredWods = filterWods.filter(wod => {
      return wod.type.toLowerCase().includes(selectedOption.value);
    });

    this.setState({ wods: [...resultfilteredWods] });
  };

  clearFilters() {
    this.setState({
      selectedOption: null
    });
  }

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
      <Fragment>
        <MDBModal
          isOpen={this.state.willDelete}
          toggle={this.closeDeleteModal}
          centered
        >
          <MDBModalHeader className="border bg-dark text-white justify-content-center">
            <i className="fas fa-trash-alt fa-2x"></i>
          </MDBModalHeader>
          <MDBModalBody
            className="text-center border text-white"
            style={{ backgroundColor: "#383838", overflow: "auto" }}
          >
            Are you sure you want to delete this Wod?
          </MDBModalBody>
          <MDBModalFooter className="bg-dark border d-flex justify-content-around modalFooter">
            <MDBBtn color="danger" size="sm" onClick={this.deleteAthlete}>
              <i className="fas fa-eraser fa-lg mr-1"></i> Yes
            </MDBBtn>
            <MDBBtn color="success" size="sm" onClick={this.closeDeleteModal}>
              <i className="fas fa-chalkboard fa-lg mr-1"></i> No
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <AlertMessage
          show={this.state.alertDeleted}
          messageAlertDeleted={this.state.messageAlertDeleted}
        />
        <div className="headingStyle">
          <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
            <i className="fas fa-dumbbell mr-2"></i>My Wods
          </h3>
        </div>

        {this.state.isFiltering ? (
          <Select
            value={this.state.selectedOption}
            onBlur={this.showFilterOptions}
            onChange={this.handleChange}
            options={options}
            className="w-75 mx-auto p-2"
            isSearcheable={false}
            autoFocus
            placeholder="Filter wods..."
            onBlurResetInput
          />
        ) : null}
        {this.props.showLoader ? (
          <div className="mb-5"></div>
        ) : (
          <Accordion
            onSelect={ev => this.setState({ isSelected: ev })}
            className="mb-5"
          >
            {this.state.wods.map(wod => (
              <Wod
                isSelected={this.state.isSelected}
                toggleWillDelete={this.toggleWillDeleteModal}
                getWods={this.props.getWods}
                key={wod._id}
                wodInfo={wod}
              />
            ))}
          </Accordion>
        )}
        <div style={{ paddingBottom: "4rem" }}></div>
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
            options={[...options]}
            exercises={[]}
            showServerResponse={this.displayAlertDeleted}
            getWods={this.props.getWods}
          />
        ) : null}
      </Fragment>
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
