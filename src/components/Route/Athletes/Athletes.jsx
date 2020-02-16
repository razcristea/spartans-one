import React, { PureComponent } from "react";
import { Route } from "react-router-dom";
import AthletesContainer from "./AthletesContainer/AthletesContainer";
import AthleteDetails from "./AthleteDetails/AthleteDetails";
import Loader from "../../../helpers/Loader";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default class Athletes extends PureComponent {
  state = {
    athletes: [],
    showLoader: false
  };
  componentDidMount() {
    this.getAthletes();
  }

  getAthletes = () => {
    if (window.location.pathname === "/athletes")
      this.setState({ showLoader: true });
    fetch(athletesAPI)
      .then(response => response.json())
      .then(data => {
        data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );

        window.location.pathname === "/athletes"
          ? setTimeout(() => {
              this.setState({ athletes: data, showLoader: false });
            }, 500)
          : this.setState({ athletes: data });
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state.athletes);
    console.log(this.props);
    return (
      <div>
        <Route
          path="/athletes"
          exact
          component={() => {
            return (
              <AthletesContainer
                athletes={this.state.athletes}
                getAthletes={this.getAthletes}
                changeCount={this.props.changeCount}
              />
            );
          }}
        />
        {this.state.showLoader ? <Loader /> : null}
        {this.state.athletes.map((athlete, i) => {
          return (
            <Route
              path={`/athletes/${athlete._id}`}
              key={i}
              exact
              component={() => {
                return (
                  <AthleteDetails
                    id={athlete._id}
                    info={athlete}
                    getAthletes={this.getAthletes}
                  />
                );
              }}
            />
          );
        })}
      </div>
    );
  }
}
