import React from 'react';
import ListContainer from '../components/ListContainer';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

const list = { id: 558,
  title: 'New title',
  user_id: 7,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z' };
const wrapper = shallow(<ListContainer />);
const func = wrapper.instance();
const handleDestroyList = jest.spyOn(func, 'handleDestroyList');
const handleFocus = jest.spyOn(func, 'handleFocus');
const handleCreateList = jest.spyOn(func, 'handleCreateList');
const componentDidMount = jest.spyOn(func, 'componentDidMount');

describe('validations', () => {
  it('should give errors', () => {
    wrapper.find('.create_list').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual({
      'title_length' : 'Title cannot be empty (minimum is 1 character)'
    });
  });
});

describe('handleChange', () => {
  it('should change title', () => {
    wrapper.find('.title_input').simulate('change', { target: { name: 'title', value: 'New title' } });
    expect(wrapper.state().title).toEqual('New title');
  });
});

describe('handleCreateList', () => {
  beforeAll(() => {
    mock.onPost('/api/lists', { list: { 'title': wrapper.state().title } }).reply(201, list);
    wrapper.find('.create_list').simulate('click', { preventDefault: () => {} });
    wrapper.update(<ListContainer />);
  });

  it('should change state', () => {
    expect(wrapper.state().title).toEqual('New title');
    expect(wrapper.state().lists.length).toEqual(1);
    expect(wrapper.state().lists).toEqual([list]);
  });
});

describe('handleFocus', () => {
  it('handleFocus',() => {
    mock.onPut('/api/lists/558', { 'title': list.title }).reply(200, list);
    wrapper.instance().handleFocus(list)(list.title);
    wrapper.update(<ListContainer />);
  });

  it('test', () => {
    expect(handleFocus).toHaveBeenCalled();
  });
});

describe('handleDestroyList', () => {
  beforeAll(() => {
    mock.onDelete('/api/lists/558').reply(204, {});
    wrapper.instance().handleDestroyList(1, list)();
    wrapper.update(<ListContainer />);
  });

  it('should destroy list', () => {
    expect(handleDestroyList).toHaveBeenCalled();
  });
});

describe('keydown', () => {
  beforeAll(() => {
    mock.onPost('/api/lists', { list: { 'title': wrapper.state().title } }).reply(201, list);
    wrapper.find('.title_input').simulate('keyDown', { keyCode: 13 });
    wrapper.update(<ListContainer />);
  });

  it('shoud setState `items`', () => {
    expect(handleCreateList).toHaveBeenCalled();
  });
});

describe('componentDidMount', () => {
  beforeAll(() => {
    mock.onGet('/api/lists.json').reply(201, list);
    wrapper.instance().componentDidMount();
    wrapper.update(<ListContainer />);
  });

  it('should change state', () => {
    expect(componentDidMount).toHaveBeenCalled();
  });
});
