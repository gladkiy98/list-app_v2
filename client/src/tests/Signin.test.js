import React from 'react';
import SignIn from '../components/Signin';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Signin form', () => {
  it('should be selectable by class "signin"', () => {
    expect(shallow(<SignIn />).is('.signin')).toBe(true);
  });

  it('should click button setState: username', () => {
    const wrapper = shallow(<SignIn />);
    wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'user' } });
    const p = wrapper.find('.button');
    p.simulate('click');
    expect(wrapper.state('username')).toEqual('user');
  });

  it('should click button setState: password', () => {
    const wrapper = shallow(<SignIn />);
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: '12345678' } });
    const p = wrapper.find('.button');
    p.simulate('click');
    expect(wrapper.state('password')).toEqual('12345678');
  });

  it('should click button with empty fields', () => {
    const wrapper = shallow(<SignIn />);
    const p = wrapper.find('.button');
    p.simulate('click');
    expect(wrapper.state('errors')).toEqual({
      'password': 'Password cannot be empty',
      'password_length': 'Password is too short (minimum is 8 characters)',
      'username': 'Username cannot be empty' });
  });

  it('should click button with empty password', () => {
    const wrapper = shallow(<SignIn />);
    wrapper.find('#username').simulate('change', { target: { name: 'username', value: 'user' } });
    const p = wrapper.find('.button');
    p.simulate('click');
    expect(wrapper.state('errors')).toEqual({
      'password': 'Password cannot be empty',
      'password_length': 'Password is too short (minimum is 8 characters)' });
  });

  it('should click button with empty username', () => {
    const wrapper = shallow(<SignIn />);
    wrapper.find('#password').simulate('change', { target: { name: 'password', value: '12345678' } });
    const p = wrapper.find('.button');
    p.simulate('click');
    expect(wrapper.state('errors')).toEqual({ 'username': 'Username cannot be empty' });
  });
});
