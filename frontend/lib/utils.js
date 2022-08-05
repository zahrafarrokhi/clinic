import axios from './axios';

export const preventLettersTyping = (x) => x.replace(/[^\d]/g, '');

export const persianToEnglishDigits = (digit) => String(digit)
  .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const Android = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('android') > -1;
};

export const IOS = () => [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod',
].includes(window.navigator.platform)
  // iPad on iOS 13 detection
  || (window.navigator.userAgent.includes('Mac') && 'ontouchend' in document);


export const logout = (dispatch) => {
  /* eslint-disable import/no-named-as-default-member, global-require */
  dispatch(require('./slices/auth').reset());

  delete axios.defaults.headers.Authorization;
  /* eslint-enable import/no-named-as-default-member */
};
