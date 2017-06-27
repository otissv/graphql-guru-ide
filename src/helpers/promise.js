import Promise from 'bluebird';

export function promise (fn) {
  return new Promise((resolve, reject) => fn(resolve, reject));
}
