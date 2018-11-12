import { DESTROY_LIST } from '../constants/actionTypes';

export const destroyList = (id) => {
  type: DESTROY_LIST,
  list: id
};
