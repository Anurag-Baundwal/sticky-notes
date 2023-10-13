import axios from 'axios';

export const createAPI = (baseURL) => {
  return axios.create({
    baseURL: baseURL
  });
};
