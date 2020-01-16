import React, { useRef, useEffect } from "react";

export default function Home() {
  const dateRef = useRef(null);
  useEffect(() => {
    let today = new Date().toISOString().substr(0, 10);
    dateRef.current.value = today;
  });
  return (
    <div className="text-center">
      <h3 className="text-center text-white p-3 m-1 w-100 mx-auto bg-dark">
        <i className="fas fa-clipboard-list mr-2"></i>Schedule
      </h3>
      <div htmlFor="date">Choose Date:</div>
      <input type="date" name="date" id="date" ref={dateRef} />
    </div>
  );
}
