import React from 'react';
import Following from '../components/Following';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

const user = {
  id: 173,
  username: 'Yaroslav',
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z'
};
const wrapper = shallow(<Following />);
const func = wrapper.instance();
const componentDidMount = jest.spyOn(func, 'componentDidMount');
const unFollow = jest.spyOn(func, 'unFollow');

describe('Component Following', () => {
  beforeAll(() => {
    mock.onDelete('/api/follows/173').reply(200, {});
    wrapper.instance().unFollow(1, user)();
    wrapper.update(<Following />);
  });

  it('call function unFollow', () => {
    expect(unFollow).toHaveBeenCalled();
  });
});

describe('Component Following', () => {
  beforeAll(() => {
    mock.onGet('/api/follows').reply(200, {});
    wrapper.instance().componentDidMount();
    wrapper.update(<Following />);
  });

  it('call function componentDidMount', () => {
    expect(componentDidMount).toHaveBeenCalled();
  });
});
