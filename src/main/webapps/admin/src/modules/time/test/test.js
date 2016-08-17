var Time = require('../time');

// var time = new Time;
//
// console.log(time.now())              // => 2016-07-29 14:50:51
// console.log(time.get())              // => 2016-07-29 14:50:51
// console.log(time.get(1469775764290)) // => 2016-07-29 15:02:44
//
// console.log(time.now('[hh:mm]'))     // => [14:50]
// console.log(time.now('[hh:mm:ss]'))  // => [14:50:51]
// console.log(time.get(1469775764290, '[hh:mm:ss]'))   // => [15:02:44]


var time = new Time({ format: '[hh:mm]' });

console.log(time.now())              // => [14:50]
console.log(time.now('[hh:mm:ss]'))  // => [14:50:51]
console.log(time.now('[yyyy-MM-dd]'))// => [2016-07-29]
console.log(time.get())              // => [14:50]
console.log(time.get(1469775764290))
