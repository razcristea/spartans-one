import React from "react";
import "../AthleteCard/AthleteCard.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { MDBBtn } from "mdbreact";
import { NavLink } from "react-router-dom";

export default function AthleteCard({ athlete, toggleWillDeleteModal }) {
  return (
    <div className="card text-center card-item">
      <NavLink to={`/athletes/${athlete._id}`} className="card-link">
        <div className="header-card-wraper pb-1">
          <img src={athlete.photo} alt="" className="image-card" />
          <h2 className="card-name">{athlete.name}</h2>
          <h5 className="card-age">
            {athlete.age}|<span> </span>
            {athlete.sex === "M" ? (
              <i className="fas fa-mars fa-lg"></i>
            ) : (
              <i className="fas fa-venus fa-lg"></i>
            )}
          </h5>
        </div>
      </NavLink>
      <p className="card-phone mt-1">
        <i className="fas fa-phone-square fa-lg"></i>{" "}
        {athlete.phoneNumber.substring(0, 4)}-
        {athlete.phoneNumber.substring(4, 7)}-
        {athlete.phoneNumber.substring(7, 10)}
      </p>
      <p className="card-email text-muted small">
        <i className="fas fa-envelope fa-lg"></i> {athlete.email}
      </p>
      <p>
        <i className="fas fa-birthday-cake mr-1 fa-lg"></i>
        {athlete.birthday
          .split("-")
          .reverse()
          .join("-")}
      </p>
      <ButtonGroup aria-label="Action Buttons" className="mx-auto mb-2">
        <MDBBtn
          color="danger"
          size="sm"
          className="m-1"
          onClick={() => toggleWillDeleteModal(athlete._id)}
        >
          <i className="mr-1 fas fa-user-slash fa-lg"></i> Delete
        </MDBBtn>
        <NavLink to={`/athletes/${athlete._id}`}>
          <MDBBtn color="default" size="sm" className="m-1">
            <i className="fas fa-dumbbell fa-lg mr-1"></i> Details
          </MDBBtn>
        </NavLink>
      </ButtonGroup>
    </div>
  );
}
