import { combineReducers } from 'redux';
import locale from './reducers/locale';
import currentUserLists from './reducers/currentUserLists';
import currentUserItems from './reducers/currentUserItems';

export default combineReducers({
  currentUserItems,
  currentUserLists,
  locale
});
