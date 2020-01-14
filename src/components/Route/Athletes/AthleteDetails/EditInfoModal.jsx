import React, { Component } from "react";
import { MDBInput } from "mdbreact";

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
      sex: props.info.sex,
      age: props.info.age
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
      sex: this.state.sex,
      age: this.state.age
    };

    this.editAthleteDetails(updatedAthleteDetails);
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
      .then(answer => console.log(answer))
      .then(() => this.props.refresh());
  }

  render() {
    const { isShowing, show } = this.props;
    return (
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
                label="Name"
                icon="user"
                name="name"
                valueDefault={this.state.name}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Phone"
                icon="phone"
                name="phoneNumber"
                valueDefault={this.state.phoneNumber}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Email"
                icon="envelope-open"
                name="email"
                valueDefault={this.state.email}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Sex"
                icon="transgender"
                name="sex"
                valueDefault={this.state.sex}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Age"
                icon="baby"
                name="age"
                valueDefault={this.state.age}
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
    );
  }
}
