import { LOAD_ITEMS, DESTROY_ITEM, ADD_ITEM } from '../constants/actionTypes';

export const loadItems = (data) => {
  return {
    type: LOAD_ITEMS,
    item: data
  };
};

export const addItem = (data) => {
  return {
    type: ADD_ITEM,
    item: data
  };
};

export const destroyItem = (index) => {
  return {
    type: DESTROY_ITEM,
    index: index
  };
};
