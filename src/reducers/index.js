import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { Reducers as horsemanReducers } from 'horseman.js';

export default combineReducers({
  ...horsemanReducers,
  router: routerReducer,
  // Add custom reducers here
});
