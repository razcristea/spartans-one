import React, { Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import "./WodDetails.css";
import firstPlace from "./first_place_icon.png";
import secondPlace from "./second_place_icon.png";
import thirdPlace from "./third_place_icon.png";
import otherPlaces from "./other_places_icon.png";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

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

  const GoBackToWods = withRouter(({ history }) => (
    <MDBBtn
      className="go-back-to-wods-btn"
      size="sm"
      color="dark"
      onMouseDown={() => setTimeout(() => history.goBack(), 300)}
    >
      <span>Go Back</span>
    </MDBBtn>
  ));

  return (
    <Fragment>
      <GoBackToWods />
      <div className="text-center pb-5 mb-2">
        <div className="w-75 mx-auto m-3 p-3 wod-card-style headingStyle text-white font-weight-bold">
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
          <div className="p-1 m-2 w-100  mx-auto font-weight-bold card">
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
                        <Link
                          to={`/athletes/${athlete._id}`}
                          className="text-white link-styles style-table-name"
                        >
                          {athlete.name}
                        </Link>
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
            Nobody has done this Wod yet
          </div>
        )}
      </div>
    </Fragment>
  );
}
