/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { ResourceProvider, ResourcesProvider } from 'horseman.js';

import Home from './containers/Home';
import NoMatch from './containers/NoMatch';

import BlogPost from './containers/BlogPost';
import BlogList from './containers/BlogList';

const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact path="/404"
          component={NoMatch}
        />
        <Route
          exact
          path="/blog/"
          render={({match}) =>{
            return(<ResourcesProvider
              endpoint="http://wp.horseman.io/wp-json/wp/v2/posts"
              endpointVars={match.params}
              render={resources =>{
              return(
                <BlogList resources={resources} />
                )}
              }
            />)
            }
          }
          />
        <Route
          path="/blog/:id"
          render={({ match }) =>{
            return(<ResourceProvider
              endpoint="http://wp.horseman.io/wp-json/wp/v2/posts/:id"
              endpointVars={match.params}
              render={resource =>{
              return(
                <BlogPost resource={resource} />
                )}
              }
            />)
            }
          }
          />
      </Switch>
    </div>
  </ConnectedRouter>
);


export default Router;
