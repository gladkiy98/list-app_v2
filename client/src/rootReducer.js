import { combineReducers } from 'redux';
import locale from './reducers/locale';
import testReducer from './reducers/testReducer';

export default combineReducers({
  locale,
  testReducer
});
