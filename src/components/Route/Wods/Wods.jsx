import React, { Component } from "react";
import Test from "./Test";
import WodsContainer from "./WodsContainer/WodsContainer";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default class Wods extends Component {
  constructor() {
    super();
    this.state = { wods: [] };
  }

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
          this.setState({ wods: data });
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh"
        }}
      >
        <Test />
        <WodsContainer wods={this.state.wods} getWods={this.getWods} />
      </div>
    );
  }
}
