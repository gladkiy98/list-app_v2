import React from 'react';
import SignUp from '../components/Signup';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });
var mock = new MockAdapter(axios);
const wrapper = shallow(<SignUp />);

describe('Signup', function() {
 it('should be selectable by class signup', function() {
   expect(shallow(<SignUp />).is('.signup')).toBe(true);
 });

 it('should click button with empty fields', () => {
   wrapper.find('.signup_button').simulate('click', { preventDefault: () => {} });
   expect(wrapper.state('errors')).toEqual({
     'password': 'Password cannot be empty',
     'password_confirmation': 'Password confirmation cannot be empty',
     'password_length': 'Password is too short (minimum is 8 characters)',
     'username': 'Username cannot be empty'});
  });

  it('different passwords', () => {
    wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'user'}});
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '123456789'}});
    wrapper.find('#password_confirmation').simulate(
      'change',
      {target: {name: 'password_confirmation', value: '987654321'}}
    );
    wrapper.find('.signup_button').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state('errors')).toEqual({
    'password_confirmation_equal' : 'Password confirmation must be equal to Password' });
   });

  it ('should click button with valid data', () => {
    wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'user'}});
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12jktuhjnnt'}});
    wrapper.find('#password_confirmation').simulate(
      'change',
      {target: {name: 'password_confirmation', value: '12jktuhjnnt'}}
    );
    wrapper.find('.signup_button').simulate('click', { preventDefault: () => {} });
    expect(wrapper.state('isSubmitted')).toEqual(true);
  });

  describe('test', () => {
    beforeAll(() => {
      mock.onPost('/api/users', { user: {
        'username': wrapper.state('username'),
        'password': wrapper.state('password'),
        'password_confirmation': wrapper.state('password_confirmation') }
      }).reply(200);
      wrapper.find('.signup_button').simulate('click', { preventDefault: () => {} });
      wrapper.update(<SignUp />);
    });

    it('test', () => {
      expect(wrapper.state('exist')).toBe(true);
    });
  });

});
