import { ADD_POST, GET_COMMENTS, GET_POSTS, VOTE_ON_POST } from '../actions';

/**
 * Handles the data coming from an action creating a new state from it. Since the state is never to
 * be manipulated directly. It is seen as immutable!
 * @param {*} state
 * @param {*} action
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload.data];
    case GET_COMMENTS:
      // All comments returned here are always for the same post
      let comments = action.payload.data;

      if (comments && comments.length > 0) {
        let parentID = comments[0].parentId

        return state.map(post => {
          if (post.id === parentID) {
            return {
              ...post,
              comments: comments
            };
          }
          return post
        });
      }
      return state;
    case GET_POSTS:
      if (action && action.error) {
        return [];
      }
      return action.payload.data;
    case VOTE_ON_POST:
      const updatedPost = action.payload.data;

      return state.map((post) => {
        if (updatedPost.id === post.id) {
          return updatedPost;
        }
        return post;
      });
    default:
      return state;
  }
}
