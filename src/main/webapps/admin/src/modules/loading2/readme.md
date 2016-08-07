Loading2
---
Loading

### Install
```sh
aimee i loading2 --save
```

### Usage
```js
var Loading = require('loading2');
var loading = new Loading;

loading.init().render(id);

// @Msg 修改内容
// @Center 居中显示，以父级Relative为原点
loading.msg('Loading...').center();

// Show
loading.show();

// Hide
loading.hide();
```

### Preview
![Preview](test/preview.png)
