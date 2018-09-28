import { combineReducers } from 'redux';
import locale from './reducers/locale';
import articleReducer from './reducers/articleReducer';

export default combineReducers({
  locale,
  articleReducer
});
