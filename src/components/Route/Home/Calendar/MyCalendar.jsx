import React, { Component } from "react";
import Calendar from "react-calendar";

export default class MyCalendar extends Component {
  state = {
    date: new Date()
  };
  onChange = date => this.setState({ date });
  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          className="w-75 mx-auto"
        />
      </div>
    );
  }
}
