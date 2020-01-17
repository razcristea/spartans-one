import React, { useState, useRef, useEffect } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import Card from "react-bootstrap/Card";

export default function AddWods(props) {
  console.log(props);

  // class FormsPage extends React.Component {
  //   state = {
  //     fname: "Mark",
  //     lname: "Otto",
  //     email: "",
  //     city: "",s
  //     state: "",
  //     zip: ""
  //   };

  //   submitHandler = event => {
  //     event.preventDefault();
  //     event.target.className += " was-validated";
  //   };

  // changeHandler = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // };

  //   render() {
  return (
    <Modal show={props.displayModal} className="text-white">
      <Modal.Header className="text-light modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          <MDBIcon icon="dumbbell" size="md" className="mr-2" /> Add Wod
        </Modal.Title>
        <button
          type="button"
          className="close text-white"
          onClick={props.toggleModal}
        >
          <span>&times;</span>
        </button>
      </Modal.Header>
      <Card>
        <form
          className="needs-validation"
          // onSubmit={this.submitHandler}
          noValidate
        >
          <ModalBody className="bg-dark">
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  icon="dumbbell"
                  size="sm"
                  //   value={this.state.fname}
                  name="workoutTitle"
                  //   onChange={this.changeHandler}
                  type="text"
                  label="Name"
                  required
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  type="textarea"
                  label="description"
                  outline
                  icon="align-left"
                  //   value={this.state.lname}
                  name="lname"
                  //   onChange={this.changeHandler}
                  type="text"
                  label="Description"
                  required
                />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  icon="clock"
                  //   value={this.state.email}
                  //   onChange={this.changeHandler}
                  type="number"
                  name="duration"
                  label="Duration"
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  icon="filter"
                  //   value={this.state.city}
                  //   onChange={this.changeHandler}
                  type="text"
                  name="type"
                  label="Cathegory"
                  required
                ></MDBInput>
              </MDBCol>
            </MDBRow>
          </ModalBody>

          <Modal.Header className="modalFooter">
            <MDBBtn color="success" size="sm" type="submit">
              <MDBIcon icon="share-square" size="lg" className="mr-2" /> Submit
            </MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={props.toggleModal}>
              <MDBIcon icon="ban" size="lg" className="mr-2" />
              Cancel
            </MDBBtn>
          </Modal.Header>
        </form>
      </Card>
    </Modal>
  );
}
