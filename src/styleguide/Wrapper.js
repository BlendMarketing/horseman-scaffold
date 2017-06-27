/* eslint-disable react/prop-types */
/**
 * This is a wrapper which allows our styleguide generator to access the redux
 * state and router information when generating our styleguide.
 */
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from '../store/configureStore';

const history = createHistory();
const initialState = {
};

const store = configureStore(initialState, history);

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { children }
    </ConnectedRouter>
  </Provider>
);

export default Wrapper;
