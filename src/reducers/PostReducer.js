import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  GET_COMMENTS,
  GET_POST,
  RESET_STATE,
  UPDATE_COMMENT,
  UPDATE_POST,
  VOTE_ON_COMMENT,
  VOTE_ON_POST,
} from '../actions';

/**
 * Handles the data coming from an action creating a new state from it. Since the state is never to
 * be manipulated directly. It is seen as immutable!
 * @param {*} state
 * @param {*} action
 */
export default function (state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      if (action && action.error) {
        return state;
      }
      if (state.comments) {
        return {
          ...state,
          comments: [...state.comments, action.payload.data],
        };
      }

      return {
        ...state,
        comments: [action.payload.data]
      }
    case DELETE_COMMENT:
      if (action && action.error) {
        return state;
      }
      return {
        ...state,
        // comments: _.omit(...state.comments, action.payload.data),
        comments: state.comments.filter(
          (comment) => { return comment.id !== action.payload.data.id; },
        ),
      };
    case DELETE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id !== action.data.payload;
        }),
      };
    case GET_COMMENTS:
      let newState = {
        ...state,
        comments: action.payload.data,
      };
      return newState
    case GET_POST:
      let newState2 = action.payload.data;
      newState2.comments = state.comments
      return action.payload.data;
    case RESET_STATE:
      return [];
    case UPDATE_COMMENT: {
      const updatedComment = action.payload.data;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (updatedComment.id === comment.id) {
            return updatedComment;
          }
          return comment;
        }),
      };
    }
    case UPDATE_POST: {
      const updatedPost = action.payload.data;
      if (state && state.comments) {
        // Keep the comments
        updatedPost.comments = state.comments;
      }
      return updatedPost;
    }
    case VOTE_ON_COMMENT:
      const updatedComment = action.payload.data;
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (updatedComment.id === comment.id) {
            return updatedComment;
          }
          return comment;
        }),
      };
    case VOTE_ON_POST: {
      const updatedPost = action.payload.data;
      if (state && state.comments) {
        // Keep the comments
        updatedPost.comments = state.comments;
      }
      return updatedPost;
    }
    default:
      return state;
  }
}
