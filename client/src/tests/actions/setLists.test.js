import * as actions from '../../actions/setLists';
import * as types from '../../constants/listsSet';

const lists = {
  id: 558,
  title: 'New title',
  user_id: 173,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z'
};

describe('actions', () => {
  it('should create an action to add a list', () => {
    const expectedAction = {
      type: types.LISTS_SET,
      lists
    };
    expect(actions.setLists(lists)).toEqual(expectedAction);
  });
});
