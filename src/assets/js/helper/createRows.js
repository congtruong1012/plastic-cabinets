export default function createRows(...agr) {
  return agr.reduce((acc, item, i) => {
    acc[`c${i + 1}`] = item;
    return acc;
  }, {});
}
