import React from "react";

export default function WodDetails({ wodInfo }) {
  const { description, type, time, _id, name, exercises } = wodInfo;
  return <h3>{name}</h3>;
}
