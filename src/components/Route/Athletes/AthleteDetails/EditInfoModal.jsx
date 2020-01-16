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
      age: props.info.age,
      show: false,
      message: ""
    };
  }

  handleChange = event => {
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
      age: this.state.age
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
        this.displayAlert(answer);
      })
      .then(() => {
        setTimeout(() => {
          this.props.refresh();
        }, 2000);
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
            <MDBModalHeader
              toggle={() => show(!isShowing)}
              style={{
                backgroundColor: "#1f1f1f",
                border: "2px ridge white",
                color: "#fff"
              }}
            >
              <MDBIcon icon="user-edit" size="lg" className="mr-2" /> Edit info
            </MDBModalHeader>
            <MDBModalBody className="bg-dark text-white border">
              <div className="form-group">
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
                  label="Age"
                  icon="baby"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleChange}
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter
              style={{
                backgroundColor: "#1f1f1f",
                border: "2px ridge white",
                color: "#fff"
              }}
            >
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
