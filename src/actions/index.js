import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';

const ENDPOINT_URL = 'http://localhost:5001';
const token = 'token-value';
const config = { headers: { Authorization: token } };

export function getPosts() {
  const request = axios.get(`${ENDPOINT_URL}/posts`, config);

  return {
    type: GET_POSTS,
    payload: request,
  };
}
