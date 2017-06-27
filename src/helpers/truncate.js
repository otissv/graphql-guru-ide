export default function truncate ({ str, num, omit }) {
  const ellipsis = !omit ? '…' : '';
  const end = num || str.length + 1;
  return `${str.substr(0, end)}${ellipsis}`;
}
