import React from 'react';
import SignUp from '../components/Signup';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Signup', function() {
 it('should be selectable by class signup', function() {
   expect(shallow(<SignUp />).is('.signup')).toBe(true);
 });

 it('should click button with empty fields', () => {
   const wrapper = shallow(<SignUp />);
   const button = wrapper.find('.signup_button');
   button.simulate('click');
   expect(wrapper.state('errors')).toEqual({
     'password': 'Password cannot be empty',
     'password_confirmation': 'Password confirmation cannot be empty',
     'password_length': 'Password is too short (minimum is 8 characters)',
     'username': 'Username cannot be empty'});
  });

  it('password confirmation must be equal to Password', () => {
    const wrapper = shallow(<SignUp />);
    wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'user'}});
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12jktuhjnnt'}});
    wrapper.find('#password_confirmation').simulate(
      'change',
      {target: {name: 'password_confirmation', value: '12345678'}}
    );
    const button = wrapper.find('.signup_button');
    button.simulate('click');
    expect(wrapper.state('errors')).toEqual({
     'password_confirmation_equal': 'Password confirmation must be equal to Password'
     });
   });

  it ('should click button with valid data', () => {
    const wrapper = shallow(<SignUp />);
    wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'user'}});
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: '12jktuhjnnt'}});
    wrapper.find('#password_confirmation').simulate(
      'change',
      {target: {name: 'password_confirmation', value: '12jktuhjnnt'}}
    );
    const button = wrapper.find('.signup_button');
    button.simulate('click');
    expect(wrapper.state('isSubmitted')).toEqual(true);
  });
});
