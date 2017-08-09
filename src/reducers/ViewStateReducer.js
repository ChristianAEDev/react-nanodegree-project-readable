import { POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION } from '../actions/ViewStateActions';

/**
 * Define the default view state. It is used to determine how the UI components behave initially.
 */
const defaultState = {
  sortPostsBy: 'voteScore',
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case POSTS_OVERVIEW_SORT_POSTS_BY_SELECTION:
      return {
        ...state,
        sortPostsBy: action.payload,
      };
    default:
      return state;
  }
}
