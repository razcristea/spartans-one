import React, { Component } from "react";
import Calendar from "react-calendar";
import "./MyCalendar.css";

export default class MyCalendar extends Component {
  state = {
    date: new Date()
  };
  onChange = date => this.setState({ date });
  render() {
    return (
      <div
        className="mt-2"
        style={{
          backgroundColor: "rgba(255, 206, 0, 0.15)",
          boxShadow: "0 2px 5px 0 #212529, 0 2px 10px 0 #212121"
        }}
      >
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          className="w-100 mx-auto react-calendar__tile"
        />
      </div>
    );
  }
}
