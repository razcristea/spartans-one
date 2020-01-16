import React, { useEffect, useState } from "react";

export default function WodDetails({ wodInfo }) {
  const [athletes, setAthletes] = useState([]);
  const [neededAthletes, setNeededAthletes] = useState([]);
  let [test, setTest] = useState(0);
  useEffect(() => {
    if (!neededAthletes.length && test < 1) {
      setTest(2);
      console.log(test);
      fetch("https://theboxathletes.herokuapp.com/athletes/")
        .then(response => response.json())
        .then(data => setAthletes(data))
        .then(() => filterAthletes());
    } else {
      setTest(0);
    }
  }, [neededAthletes]);

  const filterAthletes = () => {
    let filteredAthletes = athletes.filter((athlete, i) => {
      let found = false;
      athlete.wods.map(wod => {
        wod.name === name ? (found = true) : console.log("no");
      });
      if (found) return athlete.name;
    });
    setNeededAthletes(filteredAthletes);
    console.log(filteredAthletes);
  };

  const { description, type, time, _id, name, exercises } = wodInfo;

  return (
    <div>
      <h3>{name}</h3>
      {neededAthletes.map((athlete, i) => {
        return (
          <div key={i} className="border p-2 m-1">
            {athlete.name}
          </div>
        );
      })}
    </div>
  );
}
