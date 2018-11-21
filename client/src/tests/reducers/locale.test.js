import reducer from '../../reducers/locale';
import * as types from '../../constants/localeSet';

describe('locale reducer', () => {
  it('should return the initial state', () => {
    const lang = 'en';
    expect(reducer(undefined, {})).toEqual({ lang });
  });

  it('should change language to Russian', () => {
    const lang = 'ru';
    expect(
      reducer(lang, {
        type: types.LOCALE_SET,
        lang
      })
    ).toEqual({ lang });
  });

  it('should change language to English', () => {
    const lang = 'en';
    expect(
      reducer(lang, {
        type: types.LOCALE_SET,
        lang
      })
    ).toEqual({ lang });
  });
});
