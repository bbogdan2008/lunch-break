import {LOGIN} from './LoginAction';

const INITIAL_STATE = {
  username: ''
}

export function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        username: action.payload
      };
    }
    default:
      return state;
  }
}