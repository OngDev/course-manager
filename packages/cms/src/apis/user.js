import { axios } from './axios';

export const find = async (queryPath = '') => {
  try {
    const response = await axios.get(`/users${queryPath ? `?${queryPath}` : ''}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const findOne = async (id, queryPath = '') => {
  try {
    const response = await axios.get(`/users/${id}${queryPath ? `?${queryPath}` : ''}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const create = async (data) => {
  try {
    const response = await axios.post('/users/create', data);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const update = async (id, data) => {
  try {
    const response = await axios.put(`/users/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
  } catch (e) {
    console.error(e.message);
    return null;
  }
};
