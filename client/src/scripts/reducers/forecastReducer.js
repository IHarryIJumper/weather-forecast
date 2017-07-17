// import { combineReducers } from 'redux';

const defaultState = {
  city: {
    id: null,
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
      break;
    default:
      break;
  }

  return newState;
};

/* const cityReducer = (state = defaultState.city, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'SET_CITY':
      newState.id = action.payload.id;
      newState.name = action.payload.name;
      break;
    default:
      newState = state;
      break;
  }

  return newState;
};

const coordinatesReducer = (state = defaultState.coord, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'SET_COORD':
      newState.lon = action.payload.lon;
      newState.lat = action.payload.lat;
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}; */

export default forecastReducer;
