import { createStore } from 'redux';
import articleReducer from '../reducers/articleReducer';

const store = createStore(articleReducer);

export default store;
