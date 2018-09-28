import React from 'react';
import SignUp from './Signup';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

configure({ adapter: new Adapter() });

var mock = new MockAdapter(axios);

describe('SignUp function', () => {
  it('should POST request', () => {
    const wrapper = shallow(<SignUp />);
    wrapper.setState({username: 'test', password: '12345678', password_confirmation: '12345678'});

    mock.onPost('http://localhost:3000/api/users',{
      username: wrapper.state('username'),
      password: wrapper.state('password'),
      password_confirmation: wrapper.state('password_confirmation')
    }).reply(200);
  });
});
