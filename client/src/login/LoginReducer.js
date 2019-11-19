import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from './LoginAction';

const INITIAL_STATE = {
    errorMessage: '',
    isLoading: false
};

export function loginReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return { ...state, isLoading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, isLoading: false };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.message
            };
        default:
            return state;
    }
}
