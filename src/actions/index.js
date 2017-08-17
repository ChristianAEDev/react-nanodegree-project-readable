import axios from 'axios';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_POST = 'ADD_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const RESET_STATE = 'RESET_STATE';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_ON_POST = 'VOTE_ON_POST';

const ENDPOINT_URL = 'http://localhost:5001';
const token = 'authrozation-header-value';
const headers = { Authorization: token };
const config = { headers };

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
    payload: id,
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ENDPOINT_URL}/posts/${id}`, config);
  
  return {
    type: DELETE_POST,
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

export function resetState() {
  return {
    type: RESET_STATE,
  }
}

export function updateComment(comment) {
  // The server only expects a timestamp and body
  const data = {
    timestamp: comment.timestamp,
    body: comment.body,
  };
  
  const request = axios.put(`${ENDPOINT_URL}/comments/${comment.id}`, data, config);
  
  return {
    type: UPDATE_COMMENT,
    payload: request,
  };
}

export function updatePost(post) {
  // The server only expects a timestamp and body
  const data = {
    title: post.title,
    body: post.body,
  };

  const request = axios.put(`${ENDPOINT_URL}/posts/${post.id}`, data, config);

  return {
    type: UPDATE_POST,
    payload: request,
  };
}

export function voteOnPost(option, postID) {
  const data = {
    option,
  };

  const request = axios.post(`${ENDPOINT_URL}/posts/${postID}`, data, config);

  return {
    type: VOTE_ON_POST,
    payload: request,
  };
}
