import React from 'react';
import Dashboard from './Dashboard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Component', function() {
  it('should be selectable by class "dashboard"', function() {
    expect(shallow(<Dashboard />).is('.dashboard')).toBe(true);
  });
});
