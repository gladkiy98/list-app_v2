import React from 'react';
import SignIn from '../components/Signin';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);
const wrapper = shallow(<SignIn />);
const response = { jwt: 'j3g12h3jbjheb1hj2e' };

describe('Signin form', () => {
  it('should be selectable by class "signin"', () => {
    expect(shallow(<SignIn />).is('.signin')).toBe(true);
  });

  it('should click button with empty fields', () => {
    wrapper.find('.signin-button').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state('errors')).toEqual({
      'password': 'Password cannot be empty',
      'password_length': 'Password is too short (minimum is 8 characters)',
      'username': 'Username cannot be empty' });
  });

  it('handleChange', () => {
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: '12345678' } });
    wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'username' } });
    wrapper.find('.signin-button').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state('errors')).toEqual({});
  });

  describe('handleSubmit', () => {
    beforeAll(() => {
      mock.onPost('/api/tokens', {
        username: wrapper.state('username'),
        password: wrapper.state('password') })
      .reply(200, response);
      wrapper.find('.signin-button').simulate('click', { preventDefault: () => {} });
      wrapper.update(<SignIn />);
    });

    it('test', () => {
      expect(localStorage.getItem('jwt')).toEqual('j3g12h3jbjheb1hj2e');
    });
  });
});
