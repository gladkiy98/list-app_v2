import { LOCALE_SET } from '../constants/actionTypes';

export const localeSet = (lang) => ({
  type: LOCALE_SET,
  lang
});

export const setLocale = (lang) => (dispatch) => {
  localStorage.setItem('lang', 'en');
  dispatch(localeSet(lang));
};
