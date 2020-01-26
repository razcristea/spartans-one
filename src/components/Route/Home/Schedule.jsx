import React, { useState, useEffect } from "react";
import MyCalendar from "./Calendar/MyCalendar";
import Appointments from "./Appointments/Appointments";
import { MDBBtn, MDBIcon } from "mdbreact";

const scheduleUrl = "https://theboxathletes.herokuapp.com/appointments/";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState("");
  const [lookingAtSchedule, setLookingAtSchedule] = useState(false);

  const checkAppointments = async selectedDate => {
    try {
      // querry the selected date from DB and store it in appointments
      const response = await fetch(scheduleUrl);
      const data = await response.json();
      const dateCheck = data.find(entry => {
        return entry.date === selectedDate;
      });
      dateCheck ? setAppointments(dateCheck) : setAppointments(0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAppointments(selectedDate);
  }, [selectedDate]);

  return (
    <div className="text-center pb-5 mb-2">
      {!lookingAtSchedule ? (
        <div>
          <div className="headingStyle">
            <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
              <i className="fas fa-clipboard-list mr-2"></i>Schedule
            </h3>
          </div>
          <MyCalendar getDate={setSelectedDate} />
          {!appointments ? (
            <div className="p-3 m-2 w-100 border mx-auto headingStyle">
              <h3 className="text-center text-white p-2 m-1 w-100 mx-auto">
                <i className="far fa-calendar-times mr-2"></i>
                {selectedDate}
              </h3>
              <h5 className="mb-2">No Appointments</h5>
              <MDBBtn
                color="success"
                size="lg"
                onClick={() => setLookingAtSchedule(true)}
              >
                <MDBIcon icon="plus" className="mr-2" size="lg"></MDBIcon>Add
                Appointments
              </MDBBtn>
            </div>
          ) : (
            <div className="p-3 m-2 w-100 border mx-auto headingStyle">
              <h3 className="text-center text-white p-2 m-1 w-100 mx-auto">
                <i className="far fa-calendar-check mr-2"></i>
                {selectedDate}
              </h3>
              <h5 className="mb-2">
                You have {appointments.entries.length} appointment(s)
              </h5>
              <MDBBtn
                color="warning"
                size="lg"
                onClick={() => setLookingAtSchedule(true)}
              >
                <MDBIcon icon="search" className="mr-2" size="lg"></MDBIcon>View
                Appointments
              </MDBBtn>
            </div>
          )}
        </div>
      ) : (
        <Appointments
          data={appointments}
          date={selectedDate}
          goBack={setLookingAtSchedule}
        />
      )}
    </div>
  );
}
