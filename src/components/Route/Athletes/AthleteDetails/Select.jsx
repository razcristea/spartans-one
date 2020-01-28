import React from "react";

export default function Select({
  options,
  getValue,
  validate,
  setIsReady,
  defaultValue
}) {
  const posibleOptions = options.map((option, i) => {
    return (
      <option key={i} value={option.name}>
        {option.name} - {option.type}
      </option>
    );
  });
  if (validate) {
    validate() ? setIsReady(false) : setIsReady(true);
  }
  return (
    <div className="m-2 w-75 mx-auto d-flex align-items-center">
      <i className="fas fa-filter fa-lg text-white mr-2 "></i>
      <select
        className="browser-default custom-select"
        onChange={e => {
          getValue(e.target.value);
        }}
      >
        <option value={"default"}>{defaultValue}</option>
        {posibleOptions}
      </select>
    </div>
  );
}
