import React, { Component } from "react";
import { Route } from "react-router-dom";
import AthletesContainer from "./AthletesContainer/AthletesContainer";
import AthleteDetails from "./AthleteDetails/AthleteDetails";

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
        <Route
          path="/athletes"
          exact
          component={() => {
            return (
              <AthletesContainer
                athletes={this.state.athletes}
                getAthletes={this.getAthletes}
              />
            );
          }}
        />
        {this.state.athletes.map((athlete, i) => {
          return (
            <Route
              path={`/athletes/${athlete._id}`}
              key={i}
              exact
              component={() => {
                return <AthleteDetails info={athlete} />;
              }}
            />
          );
        })}
      </div>
    );
  }
}
