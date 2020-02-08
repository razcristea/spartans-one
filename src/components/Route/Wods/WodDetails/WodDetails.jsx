import React, { Fragment, useEffect, useState } from "react";
import GoBack from "../../../../helpers/GoBack";
import { NavLink } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "./WodDetails.css";

import firstPlace from "./assets/first_place_icon.png";
import secondPlace from "./assets/second_place_icon.png";
import thirdPlace from "./assets/third_place_icon.png";
import otherPlaces from "./assets/other_places_icon.png";

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
          if (type === "SPECIAL") {
            bestTime = `${Math.floor(bestTime / 60)}' ${bestTime % 60}''`;
            bestReps = `${bestReps}`;
            athlete.test = `${bestTime} | ${bestReps}`;
          }
          found = true;
        }
      });
      return found;
    });
    type === ("FOR TIME" || "CHIPPER")
      ? filteredAthletes.sort((a, b) => (a.test > b.test ? 1 : -1))
      : filteredAthletes.sort((a, b) => (a.test > b.test ? -1 : 1));

    filteredAthletes.forEach((athlete, i) => {
      switch (i) {
        case 0:
          athlete.icon = firstPlace;
          break;
        case 1:
          athlete.icon = secondPlace;
          break;
        case 2:
          athlete.icon = thirdPlace;
          break;
        default:
          athlete.icon = otherPlaces;
          break;
      }
    });

    setNeededAthletes(filteredAthletes);
  }, [athletes, name, type]);

  return (
    <Fragment>
      <GoBack />
      <div className="text-center pb-5 mb-2">
        <div className="mx-auto m-2 p-3 wod-card-style headingStyle text-white font-weight-bold mediaQuery">
          <h3 className="p-2">{name}</h3>
          <h5>{type}</h5>
          {description !== "N/A" ? <p>Details: {description}</p> : null}
          {time ? <h5>Timecap: {time} min</h5> : null}
          <div className=" mt-2 pt-2 ">
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
        <h4 className="fame-style  mx-auto w-100 p-2 text-center">
          - Hall Of Fame -
        </h4>
        {neededAthletes.length ? (
          <div className="p-1 m-2 bigScreen mx-auto font-weight-bold card">
            <MDBTable className="table-striped table-dark  table-hover table-wod-style my-auto">
              <MDBTableHead>
                <tr className="table-head-style">
                  <th>Rank</th>
                  <th>Athlete</th>
                  <th>Result</th>
                </tr>
              </MDBTableHead>
              {neededAthletes.map((athlete, i) => {
                return (
                  <MDBTableBody key={i}>
                    <tr>
                      <td className="rows-style">
                        <img
                          src={athlete.icon ? athlete.icon : otherPlaces}
                          alt=""
                        />
                      </td>

                      <td className="rows-style ">
                        <NavLink
                          to={`/athletes/${athlete._id}`}
                          className="text-white link-styles style-table-name"
                        >
                          {athlete.name}
                        </NavLink>
                      </td>
                      <td className="rows-style">
                        {type === ("FOR TIME" || "CHIPPER") ? (
                          <span className="font-weight-bold">
                            {Math.floor(athlete.test / 60)}' {athlete.test % 60}
                            ''
                          </span>
                        ) : (
                          <span className="font-weight-bold">
                            {athlete.test} reps
                          </span>
                        )}
                      </td>
                    </tr>
                  </MDBTableBody>
                );
              })}
            </MDBTable>
          </div>
        ) : (
          <div className="text-center text-white mt-3 font-weight-bold">
            <i className="fas fa-flushed mr-1 fa-2x"></i> Nobody has done this
            Wod yet! <i className="far fa-meh-rolling-eyes ml-1 fa-2x"></i>
          </div>
        )}
      </div>
    </Fragment>
  );
}
