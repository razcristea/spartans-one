import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import "./WodDetails.css";

export default function WodDetails({ wodInfo, athletes }) {
  const { description, type, time, name, exercises } = wodInfo;
  const [neededAthletes, setNeededAthletes] = useState([]);
  useEffect(() => {
    let filteredAthletes = athletes.filter(athlete => {
      let found = false;
      let bestTime = Infinity;
      let bestReps = -Infinity;
      athlete.wods.forEach(wod => {
        if (wod.name === name) {
          if (wod.time < bestTime) bestTime = wod.time;
          if (wod.reps > bestReps) bestReps = wod.reps;
          type === ("FOR TIME" || "CHIPPER")
            ? (athlete.test = bestTime)
            : (athlete.test = bestReps);

          found = true;
        }
      });
      return found && athlete;
    });
    type === ("FOR TIME" || "CHIPPER")
      ? filteredAthletes.sort((a, b) => (a.test > b.test ? 1 : -1))
      : filteredAthletes.sort((a, b) => (a.test > b.test ? -1 : 1));
    setNeededAthletes(filteredAthletes);
  }, [athletes, name, type]);

  const GoBackToWods = withRouter(({ history }) => (
    <MDBBtn
      className="go-back-to-wods-btn"
      size="sm"
      color="dark"
      onMouseDown={() => setTimeout(() => history.goBack(), 300)}
    >
      <i className="fas fa-backward"></i> <span> Back</span>
    </MDBBtn>
  ));

  return (
    <Fragment>
      <GoBackToWods />
      <div className="text-center pb-5 mb-2">
        <div className="card w-75 mx-auto m-3 p-2">
          <h3>{name}</h3>
          <h5>{type}</h5>
          {description !== "N/A" ? <p>Details: {description}</p> : null}
          {time ? <h5>Timecap: {time} min</h5> : null}
          <div className="textWhite m-2 p-2 border">
            {exercises.map((exercise, i) => {
              return (
                <p key={i}>
                  {exercise.reps ? (
                    <span className="m-2">{exercise.reps}</span>
                  ) : null}
                  <span className="m-2">{exercise.name}</span>
                  {exercise.weight !== "0" && exercise.weight !== "/ kg" ? (
                    <span className="m-2">{exercise.weight}</span>
                  ) : null}
                </p>
              );
            })}
          </div>
        </div>
        <h4>Hall of fame</h4>
        {neededAthletes.map((athlete, i) => {
          return (
            <div
              key={i}
              className="border p-2 m-2 w-50 mx-auto font-weight-bold"
            >
              {athlete.name}:{" "}
              {type === ("FOR TIME" || "CHIPPER")
                ? `${Math.floor(athlete.test / 60)}min ${athlete.test % 60}sec`
                : `${athlete.test}reps`}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
