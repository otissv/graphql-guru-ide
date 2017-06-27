// checks if the location path name and returns an id object
export default function isRoute ({ route, value }) {
  const location = window.location.pathname.split('/');
  const id = location[location.length - 1];

  if (`/${location[1]}` === route && id) {
    return { id };
  } else {
    return value;
  }
}
