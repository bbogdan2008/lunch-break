import { combineReducers } from 'redux';

import loginReducer from '../login/LoginReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
