import React from 'react';
import Item from '../components/Item';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const item = {
  id: 557,
  content: 'Content',
  list_id: 8,
  created_at: '2018-10-30T11:38:55.450Z',
  updated_at: '2018-10-30T11:38:55.450Z' };
const onHandleDestroyItem = jest.fn();
const wrapper = shallow(
  <Item
      i={0}
      item={item}
      onHandleDestroyItem={onHandleDestroyItem} />);

describe('Item', () => {
  it('test `onHandleDestroyItem`', () => {
    wrapper.find('.destroy-item').simulate('click');
    expect(onHandleDestroyItem).toHaveBeenCalled();
  });
});
