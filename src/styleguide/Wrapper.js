/* eslint-disable react/prop-types */
/**
 * This is a wrapper which allows our styleguide generator to access the redux
 * state and router information when generating our styleguide.
 */
import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ThemeProvider } from 'styled-components';

import theme from 'themes/main';

import configureStore from 'store/configureStore';

const history = createHistory();
const initialState = {
};

const store = configureStore(initialState, history);

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      { children }
    </Provider>
  </ThemeProvider>
);

export default Wrapper;
