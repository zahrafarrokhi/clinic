import { format } from 'date-fns-jalali';
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

// Date('1999-12-12') -> '1378/5/5'
export const covertDateToJalai = (date, f='yyyy/MM/dd')=> {
  return format(date, f)
}

// '2000-12-12T00:00:00Z' -> Date(2000, 12, 12)
export const convertStrToDate = (str) => {
  const date = new Date(str);

  return date
}

export const convertStrToJalali = (str, format='yyyy/MM/dd') => {
  if(!str) return ""
  return covertDateToJalai(convertStrToDate(str), format)
}

export const stringifyPrice = (num, type = "ریال") => {
  let ans = String(num);
  for (let i = ans.length - 3; i > 0; i -= 3) {
    ans = `${ans.substring(0, i)},${ans.substring(i)}`;
  }
  return ans + (type ? " " + type : "");
};

