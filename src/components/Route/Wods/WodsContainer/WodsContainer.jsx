import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import Select from "../../Athletes/AthleteDetails/Select";
import Wod from "../Wod/Wod";
import Accordion from "react-bootstrap/Accordion";
import "./WodsContainer.css";
import AddWods from "../AddWods/AddWods";

const options = [
  { name: "EMOM" },
  { name: "AMRAP" },
  { name: "FOR TIME" },
  { name: "CHIPPER" },
  { name: "SPECIAL" }
];

export default class WodsContainer extends Component {
  state = { isSelected: "", isFiltering: false, displayModal: false };
  getValue = value => {
    console.log(value);
  };
  showFilterOptions = () => {
    this.setState({ isFiltering: !this.state.isFiltering });
  };
  toggleModal = () => {
    this.setState({
      displayModal: !this.state.displayModal
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h3 className="text-center text-white p-3 m-1 w-100 mx-auto bg-dark">
          <i className="fas fa-dumbbell mr-2"></i>My Wods
        </h3>
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
              wods={this.state.wods}
              getWods={this.getWods}
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
          onClick={this.toggleModal}
          className="hoverable"
        >
          <i className="fas fa-plus"></i>
        </MDBBtn>
        <AddWods
          toggleModal={this.toggleModal}
          displayModal={this.state.displayModal}
          options={options}
          exercises={[]}
          getValue={this.getValue}
        />
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
  border: "2px double white"
};
const searchWodBtnStyles = {
  width: "2.3rem",
  height: "2.3rem",
  fontSize: "1.1em",
  padding: "0.30rem 0.20rem",
  borderRadius: "50%",
  backgroundColor: "#dabc01",
  color: "black",
  border: "2px double white"
};
