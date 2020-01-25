import React from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";

export default function Appointments({ data, date, goBack }) {
  console.log(data.entries);
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
      {data ? (
        <div className="p-2 m-2 card bg-dark">
          <h3 className="headingStyle text-white">{date}</h3>
          <MDBDataTable
            sortable={false}
            btn
            theadTextWhite
            tbodyTextWhite
            bordered
            dark
            striped
            exportToCSV
            data={data_panel}
            paging={false}
            searching={false}
            noBottomColumns
          ></MDBDataTable>
        </div>
      ) : (
        <div className="p-2 m-2 card bg-dark">
          <h3 className="headingStyle text-white">{date}</h3>
          <h5 className="text-white m-2">No Appointments</h5>
          <MDBDataTable
            btn
            theadTextWhite
            tbodyTextWhite
            bordered
            dark
            striped
            exportToCSV
            data={data_panel}
            paging={false}
            searching={false}
            noBottomColumns
          ></MDBDataTable>
        </div>
      )}
    </div>
  );
}

const goBackBtnStyles = {
  position: "fixed",
  bottom: "5px",
  right: "25%",
  border: "0.5px solid white",
  color: "white",
  zIndex: "1000"
};
