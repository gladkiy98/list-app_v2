import { LISTS_SET } from '../constants/listsSet';

const initialState = {
  list:[]
};

const lists = (state = initialState, action = {}) => {
  switch (action.type) {
    case LISTS_SET:
      return { ...state, list: action.lists };
    default:
      return state;
  }
};

export default lists;
