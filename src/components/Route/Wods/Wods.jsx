import React, { Component } from "react";
import WodsContainer from "./WodsContainer/WodsContainer";
import Accordion from "react-bootstrap/Accordion";

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
      <div>
        <h2
          className="text-center text-white p-1 m-1 w-50 mx-auto"
          style={{ borderBottom: "0.5px solid white" }}
        >
          My Wods
        </h2>
        <Accordion>
          {this.state.wods.map(wod => (
            <WodsContainer
              wods={this.state.wods}
              getWods={this.getWods}
              key={wod._id}
              wodInfo={wod}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}
