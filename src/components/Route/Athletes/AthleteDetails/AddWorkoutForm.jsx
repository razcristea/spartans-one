import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Select from "./Select";
import { MDBBtn, MDBInput, MDBBtnGroup } from "mdbreact";
import Stopwatch from "./Stopwatch";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default function AddWorkoutForm({ count, _id }) {
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [availableWods, setAvailableWods] = useState([]);
  const [selectedWod, setSelectedWod] = useState("");
  const [showBtnGroup, setShowBtnGroup] = useState(true);
  const [stopWatchIsDisplayed, setStopWatchIsDisplayed] = useState(false);
  const [inputManualIsDisplayed, setInputManualIsDisplayed] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [nrOfReps, setNrOfReps] = useState(0);
  const [isReady, setIsReady] = useState(true);

  const saveWorkoutToAthlete = () => {
    console.log("Day: ", currentDay);
    console.log("Wod Name: ", selectedWod);
    console.log("Time: ", timerValue);
    console.log("NrOfReps: ", nrOfReps);
  };
  const validate = () => {
    if (!selectedWod || selectedWod === "default") return false;
    if (!timerValue) {
      if (!nrOfReps) return false;
    }
    if (!nrOfReps) {
      if (!timerValue) return false;
    }
    return true;
  };

  useEffect(() => {
    const today = new Date();
    const date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear();
    setCurrentDay(date);
    fetch(wodsApi)
      .then(response => response.json())
      .then(wods => setAvailableWods(wods));
  }, []);

  return (
    <React.Fragment>
      <Card>
        <div className="d-flex justify-content-around align-items-center mb-0 bg-dark p-3">
          <Accordion.Toggle
            as={Button}
            variant={!isAddingWorkout ? "success" : "danger"}
            size="sm"
            eventKey={1}
            onClick={() => setIsAddingWorkout(!isAddingWorkout)}
          >
            <div className="d-flex align-items-center">
              {!isAddingWorkout ? (
                <i className="fas fa-plus fa-2x mr-2"></i>
              ) : (
                <i className="fas fa-window-close fa-2x mr-2"></i>
              )}
              Workout
            </div>
          </Accordion.Toggle>

          <div className="ml-1 text-white">Wod Count : {count}</div>
        </div>
        <Accordion.Collapse eventKey={1}>
          <Card.Body className="bg-dark">
            <h4 className="bg-dark text-white font-size-lg mt-1 mb-4">
              <i className="far fa-calendar-check fa-lg mr-2"></i>Date:{" "}
              {currentDay}
            </h4>
            <Select
              options={availableWods}
              getValue={setSelectedWod}
              validate={validate}
              setIsReady={setIsReady}
            />
            <div className="mt-2 p-2">
              {!showBtnGroup ? (
                <MDBBtn
                  color="light"
                  size="sm"
                  outline
                  onClick={() => {
                    setShowBtnGroup(true);
                    setStopWatchIsDisplayed(false);
                    setInputManualIsDisplayed(false);
                  }}
                >
                  <i className="fas fa-stopwatch fa-lg mr-2"></i>
                  <i className="fas fa-slash"></i>
                  <i className="fas fa-keyboard fa-lg ml-2"></i>
                </MDBBtn>
              ) : null}

              {showBtnGroup ? (
                <MDBBtnGroup>
                  <MDBBtn
                    color="warning"
                    className="m-2"
                    onClick={() => {
                      setShowBtnGroup(false);
                      setStopWatchIsDisplayed(true);
                    }}
                  >
                    <i className="fas fa-stopwatch fa-2x"></i>
                  </MDBBtn>
                  <MDBBtn
                    color="secondary"
                    className="m-2"
                    onClick={() => {
                      setShowBtnGroup(false);
                      setInputManualIsDisplayed(true);
                    }}
                  >
                    <i className="fas fa-keyboard fa-2x"></i>
                  </MDBBtn>
                </MDBBtnGroup>
              ) : null}
              {stopWatchIsDisplayed ? (
                <Stopwatch
                  getValue={setTimerValue}
                  validate={validate}
                  setIsReady={setIsReady}
                />
              ) : null}
              {inputManualIsDisplayed ? (
                <MDBInput
                  onChange={e => {
                    setNrOfReps(parseInt(e.target.value));
                    validate() ? setIsReady(false) : setIsReady(true);
                  }}
                  type="text"
                  name="Time"
                  label="Time (default : 00:00)"
                  className="mx-auto"
                ></MDBInput>
              ) : null}
            </div>
            <div className="mt-2 p-2">
              <MDBInput
                onChange={e => {
                  setNrOfReps(parseInt(e.target.value));
                  validate() ? setIsReady(false) : setIsReady(true);
                }}
                type="number"
                name="nrOfReps"
                label="Number of Reps (default : 0)"
                className="mx-auto"
              ></MDBInput>
            </div>
            <div>
              <MDBBtn
                color="info"
                size="lg"
                onClick={saveWorkoutToAthlete}
                disabled={isReady}
              >
                <i className="fas fa-check-square fa-lg mr-1"></i> Finish & Save
                Workout
              </MDBBtn>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </React.Fragment>
  );
}