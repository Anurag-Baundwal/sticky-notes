import axios from 'axios';

const baseURL = "https://crudcrud.com/api/49c758d7b1a8454cbe0e8f1d622841e5";

export default axios.create({
  baseURL: baseURL
});
