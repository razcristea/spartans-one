import React, { Component } from "react";
import { MDBBtn } from "mdbreact";
import "./Stopwatch.css";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 1000);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    this.props.validate()
      ? this.props.setIsReady(false)
      : this.props.setIsReady(true);
    return (
      <div className="Stopwatch mt-2 mb-2">
        <div className="Stopwatch-header">
          <i className="fas fa-stopwatch fa-lg mr-1"></i>Stopwatch
        </div>
        <div className="Stopwatch-display">
          {hours} : {minutes} : {seconds}
        </div>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <MDBBtn color="success" size="sm" onClick={this.startTimer}>
            <i className="fas fa-play mr-1"></i> Start
          </MDBBtn>
        )}
        {this.state.timerOn === true && (
          <MDBBtn
            color="danger"
            size="sm"
            onClick={() => {
              this.stopTimer();
              this.props.getValue(Math.floor(this.state.timerTime / 1000));
            }}
          >
            <i className="fas fa-stop mr-1"></i> Stop
          </MDBBtn>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <MDBBtn color="warning" size="sm" onClick={this.startTimer}>
            <i className="fas fa-pause mr-1"></i> Resume
          </MDBBtn>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <MDBBtn
            color="secondary"
            size="sm"
            onClick={() => {
              this.resetTimer();
              this.props.getValue(0);
            }}
          >
            <i className="fas fa-undo-alt mr-1"></i> Reset
          </MDBBtn>
        )}
      </div>
    );
  }
}

export default Stopwatch;
