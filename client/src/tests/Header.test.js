import { mapDispatchToProps } from '../components/Header';

describe('Component Following', () => {
  it('call dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setLocale();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOCALE_SET'});
  });
});
