import React, { useState, useRef } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBBtnGroup
} from "mdbreact";
import Modal from "react-bootstrap/Modal";
import "./AddWods.css";
import Spinner from "../../Athletes/AddAthleteModal/Spinner";
import Select from "react-select";

// const wodsApi = "http://localhost:3000/wods/";
const wodsApi = "https://mypthelperapi.herokuapp.com/wods/";

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
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token")
        },
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
        onHide={props.toggleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="text-white modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            <MDBIcon icon="dumbbell" className="mr-2" /> Add Wod
          </Modal.Title>
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
            <h5 className="headingStyle p-2 ml-3 mr-3 mt-3 mb-0 bg-dark text-white text-center">
              <MDBIcon icon="dumbbell" className="mr-2" /> Exercises
            </h5>
            <MDBRow className="ml-3 mr-3 my-0 pb-3 border border-top-0">
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
                  color="light"
                  size="md"
                  className="mt-auto p-2 bd-highlight col-example text-dark"
                  onClick={addExercise}
                  disabled={enabled}
                >
                  <MDBIcon icon="plus" size="lg" className="mr-1" /> Add
                  Exercise
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <h5 className="headingStyle p-2 ml-3 mr-3 mt-1 bg-dark text-white text-center my-0">
              <MDBIcon icon="eye" className="mr-2" /> Preview
            </h5>
            <div
              className={
                exercises.length ? "border border-top-0 mx-3 my-0" : ""
              }
            >
              {exercises.map((exercise, i) => (
                <div
                  key={i}
                  className="mb-1 d-flex justify-content-between align-items-center bg-light text-dark mx-1 font-weight-bold"
                  style={{ fontSize: "13px" }}
                  draggable
                  onDrag={e => console.log(e.screenY)}
                >
                  <span className="ml-2" key={exercise.name}>
                    {exercise.reps ? exercise.reps : null} {exercise.name}{" "}
                    {exercise.weight === "/ kg" ? null : exercise.weight}
                  </span>
                  <MDBBtnGroup>
                    <MDBBtn
                      color="danger"
                      className="btn-rounded py-1 px-2 mr-4"
                      style={{ fontSize: "10px" }}
                      onClick={() => {
                        removeExercise(exercise.name);
                      }}
                    >
                      Remove
                    </MDBBtn>
                    <MDBBtn
                      color="warning"
                      className="btn-rounded py-1 px-3"
                      style={{ fontSize: "10px" }}
                      onClick={() => {
                        console.log(exercise);
                      }}
                    >
                      Edit
                    </MDBBtn>
                  </MDBBtnGroup>
                </div>
              ))}
            </div>
            <h5 className="headingStyle p-2 mx-3 mt-3 mb-0 bg-dark text-white text-center">
              <MDBIcon icon="info" className="mr-2" /> Wod Info
            </h5>
            <MDBRow className="mx-3 my-0 border border-top-0">
              <MDBCol md="6">
                <Select
                  value={selectedType}
                  onChange={handleChange}
                  className="mx-auto w-75 mt-4"
                  required
                  options={props.options}
                  placeholder="Please Select a Type!"
                />
              </MDBCol>
              <MDBCol md="6">
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
              <MDBCol md="6">
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
              <MDBCol md="6">
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
            <MDBCol md="12" className="mb-3 mt-5">
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
