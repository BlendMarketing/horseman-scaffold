/**
 * REACT COMPONENTS
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Router from './router';
import configureStore from './store/configureStore';

/**
 * Establish your application's initial state here.
 */
const initialState = {
};

const history = createHistory();

const store = configureStore(initialState, history);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history} store={store} />
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
);


// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router', () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router history={history} store={store} />
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
