import { all } from 'redux-saga/effects';

import loginSaga from '../login/LoginSaga';

export default function* rootSaga() {
  yield all([
    loginSaga()
  ])
}