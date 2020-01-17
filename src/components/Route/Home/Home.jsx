import React from "react";
import MyCalendar from "./Calendar/MyCalendar";
import { MDBBtn } from "mdbreact";

export default function Home() {
  return (
    <div className="text-center">
      <h3 className="text-center text-white p-3 m-1 w-100 mx-auto bg-dark">
        <i className="fas fa-clipboard-list mr-2"></i>Schedule
      </h3>
      <MyCalendar />
      <div className="p-5 m-2 w-75 border mx-auto font-weight-bold">
        No Appointments for today!
        <MDBBtn color="success">Add Appointment</MDBBtn>
      </div>
    </div>
  );
}
