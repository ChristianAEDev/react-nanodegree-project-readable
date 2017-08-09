import { combineReducers } from 'redux';
import CategoriesReducer from './CategoriesReducer';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  categories: CategoriesReducer,
});

export default rootReducer;
