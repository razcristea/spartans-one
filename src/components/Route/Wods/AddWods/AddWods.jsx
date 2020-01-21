import React, { Fragment, useState, useRef } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";
import "./AddWods.css";
import Select from "../../Athletes/AthleteDetails/Select";

export default function AddWods(props) {
  const exerciseNameRef = useRef(null);
  const exerciseRepsRef = useRef(null);
  const exerciseWeightFemaleRef = useRef(null);
  const exerciseWeightMaleRef = useRef(null);

  const [exercisesInState, setExercisesInState] = useState([]);

  const addExercise = () => {
    props.exercises.push({
      name: exerciseNameRef.current.state.innerValue,
      reps: exerciseRepsRef.current.state.innerValue,
      weight:
        exerciseWeightFemaleRef.current.state.innerValue +
        "/" +
        exerciseWeightMaleRef.current.state.innerValue +
        " " +
        "kg"
    });
    setExercisesInState(props.exercises);
  };

  const addNewWod = () => {
    console.log("newWod");
  };
  // console.log(props);
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
          className="needs-validation"
          noValidate
          style={{
            backgroundColor: "#383838",
            border: "1px ridge white"
          }}
        >
          <Modal.Body className="text-light">
            <h5 className="mt-2 mb-2 p-2 text-center border">
              <MDBIcon icon="info" size="lg" className="mr-2" /> Wod Info
            </h5>
            <MDBRow className="m-3 border">
              <MDBCol md="4">
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
              <MDBCol md="4">
                <Select
                  options={props.options}
                  getValue={props.getValue}
                  defaultValue="Select Type"
                />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  className="text-white"
                  icon="align-left"
                  type="text"
                  name="description"
                  label="Description"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4">
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
            {exercisesInState.map((exercise, i) => (
              <p key={i} className="text-center p-1 ml-5 mr-5">
                {exercise.reps} {exercise.name}{" "}
                {exercise.weight === "/ kg" ? null : exercise.weight}
              </p>
            ))}
            <MDBRow className="m-3 pb-4 border">
              <MDBCol md="6">
                <MDBInput
                  ref={exerciseNameRef}
                  className="text-white"
                  type="text"
                  name="exerciseName"
                  label="Name (Ex: Squats)"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  ref={exerciseRepsRef}
                  className="text-white"
                  icon=""
                  type="number"
                  name="reps"
                  label="Reps"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6">
                Weight
                <MDBInput
                  ref={exerciseWeightFemaleRef}
                  icon="female"
                  className="text-white"
                  type="number"
                  name="weightFemale"
                  label="Female/Kg (default:0)"
                ></MDBInput>
                <MDBInput
                  ref={exerciseWeightMaleRef}
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
                  className="mt-auto p-2 bd-highlight col-example"
                  onClick={addExercise}
                >
                  <MDBIcon icon="plus" size="lg" /> Add
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </Modal.Body>
          <Modal.Header className="modalFooter">
            <MDBBtn color="success" size="sm" type="submit" onClick={addNewWod}>
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
