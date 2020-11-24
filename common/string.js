export function isUndefinedOrNullOrEmptyOrZero(param) {
    return param == undefined || param == null || param == '' || param == '0';
}

export function isUndefinedOrNull(param) {
  return param == undefined || param == null;
}

export function isUndefinedOrNullOrEmpty(param) {
  return param == undefined || param == null || param == '';
}

export function isNotUndefinedOrNullOrEmptyOrZero(param) {
  return !isUndefinedOrNullOrEmptyOrZero(param);
}
