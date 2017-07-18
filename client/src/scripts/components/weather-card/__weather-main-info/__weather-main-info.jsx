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
        returnValue = <i className="wi wi-day-sunny" />;
        break;
      case '01n':
        returnValue = <i className="wi wi-night-clear" />;
        break;
      case '02d':
        returnValue = <i className="wi wi-day-cloudy" />;
        break;
      case '02n':
        returnValue = <i className="wi wi-night-alt-cloudy" />;
        break;
      case '03d':
        returnValue = <i className="wi wi-cloud" />;
        break;
      case '03n':
        returnValue = <i className="wi wi-cloud" />;
        break;
      case '04d':
        returnValue = <i className="wi wi-cloudy" />;
        break;
      case '04n':
        returnValue = <i className="wi wi-cloudy" />;
        break;
      case '09d':
        returnValue = <i className="wi wi-rain" />;
        break;
      case '09n':
        returnValue = <i className="wi wi-rain" />;
        break;
      case '10d':
        returnValue = <i className="wi wi-day-rain" />;
        break;
      case '10n':
        returnValue = <i className="wi wi-night-alt-rain" />;
        break;
      case '13d':
        returnValue = <i className="wi wi-snowflake-cold" />;
        break;
      case '13n':
        returnValue = <i className="wi wi-snowflake-cold" />;
        break;
      case '50d':
        returnValue = <i className="wi wi-fog" />;
        break;
      case '50n':
        returnValue = <i className="wi wi-fog" />;
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
        <div className="weather-card__weather-icon">
          {this.renderWeatherIcon()}
        </div>
        <h2 className="weather-card__temperature">
          {this.props.temp} °C
        </h2>
      </div>
    );
  }
}

WeatherMainInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
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
