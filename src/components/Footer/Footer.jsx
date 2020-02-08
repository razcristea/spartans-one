import React, { PureComponent } from "react";

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

export default class Footer extends PureComponent {
  today = new Date();
  state = {
    athleteCount: 0,
    female: 0,
    male: 0,
    birthdays: 0,
    date: "",
    dateFormat: ""
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
    const date = day + "-" + month + "-" + year;
    const dateFormat = year + "-" + month + "-" + day;
    this.setState({ date: date, dateFormat: dateFormat });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.getAthletes();
    }
  }
  getAthletes = () => {
    fetch(athletesAPI)
      .then(response => response.json())
      .then(data => {
        let female = 0,
          male = 0,
          birthdays = 0;
        data.forEach(entry => {
          entry.sex === "M" ? male++ : female++;
          if (entry.birthday.slice(4) === this.state.dateFormat.slice(4)) {
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
    return (
      <footer style={footerStyle}>
        <div>
          <div>Welcome, Coach Vali!</div>
          <div className="text-muted text-center text-small">
            <i className="far fa-calendar-alt"></i> {this.state.date}
          </div>
        </div>
        <div className="text-center">
          <div className="mb-1">
            {this.state.athleteCount} <i className="fas fa-users fa-lg"></i> |{" "}
            {this.state.birthdays}{" "}
            <i className="fas fa-birthday-cake fa-md"></i>
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
