import React, { useState, useRef } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Modal from "react-bootstrap/Modal";
import "./AddWods.css";
import Spinner from "../../Athletes/AddAthleteModal/Spinner";
import Select from "react-select";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default function AddWods(props) {
  if (!props.options[0].value) props.options.shift();
  const exerciseNameRef = useRef(null);
  const exerciseRepsRef = useRef(null);
  const exerciseWeightFemaleRef = useRef(null);
  const exerciseWeightMaleRef = useRef(null);

  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [timecap, setTimecap] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleChange = selectedOption => {
    setSelectedType(selectedOption);
  };

  const addExercise = () => {
    const exercise = {
      name: exerciseNameRef.current.state.innerValue,
      reps: exerciseRepsRef.current.state.innerValue || 0,
      weight:
        exerciseWeightFemaleRef.current.state.innerValue +
        "/" +
        exerciseWeightMaleRef.current.state.innerValue +
        " " +
        "kg"
    };
    setExercises([...exercises, exercise]);
    exerciseNameRef.current.state.innerValue = "";
    exerciseRepsRef.current.state.innerValue = "";
    exerciseWeightFemaleRef.current.state.innerValue = "";
    exerciseWeightMaleRef.current.state.innerValue = "";
    enableAddButton();
  };
  const enableAddButton = () => {
    exerciseNameRef.current.state.innerValue
      ? setEnabled(false)
      : setEnabled(true);
  };

  const removeExercise = name => {
    setExercises(exercises.filter(exercise => exercise.name !== name));
  };

  const submitHandler = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
      const newWod = {
        name,
        type: selectedType.value.toUpperCase(),
        description,
        time: timecap,
        exercises
      };
      setShowSpinner(true);
      fetch(wodsApi, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newWod)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setShowSpinner(false);
          props.toggleModal();
          props.showServerResponse(
            `${name} workout has been added to the database!`
          );
        })
        .finally(() => {
          setTimeout(() => props.getWods(), 1500);
        })
        .catch(error => console.log(error));
    } else {
      e.target.className += " was-validated";
      const formElements = Array.from(form.elements);
      const firstInvalidElement = formElements.find(
        element => !element.validity.valid && element.required
      );
      firstInvalidElement.focus();
    }
  };
  return (
    <div>
      {showSpinner ? <Spinner /> : null}
      <Modal
        show
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="text-white modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            <MDBIcon icon="dumbbell" className="mr-2" /> Add Wod
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
          onSubmit={submitHandler}
          style={{
            backgroundColor: "#383838",
            border: "1px ridge white"
          }}
        >
          <Modal.Body className="text-white">
            <h5 className="headingStyle p-2 m-3 bg-dark text-white text-center">
              <MDBIcon icon="info" className="mr-2" /> Wod Info
            </h5>
            <MDBRow className="m-3 rounded border">
              <MDBCol md="4">
                <MDBInput
                  className="text-white addWodInput"
                  icon="pen"
                  type="text"
                  name="wodName"
                  label="Name"
                  labelClass="labelClass"
                  required
                  onChange={e => setName(e.target.value)}
                >
                  <div className="invalid-feedback ml-4 pl-3"></div>
                  <div className="valid-feedback ml-4 pl-3">Looks good!</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <Select
                  value={selectedType}
                  onChange={handleChange}
                  className="mx-auto w-100 mt-1"
                  required
                  options={props.options}
                  placeholder="Please Select a Type!"
                />
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  className="text-white addWodInput"
                  icon="align-left"
                  type="text"
                  name="description"
                  label="Description (ex: 21-15-9)"
                  labelClass="labelClass"
                  onChange={e => setDescription(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  className="text-white addWodInput"
                  icon="clock"
                  type="number"
                  name="time"
                  label="Time Cap"
                  labelClass="labelClass"
                  onChange={e => setTimecap(e.target.value)}
                ></MDBInput>
              </MDBCol>
            </MDBRow>
            <h5 className="headingStyle p-2 m-3 bg-dark text-white text-center">
              <MDBIcon icon="dumbbell" className="mr-2" /> Exercises
            </h5>
            <MDBRow className="m-3 pb-4 border">
              <MDBCol md="6">
                <MDBInput
                  ref={exerciseRepsRef}
                  className="text-white addWodInput"
                  icon=""
                  type="number"
                  name="reps"
                  label="Reps/Cal/m (Ex: 20)"
                  labelClass="labelClass"
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  ref={exerciseNameRef}
                  className="text-white addWodInput"
                  type="text"
                  name="exerciseName"
                  label="Name (Ex: Squats)"
                  labelClass="labelClass"
                  onBlur={enableAddButton}
                ></MDBInput>
              </MDBCol>
              <MDBCol md="6">
                <div className="text-center mt-2">Weight</div>
                <MDBInput
                  ref={exerciseWeightFemaleRef}
                  icon="female"
                  className="text-white addWodInput"
                  type="number"
                  name="weightFemale"
                  label="Female/Kg (default:0)"
                ></MDBInput>
                <MDBInput
                  ref={exerciseWeightMaleRef}
                  className="text-white addWodInput"
                  icon="male"
                  type="number"
                  name="weightMale"
                  label="Male/Kg (default:0)"
                ></MDBInput>
              </MDBCol>

              <MDBCol className="d-flex align-items-end flex-column bd-highlight example-parent">
                <MDBBtn
                  color="warning"
                  size="md"
                  className="mt-auto p-2 bd-highlight col-example text-white"
                  onClick={addExercise}
                  disabled={enabled}
                >
                  <MDBIcon icon="plus" size="lg" className="mr-1" /> Add
                  Exercise
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <h5 className="headingStyle p-2 m-3 bg-dark text-white text-center">
              <MDBIcon icon="eye" className="mr-2" /> Preview
            </h5>
            {exercises.map((exercise, i) => (
              <div
                key={i}
                className="mb-1 ml-5 mr-5 border-bottom d-flex justify-content-between align-items-center"
                style={{ fontSize: "13px" }}
              >
                <span className="ml-2" key={exercise.name}>
                  {exercise.reps ? exercise.reps : null} {exercise.name}{" "}
                  {exercise.weight === "/ kg" ? null : exercise.weight}
                </span>
                <MDBBtn
                  color="danger"
                  className="btn-rounded py-1 px-2"
                  style={{ fontSize: "10px" }}
                  onClick={() => {
                    removeExercise(exercise.name);
                  }}
                >
                  Remove
                </MDBBtn>
              </div>
            ))}
            <MDBCol md="12" className="mb-3 mt-3">
              <div className="custom-control custom-checkbox pl-3">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="checkbox"
                  value=""
                  id="invalidCheck"
                  required
                />
                <label className="custom-control-label" htmlFor="invalidCheck">
                  Check the box if the info submitted is correct
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </MDBCol>
          </Modal.Body>
          <Modal.Header className="modalFooter">
            <MDBBtn color="danger" size="sm" onClick={props.toggleModal}>
              <MDBIcon icon="ban" size="lg" className="mr-2" /> Cancel
            </MDBBtn>
            <MDBBtn color="success" size="sm" type="submit">
              <MDBIcon icon="share-square" size="lg" className="mr-2" /> Submit
            </MDBBtn>
          </Modal.Header>
        </form>
      </Modal>
    </div>
  );
}
