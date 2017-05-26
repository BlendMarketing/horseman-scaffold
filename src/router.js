/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import {
  WordpressCollectionProvider,
  CraftEntryProvider,
  CraftCollectionProvider
} from 'horseman.js';

import Home from './containers/Home';
import NoMatch from './containers/NoMatch';

const Router = ({ history }) => (
  <ConnectedRouter className={styles.root} history={history}>
    <div>
     <Switch>
       <Route exact path="/" component={Home} />
       <Route
         exact path="/404"
         component={NoMatch}
       />
     </Switch>
   </div>
 </ConnectedRouter>
);


export default Router;
