import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBDataTable
} from "mdbreact";

const Workouts = ({ wods }) => {
  wods.map(wod => {
    let formatedDate = wod.date.split("T");
    return (wod.date = formatedDate[0]
      .split("-")
      .reverse()
      .join("-"));
  });
  console.log(wods);
  const data_panel = {
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc"
      },
      {
        label: "Name",
        field: "name",
        sort: "asc"
      },
      {
        label: "Time",
        field: "time",
        sort: "asc"
      },
      {
        label: "Reps",
        field: "reps",
        sort: "asc"
      }
    ],
    rows: [...wods]
  };

  return (
    <MDBCard className="w-100" style={{ backgroundColor: "#353535" }}>
      <MDBCardHeader className="d-flex justify-content-around align-items-center mb-0 bg-dark">
        <div>
          <MDBBtn rounded className="p" color="success">
            <i className="fas fa-plus fa-lg"></i> Workout
          </MDBBtn>
        </div>
        <div className="mr-1 text-white">Counter : 1</div>
      </MDBCardHeader>
      <MDBCardBody className="text-white">
        <MDBDataTable
          theadTextWhite
          tbodyTextWhite
          bordered
          dark
          striped
          data={data_panel}
          paging={false}
        ></MDBDataTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Workouts;
