// import { combineReducers } from 'redux';

import Cookies from 'js-cookie';

const defaultState = {
  city: {
    id: -1,
    name: null,
  },
  coord: {
    lon: null,
    lat: null,
  },
  weather: {
    id: null,
    main: null,
    description: null,
    icon: null,
  },
  main: {
    temp: null,
    pressure: null,
    humidity: null,
    temp_min: null,
    temp_max: null,
  },
  visibility: {
    value: null,
  },
  wind: {
    speed: null,
    deg: null,
  },
  clouds: {
    all: null,
  },
  expirationTime: new Date().getTime() + 600000, // 10 minutes
};

const forecastReducer = (state = defaultState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_DATA':
      newState.city = Object.assign(newState.city, action.payload.city);
      newState.coord = Object.assign(newState.coord, action.payload.coord);
      newState.weather = Object.assign(newState.weather, action.payload.weather);
      newState.main = Object.assign(newState.main, action.payload.main);
      newState.visibility = Object.assign(newState.visibility, action.payload.visibility);
      newState.wind = Object.assign(newState.wind, action.payload.wind);
      newState.clouds = Object.assign(newState.clouds, action.payload.clouds);
      newState.expirationTime = action.payload.expirationTime;

      Cookies.set('weatherForecast', JSON.stringify(newState), { expires: 30 });
      break;
    default:
      break;
  }

  return newState;
};

export default forecastReducer;
