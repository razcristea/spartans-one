import React from "react";

export default function Select({ options, getValue }) {
  const posibleOptions = options.map((option, i) => {
    return (
      <option key={i} value={option.name}>
        {option.name}
      </option>
    );
  });
  return (
    <div>
      <select
        className="browser-default custom-select"
        onChange={e => getValue(e.target.value)}
      >
        <option>Choose WOD (Please! Be gentle!)</option>
        {posibleOptions}
      </select>
    </div>
  );
}
