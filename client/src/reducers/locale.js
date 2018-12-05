import { LOCALE_SET } from '../constants/localeSet';

const locale = (state = { lang: 'en' }, action = {}) => {
  switch (action.type) {
    case LOCALE_SET:
      return { lang: action.lang };
    default:
      return state;
  }
};

export default locale;
