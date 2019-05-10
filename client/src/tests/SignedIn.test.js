import React from 'react';
import SignedIn from '../components/SignedIn';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);

const renderRedirect = jest.fn();
const clearStorage = jest.fn();
const wrapper = shallow(
  <SignedIn
      clearStorage={clearStorage}
      renderRedirect={renderRedirect} />
);
const func = wrapper.instance();
const componentDidMount = jest.spyOn(func, 'componentDidMount');


describe('SignedIn', () => {
  describe('componentDidMount', () => {
    beforeAll(() => {
      mock.onGet('/api/usernames').reply(200, 'username');
      wrapper.instance().componentDidMount();
      wrapper.update(<SignedIn />);
    });

    it('should change state', () => {
      expect(componentDidMount).toHaveBeenCalled();
    });
  });
});
