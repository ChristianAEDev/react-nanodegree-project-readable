export const POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION = 'POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION';

export function sortPostsBy(key) {
  return {
    type: POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION,
    payload: key,
  };
}
