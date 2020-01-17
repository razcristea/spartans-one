import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import TypeFilter from "./Wod/TypeFilter";
import Wod from "./Wod/Wod";
import Accordion from "react-bootstrap/Accordion";
import "./Wods.css";
import AddWods from "./AddWods/AddWods";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default class Wods extends Component {
  constructor() {
    super();
    this.state = { wods: [], isSelected: "", displayModal: false };
  }
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getWods();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleModal = () => {
    this.setState({
      displayModal: !this.state.displayModal
    });
  };
  getWods = () => {
    fetch(wodsApi)
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          data.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          this.setState({ wods: data });
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        {this.state.wods.length === 0 && (
          <h3 className="text-center mt-5 pt-5 text-light">Loading...</h3>
        )}
        <h2
          className="text-center text-white p-1 m-1 w-50 mx-auto"
          style={{ borderBottom: "0.5px solid white" }}
        >
          My Wods
        </h2>
        <TypeFilter />
        <Accordion
          onSelect={ev => this.setState({ isSelected: ev })}
          className="mb-5"
        >
          {this.state.wods.map(wod => (
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
            onClick={this.showSearchInput}
            className="hoverable"
          >
            <i className="fas fa-search-plus"></i>
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
