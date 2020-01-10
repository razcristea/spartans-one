import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Select from "./Select";
import { MDBBtn, MDBInput } from "mdbreact";
import Stopwatch from "./Stopwatch";

const TestSelect = [
  { name: "Wod1" },
  { name: "Wod2" },
  { name: "Wod3" },
  { name: "Wod4" }
];

export default function AddWorkoutForm({ count }) {
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [selectedWod, setSelectedWod] = useState("");
  const [timerValue, setTimerValue] = useState(0);
  const [nrOfReps, setNrOfReps] = useState(0);

  const saveWorkoutToAthlete = () => {
    console.log("Day: ", currentDay);
    console.log("Wod Name: ", selectedWod);
    console.log("Time: ", timerValue);
    console.log("NrOfReps: ", nrOfReps);
  };
  const validate = () => {};

  useEffect(() => {
    const today = new Date();
    const date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear();
    setCurrentDay(date);
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
            <h3 className="bg-dark text-white font-size-lg mt-4 mb-4">
              <i className="far fa-calendar-check fa-lg mr-2"></i>Date:{" "}
              {currentDay}
            </h3>
            <Select options={TestSelect} getValue={setSelectedWod} />
            <Stopwatch getValue={setTimerValue} />
            <MDBInput
              value={nrOfReps}
              onChange={e => setNrOfReps(parseInt(e.target.value))}
              type="number"
              name="nrOfReps"
              label="Number of Reps: "
              className="mx-auto"
            ></MDBInput>
            <div onClick={validate}>
              <MDBBtn color="info" size="lg" onClick={saveWorkoutToAthlete}>
                <i className="fas fa-check-square fa-lg mr-2"></i> Finish & Save
                Workout
              </MDBBtn>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </React.Fragment>
  );
}
