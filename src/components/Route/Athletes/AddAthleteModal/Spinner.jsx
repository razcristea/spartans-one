import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loading style-2">
      <div className="overlayItems">
        <p className="overlayText">Uploading...</p>
      </div>
      <div className="loading-wheel"></div>
    </div>
  );
};

export default Spinner;
