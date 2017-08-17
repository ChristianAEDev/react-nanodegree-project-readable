import { GET_POSTS, VOTE_ON_POST } from '../actions';

/**
 * Handles the data coming from an action creating a new state from it. Since the state is never to
 * be manipulated directly. It is seen as immutable!
 * @param {*} state
 * @param {*} action
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      // In case of an error we return an empty state
      // TODO: Is it better to return the previous state? What happens in the UI?
      if (action && action.error) {
        return {};
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
