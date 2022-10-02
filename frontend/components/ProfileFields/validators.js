
//  10 => 10 !== null/undefined/0/''  => null , "" => "" === null/undefined/0/'' => 'این فیلد الزامیست'
export const NotNull = (value) => value ? null : 'این فیلد الزامیست'
// 10 => funciton('123') => '123'?.length === 10 ? null : `10 رقم وارد کنید`=> `10 رقم وارد کنید`
export const StringLength = (digits) => (value) => value?.length === digits ? null : `${digits} رقم وارد کنید`
// export const StringLength10 = (value) => value.length === 10 ? null : `${10} رقم وارد کنید`
// export const StringLength11 = (value) => value.length === 11 ? null : `${11} رقم وارد کنید`
export const OnlyDigits = (value) => /^[0-9۰-۹]*$/g.test(value) ? null : 'فقط ارقام وارد کنید'