import axiosInstance from './axios';

export const preventLettersTyping = (x) => x.replace(/[^\d]/g, '');

export const persianToEnglishDigits = (digit) => String(digit)
  .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

export const logout = (dispatch) => {
  dispatch(require('./slices/auth').reset());
  dispatch(require('./slices/patients').reset());
  // dispatch(require('./slices/doctors').reset());
  // dispatch(require('./slices/support').reset());
  // dispatch(require('./slices/laboratory').reset());
  // dispatch(require('./slices/pharmacy').reset());
  // dispatch(require('./slices/chat').reset());
  // dispatch(require('./slices/notification').reset());
  // dispatch(require('./slices/transactions').reset());
  // dispatch(require('./slices/visit').reset());

  delete axiosInstance.defaults.headers.Authorization;
  delete axiosInstance.defaults.headers.common.Authorization;
}