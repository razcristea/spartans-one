import React from "react";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <div htmlFor="date">Choose Date:</div>
      <input type="date" name="date" id="date" />
    </div>
  );
}
