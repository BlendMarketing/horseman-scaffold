/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { ResourceProvider } from 'horseman.js';
import { Link } from 'react-router-dom';

import Home from './containers/Home';
import NoMatch from './containers/NoMatch';

import BlogHomePage from './containers/BlogHomePage';
import PostPage from './containers/PostPage';

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
            return(<ResourceProvider
              endpoint="http://wp.horseman.io/wp-json/wp/v2/posts"
              endpointVars={match.params}
              render={resource =>{
                console.log("resource",resource);
                if(resource.data.loading){
                  return(<div />);
                }
                return(
                  <BlogHomePage posts={resource.data} />
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
                if(resource.data.loading){
                  return(<div />);
                }
              return(
                  <PostPage post={resource.data} />
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
