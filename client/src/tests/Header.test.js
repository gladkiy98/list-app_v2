import React from 'react';
import Header from '../components/Header';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should be selectable by class "header"', () => {
    expect(shallow(<Header />).is('.header')).toBe(true);
  });
});
