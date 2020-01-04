import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Navbar/Header.jsx";
import Footer from "./components/Footer/Footer";
import Athletes from "./components/Route/Athletes/Athletes";
import Wods from "./components/Route/Wods/Wods";

export default class App extends Component {
  state = { changeCount: 0 };
  changeCount = () => {
    this.setState({ changeCount: this.state.changeCount + 1 });
  };
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/" component={LandingPage} exact></Route> */}
          <Route
            path="/athletes"
            component={() => <Athletes changeCount={this.changeCount} />}
          ></Route>
          <Route path="/wods" component={Wods}></Route>
          {/* <Route path="/find" component={Search}></Route> */}
        </Switch>
        <Footer count={this.state.changeCount} />
      </Router>
    );
  }
}
