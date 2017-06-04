import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';
import {
  USER,
  DASHBOARD,
  FEATURES
} from './../constants/actionTypes';
const dashboard = reducersGenerate(DASHBOARD, initialState.dashboard);
const features = reducersGenerate(FEATURES, initialState.features);
const user = reducersGenerate(USER, initialState.user);

const rootReducer = combineReducers({
  routing: routerReducer,
  dashboard,
  features,
  user
})

export default rootReducer