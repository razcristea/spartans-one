import React from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBDataTable } from "mdbreact";
import Accordion from "react-bootstrap/Accordion";
import AddWorkoutForm from "./AddWorkoutForm";

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
      <MDBCardHeader>
        <Accordion>
          <AddWorkoutForm count={wods.length} />
        </Accordion>
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
