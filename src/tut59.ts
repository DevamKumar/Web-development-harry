console.log("this is date and time tutorial");
let now = new Date();
console.log(now);
// interface Dateformat {
//   year: number;
//   monthIndex: number;
//   date?: number | undefined;
//   hours?: number | undefined;
//   minutes?: number | undefined;
//   seconds?: number | undefined;
//   ms?: number | undefined;
// }
// function displayDate(Date: Dateformat) {}

let dt1 = new Date(0);
let dt2 = new Date(2024, 1, 21, 12, 30, 6);
let dt3 = new Date("2019-03-09 12:32:45");
let dt = new Date();

console.log(dt1);
console.log(dt2);
console.log(dt3);
console.log(dt);
// const timedis = document.getElementById("container").innerhtml = dt2;

let tm = dt.getTime();
let dy = now.getDay();
let dte = dt.getDate();
let mth = dt.getMonth();
let yr = dt.getFullYear();
console.log("Time now is " + tm);
console.log("date today is " + dy);
console.log("date today is " + dte);
console.log("month is " + mth);
console.log("year is " + yr);

const date = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayOfWeek = daysOfWeek[now.getDay()];

console.log(`Today is ${dayOfWeek}`);

const time = document.getElementById("time");
function updateTime() {
  const now = new Date();
  if (time) {
    time.innerHTML = now.toTimeString();
  }
}
updateTime();
setInterval(updateTime, 1000);
