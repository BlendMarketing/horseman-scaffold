/* eslint-disable no-underscore-dangle */

/**
 * configureStore sets up the redux store with all the middleware.
 */
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

import reducer from "../reducers";

export default function configureStore(initialState, history) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const routeMiddleware = routerMiddleware(history);

  const enhancer = composeEnhancers(applyMiddleware(routeMiddleware, thunk));

  const store = createStore(reducer, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers")),
    );
  }

  return store;
}
