import React from "react";
import "../AthleteCard/AthleteCard.css";
import Button from "react-bootstrap/Button";

export default function AthleteCard({ athlete }) {
  console.log(athlete);
  return (
    <div className="card text-center card-item">
      <div className="header-card-wraper">
        <img src={athlete.photo} alt="" className="image-card" />
        <h2 className="card-name">{athlete.name}</h2>
        <h5 className="card-age">
          Age {athlete.age}
          <br />{" "}
          {athlete.sex === "M" ? (
            <i className="fas fa-mars fa-sm"></i>
          ) : (
            <i className="fas fa-venus fa-sm"></i>
          )}
        </h5>
      </div>
      <p className="card-email">
        Email:
        <br /> {athlete.email}
      </p>
      <Button variant="secondary" size="sm" className="athlete-card-button">
        Details
      </Button>
    </div>
  );
}
