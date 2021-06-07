import axios from 'axios';
import config from './config'

const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default instance