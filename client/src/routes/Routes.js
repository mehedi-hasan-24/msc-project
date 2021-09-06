import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Error from "../components/Error";
import Login from "../components/Login";
import AuthRoutes from "./AuthRoutes";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <AuthRoutes exact path="/login" component={Login}></AuthRoutes>
        <Route exact to="/dashbaord" component={Dashboard} />
        <Route exact to="/error" component={Error} />
        <Route
          exact
          path="/"
          render={() => {
            <Redirect to="/login" />;
          }}
        />
        <Route
          exact
          path="*"
          render={() => {
            <Redirect to="/login" />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
