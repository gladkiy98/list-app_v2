import { LISTS_SET } from '../constants/listsSet';

export default function lists(state = { list: [] },action = {}) {
  switch(action.type) {
    case LISTS_SET:
      return { ...state, list: action.list };
    default:
      return state;
  }
}
