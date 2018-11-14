import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import { Follow } from '../components/Follow';
import axios from 'axios';

const user = {
  id: 173,
  username: 'Yaroslav',
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z' };

configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);
const wrapper = shallow(<Follow />);
const func = wrapper.instance();
const follow = jest.spyOn(func, 'follow');

describe('Component Following', () => {
  beforeAll(() => {
    mock.onPost('/api/follows').reply(200, {});
    wrapper.instance().follow(user)();
    wrapper.update(<Follow />);
  });
  it('call function unFollow', () => {
    expect(follow).toHaveBeenCalled();
  });
});
