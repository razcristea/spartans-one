import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Navbar/Header.jsx";
import Footer from "./components/Footer/Footer";
import Athletes from "./components/Route/Athletes/Athletes";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/" component={LandingPage} exact></Route> */}
          <Route path="/athletes" component={Athletes}></Route>
          {/* <Route path="/wods" component={Wods}></Route> */}
          {/* <Route path="/find" component={Search}></Route> */}
        </Switch>
        <Footer />
      </Router>
    );
  }
}
