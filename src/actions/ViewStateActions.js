export const POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION = 'POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION';
export const SET_COMMENTS_BUTTON_MODE = 'SET_COMMENTS_BUTTON_MODE';
export const SET_POST_EDIT_MODE = 'SET_POST_EDIT_MODE';

export function sortPostsBy(key) {
  return {
    type: POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION,
    payload: key,
  };
}

export function setCommentButtonMode(mode) {
  return {
    type: SET_COMMENTS_BUTTON_MODE,
    payload: mode,
  };
}

export function setPostEditMode(mode) {
  return {
    type: SET_POST_EDIT_MODE,
    payload: mode,
  }
}