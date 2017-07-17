import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Request from '../../helpers/request';

// import './page.less';

const renderInput = () => <input type="text" key="city-input" />;
// const renderInput = () => <input type="text" />;

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recommendedLocation: 'no',
    };
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
            console.log(data);
            this.setState({
              recommendedLocation: JSON.parse(data).name,
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

  renderRecommendedLocation() {
    return `Recommended location: ${JSON.stringify(this.state.recommendedLocation)}`;
  }

  renderContent() {
    const { cityId } = this.props;
    const renderArray = [renderInput('')];

    if (cityId !== (null || undefined)) {
      renderArray.push(
        <div key="recommended-location">
          {this.renderRecommendedLocation()}
        </div>,
      );
    }

    return renderArray;
  }

  render() {
    return (
      <div className="search-bar">
        {this.renderContent()}
      </div>
    );
  }
}

SearchBar.propTypes = {
  cityId: PropTypes.number,
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

export default connect(mapStateToProps)(SearchBar);
