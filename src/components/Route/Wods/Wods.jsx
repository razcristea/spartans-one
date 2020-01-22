import React, { Component } from "react";
import { Route } from "react-router-dom";
import WodsContainer from "./WodsContainer/WodsContainer";
import WodDetails from "./WodDetails/WodDetails";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";
const athletesApi = "https://theboxathletes.herokuapp.com/athletes/";

export default class Wods extends Component {
  state = { wods: [], athletes: [] };

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getWods();
    this.getAthletes();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getWods = () => {
    fetch(wodsApi)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        this.setState({ wods: data });
        console.log(this.state.wods);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getAthletes = () => {
    fetch(athletesApi)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        this.setState({ athletes: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Route
          path="/wods"
          exact
          component={() => {
            return (
              <WodsContainer wods={this.state.wods} getWods={this.getWods} />
            );
          }}
        />
        {this.state.wods.map((wod, i) => {
          return (
            <Route
              path={`/wods/${wod._id}`}
              key={i}
              exact
              component={() => {
                return (
                  <WodDetails wodInfo={wod} athletes={this.state.athletes} />
                );
              }}
            />
          );
        })}
      </div>
    );
  }
}
