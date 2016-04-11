import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import DevTools from '../containers/DevTools';

const Root = ({ store }) => (
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <App />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
