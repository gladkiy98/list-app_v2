import reducer from '../../reducers/lists';
import * as types from '../../constants/listsSet';

const list = [];
const list2 = {
  id: 558,
  title: 'New title',
  user_id: 173,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z'
};

describe('lists reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ list });
  });
  it('should handle LISTS_SET', () => {
    expect(
      reducer({ list2 }, {
        type: types.LISTS_SET,
        list2
      })
    ).toEqual({ list2 });
  });
});
