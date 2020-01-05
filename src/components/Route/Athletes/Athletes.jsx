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
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getAthletes();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getAthletes = () => {
    fetch(athletesAPI)
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          data.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          this.setState({ athletes: data });
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
                changeCount={this.props.changeCount}
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
                return (
                  <AthleteDetails
                    info={athlete}
                    getAthletes={this.getAthletes}
                  />
                );
              }}
            />
          );
        })}
      </div>
    );
  }
}
