import React from 'react';
import CreatableInput from '../components/CreatableInput';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

const list = {
  id: 558,
  title: 'Title',
  user_id: 7,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z' };
const item = {
  id: 173,
  content: 'exe',
  list_id: 558,
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z' };
const item2 = {
  id: 174,
  content: 'Item2',
  list_id: 558,
  created_at: '2018-11-01T11:21:34.751Z',
  updated_at: '2018-11-01T11:21:34.751Z' };

const wrapper = shallow(
  <CreatableInput
      createNotification={createNotification}
      list={list} />);
const wrapper2 = shallow(
  <CreatableInput
      createNotification={createNotification}
      list={list} />);
const instance = wrapper.instance();
const handleChange = jest.spyOn(instance, 'handleChange');
const handleKeyDown = jest.spyOn(instance, 'handleKeyDown');
const createNotification = jest.fn();

describe('CreatableInput', () => {
  it('should call `handleChange`', () => {
    wrapper.setState({ selectedOption: { label: 'I', value: 'I' } });
    wrapper.find('.async-creatable').simulate('change',
      { target: { name: 'selectedOption', value: wrapper.state('selectedOption').value} }
    );
    expect(handleChange).toHaveBeenCalled();
  });

  describe('handleCreateItem', () => {
    beforeAll(() => {
      wrapper2.setState({ selectedOption: { label: 'I', value: 'I' } });
      mock.onPost('/api/items', { 'content': wrapper2.state('selectedOption').value, list_id: 558 } ).reply(201, item);
      wrapper2.instance().handleCreateItem({ preventDefault: () => {} });
      wrapper2.update(<CreatableInput />);
    });

    it('shoud setState `items`', () => {
      expect(wrapper2.state().items).toEqual([item]);
    });
  });

  describe('keydown', () => {
    beforeAll(() => {
      wrapper.setState({ selectedOption: { label: 'I', value: 'I' } });
      mock.onPost('/api/items', { 'content': wrapper.state('selectedOption').value, list_id: 558 } ).reply(201, item2);
      wrapper.find('.async-creatable').simulate('click');
      wrapper.find('.async-creatable').simulate('keyDown', { keyCode: 13 });
      wrapper.update(<CreatableInput />);
    });

    it('have been called', () => {
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('promiseOptions', () => {
    beforeAll(() => {
      mock.onPost('/api/items', { params: 'i' }).reply(200, { label: 'item', value: 'item' });
      wrapper.instance().loadOptions('i', { label: 'item', value: 'item' });
      wrapper.find('.async-creatable').simulate('click');
      wrapper.find('.async-creatable').simulate('change', 'i');
      wrapper.update(<CreatableInput />);
    });
  });

  describe('handleDestroyItem', () => {
    beforeAll(() => {
      mock.onDelete('/api/items/173', {}).reply(204, {});
      wrapper.instance().handleDestroyItem(1, item);
      wrapper.update(<CreatableInput />);
    });

    it('shoult destroy item', () => {
      expect(wrapper.state().items).toEqual([]);
    });
  });

  describe('componentDidMount', () => {
    beforeAll(() => {
      mock.onGet('/api/lists/558').reply(204, item2);
      wrapper.instance().componentDidMount();
      wrapper.update(<CreatableInput />);
    });
  });
});
