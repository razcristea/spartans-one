import React, { Component } from "react";
import Calendar from "react-calendar";
import "./MyCalendar.css";

export default class MyCalendar extends Component {
  state = {
    date: new Date(),
    processedDate: ""
  };
  onChange = async date => {
    this.setState({
      processedDate: date
        .toString()
        .split(" ")
        .slice(1, 4)
        .join("-")
    });
  };
  async componentDidMount() {
    await this.onChange(this.state.date);
    this.props.getDate(this.state.processedDate);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.processedDate !== this.state.processedDate) {
      this.props.getDate(this.state.processedDate);
    }
  }
  render() {
    return (
      <div className="mt-2 mx-auto headingStyle mediaQuery">
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          className="w-100 mx-auto react-calendar__tile react-calendar-tile--active"
        />
      </div>
    );
  }
}
