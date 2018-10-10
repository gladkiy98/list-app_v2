import React from 'react';
import SignIn from '../components/Signin';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);

describe('Signin form', () => {
  afterEach(() => {
    mock.restore();
  });

  it('should click button with valid username and password', () => {
    const token = 'j3g12h3jbjheb1hj2e';
    const wrapper = shallow(<SignIn />);
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: '12345678' } });
    wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'user' } });
    const p = wrapper.find('.signin_button');
    p.simulate('click', {
      preventDefault: () => {
      }
    });

    mock.onPost('http://localhost:3000/api/tokens', {
      username: wrapper.state('username'),
      password: wrapper.state('password')
    })
    .reply(
      200,
      token
    );

    axios.post('http://localhost:3000/api/tokens', {
      username: wrapper.state('username'),
      password: wrapper.state('password')
    })
    .then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual('j3g12h3jbjheb1hj2e');
    });
  });
});
