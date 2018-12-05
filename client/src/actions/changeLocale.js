import { LOCALE_SET } from '../constants/localeSet';

export const setLocale = (lang) => ({
  type: LOCALE_SET,
  lang
});
