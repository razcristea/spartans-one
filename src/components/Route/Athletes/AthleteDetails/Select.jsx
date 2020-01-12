import React from "react";

export default function Select({ options, getValue, validate, setIsReady }) {
  const posibleOptions = options.map((option, i) => {
    return (
      <option key={i} value={option.name}>
        {option.name}
      </option>
    );
  });
  validate() ? setIsReady(false) : setIsReady(true);
  return (
    <div>
      <select
        className="browser-default custom-select"
        onChange={e => {
          getValue(e.target.value);
        }}
      >
        <option value={"default"}>Choose WOD (Please! Be gentle!)</option>
        {posibleOptions}
      </select>
    </div>
  );
}
