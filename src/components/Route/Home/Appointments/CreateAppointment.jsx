import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBModalHeader,
  MDBModalBody,
  MDBModal,
  MDBModalFooter,
  MDBBtn,
  MDBInput
} from "mdbreact";
import Select from "react-select";

export default function CreateAppointment({ toggle, isShowing }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    fetch("https://theboxathletes.herokuapp.com/athletes/")
      .then(response => response.json())
      .then(data => {
        const myAthletes = data.map(athlete => ({
          value: athlete.name,
          label: athlete.name
        }));
        setSelectOptions(myAthletes);
      });
  }, []);

  const autoChangeEndValue = startValue => {
    let result = (parseInt(startValue.split(":").join("")) + 100).toString();
    if (parseInt(result) < 1000) {
      result = 0 + parseInt(result).toString();
    }
    result = result.slice(0, 2) + ":" + result.slice(2);

    setEnd(result);
  };

  const handleSelectChange = selectedOptions => {
    if (!setSelectOptions) {
      return;
    }
    const myOptions = selectedOptions.map(option => option.value);
    let result = myOptions.join(", ");
    setParticipants(result);
  };

  const handleCreateAppointment = () => {
    const myPayload = {
      startHour: start,
      endHour: end,
      attendees: participants
    };
    console.log(myPayload);
  };

  return (
    <MDBContainer className="border">
      <MDBModal isOpen={isShowing} toggle={() => toggle(false)} centered close>
        <MDBModalHeader
          className="border bg-dark text-white"
          toggle={() => toggle(false)}
        >
          <i className="far fa-calendar-check mr-2"></i>{" "}
          <span style={{ fontWeight: "500" }}>Create Appointment</span>
        </MDBModalHeader>
        <MDBModalBody
          className="text-center border"
          style={{ backgroundColor: "#383838" }}
        >
          <h5 className="headingStyle p-2 m-3 bg-dark text-white">
            <i className="far fa-clock mr-2"></i> Pick Start/End Hour
          </h5>
          <div className="mt-5 d-flex inline align-items-center justify-content-center">
            <MDBInput
              valueDefault="07:00"
              type="time"
              name="start"
              step={1800}
              label="Start"
              onChange={e => {
                setStart(e.target.value);
                autoChangeEndValue(e.target.value);
              }}
            ></MDBInput>
            <div className="ml-3 mr-3"></div>
            <MDBInput
              value={end}
              type="time"
              name="end"
              step={1800}
              label="End"
              onChange={e => setEnd(e.target.value)}
            ></MDBInput>
          </div>
          <p className="text-muted text-center w-75 small mx-auto mb-5">
            <em>
              Hint: Start Hour can't be later than End Hour! End Hour will
              default to Start Hour + 1 if nothing is chosen in the field!
            </em>
          </p>
          <h5 className="headingStyle p-2 m-3 mb-5 bg-dark text-white">
            <i className="fas fa-user-plus mr-2"></i> Add Participants
          </h5>
          <Select
            className="m-4"
            options={selectOptions}
            isMulti
            placeholder="Select Athletes..."
            isSearchable
            onChange={handleSelectChange}
            style={{ zIndex: 1000 }}
          />
          <p className="text-muted text-center w-75 small mx-auto mt-3">
            <em>Hint: You can select multiple athletes (1 is required!)</em>
          </p>
        </MDBModalBody>
        <MDBModalFooter className="bg-dark border d-flex justify-content-around">
          <MDBBtn color="danger" size="sm" onClick={() => toggle(false)}>
            <i className="fas fa-ban mr-1"></i> Cancel
          </MDBBtn>
          <MDBBtn color="success" size="sm" onClick={handleCreateAppointment}>
            <i className="fas fa-share-square mr-1"></i> Submit
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
