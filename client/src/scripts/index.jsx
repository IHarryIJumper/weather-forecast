import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import combinedReducer from './reducers/reducers';

import Page from './components/page/page';

const store = createStore(combinedReducer);

render(
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root'),
);
