import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';

const ENDPOINT_URL = 'http://localhost:5001';
const token = 'authrozation-header-value';
const config = { headers: { Authorization: token } };

export function getCategories() {
  const request = axios.get(`${ENDPOINT_URL}/categories`, config);

  return {
    type: GET_CATEGORIES,
    payload: request,
  };
}

export function getPosts() {
  const request = axios.get(`${ENDPOINT_URL}/posts`, config);

  return {
    type: GET_POSTS,
    payload: request,
  };
}
