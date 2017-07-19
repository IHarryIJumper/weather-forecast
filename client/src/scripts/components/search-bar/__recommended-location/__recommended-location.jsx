import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Request from '../../../helpers/request';

import forecastActions from '../../../actions/forecastActions';

import './__recommended-location.less';

class RecommendedLocation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recommendedLocation: 'searching...',
      recommendedLocationWeather: {},
    };

    this.setRecommendedLocation = this.setRecommendedLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        Request.get(
          {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          (data) => {
            const parsedWeatherData = JSON.parse(data);
            this.setState({
              recommendedLocationWeather: parsedWeatherData,
              recommendedLocation: parsedWeatherData.name,
            });
          },
          (error) => {
            console.error(error);
          },
        );
      });
    } else {
      this.setState({
        recommendedLocation: 'Geolocation is not supported by this browser.',
      });
    }
  }

  setRecommendedLocation() {
    const { recommendedLocationWeather } = this.state;
    const { cityId } = this.props;

    if (recommendedLocationWeather.id !== cityId) {
      this.props.dispatch(forecastActions.updateDataFromApi(recommendedLocationWeather));
    }
  }

  render() {
    const { recommendedLocation } = this.state;
    if (recommendedLocation !== 'no') {
      return (
        <div className="search-bar__recommended-location">
          <span className="search-bar__recommended-location-title">Your location: </span>
          <span
            className="search-bar__recommended-location-link"
            role="button"
            tabIndex="0"
            onClick={this.setRecommendedLocation}
          >
            {this.state.recommendedLocation}
          </span>
        </div>
      );
    }
    return (
      <div className="search-bar__recommended-location">
        <span className="search-bar__recommended-location-title">Recommended location: </span>
        <span className="search-bar__recommended-location-link search-bar__recommended-location-link_disabled">
          {this.state.recommendedLocation}
        </span>
      </div>
    );
  }
}

RecommendedLocation.propTypes = {
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

export default connect(mapStateToProps)(RecommendedLocation);
