import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

const athletesAPI = "https://theboxathletes.herokuapp.com/athletes/";

export default class App extends Component {
  constructor() {
    super();
    this.state = { athletes: [] };
  }

  componentDidMount() {
    fetch(athletesAPI)
      .then(response => response.json())
      .then(
        data => {
          this.setState({ athletes: data });
          console.log(this.state.athletes);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Main athletes={this.state.athletes} />
        <Footer />
      </Fragment>
    );
  }
}
