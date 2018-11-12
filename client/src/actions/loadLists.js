import { LOAD_LISTS } from '../constants/actionTypes';

export const lists = (data) => ({
  type: LOAD_LISTS,
  list: data
});
