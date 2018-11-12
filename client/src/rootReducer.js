import { combineReducers } from 'redux';
import locale from './reducers/locale';
import currentUserLists from './reducers/currentUserLists';

export default combineReducers({
  currentUserLists,
  locale
});
