import { mapDispatchToProps } from '../components/Header';
import { LOCALE_SET } from '../constants/localeSet';

describe('Component Following', () => {
  it('call dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setLocale();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: LOCALE_SET });
  });
});
