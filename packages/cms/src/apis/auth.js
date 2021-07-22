import { axios } from './axios';

export const profile = async () => {
  try {
    const response = await axios.get('/auth/profile');
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post('/auth/login', data);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.get('/auth/logout');
  } catch (e) {
    console.error(e.message);
  }
};
