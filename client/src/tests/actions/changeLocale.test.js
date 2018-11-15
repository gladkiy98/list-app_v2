import * as actions from '../../actions/changeLocale';
import * as types from '../../constants/localeSet';

describe('actions', () => {
  it('should create an action to change a lang', () => {
    const lang = 'ru';
    const expectedAction = {
      type: types.LOCALE_SET,
      lang
    };
    expect(actions.localeSet(lang)).toEqual(expectedAction);
  });
});
