import React, { Component } from "react";

class InputPage extends Component {
  state = {
    radio: 5
  };

  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  };

  render() {
    return (
      <div className="text-center m-2 text-white p-2 font-weight-bold">
        {/* <i className="fas fa-filter fa-lg"></i> */}
        <label htmlFor="emom" className="ml-2 mr-1">
          EMOM
        </label>
        <input
          onChange={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          type="radio"
          id="emom"
        />
        <label htmlFor="amrap" className="ml-2 mr-1">
          AMRAP
        </label>
        <input
          onChange={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          type="radio"
          id="amrap"
        />
        <label htmlFor="fortime" className="ml-2 mr-1">
          4 TIME
        </label>
        <input
          onChange={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          type="radio"
          id="fortime"
        />
        <label htmlFor="chipper" className="ml-2 mr-1">
          CHIPPER
        </label>
        <input
          onChange={this.onClick(4)}
          checked={this.state.radio === 4 ? true : false}
          type="radio"
          id="chipper"
        />
        <label htmlFor="all" className="ml-2 mr-1">
          All
        </label>
        <input
          onChange={this.onClick(5)}
          checked={this.state.radio === 5 ? true : false}
          type="radio"
          id="all"
        />
      </div>
    );
  }
}

export default InputPage;
