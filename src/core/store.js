import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from "./reducers";

const logger = createLogger({
  // ...options
});

const configureStore = () => {

  return {
    ... createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(logger))
    )
  }
};

export default configureStore;
