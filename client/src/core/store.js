import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import DevTools from './DevTools';

import rootSaga from './Sagas';
import rootReducer from './reducers';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger({
    // ...options
  });


  const enhancer = compose(
    applyMiddleware(loggerMiddleware, sagaMiddleware),
    DevTools.instrument(),
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer,
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
