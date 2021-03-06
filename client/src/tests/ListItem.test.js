import React from 'react';
import ListItem from '../components/ListItem';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const list = {
  id: 558,
  title: 'Title',
  user_id: 7,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z' };
const createNotification = jest.fn();
const onHandleDestroyList = jest.fn();
const onHandleEdit = jest.fn();
const wrapper = shallow(
  <ListItem
      createNotification={createNotification}
      i={0}
      key={list.id}
      list={list}
      onHandleDestroyList={onHandleDestroyList}
      onHandleEdit={onHandleEdit} />);

describe('ListItem', () => {
  it('test `onHandleDestroyList`', () => {
    wrapper.find('.delete-list').simulate('click', { preventDefault: () => {} });
    expect(onHandleDestroyList).toHaveBeenCalled();
  });

  it('test `onHandleFocus`', () => {
    wrapper.find('.title-label').simulate('click');
    expect(onHandleDestroyList).toHaveBeenCalled();
  });

  describe('test button `.create-item`', () => {
    beforeAll(() => {
      wrapper.find('.create-item').simulate('click');
    });

    it('expect state to be true', () => {
      expect(wrapper.state('open')).toBe(true);
    });
  });

  describe('test button `.close-button`', () => {
    beforeAll(() => {
      wrapper.find('.close-button').simulate('click');
    });

    it('expect state to be true', () => {
      expect(wrapper.state('open')).toBe(false);
    });
  });
});
