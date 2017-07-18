import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './__weather-additional-info.less';

class WeatherAdditionalInfo extends React.PureComponent {
  render() {
    return (
      <div className="weather-card__weather-additional-info">
        <div className="weather-card__temperature-min-max">
          <h4 className="weather-card__temperature-min-max-text">
            {this.props.temp_min} °C - {this.props.temp_max} °C
          </h4>
        </div>
        <div className="weather-card__additional-info">
          <div className="weather-card__pressure">
            <span className="weather-card__pressure-key">Pressure: </span>
            <span className="weather-card__pressure-value">
              {this.props.pressure} hPa
            </span>
          </div>
          <div className="weather-card__humidity">
            <span className="weather-card__humidity-key">Humidity: </span>
            <span className="weather-card__humidity-value">
              {this.props.humidity}%
            </span>
          </div>
          <div className="weather-card__visibility">
            <span className="weather-card__visibility-key">Visibility: </span>
            <span className="weather-card__visibility-value">
              {this.props.visibility} m
            </span>
          </div>
        </div>
        <div className="weather-card__additional-info">
          <div className="weather-card__clouds">
            <span className="weather-card__clouds-key">Clouds: </span>
            <span className="weather-card__clouds-value">
              {this.props.clouds}%
            </span>
          </div>
          <div className="weather-card__wind">
            <span className="weather-card__wind-key">Wind: </span>
            <span className="weather-card__wind-value">
              {this.props.wind} m/s
            </span>
          </div>
        </div>
      </div>
    );
  }
}

WeatherAdditionalInfo.propTypes = {
  temp_min: PropTypes.number.isRequired,
  temp_max: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  clouds: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const componentState = Object.assign(
    {},
    ownProps,
    state.forecast.main,
    state.forecast.weather,
    {
      visibility: state.forecast.visibility.value,
    },
    {
      clouds: state.forecast.clouds.all,
    },
    {
      wind: state.forecast.wind.speed,
    },
  );

  return componentState;
};

export default connect(mapStateToProps)(WeatherAdditionalInfo);
