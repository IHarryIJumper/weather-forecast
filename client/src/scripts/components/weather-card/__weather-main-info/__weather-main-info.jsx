import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './__weather-main-info.less';

class WeatherMainInfo extends React.PureComponent {
  renderWeatherIcon() {
    const { icon } = this.props;
    let returnValue = null;

    switch (icon) {
      case '01d':
        returnValue = <i className="wi wi-day-sunny weather-card__clear-day" />;
        break;
      case '01n':
        returnValue = <i className="wi wi-night-clear weather-card__clear-night" />;
        break;
      case '02d':
        returnValue = <i className="wi wi-day-cloudy weather-card__cloudy-day" />;
        break;
      case '02n':
        returnValue = <i className="wi wi-night-alt-cloudy weather-card__cloudy-night" />;
        break;
      case '03d':
        returnValue = <i className="wi wi-cloud weather-card__cloud" />;
        break;
      case '03n':
        returnValue = <i className="wi wi-cloud weather-card__cloud" />;
        break;
      case '04d':
        returnValue = <i className="wi wi-cloudy weather-card__cloudy" />;
        break;
      case '04n':
        returnValue = <i className="wi wi-cloudy weather-card__cloudy" />;
        break;
      case '09d':
        returnValue = <i className="wi wi-rain weather-card__rain" />;
        break;
      case '09n':
        returnValue = <i className="wi wi-rain weather-card__rain" />;
        break;
      case '10d':
        returnValue = <i className="wi wi-day-rain weather-card__rain-day" />;
        break;
      case '10n':
        returnValue = <i className="wi wi-night-alt-rain weather-card__rain-night" />;
        break;
      case '11d':
        returnValue = <i className="wi wi-day-lightning weather-card__thunder-day" />;
        break;
      case '11n':
        returnValue = <i className="wi wi-night-alt-lightning weather-card__thunder-night" />;
        break;
      case '13d':
        returnValue = <i className="wi wi-snowflake-cold weather-card__snow" />;
        break;
      case '13n':
        returnValue = <i className="wi wi-snowflake-cold weather-card__snow" />;
        break;
      case '50d':
        returnValue = <i className="wi wi-fog weather-card__mist" />;
        break;
      case '50n':
        returnValue = <i className="wi wi-fog weather-card__mist" />;
        break;
      default:
        returnValue = <i className="wi wi-alien" />;
        break;
    }

    return returnValue;
  }
  render() {
    return (
      <div className="weather-card__weather-main-info">
        <div className="weather-card__temperature">
          <h2 className="weather-card__temperature-text">
            {Math.round(this.props.temp)} °C
          </h2>
        </div>
        <div className="weather-card__weather-icon">
          {this.renderWeatherIcon()}
        </div>
        <div className="weather-card__description">
          <span className="weather-card__description-text">
            {this.props.description}
          </span>
        </div>
      </div>
    );
  }
}

WeatherMainInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const componentState = Object.assign({}, ownProps, state.forecast.main, state.forecast.weather);
  /* if (state.forecast !== undefined) {
    if (state.forecast.city !== undefined) {
      if (state.forecast.city.name !== undefined && state.forecast.city.name !== null) {
        componentState.name = state.forecast.city.name;
      }
    }
  } */

  return componentState;
};

export default connect(mapStateToProps)(WeatherMainInfo);
