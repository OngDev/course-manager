import axios from 'axios';
import config from './config'

const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });

export default instance