/* eslint-disable react/prop-types */
import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import NoMatch from "./components/pages/NoMatch";

const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/404" component={NoMatch} />
      </Switch>
    </div>
  </ConnectedRouter>
);

export default Router;
