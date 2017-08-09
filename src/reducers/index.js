import { combineReducers } from 'redux';
import CategoriesReducer from './CategoriesReducer';
import PostReducer from './PostReducer';
import ViewStateReducer from './ViewStateReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  categories: CategoriesReducer,
  // Since it is a requirement that ALL state is handled by redux. We will use this state to manage
  // the state of components. i.e. keep track of the value of an input box.
  viewState: ViewStateReducer,
});

export default rootReducer;
