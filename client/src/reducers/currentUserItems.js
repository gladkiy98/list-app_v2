import { LOAD_ITEMS, DESTROY_ITEM, ADD_ITEM } from '../constants/actionTypes';

export default function currentUserItems(state = { items: [] }, action) {
  switch(action.type) {
    case LOAD_ITEMS:
      return { ...state, items: action.item };
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    case DESTROY_ITEM:
      return { items: [
        ...state.items.slice(0, action.index),
        ...state.items.slice(action.index + 1)
      ] };
    default:
      return state;
  }
}
