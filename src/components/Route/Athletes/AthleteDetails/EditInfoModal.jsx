import React, { Component } from "react";
import { MDBInput } from "mdbreact";

import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

export default class EditInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.info.name,
      phoneNumber: this.props.info.phoneNumber,
      email: this.props.info.email,
      sex: this.props.info.sex,
      age: this.props.info.age
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

    console.log(updatedAthleteDetails);
    console.log(this.props);
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
      .then(error => console.log(error));
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal
          isOpen={this.props.isShowing}
          toggle={() => this.props.show(!this.props.isShowing)}
          centered
        >
          <MDBModalHeader
            toggle={() => this.props.show(!this.props.isShowing)}
            style={{
              backgroundColor: "#1f1f1f",
              border: "2px ridge white",
              color: "#fff"
            }}
          >
            Edit info
          </MDBModalHeader>
          <MDBModalBody className="bg-dark text-white border">
            <div className="form-group">
              <MDBInput
                label="Name"
                icon="user"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Phone"
                icon="phone"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Email"
                icon="envelope-open"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <MDBInput
                label="Sex"
                icon="transgender"
                name="sex"
                value={this.state.sex}
                onChange={this.handleChange}
              />
              <MDBInput
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
            <MDBBtn
              color="danger"
              onClick={() => this.props.show(!this.props.isShowing)}
            >
              Close
            </MDBBtn>
            <MDBBtn
              color="success"
              onClick={this.handleSubmit}
              // onClick={() => this.props.show(!this.props.isShowing)}
            >
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
