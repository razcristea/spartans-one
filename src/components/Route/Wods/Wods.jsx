import React, { Component } from "react";
import { Route } from "react-router-dom";
import WodsContainer from "./WodsContainer/WodsContainer";
import WodDetails from "./WodDetails/WodDetails";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default class Wods extends Component {
  state = { wods: [] };

  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getWods();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getWods = () => {
    fetch(wodsApi)
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          data.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          );
          this.setState({ wods: data });
        },
        error => {
          console.log(error);
        }
      );
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
                return <WodDetails wodInfo={wod} />;
              }}
            />
          );
        })}
      </div>
    );
  }
}
