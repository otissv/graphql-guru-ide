export function arrayToObject (list) {
  return function (key, prefix) {
    function reducer (obj, item) {
      if (item == null) {
        return obj;
      } else {
        obj[`${prefix}${item[key]}`] = item;
        return obj;
      }
    }

    return list.reduce(reducer, {});
  };
}

export function query (_id, token) {
  return `?_id=${_id}&token=${token}`;
}

export function objectToArray (obj) {
  return obj ? Object.keys(obj).map(key => obj[key]) : [];
}

export function deleteKeyToArray (obj, keyToDelete) {
  console.log('deleteKeyToArray', obj);
  // eslint-disable-next-line
  return Object.keys(obj).map(key => {
    if (obj[key]._id !== keyToDelete) {
      return obj[key];
    }
  });
}
