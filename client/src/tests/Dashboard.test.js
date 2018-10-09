import React from 'react';
import Dashboard from '../components/Dashboard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Component', () => {
  it('should be selectable by class "dashboard"', () => {
    expect(shallow(<Dashboard />).is('.dashboard')).toBe(true);
  });
});
