import 'babel-polyfill';
import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";

import rootSaga from './Sagas';
import rootReducer from "./reducers";

export function configureStore (initialState = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const logger = createLogger({
    // ...options
    });

    const middleware = composeWithDevTools(applyMiddleware(logger, sagaMiddleware));

    const store = createStore(
        rootReducer,
        initialState,
        middleware
    );

    sagaMiddleware.run(rootSaga);

    return store;
}


