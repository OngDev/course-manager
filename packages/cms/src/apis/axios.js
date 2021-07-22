import axios from 'axios';
import statusCodes from 'http-status-codes';
import { SERVER_URL } from '../utils/config';

let updateLoginState = null;
const setUpdateLoginState = (updateLoginStateFunction) => {
  updateLoginState = updateLoginStateFunction;
};

const instance = axios.create({
  withCredentials: true,
  baseURL: SERVER_URL
});

instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const PATHS_THAT_GET_IDENTITY = ['/auth/login', '/auth/profile'];
    const hasIdentity =
      response?.data?.username &&
      response?.config?.url &&
      PATHS_THAT_GET_IDENTITY.includes(response.config.url);
    if (hasIdentity) {
      updateLoginState({
        id: response.data.id,
        email: response.data.email,
        username: response.data.username,
        fullName: response.data.fullName
      });
    }
    if (response.config.url === '/logout') {
      updateLoginState(null);
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === statusCodes.UNAUTHORIZED) {
      updateLoginState(null);
    }
    return Promise.reject(error);
  }
);

export { instance as axios, setUpdateLoginState };
