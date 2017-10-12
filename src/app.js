/**
 * REACT COMPONENTS
 */
import React from "react";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { ThemeProvider } from "styled-components";

import theme from "./themes/main";
import Router from "./router";
import configureStore from "./store/configureStore";

/**
 * Establish your application's initial state here.
 */
const initialState = {};

const history = createHistory();

const store = configureStore(initialState, history);

const App = () => (
  <ThemeProvider theme={theme}>
    <AppContainer>
      <Provider store={store}>
        <Router history={history} store={store} />
      </Provider>
    </AppContainer>
  </ThemeProvider>
);

export default App;
