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
import Spinner from "../../Athletes/AddAthleteModal/Spinner";

function CreateAppointment({
  toggle,
  isShowing,
  data,
  date,
  refresh,
  setDisplayAlert,
  setAlertMesage
}) {
  const [start, setStart] = useState("07:00");
  const [end, setEnd] = useState("08:00");
  const [selectOptions, setSelectOptions] = useState([]);
  const [participants, setParticipants] = useState(null);

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
    if (!start || !participants) {
      return;
    }
    if (data) {
      // * if there are existing entries for that day
      const myPayload = {
        startHour: start,
        endHour: end,
        attendees: participants
      };
      setShowSpinner(true);
      fetch(`https://theboxathletes.herokuapp.com/appointments/${data._id} `, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(myPayload)
      })
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          toggle(false);
          setDisplayAlert(true);
          if (data.error) {
            throw data.error;
          }
          setAlertMesage(data.success);
        })
        .then(() => refresh(date))
        .catch(err => {
          setAlertMesage(err);
        })
        .finally(() =>
          setTimeout(() => {
            setAlertMesage("");
            setDisplayAlert(false);
          }, 1500)
        );
    } else {
      // * if this is the first entry in the day
      const myPayload = {
        date: date,
        entries: [{ startHour: start, endHour: end, attendees: participants }]
      };
      setShowSpinner(true);
      fetch(`https://theboxathletes.herokuapp.com/appointments/`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(myPayload)
      })
        .then(response => response.json())
        .then(data => {
          setShowSpinner(false);
          toggle(false);
          setDisplayAlert(true);
          setAlertMesage(data.success);
        })
        .then(() => refresh(date))
        .finally(() =>
          setTimeout(() => {
            setAlertMesage("");
            setDisplayAlert(false);
          }, 1500)
        )
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
      {showSpinner ? <Spinner /> : null}
      <MDBContainer className="border">
        <MDBModal
          isOpen={isShowing}
          toggle={() => toggle(false)}
          centered
          fullHeight
        >
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
    </div>
  );
}

export default React.memo(CreateAppointment);
