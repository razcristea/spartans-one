import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div
        className="spinner-grow text-white"
        role="status"
        style={{ width: "1rem", height: "1rem" }}
      ></div>
      <div
        className="spinner-grow text-dark"
        role="status"
        style={{ width: "1.5rem", height: "1.5rem" }}
      ></div>
      <div
        className="spinner-grow text-white"
        role="status"
        style={{ width: "2rem", height: "2rem" }}
      ></div>
      <h2 className="text-white m-1 text-center">Loading</h2>
      <div
        className="spinner-grow text-white"
        role="status"
        style={{ width: "2rem", height: "2rem" }}
      ></div>
      <div
        className="spinner-grow text-dark"
        role="status"
        style={{ width: "1.5rem", height: "1.5rem" }}
      ></div>
      <div
        className="spinner-grow text-white"
        role="status"
        style={{ width: "1rem", height: "1rem" }}
      ></div>
    </div>
  );
};

export default Loader;
