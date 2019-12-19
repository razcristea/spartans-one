import React, { Component } from "react";
import AthletesContainer from "./AthletesContainer/AthletesContainer";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default class Athletes extends Component {
  constructor() {
    super();
    this.state = { athletes: [] };
  }

  componentDidMount() {
    this.getAthletes();
  }

  getAthletes = () => {
    fetch(athletesAPI)
      .then(response => response.json())
      .then(
        data => {
          data.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.setState({ athletes: data });
          console.log(this.state.athletes);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
        }
      );
  };
  render() {
    return (
      <div>
        <AthletesContainer
          athletes={this.state.athletes}
          getAthletes={this.getAthletes}
        />
      </div>
    );
  }
}
