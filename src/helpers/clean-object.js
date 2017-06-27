export default function cleanObj (obj) {
  Object.keys(obj).forEach(
    key =>
      (obj[key] && typeof obj[key] === 'object' && cleanObj(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  );
  return obj;
}
