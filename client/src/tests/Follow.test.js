import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import { Follow } from '../components/Follow';
import axios from 'axios';
import FollowContainer from '../components/Follow';
import configureMockStore from 'redux-mock-store';
import { mapDispatchToProps } from '../components/Follow';

const mockStore = configureMockStore();

const user = [{
    id: 173,
    username: 'Yaroslav'
}];
const list = {
  id: 558,
  title: 'Title',
  user_id: 173,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z'
};

configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);
const wrapper = shallow(<Follow />);
const func = wrapper.instance();
const follow = jest.spyOn(func, 'follow');
const componentDidMount = jest.spyOn(func, 'componentDidMount');
const handleShowLists = jest.spyOn(func, 'handleShowLists');

describe('Component Follow', () => {
  beforeAll(() => {
    mock.onPost('/api/follows').reply(200, user);
    wrapper.instance().follow(user)();
    wrapper.update(<Follow />);
  });

  it('call function unFollow', () => {
    expect(follow).toHaveBeenCalled();
  });
});

describe('Component Follow', () => {
  beforeAll(() => {
    mock.onGet('/api/users').reply(200, user);
    wrapper.instance().componentDidMount();
    wrapper.update(<Follow />);
  });

  it('call function componentDidMount', () => {
    expect(componentDidMount).toHaveBeenCalled();
  });

  it('check state for user', () => {
    expect(wrapper.state().users[0].username).toEqual('Yaroslav');
    expect(wrapper.state().users).toEqual(user);
  });
});

describe('Component Follow', () => {
  let wrapper,store;

  beforeEach(() => {
    const initialState = {
      lists: []
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <FollowContainer store={store} />
    );
  });

  it('should show previously rolled value', () => {
    expect(wrapper.props().list).toEqual([]);
  });
});

describe('Component Following', () => {
  beforeAll(() => {
    mock.onGet('/api/userlists').reply(200, list);
    wrapper.instance().handleShowLists(user[0].username)();
    wrapper.update(<Follow />);
  });

  it('call function showLists', () => {
    expect(handleShowLists).toHaveBeenCalled();
  });

  it('call dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setLists();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LISTS_SET'});
  });
});

describe('Component Following', () => {
  it('work search users', () => {
    wrapper.find('input').simulate('change', { target: { value: 'vtstepura' }});
    expect(wrapper.state().term).toEqual('vtstepura');
  });
});
