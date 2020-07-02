export default (obj) =>
  Object.values(obj).reduce((acc, cur) => {
    return `${acc} ${cur}`;
  }, '');
