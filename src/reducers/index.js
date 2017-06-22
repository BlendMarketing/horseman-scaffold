import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { horsemanReducer } from 'horseman-core';

export default combineReducers({
  router: routerReducer,
  horsemanResources: horsemanReducer,
  // Add custom reducers here
});
