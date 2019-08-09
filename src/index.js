import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./core/App";
import { configureStore } from "./core/store";

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
