import { hot } from "react-hot-loader";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Lunch Break ...</h1>
      </div>
    );
  }
}

export default hot(module)(App);
