import { ADD_LIST, LOAD_LISTS, DESTROY_LIST } from '../constants/actionTypes';

export default function currentUserLists(state = { lists: [] }, action) {
  switch (action.type) {
    case LOAD_LISTS:
      return { ...state, lists: action.list };
    case ADD_LIST:
      return { ...state, lists: [...state.lists, action.list] };
    case DESTROY_LIST:
      return { lists: [
        ...state.lists.slice(0, action.index),
        ...state.lists.slice(action.index + 1)
      ] };
    default:
      return state;
  }
}
