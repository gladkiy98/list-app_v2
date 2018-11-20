import { LISTS_SET } from '../constants/listsSet';

const initialState = {
  list:[]
};

export default function lists(state = initialState,action = {}) {
  switch(action.type) {
    case LISTS_SET:
      return { ...state, list: action.lists };
    default:
      return state;
  }
}
