const colors = require('chalk');

const error = colors.red;
const warn = colors.yellow;
const step = colors.green;
const start = colors.grey;
const info = colors.blue;

console.logPrototype = console.log;
console.errorPrototype = console.error;
console.warnPrototype = console.warn;

const dateTime = () => {
  const currentdate = new Date();
  const datetime = `[${currentdate.getDate()}/${currentdate.getMonth() +
    1}/${currentdate.getFullYear()} @ ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}]`;

  return datetime;
};

console.log = (...args) => {
  let date = [dateTime()];
  date = date.concat(args);
  if (console) {
    console.logPrototype(...date);
  }
};

console.error = (...args) => {
  let date = [error(dateTime())];
  date = date.concat(args);
  if (console) {
    console.errorPrototype(...date);
  }
};

console.warn = (...args) => {
  let date = [warn(dateTime())];
  date = date.concat(args);
  if (console) {
    console.warnPrototype(...date);
  }
};

console.info = (...args) => {
  let date = [info(dateTime())];
  date = date.concat(args);
  if (console) {
    console.logPrototype(...date);
  }
};

console.min = (...args) => {
  let date = [start(dateTime())];
  date = date.concat(args);
  if (console) {
    console.logPrototype(...date);
  }
};

console.step = (...args) => {
  let date = [step(dateTime())];
  date = date.concat(args);
  if (console) {
    console.logPrototype(...date);
  }
};
