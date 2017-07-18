import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './__city-info.less';

class CityInfo extends React.PureComponent {
  render() {
    return (
      <div className="weather-card__city-info">
        <h1 className="weather-card__city-name">
          {this.props.name}
        </h1>
      </div>
    );
  }
}

CityInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const componentState = Object.assign({}, ownProps, state.forecast.city);
  /* if (state.forecast !== undefined) {
    if (state.forecast.city !== undefined) {
      if (state.forecast.city.name !== undefined && state.forecast.city.name !== null) {
        componentState.name = state.forecast.city.name;
      }
    }
  } */

  return componentState;
};

export default connect(mapStateToProps)(CityInfo);
