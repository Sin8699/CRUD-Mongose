import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import IndexPage from "./Component/IndexPage";
import HomePage from "./Component/HomePage";
import CreatePage from "./Component/CreatePage";
import { connect } from "react-redux";

var App = props => {
  return (
    <div className="App">
      <Router>
        <div className="link">
          <NavLink exact to="/" activeClassName="nav-link">
            Home
          </NavLink>
          <NavLink to="/CreatePage" activeClassName="nav-link">
            Create
          </NavLink>
          <NavLink to="/IndexPage" activeClassName="nav-link">
            Index
          </NavLink>
        </div>
        <h1> Create app CRUD with ReactJs, NodeJs, MongoDB</h1>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/CreatePage" component={CreatePage}></Route>
        <Route path="/IndexPage" component={IndexPage}></Route>
      </Router>
    </div>
  );
};

export default connect()(App);
