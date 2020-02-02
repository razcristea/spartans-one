import React, { useState, useEffect } from "react";
import MyCalendar from "./Calendar/MyCalendar";
import Appointments from "./Appointments/Appointments";
import { MDBBtn, MDBIcon } from "mdbreact";
import Loader from "../../../helpers/Loader";

const scheduleUrl = "https://theboxathletes.herokuapp.com/appointments/";

function Schedule() {
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState("");
  const [lookingAtSchedule, setLookingAtSchedule] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const checkAppointments = async selectedDate => {
    try {
      // querry the selected date from DB and store it in appointments
      const response = await fetch(scheduleUrl);
      const data = await response.json();
      const dateCheck = data.find(entry => {
        return entry.date === selectedDate;
      });
      if (dateCheck) {
        dateCheck.entries.sort((a, b) => {
          return parseInt(a.startHour.slice(0, 2)) <
            parseInt(b.startHour.slice(0, 2))
            ? -1
            : 1;
        });
      }
      dateCheck ? setAppointments(dateCheck) : setAppointments(0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setShowLoading(true);
    checkAppointments(selectedDate);
    setTimeout(() => {
      setShowLoading(false);
    }, 300);
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
            <div className="p-4 m-2 w-100 border mx-auto headingStyle">
              {showLoading ? (
                <Loader />
              ) : (
                <div>
                  <h3 className="text-center text-white p-2 m-1 w-100 mx-auto">
                    <i className="far fa-calendar-times mr-2"></i>
                    {selectedDate}
                  </h3>
                  <h5 className="mb-3">No Appointments</h5>
                  <MDBBtn
                    color="success"
                    size="sm"
                    onClick={() => setLookingAtSchedule(true)}
                  >
                    <MDBIcon icon="plus" className="mr-2" size="lg"></MDBIcon>
                    Add Appointments
                  </MDBBtn>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 m-2 w-100 border mx-auto headingStyle">
              {showLoading ? (
                <Loader />
              ) : (
                <div>
                  <h3 className="text-center text-white p-2 m-1 w-100 mx-auto">
                    <i className="far fa-calendar-check mr-2"></i>
                    {selectedDate}
                  </h3>
                  <h5 className="mb-3">
                    You have {appointments.entries.length} appointment(s)
                  </h5>
                  <MDBBtn
                    color="warning"
                    size="sm"
                    onClick={() => setLookingAtSchedule(true)}
                  >
                    <MDBIcon icon="search" className="mr-2" size="lg"></MDBIcon>
                    View Appointments
                  </MDBBtn>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <Appointments
          data={appointments}
          date={selectedDate}
          refresh={checkAppointments}
          goBack={setLookingAtSchedule}
        />
      )}
    </div>
  );
}

export default React.memo(Schedule);
