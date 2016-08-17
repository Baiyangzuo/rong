Time
---

### Install
```sh
aimee i time --save
```

### Usage
```js
var Time = require('time');

console.log(Time.now()) // => 2016-07-29 14:50:51
```
```js
var time = new Time;

time.now()              // => 2016-07-29 14:50:51
time.get()              // => 2016-07-29 14:50:51
time.get(1469775764290) // => 2016-07-29 15:02:44

time.now('[hh:mm]')     // => [14:50]
time.now('[hh:mm:ss]')  // => [14:50:51]
time.get(1469775764290, '[hh:mm:ss]')   // => [15:02:44]
```
```js
var time = new Time({ format: '[hh:mm]' });

time.now()              // => [14:50]
time.now('[hh:mm:ss]')  // => [14:50:51]
time.now('[yyyy-MM-dd]')// => [2016-07-29]
time.get()              // => [14:50]
time.get(1469775764290) // => [15:02]
```

#### Full Format String
```
yyyy-MM-dd hh:mm:ss.SSS
```
