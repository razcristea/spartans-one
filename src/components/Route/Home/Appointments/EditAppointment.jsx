import React from "react";

export default function EditAppointment({ data }) {
  return (
    <div className="bg-white">
      <p>{data.date}</p>
      <p>
        {data.start}-{data.end}
      </p>
      <p>{data.attendees}</p>
    </div>
  );
}
