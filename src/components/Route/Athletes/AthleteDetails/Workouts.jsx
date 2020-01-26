import React, { useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBDataTable } from "mdbreact";
import Accordion from "react-bootstrap/Accordion";
import AddWorkoutForm from "./AddWorkoutForm";

const Workouts = ({ wods, id, updateWods }) => {
  useEffect(() => {
    wods.map(wod => {
      if (typeof wod.time === "string") {
        return wod;
      } else {
        if (wod.reps === 0) wod.reps = "N/A";
        let minutes = Math.floor(wod.time / 60);
        let seconds = wod.time % 60;
        if (seconds < 10) seconds = "0" + seconds;
        if (minutes < 10) minutes = "0" + minutes;
        let time = `${minutes}:${seconds}`;
        if (time === "00:00") time = "N/A";
        return (wod.time = time);
      }
    });
  }, [wods]);

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
          <AddWorkoutForm count={wods.length} id={id} updateWods={updateWods} />
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
          noBottomColumns
        ></MDBDataTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Workouts;
