import React from 'react';

import SearchInput from './__search-input/__search-input';
import RecommendedLocation from './__recommended-location/__recommended-location';

import './search-bar.less';

const SearchBar = () => (
  <div className="search-bar search-bar_shadow">
    <SearchInput />
    <RecommendedLocation />
  </div>
  );

export default SearchBar;
