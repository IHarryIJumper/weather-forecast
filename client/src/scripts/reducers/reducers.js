import { combineReducers } from 'redux';

import forecastReducer from './forecastReducer';

const combinedReducer = combineReducers({
  forecast: forecastReducer,
});

export default combinedReducer;
