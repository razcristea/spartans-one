import React, { Component } from "react";

const footerStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  background: "#343a40",
  color: "#fff",
  fontSize: "0.9rem",
  fontWeight: "bold",
  padding: ".40rem 1.175rem",
  zIndex: "100",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid white"
};

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default class Footer extends Component {
  today = new Date();
  state = {
    athleteCount: 0,
    female: 0,
    male: 0,
    date: ""
  };
  componentDidMount() {
    this.getAthletes();
    const date =
      this.today.getDate() +
      "." +
      (this.today.getMonth() + 1) +
      "." +
      this.today.getFullYear();
    this.setState({ date: date });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.getAthletes();
    }
  }
  getAthletes = () => {
    fetch(athletesAPI)
      .then(response => response.json())
      .then(
        data => {
          let female = 0,
            male = 0;
          data.forEach(entry => (entry.sex === "M" ? male++ : female++));
          this.setState({
            athleteCount: data.length,
            female: female,
            male: male
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
        }
      );
  };
  render() {
    return (
      <footer style={footerStyle}>
        <div>
          <div>Welcome, Coach Vali!</div>
          <div className="text-muted text-center text-small">
            <i className="far fa-calendar-alt"></i> {this.state.date}
          </div>
        </div>
        <div>You are coaching: </div>
        <div className="text-center">
          <div>
            <i className="fas fa-users fa-lg"></i> {this.state.athleteCount}
          </div>
          <div>
            {this.state.male} <i className="fas fa-mars fa-lg"></i> |{" "}
            {this.state.female} <i className="fas fa-venus fa-lg"></i>
          </div>
        </div>
      </footer>
    );
  }
}
