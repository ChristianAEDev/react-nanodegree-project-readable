import {
  POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION,
  SET_COMMENTS_BUTTON_MODE,
} from '../actions/ViewStateActions';

/**
 * Define the default view state. It is used to determine how the UI components behave initially.
 */
const defaultState = {
  sortPostsBy: 'voteScore',
  commentsButtonMode: 'add',
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION:
      return {
        ...state,
        sortPostsBy: action.payload,
      };
    case SET_COMMENTS_BUTTON_MODE:
      return {
        ...state,
        commentsButtonMode: action.payload,
      };
    default:
      return state;
  }
}
