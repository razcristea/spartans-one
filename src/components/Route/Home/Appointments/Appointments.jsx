import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import CreateAppointment from "./CreateAppointment";

function Appointments({ data, date, goBack }) {
  const [creatingAppointment, setCreatingAppointment] = useState(false);
  useEffect(() => {
    data
      ? data.entries.map(entry => {
          return (entry.action = (
            <div className="d-flex align-items-center justify-content-center m-0 p-0">
              <MDBBtn
                className="p-2 m-1 rounded"
                size="sm"
                color="warning"
                onClick={() => console.log(entry)}
              >
                <i className="fas fa-edit fa-lg"></i>
              </MDBBtn>
              <MDBBtn
                className="p-2 m-1 rounded"
                size="sm"
                color="danger"
                onClick={() => console.log(entry)}
              >
                <i className="fas fa-trash-alt fa-lg"></i>
              </MDBBtn>
            </div>
          ));
        })
      : console.log("There are no records for this date");
  }, [data]);
  const data_panel = {
    columns: [
      {
        label: "Start",
        field: "startHour",
        sort: "asc"
      },
      {
        label: "End",
        field: "endHour",
        sort: "asc"
      },
      {
        label: "Participants",
        field: "attendees",
        sort: "asc"
      },
      {
        label: "Actions",
        field: "action"
      }
    ],
    rows: data.entries ? [...data.entries] : []
  };
  return (
    <div>
      <MDBBtn
        style={goBackBtnStyles}
        size="sm"
        color="dark"
        onClick={() => goBack(false)}
      >
        Go Back
      </MDBBtn>
      <MDBBtn
        color="warning"
        style={createAppointmentBtnStyles}
        className="hoverable"
        onClick={() => setCreatingAppointment(!creatingAppointment)}
      >
        <i className="fas fa-plus"></i>
      </MDBBtn>
      <div className="p-2 m-2 card bg-dark">
        <h3 className="headingStyle text-white p-1">
          <i className="fas fa-table mr-2"></i>
          {date}
        </h3>
        {!data ? <h5 className="text-white m-2 p-2">No Appointments</h5> : null}
        <MDBDataTable
          sortable={false}
          btn
          theadTextWhite
          tbodyTextWhite
          bordered
          dark
          striped
          data={data_panel}
          paging={false}
          searching={false}
          noBottomColumns
        ></MDBDataTable>
        {creatingAppointment ? (
          <CreateAppointment
            toggle={setCreatingAppointment}
            isShowing={creatingAppointment}
          />
        ) : null}
      </div>
    </div>
  );
}

export default React.memo(Appointments);

const goBackBtnStyles = {
  position: "fixed",
  bottom: "5px",
  right: "25%",
  border: "0.5px solid white",
  color: "white",
  zIndex: "1000"
};

const createAppointmentBtnStyles = {
  width: "2.3rem",
  height: "2.3rem",
  fontSize: "1.1rem",
  padding: "0.1rem 0.45rem",
  borderRadius: "50%",
  position: "fixed",
  bottom: 63,
  right: 7,
  color: "black",
  border: "2px double white",
  boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
};
