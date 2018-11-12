import { LOAD_LISTS, DESTROY_LIST } from '../constants/actionTypes';

export default function currentUserLists(state = { lists: [] }, action) {
  switch (action.type) {
    case LOAD_LISTS:
      return { ...state, lists: action.list }
    case DESTROY_LIST:
      return { }
    default:
      return state
  }
}
