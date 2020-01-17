import React, { Fragment } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";
import "./AddWods.css";
import Select from "../../Athletes/AthleteDetails/Select";

export default function AddWods(props) {
  return (
    <Fragment>
      <Modal
        show={props.displayModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="text-light modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            <MDBIcon icon="dumbbell" size="lg" className="mr-2" /> Add Wod
          </Modal.Title>
          <button
            type="button"
            className="close text-white"
            onClick={props.toggleModal}
          >
            <span>&times;</span>
          </button>
        </Modal.Header>
        <form
          className="needs-validation border"
          noValidate
          style={{
            backgroundColor: "#383838",
            padding: "0.5rem"
          }}
        >
          <Modal.Body className="text-light">
            <h5 className="mt-2 mb-2 p-2 text-center border">
              <MDBIcon icon="info" size="lg" className="mr-2" /> Wod Info
            </h5>
            <MDBRow className="m-3 border pl-1 pr-1">
              <MDBCol md="4" className="mb-2 mt-3">
                <MDBInput
                  className="text-white"
                  icon="pen"
                  type="text"
                  name="wodName"
                  label="Name"
                  labelClass="labelClass"
                  required
                >
                  <div className="invalid-feedback ml-4 pl-3"></div>
                  <div className="valid-feedback ml-4 pl-3">Looks good!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4" className="mb-2 mt-3">
                <Select
                  options={props.options}
                  getValue={props.getValue}
                  defaultValue="Select Type"
                  className="w-100"
                />
              </MDBCol>
              <MDBCol md="4" className="mb-2 mt-3">
                <MDBInput
                  className="text-white"
                  icon="align-left"
                  type="text"
                  name="description"
                  label="Description"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4" className="mb-2 mt-3">
                <MDBInput
                  className="text-white"
                  icon="clock"
                  type="number"
                  name="time"
                  label="Time"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
            </MDBRow>

            <h5 className="mb-2 p-2 text-center border">
              <MDBIcon icon="dumbbell" size="lg" className="mr-2" /> Exercises
            </h5>
            <MDBRow className="m-3 pb-4 border">
              <MDBCol md="6" className="mb-2 mt-3">
                <MDBInput
                  className="text-white"
                  type="text"
                  name="exerciseName"
                  label="Name (Ex: Squats)"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6" className="mb-2 mt-3">
                <MDBInput
                  className="text-white"
                  icon=""
                  type="number"
                  name="reps"
                  label="Reps"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6" className="mb-2 mt-3">
                Weight
                <MDBInput
                  icon="female"
                  className="text-white"
                  type="number"
                  name="weightFemale"
                  label="Female/Kg (default:0)"
                ></MDBInput>
                <MDBInput
                  className="text-white"
                  icon="male"
                  type="number"
                  name="weightMale"
                  label="Male/Kg (default:0)"
                ></MDBInput>
              </MDBCol>

              <MDBCol className="d-flex align-items-end flex-column bd-highlight example-parent">
                <MDBBtn
                  color="info"
                  size="md"
                  type="submit"
                  className="mt-auto p-2 bd-highlight col-example"
                >
                  <MDBIcon icon="plus" size="lg" /> Add
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </Modal.Body>
          <Modal.Header className="modalFooter">
            <MDBBtn color="success" size="sm" type="submit">
              <MDBIcon icon="share-square" size="lg" className="mr-2" /> Add WOD
            </MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={props.toggleModal}>
              <MDBIcon icon="ban" size="lg" className="mr-2" /> Cancel
            </MDBBtn>
          </Modal.Header>
        </form>
      </Modal>
    </Fragment>
  );
}
