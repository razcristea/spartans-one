import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBModalHeader,
  MDBModalBody,
  MDBModal,
  MDBModalFooter,
  MDBBtn
} from "mdbreact";
import Select from "react-select";
import Spinner from "../../Athletes/AddAthleteModal/Spinner";

export default function EditAppointment({ data, date, dateId, toggle }) {
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [participants, setParticipants] = useState(data.attendees);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetch("https://theboxathletes.herokuapp.com/athletes/")
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        const myAthletes = data.map(athlete => ({
          value: athlete.name,
          label: athlete.name
        }));
        const currentAthletes = participants.split(", ");
        const filteredResult = myAthletes.filter(athlete =>
          currentAthletes.includes(athlete.value)
        );

        const filteredOptions = myAthletes.filter(
          athlete => !currentAthletes.includes(athlete.value)
        );

        setSelectValue(filteredResult);
        setSelectOptions(filteredOptions);
      });
  }, [participants]);

  const handleSelectChange = selectOptions => {
    console.log(selectOptions);

    if (!selectOptions) {
      return;
    }
    const myOptions = selectOptions.map(option => option.value);
    let result = myOptions.join(", ");
    setParticipants(result);
  };

  const handleEditAppointment = () => {
    console.log("Submit changes clicked!");
  };

  return (
    <div>
      {showSpinner ? <Spinner /> : null}
      <MDBContainer>
        <MDBModal isOpen={true} toggle={() => toggle(false)} centered>
          <MDBModalHeader className="border bg-dark text-white modalHeader">
            <i className="far fa-clock mr-2"></i>{" "}
            <span style={{ fontWeight: "500" }}>
              {date} | {data.start}-{data.end}{" "}
            </span>
          </MDBModalHeader>
          <MDBModalBody
            className="text-center border"
            style={{
              backgroundColor: "#383838",
              overflow: "auto"
            }}
          >
            <h5 className="headingStyle p-2 m-3 mb-2 bg-dark text-white mt-5">
              <i className="fas fa-user-edit mr-2"></i> Edit Participants
            </h5>
            <p className="text-muted text-center w-75 mx-auto small mt-4 mb-4">
              <em>Current: {data.attendees}</em>
            </p>
            <Select
              className="mt-5 mb-5"
              options={selectOptions}
              isMulti
              value={selectValue}
              placeholder="Select Athletes..."
              isSearchable
              onChange={handleSelectChange}
              style={{ zIndex: 1000 }}
            />
            <p className="text-muted text-center w-75 mx-auto small mt-5 mb-4">
              <em>
                Hint: You can either add more athletes or remove the ones that
                you currently have listed, if they changed theire mind or
                something :)
              </em>
            </p>
          </MDBModalBody>
          <MDBModalFooter className="bg-dark border modalFooter">
            <MDBBtn
              color="danger"
              size="sm"
              onClick={() => toggle(false)}
              className="mr-1"
            >
              <i className="fas fa-ban mr-1"></i> Cancel
            </MDBBtn>
            <MDBBtn color="success" size="sm" onClick={handleEditAppointment}>
              <i className="fas fa-share-square mr-1"></i> Submit
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </div>
  );
}
