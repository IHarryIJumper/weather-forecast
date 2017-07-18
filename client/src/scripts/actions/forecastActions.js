const forecastActions = {
  updateDataFromApi(data) {
    const weatherData = {};
    weatherData.city = {
      id: data.id,
      name: data.name,
    };
    weatherData.coord = Object.assign({}, data.coord);
    weatherData.weather = Object.assign({}, data.weather[0]);
    weatherData.main = Object.assign({}, data.main);
    weatherData.visibility = {
      value: data.visibility,
    };
    weatherData.wind = Object.assign({}, data.wind);
    weatherData.clouds = Object.assign({}, data.clouds);
    weatherData.expirationTime = new Date().getTime() + 600000;

    return {
      type: 'UPDATE_DATA',
      payload: weatherData,
    };
  },

  updateDataFromCookie(data) {
    const weatherData = {};
    weatherData.city = Object.assign({}, data.city);
    weatherData.coord = Object.assign({}, data.coord);
    weatherData.weather = Object.assign({}, data.weather);
    weatherData.main = Object.assign({}, data.main);
    weatherData.visibility = Object.assign({}, data.visibility);
    weatherData.wind = Object.assign({}, data.wind);
    weatherData.clouds = Object.assign({}, data.clouds);
    if (data.expirationTime > new Date().getTime()) {
      weatherData.expirationTime = data.expirationTime;
    } else {
      weatherData.expirationTime = new Date().getTime() + 600000;
    }
    return {
      type: 'UPDATE_DATA',
      payload: weatherData,
    };
  },
};

export default forecastActions;
