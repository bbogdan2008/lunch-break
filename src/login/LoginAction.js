
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export function doLogin(username) {
  return {
    type: LOGIN,
    payload: username
  }
}