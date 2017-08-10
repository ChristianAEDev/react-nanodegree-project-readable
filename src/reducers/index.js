import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CategoriesReducer from './CategoriesReducer';
import PostReducer from './PostReducer';
import ViewStateReducer from './ViewStateReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  categories: CategoriesReducer,
  // Since it is a requirement that ALL state is handled by redux. We will use this state to manage
  // the state of components. i.e. keep track of the value of an input box.
  viewState: ViewStateReducer,
  // We HAVE to use "form" as the name for the formReducer from redux-form.
  // Otherwise redux-form will not work!
  form: formReducer,
});

export default rootReducer;
