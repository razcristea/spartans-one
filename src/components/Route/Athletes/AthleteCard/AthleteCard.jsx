import React from "react";
import "../AthleteCard/AthleteCard.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function AthleteCard({ athlete }) {
  athlete.phoneNumber = "0742874381";
  return (
    <div className="card text-center card-item">
      <div className="header-card-wraper">
        <img src={athlete.photo} alt="" className="image-card" />
        <h2 className="card-name">{athlete.name}</h2>
        <h5 className="card-age">
          {athlete.age} |<span> </span>
          {athlete.sex === "M" ? (
            <i className="fas fa-mars fa-lg"></i>
          ) : (
            <i className="fas fa-venus fa-lg"></i>
          )}
        </h5>
      </div>
      <p className="card-phone">
        <i className="fas fa-phone-square fa-lg"></i>{" "}
        {athlete.phoneNumber.substring(0, 4)}-
        {athlete.phoneNumber.substring(4, 7)}-
        {athlete.phoneNumber.substring(7, 10)}
      </p>
      <p className="card-email text-muted">
        <i className="fas fa-envelope fa-lg"></i> {athlete.email}
      </p>
      <ButtonGroup size="sm">
        <Button variant="warning" size="sm" className="athlete-card-button">
          <i className="fas fa-user-edit fa-lg"></i> Edit
        </Button>
        <Button variant="danger" size="sm" className="athlete-card-button">
          <i className="fas fa-user-slash fa-lg"></i> Delete
        </Button>
        <Link to={`/athletes/${athlete._id}`}>
          <Button
            variant="secondary"
            size="sm"
            className="athlete-card-button ml-0"
          >
            <i className="fas fa-dumbbell fa-lg"></i> PR's
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
}
