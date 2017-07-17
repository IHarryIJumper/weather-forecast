import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './page.less';

import SearchBar from '../searchBar/searchBar';

const renderInput = () => <SearchBar key="city-search-bar" />;

class Page extends React.PureComponent {
  renderContent() {
    const { cityId } = this.props;
    const renderArray = [renderInput()];

    if (cityId !== (null || undefined)) {
      renderArray.push(<div className="card" key="weather-card" />);
    }

    return renderArray;
  }

  render() {
    return (
      <div className="page">
        {this.renderContent()}
      </div>
    );
  }
}

Page.propTypes = {
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

export default connect(mapStateToProps)(Page);
