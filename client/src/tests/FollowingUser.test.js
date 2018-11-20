import React from 'react';
import FollowingUsers from '../components/FollowingUsers';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const user = {
  id: 173,
  username: 'Yaroslav',
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z'
};

const unFollow = jest.fn();

const wrapper = shallow(<FollowingUsers i={0} unFollow={unFollow} user={user} />);

describe('FollowingUsers', function() {
 it('should be unfollow user', function() {
   wrapper.find('.unfollow').simulate('click');
   expect(unFollow).toHaveBeenCalled();
 });
});
