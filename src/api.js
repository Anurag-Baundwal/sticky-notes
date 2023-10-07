import axios from 'axios';

const baseURL = "https://crudcrud.com/api/3b99946b58ba4bdfa8e8ed13c92de6de";

export default axios.create({
  baseURL: baseURL
});
