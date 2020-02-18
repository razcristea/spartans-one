import React, { PureComponent } from "react";

const athletesAPI = "https://mypthelperapi.herokuapp.com/athletes/";
// const athletesAPI = "http://localhost:3000/athletes/";

export default class Footer extends PureComponent {
  today = new Date();
  state = {
    athleteCount: 0,
    female: 0,
    male: 0,
    birthdays: 0,
    date: ""
  };
  componentDidMount() {
    this.getAthletes();
    const year = this.today.getFullYear();
    const month =
      this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1)
        : this.today.getMonth() + 1;
    const day =
      this.today.getDate() < 10
        ? "0" + this.today.getDate()
        : this.today.getDate();
    const date = year + "-" + month + "-" + day;
    this.setState({ date: date });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.getAthletes();
    }
  }
  getAthletes = () => {
    fetch(athletesAPI, {
      method: "GET",
      headers: { "access-token": localStorage.getItem("access-token") }
    })
      .then(response => response.json())
      .then(data => {
        let female = 0,
          male = 0,
          birthdays = 0;
        data.forEach(entry => {
          entry.sex === "M" ? male++ : female++;
          if (entry.birthday.slice(4) === this.state.date.slice(4)) {
            birthdays++;
          }
        });

        this.setState({
          athleteCount: data.length,
          female,
          male,
          birthdays
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <footer style={footerStyle}>
        <div>
          {isLoggedIn ? <div>Welcome, Coach {this.props.userName}!</div> : null}
          <div className="text-muted text-center text-small">
            <i className="far fa-calendar-alt"></i>{" "}
            {this.state.date
              .split("-")
              .reverse()
              .join("-")}
          </div>
        </div>
        {isLoggedIn ? (
          <div className="text-center">
            <div className="mb-1">
              {this.state.athleteCount} <i className="fas fa-users fa-lg"></i>{" "}
              {this.state.birthdays ? (
                <span>
                  | {this.state.birthdays}{" "}
                  <i className="fas fa-birthday-cake fa-lg text-warning"></i>
                </span>
              ) : null}{" "}
            </div>
            <div>
              {this.state.male} <i className="fas fa-mars fa-lg"></i> |{" "}
              {this.state.female} <i className="fas fa-venus fa-lg"></i>
            </div>
          </div>
        ) : null}
      </footer>
    );
  }
}

const footerStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "60px",
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
