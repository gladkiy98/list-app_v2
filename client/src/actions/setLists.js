import { LISTS_SET } from '../constants/listsSet';

export const setLists = (data) => {
  return {
    type: LISTS_SET,
    list: data
  };
};
