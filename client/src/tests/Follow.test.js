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

const list = [];

configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);
const wrapper = shallow(<Follow />);
const func = wrapper.instance();
const follow = jest.spyOn(func, 'follow');
const componentDidMount = jest.spyOn(func, 'componentDidMount');

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

describe('Component Following', () => {
  beforeAll(() => {
    mock.onGet('/api/users.json').reply(200, {});
    wrapper.instance().componentDidMount(user);
    wrapper.update(<Follow />);
  });
  it('call function componentDidMount', () => {
    expect(follow).toHaveBeenCalled();
  });
});

describe('Component Following', () => {
  beforeAll(() => {
    wrapper.instance().handleClick(user.id);
    mock.onGet('/api/userlists').reply(list);
    wrapper.update(<Follow />);
  });
  it('call function componentDidMount', () => {
    expect(componentDidMount).toHaveBeenCalled();
  });
});
