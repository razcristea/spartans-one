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
  state = { changeCount: 0, isLoggedIn: false, accessToken: "", userId: "" };

  changeCount = () => {
    this.setState({ changeCount: this.state.changeCount + 1 });
  };
  handleLogin = (accessToken, userId) => {
    this.setState({
      isLoggedIn: true,
      accessToken,
      userId
    });
  };
  handleLogout = (accessToken, userId) => {
    this.setState({
      isLoggedIn: false,
      accessToken,
      userId
    });
  };
  componentDidMount() {
    if (localStorage.getItem("access-token")) {
      this.setState({ isLoggedIn: true });
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
            <Route path="/schedule" component={Schedule} exact></Route>
            <Route
              path="/athletes"
              component={() => (
                <Athletes
                  changeCount={this.changeCount}
                  user={{
                    token: this.state.accessToken,
                    id: this.state.userId
                  }}
                />
              )}
            ></Route>
            <Route path="/wods" component={Wods}></Route>
            <Route path="/notes" component={Notes}></Route>
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
                />
              )}
              exact
            ></Route>
          </Switch>
        )}

        <Footer
          count={this.state.changeCount}
          isLoggedIn={this.state.isLoggedIn}
        />
      </Router>
    );
  }
}
