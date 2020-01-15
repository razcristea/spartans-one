import React, { useRef, useEffect } from "react";

export default function Home() {
  const dateRef = useRef(null);
  useEffect(() => {
    let today = new Date().toISOString().substr(0, 10);
    dateRef.current.value = today;
  });
  return (
    <div className="text-center mt-5">
      <div htmlFor="date">Choose Date:</div>
      <input type="date" name="date" id="date" ref={dateRef} />
    </div>
  );
}
