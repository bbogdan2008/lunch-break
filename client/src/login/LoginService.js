import axios from 'axios';

const loginUserRequest = (params) => axios.post('api/v1/auth/login', params);
export default loginUserRequest;
