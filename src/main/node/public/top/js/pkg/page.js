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
define('pages/home', function(require, exports, module) {

  /*!
   * home For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-page
   * Date: 2016-08-10
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _page = require('page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var _homeJade = require('src/pages/home/home.jade');
  
  var _homeJade2 = _interopRequireDefault(_homeJade);
  
  var home = (function (_Page) {
      _inherits(home, _Page);
  
      function home() {
          _classCallCheck(this, home);
  
          _get(Object.getPrototypeOf(home.prototype), 'constructor', this).call(this);
          this.name = 'home';
          this.template = _homeJade2['default'];
      }
  
      _createClass(home, [{
          key: 'onload',
          value: function onload() {}
      }, {
          key: 'prerender',
          value: function prerender(data) {
              this.exports('apply');
          }
      }, {
          key: 'postrender',
          value: function postrender(data) {}
      }, {
          key: 'enter',
          value: function enter() {}
      }, {
          key: 'leave',
          value: function leave() {}
      }, {
          key: 'ajaxconfig',
          get: function get() {
              return {
                  url: '/tmp/test.json',
                  dataType: 'json'
              };
          }
      }]);
  
      return home;
  })(_page2['default']);
  
  exports['default'] = new home();
  module.exports = exports['default'];

});
