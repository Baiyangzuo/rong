;/*!src/pages/home/home.jade*/
define('src/pages/home/home.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"page\">\n  <div id=\"lincoapp-id-header\"></div>\n  <div class=\"page-container\">\n    <div id=\"lincoapp-id-header-bar\"></div>\n    <div class=\"page-content\">\n      <div class=\"container\">\n        <div id=\"lincoapp-id-breadcrumb\"></div>\n        <div class=\"row\">\n          <div id=\"lincoapp-id-panel\"></div>\n          <div id=\"lincoapp-id-panel\"></div>\n        </div>\n        <div class=\"row\">\n          <div id=\"lincoapp-id-panel\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div id=\"lincoapp-id-footer\"></div>\n</div>");;return buf.join("");
} 
});
;/*!pages/home/map*/
define('pages/home/map', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var dateType = {
      0: "#today",
      1: "#week",
      2: "#month",
      3: "#all"
  };
  exports.dateType = dateType;

});

;/*!pages/home*/
define('pages/home', function(require, exports, module) {

  /*!
   * home For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-page
   * Date: 2016-08-06
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _page = require('page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var _homeJade = require('src/pages/home/home.jade');
  
  var _homeJade2 = _interopRequireDefault(_homeJade);
  
  var _map = require('pages/home/map');
  
  var Map = _interopRequireWildcard(_map);
  
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
          value: function onload() {
              aimee.app.loading2.show().center();
          }
      }, {
          key: 'prerender',
          value: function prerender(data) {
              var _this = this;
  
              console.group('今天注册数据：');
              console.log(data);
              console.groupEnd();
  
              this.exports('header footer');
              this.exports('header-bar');
              // this.exports('breadcrumb')
  
              this.use({
                  // // 构建基础统计
                  // 'panel^1': app => {
                  //     app
                  //         .init({title: 'STATS'})
                  //         .config('action.date', true)
                  //         .config('icon.className', 'icon-bar-chart theme-font')
                  //         .render().addClass('col-md-6 col-sm-12');
                  //     this.use('stats')
                  //         .init().render(app.find('.portlet-body'));
                  // },
                  //
                  // // 构建转化率
                  // 'panel^2': app => {
                  //     app
                  //         .init({title: 'CONVERSION'})
                  //         .config('action.date', true)
                  //         .config('icon.className', 'icon-bar-chart theme-font')
                  //         .render().addClass('col-md-6 col-sm-12');
                  //     this.use('conversion')
                  //         .init()
                  //         .render(app.find('.portlet-body'));
                  // },
  
                  // 构建用户表
                  'panel^3': function panel3(app) {
                      app.init({ title: 'USER' }).config('action.date', true).config('icon.className', 'fa fa-user font-green-sharp').render().addClass('col-md-12 panel-user').find('.portlet-body').append(aimee.create('#today')).append(aimee.create('#week')).append(aimee.create('#month')).append(aimee.create('#all'));
                      _this.use('table').init(data.data)
                      // 日期类型
                      .config('datetype', 0)
                      // 单页长度
                      .config('page.length', 15).config('ctrl', 'delete').render(app.find('#today'));
                  }
              });
  
              this.bind({
                  'click@.btn-date': function clickBtnDate(e) {
                      _this.loadData($(e.target).attr('data-type') || 0);
                  },
  
                  'click@.lincoapp-header-bar': function clickLincoappHeaderBar(e) {
                      // console.log(99)
                  },
  
                  'click@.btn-sm': function clickBtnSm() {
                      var it = $(this);
                      var i = it.index();
                      var parent = it.parents('.lincoapp-panel');
                      var tables = parent.find('.lincoapp-table');
                      it.addClass('active').siblings('.active').removeClass('active');
                      tables.eq(i).length ? tables.eq(i).show().siblings().hide() : tables.hide();
                  }
              });
          }
      }, {
          key: 'postrender',
          value: function postrender(data) {
              this.autoscreen();
          }
      }, {
          key: 'enter',
          value: function enter() {
              aimee.app.loading2.hide();
          }
      }, {
          key: 'leave',
          value: function leave() {}
  
          // Full page
      }, {
          key: 'autoscreen',
          value: function autoscreen() {
              var container = this.find('.page-container');
              var headerHeight = this.query('header').getApp().height();
              var footerHeight = this.query('footer').getApp().height();
              var minHeight = window.innerHeight - headerHeight - footerHeight;
              container.css('min-height', minHeight + 'px');
          }
      }, {
          key: 'loadData',
          value: function loadData(type) {
              var _this2 = this;
  
              var $dom = this.find('.panel-user').find(Map.dateType[type]);
              if ($dom.length) {
                  aimee.app.loading2.show();
                  $.ajax({
                      url: '/rose/api/getUsers?date=' + type,
                      type: 'GET',
                      success: function success(data) {
                          _this2.use('table').init(data.data).config('page.length', 15).config('datetype', type).render($dom);
                          aimee.app.loading2.hide();
                      },
                      error: function error(err) {
                          console.log(err);
                          alert(err);
                      }
                  });
              }
          }
      }, {
          key: 'loadMonthData',
          value: function loadMonthData() {}
      }, {
          key: 'ajaxconfig',
          get: function get() {
              return {
                  url: '/rose/api/getUsers?date=0',
                  dataType: 'json'
              };
          }
      }]);
  
      return home;
  })(_page2['default']);
  
  exports['default'] = new home();
  module.exports = exports['default'];

});
