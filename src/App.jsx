import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Navbar/Header.jsx";
import Footer from "./components/Footer/Footer";
import Home from "./components/Route/Home/Home";
import Schedule from "./components/Route/Schedule/Schedule";
import Athletes from "./components/Route/Athletes/Athletes";
import Wods from "./components/Route/Wods/Wods";
import Notes from "./components/Route/Notes/Notes";

export default class App extends Component {
  state = { changeCount: 0, isLoggedIn: false, accessToken: "", userName: "" };

  changeCount = () => {
    this.setState({ changeCount: this.state.changeCount + 1 });
  };

  handleLogin = (accessToken, userName) => {
    this.setState({
      isLoggedIn: true,
      accessToken,
      userName
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      accessToken: "",
      userName: ""
    });
  };

  componentDidMount() {
    if (localStorage.getItem("access-token")) {
      this.setState({
        isLoggedIn: true,
        accessToken: localStorage.getItem("access-token"),
        userName: localStorage.getItem("userName")
      });
    }
  }
  render() {
    return (
      <Router>
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.isLoggedIn ? (
          <Switch>
            <Route
              path="/"
              component={() => (
                <Home
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
              exact
            ></Route>
            <Route
              path="/schedule"
              component={() => (
                <Schedule accessToken={this.state.accessToken} />
              )}
              exact
            ></Route>
            <Route
              path="/athletes"
              component={() => (
                <Athletes
                  changeCount={this.changeCount}
                  accessToken={this.state.accessToken}
                />
              )}
            ></Route>
            <Route
              path="/wods"
              component={() => <Wods accessToken={this.state.accessToken} />}
            ></Route>
            <Route
              path="/notes"
              component={() => <Notes accessToken={this.state.accessToken} />}
            ></Route>
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/"
              component={() => (
                <Home
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                  changeCount={this.changeCount}
                />
              )}
              exact
            ></Route>
          </Switch>
        )}
        <Footer
          userName={this.state.userName}
          accessToken={this.state.accessToken}
          count={this.state.changeCount}
          isLoggedIn={this.state.isLoggedIn}
        />
      </Router>
    );
  }
}
