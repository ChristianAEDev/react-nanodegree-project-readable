import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_POST = 'ADD_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';

const ENDPOINT_URL = 'http://localhost:5001';
const token = 'authrozation-header-value';
const config = { headers: { Authorization: token } };

export function addComment(comment) {
  const request = axios.post(`${ENDPOINT_URL}/comments`, comment, config);

  return {
    type: ADD_COMMENT,
    payload: request,
  };
}

export function deleteComment(id) {
  const request = axios.delete(`${ENDPOINT_URL}/comments/${id}`, config);

  return {
    type: DELETE_COMMENT,
    payload: request,
  };
}

export function getCategories() {
  const request = axios.get(`${ENDPOINT_URL}/categories`, config);

  return {
    type: GET_CATEGORIES,
    payload: request,
  };
}

export function getComments(postID) {
  const request = axios.get(`${ENDPOINT_URL}/posts/${postID}/comments`, config);

  return {
    type: GET_COMMENTS,
    payload: request,
  };
}

export function getPost(postID) {
  const request = axios.get(`${ENDPOINT_URL}/posts/${postID}`, config);

  return {
    type: GET_POST,
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
