import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import './page.less';

import forecastActions from '../../actions/forecastActions';

import SearchBar from '../search-bar/search-bar';
import WeatherCard from '../weather-card/weather-card';

import Request from '../../helpers/request';

class Page extends React.PureComponent {
  componentDidMount() {
    const weatherData = Cookies.get('weatherForecast');

    if (weatherData !== undefined) {
      try {
        const parsedWeatherCookieData = JSON.parse(weatherData);
        if (parsedWeatherCookieData.expirationTime <= new Date().getTime()) {
          Request.get(
            {
              id: parsedWeatherCookieData.city.id,
            },
            (data) => {
              // console.log('Update weather for current city');
              const parsedWeatherData = JSON.parse(data);
              this.props.dispatch(forecastActions.updateDataFromApi(parsedWeatherData));
            },
            (error) => {
              console.error(error);
            },
          );
        } else {
          this.props.dispatch(forecastActions.updateDataFromCookie(parsedWeatherCookieData));
        }
        // console.log('Weather data restored');
      } catch (error) {
        console.error(error);
      }
    }
  }

  renderWeatherCard() {
    const { cityId } = this.props;
    if (cityId !== -1 && cityId !== null && cityId !== undefined) {
      return <WeatherCard />;
    }
    return null;
  }

  render() {
    return (
      <div className="page">
        <div className="page__content">
          <SearchBar />
          {this.renderWeatherCard()}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  cityId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let cityId;
  if (ownProps.city === undefined) {
    cityId = state.forecast.city.id;
  } else {
    cityId = ownProps.city.id;
  }
  return {
    cityId,
  };
};

export default connect(mapStateToProps)(Page);
