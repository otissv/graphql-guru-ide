export default function mapObject ({ fn, obj }) {
  return Object.keys(obj).reduce((prev, curr) => {
    return { ...prev, [curr]: fn({ key: curr, value: obj[curr] }) };
  }, {});
}
