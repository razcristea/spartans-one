export const addAthleteFields = [
  {
    icon: "user",
    name: "name",
    type: "text",
    label: "Name",
    required: true,
    invalidMessage: "Name is required!"
  },
  {
    icon: "phone",
    name: "phone",
    type: "text",
    label: "Phone",
    required: true,
    invalidMessage: "Phone # is required!"
  },
  {
    icon: "envelope-open",
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    invalidMessage: "Email is required!"
  },
  {
    icon: "baby",
    name: "age",
    type: "number",
    label: "Age",
    required: true,
    invalidMessage: "Age is required!"
  }
];

export const personalBestFields = [
  { name: "benchpress", type: "number", label: "Benchpress", required: false },
  {
    name: "strictpress",
    type: "number",
    label: "Strictpress",
    required: false
  },
  { name: "pushpress", type: "number", label: "Pushpress", required: false },
  { name: "row", type: "number", label: "Row", required: false },
  { name: "backsquat", type: "number", label: "Backsquat", required: false },
  { name: "frontsquat", type: "number", label: "Frontsquat", required: false },
  { name: "deadlift", type: "number", label: "Deadlift", required: false },
  {
    name: "trapDeadlift",
    type: "number",
    label: "Trapbardeadlift",
    required: false
  }
];
