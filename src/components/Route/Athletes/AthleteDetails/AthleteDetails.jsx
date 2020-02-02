import React, { Fragment, useState } from "react";
import GoBack from "../../../../helpers/GoBack";
import Card from "react-bootstrap/Card";
import { MDBBtn } from "mdbreact";
import EditInfoModal from "./EditInfoModal";
import Image from "react-bootstrap/Image";
import Workouts from "./Workouts";
import PersonalBest from "./PersonalBest";
import "./AthleteDetails.css";

export default function AthleteDetails({ id, info, getAthletes }) {
  const [isEditing, setisEditing] = useState(false);
  const { name, age, sex, email, photo, _id, phoneNumber, wods } = info;

  return (
    <Fragment>
      <GoBack />
      <EditInfoModal
        show={setisEditing}
        isShowing={isEditing}
        info={info}
        refresh={getAthletes}
      />
      <Card
        key={_id}
        className="rounded-0 mb-5 text-light"
        style={{ backgroundColor: "#353535" }}
      >
        <div eventkey={_id}>
          <Card.Body className="text-center">
            <div className="infoSection">
              <img
                alt={name}
                as={Image}
                src={photo}
                className="thumbnail"
                style={{
                  maxWidth: 200,
                  objectFit: "contain",
                  imageOrientation: "from-image"
                }}
              />
              <div className="ml-2">
                <Card.Title as={"h3"} className="mt-3">
                  {name}
                </Card.Title>
                <Card.Text className="text-white">
                  <span className="p-1 d-block">
                    <i className="fas fa-phone-square fa-lg"></i>{" "}
                    {phoneNumber.substring(0, 4)}-{phoneNumber.substring(4, 7)}-
                    {phoneNumber.substring(7, 10)}
                  </span>
                  <small className="text-muted">{email}</small>
                  <span style={{ display: "block" }}>
                    {" "}
                    Age: {age} | Sex: {sex}
                  </span>
                </Card.Text>
                <MDBBtn
                  color="warning"
                  size="sm"
                  onClick={() => setisEditing(!isEditing)}
                >
                  <i className="fas fa-user-edit fa-lg mr-1"></i> Edit
                </MDBBtn>
              </div>
            </div>
            <PersonalBest id={id} />
            <div className="addwod mt-3">
              <Workouts
                wods={wods}
                name={name}
                id={_id}
                updateWods={getAthletes}
              />
            </div>
          </Card.Body>
        </div>
      </Card>
    </Fragment>
  );
}
