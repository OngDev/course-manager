import { axios } from './axios';

export const uploadFile = async (type, file) => {
  try {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', file);
    const response = await axios.post('/file', formData);
    return response.data?.data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
