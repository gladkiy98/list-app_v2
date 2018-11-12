import * as actionTypes from '../constants/actionTypes';

export const lists = (data) => ({
  type: actionTypes.LOAD_LISTS,
  list: data
});
