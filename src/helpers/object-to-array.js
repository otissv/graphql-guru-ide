export default function objectToArray ({ obj, fn }) {
  return Object.keys(obj).reduce((prev, curr) => {
    console.log(curr);
    return [...prev, fn(curr)];
  }, []);
}
