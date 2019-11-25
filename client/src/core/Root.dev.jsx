import React from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import App from './App';
import configureStore from './store';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
    <DevTools />
  </Provider>
);

export default Root;
