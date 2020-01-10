import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";

export default class WodsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wods: this.props.wods
    };
  }

  render() {
    return (
      <Accordion>
        {this.state.wods.map(wod => (
          <h1>{wod.description}</h1>
        ))}
      </Accordion>
    );
  }
}
