export const areSameDate = (d1, d2) => {
  console.log(d1, d2);
  return d1.getFullYear() == d2.getFullYear()
      && d1.getMonth() == d2.getMonth()
      && d1.getDate() == d2.getDate();
};
