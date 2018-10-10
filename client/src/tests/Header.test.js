import React from 'react';
import Header from '../components/Header';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../store/store';
import {
  HashRouter as Router
} from 'react-router-dom';

configure({ adapter: new Adapter() });

const wrapper = mount(
  <Router>
    <Header store={store} />
  </Router>);

describe('Header', () => {
  describe('buttons', () => {
    it('signin', () => {
      wrapper.find('.header_signin').simulate('click');
    });

    it('signup', () => {
      wrapper.find('.header_signup').simulate('click');
    });
  });

  describe('tokens', () => {
    beforeAll(() => {
      localStorage.setItem('jwt', 'newtoken');
      // const token = localStorage.getItem('jwt');
      wrapper.update();
    });

    it('test', () => {

    });
  });
});
