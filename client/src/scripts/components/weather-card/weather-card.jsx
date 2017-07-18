import React from 'react';

import CityInfo from './__city-info/__city-info';
import WeatherMainInfo from './__weather-main-info/__weather-main-info';
import WeatherAdditionalInfo from './__weather-additional-info/__weather-additional-info';

import './weather-card.less';

const WeatherCard = () =>
  (<div className="weather-card weather-card_shadow">
    <CityInfo />
    <WeatherMainInfo />
    {/* <WeatherAdditionalInfo /> */}
  </div>);

export default WeatherCard;
