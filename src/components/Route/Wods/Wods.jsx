import React, { Component } from "react";
import { Route } from "react-router-dom";
import WodsContainer from "./WodsContainer/WodsContainer";
import WodDetails from "./WodDetails/WodDetails";
import Loader from "../../../helpers/Loader";

// const athletesApi = "http://localhost:3000/athletes/";
// const wodsApi = "http://localhost:3000/wods/";
const athletesApi = "https://mypthelperapi.herokuapp.com/athletes";
const wodsApi = "https://mypthelperapi.herokuapp.com/wods/";

export default class Wods extends Component {
  state = { wods: [], athletes: [], showLoader: false };

  componentDidMount() {
    this.getWods();
    this.getAthletes();
  }

  getWods = () => {
    if (window.location.pathname === "/wods")
      this.setState({ showLoader: true });
    fetch(wodsApi, {
      method: "GET",
      headers: { "access-token": localStorage.getItem("access-token") }
    })
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        window.location.pathname === "/wods"
          ? setTimeout(() => {
              this.setState({ wods: data, showLoader: false });
            }, 500)
          : this.setState({ wods: data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getAthletes = () => {
    fetch(athletesApi, {
      method: "GET",
      headers: { "access-token": localStorage.getItem("access-token") }
    })
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
              <WodsContainer
                wods={this.state.wods}
                getWods={this.getWods}
                showLoader={this.state.showLoader}
              />
            );
          }}
        />
        {this.state.showLoader ? <Loader /> : null}
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
