import { formatNumber } from "./utils";
import { isString } from "./validator";

export function toDate(date) {
  if (date instanceof Date) {
    return date;
  }
  if (isString(date)) {
    date = new Date(date.replaceAll('-', '/'));
  }
  return new Date(date);
}

export function formatDateTime(date, separator='/') {
  date = toDate(date);

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join(separator)} ${[hour, minute, second].map(formatNumber).join(':')}`
}

export function formatDate(date, separator='/') {
  date = toDate(date);
  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join(separator)}`
}

export function formatTime(date) {
  date = toDate(date);
  
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[hour, minute, second].map(formatNumber).join(':')}`
}

/**
 * 
 * @param {Date} date 
 * @returns {array}
 */
function dateToArray(date) {
  date = toDate(date);
  
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
export { dateToArray }

/**
 * 获取年龄
 * @param {string} birthday 
 * @returns {number}
 */
export function getAge(birthday) {
  const today = new Date();
  birthday = new Date(birthday.replaceAll('-', '/'));
  if (birthday.getFullYear() >= today.getFullYear()) {
    return 0;
  }

  let age = today.getFullYear() - birthday.getFullYear() - 1;
  if (today.getMonth() > birthday.getMonth() || 
      (today.getMonth() == birthday.getMonth() && today.getDate() >= birthday.getDate())
  ) {
    age += 1;
  }

  return age;
}

/**
 * 日期开始
 * @param {date} date 
 * @returns {Date}
 */
export function startOfDay(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * 日期结束
 * @param {date} date 
 * @returns {Date}
 */
export function endOfDay(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 0, 0, 0, -1);
}

/**
 * 第二天开始
 * @param {date} date 
 * @returns {Date}
 */
export function nextDay(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
}

/**
 * 月份开始
 * @param {date} date 
 * @returns {Date}
 */
export function startOfMonth(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 月份结束
 * @param {date} date 
 * @returns {Date}
 */
export function endOfMonth(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth()+1, 1, 0, 0, 0, -1);
}

/**
 * 下月开始
 * @param {date} date 
 * @returns {Date}
 */
export function nextMonth(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth()+1, 1);
}

/**
 * 下月开始
 * @param {date} date 
 * @returns {Date}
 */
export function prevMonth(date) {
  date = toDate(date);
  
  return new Date(date.getFullYear(), date.getMonth()-1, 1);
}

/**
 * n天之后
 * @param {date} date 
 * @param {number} days 
 * @returns {date}
 */
export function dayAfter(date, days) {
  date = toDate(date);
  
  days = parseInt(days) || 0;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()+days);
}
