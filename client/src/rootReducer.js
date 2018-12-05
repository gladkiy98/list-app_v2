import { combineReducers } from 'redux';
import locale from './reducers/locale';
import articleReducer from './reducers/articleReducer';
import lists from './reducers/lists';

export default combineReducers({
  locale,
  articleReducer,
  lists
});
