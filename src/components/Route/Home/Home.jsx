import React from "react";
import MyCalendar from "./Calendar/MyCalendar";
import { MDBBtn, MDBIcon } from "mdbreact";

export default function Home() {
  return (
    <div className="text-center">
      <div
        style={{
          backgroundColor: "rgba(255, 206, 0, 0.15)",
          boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
        }}
      >
        <h3 className="text-center text-white p-3 m-1 w-100 mx-auto">
          <i className="fas fa-clipboard-list mr-2"></i>Schedule
        </h3>
      </div>
      <MyCalendar />
      <div
        className="p-5 m-2 w-100 border mx-auto font-weight-bold"
        style={{
          backgroundColor: "rgba(255, 206, 0, 0.15)",
          boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
        }}
      >
        <h5 className="mb-4">No Appointments today!</h5>
        <MDBBtn color="warning" size="sm">
          <MDBIcon icon="plus" className="mr-2" size="lg"></MDBIcon>Add
          Appointment
        </MDBBtn>
      </div>
    </div>
  );
}
