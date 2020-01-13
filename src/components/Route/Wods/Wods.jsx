import React, { Component } from "react";
import TypeFilter from "./WodsContainer/TypeFilter";
import WodsContainer from "./WodsContainer/WodsContainer";
import Accordion from "react-bootstrap/Accordion";

const wodsApi = "https://theboxathletes.herokuapp.com/wods/";

export default class Wods extends Component {
  constructor() {
    super();
    this.state = { wods: [], isSelected: "" };
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
        {this.state.wods.length === 0 && (
          <h3 className="text-center mt-5 pt-5 text-light">Loading...</h3>
        )}
        <h2
          className="text-center text-white p-1 m-1 w-50 mx-auto"
          style={{ borderBottom: "0.5px solid white" }}
        >
          My Wods
        </h2>
        <TypeFilter />
        <Accordion
          onSelect={ev => this.setState({ isSelected: ev })}
          className="mb-5"
        >
          {this.state.wods.map(wod => (
            <WodsContainer
              isSelected={this.state.isSelected}
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
