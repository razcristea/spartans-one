import React, { useEffect, useState } from "react";

export default function WodDetails({ wodInfo, athletes }) {
  const { description, type, time, name, exercises } = wodInfo;
  const [neededAthletes, setNeededAthletes] = useState([]);
  useEffect(() => {
    let filteredAthletes = athletes.filter(athlete => {
      let found = false;
      athlete.wods.forEach(wod => {
        if (wod.name === name) {
          found = true;
        }
      });
      return found && athlete.name;
    });
    setNeededAthletes(filteredAthletes);
  }, [athletes, name]);

  return (
    <div className="text-center pb-5 mb-2">
      <div className="card w-75 mx-auto m-3 p-2">
        <h3>{name}</h3>
        <h5>{type}</h5>
        <div>Details: {description}</div>
        <div className="text-muted">Time Cap: {time} min</div>
        <div className="textWhite m-2 p-2 border">
          {exercises.map((exercise, i) => {
            return (
              <p key={i}>
                {exercise.reps ? (
                  <span className="m-2">{exercise.reps}</span>
                ) : null}
                <span className="m-2">{exercise.name}</span>
                {exercise.weight ? (
                  <span className="m-2">{exercise.weight}kg</span>
                ) : null}
              </p>
            );
          })}
        </div>
      </div>
      <h4>Hall of fame</h4>
      {neededAthletes.map((athlete, i) => {
        return (
          <div key={i} className="border p-2 m-2 w-50 mx-auto font-weight-bold">
            {athlete.name}
          </div>
        );
      })}
    </div>
  );
}
