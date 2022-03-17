function isString(val) {
  return typeof val === 'string';
}

function isNumber(val) {
  return typeof val === 'number';
}

function isBoolean(val) {
  return typeof val === 'boolean';
}

function isArray(val) {
  return Array.isArray(val);
}

function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function isFunction(val) {
  return typeof val === 'function';
}

function isNumberLike(val) {
  if (typeof val === 'number') {
    return true;
  }
  if (typeof val === 'string') {
    return /^\d+(\.\d+)?$/.test(val);
  }
  return false;
}

function isObjectLike(val) {
  var type = typeof val;
  return val !== null && (type === 'object' || type === 'function');
}

function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

function isDef(val) {
  return val !== undefined && val !== null;
}

export {
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  isNumberLike,
  isObjectLike,
  isPromise,
  isDef,
}
