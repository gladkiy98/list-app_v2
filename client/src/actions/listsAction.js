import { LOAD_LISTS, DESTROY_LIST, ADD_LIST } from '../constants/actionTypes';

export const loadLists = (data) => {
  return {
    type: LOAD_LISTS,
    list: data
  };
};

export const addList = (data) => {
  return {
    type: ADD_LIST,
    list: data
  };
};

export const destroyList = (index) => {
  return {
    type: DESTROY_LIST,
    index: index
  };
};
