import { axios } from './axios';

export const profile = async () => {
  try {
    const response = await axios.get('/auth/profile');
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const login = async (data) => {
  try {
    await axios.post('/auth/login', data);
  } catch (e) {
    console.error(e.message);
  }
};
