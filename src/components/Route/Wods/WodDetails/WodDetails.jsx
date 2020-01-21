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
      let bestTime = 10000000000000;
      athlete.wods.forEach(wod => {
        if (wod.time < bestTime) bestTime = wod.time;
        if (wod.name === name) {
          type === ("FOR TIME" || "CHIPPER")
            ? (athlete.test = bestTime)
            : (athlete.test = wod.reps);

          found = true;
        }
      });
      return found && athlete.wods;
    });
    type === ("FOR TIME" || "CHIPPER")
      ? filteredAthletes.sort((a, b) => (a.test > b.test ? 1 : -1))
      : filteredAthletes.sort((a, b) => (a.test > b.test ? -1 : 1));

    if (filteredAthletes.length >= 1) filteredAthletes[0].icon = firstPlace;
    if (filteredAthletes.length >= 2) filteredAthletes[1].icon = secondPlace;
    if (filteredAthletes.length >= 3) filteredAthletes[2].icon = thirdPlace;

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
        <div className="card w-50 mx-auto m-3 p-2 wod-card-style">
          <h3 className="p-2">{name}</h3>
          <h5>{type}</h5>
          {description !== "N/A" ? <p>Details: {description}</p> : null}
          {time ? <h5>Timecap: {time} min</h5> : null}
          <div className=" m-2 p-2 exercise-style">
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
        <h4 className="fame-style  mx-auto w-50 p-2 text-center">
          ~ Hall Of Fame ~
        </h4>
        <div className="p-2 m-2 w-75  mx-auto font-weight-bold">
          <MDBTable className=" table-striped table-dark  table-hover table-wod-style">
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

                    <Link
                      to={`/athletes/${athlete._id}`}
                      className="text-white link-styles"
                    >
                      <td className="rows-style style-table-name">
                        {athlete.name}
                      </td>
                    </Link>
                    <td className="rows-style">
                      {type === ("FOR TIME" || "CHIPPER")
                        ? `${Math.floor(athlete.test / 60)}min ${athlete.test %
                            60}sec`
                        : `${athlete.test}reps`}
                    </td>
                  </tr>
                </MDBTableBody>
              );
            })}
          </MDBTable>
        </div>
      </div>
    </Fragment>
  );
}
