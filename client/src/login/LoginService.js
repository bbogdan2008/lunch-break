import axios from 'axios';

export const loginUserRequest = (params) => {
    return axios.post('api/v1/auth/login', params);
};
