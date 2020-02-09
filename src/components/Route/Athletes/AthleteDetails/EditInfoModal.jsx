import React, { Component, Fragment } from "react";
import { MDBInput } from "mdbreact";
import AlertMessage from "../AlertMessage/AlertMessage";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon
} from "mdbreact";

export default class EditInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.info.name,
      phoneNumber: props.info.phoneNumber,
      email: props.info.email,
      birthday: props.info.birthday,
      show: false,
      message: ""
    };
  }

  handleChange = event => {
    if (event.target.name === "phoneNumber") {
      this.setState({
        phoneNumber: event.target.value.replace(/[()]/g, "")
      });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const updatedAthleteDetails = {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      birthday: this.state.birthday
    };

    this.editAthleteDetails(updatedAthleteDetails);
  };

  displayAlert = message => {
    this.setState({
      show: true,
      message: message
    });
  };

  editAthleteDetails(updatedAthleteDetails) {
    fetch(
      `https://theboxathletes.herokuapp.com/athletes/${this.props.info._id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(updatedAthleteDetails)
      }
    )
      .then(response => {
        return response.json();
      })
      .then(answer => {
        this.displayAlert(answer.message);
      })
      .then(() => {
        setTimeout(() => {
          this.props.refresh();
        }, 1500);
      });
  }

  render() {
    const { isShowing, show } = this.props;
    return (
      <Fragment>
        <AlertMessage
          show={this.state.show}
          messageAlertDeleted={this.state.message}
        />
        <MDBContainer>
          <MDBModal isOpen={isShowing} toggle={() => show(!isShowing)} centered>
            <MDBModalHeader className="border bg-dark text-white">
              <MDBIcon icon="user-edit" size="lg" className="mr-2" /> Edit info
            </MDBModalHeader>
            <MDBModalBody
              className="border text-white"
              style={{ backgroundColor: "#383838", overflow: "auto" }}
            >
              <MDBInput
                className="white-text"
                label="Name"
                icon="user"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <MDBInput
                className="white-text"
                label="Phone"
                icon="phone"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
              <MDBInput
                className="white-text"
                label="Email"
                icon="envelope-open"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <MDBInput
                className="white-text"
                icon="calendar-alt"
                name="birthday"
                type="date"
                onChange={this.handleChange}
                value={this.state.birthday}
              />
            </MDBModalBody>
            <MDBModalFooter className="bg-dark border d-flex justify-content-around modalFooter">
              <MDBBtn color="danger" size="sm" onClick={() => show(!isShowing)}>
                <MDBIcon icon="ban" size="lg" className="mr-2" /> Close
              </MDBBtn>
              <MDBBtn color="success" size="sm" onClick={this.handleSubmit}>
                <MDBIcon icon="save" size="lg" className="mr-2" /> Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </Fragment>
    );
  }
}
