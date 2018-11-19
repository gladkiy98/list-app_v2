import * as actions from '../../actions/changeLocale';
import * as types from '../../constants/localeSet';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to change a lang', () => {
    const lang = 'ru';
    const expectedAction = {
      type: types.LOCALE_SET,
      lang
    };
    expect(actions.setLocale(lang)).toEqual(expectedAction);
  });
});
