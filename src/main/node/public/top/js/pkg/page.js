;/*!src/pages/home/home.jade*/
define('src/pages/home/home.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"page\">\n  <div id=\"lincoapp-id-apply\"></div>\n</div>");;return buf.join("");
} 
});
;/*!pages/home*/
define("pages/home",function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(e,t,n){for(var o=!0;o;){var r=e,u=t,a=n;o=!1,null===r&&(r=Function.prototype);var i=Object.getOwnPropertyDescriptor(r,u);if(void 0!==i){if("value"in i)return i.value;var l=i.get;return void 0===l?void 0:l.call(a)}var c=Object.getPrototypeOf(r);if(null===c)return void 0;e=c,t=u,n=a,o=!0,i=c=void 0}},l=e("page"),c=o(l),f=e("src/pages/home/home.jade"),p=o(f),s=function(e){function t(){r(this,t),i(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.name="home",this.template=p["default"]}return u(t,e),a(t,[{key:"onload",value:function(){}},{key:"prerender",value:function(){this.exports("apply")}},{key:"postrender",value:function(){}},{key:"enter",value:function(){}},{key:"leave",value:function(){}},{key:"ajaxconfig",get:function(){return{url:"/tmp/test.json",dataType:"json"}}}]),t}(c["default"]);t["default"]=new s,n.exports=t["default"]});