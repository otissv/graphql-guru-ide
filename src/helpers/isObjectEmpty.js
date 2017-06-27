export default function isObjectEmpty (obj) {
  function check (val) {
    // checks if object is truthy or falsey
    if (!val || val.trim === '') return true;

    // checks objects length property (array)
    if (val.length && val.length === 0) return true;
    if (Object.keys(val).length === 0) return true;
  }

  // checks all object properties are empty
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return check(obj[key]);
    }
  }

  return check(obj);
}
