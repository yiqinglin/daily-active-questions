function getAverage(obj){
  let counter = 0;

  const res = Object.keys(obj).reduce((prev, curr, i) => {
    prev += obj[curr];
    counter += 1;
    return prev;
  }, 0)

  if (counter) {
    return Math.fround(res/counter).toFixed(2);
  }
}

export { getAverage };