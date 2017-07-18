import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Request from '../../../helpers/request';

import forecastActions from '../../../actions/forecastActions';

import './__search-input.less';

class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.stringInput = null;

    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(event) {
    if (event.key === 'Enter') {
      if (this.stringInput !== null) {
        if (this.stringInput.value !== '') {
          console.log(this.stringInput.value.replace(/^\s+|\s+$/g, ''));
          Request.get(
            {
              q: this.stringInput.value.replace(/^\s+|\s+$/g, ''), // removing extra spaces
            },
            (data) => {
              console.log(data);
              const parsedWeatherData = JSON.parse(data);
              this.props.dispatch(forecastActions.updateDataFromApi(parsedWeatherData));
              this.stringInput.value = '';
            },
            (error) => {
              console.error(error);
            },
          );
        }
      }
    }
  }

  render() {
    return (
      <input
        className="search-bar__search-input"
        type="text"
        placeholder="City name"
        ref={(element) => {
          this.stringInput = element;
        }}
        onKeyPress={(event) => {
          this.setLocation(event);
        }}
      />
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps)(SearchInput);
