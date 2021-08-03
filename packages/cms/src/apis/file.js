import { axios } from './axios';

export const uploadFile = async (type, file, updateProgress) => {
  try {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', file);
    const response = await axios.post('/file', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        updateProgress(percentCompleted);
      }
    });
    return response.data?.data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};
