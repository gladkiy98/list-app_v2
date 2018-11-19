import React from 'react';
import User from '../components/User';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const user = {
  id: 173,
  username: 'Yaroslav',
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z' };
const onHandleShowLists = jest.fn();
const follow = jest.fn();
const wrapper = shallow(<User follow={follow} onHandleShowLists={onHandleShowLists} user={user} />);

describe('Users', function() {
 it('should be follow user', function() {
   wrapper.find('.follow').simulate('click');
   expect(follow).toHaveBeenCalled();
 });
 it('should be show user list', function() {
   wrapper.find('.username').simulate('click');
   expect(onHandleShowLists).toHaveBeenCalled();
 });
});
