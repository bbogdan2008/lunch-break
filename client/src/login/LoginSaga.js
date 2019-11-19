import { call, put, takeLatest } from 'redux-saga/effects';

import { loginUserRequest } from './LoginService';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './LoginAction';

function *loginUserSaga (action) {
    try {
        yield call(loginUserRequest, action.payload);
    } catch (e) {
        yield put({ type: LOGIN_USER_FAILURE, payload: { message: 'error' } });
        return;
    }
    yield put({ type: LOGIN_USER_SUCCESS });
}

export default function *loginSaga () {
    yield takeLatest(LOGIN_USER_REQUEST, loginUserSaga);
}
