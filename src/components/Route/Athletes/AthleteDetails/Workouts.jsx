import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
  MDBDataTable
} from "mdbreact";

const Workouts = props => {
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
    rows: [
      {
        date: "05.01.2020",
        name: "Afrodita",
        time: "20:35",
        reps: "N/A"
      },
      {
        date: "07.01.2020",
        name: "Murph",
        time: "28:05",
        reps: "N/A"
      },
      {
        date: "08.01.2020",
        name: "Jane",
        time: "N/A",
        reps: "125"
      },
      {
        date: "12.01.2020",
        name: "20.3",
        time: "10:39",
        reps: "N/A"
      },
      {
        date: "14.01.2020",
        name: "20.4",
        time: "14:55",
        reps: "N/A"
      }
    ]
  };

  return (
    <MDBCard className="w-100" style={{ backgroundColor: "#353535" }}>
      <MDBCardHeader className="d-flex justify-content-around align-items-center mb-0">
        <div>
          <MDBBtn
            rounded
            size="sm"
            className="px-5"
            style={{
              backgroundColor: "#00bf06",
              color: "#fff",
              fontSize: "1rem"
            }}
          >
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
