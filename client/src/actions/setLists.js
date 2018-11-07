import { LISTS_SET } from '../constants/listsSet';

export const setLists = (data) => ({
  type: LISTS_SET,
  list: data
});
