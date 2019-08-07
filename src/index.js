import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./core/App";
import configureStore from "./core/store";

import {doLogin} from './login/LoginAction';

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
