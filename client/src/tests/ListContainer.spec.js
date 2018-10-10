import React from 'react';
import ListContainer from '../components/ListContainer';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

describe('ListContainer', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should create List', () => {
    const wrapper = shallow(<ListContainer />);
    wrapper.find('#title').simulate('change', { target: { name: 'title', value: 'Title' } });
    const p = wrapper.find('.create_list');
    p.simulate('click', {
      preventDefault: () => {
      }
    });

    mock.onPost('/api/lists', { list: { 'title': wrapper.state('title') } })
    .reply(
      201,
      { id: 1, title: 'Title', user_id: 5 }
    );

    axios.post('/api/lists', { list: { 'title': wrapper.state('title') } })
    .then((response) => {
      expect(response.data.title).toEqual('Title');
    });
  });
});
