import { GET_COMMENTS, GET_POST } from '../actions';

/**
 * Handles the data coming from an action creating a new state from it. Since the state is never to
 * be manipulated directly. It is seen as immutable!
 * @param {*} state
 * @param {*} action
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      if (action && action.error) {
        return state;
      }
      console.log(GET_COMMENTS, action.payload.data)
      return {
        ...state,
        comments: action.payload.data,
      };
    case GET_POST:
      // In case of an error we return an empty state
      // TODO: Is it better to return the previous state? What happens in the UI?
      if (action && action.error) {
        return state;
      }
      return action.payload.data;
    default:
      return state;
  }
}
