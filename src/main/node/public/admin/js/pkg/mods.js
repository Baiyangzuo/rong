;/*!guid*/
define('guid', function(require, exports, module) {

  "use strict";
  
  module.exports = function () {
  	var time, random, id;
  
  	// 时间因子
  	time = new Date().getTime();
  
  	// 随机因子
  	random = function () {
  		return Math.random() * Math.random() * time;
  	};
  
  	// 短位guid
  	id = function () {
  		return (time + random() * 0x10000 | 0).toString(16).slice(1);
  	};
  
  	// 长位guid
  	return id() + id() + id();
  };

});

;/*!is*/
define('is', function(require, exports, module) {

  /**
   * is for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/is
   */
  
  'use strict';
  
  var is = {};
  var hasOwn = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;
  
  /**
   * [数组类型判定]
   * @param  {[object]}  obj  [要检查的对象]
   * @return {[boolean]}      [true or false]
   */
  is.array = function (obj) {
      if (typeof Array.isArray === 'function') {
          return Array.isArray(obj);
      }
  
      return toString.call(obj) === '[object Array]';
  };
  
  is.plainObject = function isPlainObject(obj) {
      'use strict';
  
      if (!obj || toString.call(obj) !== '[object Object]') {
          return false;
      }
  
      var hasOwnConstructor = hasOwn.call(obj, 'constructor');
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
      // Not own constructor property must be Object
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
      }
  
      // Own properties are enumerated firstly, so to speed up,
      // if last one is own, then all properties are own.
      var key;
      for (key in obj) {/**/}
  
      return typeof key === 'undefined' || hasOwn.call(obj, key);
  };
  
  is.string = function (obj) {
      return typeof obj === 'string';
  };
  
  is['function'] = function (obj) {
      return typeof obj === 'function';
  };
  
  module.exports = is;

});

;/*!extend*/
define('extend', function(require, exports, module) {

  /**
   * Extend for Aimeejs
   * From jQuery.extend@2.0.3
   * Homepage https://github.com/Aimeejs/extend
   */
  
  "use strict";
  
  var is = require('is');
  
  function extend() {
      var options,
          name,
          src,
          copy,
          copyIsArray,
          clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;
  
      // Handle a deep copy situation
      if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          // skip the boolean and the target
          i = 2;
      }
  
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !is["function"](target)) {
          target = {};
      }
  
      // extend parent self if only one argument is passed
      if (length === i) {
          target = this;
          --i;
      }
  
      for (; i < length; i++) {
          // Only deal with non-null/undefined values
          if ((options = arguments[i]) != null) {
              // Extend the base object
              for (name in options) {
                  src = target[name];
                  copy = options[name];
  
                  // Prevent never-ending loop
                  if (target === copy) {
                      continue;
                  }
  
                  // Recurse if we're merging plain objects or arrays
                  if (deep && copy && (is.plainObject(copy) || (copyIsArray = is.array(copy)))) {
                      if (copyIsArray) {
                          copyIsArray = false;
                          clone = src && is.array(src) ? src : [];
                      } else {
                          clone = src && is.plainObject(src) ? src : {};
                      }
  
                      // Never move original objects, clone them
                      target[name] = extend(deep, clone, copy);
  
                      // Don't bring in undefined values
                  } else if (copy !== undefined) {
                          target[name] = copy;
                      }
              }
          }
      }
  
      // Return the modified object
      return target;
  };
  
  module.exports = extend;

});

;/*!class*/
define('class', function(require, exports, module) {

  /**
   * Class for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/class
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _is = require('is');
  
  var _is2 = _interopRequireDefault(_is);
  
  var _extend = require('extend');
  
  var _extend2 = _interopRequireDefault(_extend);
  
  var Base = function Base() {
      var _this = this;
  
      _classCallCheck(this, Base);
  
      this.is = _is2['default'];
      this.extend = _extend2['default'];
      this.clone = function (obj) {
          return _this.extend(true, {}, obj);
      };
  };
  
  Object.assign = Object.assign || _extend2['default'];
  
  Object.assign(Base, {
  
      fn: Base.prototype,
  
      create: function create(parent) {
          var Aimee = (function (_ref) {
              _inherits(Aimee, _ref);
  
              function Aimee() {
                  _classCallCheck(this, Aimee);
  
                  _get(Object.getPrototypeOf(Aimee.prototype), 'constructor', this).apply(this, arguments);
              }
  
              return Aimee;
          })(this);
  
          ;
          Aimee.fn = Aimee.prototype;
          Object.assign(Aimee.prototype, parent);
          return Aimee;
      },
  
      instance: function instance() {
          return new this();
      }
  });
  
  exports['default'] = Base;
  module.exports = exports['default'];

});

;/*!emmet/rye.create*/
define('emmet/rye.create', function(require, exports, module) {

  // Rye.create
  // ----------
  
  'use strict';
  
  (function (name, deps, definition) {
      if (typeof module !== 'undefined') module.exports = definition(require);else if (typeof define === 'function') define(name, deps, definition);else (window.$ || window)[name] = definition(function (name) {
          return window[name];
      });
  })('create', [], function (require) {
  
      var _slice = Array.prototype.slice;
  
      var exp = {
          operators: /[>+]/g,
          multiplier: /\*(\d+)$/,
          id: /#[\w-$]+/g,
          tagname: /^\w+/,
          classname: /\.[\w-$]+/g,
          attributes: /\[([^\]]+)\]/g,
          values: /([\w-]+)(\s*=\s*(['"]?)([^,\]]+)(\3))?/g,
          numbering: /[$]+/g,
          text: /\{(.+)\}/
      };
  
      // Converts a documentFragment element tree to an HTML string. When a documentFragment
      // is given to `.appendChild` it's *contents* are appended; we need to clone the
      // fragment so that it remains populated and can still be used afer a `toHTML` call.
      function toHTML() {
          var div = document.createElement('div');
          div.appendChild(this.cloneNode(true));
          return div.innerHTML;
      }
  
      // Pads number `n` with `ln` zeroes.
      function pad(n, ln) {
          var n = n.toString();
          while (n.length < ln) n = '0' + n;
          return n;
      }
  
      // Replaces ocurrences of '$' with the equivalent padded index.
      // `$$ == 01`, `$$$$ == 0001`
      function numbered(value, n) {
          return value.replace(exp.numbering, function (m) {
              return pad(n + 1, m.length);
          });
      }
  
      // .create API
      // ----------
  
      function create(str, data) {
  
          // Start by splitting the string into it's descendants and creating
          // the fragment which will hold the result DOM tree.
          var parts = str.split(exp.operators).map(Function.prototype.call, String.prototype.trim),
              tree = document.createDocumentFragment(),
              ops = new RegExp(exp.operators),
              match;
  
          // Create a DOM element.
          function Element(index, tag, id, className, text, attrs) {
              var element = document.createElement(tag);
  
              if (id) element.id = numbered(id, index);
              if (className) element.className = numbered(className, index);
              if (text) element.appendChild(document.createTextNode(text));
  
              if (attrs) for (var key in attrs) {
                  if (!attrs.hasOwnProperty(key)) continue;
                  element.setAttribute(key, numbered(attrs[key], index));
              }
  
              return element;
          }
  
          // At first the documentFragment is the only parent.
          var parents = [tree];
  
          // Parsing
          // -------
  
          // Go over the abbreviations one level at a time, and process
          // corresponding element values
          parts.forEach(function (original, i) {
  
              var part = original,
                  op = (ops.exec(str) || [])[0],
                  count = 1,
                  tag,
                  id,
                  classes,
                  text,
                  attrs = {};
  
              // #### Attributes
              // Attributes are parsed first then removed so that it takes precedence
              // over IDs and classNames for the `#.` characters.
              if (match = part.match(exp.attributes)) {
                  var matched = match[match.length - 1];
                  while (match = exp.values.exec(matched)) {
                      attrs[match[1]] = (match[4] || '').replace(/['"]/g, '').trim();
                  }
                  part = part.replace(exp.attributes, '');
              }
  
              // #### Multipliers
              if (match = part.match(exp.multiplier)) {
                  var times = +match[1];
                  if (times > 0) count = times;
              }
  
              // #### IDs
              if (match = part.match(exp.id)) {
                  id = match[match.length - 1].substr(1);
              }
  
              // #### Tag names
              if (match = part.match(exp.tagname)) {
                  tag = match[0];
              } else {
                  tag = 'div';
              }
  
              // #### Class names
              if (match = part.match(exp.classname)) {
                  classes = match.map(function (c) {
                      return c.substr(1);
                  }).join(' ');
              }
  
              // #### Text
              if (match = part.match(exp.text)) {
                  text = match[1];
                  if (data) {
                      text = text.replace(/\$(\w+)/g, function (m, key) {
                          return data[key];
                      });
                  }
              }
  
              // Insert `count` copies of the element per parent. If the current operator
              // is `+` we mark the elements to remove it from `parents` in the next iteration.
              _slice.call(parents, 0).forEach(function (parent, parentIndex) {
                  for (var index = 0; index < count; index++) {
                      // Use parentIndex if this element has a count of 1
                      var _index = count > 1 ? index : parentIndex;
  
                      var element = Element(_index, tag, id, classes, text, attrs);
                      if (op === '+') element._sibling = true;
  
                      parent.appendChild(element);
                  }
              });
  
              // If the next operator is '>' replace `parents` with their childNodes for the next iteration.
              if (op === '>') {
                  parents = parents.reduce(function (p, c, i, a) {
                      return p.concat(_slice.call(c.childNodes, 0).filter(function (el) {
                          return el.nodeType === 1 && !el._sibling;
                      }));
                  }, []);
              }
          });
  
          // Augment the documentFragment with the `toHTML` method.
          tree.toHTML = toHTML;
  
          return tree;
      }
  
      // Export main method
      return create;
  });
  // Hello.

});

;/*!emmet*/
define('emmet', function(require, exports, module) {

  /**
   * Emmet for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/emmet
   */
  
  'use strict';
  
  var create = require('emmet/rye.create');
  
  module.exports = upper;
  
  // 处理^符号
  function upper(string) {
      var dom, arr, symbol, wrap, key, className;
  
      dom = [];
      // 分割^符号
      arr = string.split(/\^+/);
      // 获取^数组，用于计算后续DOM位置
      symbol = string.match(/\^+/g);
      // 特殊标记
      key = 'create-dom-like-emmet';
      // 创建根dom用于创建后续DOM
      wrap = $(create('#' + key).toHTML());
      // 为^标记特殊类，用计算后续DOM插入位置
      className = '.' + key;
  
      // 分组创建DOM
      arr.forEach(function (item) {
          dom.push(create(item + className).toHTML());
      });
  
      // 补充^, 保持与dom数组一致
      symbol ? symbol.unshift('^') : symbol = ['^'];
  
      // 连接dom数组中的_dom
      while (dom.length) {
          var _dom, length, target;
  
          // 按序弹出_dom
          _dom = dom.shift();
          // 计算^...的数量
          length = symbol.shift().length;
          // 查找被标记的特殊dom
          target = wrap.find(className);
  
          if (target.length) {
              // 删除特殊标记
              clearTarget(target, key);
              // 计算后续DOM插入位置
              while (length) {
                  length--;
                  target = target.parent();
              }
              // 插入分组后续DOM到根dom
              target.length && target.get(0).id !== key ? target.after(_dom) : wrap.append(_dom);
          } else {
              // 如果为空，则直接插入到根dom中
              wrap.append(_dom);
          }
      }
  
      // 清空特殊标记
      clearTarget(wrap.find(className), key);
  
      return wrap.html();
  }
  
  // 清理特殊标记及空class属性
  function clearTarget(target, className) {
      target.each(function () {
          this.className === className ? this.removeAttribute('class') : $(this).removeClass(className);
      });
  }

});

;/*!config/lib/is*/
define('config/lib/is', function(require, exports, module) {

  'use strict';
  
  exports.node = function () {
      return typeof global === 'object' && !!global.process && !!global.process.env;
  };
  
  exports.browser = function () {
      return typeof window === 'object' && !!window.document;
  };

});

;/*!config*/
define('config', function(require, exports, module) {

  /**
   * Config for Aimeejs
   * Author gavinning
   * Homepage https://github.com/Aimeejs/config
   */
  
  'use strict';
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var env = require('config/lib/is');
  
  if (env.node()) {
      // For node
      var is = require('aimee-is');
      var extend = require('aimee-extend');
      var jsonFormat = require('json-format');
  }
  if (env.browser()) {
      // For aimee
      var is = require('is');
      var extend = require('extend');
  }
  
  var Config = (function () {
      function Config() {
          _classCallCheck(this, Config);
  
          this.__config = {};
      }
  
      /**
       * 递归创建不存在子节点为空对象
       * @param   {Object}  target   目标对象
       * @param   {String}  key      要操作的key
       * @param   {anyType} value    target.key
       * @return  {Object}           target
       * @example this.create({}, 'app.path', __dirname)
       */
  
      /**
       * 设置数据模型
       * @param   {String || Object} target 模块id或数据模型对象
       */
  
      _createClass(Config, [{
          key: 'init',
          value: function init(target) {
              // 当做模块路径处理
              if (is.string(target)) {
                  try {
                      this.__config = require(target);
                      this.__savepath = target;
                  } catch (e) {
                      throw new Error(target + ' is not a module id.');
                  }
              }
  
              // 当做配置文件处理
              if (is.plainObject(target)) {
                  this.__config = target;
              }
          }
  
          /**
           * 单项配置设置，覆盖模式，推荐只用于单项配置
           * @param   {String}  key   属性
           * @param   {Anytype} value 属性值
           * @example config.set('dir.install', 'packages');
           */
      }, {
          key: 'set',
          value: function set(key, value) {
              try {
                  eval('this.__config.' + key + ' = value');
              } catch (e) {
                  this.__config = Config.createObject(this.__config, key, value);
              }
          }
  
          /**
           * 获取配置
           * @param   {String}  key 属性
           * @return  {Anytype}     属性值
           * @example config.get('dir.install'); // => packages
           */
      }, {
          key: 'get',
          value: function get(key) {
              if (!key) {
                  return this.__config;
              }
  
              try {
                  return eval('this.__config.' + key);
              } catch (e) {
                  return undefined;
              }
          }
  
          /**
           * 多项配置设置，合并模式，推荐使用多项配置
           * @param   {String}   key   合并的属性节点
           * @param   {Anytype}   value 合并的对象map
           * @example config.merge({dir: {install: 'packages'}});
           * @example config.merge('dir', {install: 'packages'});
           * @example config.merge('dir.install', 'packages');
           */
      }, {
          key: 'merge',
          value: function merge(key, value) {
              var tmp;
  
              if (!value) {
                  value = key;
                  key = null;
              }
  
              // 检查key是否存在
              if (key && typeof key !== 'string') {
                  key = null;
              }
  
              // 合并到指定节点
              if (key) {
                  tmp = Config.createObject({}, key, value);
                  extend(true, this.__config, tmp);
              }
              // 合并到根节点
              else {
                      extend(true, this.__config, value);
                  }
          }
  
          /**
           * 默认项
           * @param   {String}   key   key
           * @param   {object}   key   => value
           * @param   {AnyType}  value value
           * @example this.general.apply(this, arguments)
           */
      }, {
          key: 'general',
          value: function general(key, value) {
              if (!key) {
                  return this.get();
              }
  
              if (typeof key === 'object') {
                  return this.merge(key);
              }
  
              if (typeof key === 'string') {
                  return value === undefined ? this.get(key) : this.set(key, value);
              }
          }
  
          /**
           * 持久化存储
           * @param   {String}   src     存储地址，可选
           * @param   {Object}   options 可选配置项
           * @param   {Function} fn      存储成功后回调，可选
           * @example this.save()
           * @example this.save('/a/a.json')
           * @example this.save('/a/a.json', fn)
           */
      }, {
          key: 'save',
          value: function save(src, options, fn) {
              var data, def;
  
              def = {
                  pretty: true
              };
  
              if (is['function'](src)) {
                  fn = src;
                  src = null;
              }
  
              if (is.plainObject(src)) {
                  options = src;
                  src = null;
              }
  
              if (is['function'](options)) {
                  fn = options;
                  options = def;
              }
  
              src = src || this.__savepath;
              options = options || def;
              this.__savepath = this.__savepath || src;
  
              // For Save
              options.pretty ? data = jsonFormat(this.__config || {}, options.prettyOptions || { type: 'space', size: 2 }) : data = JSON.stringify(this.__config || {});
  
              if (src) {
                  try {
                      fn ? require('fs').writeFile(src, data, fn) : require('fs').writeFileSync(src, data);
                  } catch (e) {
                      console.error('Save方法仅在node环境下生效.');
                  }
              }
          }
      }]);
  
      return Config;
  })();
  
  Config.createObject = function (target, key, value) {
      var pop;
      var data = target = target || {};
      var arr = key.split('.');
  
      do {
          pop = arr.shift();
          data[pop] = data[pop] || {};
          data = data[pop];
      } while (arr.length > 1);
  
      // 检查是否存在value
      if (value) {
          // 节点创建完成尝试赋值
          try {
              eval('target.' + key + ' = value');
              // 赋值失败则抛错
          } catch (e) {
              throw e;
          }
      }
  
      return target;
  };
  
  module.exports = Config;

});

;/*!pm*/
define('pm', function(require, exports, module) {

  /**
   * PM for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/pm
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var PM = (function () {
      function PM() {
          _classCallCheck(this, PM);
  
          // Page map { page.name: page }
          this.map = {};
          // Current page
          this.page = {};
          this.pages = [];
          this.prevPage = {};
      }
  
      _createClass(PM, [{
          key: 'init',
          value: function init() {
              // 打印页面注册信息
              console.log(this.getPagesHash().join(', ') + ' is reg');
  
              if ("onhashchange" in window) {
                  // 监听hashchange事件
                  window.onhashchange = function () {
                      pm.hashChange(location.hash);
                  };
              } else {
                  console.log('not support onhashchange event');
              };
  
              this.load(this.getHash());
          }
  
          /**
           * 注册页面到PM
           * @param   {Object}  page  页面实例对象
           */
      }, {
          key: 'reg',
          value: function reg(page) {
              if (!this.map[page.name]) {
                  this.map[page.name] = page;
                  this.pages.push(page);
              }
          }
  
          /**
           * 快捷返回首页
           * @example pm.home()
           */
      }, {
          key: 'home',
          value: function home() {
              try {
                  this.load('home');
              } catch (e) {
                  throw e;
                  // console.error(e.message)
              }
          }
  
          /**
           * 加载指定页面
           * @param   {String}  name  page.name, page.hash
           * @example pm.load('home'); pm.load('#/home');
           */
      }, {
          key: 'load',
          value: function load(name) {
              var id;
  
              // 默认返回到首页
              if (!name) return this.home();
  
              // Load page.hash
              if (name.indexOf('#') === 0) {
                  // 获取 page._id
                  id = name.replace('#', '');
  
                  // 加载目标页面等于当前页面, 或id为空时拒绝
                  if (!id || this.page._id === id) return;
  
                  this.pages.some(function (page) {
                      if (page._id === id) {
                          // 加载目标页面
                          pm.enter(page.name);
                          // 打印页面分发日志
                          console.log((pm.prevPage.name || 'init') + ' => ' + pm.page.name);
                          return;
                      }
                  });
              }
              // Load page.name
              else {
                      // 查询当前name是否已被注册
                      this.pages.some(function (page) {
                          if (page.name === name) {
                              pm.enter(name);
                              // 打印页面分发日志
                              console.log((pm.prevPage.name || 'init') + ' => ' + pm.page.name);
                              return;
                          }
                      });
                  }
          }
  
          /**
           * 进入指定页面
           * @param   {String}  name 页面名字, page.name
           * @example pm.enter('home')
           */
      }, {
          key: 'enter',
          value: function enter(name) {
              // 执行当前页面离开
              this.leave();
              // 加载目标页面
              this.page = this.map[name];
              // 渲染目标页面
              this.page.load();
          }
  
          // 获取上一页页面对象
      }, {
          key: 'prev',
          value: function prev() {
              return this.prevPage;
          }
  
          // 离开当前页面
      }, {
          key: 'leave',
          value: function leave() {
              if (this.page.name) {
                  // 执行当前页面离开
                  this.page.unload();
                  // 修改当前页为上一页
                  this.prevPage = this.page;
              }
          }
  
          // 加载错误页面
          // pm.error(404)
      }, {
          key: 'error',
          value: function error(name) {
              this.load(name);
          }
  
          // 变更hash
      }, {
          key: 'setHash',
          value: function setHash(hash) {
              location.hash = hash;
          }
  
          // 获取当前hash
      }, {
          key: 'getHash',
          value: function getHash() {
              return location.hash.replace(/[\.\?'"><:;,\[\]\{\}]/ig, '');
          }
  
          // 处理hash变更
      }, {
          key: 'hashChange',
          value: function hashChange(hash) {
              // 默认返回首页
              if (!hash) return this.home();
              // 过滤非法字符
              hash = hash.replace(/[\.\?'"><:;,\[\]\{\}]/ig, '');
              // Load指定页面
              this.load(hash);
          }
  
          // 获取所有注册Hash
      }, {
          key: 'getPagesHash',
          value: function getPagesHash() {
              var arr = [];
              pm.pages.forEach(function (page) {
                  arr.push(page._id.replace(/^\//, ''));
              });
              return arr;
          }
      }]);
  
      return PM;
  })();
  
  console.log('pm is load');
  var pm = window.pm = new PM();
  exports['default'] = pm;
  module.exports = exports['default'];

});

;/*!aimee*/
define('aimee', function(require, exports, module) {

  /**
   * Aimee for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/aimee
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _class = require('class');
  
  var _class2 = _interopRequireDefault(_class);
  
  var _emmet = require('emmet');
  
  var _emmet2 = _interopRequireDefault(_emmet);
  
  var _config = require('config');
  
  var _config2 = _interopRequireDefault(_config);
  
  var Aimee = (function (_Base) {
      _inherits(Aimee, _Base);
  
      function Aimee() {
          _classCallCheck(this, Aimee);
  
          _get(Object.getPrototypeOf(Aimee.prototype), 'constructor', this).call(this);
          this.app = {};
          this.guid = _guid2['default'];
          this.create = _emmet2['default'];
          this.virtualMap = {};
          this.config = new _config2['default']();
          this.config.init({
              // 当前环境
              env: 'online',
  
              // 全局app
              app: {
                  renderString: '#lincoapp-id-',
                  // 注册全局app的位置信息
                  place: {
                      header: '#lincoapp-id-header',
                      footer: '#lincoapp-id-footer'
                  }
              },
  
              // Item
              selected: 'selected',
              _selected: '.selected'
          });
      }
  
      _createClass(Aimee, [{
          key: '$',
          value: (function (_$) {
              function $(_x) {
                  return _$.apply(this, arguments);
              }
  
              $.toString = function () {
                  return _$.toString();
              };
  
              return $;
          })(function (string) {
              return $(aimee.create(string));
          })
      }, {
          key: 'define',
          value: function define(id, fn) {
              var app = fn();
              app.fn.name = id;
              aimee.virtualMap[id] = app;
          }
      }, {
          key: 'reg',
          value: function reg(id, data, fn) {
              var app, App;
              var pm = require('pm');
              var place = aimee.config.get('app.place');
  
              fn = fn || function () {};
  
              // this.reg(name, fn)
              if (typeof data === 'function') {
                  fn = data;
                  data = null;
              }
  
              try {
                  App = require(id);
              } catch (e) {
                  if (aimee.virtualMap[id]) {
                      App = aimee.virtualMap[id];
                  } else {
                      return this;
                  }
              }
  
              // 检查App是否是widget-app
              // eg: autoscreen
              if (!App.aimee) {
                  // 加载非widget-app
                  App ? aimee.app[id] = App : App;
                  return this;
              }
  
              // 全局Widget-app全局唯一，所以返回实例即可
              app = new App();
  
              // 查找是否已注册占位符
              if (place[id]) {
                  app.init(data).render(place[id]);
              }
  
              // 检查是否存在相应规则的占位符
              // 没有占位符则默认插入到body
              else {
                      var wrapper = $('.lincowebapp-wrapper');
                      var stringId = aimee.config.get('app.renderString') + id;
                      var isExist = !!document.querySelector(stringId);
                      isExist ? app.init(data).render(stringId) : wrapper.length ? app.init(data).compile().appendTo(wrapper) : app.init(data).compile().appendTo('body');
                  }
  
              // 全局模块默认隐藏
              app.hide();
  
              // 注册到aimee.app
              if (aimee.app[id] && data && data.id) {
                  aimee.app[data.id] = app;
              } else {
                  aimee.app[id] = app;
              }
  
              return this;
          }
      }, {
          key: 'getConfig',
          value: function getConfig() {
              return this.config.get();
          }
      }]);
  
      return Aimee;
  })(_class2['default']);
  
  var aimee = window.aimee = new Aimee();
  exports['default'] = aimee;
  module.exports = exports['default'];

});

;/*!mock*/
define('mock', function(require, exports, module) {

  /*! mockjs 02-06-2015 22:03:43 */
  /*! src/mock-prefix.js */
  /*!
      Mock - 模拟请求 & 模拟数据
      https://github.com/nuysoft/Mock
      墨智 nuysoft@gmail.com
  */
  (function(undefined) {
      var Mock = {
          version: "0.1.9",
          _mocked: {}
      };
      /*! src/util.js */
      var Util = function() {
          var Util = {};
          Util.extend = function extend() {
              var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy, clone;
              if (length === 1) {
                  target = this;
                  i = 0;
              }
              for (;i < length; i++) {
                  options = arguments[i];
                  if (!options) continue;
                  for (name in options) {
                      src = target[name];
                      copy = options[name];
                      if (target === copy) continue;
                      if (copy === undefined) continue;
                      if (Util.isArray(copy) || Util.isObject(copy)) {
                          if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
                          if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
                          target[name] = Util.extend(clone, copy);
                      } else {
                          target[name] = copy;
                      }
                  }
              }
              return target;
          };
          Util.each = function each(obj, iterator, context) {
              var i, key;
              if (this.type(obj) === "number") {
                  for (i = 0; i < obj; i++) {
                      iterator(i, i);
                  }
              } else if (obj.length === +obj.length) {
                  for (i = 0; i < obj.length; i++) {
                      if (iterator.call(context, obj[i], i, obj) === false) break;
                  }
              } else {
                  for (key in obj) {
                      if (iterator.call(context, obj[key], key, obj) === false) break;
                  }
              }
          };
          Util.type = function type(obj) {
              return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
          };
          Util.each("String Object Array RegExp Function".split(" "), function(value) {
              Util["is" + value] = function(obj) {
                  return Util.type(obj) === value.toLowerCase();
              };
          });
          Util.isObjectOrArray = function(value) {
              return Util.isObject(value) || Util.isArray(value);
          };
          Util.isNumeric = function(value) {
              return !isNaN(parseFloat(value)) && isFinite(value);
          };
          Util.keys = function(obj) {
              var keys = [];
              for (var key in obj) {
                  if (obj.hasOwnProperty(key)) keys.push(key);
              }
              return keys;
          };
          Util.values = function(obj) {
              var values = [];
              for (var key in obj) {
                  if (obj.hasOwnProperty(key)) values.push(obj[key]);
              }
              return values;
          };
          Util.heredoc = function heredoc(fn) {
              return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
          };
          Util.noop = function() {};
          return Util;
      }();
      /*! src/random.js */
      var Random = function() {
          var Random = {
              extend: Util.extend
          };
          Random.extend({
              "boolean": function(min, max, cur) {
                  if (cur !== undefined) {
                      min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
                      max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
                      return Math.random() > 1 / (min + max) * min ? !cur : cur;
                  }
                  return Math.random() >= .5;
              },
              bool: function(min, max, cur) {
                  return this.boolean(min, max, cur);
              },
              natural: function(min, max) {
                  min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
                  max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                  return Math.round(Math.random() * (max - min)) + min;
              },
              integer: function(min, max) {
                  min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
                  max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
                  return Math.round(Math.random() * (max - min)) + min;
              },
              "int": function(min, max) {
                  return this.integer(min, max);
              },
              "float": function(min, max, dmin, dmax) {
                  dmin = dmin === undefined ? 0 : dmin;
                  dmin = Math.max(Math.min(dmin, 17), 0);
                  dmax = dmax === undefined ? 17 : dmax;
                  dmax = Math.max(Math.min(dmax, 17), 0);
                  var ret = this.integer(min, max) + ".";
                  for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
                      ret += this.character("number");
                  }
                  return parseFloat(ret, 10);
              },
              character: function(pool) {
                  var pools = {
                      lower: "abcdefghijklmnopqrstuvwxyz",
                      upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                      number: "0123456789",
                      symbol: "!@#$%^&*()[]"
                  };
                  pools.alpha = pools.lower + pools.upper;
                  pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
                  pool = pools[("" + pool).toLowerCase()] || pool;
                  return pool.charAt(Random.natural(0, pool.length - 1));
              },
              "char": function(pool) {
                  return this.character(pool);
              },
              string: function(pool, min, max) {
                  var length;
                  if (arguments.length === 3) {
                      length = Random.natural(min, max);
                  }
                  if (arguments.length === 2) {
                      if (typeof arguments[0] === "string") {
                          length = min;
                      } else {
                          length = Random.natural(pool, min);
                          pool = undefined;
                      }
                  }
                  if (arguments.length === 1) {
                      length = pool;
                      pool = undefined;
                  }
                  if (arguments.length === 0) {
                      length = Random.natural(3, 7);
                  }
                  var text = "";
                  for (var i = 0; i < length; i++) {
                      text += Random.character(pool);
                  }
                  return text;
              },
              str: function(pool, min, max) {
                  return this.string(pool, min, max);
              },
              range: function(start, stop, step) {
                  if (arguments.length <= 1) {
                      stop = start || 0;
                      start = 0;
                  }
                  step = arguments[2] || 1;
                  start = +start, stop = +stop, step = +step;
                  var len = Math.max(Math.ceil((stop - start) / step), 0);
                  var idx = 0;
                  var range = new Array(len);
                  while (idx < len) {
                      range[idx++] = start;
                      start += step;
                  }
                  return range;
              }
          });
          Random.extend({
              patternLetters: {
                  yyyy: "getFullYear",
                  yy: function(date) {
                      return ("" + date.getFullYear()).slice(2);
                  },
                  y: "yy",
                  MM: function(date) {
                      var m = date.getMonth() + 1;
                      return m < 10 ? "0" + m : m;
                  },
                  M: function(date) {
                      return date.getMonth() + 1;
                  },
                  dd: function(date) {
                      var d = date.getDate();
                      return d < 10 ? "0" + d : d;
                  },
                  d: "getDate",
                  HH: function(date) {
                      var h = date.getHours();
                      return h < 10 ? "0" + h : h;
                  },
                  H: "getHours",
                  hh: function(date) {
                      var h = date.getHours() % 12;
                      return h < 10 ? "0" + h : h;
                  },
                  h: function(date) {
                      return date.getHours() % 12;
                  },
                  mm: function(date) {
                      var m = date.getMinutes();
                      return m < 10 ? "0" + m : m;
                  },
                  m: "getMinutes",
                  ss: function(date) {
                      var s = date.getSeconds();
                      return s < 10 ? "0" + s : s;
                  },
                  s: "getSeconds",
                  SS: function(date) {
                      var ms = date.getMilliseconds();
                      return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
                  },
                  S: "getMilliseconds",
                  A: function(date) {
                      return date.getHours() < 12 ? "AM" : "PM";
                  },
                  a: function(date) {
                      return date.getHours() < 12 ? "am" : "pm";
                  },
                  T: "getTime"
              }
          });
          Random.extend({
              rformat: new RegExp(function() {
                  var re = [];
                  for (var i in Random.patternLetters) re.push(i);
                  return "(" + re.join("|") + ")";
              }(), "g"),
              format: function(date, format) {
                  var patternLetters = Random.patternLetters, rformat = Random.rformat;
                  return format.replace(rformat, function($0, flag) {
                      return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? arguments.callee($0, patternLetters[flag]) : date[patternLetters[flag]]();
                  });
              },
              randomDate: function(min, max) {
                  min = min === undefined ? new Date(0) : min;
                  max = max === undefined ? new Date() : max;
                  return new Date(Math.random() * (max.getTime() - min.getTime()));
              },
              date: function(format) {
                  format = format || "yyyy-MM-dd";
                  return this.format(this.randomDate(), format);
              },
              time: function(format) {
                  format = format || "HH:mm:ss";
                  return this.format(this.randomDate(), format);
              },
              datetime: function(format) {
                  format = format || "yyyy-MM-dd HH:mm:ss";
                  return this.format(this.randomDate(), format);
              },
              now: function(unit, format) {
                  if (arguments.length === 1) {
                      if (!/year|month|week|day|hour|minute|second|week/.test(unit)) {
                          format = unit;
                          unit = "";
                      }
                  }
                  unit = (unit || "").toLowerCase();
                  format = format || "yyyy-MM-dd HH:mm:ss";
                  var date = new Date();
                  switch (unit) {
                    case "year":
                      date.setMonth(0);
  
                    case "month":
                      date.setDate(1);
  
                    case "week":
                    case "day":
                      date.setHours(0);
  
                    case "hour":
                      date.setMinutes(0);
  
                    case "minute":
                      date.setSeconds(0);
  
                    case "second":
                      date.setMilliseconds(0);
                  }
                  switch (unit) {
                    case "week":
                      date.setDate(date.getDate() - date.getDay());
                  }
                  return this.format(date, format);
              }
          });
          Random.extend({
              ad_size: [ "300x250", "250x250", "240x400", "336x280", "180x150", "720x300", "468x60", "234x60", "88x31", "120x90", "120x60", "120x240", "125x125", "728x90", "160x600", "120x600", "300x600" ],
              screen_size: [ "320x200", "320x240", "640x480", "800x480", "800x480", "1024x600", "1024x768", "1280x800", "1440x900", "1920x1200", "2560x1600" ],
              video_size: [ "720x480", "768x576", "1280x720", "1920x1080" ],
              image: function(size, background, foreground, format, text) {
                  if (arguments.length === 4) {
                      text = format;
                      format = undefined;
                  }
                  if (arguments.length === 3) {
                      text = foreground;
                      foreground = undefined;
                  }
                  if (!size) size = this.pick(this.ad_size);
                  if (background && ~background.indexOf("#")) background = background.slice(1);
                  if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);
                  return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
              },
              img: function() {
                  return this.image.apply(this, arguments);
              }
          });
          Random.extend({
              brandColors: {
                  "4ormat": "#fb0a2a",
                  "500px": "#02adea",
                  "About.me (blue)": "#00405d",
                  "About.me (yellow)": "#ffcc33",
                  Addvocate: "#ff6138",
                  Adobe: "#ff0000",
                  Aim: "#fcd20b",
                  Amazon: "#e47911",
                  Android: "#a4c639",
                  "Angie's List": "#7fbb00",
                  AOL: "#0060a3",
                  Atlassian: "#003366",
                  Behance: "#053eff",
                  "Big Cartel": "#97b538",
                  bitly: "#ee6123",
                  Blogger: "#fc4f08",
                  Boeing: "#0039a6",
                  "Booking.com": "#003580",
                  Carbonmade: "#613854",
                  Cheddar: "#ff7243",
                  "Code School": "#3d4944",
                  Delicious: "#205cc0",
                  Dell: "#3287c1",
                  Designmoo: "#e54a4f",
                  Deviantart: "#4e6252",
                  "Designer News": "#2d72da",
                  Devour: "#fd0001",
                  DEWALT: "#febd17",
                  "Disqus (blue)": "#59a3fc",
                  "Disqus (orange)": "#db7132",
                  Dribbble: "#ea4c89",
                  Dropbox: "#3d9ae8",
                  Drupal: "#0c76ab",
                  Dunked: "#2a323a",
                  eBay: "#89c507",
                  Ember: "#f05e1b",
                  Engadget: "#00bdf6",
                  Envato: "#528036",
                  Etsy: "#eb6d20",
                  Evernote: "#5ba525",
                  "Fab.com": "#dd0017",
                  Facebook: "#3b5998",
                  Firefox: "#e66000",
                  "Flickr (blue)": "#0063dc",
                  "Flickr (pink)": "#ff0084",
                  Forrst: "#5b9a68",
                  Foursquare: "#25a0ca",
                  Garmin: "#007cc3",
                  GetGlue: "#2d75a2",
                  Gimmebar: "#f70078",
                  GitHub: "#171515",
                  "Google Blue": "#0140ca",
                  "Google Green": "#16a61e",
                  "Google Red": "#dd1812",
                  "Google Yellow": "#fcca03",
                  "Google+": "#dd4b39",
                  Grooveshark: "#f77f00",
                  Groupon: "#82b548",
                  "Hacker News": "#ff6600",
                  HelloWallet: "#0085ca",
                  "Heroku (light)": "#c7c5e6",
                  "Heroku (dark)": "#6567a5",
                  HootSuite: "#003366",
                  Houzz: "#73ba37",
                  HTML5: "#ec6231",
                  IKEA: "#ffcc33",
                  IMDb: "#f3ce13",
                  Instagram: "#3f729b",
                  Intel: "#0071c5",
                  Intuit: "#365ebf",
                  Kickstarter: "#76cc1e",
                  kippt: "#e03500",
                  Kodery: "#00af81",
                  LastFM: "#c3000d",
                  LinkedIn: "#0e76a8",
                  Livestream: "#cf0005",
                  Lumo: "#576396",
                  Mixpanel: "#a086d3",
                  Meetup: "#e51937",
                  Nokia: "#183693",
                  NVIDIA: "#76b900",
                  Opera: "#cc0f16",
                  Path: "#e41f11",
                  "PayPal (dark)": "#1e477a",
                  "PayPal (light)": "#3b7bbf",
                  Pinboard: "#0000e6",
                  Pinterest: "#c8232c",
                  PlayStation: "#665cbe",
                  Pocket: "#ee4056",
                  Prezi: "#318bff",
                  Pusha: "#0f71b4",
                  Quora: "#a82400",
                  "QUOTE.fm": "#66ceff",
                  Rdio: "#008fd5",
                  Readability: "#9c0000",
                  "Red Hat": "#cc0000",
                  Resource: "#7eb400",
                  Rockpack: "#0ba6ab",
                  Roon: "#62b0d9",
                  RSS: "#ee802f",
                  Salesforce: "#1798c1",
                  Samsung: "#0c4da2",
                  Shopify: "#96bf48",
                  Skype: "#00aff0",
                  Snagajob: "#f47a20",
                  Softonic: "#008ace",
                  SoundCloud: "#ff7700",
                  "Space Box": "#f86960",
                  Spotify: "#81b71a",
                  Sprint: "#fee100",
                  Squarespace: "#121212",
                  StackOverflow: "#ef8236",
                  Staples: "#cc0000",
                  "Status Chart": "#d7584f",
                  Stripe: "#008cdd",
                  StudyBlue: "#00afe1",
                  StumbleUpon: "#f74425",
                  "T-Mobile": "#ea0a8e",
                  Technorati: "#40a800",
                  "The Next Web": "#ef4423",
                  Treehouse: "#5cb868",
                  Trulia: "#5eab1f",
                  Tumblr: "#34526f",
                  "Twitch.tv": "#6441a5",
                  Twitter: "#00acee",
                  TYPO3: "#ff8700",
                  Ubuntu: "#dd4814",
                  Ustream: "#3388ff",
                  Verizon: "#ef1d1d",
                  Vimeo: "#86c9ef",
                  Vine: "#00a478",
                  Virb: "#06afd8",
                  "Virgin Media": "#cc0000",
                  Wooga: "#5b009c",
                  "WordPress (blue)": "#21759b",
                  "WordPress (orange)": "#d54e21",
                  "WordPress (grey)": "#464646",
                  Wunderlist: "#2b88d9",
                  XBOX: "#9bc848",
                  XING: "#126567",
                  "Yahoo!": "#720e9e",
                  Yandex: "#ffcc00",
                  Yelp: "#c41200",
                  YouTube: "#c4302b",
                  Zalongo: "#5498dc",
                  Zendesk: "#78a300",
                  Zerply: "#9dcc7a",
                  Zootool: "#5e8b1d"
              },
              brands: function() {
                  var brands = [];
                  for (var b in this.brandColors) {
                      brands.push(b);
                  }
                  return brands;
              },
              dataImage: function(size, text) {
                  var canvas = typeof document !== "undefined" && document.createElement("canvas"), ctx = canvas && canvas.getContext && canvas.getContext("2d");
                  if (!canvas || !ctx) return "";
                  if (!size) size = this.pick(this.ad_size);
                  text = text !== undefined ? text : size;
                  size = size.split("x");
                  var width = parseInt(size[0], 10), height = parseInt(size[1], 10), background = this.brandColors[this.pick(this.brands())], foreground = "#FFF", text_height = 14, font = "sans-serif";
                  canvas.width = width;
                  canvas.height = height;
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = background;
                  ctx.fillRect(0, 0, width, height);
                  ctx.fillStyle = foreground;
                  ctx.font = "bold " + text_height + "px " + font;
                  ctx.fillText(text, width / 2, height / 2, width);
                  return canvas.toDataURL("image/png");
              }
          });
          Random.extend({
              color: function() {
                  var colour = Math.floor(Math.random() * (16 * 16 * 16 * 16 * 16 * 16 - 1)).toString(16);
                  colour = "#" + ("000000" + colour).slice(-6);
                  return colour;
              }
          });
          Random.extend({
              capitalize: function(word) {
                  return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
              },
              upper: function(str) {
                  return (str + "").toUpperCase();
              },
              lower: function(str) {
                  return (str + "").toLowerCase();
              },
              pick: function(arr) {
                  arr = arr || [];
                  return arr[this.natural(0, arr.length - 1)];
              },
              shuffle: function(arr) {
                  arr = arr || [];
                  var old = arr.slice(0), result = [], index = 0, length = old.length;
                  for (var i = 0; i < length; i++) {
                      index = this.natural(0, old.length - 1);
                      result.push(old[index]);
                      old.splice(index, 1);
                  }
                  return result;
              }
          });
          Random.extend({
              paragraph: function(min, max) {
                  var len;
                  if (arguments.length === 0) len = Random.natural(3, 7);
                  if (arguments.length === 1) len = max = min;
                  if (arguments.length === 2) {
                      min = parseInt(min, 10);
                      max = parseInt(max, 10);
                      len = Random.natural(min, max);
                  }
                  var arr = [];
                  for (var i = 0; i < len; i++) {
                      arr.push(Random.sentence());
                  }
                  return arr.join(" ");
              },
              sentence: function(min, max) {
                  var len;
                  if (arguments.length === 0) len = Random.natural(12, 18);
                  if (arguments.length === 1) len = max = min;
                  if (arguments.length === 2) {
                      min = parseInt(min, 10);
                      max = parseInt(max, 10);
                      len = Random.natural(min, max);
                  }
                  var arr = [];
                  for (var i = 0; i < len; i++) {
                      arr.push(Random.word());
                  }
                  return Random.capitalize(arr.join(" ")) + ".";
              },
              word: function(min, max) {
                  var len;
                  if (arguments.length === 0) len = Random.natural(3, 10);
                  if (arguments.length === 1) len = max = min;
                  if (arguments.length === 2) {
                      min = parseInt(min, 10);
                      max = parseInt(max, 10);
                      len = Random.natural(min, max);
                  }
                  var result = "";
                  for (var i = 0; i < len; i++) {
                      result += Random.character("lower");
                  }
                  return result;
              },
              title: function(min, max) {
                  var len, result = [];
                  if (arguments.length === 0) len = Random.natural(3, 7);
                  if (arguments.length === 1) len = max = min;
                  if (arguments.length === 2) {
                      min = parseInt(min, 10);
                      max = parseInt(max, 10);
                      len = Random.natural(min, max);
                  }
                  for (var i = 0; i < len; i++) {
                      result.push(this.capitalize(this.word()));
                  }
                  return result.join(" ");
              }
          });
          Random.extend({
              first: function() {
                  var names = [ "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric" ].concat([ "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna" ]);
                  return this.pick(names);
              },
              last: function() {
                  var names = [ "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen" ];
                  return this.pick(names);
              },
              name: function(middle) {
                  return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
              },
              chineseName: function(count) {
                  var surnames = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐".split("");
                  var forenames = "贵福生龙元全国胜学祥才发武新利清飞彬富顺信子杰涛昌成康星光天达安岩中茂进林有坚和彪博绍功松善厚庆磊民友裕河哲江超浩亮政谦亨奇固之轮翰朗伯宏言若鸣朋斌梁栋维启克伦翔旭鹏月莺媛艳瑞凡佳嘉琼勤珍贞莉桂娣叶璧璐娅琦晶妍茜秋珊莎锦黛青倩婷姣婉娴瑾颖露瑶怡婵雁蓓".split("");
                  if (typeof count !== "number") {
                      count = Math.random() > .66 ? 2 : 3;
                  }
                  var surname = this.pick(surnames);
                  var forename = "";
                  count = count - 1;
                  for (var i = 0; i < count; i++) {
                      forename += this.pick(forenames);
                  }
                  return surname + forename;
              },
              cname: function(count) {
                  return this.chineseName(count);
              }
          });
          Random.extend({
              url: function() {
                  return "http://" + this.domain() + "/" + this.word();
              },
              domain: function(tld) {
                  return this.word() + "." + (tld || this.tld());
              },
              email: function(domain) {
                  return this.character("lower") + "." + this.last().toLowerCase() + "@" + this.last().toLowerCase() + "." + this.tld();
              },
              ip: function() {
                  return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
              },
              tlds: [ "com", "org", "edu", "gov", "co.uk", "net", "io" ],
              tld: function() {
                  return this.pick(this.tlds);
              }
          });
          Random.extend({
              areas: [ "东北", "华北", "华东", "华中", "华南", "西南", "西北" ],
              area: function() {
                  return this.pick(this.areas);
              },
              regions: [ "110000 北京市", "120000 天津市", "130000 河北省", "140000 山西省", "150000 内蒙古自治区", "210000 辽宁省", "220000 吉林省", "230000 黑龙江省", "310000 上海市", "320000 江苏省", "330000 浙江省", "340000 安徽省", "350000 福建省", "360000 江西省", "370000 山东省", "410000 河南省", "420000 湖北省", "430000 湖南省", "440000 广东省", "450000 广西壮族自治区", "460000 海南省", "500000 重庆市", "510000 四川省", "520000 贵州省", "530000 云南省", "540000 西藏自治区", "610000 陕西省", "620000 甘肃省", "630000 青海省", "640000 宁夏回族自治区", "650000 新疆维吾尔自治区", "650000 新疆维吾尔自治区", "710000 台湾省", "810000 香港特别行政区", "820000 澳门特别行政区" ],
              region: function() {
                  return this.pick(this.regions).split(" ")[1];
              },
              address: function() {},
              city: function() {},
              phone: function() {},
              areacode: function() {},
              street: function() {},
              street_suffixes: function() {},
              street_suffix: function() {},
              states: function() {},
              state: function() {},
              zip: function(len) {
                  var zip = "";
                  for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
                  return zip;
              }
          });
          Random.extend({
              todo: function() {
                  return "todo";
              }
          });
          Random.extend({
              d4: function() {
                  return this.natural(1, 4);
              },
              d6: function() {
                  return this.natural(1, 6);
              },
              d8: function() {
                  return this.natural(1, 8);
              },
              d12: function() {
                  return this.natural(1, 12);
              },
              d20: function() {
                  return this.natural(1, 20);
              },
              d100: function() {
                  return this.natural(1, 100);
              },
              guid: function() {
                  var pool = "ABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
                  return guid;
              },
              id: function() {
                  var id, sum = 0, rank = [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ], last = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
                  id = this.pick(this.regions).split(" ")[0] + this.date("yyyyMMdd") + this.string("number", 3);
                  for (var i = 0; i < id.length; i++) {
                      sum += id[i] * rank[i];
                  }
                  id += last[sum % 11];
                  return id;
              },
              autoIncrementInteger: 0,
              increment: function(step) {
                  return this.autoIncrementInteger += +step || 1;
              },
              inc: function(step) {
                  return this.increment(step);
              }
          });
          return Random;
      }();
      /*! src/mock.js */
      var rkey = /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/, rrange = /([\+\-]?\d+)-?([\+\-]?\d+)?/, rplaceholder = /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g;
      Mock.extend = Util.extend;
      Mock.mock = function(rurl, rtype, template) {
          if (arguments.length === 1) {
              return Handle.gen(rurl);
          }
          if (arguments.length === 2) {
              template = rtype;
              rtype = undefined;
          }
          Mock._mocked[rurl + (rtype || "")] = {
              rurl: rurl,
              rtype: rtype,
              template: template
          };
          return Mock;
      };
      var Handle = {
          extend: Util.extend
      };
      Handle.rule = function(name) {
          name = (name || "") + "";
          var parameters = (name || "").match(rkey), range = parameters && parameters[3] && parameters[3].match(rrange), min = range && parseInt(range[1], 10), max = range && parseInt(range[2], 10), count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1, decimal = parameters && parameters[4] && parameters[4].match(rrange), dmin = decimal && parseInt(decimal[1], 10), dmax = decimal && parseInt(decimal[2], 10), dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : 0, point = parameters && parameters[4];
          return {
              parameters: parameters,
              range: range,
              min: min,
              max: max,
              count: count,
              decimal: decimal,
              dmin: dmin,
              dmax: dmax,
              dcount: dcount,
              point: point
          };
      };
      Handle.gen = function(template, name, context) {
          name = name = (name || "") + "";
          context = context || {};
          context = {
              path: context.path || [],
              templatePath: context.templatePath || [],
              currentContext: context.currentContext,
              templateCurrentContext: context.templateCurrentContext || template,
              root: context.root,
              templateRoot: context.templateRoot
          };
          var rule = Handle.rule(name);
          var type = Util.type(template);
          if (Handle[type]) {
              return Handle[type]({
                  type: type,
                  template: template,
                  name: name,
                  parsedName: name ? name.replace(rkey, "$1") : name,
                  rule: rule,
                  context: context
              });
          }
          return template;
      };
      Handle.extend({
          array: function(options) {
              var result = [], i, j;
              if (!options.rule.parameters) {
                  for (i = 0; i < options.template.length; i++) {
                      options.context.path.push(i);
                      result.push(Handle.gen(options.template[i], i, {
                          currentContext: result,
                          templateCurrentContext: options.template,
                          path: options.context.path
                      }));
                      options.context.path.pop();
                  }
              } else {
                  if (options.rule.count === 1 && options.template.length > 1) {
                      options.context.path.push(options.name);
                      result = Random.pick(Handle.gen(options.template, undefined, {
                          currentContext: result,
                          templateCurrentContext: options.template,
                          path: options.context.path
                      }));
                      options.context.path.pop();
                  } else {
                      for (i = 0; i < options.rule.count; i++) {
                          j = 0;
                          do {
                              result.push(Handle.gen(options.template[j++]));
                          } while (j < options.template.length);
                      }
                  }
              }
              return result;
          },
          object: function(options) {
              var result = {}, keys, fnKeys, key, parsedKey, inc, i;
              if (options.rule.min) {
                  keys = Util.keys(options.template);
                  keys = Random.shuffle(keys);
                  keys = keys.slice(0, options.rule.count);
                  for (i = 0; i < keys.length; i++) {
                      key = keys[i];
                      parsedKey = key.replace(rkey, "$1");
                      options.context.path.push(parsedKey);
                      result[parsedKey] = Handle.gen(options.template[key], key, {
                          currentContext: result,
                          templateCurrentContext: options.template,
                          path: options.context.path
                      });
                      options.context.path.pop();
                  }
              } else {
                  keys = [];
                  fnKeys = [];
                  for (key in options.template) {
                      (typeof options.template[key] === "function" ? fnKeys : keys).push(key);
                  }
                  keys = keys.concat(fnKeys);
                  for (i = 0; i < keys.length; i++) {
                      key = keys[i];
                      parsedKey = key.replace(rkey, "$1");
                      options.context.path.push(parsedKey);
                      result[parsedKey] = Handle.gen(options.template[key], key, {
                          currentContext: result,
                          templateCurrentContext: options.template,
                          path: options.context.path
                      });
                      options.context.path.pop();
                      inc = key.match(rkey);
                      if (inc && inc[2] && Util.type(options.template[key]) === "number") {
                          options.template[key] += parseInt(inc[2], 10);
                      }
                  }
              }
              return result;
          },
          number: function(options) {
              var result, parts, i;
              if (options.rule.point) {
                  options.template += "";
                  parts = options.template.split(".");
                  parts[0] = options.rule.range ? options.rule.count : parts[0];
                  parts[1] = (parts[1] || "").slice(0, options.rule.dcount);
                  for (i = 0; parts[1].length < options.rule.dcount; i++) {
                      parts[1] += Random.character("number");
                  }
                  result = parseFloat(parts.join("."), 10);
              } else {
                  result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
              }
              return result;
          },
          "boolean": function(options) {
              var result;
              result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
              return result;
          },
          string: function(options) {
              var result = "", i, placeholders, ph, phed;
              if (options.template.length) {
                  for (i = 0; i < options.rule.count; i++) {
                      result += options.template;
                  }
                  placeholders = result.match(rplaceholder) || [];
                  for (i = 0; i < placeholders.length; i++) {
                      ph = placeholders[i];
                      if (/^\\/.test(ph)) {
                          placeholders.splice(i--, 1);
                          continue;
                      }
                      phed = Handle.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext);
                      if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
                          result = phed;
                          break;
                      }
                      result = result.replace(ph, phed);
                  }
              } else {
                  result = options.rule.range ? Random.string(options.rule.count) : options.template;
              }
              return result;
          },
          "function": function(options) {
              return options.template.call(options.context.currentContext);
          }
      });
      Handle.extend({
          _all: function() {
              var re = {};
              for (var key in Random) re[key.toLowerCase()] = key;
              return re;
          },
          placeholder: function(placeholder, obj, templateContext) {
              rplaceholder.exec("");
              var parts = rplaceholder.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
              try {
                  params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
              } catch (error) {
                  params = parts[2].split(/,\s*/);
              }
              if (obj && key in obj) return obj[key];
              if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
                  templateContext[key] = Handle.gen(templateContext[key], key, {
                      currentContext: obj,
                      templateCurrentContext: templateContext
                  });
                  return templateContext[key];
              }
              if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder;
              for (var i = 0; i < params.length; i++) {
                  rplaceholder.exec("");
                  if (rplaceholder.test(params[i])) {
                      params[i] = Handle.placeholder(params[i], obj);
                  }
              }
              var handle = Random[key] || Random[lkey] || Random[okey];
              switch (Util.type(handle)) {
                case "array":
                  return Random.pick(handle);
  
                case "function":
                  var re = handle.apply(Random, params);
                  if (re === undefined) re = "";
                  return re;
              }
          }
      });
      /*! src/mockjax.js */
      function find(options) {
          for (var sUrlType in Mock._mocked) {
              var item = Mock._mocked[sUrlType];
              if ((!item.rurl || match(item.rurl, options.url)) && (!item.rtype || match(item.rtype, options.type.toLowerCase()))) {
                  return item;
              }
          }
          function match(expected, actual) {
              if (Util.type(expected) === "string") {
                  return expected === actual;
              }
              if (Util.type(expected) === "regexp") {
                  return expected.test(actual);
              }
          }
      }
      function convert(item, options) {
          return Util.isFunction(item.template) ? item.template(options) : Mock.mock(item.template);
      }
      Mock.mockjax = function mockjax(jQuery) {
          function mockxhr() {
              return {
                  readyState: 4,
                  status: 200,
                  statusText: "",
                  open: jQuery.noop,
                  send: function() {
                      if (this.onload) this.onload();
                  },
                  setRequestHeader: jQuery.noop,
                  getAllResponseHeaders: jQuery.noop,
                  getResponseHeader: jQuery.noop,
                  statusCode: jQuery.noop,
                  abort: jQuery.noop
              };
          }
          function prefilter(options, originalOptions, jqXHR) {
              var item = find(options);
              if (item) {
                  options.dataFilter = options.converters["text json"] = options.converters["text jsonp"] = options.converters["text script"] = options.converters["script json"] = function() {
                      return convert(item, options);
                  };
                  options.xhr = mockxhr;
                  if (originalOptions.dataType !== "script") return "json";
              }
          }
          jQuery.ajaxPrefilter("json jsonp script", prefilter);
          return Mock;
      };
      if (typeof jQuery != "undefined") Mock.mockjax(jQuery);
      if (typeof Zepto != "undefined") {
          Mock.mockjax = function(Zepto) {
              var __original_ajax = Zepto.ajax;
              var xhr = {
                  readyState: 4,
                  responseText: "",
                  responseXML: null,
                  state: 2,
                  status: 200,
                  statusText: "success",
                  timeoutTimer: null
              };
              Zepto.ajax = function(options) {
                  var item = find(options);
                  if (item) {
                      var data = Mock.mock(item.template);
                      if (options.success) options.success(data, xhr, options);
                      if (options.complete) options.complete(xhr.status, xhr, options);
                      return xhr;
                  }
                  return __original_ajax.call(Zepto, options);
              };
          };
          Mock.mockjax(Zepto);
      }
      if (typeof KISSY != "undefined" && KISSY.add) {
          Mock.mockjax = function mockjax(KISSY) {
              var _original_ajax = KISSY.io;
              var xhr = {
                  readyState: 4,
                  responseText: "",
                  responseXML: null,
                  state: 2,
                  status: 200,
                  statusText: "success",
                  timeoutTimer: null
              };
              KISSY.io = function(options) {
                  var item = find(options);
                  if (item) {
                      var data = Mock.mock(item.template);
                      if (options.success) options.success(data, xhr, options);
                      if (options.complete) options.complete(xhr.status, xhr, options);
                      return xhr;
                  }
                  return _original_ajax.apply(this, arguments);
              };
              for (var name in _original_ajax) {
                  KISSY.io[name] = _original_ajax[name];
              }
          };
      }
      /*! src/expose.js */
      Mock.Util = Util;
      Mock.Random = Random;
      Mock.heredoc = Util.heredoc;
      if (typeof module === "object" && module.exports) {
          module.exports = Mock;
      } else if (typeof define === "function" && define.amd) {
          define("mock", [], function() {
              return Mock;
          });
          define("mockjs", [], function() {
              return Mock;
          });
      } else if (typeof define === "function" && define.cmd) {
          define(function() {
              return Mock;
          });
      }
      this.Mock = Mock;
      this.Random = Random;
      if (typeof KISSY != "undefined") {
          Util.each([ "mock", "components/mock/", "mock/dist/mock", "gallery/Mock/0.1.9/" ], function register(name) {
              KISSY.add(name, function(S) {
                  Mock.mockjax(S);
                  return Mock;
              }, {
                  requires: [ "ajax" ]
              });
          });
      }
      /*! src/mock4tpl.js */
      (function(undefined) {
          var Mock4Tpl = {
              version: "0.0.1"
          };
          if (!this.Mock) module.exports = Mock4Tpl;
          Mock.tpl = function(input, options, helpers, partials) {
              return Mock4Tpl.mock(input, options, helpers, partials);
          };
          Mock.parse = function(input) {
              return Handlebars.parse(input);
          };
          Mock4Tpl.mock = function(input, options, helpers, partials) {
              helpers = helpers ? Util.extend({}, helpers, Handlebars.helpers) : Handlebars.helpers;
              partials = partials ? Util.extend({}, partials, Handlebars.partials) : Handlebars.partials;
              return Handle.gen(input, null, options, helpers, partials);
          };
          var Handle = {
              debug: Mock4Tpl.debug || false,
              extend: Util.extend
          };
          Handle.gen = function(node, context, options, helpers, partials) {
              if (Util.isString(node)) {
                  var ast = Handlebars.parse(node);
                  options = Handle.parseOptions(node, options);
                  var data = Handle.gen(ast, context, options, helpers, partials);
                  return data;
              }
              context = context || [ {} ];
              options = options || {};
              if (this[node.type] === Util.noop) return;
              options.__path = options.__path || [];
              if (Mock4Tpl.debug || Handle.debug) {
                  console.log();
                  console.group("[" + node.type + "]", JSON.stringify(node));
                  console.log("[options]", options.__path.length, JSON.stringify(options));
              }
              var preLength = options.__path.length;
              this[node.type](node, context, options, helpers, partials);
              options.__path.splice(preLength);
              if (Mock4Tpl.debug || Handle.debug) {
                  console.groupEnd();
              }
              return context[context.length - 1];
          };
          Handle.parseOptions = function(input, options) {
              var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
              var comments = input.match(rComment), ret = {}, i, ma, option;
              for (i = 0; comments && i < comments.length; i++) {
                  rComment.lastIndex = 0;
                  ma = rComment.exec(comments[i]);
                  if (ma) {
                      option = new Function("return " + ma[1]);
                      option = option();
                      Util.extend(ret, option);
                  }
              }
              return Util.extend(ret, options);
          };
          Handle.val = function(name, options, context, def) {
              if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
              if (Mock4Tpl.debug || Handle.debug) console.log("[options]", name, options.__path);
              if (def !== undefined) def = Mock.mock(def);
              if (options) {
                  var mocked = Mock.mock(options);
                  if (Util.isString(mocked)) return mocked;
                  if (name in mocked) {
                      return mocked[name];
                  }
              }
              if (Util.isArray(context[0])) return {};
              return def !== undefined ? def : name || Random.word();
          };
          Handle.program = function(node, context, options, helpers, partials) {
              for (var i = 0; i < node.statements.length; i++) {
                  this.gen(node.statements[i], context, options, helpers, partials);
              }
          };
          Handle.mustache = function(node, context, options, helpers, partials) {
              var i, currentContext = context[0], contextLength = context.length;
              if (Util.type(currentContext) === "array") {
                  currentContext.push({});
                  currentContext = currentContext[currentContext.length - 1];
                  context.unshift(currentContext);
              }
              if (node.isHelper || helpers && helpers[node.id.string]) {
                  if (node.params.length === 0) {} else {
                      for (i = 0; i < node.params.length; i++) {
                          this.gen(node.params[i], context, options, helpers, partials);
                      }
                  }
                  if (node.hash) this.gen(node.hash, context, options, helpers, partials);
              } else {
                  this.gen(node.id, context, options, helpers, partials);
              }
              if (context.length > contextLength) context.splice(0, context.length - contextLength);
          };
          Handle.block = function(node, context, options, helpers, partials) {
              var parts = node.mustache.id.parts, i, len, cur, val, type, currentContext = context[0], contextLength = context.length;
              if (node.inverse) {}
              if (node.mustache.isHelper || helpers && helpers[node.mustache.id.string]) {
                  type = parts[0];
                  val = (Helpers[type] || Helpers.custom).apply(this, arguments);
                  currentContext = context[0];
              } else {
                  for (i = 0; i < parts.length; i++) {
                      options.__path.push(parts[i]);
                      cur = parts[i];
                      val = this.val(cur, options, context, {});
                      currentContext[cur] = Util.isArray(val) && [] || val;
                      type = Util.type(currentContext[cur]);
                      if (type === "object" || type === "array") {
                          currentContext = currentContext[cur];
                          context.unshift(currentContext);
                      }
                  }
              }
              if (node.program) {
                  if (Util.type(currentContext) === "array") {
                      len = val.length || Random.integer(3, 7);
                      for (i = 0; i < len; i++) {
                          currentContext.push(typeof val[i] !== "undefined" ? val[i] : {});
                          options.__path.push("[]");
                          context.unshift(currentContext[currentContext.length - 1]);
                          this.gen(node.program, context, options, helpers, partials);
                          options.__path.pop();
                          context.shift();
                      }
                  } else this.gen(node.program, context, options, helpers, partials);
              }
              if (context.length > contextLength) context.splice(0, context.length - contextLength);
          };
          Handle.hash = function(node, context, options, helpers, partials) {
              var pairs = node.pairs, pair, i, j;
              for (i = 0; i < pairs.length; i++) {
                  pair = pairs[i];
                  for (j = 1; j < pair.length; j++) {
                      this.gen(pair[j], context, options, helpers, partials);
                  }
              }
          };
          Handle.ID = function(node, context, options) {
              var parts = node.parts, i, len, cur, prev, def, val, type, valType, preOptions, currentContext = context[node.depth], contextLength = context.length;
              if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
              if (!parts.length) {} else {
                  for (i = 0, len = parts.length; i < len; i++) {
                      options.__path.push(parts[i]);
                      cur = parts[i];
                      prev = parts[i - 1];
                      preOptions = options[prev];
                      def = i === len - 1 ? currentContext[cur] : {};
                      val = this.val(cur, options, context, def);
                      type = Util.type(currentContext[cur]);
                      valType = Util.type(val);
                      if (type === "undefined") {
                          if (i < len - 1 && valType !== "object" && valType !== "array") {
                              currentContext[cur] = {};
                          } else {
                              currentContext[cur] = Util.isArray(val) && [] || val;
                          }
                      } else {
                          if (i < len - 1 && type !== "object" && type !== "array") {
                              currentContext[cur] = Util.isArray(val) && [] || {};
                          }
                      }
                      type = Util.type(currentContext[cur]);
                      if (type === "object" || type === "array") {
                          currentContext = currentContext[cur];
                          context.unshift(currentContext);
                      }
                  }
              }
              if (context.length > contextLength) context.splice(0, context.length - contextLength);
          };
          Handle.partial = function(node, context, options, helpers, partials) {
              var name = node.partialName.name, partial = partials && partials[name], contextLength = context.length;
              if (partial) Handle.gen(partial, context, options, helpers, partials);
              if (context.length > contextLength) context.splice(0, context.length - contextLength);
          };
          Handle.content = Util.noop;
          Handle.PARTIAL_NAME = Util.noop;
          Handle.DATA = Util.noop;
          Handle.STRING = Util.noop;
          Handle.INTEGER = Util.noop;
          Handle.BOOLEAN = Util.noop;
          Handle.comment = Util.noop;
          var Helpers = {};
          Helpers.each = function(node, context, options) {
              var i, len, cur, val, parts, def, type, currentContext = context[0];
              parts = node.mustache.params[0].parts;
              for (i = 0, len = parts.length; i < len; i++) {
                  options.__path.push(parts[i]);
                  cur = parts[i];
                  def = i === len - 1 ? [] : {};
                  val = this.val(cur, options, context, def);
                  currentContext[cur] = Util.isArray(val) && [] || val;
                  type = Util.type(currentContext[cur]);
                  if (type === "object" || type === "array") {
                      currentContext = currentContext[cur];
                      context.unshift(currentContext);
                  }
              }
              return val;
          };
          Helpers["if"] = Helpers.unless = function(node, context, options) {
              var params = node.mustache.params, i, j, cur, val, parts, def, type, currentContext = context[0];
              for (i = 0; i < params.length; i++) {
                  parts = params[i].parts;
                  for (j = 0; j < parts.length; j++) {
                      if (i === 0) options.__path.push(parts[j]);
                      cur = parts[j];
                      def = j === parts.length - 1 ? "@BOOL(2,1,true)" : {};
                      val = this.val(cur, options, context, def);
                      if (j === parts.length - 1) {
                          val = val === "true" ? true : val === "false" ? false : val;
                      }
                      currentContext[cur] = Util.isArray(val) ? [] : val;
                      type = Util.type(currentContext[cur]);
                      if (type === "object" || type === "array") {
                          currentContext = currentContext[cur];
                          context.unshift(currentContext);
                      }
                  }
              }
              return val;
          };
          Helpers["with"] = function(node, context, options) {
              var i, cur, val, parts, def, currentContext = context[0];
              parts = node.mustache.params[0].parts;
              for (i = 0; i < parts.length; i++) {
                  options.__path.push(parts[i]);
                  cur = parts[i];
                  def = {};
                  val = this.val(cur, options, context, def);
                  currentContext = currentContext[cur] = val;
                  context.unshift(currentContext);
              }
              return val;
          };
          Helpers.log = function() {};
          Helpers.custom = function(node, context, options) {
              var i, len, cur, val, parts, def, type, currentContext = context[0];
              if (node.mustache.params.length === 0) {
                  return;
                  options.__path.push(node.mustache.id.string);
                  cur = node.mustache.id.string;
                  def = "@BOOL(2,1,true)";
                  val = this.val(cur, options, context, def);
                  currentContext[cur] = Util.isArray(val) && [] || val;
                  type = Util.type(currentContext[cur]);
                  if (type === "object" || type === "array") {
                      currentContext = currentContext[cur];
                      context.unshift(currentContext);
                  }
              } else {
                  parts = node.mustache.params[0].parts;
                  for (i = 0, len = parts.length; i < len; i++) {
                      options.__path.push(parts[i]);
                      cur = parts[i];
                      def = i === len - 1 ? [] : {};
                      val = this.val(cur, options, context, def);
                      currentContext[cur] = Util.isArray(val) && [] || val;
                      type = Util.type(currentContext[cur]);
                      if (type === "object" || type === "array") {
                          currentContext = currentContext[cur];
                          context.unshift(currentContext);
                      }
                  }
              }
              return val;
          };
      }).call(this);
      /*! src/mock4xtpl.js */
      (function(undefined) {
          if (typeof KISSY === "undefined") return;
          var Mock4XTpl = {
              debug: false
          };
          var XTemplate;
          KISSY.use("xtemplate", function(S, T) {
              XTemplate = T;
          });
          if (!this.Mock) module.exports = Mock4XTpl;
          Mock.xtpl = function(input, options, helpers, partials) {
              return Mock4XTpl.mock(input, options, helpers, partials);
          };
          Mock.xparse = function(input) {
              return XTemplate.compiler.parse(input);
          };
          Mock4XTpl.mock = function(input, options, helpers, partials) {
              helpers = helpers ? Util.extend({}, helpers, XTemplate.RunTime.commands) : XTemplate.RunTime.commands;
              partials = partials ? Util.extend({}, partials, XTemplate.RunTime.subTpls) : XTemplate.RunTime.subTpls;
              return this.gen(input, null, options, helpers, partials, {});
          };
          Mock4XTpl.parse = function(input) {
              return XTemplate.compiler.parse(input);
          };
          Mock4XTpl.gen = function(node, context, options, helpers, partials, other) {
              if (typeof node === "string") {
                  if (Mock4XTpl.debug) {
                      console.log("[tpl    ]\n", node);
                  }
                  var ast = this.parse(node);
                  options = this.parseOptions(node, options);
                  var data = this.gen(ast, context, options, helpers, partials, other);
                  return data;
              }
              context = context || [ {} ];
              options = options || {};
              node.type = node.type;
              if (this[node.type] === Util.noop) return;
              options.__path = options.__path || [];
              if (Mock4XTpl.debug) {
                  console.log();
                  console.group("[" + node.type + "]", JSON.stringify(node));
                  console.log("[context]", "[before]", context.length, JSON.stringify(context));
                  console.log("[options]", "[before]", options.__path.length, JSON.stringify(options));
                  console.log("[other  ]", "[before]", JSON.stringify(other));
              }
              var preLength = options.__path.length;
              this[node.type](node, context, options, helpers, partials, other);
              if (Mock4XTpl.debug) {
                  console.log("[__path ]", "[after ]", options.__path);
              }
              if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                  options.__path.splice(preLength);
              }
              if (Mock4XTpl.debug) {
                  console.log("[context]", "[after ]", context.length, JSON.stringify(context));
                  console.groupEnd();
              }
              return context[context.length - 1];
          };
          Mock4XTpl.parseOptions = function(input, options) {
              var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
              var comments = input.match(rComment), ret = {}, i, ma, option;
              for (i = 0; comments && i < comments.length; i++) {
                  rComment.lastIndex = 0;
                  ma = rComment.exec(comments[i]);
                  if (ma) {
                      option = new Function("return " + ma[1]);
                      option = option();
                      Util.extend(ret, option);
                  }
              }
              return Util.extend(ret, options);
          };
          Mock4XTpl.parseVal = function(expr, object) {
              function queryArray(prop, context) {
                  if (typeof context === "object" && prop in context) return [ context[prop] ];
                  var ret = [];
                  for (var i = 0; i < context.length; i++) {
                      ret.push.apply(ret, query(prop, [ context[i] ]));
                  }
                  return ret;
              }
              function queryObject(prop, context) {
                  if (typeof context === "object" && prop in context) return [ context[prop] ];
                  var ret = [];
                  for (var key in context) {
                      ret.push.apply(ret, query(prop, [ context[key] ]));
                  }
                  return ret;
              }
              function query(prop, set) {
                  var ret = [];
                  for (var i = 0; i < set.length; i++) {
                      if (typeof set[i] !== "object") continue;
                      if (prop in set[i]) ret.push(set[i][prop]); else {
                          ret.push.apply(ret, Util.isArray(set[i]) ? queryArray(prop, set[i]) : queryObject(prop, set[i]));
                      }
                  }
                  return ret;
              }
              function parse(expr, context) {
                  var parts = typeof expr === "string" ? expr.split(".") : expr.slice(0), set = [ context ];
                  while (parts.length) {
                      set = query(parts.shift(), set);
                  }
                  return set;
              }
              return parse(expr, object);
          };
          Mock4XTpl.val = function(name, options, context, def) {
              if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
              if (def !== undefined) def = Mock.mock(def);
              if (options) {
                  var mocked = Mock.mock(options);
                  if (Util.isString(mocked)) return mocked;
                  var ret = Mock4XTpl.parseVal(options.__path, mocked);
                  if (ret.length > 0) return ret[0];
                  if (name in mocked) {
                      return mocked[name];
                  }
              }
              if (Util.isArray(context[0])) return {};
              return def !== undefined ? def : name;
          };
          Mock4XTpl.program = function(node, context, options, helpers, partials, other) {
              for (var i = 0; i < node.statements.length; i++) {
                  this.gen(node.statements[i], context, options, helpers, partials, other);
              }
              for (var j = 0; node.inverse && j < node.inverse.length; j++) {
                  this.gen(node.inverse[j], context, options, helpers, partials, other);
              }
          };
          Mock4XTpl.block = function(node, context, options, helpers, partials, other) {
              var contextLength = context.length;
              this.gen(node.tpl, context, options, helpers, partials, Util.extend({}, other, {
                  def: {},
                  hold: true
              }));
              var currentContext = context[0], mocked, i, len;
              if (Util.type(currentContext) === "array") {
                  mocked = this.val(options.__path[options.__path.length - 1], options, context);
                  len = mocked && mocked.length || Random.integer(3, 7);
                  for (i = 0; i < len; i++) {
                      currentContext.push(mocked && mocked[i] !== undefined ? mocked[i] : {});
                      options.__path.push(i);
                      context.unshift(currentContext[currentContext.length - 1]);
                      this.gen(node.program, context, options, helpers, partials, other);
                      options.__path.pop();
                      context.shift();
                  }
              } else this.gen(node.program, context, options, helpers, partials, other);
              if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
                  context.splice(0, context.length - contextLength);
              }
          };
          Mock4XTpl.tpl = function(node, context, options, helpers, partials, other) {
              if (node.params && node.params.length) {
                  other = Util.extend({}, other, {
                      def: {
                          each: [],
                          "if": "@BOOL(2,1,true)",
                          unless: "@BOOL(2,1,false)",
                          "with": {}
                      }[node.path.string],
                      hold: {
                          each: true,
                          "if": function(_, __, ___, name, value) {
                              return typeof value === "object";
                          },
                          unless: function(_, __, ___, name, value) {
                              return typeof value === "object";
                          },
                          "with": true,
                          include: false
                      }[node.path.string]
                  });
                  for (var i = 0, input; i < node.params.length; i++) {
                      if (node.path.string === "include") {
                          input = partials && partials[node.params[i].value];
                      } else input = node.params[i];
                      if (input) this.gen(input, context, options, helpers, partials, other);
                  }
                  if (node.hash) {
                      this.gen(node.hash, context, options, helpers, partials, other);
                  }
              } else {
                  this.gen(node.path, context, options, helpers, partials, other);
              }
          };
          Mock4XTpl.tplExpression = function(node, context, options, helpers, partials, other) {
              this.gen(node.expression, context, options, helpers, partials, other);
          };
          Mock4XTpl.content = Util.noop;
          Mock4XTpl.unaryExpression = Util.noop;
          Mock4XTpl.multiplicativeExpression = Mock4XTpl.additiveExpression = function(node, context, options, helpers, partials, other) {
              this.gen(node.op1, context, options, helpers, partials, Util.extend({}, other, {
                  def: function() {
                      return node.op2.type === "number" ? node.op2.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                  }()
              }));
              this.gen(node.op2, context, options, helpers, partials, Util.extend({}, other, {
                  def: function() {
                      return node.op1.type === "number" ? node.op1.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
                  }()
              }));
          };
          Mock4XTpl.relationalExpression = function(node, context, options, helpers, partials, other) {
              this.gen(node.op1, context, options, helpers, partials, other);
              this.gen(node.op2, context, options, helpers, partials, other);
          };
          Mock4XTpl.equalityExpression = Util.noop;
          Mock4XTpl.conditionalAndExpression = Util.noop;
          Mock4XTpl.conditionalOrExpression = Util.noop;
          Mock4XTpl.string = Util.noop;
          Mock4XTpl.number = Util.noop;
          Mock4XTpl.boolean = Util.noop;
          Mock4XTpl.hash = function(node, context, options, helpers, partials, other) {
              var pairs = node.value, key;
              for (key in pairs) {
                  this.gen(pairs[key], context, options, helpers, partials, other);
              }
          };
          Mock4XTpl.id = function(node, context, options, helpers, partials, other) {
              var contextLength = context.length;
              var parts = node.parts, currentContext = context[node.depth], i, len, cur, def, val;
              function fix(currentContext, index, length, name, val) {
                  var type = Util.type(currentContext[name]), valType = Util.type(val);
                  val = val === "true" ? true : val === "false" ? false : val;
                  if (type === "undefined") {
                      if (index < length - 1 && !Util.isObjectOrArray(val)) {
                          currentContext[name] = {};
                      } else {
                          currentContext[name] = Util.isArray(val) && [] || val;
                      }
                  } else {
                      if (index < length - 1 && type !== "object" && type !== "array") {
                          currentContext[name] = Util.isArray(val) && [] || {};
                      } else {
                          if (type !== "object" && type !== "array" && valType !== "object" && valType !== "array") {
                              currentContext[name] = val;
                          }
                      }
                  }
                  return currentContext[name];
              }
              if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
              for (i = 0, len = parts.length; i < len; i++) {
                  if (i === 0 && parts[i] === "this") continue;
                  if (/^(xindex|xcount|xkey)$/.test(parts[i])) continue;
                  if (i === 0 && len === 1 && parts[i] in helpers) continue;
                  options.__path.push(parts[i]);
                  cur = parts[i];
                  def = i === len - 1 ? other.def !== undefined ? other.def : context[0][cur] : {};
                  val = this.val(cur, options, context, def);
                  if (Mock4XTpl.debug) {
                      console.log("[def    ]", JSON.stringify(def));
                      console.log("[val    ]", JSON.stringify(val));
                  }
                  val = fix(currentContext, i, len, cur, val);
                  if (Util.isObjectOrArray(currentContext[cur])) {
                      context.unshift(currentContext = currentContext[cur]);
                  }
              }
              if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context, cur, val)) {
                  context.splice(0, context.length - contextLength);
              }
          };
      }).call(this);
  }).call(this);

});

;/*!app*/
define('app', function(require, exports, module) {

  /**
   * App for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/app
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _class = require('class');
  
  var _class2 = _interopRequireDefault(_class);
  
  var _config = require('config');
  
  var _config2 = _interopRequireDefault(_config);
  
  // 非开放de私有方法
  var zeptoArray = undefined;
  
  var Privates = (function () {
      function Privates() {
          _classCallCheck(this, Privates);
      }
  
      _createClass(Privates, [{
          key: 'getData',
  
          // 返回支持Mock的数据
          value: function getData(app, data) {
              return data && !$.isPlainObject(data) ? app.getMockData() : $.extend(app.getMockData(), data);
          }
  
          // 获取app的renderId
      }, {
          key: 'getRenderId',
          value: function getRenderId(app) {
              return app.renderString + app.name;
          }
  
          // 支持app.render
      }, {
          key: 'render',
          value: function render(app, id, type) {
              id = id || '#' + this.getRenderId(app);
  
              this.prerender(app);
  
              // 执行渲染
              app.getParent() ? app.getParent().find(id).eq(0).replaceWith(app.getApp()) : $(id).replaceWith(app.getApp());
  
              this.postrender(app);
          }
  
          // 支持app预处理
      }, {
          key: 'prerender',
          value: function prerender(app) {
              app.prerender(app);
              // 预处理需要添加到thisApp上的属性
              app.__attr ? app.getApp().attr(app.__attr) : '';
          }
  
          // 支持app后处理
      }, {
          key: 'postrender',
          value: function postrender(app) {
              app.postrender(app);
          }
  
          // 合并指定Zepto对象的 id、class
      }, {
          key: 'merge',
          value: function merge(target, source) {
              if (!source) {
                  return;
              }
              target.attr('id', source.attr('id'));
              target.addClass(source.attr('class'));
          }
      }]);
  
      return Privates;
  })();
  
  var privates = new Privates();
  
  var App = (function (_Base) {
      _inherits(App, _Base);
  
      function App() {
          _classCallCheck(this, App);
  
          _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
          this.guid = (0, _guid2['default'])();
          this.aimee = { app: true };
          this.renderString = 'lincoapp-id-';
          this.CONFIG = new _config2['default']();
          this.CONFIG.init({});
      }
  
      _createClass(App, [{
          key: 'init',
          value: function init(data) {
              // 初始化App数据
              !$.isEmptyObject(data) ? this._data = data : this._data = this.getMockData();
  
              // 检查默认数据是存在config
              this._data.config ?
              // 存在则直接赋值
              this.CONFIG.init(this._data.config) :
              // 不存在则初始化
              this._data.config = this.CONFIG.get();
  
              // 构建临时Zepto对象，App编译前skin、addClass等操作将作用于此
              this.__app = aimee.$('div');
              return this;
          }
  
          // 编译数据并缓存App Zepto对象
      }, {
          key: 'compile',
          value: function compile(data) {
              this._prevApp = this._app;
              // Compile
              this._app = $(this.template(data || this.getData()));
              // Merge id, className
              privates.merge(this._app, this.__app);
              // Clear tmp Zepto
              this.__app = null;
              return this;
          }
  
          /**
           * 批量绑定事件
           * @param   {Object}  events 事件对象模型
           * @example
           * this.bind({
           * 		'click@.lincoapp-footer': () => {
           * 			// do something
           * 		}
           * 		'click, focus@.lincoapp-comment': () => {
           * 			// do something
           * 		}
           * })
           */
      }, {
          key: 'bind',
          value: function bind(events) {
              var _this = this;
  
              events = events || {};
              $.each(events, function (key, fn) {
                  var pair = key.split('@');
                  var evts = pair[0].split(/,\s*/g);
                  evts.forEach(function (type) {
                      _this.on(type, pair[1], fn);
                  });
              });
          }
      }, {
          key: 'render',
          value: function render(id, data) {
              this.onload();
              this.compile(data);
              privates.render(this, id);
              return this;
          }
  
          // 重载
      }, {
          key: 'reload',
          value: function reload(inherit, data) {
              if ($.isPlainObject(inherit)) {
                  data = inherit;
                  inherit = false;
              }
  
              !inherit ? data : data = $.extend(true, {}, this.getData(), data);
  
              this.render(this._prevApp, data);
              return this;
          }
  
          // 传入配置文件
      }, {
          key: 'config',
          value: function config() {
              var val = this.CONFIG.general.apply(this.CONFIG, arguments);
              return val === undefined ? this : val;
          }
  
          // 获取mock模拟数据
      }, {
          key: 'getMockData',
          value: function getMockData() {
              var data;
              var mock = require('mock').mock;
  
              try {
                  data = require(this.name + '/' + this.name + '.json');
              } catch (e) {
                  // 虚拟组件可自由定制数据
                  data = this._data || {};
              }
  
              return mock(data);
          }
  
          // 获取来自页面的数据
      }, {
          key: 'getData',
          value: function getData() {
              return this._data || this.getMockData();
          }
      }, {
          key: 'setData',
          value: function setData(data) {
              this._data = data;
              return this;
          }
  
          // 返回模块jQuery对象
      }, {
          key: 'getApp',
          value: function getApp() {
              return this._app || this.__app;
          }
      }, {
          key: 'setApp',
          value: function setApp($dom) {
              this._app = $dom;
              return this;
          }
      }, {
          key: 'setPage',
          value: function setPage(page) {
              this.page = page;
              return this;
          }
  
          // 返回所属页面jQuery对象
      }, {
          key: 'getPage',
          value: function getPage() {
              return this.page ? this.page._page : this.parent;
          }
      }, {
          key: 'getParent',
          value: function getParent() {
              return this.parent ? this.parent : false;
          }
  
          // 设置模块皮肤
      }, {
          key: 'skin',
          value: function skin(className) {
              var it = this;
  
              if (className) className.split(' ').forEach(function (item) {
                  it.addClass('skin-' + item);
              });
              return this;
          }
  
          // 删除模块皮肤
      }, {
          key: 'removeSkin',
          value: function removeSkin(className) {
              var it = this;
  
              if (className) className.split(' ').forEach(function (item) {
                  it.removeClass('skin-' + item);
              });
              return this;
          }
      }, {
          key: 'find',
          value: function find(selector) {
              return this.getApp().find(selector);
          }
      }, {
          key: 'export',
          value: function _export(App, fn) {
              var data;
              var app = new App();
              this.app ? '' : this.app = {};
  
              // 用于简单调用模块，仅用于开发测试环境
              if (typeof fn === 'object') {
                  data = fn;
                  fn = null;
              };
  
              // 检查重复加载
              if (this.app[app.guid]) {
                  return console.error(app.guid + ' is exist');
              };
  
              // 缓存app对象到页面
              this.app[app.name] ? '' : this.app[app.name] = [];
              this.app[app.name].push(app);
              // 定义get方法用于获取app实例
              this.app[app.name].get = function (index, fn) {
                  if (typeof index === 'function') {
                      fn = index;
                      index = 0;
                  }
  
                  if (typeof fn === 'function') {
                      fn.call(this[index], this[index]);
                  } else {
                      return this[typeof index === 'number' ? index : 0];
                  }
              };
  
              // 存储需要添加的属性
              // 标记当前app在同类app数组中的位置
              app.__attr ? '' : app.__attr = {};
              app.__attr['data-code'] = this.app[app.name].length - 1;
  
              // 缓存引用页面对象
              app.page = this.page;
  
              // 缓存父级模块
              app.parent = this;
  
              // 缓存pm对象
              app.pm = this.pm;
  
              // 没有回调时自动渲染，仅用于开发测试环境
              fn ? fn.call(app, app) : app.init(data).render();
  
              if (!fn) {
                  return app;
              }
          }
      }, {
          key: 'exports',
          value: function exports(id, fn) {
              // id === string
              if (typeof id === 'string') {
                  // 多个组件调用，返回page对象
                  if (id.split(' ').length > 1) {
                      this.exports(id.split(' '), fn);
                      return this;
                  }
                  // 单个组件调用返回app对象
                  else {
                          return this['export'](require(id), fn);
                      }
              }
          }
  
          // Rewrite
  
          // 初始化后
      }, {
          key: 'onload',
          value: function onload() {
              return this;
          }
  
          // 渲染预处理
      }, {
          key: 'prerender',
          value: function prerender(app) {
              return this;
          }
  
          // 渲染后处理
      }, {
          key: 'postrender',
          value: function postrender(app) {
              return this;
          }
  
          // 页面渲染后，被覆盖
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              return this;
          }
      }]);
  
      return App;
  })(_class2['default']);
  
  App.aimee = { app: true };
  
  // Method Extend From Zepto
  zeptoArray = ('show hide on off delegate undelegate addClass removeClass ' + 'before after append prepend appendTo prependTo').split(' ');
  zeptoArray.forEach(function (name) {
      App.prototype[name] = function () {
          $.fn[name].apply(this.getApp(), arguments);
          return this;
      };
  });
  
  exports['default'] = App;
  module.exports = exports['default'];

});

;/*!autoscreen*/
define('autoscreen', function(require, exports, module) {

  'use strict';
  
  (function () {
  	var baseFontSize = 100;
  	var baseWidth = 320;
  	var clientWidth = document.documentElement.clientWidth || window.innerWidth;
  	var innerWidth = Math.max(Math.min(clientWidth, 480), 320);
  
  	var rem = 100;
  
  	if (innerWidth > 362 && innerWidth <= 375) {
  		rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.9);
  	}
  	if (innerWidth > 375) {
  		rem = Math.floor(innerWidth / baseWidth * baseFontSize * 0.84);
  	}
  
  	document.querySelector('html').style.fontSize = rem + 'px';
  })();

});

;/*!babel-polyfill*/
define('babel-polyfill', function(require, exports, module) {

  "use strict";
  
  !(function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var c = "function" == typeof require && require;if (!u && c) return c(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
        }var a = n[o] = { exports: {} };t[o][0].call(a.exports, function (n) {
          var r = t[o][1][n];return s(r ? r : n);
        }, a, a.exports, e, t, n, r);
      }return n[o].exports;
    }for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);return s;
  })({ 1: [function (t, n, r) {
      (function (n) {
        "use strict";function define(t, n, e) {
          t[n] || Object[r](t, n, { writable: !0, configurable: !0, value: e });
        }if ((t(296), t(297), t(2), n._babelPolyfill)) throw new Error("only one instance of babel-polyfill is allowed");n._babelPolyfill = !0;var r = "defineProperty";define(String.prototype, "padLeft", "".padStart), define(String.prototype, "padRight", "".padEnd), "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (t) {
          [][t] && define(Array, t, Function.call.bind([][t]));
        });
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, { 2: 2, 296: 296, 297: 297 }], 2: [function (t, n, r) {
      t(120), n.exports = t(23).RegExp.escape;
    }, { 120: 120, 23: 23 }], 3: [function (t, n, r) {
      n.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
      };
    }, {}], 4: [function (t, n, r) {
      var e = t(18);n.exports = function (t, n) {
        if ("number" != typeof t && "Number" != e(t)) throw TypeError(n);return +t;
      };
    }, { 18: 18 }], 5: [function (t, n, r) {
      var e = t(117)("unscopables"),
          i = Array.prototype;void 0 == i[e] && t(40)(i, e, {}), n.exports = function (t) {
        i[e][t] = !0;
      };
    }, { 117: 117, 40: 40 }], 6: [function (t, n, r) {
      n.exports = function (t, n, r, e) {
        if (!(t instanceof n) || void 0 !== e && e in t) throw TypeError(r + ": incorrect invocation!");return t;
      };
    }, {}], 7: [function (t, n, r) {
      var e = t(49);n.exports = function (t) {
        if (!e(t)) throw TypeError(t + " is not an object!");return t;
      };
    }, { 49: 49 }], 8: [function (t, n, r) {
      "use strict";var e = t(109),
          i = t(105),
          o = t(108);n.exports = [].copyWithin || function copyWithin(t, n) {
        var r = e(this),
            u = o(r.length),
            c = i(t, u),
            f = i(n, u),
            a = arguments.length > 2 ? arguments[2] : void 0,
            s = Math.min((void 0 === a ? u : i(a, u)) - f, u - c),
            l = 1;for (c > f && f + s > c && (l = -1, f += s - 1, c += s - 1); s-- > 0;) f in r ? r[c] = r[f] : delete r[c], c += l, f += l;return r;
      };
    }, { 105: 105, 108: 108, 109: 109 }], 9: [function (t, n, r) {
      "use strict";var e = t(109),
          i = t(105),
          o = t(108);n.exports = function fill(t) {
        for (var n = e(this), r = o(n.length), u = arguments.length, c = i(u > 1 ? arguments[1] : void 0, r), f = u > 2 ? arguments[2] : void 0, a = void 0 === f ? r : i(f, r); a > c;) n[c++] = t;return n;
      };
    }, { 105: 105, 108: 108, 109: 109 }], 10: [function (t, n, r) {
      var e = t(37);n.exports = function (t, n) {
        var r = [];return e(t, !1, r.push, r, n), r;
      };
    }, { 37: 37 }], 11: [function (t, n, r) {
      var e = t(107),
          i = t(108),
          o = t(105);n.exports = function (t) {
        return function (n, r, u) {
          var c,
              f = e(n),
              a = i(f.length),
              s = o(u, a);if (t && r != r) {
            for (; a > s;) if ((c = f[s++], c != c)) return !0;
          } else for (; a > s; s++) if ((t || s in f) && f[s] === r) return t || s || 0;return !t && -1;
        };
      };
    }, { 105: 105, 107: 107, 108: 108 }], 12: [function (t, n, r) {
      var e = t(25),
          i = t(45),
          o = t(109),
          u = t(108),
          c = t(15);n.exports = function (t, n) {
        var r = 1 == t,
            f = 2 == t,
            a = 3 == t,
            s = 4 == t,
            l = 6 == t,
            h = 5 == t || l,
            v = n || c;return function (n, c, p) {
          for (var d, y, g = o(n), b = i(g), x = e(c, p, 3), m = u(b.length), w = 0, S = r ? v(n, m) : f ? v(n, 0) : void 0; m > w; w++) if ((h || w in b) && (d = b[w], y = x(d, w, g), t)) if (r) S[w] = y;else if (y) switch (t) {case 3:
              return !0;case 5:
              return d;case 6:
              return w;case 2:
              S.push(d);} else if (s) return !1;return l ? -1 : a || s ? s : S;
        };
      };
    }, { 108: 108, 109: 109, 15: 15, 25: 25, 45: 45 }], 13: [function (t, n, r) {
      var e = t(3),
          i = t(109),
          o = t(45),
          u = t(108);n.exports = function (t, n, r, c, f) {
        e(n);var a = i(t),
            s = o(a),
            l = u(a.length),
            h = f ? l - 1 : 0,
            v = f ? -1 : 1;if (2 > r) for (;;) {
          if (h in s) {
            c = s[h], h += v;break;
          }if ((h += v, f ? 0 > h : h >= l)) throw TypeError("Reduce of empty array with no initial value");
        }for (; f ? h >= 0 : l > h; h += v) h in s && (c = n(c, s[h], h, a));return c;
      };
    }, { 108: 108, 109: 109, 3: 3, 45: 45 }], 14: [function (t, n, r) {
      var e = t(49),
          i = t(47),
          o = t(117)("species");n.exports = function (t) {
        var n;return i(t) && (n = t.constructor, "function" != typeof n || n !== Array && !i(n.prototype) || (n = void 0), e(n) && (n = n[o], null === n && (n = void 0))), void 0 === n ? Array : n;
      };
    }, { 117: 117, 47: 47, 49: 49 }], 15: [function (t, n, r) {
      var e = t(14);n.exports = function (t, n) {
        return new (e(t))(n);
      };
    }, { 14: 14 }], 16: [function (t, n, r) {
      "use strict";var e = t(3),
          i = t(49),
          o = t(44),
          u = [].slice,
          c = {},
          f = function f(t, n, r) {
        if (!(n in c)) {
          for (var e = [], i = 0; n > i; i++) e[i] = "a[" + i + "]";c[n] = Function("F,a", "return new F(" + e.join(",") + ")");
        }return c[n](t, r);
      };n.exports = Function.bind || function bind(t) {
        var n = e(this),
            r = u.call(arguments, 1),
            c = function c() {
          var e = r.concat(u.call(arguments));return this instanceof c ? f(n, e.length, e) : o(n, e, t);
        };return i(n.prototype) && (c.prototype = n.prototype), c;
      };
    }, { 3: 3, 44: 44, 49: 49 }], 17: [function (t, n, r) {
      var e = t(18),
          i = t(117)("toStringTag"),
          o = "Arguments" == e((function () {
        return arguments;
      })()),
          u = function u(t, n) {
        try {
          return t[n];
        } catch (r) {}
      };n.exports = function (t) {
        var n, r, c;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = u(n = Object(t), i)) ? r : o ? e(n) : "Object" == (c = e(n)) && "function" == typeof n.callee ? "Arguments" : c;
      };
    }, { 117: 117, 18: 18 }], 18: [function (t, n, r) {
      var e = ({}).toString;n.exports = function (t) {
        return e.call(t).slice(8, -1);
      };
    }, {}], 19: [function (t, n, r) {
      "use strict";var e = t(67).f,
          i = t(66),
          o = (t(40), t(86)),
          u = t(25),
          c = t(6),
          f = t(27),
          a = t(37),
          s = t(53),
          l = t(55),
          h = t(91),
          v = t(28),
          p = t(62).fastKey,
          d = v ? "_s" : "size",
          y = function y(t, n) {
        var r,
            e = p(n);if ("F" !== e) return t._i[e];for (r = t._f; r; r = r.n) if (r.k == n) return r;
      };n.exports = { getConstructor: function getConstructor(t, n, r, s) {
          var l = t(function (t, e) {
            c(t, l, n, "_i"), t._i = i(null), t._f = void 0, t._l = void 0, t[d] = 0, void 0 != e && a(e, r, t[s], t);
          });return o(l.prototype, { clear: function clear() {
              for (var t = this, n = t._i, r = t._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];t._f = t._l = void 0, t[d] = 0;
            }, "delete": function _delete(t) {
              var n = this,
                  r = y(n, t);if (r) {
                var e = r.n,
                    i = r.p;delete n._i[r.i], r.r = !0, i && (i.n = e), e && (e.p = i), n._f == r && (n._f = e), n._l == r && (n._l = i), n[d]--;
              }return !!r;
            }, forEach: function forEach(t) {
              c(this, l, "forEach");for (var n, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) for (r(n.v, n.k, this); n && n.r;) n = n.p;
            }, has: function has(t) {
              return !!y(this, t);
            } }), v && e(l.prototype, "size", { get: function get() {
              return f(this[d]);
            } }), l;
        }, def: function def(t, n, r) {
          var e,
              i,
              o = y(t, n);return o ? o.v = r : (t._l = o = { i: i = p(n, !0), k: n, v: r, p: e = t._l, n: void 0, r: !1 }, t._f || (t._f = o), e && (e.n = o), t[d]++, "F" !== i && (t._i[i] = o)), t;
        }, getEntry: y, setStrong: function setStrong(t, n, r) {
          s(t, n, function (t, n) {
            this._t = t, this._k = n, this._l = void 0;
          }, function () {
            for (var t = this, n = t._k, r = t._l; r && r.r;) r = r.p;return t._t && (t._l = r = r ? r.n : t._t._f) ? "keys" == n ? l(0, r.k) : "values" == n ? l(0, r.v) : l(0, [r.k, r.v]) : (t._t = void 0, l(1));
          }, r ? "entries" : "values", !r, !0), h(n);
        } };
    }, { 25: 25, 27: 27, 28: 28, 37: 37, 40: 40, 53: 53, 55: 55, 6: 6, 62: 62, 66: 66, 67: 67, 86: 86, 91: 91 }], 20: [function (t, n, r) {
      var e = t(17),
          i = t(10);n.exports = function (t) {
        return function toJSON() {
          if (e(this) != t) throw TypeError(t + "#toJSON isn't generic");return i(this);
        };
      };
    }, { 10: 10, 17: 17 }], 21: [function (t, n, r) {
      "use strict";var e = t(86),
          i = t(62).getWeak,
          o = t(7),
          u = t(49),
          c = t(6),
          f = t(37),
          a = t(12),
          s = t(39),
          l = a(5),
          h = a(6),
          v = 0,
          p = function p(t) {
        return t._l || (t._l = new d());
      },
          d = function d() {
        this.a = [];
      },
          y = function y(t, n) {
        return l(t.a, function (t) {
          return t[0] === n;
        });
      };d.prototype = { get: function get(t) {
          var n = y(this, t);return n ? n[1] : void 0;
        }, has: function has(t) {
          return !!y(this, t);
        }, set: function set(t, n) {
          var r = y(this, t);r ? r[1] = n : this.a.push([t, n]);
        }, "delete": function _delete(t) {
          var n = h(this.a, function (n) {
            return n[0] === t;
          });return ~n && this.a.splice(n, 1), !! ~n;
        } }, n.exports = { getConstructor: function getConstructor(t, n, r, o) {
          var a = t(function (t, e) {
            c(t, a, n, "_i"), t._i = v++, t._l = void 0, void 0 != e && f(e, r, t[o], t);
          });return e(a.prototype, { "delete": function _delete(t) {
              if (!u(t)) return !1;var n = i(t);return n === !0 ? p(this)["delete"](t) : n && s(n, this._i) && delete n[this._i];
            }, has: function has(t) {
              if (!u(t)) return !1;var n = i(t);return n === !0 ? p(this).has(t) : n && s(n, this._i);
            } }), a;
        }, def: function def(t, n, r) {
          var e = i(o(n), !0);return e === !0 ? p(t).set(n, r) : e[t._i] = r, t;
        }, ufstore: p };
    }, { 12: 12, 37: 37, 39: 39, 49: 49, 6: 6, 62: 62, 7: 7, 86: 86 }], 22: [function (t, n, r) {
      "use strict";var e = t(38),
          i = t(32),
          o = t(87),
          u = t(86),
          c = t(62),
          f = t(37),
          a = t(6),
          s = t(49),
          l = t(34),
          h = t(54),
          v = t(92),
          p = t(43);n.exports = function (t, n, r, d, y, g) {
        var b = e[t],
            x = b,
            m = y ? "set" : "add",
            w = x && x.prototype,
            S = {},
            _ = function _(t) {
          var n = w[t];o(w, t, "delete" == t ? function (t) {
            return g && !s(t) ? !1 : n.call(this, 0 === t ? 0 : t);
          } : "has" == t ? function has(t) {
            return g && !s(t) ? !1 : n.call(this, 0 === t ? 0 : t);
          } : "get" == t ? function get(t) {
            return g && !s(t) ? void 0 : n.call(this, 0 === t ? 0 : t);
          } : "add" == t ? function add(t) {
            return n.call(this, 0 === t ? 0 : t), this;
          } : function set(t, r) {
            return n.call(this, 0 === t ? 0 : t, r), this;
          });
        };if ("function" == typeof x && (g || w.forEach && !l(function () {
          new x().entries().next();
        }))) {
          var E = new x(),
              O = E[m](g ? {} : -0, 1) != E,
              F = l(function () {
            E.has(1);
          }),
              P = h(function (t) {
            new x(t);
          }),
              A = !g && l(function () {
            for (var t = new x(), n = 5; n--;) t[m](n, n);return !t.has(-0);
          });P || (x = n(function (n, r) {
            a(n, x, t);var e = p(new b(), n, x);return void 0 != r && f(r, y, e[m], e), e;
          }), x.prototype = w, w.constructor = x), (F || A) && (_("delete"), _("has"), y && _("get")), (A || O) && _(m), g && w.clear && delete w.clear;
        } else x = d.getConstructor(n, t, y, m), u(x.prototype, r), c.NEED = !0;return v(x, t), S[t] = x, i(i.G + i.W + i.F * (x != b), S), g || d.setStrong(x, t, y), x;
      };
    }, { 32: 32, 34: 34, 37: 37, 38: 38, 43: 43, 49: 49, 54: 54, 6: 6, 62: 62, 86: 86, 87: 87, 92: 92 }], 23: [function (t, n, r) {
      var e = n.exports = { version: "2.4.0" };"number" == typeof __e && (__e = e);
    }, {}], 24: [function (t, n, r) {
      "use strict";var e = t(67),
          i = t(85);n.exports = function (t, n, r) {
        n in t ? e.f(t, n, i(0, r)) : t[n] = r;
      };
    }, { 67: 67, 85: 85 }], 25: [function (t, n, r) {
      var e = t(3);n.exports = function (t, n, r) {
        if ((e(t), void 0 === n)) return t;switch (r) {case 1:
            return function (r) {
              return t.call(n, r);
            };case 2:
            return function (r, e) {
              return t.call(n, r, e);
            };case 3:
            return function (r, e, i) {
              return t.call(n, r, e, i);
            };}return function () {
          return t.apply(n, arguments);
        };
      };
    }, { 3: 3 }], 26: [function (t, n, r) {
      "use strict";var e = t(7),
          i = t(110),
          o = "number";n.exports = function (t) {
        if ("string" !== t && t !== o && "default" !== t) throw TypeError("Incorrect hint");return i(e(this), t != o);
      };
    }, { 110: 110, 7: 7 }], 27: [function (t, n, r) {
      n.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
      };
    }, {}], 28: [function (t, n, r) {
      n.exports = !t(34)(function () {
        return 7 != Object.defineProperty({}, "a", { get: function get() {
            return 7;
          } }).a;
      });
    }, { 34: 34 }], 29: [function (t, n, r) {
      var e = t(49),
          i = t(38).document,
          o = e(i) && e(i.createElement);n.exports = function (t) {
        return o ? i.createElement(t) : {};
      };
    }, { 38: 38, 49: 49 }], 30: [function (t, n, r) {
      n.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, {}], 31: [function (t, n, r) {
      var e = t(76),
          i = t(73),
          o = t(77);n.exports = function (t) {
        var n = e(t),
            r = i.f;if (r) for (var u, c = r(t), f = o.f, a = 0; c.length > a;) f.call(t, u = c[a++]) && n.push(u);return n;
      };
    }, { 73: 73, 76: 76, 77: 77 }], 32: [function (t, n, r) {
      var e = t(38),
          i = t(23),
          o = t(40),
          u = t(87),
          c = t(25),
          f = "prototype",
          a = function a(t, n, r) {
        var s,
            l,
            h,
            v,
            p = t & a.F,
            d = t & a.G,
            y = t & a.S,
            g = t & a.P,
            b = t & a.B,
            x = d ? e : y ? e[n] || (e[n] = {}) : (e[n] || {})[f],
            m = d ? i : i[n] || (i[n] = {}),
            w = m[f] || (m[f] = {});d && (r = n);for (s in r) l = !p && x && void 0 !== x[s], h = (l ? x : r)[s], v = b && l ? c(h, e) : g && "function" == typeof h ? c(Function.call, h) : h, x && u(x, s, h, t & a.U), m[s] != h && o(m, s, v), g && w[s] != h && (w[s] = h);
      };e.core = i, a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, n.exports = a;
    }, { 23: 23, 25: 25, 38: 38, 40: 40, 87: 87 }], 33: [function (t, n, r) {
      var e = t(117)("match");n.exports = function (t) {
        var n = /./;try {
          "/./"[t](n);
        } catch (r) {
          try {
            return n[e] = !1, !"/./"[t](n);
          } catch (i) {}
        }return !0;
      };
    }, { 117: 117 }], 34: [function (t, n, r) {
      n.exports = function (t) {
        try {
          return !!t();
        } catch (n) {
          return !0;
        }
      };
    }, {}], 35: [function (t, n, r) {
      "use strict";var e = t(40),
          i = t(87),
          o = t(34),
          u = t(27),
          c = t(117);n.exports = function (t, n, r) {
        var f = c(t),
            a = r(u, f, ""[t]),
            s = a[0],
            l = a[1];o(function () {
          var n = {};return n[f] = function () {
            return 7;
          }, 7 != ""[t](n);
        }) && (i(String.prototype, t, s), e(RegExp.prototype, f, 2 == n ? function (t, n) {
          return l.call(t, this, n);
        } : function (t) {
          return l.call(t, this);
        }));
      };
    }, { 117: 117, 27: 27, 34: 34, 40: 40, 87: 87 }], 36: [function (t, n, r) {
      "use strict";var e = t(7);n.exports = function () {
        var t = e(this),
            n = "";return t.global && (n += "g"), t.ignoreCase && (n += "i"), t.multiline && (n += "m"), t.unicode && (n += "u"), t.sticky && (n += "y"), n;
      };
    }, { 7: 7 }], 37: [function (t, n, r) {
      var e = t(25),
          i = t(51),
          o = t(46),
          u = t(7),
          c = t(108),
          f = t(118),
          a = {},
          s = {},
          r = n.exports = function (t, n, r, l, h) {
        var v,
            p,
            d,
            y,
            g = h ? function () {
          return t;
        } : f(t),
            b = e(r, l, n ? 2 : 1),
            x = 0;if ("function" != typeof g) throw TypeError(t + " is not iterable!");if (o(g)) {
          for (v = c(t.length); v > x; x++) if ((y = n ? b(u(p = t[x])[0], p[1]) : b(t[x]), y === a || y === s)) return y;
        } else for (d = g.call(t); !(p = d.next()).done;) if ((y = i(d, b, p.value, n), y === a || y === s)) return y;
      };r.BREAK = a, r.RETURN = s;
    }, { 108: 108, 118: 118, 25: 25, 46: 46, 51: 51, 7: 7 }], 38: [function (t, n, r) {
      var e = n.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
    }, {}], 39: [function (t, n, r) {
      var e = ({}).hasOwnProperty;n.exports = function (t, n) {
        return e.call(t, n);
      };
    }, {}], 40: [function (t, n, r) {
      var e = t(67),
          i = t(85);n.exports = t(28) ? function (t, n, r) {
        return e.f(t, n, i(1, r));
      } : function (t, n, r) {
        return t[n] = r, t;
      };
    }, { 28: 28, 67: 67, 85: 85 }], 41: [function (t, n, r) {
      n.exports = t(38).document && document.documentElement;
    }, { 38: 38 }], 42: [function (t, n, r) {
      n.exports = !t(28) && !t(34)(function () {
        return 7 != Object.defineProperty(t(29)("div"), "a", { get: function get() {
            return 7;
          } }).a;
      });
    }, { 28: 28, 29: 29, 34: 34 }], 43: [function (t, n, r) {
      var e = t(49),
          i = t(90).set;n.exports = function (t, n, r) {
        var o,
            u = n.constructor;return u !== r && "function" == typeof u && (o = u.prototype) !== r.prototype && e(o) && i && i(t, o), t;
      };
    }, { 49: 49, 90: 90 }], 44: [function (t, n, r) {
      n.exports = function (t, n, r) {
        var e = void 0 === r;switch (n.length) {case 0:
            return e ? t() : t.call(r);case 1:
            return e ? t(n[0]) : t.call(r, n[0]);case 2:
            return e ? t(n[0], n[1]) : t.call(r, n[0], n[1]);case 3:
            return e ? t(n[0], n[1], n[2]) : t.call(r, n[0], n[1], n[2]);case 4:
            return e ? t(n[0], n[1], n[2], n[3]) : t.call(r, n[0], n[1], n[2], n[3]);}return t.apply(r, n);
      };
    }, {}], 45: [function (t, n, r) {
      var e = t(18);n.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
        return "String" == e(t) ? t.split("") : Object(t);
      };
    }, { 18: 18 }], 46: [function (t, n, r) {
      var e = t(56),
          i = t(117)("iterator"),
          o = Array.prototype;n.exports = function (t) {
        return void 0 !== t && (e.Array === t || o[i] === t);
      };
    }, { 117: 117, 56: 56 }], 47: [function (t, n, r) {
      var e = t(18);n.exports = Array.isArray || function isArray(t) {
        return "Array" == e(t);
      };
    }, { 18: 18 }], 48: [function (t, n, r) {
      var e = t(49),
          i = Math.floor;n.exports = function isInteger(t) {
        return !e(t) && isFinite(t) && i(t) === t;
      };
    }, { 49: 49 }], 49: [function (t, n, r) {
      n.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    }, {}], 50: [function (t, n, r) {
      var e = t(49),
          i = t(18),
          o = t(117)("match");n.exports = function (t) {
        var n;return e(t) && (void 0 !== (n = t[o]) ? !!n : "RegExp" == i(t));
      };
    }, { 117: 117, 18: 18, 49: 49 }], 51: [function (t, n, r) {
      var e = t(7);n.exports = function (t, n, r, i) {
        try {
          return i ? n(e(r)[0], r[1]) : n(r);
        } catch (o) {
          var u = t["return"];throw (void 0 !== u && e(u.call(t)), o);
        }
      };
    }, { 7: 7 }], 52: [function (t, n, r) {
      "use strict";var e = t(66),
          i = t(85),
          o = t(92),
          u = {};t(40)(u, t(117)("iterator"), function () {
        return this;
      }), n.exports = function (t, n, r) {
        t.prototype = e(u, { next: i(1, r) }), o(t, n + " Iterator");
      };
    }, { 117: 117, 40: 40, 66: 66, 85: 85, 92: 92 }], 53: [function (t, n, r) {
      "use strict";var e = t(58),
          i = t(32),
          o = t(87),
          u = t(40),
          c = t(39),
          f = t(56),
          a = t(52),
          s = t(92),
          l = t(74),
          h = t(117)("iterator"),
          v = !([].keys && "next" in [].keys()),
          p = "@@iterator",
          d = "keys",
          y = "values",
          g = function g() {
        return this;
      };n.exports = function (t, n, r, b, x, m, w) {
        a(r, n, b);var S,
            _,
            E,
            O = function O(t) {
          if (!v && t in M) return M[t];switch (t) {case d:
              return function keys() {
                return new r(this, t);
              };case y:
              return function values() {
                return new r(this, t);
              };}return function entries() {
            return new r(this, t);
          };
        },
            F = n + " Iterator",
            P = x == y,
            A = !1,
            M = t.prototype,
            I = M[h] || M[p] || x && M[x],
            j = I || O(x),
            N = x ? P ? O("entries") : j : void 0,
            k = "Array" == n ? M.entries || I : I;if ((k && (E = l(k.call(new t())), E !== Object.prototype && (s(E, F, !0), e || c(E, h) || u(E, h, g))), P && I && I.name !== y && (A = !0, j = function values() {
          return I.call(this);
        }), e && !w || !v && !A && M[h] || u(M, h, j), f[n] = j, f[F] = g, x)) if ((S = { values: P ? j : O(y), keys: m ? j : O(d), entries: N }, w)) for (_ in S) _ in M || o(M, _, S[_]);else i(i.P + i.F * (v || A), n, S);return S;
      };
    }, { 117: 117, 32: 32, 39: 39, 40: 40, 52: 52, 56: 56, 58: 58, 74: 74, 87: 87, 92: 92 }], 54: [function (t, n, r) {
      var e = t(117)("iterator"),
          i = !1;try {
        var o = [7][e]();o["return"] = function () {
          i = !0;
        }, Array.from(o, function () {
          throw 2;
        });
      } catch (u) {}n.exports = function (t, n) {
        if (!n && !i) return !1;var r = !1;try {
          var o = [7],
              u = o[e]();u.next = function () {
            return { done: r = !0 };
          }, o[e] = function () {
            return u;
          }, t(o);
        } catch (c) {}return r;
      };
    }, { 117: 117 }], 55: [function (t, n, r) {
      n.exports = function (t, n) {
        return { value: n, done: !!t };
      };
    }, {}], 56: [function (t, n, r) {
      n.exports = {};
    }, {}], 57: [function (t, n, r) {
      var e = t(76),
          i = t(107);n.exports = function (t, n) {
        for (var r, o = i(t), u = e(o), c = u.length, f = 0; c > f;) if (o[r = u[f++]] === n) return r;
      };
    }, { 107: 107, 76: 76 }], 58: [function (t, n, r) {
      n.exports = !1;
    }, {}], 59: [function (t, n, r) {
      var e = Math.expm1;n.exports = !e || e(10) > 22025.465794806718 || e(10) < 22025.465794806718 || -2e-17 != e(-2e-17) ? function expm1(t) {
        return 0 == (t = +t) ? t : t > -1e-6 && 1e-6 > t ? t + t * t / 2 : Math.exp(t) - 1;
      } : e;
    }, {}], 60: [function (t, n, r) {
      n.exports = Math.log1p || function log1p(t) {
        return (t = +t) > -1e-8 && 1e-8 > t ? t - t * t / 2 : Math.log(1 + t);
      };
    }, {}], 61: [function (t, n, r) {
      n.exports = Math.sign || function sign(t) {
        return 0 == (t = +t) || t != t ? t : 0 > t ? -1 : 1;
      };
    }, {}], 62: [function (t, n, r) {
      var e = t(114)("meta"),
          i = t(49),
          o = t(39),
          u = t(67).f,
          c = 0,
          f = Object.isExtensible || function () {
        return !0;
      },
          a = !t(34)(function () {
        return f(Object.preventExtensions({}));
      }),
          s = function s(t) {
        u(t, e, { value: { i: "O" + ++c, w: {} } });
      },
          l = function l(t, n) {
        if (!i(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;if (!o(t, e)) {
          if (!f(t)) return "F";if (!n) return "E";s(t);
        }return t[e].i;
      },
          h = function h(t, n) {
        if (!o(t, e)) {
          if (!f(t)) return !0;if (!n) return !1;s(t);
        }return t[e].w;
      },
          v = function v(t) {
        return a && p.NEED && f(t) && !o(t, e) && s(t), t;
      },
          p = n.exports = { KEY: e, NEED: !1, fastKey: l, getWeak: h, onFreeze: v };
    }, { 114: 114, 34: 34, 39: 39, 49: 49, 67: 67 }], 63: [function (t, n, r) {
      var e = t(150),
          i = t(32),
          o = t(94)("metadata"),
          u = o.store || (o.store = new (t(256))()),
          c = function c(t, n, r) {
        var i = u.get(t);if (!i) {
          if (!r) return;u.set(t, i = new e());
        }var o = i.get(n);if (!o) {
          if (!r) return;i.set(n, o = new e());
        }return o;
      },
          f = function f(t, n, r) {
        var e = c(n, r, !1);return void 0 === e ? !1 : e.has(t);
      },
          a = function a(t, n, r) {
        var e = c(n, r, !1);return void 0 === e ? void 0 : e.get(t);
      },
          s = function s(t, n, r, e) {
        c(r, e, !0).set(t, n);
      },
          l = function l(t, n) {
        var r = c(t, n, !1),
            e = [];return r && r.forEach(function (t, n) {
          e.push(n);
        }), e;
      },
          h = function h(t) {
        return void 0 === t || "symbol" == typeof t ? t : String(t);
      },
          v = function v(t) {
        i(i.S, "Reflect", t);
      };n.exports = { store: u, map: c, has: f, get: a, set: s, keys: l, key: h, exp: v };
    }, { 150: 150, 256: 256, 32: 32, 94: 94 }], 64: [function (t, n, r) {
      var e = t(38),
          i = t(104).set,
          o = e.MutationObserver || e.WebKitMutationObserver,
          u = e.process,
          c = e.Promise,
          f = "process" == t(18)(u);n.exports = function () {
        var t,
            n,
            r,
            a = function a() {
          var e, i;for (f && (e = u.domain) && e.exit(); t;) {
            i = t.fn, t = t.next;try {
              i();
            } catch (o) {
              throw (t ? r() : n = void 0, o);
            }
          }n = void 0, e && e.enter();
        };if (f) r = function () {
          u.nextTick(a);
        };else if (o) {
          var s = !0,
              l = document.createTextNode("");new o(a).observe(l, { characterData: !0 }), r = function () {
            l.data = s = !s;
          };
        } else if (c && c.resolve) {
          var h = c.resolve();r = function () {
            h.then(a);
          };
        } else r = function () {
          i.call(e, a);
        };return function (e) {
          var i = { fn: e, next: void 0 };n && (n.next = i), t || (t = i, r()), n = i;
        };
      };
    }, { 104: 104, 18: 18, 38: 38 }], 65: [function (t, n, r) {
      "use strict";var e = t(76),
          i = t(73),
          o = t(77),
          u = t(109),
          c = t(45),
          f = Object.assign;n.exports = !f || t(34)(function () {
        var t = {},
            n = {},
            r = Symbol(),
            e = "abcdefghijklmnopqrst";return t[r] = 7, e.split("").forEach(function (t) {
          n[t] = t;
        }), 7 != f({}, t)[r] || Object.keys(f({}, n)).join("") != e;
      }) ? function assign(t, n) {
        for (var r = u(t), f = arguments.length, a = 1, s = i.f, l = o.f; f > a;) for (var h, v = c(arguments[a++]), p = s ? e(v).concat(s(v)) : e(v), d = p.length, y = 0; d > y;) l.call(v, h = p[y++]) && (r[h] = v[h]);return r;
      } : f;
    }, { 109: 109, 34: 34, 45: 45, 73: 73, 76: 76, 77: 77 }], 66: [function (t, n, r) {
      var e = t(7),
          i = t(68),
          o = t(30),
          u = t(93)("IE_PROTO"),
          c = function c() {},
          f = "prototype",
          _a = function a() {
        var n,
            r = t(29)("iframe"),
            e = o.length,
            i = ">";for (r.style.display = "none", t(41).appendChild(r), r.src = "javascript:", n = r.contentWindow.document, n.open(), n.write("<script>document.F=Object</script" + i), n.close(), _a = n.F; e--;) delete _a[f][o[e]];return _a();
      };n.exports = Object.create || function create(t, n) {
        var r;return null !== t ? (c[f] = e(t), r = new c(), c[f] = null, r[u] = t) : r = _a(), void 0 === n ? r : i(r, n);
      };
    }, { 29: 29, 30: 30, 41: 41, 68: 68, 7: 7, 93: 93 }], 67: [function (t, n, r) {
      var e = t(7),
          i = t(42),
          o = t(110),
          u = Object.defineProperty;r.f = t(28) ? Object.defineProperty : function defineProperty(t, n, r) {
        if ((e(t), n = o(n, !0), e(r), i)) try {
          return u(t, n, r);
        } catch (c) {}if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");return "value" in r && (t[n] = r.value), t;
      };
    }, { 110: 110, 28: 28, 42: 42, 7: 7 }], 68: [function (t, n, r) {
      var e = t(67),
          i = t(7),
          o = t(76);n.exports = t(28) ? Object.defineProperties : function defineProperties(t, n) {
        i(t);for (var r, u = o(n), c = u.length, f = 0; c > f;) e.f(t, r = u[f++], n[r]);return t;
      };
    }, { 28: 28, 67: 67, 7: 7, 76: 76 }], 69: [function (t, n, r) {
      n.exports = t(58) || !t(34)(function () {
        var n = Math.random();__defineSetter__.call(null, n, function () {}), delete t(38)[n];
      });
    }, { 34: 34, 38: 38, 58: 58 }], 70: [function (t, n, r) {
      var e = t(77),
          i = t(85),
          o = t(107),
          u = t(110),
          c = t(39),
          f = t(42),
          a = Object.getOwnPropertyDescriptor;r.f = t(28) ? a : function getOwnPropertyDescriptor(t, n) {
        if ((t = o(t), n = u(n, !0), f)) try {
          return a(t, n);
        } catch (r) {}return c(t, n) ? i(!e.f.call(t, n), t[n]) : void 0;
      };
    }, { 107: 107, 110: 110, 28: 28, 39: 39, 42: 42, 77: 77, 85: 85 }], 71: [function (t, n, r) {
      var e = t(107),
          i = t(72).f,
          o = ({}).toString,
          u = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
          c = function c(t) {
        try {
          return i(t);
        } catch (n) {
          return u.slice();
        }
      };n.exports.f = function getOwnPropertyNames(t) {
        return u && "[object Window]" == o.call(t) ? c(t) : i(e(t));
      };
    }, { 107: 107, 72: 72 }], 72: [function (t, n, r) {
      var e = t(75),
          i = t(30).concat("length", "prototype");r.f = Object.getOwnPropertyNames || function getOwnPropertyNames(t) {
        return e(t, i);
      };
    }, { 30: 30, 75: 75 }], 73: [function (t, n, r) {
      r.f = Object.getOwnPropertySymbols;
    }, {}], 74: [function (t, n, r) {
      var e = t(39),
          i = t(109),
          o = t(93)("IE_PROTO"),
          u = Object.prototype;n.exports = Object.getPrototypeOf || function (t) {
        return t = i(t), e(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
      };
    }, { 109: 109, 39: 39, 93: 93 }], 75: [function (t, n, r) {
      var e = t(39),
          i = t(107),
          o = t(11)(!1),
          u = t(93)("IE_PROTO");n.exports = function (t, n) {
        var r,
            c = i(t),
            f = 0,
            a = [];for (r in c) r != u && e(c, r) && a.push(r);for (; n.length > f;) e(c, r = n[f++]) && (~o(a, r) || a.push(r));return a;
      };
    }, { 107: 107, 11: 11, 39: 39, 93: 93 }], 76: [function (t, n, r) {
      var e = t(75),
          i = t(30);n.exports = Object.keys || function keys(t) {
        return e(t, i);
      };
    }, { 30: 30, 75: 75 }], 77: [function (t, n, r) {
      r.f = ({}).propertyIsEnumerable;
    }, {}], 78: [function (t, n, r) {
      var e = t(32),
          i = t(23),
          o = t(34);n.exports = function (t, n) {
        var r = (i.Object || {})[t] || Object[t],
            u = {};u[t] = n(r), e(e.S + e.F * o(function () {
          r(1);
        }), "Object", u);
      };
    }, { 23: 23, 32: 32, 34: 34 }], 79: [function (t, n, r) {
      var e = t(76),
          i = t(107),
          o = t(77).f;n.exports = function (t) {
        return function (n) {
          for (var r, u = i(n), c = e(u), f = c.length, a = 0, s = []; f > a;) o.call(u, r = c[a++]) && s.push(t ? [r, u[r]] : u[r]);return s;
        };
      };
    }, { 107: 107, 76: 76, 77: 77 }], 80: [function (t, n, r) {
      var e = t(72),
          i = t(73),
          o = t(7),
          u = t(38).Reflect;n.exports = u && u.ownKeys || function ownKeys(t) {
        var n = e.f(o(t)),
            r = i.f;return r ? n.concat(r(t)) : n;
      };
    }, { 38: 38, 7: 7, 72: 72, 73: 73 }], 81: [function (t, n, r) {
      var e = t(38).parseFloat,
          i = t(102).trim;n.exports = 1 / e(t(103) + "-0") !== -(1 / 0) ? function parseFloat(t) {
        var n = i(String(t), 3),
            r = e(n);return 0 === r && "-" == n.charAt(0) ? -0 : r;
      } : e;
    }, { 102: 102, 103: 103, 38: 38 }], 82: [function (t, n, r) {
      var e = t(38).parseInt,
          i = t(102).trim,
          o = t(103),
          u = /^[\-+]?0[xX]/;n.exports = 8 !== e(o + "08") || 22 !== e(o + "0x16") ? function parseInt(t, n) {
        var r = i(String(t), 3);return e(r, n >>> 0 || (u.test(r) ? 16 : 10));
      } : e;
    }, { 102: 102, 103: 103, 38: 38 }], 83: [function (t, n, r) {
      "use strict";var e = t(84),
          i = t(44),
          o = t(3);n.exports = function () {
        for (var t = o(this), n = arguments.length, r = Array(n), u = 0, c = e._, f = !1; n > u;) (r[u] = arguments[u++]) === c && (f = !0);return function () {
          var e,
              o = this,
              u = arguments.length,
              a = 0,
              s = 0;if (!f && !u) return i(t, r, o);if ((e = r.slice(), f)) for (; n > a; a++) e[a] === c && (e[a] = arguments[s++]);for (; u > s;) e.push(arguments[s++]);return i(t, e, o);
        };
      };
    }, { 3: 3, 44: 44, 84: 84 }], 84: [function (t, n, r) {
      n.exports = t(38);
    }, { 38: 38 }], 85: [function (t, n, r) {
      n.exports = function (t, n) {
        return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n };
      };
    }, {}], 86: [function (t, n, r) {
      var e = t(87);n.exports = function (t, n, r) {
        for (var i in n) e(t, i, n[i], r);return t;
      };
    }, { 87: 87 }], 87: [function (t, n, r) {
      var e = t(38),
          i = t(40),
          o = t(39),
          u = t(114)("src"),
          c = "toString",
          f = Function[c],
          a = ("" + f).split(c);t(23).inspectSource = function (t) {
        return f.call(t);
      }, (n.exports = function (t, n, r, c) {
        var f = "function" == typeof r;f && (o(r, "name") || i(r, "name", n)), t[n] !== r && (f && (o(r, u) || i(r, u, t[n] ? "" + t[n] : a.join(String(n)))), t === e ? t[n] = r : c ? t[n] ? t[n] = r : i(t, n, r) : (delete t[n], i(t, n, r)));
      })(Function.prototype, c, function toString() {
        return "function" == typeof this && this[u] || f.call(this);
      });
    }, { 114: 114, 23: 23, 38: 38, 39: 39, 40: 40 }], 88: [function (t, n, r) {
      n.exports = function (t, n) {
        var r = n === Object(n) ? function (t) {
          return n[t];
        } : n;return function (n) {
          return String(n).replace(t, r);
        };
      };
    }, {}], 89: [function (t, n, r) {
      n.exports = Object.is || function is(t, n) {
        return t === n ? 0 !== t || 1 / t === 1 / n : t != t && n != n;
      };
    }, {}], 90: [function (t, n, r) {
      var e = t(49),
          i = t(7),
          o = function o(t, n) {
        if ((i(t), !e(n) && null !== n)) throw TypeError(n + ": can't set as prototype!");
      };n.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? (function (n, r, e) {
          try {
            e = t(25)(Function.call, t(70).f(Object.prototype, "__proto__").set, 2), e(n, []), r = !(n instanceof Array);
          } catch (i) {
            r = !0;
          }return function setPrototypeOf(t, n) {
            return o(t, n), r ? t.__proto__ = n : e(t, n), t;
          };
        })({}, !1) : void 0), check: o };
    }, { 25: 25, 49: 49, 7: 7, 70: 70 }], 91: [function (t, n, r) {
      "use strict";var e = t(38),
          i = t(67),
          o = t(28),
          u = t(117)("species");n.exports = function (t) {
        var n = e[t];o && n && !n[u] && i.f(n, u, { configurable: !0, get: function get() {
            return this;
          } });
      };
    }, { 117: 117, 28: 28, 38: 38, 67: 67 }], 92: [function (t, n, r) {
      var e = t(67).f,
          i = t(39),
          o = t(117)("toStringTag");n.exports = function (t, n, r) {
        t && !i(t = r ? t : t.prototype, o) && e(t, o, { configurable: !0, value: n });
      };
    }, { 117: 117, 39: 39, 67: 67 }], 93: [function (t, n, r) {
      var e = t(94)("keys"),
          i = t(114);n.exports = function (t) {
        return e[t] || (e[t] = i(t));
      };
    }, { 114: 114, 94: 94 }], 94: [function (t, n, r) {
      var e = t(38),
          i = "__core-js_shared__",
          o = e[i] || (e[i] = {});n.exports = function (t) {
        return o[t] || (o[t] = {});
      };
    }, { 38: 38 }], 95: [function (t, n, r) {
      var e = t(7),
          i = t(3),
          o = t(117)("species");n.exports = function (t, n) {
        var r,
            u = e(t).constructor;return void 0 === u || void 0 == (r = e(u)[o]) ? n : i(r);
      };
    }, { 117: 117, 3: 3, 7: 7 }], 96: [function (t, n, r) {
      var e = t(34);n.exports = function (t, n) {
        return !!t && e(function () {
          n ? t.call(null, function () {}, 1) : t.call(null);
        });
      };
    }, { 34: 34 }], 97: [function (t, n, r) {
      var e = t(106),
          i = t(27);n.exports = function (t) {
        return function (n, r) {
          var o,
              u,
              c = String(i(n)),
              f = e(r),
              a = c.length;return 0 > f || f >= a ? t ? "" : void 0 : (o = c.charCodeAt(f), 55296 > o || o > 56319 || f + 1 === a || (u = c.charCodeAt(f + 1)) < 56320 || u > 57343 ? t ? c.charAt(f) : o : t ? c.slice(f, f + 2) : (o - 55296 << 10) + (u - 56320) + 65536);
        };
      };
    }, { 106: 106, 27: 27 }], 98: [function (t, n, r) {
      var e = t(50),
          i = t(27);n.exports = function (t, n, r) {
        if (e(n)) throw TypeError("String#" + r + " doesn't accept regex!");return String(i(t));
      };
    }, { 27: 27, 50: 50 }], 99: [function (t, n, r) {
      var e = t(32),
          i = t(34),
          o = t(27),
          u = /"/g,
          c = function c(t, n, r, e) {
        var i = String(o(t)),
            c = "<" + n;return "" !== r && (c += " " + r + '="' + String(e).replace(u, "&quot;") + '"'), c + ">" + i + "</" + n + ">";
      };n.exports = function (t, n) {
        var r = {};r[t] = n(c), e(e.P + e.F * i(function () {
          var n = ""[t]('"');return n !== n.toLowerCase() || n.split('"').length > 3;
        }), "String", r);
      };
    }, { 27: 27, 32: 32, 34: 34 }], 100: [function (t, n, r) {
      var e = t(108),
          i = t(101),
          o = t(27);n.exports = function (t, n, r, u) {
        var c = String(o(t)),
            f = c.length,
            a = void 0 === r ? " " : String(r),
            s = e(n);if (f >= s || "" == a) return c;var l = s - f,
            h = i.call(a, Math.ceil(l / a.length));return h.length > l && (h = h.slice(0, l)), u ? h + c : c + h;
      };
    }, { 101: 101, 108: 108, 27: 27 }], 101: [function (t, n, r) {
      "use strict";var e = t(106),
          i = t(27);n.exports = function repeat(t) {
        var n = String(i(this)),
            r = "",
            o = e(t);if (0 > o || o == 1 / 0) throw RangeError("Count can't be negative");for (; o > 0; (o >>>= 1) && (n += n)) 1 & o && (r += n);return r;
      };
    }, { 106: 106, 27: 27 }], 102: [function (t, n, r) {
      var e = t(32),
          i = t(27),
          o = t(34),
          u = t(103),
          c = "[" + u + "]",
          f = "​",
          a = RegExp("^" + c + c + "*"),
          s = RegExp(c + c + "*$"),
          l = function l(t, n, r) {
        var i = {},
            c = o(function () {
          return !!u[t]() || f[t]() != f;
        }),
            a = i[t] = c ? n(h) : u[t];r && (i[r] = a), e(e.P + e.F * c, "String", i);
      },
          h = l.trim = function (t, n) {
        return t = String(i(t)), 1 & n && (t = t.replace(a, "")), 2 & n && (t = t.replace(s, "")), t;
      };n.exports = l;
    }, { 103: 103, 27: 27, 32: 32, 34: 34 }], 103: [function (t, n, r) {
      n.exports = "\t\n\u000b\f\r   ᠎             　\u2028\u2029﻿";
    }, {}], 104: [function (t, n, r) {
      var e,
          i,
          o,
          u = t(25),
          c = t(44),
          f = t(41),
          a = t(29),
          s = t(38),
          l = s.process,
          h = s.setImmediate,
          v = s.clearImmediate,
          p = s.MessageChannel,
          d = 0,
          y = {},
          g = "onreadystatechange",
          b = function b() {
        var t = +this;if (y.hasOwnProperty(t)) {
          var n = y[t];delete y[t], n();
        }
      },
          x = function x(t) {
        b.call(t.data);
      };h && v || (h = function setImmediate(t) {
        for (var n = [], r = 1; arguments.length > r;) n.push(arguments[r++]);return y[++d] = function () {
          c("function" == typeof t ? t : Function(t), n);
        }, e(d), d;
      }, v = function clearImmediate(t) {
        delete y[t];
      }, "process" == t(18)(l) ? e = function (t) {
        l.nextTick(u(b, t, 1));
      } : p ? (i = new p(), o = i.port2, i.port1.onmessage = x, e = u(o.postMessage, o, 1)) : s.addEventListener && "function" == typeof postMessage && !s.importScripts ? (e = function (t) {
        s.postMessage(t + "", "*");
      }, s.addEventListener("message", x, !1)) : e = g in a("script") ? function (t) {
        f.appendChild(a("script"))[g] = function () {
          f.removeChild(this), b.call(t);
        };
      } : function (t) {
        setTimeout(u(b, t, 1), 0);
      }), n.exports = { set: h, clear: v };
    }, { 18: 18, 25: 25, 29: 29, 38: 38, 41: 41, 44: 44 }], 105: [function (t, n, r) {
      var e = t(106),
          i = Math.max,
          o = Math.min;n.exports = function (t, n) {
        return t = e(t), 0 > t ? i(t + n, 0) : o(t, n);
      };
    }, { 106: 106 }], 106: [function (t, n, r) {
      var e = Math.ceil,
          i = Math.floor;n.exports = function (t) {
        return isNaN(t = +t) ? 0 : (t > 0 ? i : e)(t);
      };
    }, {}], 107: [function (t, n, r) {
      var e = t(45),
          i = t(27);n.exports = function (t) {
        return e(i(t));
      };
    }, { 27: 27, 45: 45 }], 108: [function (t, n, r) {
      var e = t(106),
          i = Math.min;n.exports = function (t) {
        return t > 0 ? i(e(t), 9007199254740991) : 0;
      };
    }, { 106: 106 }], 109: [function (t, n, r) {
      var e = t(27);n.exports = function (t) {
        return Object(e(t));
      };
    }, { 27: 27 }], 110: [function (t, n, r) {
      var e = t(49);n.exports = function (t, n) {
        if (!e(t)) return t;var r, i;if (n && "function" == typeof (r = t.toString) && !e(i = r.call(t))) return i;if ("function" == typeof (r = t.valueOf) && !e(i = r.call(t))) return i;if (!n && "function" == typeof (r = t.toString) && !e(i = r.call(t))) return i;throw TypeError("Can't convert object to primitive value");
      };
    }, { 49: 49 }], 111: [function (t, n, r) {
      "use strict";if (t(28)) {
        var e = t(58),
            i = t(38),
            o = t(34),
            u = t(32),
            c = t(113),
            f = t(112),
            a = t(25),
            s = t(6),
            l = t(85),
            h = t(40),
            v = t(86),
            p = (t(48), t(106)),
            d = t(108),
            y = t(105),
            g = t(110),
            b = t(39),
            x = t(89),
            m = t(17),
            w = t(49),
            S = t(109),
            _ = t(46),
            E = t(66),
            O = t(74),
            F = t(72).f,
            P = (t(119), t(118)),
            A = t(114),
            M = t(117),
            I = t(12),
            j = t(11),
            N = t(95),
            k = t(131),
            R = t(56),
            T = t(54),
            L = t(91),
            C = t(9),
            U = t(8),
            G = t(67),
            D = t(70),
            W = G.f,
            B = D.f,
            V = i.RangeError,
            z = i.TypeError,
            K = i.Uint8Array,
            J = "ArrayBuffer",
            Y = "Shared" + J,
            q = "BYTES_PER_ELEMENT",
            X = "prototype",
            $ = Array[X],
            H = f.ArrayBuffer,
            Z = f.DataView,
            Q = I(0),
            tt = I(2),
            nt = I(3),
            rt = I(4),
            et = I(5),
            it = I(6),
            ot = j(!0),
            ut = j(!1),
            ct = k.values,
            ft = k.keys,
            at = k.entries,
            st = $.lastIndexOf,
            lt = $.reduce,
            ht = $.reduceRight,
            vt = $.join,
            pt = $.sort,
            dt = $.slice,
            yt = $.toString,
            gt = $.toLocaleString,
            bt = M("iterator"),
            xt = M("toStringTag"),
            mt = A("typed_constructor"),
            wt = A("def_constructor"),
            St = c.CONSTR,
            _t = c.TYPED,
            Et = c.VIEW,
            Ot = "Wrong length!",
            Ft = I(1, function (t, n) {
          return Nt(N(t, t[wt]), n);
        }),
            Pt = o(function () {
          return 1 === new K(new Uint16Array([1]).buffer)[0];
        }),
            At = !!K && !!K[X].set && o(function () {
          new K(1).set({});
        }),
            Mt = function Mt(t, n) {
          if (void 0 === t) throw z(Ot);var r = +t,
              e = d(t);if (n && !x(r, e)) throw V(Ot);return e;
        },
            It = function It(t, n) {
          var r = p(t);if (0 > r || r % n) throw V("Wrong offset!");return r;
        },
            jt = function jt(t) {
          if (w(t) && _t in t) return t;throw z(t + " is not a typed array!");
        },
            Nt = function Nt(t, n) {
          if (!(w(t) && mt in t)) throw z("It is not a typed array constructor!");return new t(n);
        },
            kt = function kt(t, n) {
          return Rt(N(t, t[wt]), n);
        },
            Rt = function Rt(t, n) {
          for (var r = 0, e = n.length, i = Nt(t, e); e > r;) i[r] = n[r++];return i;
        },
            Tt = function Tt(t, n, r) {
          W(t, n, { get: function get() {
              return this._d[r];
            } });
        },
            Lt = function from(t) {
          var n,
              r,
              e,
              i,
              o,
              u,
              c = S(t),
              f = arguments.length,
              s = f > 1 ? arguments[1] : void 0,
              l = void 0 !== s,
              h = P(c);if (void 0 != h && !_(h)) {
            for (u = h.call(c), e = [], n = 0; !(o = u.next()).done; n++) e.push(o.value);c = e;
          }for (l && f > 2 && (s = a(s, arguments[2], 2)), n = 0, r = d(c.length), i = Nt(this, r); r > n; n++) i[n] = l ? s(c[n], n) : c[n];return i;
        },
            Ct = function of() {
          for (var t = 0, n = arguments.length, r = Nt(this, n); n > t;) r[t] = arguments[t++];return r;
        },
            Ut = !!K && o(function () {
          gt.call(new K(1));
        }),
            Gt = function toLocaleString() {
          return gt.apply(Ut ? dt.call(jt(this)) : jt(this), arguments);
        },
            Dt = { copyWithin: function copyWithin(t, n) {
            return U.call(jt(this), t, n, arguments.length > 2 ? arguments[2] : void 0);
          }, every: function every(t) {
            return rt(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, fill: function fill(t) {
            return C.apply(jt(this), arguments);
          }, filter: function filter(t) {
            return kt(this, tt(jt(this), t, arguments.length > 1 ? arguments[1] : void 0));
          }, find: function find(t) {
            return et(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, findIndex: function findIndex(t) {
            return it(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, forEach: function forEach(t) {
            Q(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, indexOf: function indexOf(t) {
            return ut(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, includes: function includes(t) {
            return ot(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, join: function join(t) {
            return vt.apply(jt(this), arguments);
          }, lastIndexOf: function lastIndexOf(t) {
            return st.apply(jt(this), arguments);
          }, map: function map(t) {
            return Ft(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, reduce: function reduce(t) {
            return lt.apply(jt(this), arguments);
          }, reduceRight: function reduceRight(t) {
            return ht.apply(jt(this), arguments);
          }, reverse: function reverse() {
            for (var t, n = this, r = jt(n).length, e = Math.floor(r / 2), i = 0; e > i;) t = n[i], n[i++] = n[--r], n[r] = t;return n;
          }, some: function some(t) {
            return nt(jt(this), t, arguments.length > 1 ? arguments[1] : void 0);
          }, sort: function sort(t) {
            return pt.call(jt(this), t);
          }, subarray: function subarray(t, n) {
            var r = jt(this),
                e = r.length,
                i = y(t, e);return new (N(r, r[wt]))(r.buffer, r.byteOffset + i * r.BYTES_PER_ELEMENT, d((void 0 === n ? e : y(n, e)) - i));
          } },
            Wt = function slice(t, n) {
          return kt(this, dt.call(jt(this), t, n));
        },
            Bt = function set(t) {
          jt(this);var n = It(arguments[1], 1),
              r = this.length,
              e = S(t),
              i = d(e.length),
              o = 0;if (i + n > r) throw V(Ot);for (; i > o;) this[n + o] = e[o++];
        },
            Vt = { entries: function entries() {
            return at.call(jt(this));
          }, keys: function keys() {
            return ft.call(jt(this));
          }, values: function values() {
            return ct.call(jt(this));
          } },
            zt = function zt(t, n) {
          return w(t) && t[_t] && "symbol" != typeof n && n in t && String(+n) == String(n);
        },
            Kt = function getOwnPropertyDescriptor(t, n) {
          return zt(t, n = g(n, !0)) ? l(2, t[n]) : B(t, n);
        },
            Jt = function defineProperty(t, n, r) {
          return !(zt(t, n = g(n, !0)) && w(r) && b(r, "value")) || b(r, "get") || b(r, "set") || r.configurable || b(r, "writable") && !r.writable || b(r, "enumerable") && !r.enumerable ? W(t, n, r) : (t[n] = r.value, t);
        };St || (D.f = Kt, G.f = Jt), u(u.S + u.F * !St, "Object", { getOwnPropertyDescriptor: Kt, defineProperty: Jt }), o(function () {
          yt.call({});
        }) && (yt = gt = function toString() {
          return vt.call(this);
        });var Yt = v({}, Dt);v(Yt, Vt), h(Yt, bt, Vt.values), v(Yt, { slice: Wt, set: Bt, constructor: function constructor() {}, toString: yt, toLocaleString: Gt }), Tt(Yt, "buffer", "b"), Tt(Yt, "byteOffset", "o"), Tt(Yt, "byteLength", "l"), Tt(Yt, "length", "e"), W(Yt, xt, { get: function get() {
            return this[_t];
          } }), n.exports = function (t, n, r, f) {
          f = !!f;var a = t + (f ? "Clamped" : "") + "Array",
              l = "Uint8Array" != a,
              v = "get" + t,
              p = "set" + t,
              y = i[a],
              g = y || {},
              b = y && O(y),
              x = !y || !c.ABV,
              S = {},
              _ = y && y[X],
              P = function P(t, r) {
            var e = t._d;return e.v[v](r * n + e.o, Pt);
          },
              A = function A(t, r, e) {
            var i = t._d;f && (e = (e = Math.round(e)) < 0 ? 0 : e > 255 ? 255 : 255 & e), i.v[p](r * n + i.o, e, Pt);
          },
              M = function M(t, n) {
            W(t, n, { get: function get() {
                return P(this, n);
              }, set: function set(t) {
                return A(this, n, t);
              }, enumerable: !0 });
          };x ? (y = r(function (t, r, e, i) {
            s(t, y, a, "_d");var o,
                u,
                c,
                f,
                l = 0,
                v = 0;if (w(r)) {
              if (!(r instanceof H || (f = m(r)) == J || f == Y)) return _t in r ? Rt(y, r) : Lt.call(y, r);o = r, v = It(e, n);var p = r.byteLength;if (void 0 === i) {
                if (p % n) throw V(Ot);if ((u = p - v, 0 > u)) throw V(Ot);
              } else if ((u = d(i) * n, u + v > p)) throw V(Ot);c = u / n;
            } else c = Mt(r, !0), u = c * n, o = new H(u);for (h(t, "_d", { b: o, o: v, l: u, e: c, v: new Z(o) }); c > l;) M(t, l++);
          }), _ = y[X] = E(Yt), h(_, "constructor", y)) : T(function (t) {
            new y(null), new y(t);
          }, !0) || (y = r(function (t, r, e, i) {
            s(t, y, a);var o;return w(r) ? r instanceof H || (o = m(r)) == J || o == Y ? void 0 !== i ? new g(r, It(e, n), i) : void 0 !== e ? new g(r, It(e, n)) : new g(r) : _t in r ? Rt(y, r) : Lt.call(y, r) : new g(Mt(r, l));
          }), Q(b !== Function.prototype ? F(g).concat(F(b)) : F(g), function (t) {
            t in y || h(y, t, g[t]);
          }), y[X] = _, e || (_.constructor = y));var I = _[bt],
              j = !!I && ("values" == I.name || void 0 == I.name),
              N = Vt.values;h(y, mt, !0), h(_, _t, a), h(_, Et, !0), h(_, wt, y), (f ? new y(1)[xt] == a : xt in _) || W(_, xt, { get: function get() {
              return a;
            } }), S[a] = y, u(u.G + u.W + u.F * (y != g), S), u(u.S, a, { BYTES_PER_ELEMENT: n, from: Lt, of: Ct }), q in _ || h(_, q, n), u(u.P, a, Dt), L(a), u(u.P + u.F * At, a, { set: Bt }), u(u.P + u.F * !j, a, Vt), u(u.P + u.F * (_.toString != yt), a, { toString: yt }), u(u.P + u.F * o(function () {
            new y(1).slice();
          }), a, { slice: Wt }), u(u.P + u.F * (o(function () {
            return [1, 2].toLocaleString() != new y([1, 2]).toLocaleString();
          }) || !o(function () {
            _.toLocaleString.call([1, 2]);
          })), a, { toLocaleString: Gt }), R[a] = j ? I : N, e || j || h(_, bt, N);
        };
      } else n.exports = function () {};
    }, { 105: 105, 106: 106, 108: 108, 109: 109, 11: 11, 110: 110, 112: 112, 113: 113, 114: 114, 117: 117, 118: 118, 119: 119, 12: 12, 131: 131, 17: 17, 25: 25, 28: 28, 32: 32, 34: 34, 38: 38, 39: 39, 40: 40, 46: 46, 48: 48, 49: 49, 54: 54, 56: 56, 58: 58, 6: 6, 66: 66, 67: 67, 70: 70, 72: 72, 74: 74, 8: 8, 85: 85, 86: 86, 89: 89, 9: 9, 91: 91, 95: 95 }], 112: [function (t, n, r) {
      "use strict";var e = t(38),
          i = t(28),
          o = t(58),
          u = t(113),
          c = t(40),
          f = t(86),
          a = t(34),
          s = t(6),
          l = t(106),
          h = t(108),
          v = t(72).f,
          p = t(67).f,
          d = t(9),
          y = t(92),
          g = "ArrayBuffer",
          b = "DataView",
          x = "prototype",
          m = "Wrong length!",
          w = "Wrong index!",
          S = e[g],
          _ = e[b],
          E = e.Math,
          O = (e.parseInt, e.RangeError),
          F = e.Infinity,
          P = S,
          A = E.abs,
          M = E.pow,
          I = (E.min, E.floor),
          j = E.log,
          N = E.LN2,
          k = "buffer",
          R = "byteLength",
          T = "byteOffset",
          L = i ? "_b" : k,
          C = i ? "_l" : R,
          U = i ? "_o" : T,
          G = function G(t, n, r) {
        var e,
            i,
            o,
            u = Array(r),
            c = 8 * r - n - 1,
            f = (1 << c) - 1,
            a = f >> 1,
            s = 23 === n ? M(2, -24) - M(2, -77) : 0,
            l = 0,
            h = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;for (t = A(t), t != t || t === F ? (i = t != t ? 1 : 0, e = f) : (e = I(j(t) / N), t * (o = M(2, -e)) < 1 && (e--, o *= 2), t += e + a >= 1 ? s / o : s * M(2, 1 - a), t * o >= 2 && (e++, o /= 2), e + a >= f ? (i = 0, e = f) : e + a >= 1 ? (i = (t * o - 1) * M(2, n), e += a) : (i = t * M(2, a - 1) * M(2, n), e = 0)); n >= 8; u[l++] = 255 & i, i /= 256, n -= 8);for (e = e << n | i, c += n; c > 0; u[l++] = 255 & e, e /= 256, c -= 8);return u[--l] |= 128 * h, u;
      },
          D = function D(t, n, r) {
        var e,
            i = 8 * r - n - 1,
            o = (1 << i) - 1,
            u = o >> 1,
            c = i - 7,
            f = r - 1,
            a = t[f--],
            s = 127 & a;for (a >>= 7; c > 0; s = 256 * s + t[f], f--, c -= 8);for (e = s & (1 << -c) - 1, s >>= -c, c += n; c > 0; e = 256 * e + t[f], f--, c -= 8);if (0 === s) s = 1 - u;else {
          if (s === o) return e ? NaN : a ? -F : F;e += M(2, n), s -= u;
        }return (a ? -1 : 1) * e * M(2, s - n);
      },
          W = function W(t) {
        return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
      },
          B = function B(t) {
        return [255 & t];
      },
          V = function V(t) {
        return [255 & t, t >> 8 & 255];
      },
          z = function z(t) {
        return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
      },
          K = function K(t) {
        return G(t, 52, 8);
      },
          J = function J(t) {
        return G(t, 23, 4);
      },
          Y = function Y(t, n, r) {
        p(t[x], n, { get: function get() {
            return this[r];
          } });
      },
          q = function q(t, n, r, e) {
        var i = +r,
            o = l(i);if (i != o || 0 > o || o + n > t[C]) throw O(w);var u = t[L]._b,
            c = o + t[U],
            f = u.slice(c, c + n);return e ? f : f.reverse();
      },
          X = function X(t, n, r, e, i, o) {
        var u = +r,
            c = l(u);if (u != c || 0 > c || c + n > t[C]) throw O(w);for (var f = t[L]._b, a = c + t[U], s = e(+i), h = 0; n > h; h++) f[a + h] = s[o ? h : n - h - 1];
      },
          $ = function $(t, n) {
        s(t, S, g);var r = +n,
            e = h(r);if (r != e) throw O(m);return e;
      };if (u.ABV) {
        if (!a(function () {
          new S();
        }) || !a(function () {
          new S(.5);
        })) {
          S = function ArrayBuffer(t) {
            return new P($(this, t));
          };for (var H, Z = S[x] = P[x], Q = v(P), tt = 0; Q.length > tt;) (H = Q[tt++]) in S || c(S, H, P[H]);o || (Z.constructor = S);
        }var nt = new _(new S(2)),
            rt = _[x].setInt8;nt.setInt8(0, 2147483648), nt.setInt8(1, 2147483649), !nt.getInt8(0) && nt.getInt8(1) || f(_[x], { setInt8: function setInt8(t, n) {
            rt.call(this, t, n << 24 >> 24);
          }, setUint8: function setUint8(t, n) {
            rt.call(this, t, n << 24 >> 24);
          } }, !0);
      } else S = function ArrayBuffer(t) {
        var n = $(this, t);this._b = d.call(Array(n), 0), this[C] = n;
      }, _ = function DataView(t, n, r) {
        s(this, _, b), s(t, S, b);var e = t[C],
            i = l(n);if (0 > i || i > e) throw O("Wrong offset!");if ((r = void 0 === r ? e - i : h(r), i + r > e)) throw O(m);this[L] = t, this[U] = i, this[C] = r;
      }, i && (Y(S, R, "_l"), Y(_, k, "_b"), Y(_, R, "_l"), Y(_, T, "_o")), f(_[x], { getInt8: function getInt8(t) {
          return q(this, 1, t)[0] << 24 >> 24;
        }, getUint8: function getUint8(t) {
          return q(this, 1, t)[0];
        }, getInt16: function getInt16(t) {
          var n = q(this, 2, t, arguments[1]);return (n[1] << 8 | n[0]) << 16 >> 16;
        }, getUint16: function getUint16(t) {
          var n = q(this, 2, t, arguments[1]);return n[1] << 8 | n[0];
        }, getInt32: function getInt32(t) {
          return W(q(this, 4, t, arguments[1]));
        }, getUint32: function getUint32(t) {
          return W(q(this, 4, t, arguments[1])) >>> 0;
        }, getFloat32: function getFloat32(t) {
          return D(q(this, 4, t, arguments[1]), 23, 4);
        }, getFloat64: function getFloat64(t) {
          return D(q(this, 8, t, arguments[1]), 52, 8);
        }, setInt8: function setInt8(t, n) {
          X(this, 1, t, B, n);
        }, setUint8: function setUint8(t, n) {
          X(this, 1, t, B, n);
        }, setInt16: function setInt16(t, n) {
          X(this, 2, t, V, n, arguments[2]);
        }, setUint16: function setUint16(t, n) {
          X(this, 2, t, V, n, arguments[2]);
        }, setInt32: function setInt32(t, n) {
          X(this, 4, t, z, n, arguments[2]);
        }, setUint32: function setUint32(t, n) {
          X(this, 4, t, z, n, arguments[2]);
        }, setFloat32: function setFloat32(t, n) {
          X(this, 4, t, J, n, arguments[2]);
        }, setFloat64: function setFloat64(t, n) {
          X(this, 8, t, K, n, arguments[2]);
        } });y(S, g), y(_, b), c(_[x], u.VIEW, !0), r[g] = S, r[b] = _;
    }, { 106: 106, 108: 108, 113: 113, 28: 28, 34: 34, 38: 38, 40: 40, 58: 58, 6: 6, 67: 67, 72: 72, 86: 86, 9: 9, 92: 92 }], 113: [function (t, n, r) {
      for (var e, i = t(38), o = t(40), u = t(114), c = u("typed_array"), f = u("view"), a = !(!i.ArrayBuffer || !i.DataView), s = a, l = 0, h = 9, v = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); h > l;) (e = i[v[l++]]) ? (o(e.prototype, c, !0), o(e.prototype, f, !0)) : s = !1;n.exports = { ABV: a, CONSTR: s, TYPED: c, VIEW: f };
    }, { 114: 114, 38: 38, 40: 40 }], 114: [function (t, n, r) {
      var e = 0,
          i = Math.random();n.exports = function (t) {
        return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + i).toString(36));
      };
    }, {}], 115: [function (t, n, r) {
      var e = t(38),
          i = t(23),
          o = t(58),
          u = t(116),
          c = t(67).f;n.exports = function (t) {
        var n = i.Symbol || (i.Symbol = o ? {} : e.Symbol || {});"_" == t.charAt(0) || t in n || c(n, t, { value: u.f(t) });
      };
    }, { 116: 116, 23: 23, 38: 38, 58: 58, 67: 67 }], 116: [function (t, n, r) {
      r.f = t(117);
    }, { 117: 117 }], 117: [function (t, n, r) {
      var e = t(94)("wks"),
          i = t(114),
          o = t(38).Symbol,
          u = "function" == typeof o,
          c = n.exports = function (t) {
        return e[t] || (e[t] = u && o[t] || (u ? o : i)("Symbol." + t));
      };c.store = e;
    }, { 114: 114, 38: 38, 94: 94 }], 118: [function (t, n, r) {
      var e = t(17),
          i = t(117)("iterator"),
          o = t(56);n.exports = t(23).getIteratorMethod = function (t) {
        return void 0 != t ? t[i] || t["@@iterator"] || o[e(t)] : void 0;
      };
    }, { 117: 117, 17: 17, 23: 23, 56: 56 }], 119: [function (t, n, r) {
      var e = t(17),
          i = t(117)("iterator"),
          o = t(56);n.exports = t(23).isIterable = function (t) {
        var n = Object(t);return void 0 !== n[i] || "@@iterator" in n || o.hasOwnProperty(e(n));
      };
    }, { 117: 117, 17: 17, 23: 23, 56: 56 }], 120: [function (t, n, r) {
      var e = t(32),
          i = t(88)(/[\\^$*+?.()|[\]{}]/g, "\\$&");e(e.S, "RegExp", { escape: function escape(t) {
          return i(t);
        } });
    }, { 32: 32, 88: 88 }], 121: [function (t, n, r) {
      var e = t(32);e(e.P, "Array", { copyWithin: t(8) }), t(5)("copyWithin");
    }, { 32: 32, 5: 5, 8: 8 }], 122: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(4);e(e.P + e.F * !t(96)([].every, !0), "Array", { every: function every(t) {
          return i(this, t, arguments[1]);
        } });
    }, { 12: 12, 32: 32, 96: 96 }], 123: [function (t, n, r) {
      var e = t(32);e(e.P, "Array", { fill: t(9) }), t(5)("fill");
    }, { 32: 32, 5: 5, 9: 9 }], 124: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(2);e(e.P + e.F * !t(96)([].filter, !0), "Array", { filter: function filter(t) {
          return i(this, t, arguments[1]);
        } });
    }, { 12: 12, 32: 32, 96: 96 }], 125: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(6),
          o = "findIndex",
          u = !0;o in [] && Array(1)[o](function () {
        u = !1;
      }), e(e.P + e.F * u, "Array", { findIndex: function findIndex(t) {
          return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
        } }), t(5)(o);
    }, { 12: 12, 32: 32, 5: 5 }], 126: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(5),
          o = "find",
          u = !0;o in [] && Array(1)[o](function () {
        u = !1;
      }), e(e.P + e.F * u, "Array", { find: function find(t) {
          return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
        } }), t(5)(o);
    }, { 12: 12, 32: 32, 5: 5 }], 127: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(0),
          o = t(96)([].forEach, !0);e(e.P + e.F * !o, "Array", { forEach: function forEach(t) {
          return i(this, t, arguments[1]);
        } });
    }, { 12: 12, 32: 32, 96: 96 }], 128: [function (t, n, r) {
      "use strict";var e = t(25),
          i = t(32),
          o = t(109),
          u = t(51),
          c = t(46),
          f = t(108),
          a = t(24),
          s = t(118);i(i.S + i.F * !t(54)(function (t) {
        Array.from(t);
      }), "Array", { from: function from(t) {
          var n,
              r,
              i,
              l,
              h = o(t),
              v = "function" == typeof this ? this : Array,
              p = arguments.length,
              d = p > 1 ? arguments[1] : void 0,
              y = void 0 !== d,
              g = 0,
              b = s(h);if ((y && (d = e(d, p > 2 ? arguments[2] : void 0, 2)), void 0 == b || v == Array && c(b))) for (n = f(h.length), r = new v(n); n > g; g++) a(r, g, y ? d(h[g], g) : h[g]);else for (l = b.call(h), r = new v(); !(i = l.next()).done; g++) a(r, g, y ? u(l, d, [i.value, g], !0) : i.value);return r.length = g, r;
        } });
    }, { 108: 108, 109: 109, 118: 118, 24: 24, 25: 25, 32: 32, 46: 46, 51: 51, 54: 54 }], 129: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(11)(!1),
          o = [].indexOf,
          u = !!o && 1 / [1].indexOf(1, -0) < 0;e(e.P + e.F * (u || !t(96)(o)), "Array", { indexOf: function indexOf(t) {
          return u ? o.apply(this, arguments) || 0 : i(this, t, arguments[1]);
        } });
    }, { 11: 11, 32: 32, 96: 96 }], 130: [function (t, n, r) {
      var e = t(32);e(e.S, "Array", { isArray: t(47) });
    }, { 32: 32, 47: 47 }], 131: [function (t, n, r) {
      "use strict";var e = t(5),
          i = t(55),
          o = t(56),
          u = t(107);n.exports = t(53)(Array, "Array", function (t, n) {
        this._t = u(t), this._i = 0, this._k = n;
      }, function () {
        var t = this._t,
            n = this._k,
            r = this._i++;return !t || r >= t.length ? (this._t = void 0, i(1)) : "keys" == n ? i(0, r) : "values" == n ? i(0, t[r]) : i(0, [r, t[r]]);
      }, "values"), o.Arguments = o.Array, e("keys"), e("values"), e("entries");
    }, { 107: 107, 5: 5, 53: 53, 55: 55, 56: 56 }], 132: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(107),
          o = [].join;e(e.P + e.F * (t(45) != Object || !t(96)(o)), "Array", { join: function join(t) {
          return o.call(i(this), void 0 === t ? "," : t);
        } });
    }, { 107: 107, 32: 32, 45: 45, 96: 96 }], 133: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(107),
          o = t(106),
          u = t(108),
          c = [].lastIndexOf,
          f = !!c && 1 / [1].lastIndexOf(1, -0) < 0;e(e.P + e.F * (f || !t(96)(c)), "Array", { lastIndexOf: function lastIndexOf(t) {
          if (f) return c.apply(this, arguments) || 0;var n = i(this),
              r = u(n.length),
              e = r - 1;for (arguments.length > 1 && (e = Math.min(e, o(arguments[1]))), 0 > e && (e = r + e); e >= 0; e--) if (e in n && n[e] === t) return e || 0;return -1;
        } });
    }, { 106: 106, 107: 107, 108: 108, 32: 32, 96: 96 }], 134: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(1);e(e.P + e.F * !t(96)([].map, !0), "Array", { map: function map(t) {
          return i(this, t, arguments[1]);
        } });
    }, { 12: 12, 32: 32, 96: 96 }], 135: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(24);e(e.S + e.F * t(34)(function () {
        function F() {}return !(Array.of.call(F) instanceof F);
      }), "Array", { of: function of() {
          for (var t = 0, n = arguments.length, r = new ("function" == typeof this ? this : Array)(n); n > t;) i(r, t, arguments[t++]);return r.length = n, r;
        } });
    }, { 24: 24, 32: 32, 34: 34 }], 136: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(13);e(e.P + e.F * !t(96)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
          return i(this, t, arguments.length, arguments[1], !0);
        } });
    }, { 13: 13, 32: 32, 96: 96 }], 137: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(13);e(e.P + e.F * !t(96)([].reduce, !0), "Array", { reduce: function reduce(t) {
          return i(this, t, arguments.length, arguments[1], !1);
        } });
    }, { 13: 13, 32: 32, 96: 96 }], 138: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(41),
          o = t(18),
          u = t(105),
          c = t(108),
          f = [].slice;e(e.P + e.F * t(34)(function () {
        i && f.call(i);
      }), "Array", { slice: function slice(t, n) {
          var r = c(this.length),
              e = o(this);if ((n = void 0 === n ? r : n, "Array" == e)) return f.call(this, t, n);for (var i = u(t, r), a = u(n, r), s = c(a - i), l = Array(s), h = 0; s > h; h++) l[h] = "String" == e ? this.charAt(i + h) : this[i + h];return l;
        } });
    }, { 105: 105, 108: 108, 18: 18, 32: 32, 34: 34, 41: 41 }], 139: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(12)(3);e(e.P + e.F * !t(96)([].some, !0), "Array", { some: function some(t) {
          return i(this, t, arguments[1]);
        } });
    }, { 12: 12, 32: 32, 96: 96 }], 140: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(3),
          o = t(109),
          u = t(34),
          c = [].sort,
          f = [1, 2, 3];e(e.P + e.F * (u(function () {
        f.sort(void 0);
      }) || !u(function () {
        f.sort(null);
      }) || !t(96)(c)), "Array", { sort: function sort(t) {
          return void 0 === t ? c.call(o(this)) : c.call(o(this), i(t));
        } });
    }, { 109: 109, 3: 3, 32: 32, 34: 34, 96: 96 }], 141: [function (t, n, r) {
      t(91)("Array");
    }, { 91: 91 }], 142: [function (t, n, r) {
      var e = t(32);e(e.S, "Date", { now: function now() {
          return new Date().getTime();
        } });
    }, { 32: 32 }], 143: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(34),
          o = Date.prototype.getTime,
          u = function u(t) {
        return t > 9 ? t : "0" + t;
      };e(e.P + e.F * (i(function () {
        return "0385-07-25T07:06:39.999Z" != new Date(-5e13 - 1).toISOString();
      }) || !i(function () {
        new Date(NaN).toISOString();
      })), "Date", { toISOString: function toISOString() {
          if (!isFinite(o.call(this))) throw RangeError("Invalid time value");var t = this,
              n = t.getUTCFullYear(),
              r = t.getUTCMilliseconds(),
              e = 0 > n ? "-" : n > 9999 ? "+" : "";return e + ("00000" + Math.abs(n)).slice(e ? -6 : -4) + "-" + u(t.getUTCMonth() + 1) + "-" + u(t.getUTCDate()) + "T" + u(t.getUTCHours()) + ":" + u(t.getUTCMinutes()) + ":" + u(t.getUTCSeconds()) + "." + (r > 99 ? r : "0" + u(r)) + "Z";
        } });
    }, { 32: 32, 34: 34 }], 144: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(109),
          o = t(110);e(e.P + e.F * t(34)(function () {
        return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
            return 1;
          } });
      }), "Date", { toJSON: function toJSON(t) {
          var n = i(this),
              r = o(n);return "number" != typeof r || isFinite(r) ? n.toISOString() : null;
        } });
    }, { 109: 109, 110: 110, 32: 32, 34: 34 }], 145: [function (t, n, r) {
      var e = t(117)("toPrimitive"),
          i = Date.prototype;e in i || t(40)(i, e, t(26));
    }, { 117: 117, 26: 26, 40: 40 }], 146: [function (t, n, r) {
      var e = Date.prototype,
          i = "Invalid Date",
          o = "toString",
          u = e[o],
          c = e.getTime;new Date(NaN) + "" != i && t(87)(e, o, function toString() {
        var t = c.call(this);return t === t ? u.call(this) : i;
      });
    }, { 87: 87 }], 147: [function (t, n, r) {
      var e = t(32);e(e.P, "Function", { bind: t(16) });
    }, { 16: 16, 32: 32 }], 148: [function (t, n, r) {
      "use strict";var e = t(49),
          i = t(74),
          o = t(117)("hasInstance"),
          u = Function.prototype;o in u || t(67).f(u, o, { value: function value(t) {
          if ("function" != typeof this || !e(t)) return !1;if (!e(this.prototype)) return t instanceof this;for (; t = i(t);) if (this.prototype === t) return !0;return !1;
        } });
    }, { 117: 117, 49: 49, 67: 67, 74: 74 }], 149: [function (t, n, r) {
      var e = t(67).f,
          i = t(85),
          o = t(39),
          u = Function.prototype,
          c = /^\s*function ([^ (]*)/,
          f = "name",
          a = Object.isExtensible || function () {
        return !0;
      };f in u || t(28) && e(u, f, { configurable: !0, get: function get() {
          try {
            var t = this,
                n = ("" + t).match(c)[1];return o(t, f) || !a(t) || e(t, f, i(5, n)), n;
          } catch (r) {
            return "";
          }
        } });
    }, { 28: 28, 39: 39, 67: 67, 85: 85 }], 150: [function (t, n, r) {
      "use strict";var e = t(19);n.exports = t(22)("Map", function (t) {
        return function Map() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      }, { get: function get(t) {
          var n = e.getEntry(this, t);return n && n.v;
        }, set: function set(t, n) {
          return e.def(this, 0 === t ? 0 : t, n);
        } }, e, !0);
    }, { 19: 19, 22: 22 }], 151: [function (t, n, r) {
      var e = t(32),
          i = t(60),
          o = Math.sqrt,
          u = Math.acosh;e(e.S + e.F * !(u && 710 == Math.floor(u(Number.MAX_VALUE)) && u(1 / 0) == 1 / 0), "Math", { acosh: function acosh(t) {
          return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1));
        } });
    }, { 32: 32, 60: 60 }], 152: [function (t, n, r) {
      function asinh(t) {
        return isFinite(t = +t) && 0 != t ? 0 > t ? -asinh(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t;
      }var e = t(32),
          i = Math.asinh;e(e.S + e.F * !(i && 1 / i(0) > 0), "Math", { asinh: asinh });
    }, { 32: 32 }], 153: [function (t, n, r) {
      var e = t(32),
          i = Math.atanh;e(e.S + e.F * !(i && 1 / i(-0) < 0), "Math", { atanh: function atanh(t) {
          return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
        } });
    }, { 32: 32 }], 154: [function (t, n, r) {
      var e = t(32),
          i = t(61);e(e.S, "Math", { cbrt: function cbrt(t) {
          return i(t = +t) * Math.pow(Math.abs(t), 1 / 3);
        } });
    }, { 32: 32, 61: 61 }], 155: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { clz32: function clz32(t) {
          return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
        } });
    }, { 32: 32 }], 156: [function (t, n, r) {
      var e = t(32),
          i = Math.exp;e(e.S, "Math", { cosh: function cosh(t) {
          return (i(t = +t) + i(-t)) / 2;
        } });
    }, { 32: 32 }], 157: [function (t, n, r) {
      var e = t(32),
          i = t(59);e(e.S + e.F * (i != Math.expm1), "Math", { expm1: i });
    }, { 32: 32, 59: 59 }], 158: [function (t, n, r) {
      var e = t(32),
          i = t(61),
          o = Math.pow,
          u = o(2, -52),
          c = o(2, -23),
          f = o(2, 127) * (2 - c),
          a = o(2, -126),
          s = function s(t) {
        return t + 1 / u - 1 / u;
      };e(e.S, "Math", { fround: function fround(t) {
          var n,
              r,
              e = Math.abs(t),
              o = i(t);return a > e ? o * s(e / a / c) * a * c : (n = (1 + c / u) * e, r = n - (n - e), r > f || r != r ? o * (1 / 0) : o * r);
        } });
    }, { 32: 32, 61: 61 }], 159: [function (t, n, r) {
      var e = t(32),
          i = Math.abs;e(e.S, "Math", { hypot: function hypot(t, n) {
          for (var r, e, o = 0, u = 0, c = arguments.length, f = 0; c > u;) r = i(arguments[u++]), r > f ? (e = f / r, o = o * e * e + 1, f = r) : r > 0 ? (e = r / f, o += e * e) : o += r;return f === 1 / 0 ? 1 / 0 : f * Math.sqrt(o);
        } });
    }, { 32: 32 }], 160: [function (t, n, r) {
      var e = t(32),
          i = Math.imul;e(e.S + e.F * t(34)(function () {
        return -5 != i(4294967295, 5) || 2 != i.length;
      }), "Math", { imul: function imul(t, n) {
          var r = 65535,
              e = +t,
              i = +n,
              o = r & e,
              u = r & i;return 0 | o * u + ((r & e >>> 16) * u + o * (r & i >>> 16) << 16 >>> 0);
        } });
    }, { 32: 32, 34: 34 }], 161: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { log10: function log10(t) {
          return Math.log(t) / Math.LN10;
        } });
    }, { 32: 32 }], 162: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { log1p: t(60) });
    }, { 32: 32, 60: 60 }], 163: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { log2: function log2(t) {
          return Math.log(t) / Math.LN2;
        } });
    }, { 32: 32 }], 164: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { sign: t(61) });
    }, { 32: 32, 61: 61 }], 165: [function (t, n, r) {
      var e = t(32),
          i = t(59),
          o = Math.exp;e(e.S + e.F * t(34)(function () {
        return -2e-17 != !Math.sinh(-2e-17);
      }), "Math", { sinh: function sinh(t) {
          return Math.abs(t = +t) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
        } });
    }, { 32: 32, 34: 34, 59: 59 }], 166: [function (t, n, r) {
      var e = t(32),
          i = t(59),
          o = Math.exp;e(e.S, "Math", { tanh: function tanh(t) {
          var n = i(t = +t),
              r = i(-t);return n == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (n - r) / (o(t) + o(-t));
        } });
    }, { 32: 32, 59: 59 }], 167: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { trunc: function trunc(t) {
          return (t > 0 ? Math.floor : Math.ceil)(t);
        } });
    }, { 32: 32 }], 168: [function (t, n, r) {
      "use strict";var e = t(38),
          i = t(39),
          o = t(18),
          u = t(43),
          c = t(110),
          f = t(34),
          a = t(72).f,
          s = t(70).f,
          l = t(67).f,
          h = t(102).trim,
          v = "Number",
          p = e[v],
          d = p,
          y = p.prototype,
          g = o(t(66)(y)) == v,
          b = ("trim" in String.prototype),
          x = function x(t) {
        var n = c(t, !1);if ("string" == typeof n && n.length > 2) {
          n = b ? n.trim() : h(n, 3);var r,
              e,
              i,
              o = n.charCodeAt(0);if (43 === o || 45 === o) {
            if ((r = n.charCodeAt(2), 88 === r || 120 === r)) return NaN;
          } else if (48 === o) {
            switch (n.charCodeAt(1)) {case 66:case 98:
                e = 2, i = 49;break;case 79:case 111:
                e = 8, i = 55;break;default:
                return +n;}for (var u, f = n.slice(2), a = 0, s = f.length; s > a; a++) if ((u = f.charCodeAt(a), 48 > u || u > i)) return NaN;return parseInt(f, e);
          }
        }return +n;
      };if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
        p = function Number(t) {
          var n = arguments.length < 1 ? 0 : t,
              r = this;return r instanceof p && (g ? f(function () {
            y.valueOf.call(r);
          }) : o(r) != v) ? u(new d(x(n)), r, p) : x(n);
        };for (var m, w = t(28) ? a(d) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), S = 0; w.length > S; S++) i(d, m = w[S]) && !i(p, m) && l(p, m, s(d, m));p.prototype = y, y.constructor = p, t(87)(e, v, p);
      }
    }, { 102: 102, 110: 110, 18: 18, 28: 28, 34: 34, 38: 38, 39: 39, 43: 43, 66: 66, 67: 67, 70: 70, 72: 72, 87: 87 }], 169: [function (t, n, r) {
      var e = t(32);e(e.S, "Number", { EPSILON: Math.pow(2, -52) });
    }, { 32: 32 }], 170: [function (t, n, r) {
      var e = t(32),
          i = t(38).isFinite;e(e.S, "Number", { isFinite: function isFinite(t) {
          return "number" == typeof t && i(t);
        } });
    }, { 32: 32, 38: 38 }], 171: [function (t, n, r) {
      var e = t(32);e(e.S, "Number", { isInteger: t(48) });
    }, { 32: 32, 48: 48 }], 172: [function (t, n, r) {
      var e = t(32);e(e.S, "Number", { isNaN: function isNaN(t) {
          return t != t;
        } });
    }, { 32: 32 }], 173: [function (t, n, r) {
      var e = t(32),
          i = t(48),
          o = Math.abs;e(e.S, "Number", { isSafeInteger: function isSafeInteger(t) {
          return i(t) && o(t) <= 9007199254740991;
        } });
    }, { 32: 32, 48: 48 }], 174: [function (t, n, r) {
      var e = t(32);e(e.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
    }, { 32: 32 }], 175: [function (t, n, r) {
      var e = t(32);e(e.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
    }, { 32: 32 }], 176: [function (t, n, r) {
      var e = t(32),
          i = t(81);e(e.S + e.F * (Number.parseFloat != i), "Number", { parseFloat: i });
    }, { 32: 32, 81: 81 }], 177: [function (t, n, r) {
      var e = t(32),
          i = t(82);e(e.S + e.F * (Number.parseInt != i), "Number", { parseInt: i });
    }, { 32: 32, 82: 82 }], 178: [function (t, n, r) {
      "use strict";var e = t(32),
          i = (t(6), t(106)),
          o = t(4),
          u = t(101),
          c = 1..toFixed,
          f = Math.floor,
          a = [0, 0, 0, 0, 0, 0],
          s = "Number.toFixed: incorrect invocation!",
          l = "0",
          h = function h(t, n) {
        for (var r = -1, e = n; ++r < 6;) e += t * a[r], a[r] = e % 1e7, e = f(e / 1e7);
      },
          v = function v(t) {
        for (var n = 6, r = 0; --n >= 0;) r += a[n], a[n] = f(r / t), r = r % t * 1e7;
      },
          p = function p() {
        for (var t = 6, n = ""; --t >= 0;) if ("" !== n || 0 === t || 0 !== a[t]) {
          var r = String(a[t]);n = "" === n ? r : n + u.call(l, 7 - r.length) + r;
        }return n;
      },
          d = function d(_x, _x2, _x3) {
        var _again = true;
  
        _function: while (_again) {
          var t = _x,
              n = _x2,
              r = _x3;
          _again = false;
          if (0 === n) {
            return r;
          } else {
            if (n % 2 === 1) {
              _x = t;
              _x2 = n - 1;
              _x3 = r * t;
              _again = true;
              continue _function;
            } else {
              _x = t * t;
              _x2 = n / 2;
              _x3 = r;
              _again = true;
              continue _function;
            }
          }
        }
      },
          y = function y(t) {
        for (var n = 0, r = t; r >= 4096;) n += 12, r /= 4096;for (; r >= 2;) n += 1, r /= 2;return n;
      };e(e.P + e.F * (!!c && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !t(34)(function () {
        c.call({});
      })), "Number", { toFixed: function toFixed(t) {
          var n,
              r,
              e,
              c,
              f = o(this, s),
              a = i(t),
              g = "",
              b = l;if (0 > a || a > 20) throw RangeError(s);if (f != f) return "NaN";if (-1e21 >= f || f >= 1e21) return String(f);if ((0 > f && (g = "-", f = -f), f > 1e-21)) if ((n = y(f * d(2, 69, 1)) - 69, r = 0 > n ? f * d(2, -n, 1) : f / d(2, n, 1), r *= 4503599627370496, n = 52 - n, n > 0)) {
            for (h(0, r), e = a; e >= 7;) h(1e7, 0), e -= 7;for (h(d(10, e, 1), 0), e = n - 1; e >= 23;) v(1 << 23), e -= 23;v(1 << e), h(1, 1), v(2), b = p();
          } else h(0, r), h(1 << -n, 0), b = p() + u.call(l, a);return a > 0 ? (c = b.length, b = g + (a >= c ? "0." + u.call(l, a - c) + b : b.slice(0, c - a) + "." + b.slice(c - a))) : b = g + b, b;
        } });
    }, { 101: 101, 106: 106, 32: 32, 34: 34, 4: 4, 6: 6 }], 179: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(34),
          o = t(4),
          u = 1..toPrecision;e(e.P + e.F * (i(function () {
        return "1" !== u.call(1, void 0);
      }) || !i(function () {
        u.call({});
      })), "Number", { toPrecision: function toPrecision(t) {
          var n = o(this, "Number#toPrecision: incorrect invocation!");return void 0 === t ? u.call(n) : u.call(n, t);
        } });
    }, { 32: 32, 34: 34, 4: 4 }], 180: [function (t, n, r) {
      var e = t(32);e(e.S + e.F, "Object", { assign: t(65) });
    }, { 32: 32, 65: 65 }], 181: [function (t, n, r) {
      var e = t(32);e(e.S, "Object", { create: t(66) });
    }, { 32: 32, 66: 66 }], 182: [function (t, n, r) {
      var e = t(32);e(e.S + e.F * !t(28), "Object", { defineProperties: t(68) });
    }, { 28: 28, 32: 32, 68: 68 }], 183: [function (t, n, r) {
      var e = t(32);e(e.S + e.F * !t(28), "Object", { defineProperty: t(67).f });
    }, { 28: 28, 32: 32, 67: 67 }], 184: [function (t, n, r) {
      var e = t(49),
          i = t(62).onFreeze;t(78)("freeze", function (t) {
        return function freeze(n) {
          return t && e(n) ? t(i(n)) : n;
        };
      });
    }, { 49: 49, 62: 62, 78: 78 }], 185: [function (t, n, r) {
      var e = t(107),
          i = t(70).f;t(78)("getOwnPropertyDescriptor", function () {
        return function getOwnPropertyDescriptor(t, n) {
          return i(e(t), n);
        };
      });
    }, { 107: 107, 70: 70, 78: 78 }], 186: [function (t, n, r) {
      t(78)("getOwnPropertyNames", function () {
        return t(71).f;
      });
    }, { 71: 71, 78: 78 }], 187: [function (t, n, r) {
      var e = t(109),
          i = t(74);t(78)("getPrototypeOf", function () {
        return function getPrototypeOf(t) {
          return i(e(t));
        };
      });
    }, { 109: 109, 74: 74, 78: 78 }], 188: [function (t, n, r) {
      var e = t(49);t(78)("isExtensible", function (t) {
        return function isExtensible(n) {
          return e(n) ? t ? t(n) : !0 : !1;
        };
      });
    }, { 49: 49, 78: 78 }], 189: [function (t, n, r) {
      var e = t(49);t(78)("isFrozen", function (t) {
        return function isFrozen(n) {
          return e(n) ? t ? t(n) : !1 : !0;
        };
      });
    }, { 49: 49, 78: 78 }], 190: [function (t, n, r) {
      var e = t(49);t(78)("isSealed", function (t) {
        return function isSealed(n) {
          return e(n) ? t ? t(n) : !1 : !0;
        };
      });
    }, { 49: 49, 78: 78 }], 191: [function (t, n, r) {
      var e = t(32);e(e.S, "Object", { is: t(89) });
    }, { 32: 32, 89: 89 }], 192: [function (t, n, r) {
      var e = t(109),
          i = t(76);t(78)("keys", function () {
        return function keys(t) {
          return i(e(t));
        };
      });
    }, { 109: 109, 76: 76, 78: 78 }], 193: [function (t, n, r) {
      var e = t(49),
          i = t(62).onFreeze;t(78)("preventExtensions", function (t) {
        return function preventExtensions(n) {
          return t && e(n) ? t(i(n)) : n;
        };
      });
    }, { 49: 49, 62: 62, 78: 78 }], 194: [function (t, n, r) {
      var e = t(49),
          i = t(62).onFreeze;t(78)("seal", function (t) {
        return function seal(n) {
          return t && e(n) ? t(i(n)) : n;
        };
      });
    }, { 49: 49, 62: 62, 78: 78 }], 195: [function (t, n, r) {
      var e = t(32);e(e.S, "Object", { setPrototypeOf: t(90).set });
    }, { 32: 32, 90: 90 }], 196: [function (t, n, r) {
      "use strict";var e = t(17),
          i = {};i[t(117)("toStringTag")] = "z", i + "" != "[object z]" && t(87)(Object.prototype, "toString", function toString() {
        return "[object " + e(this) + "]";
      }, !0);
    }, { 117: 117, 17: 17, 87: 87 }], 197: [function (t, n, r) {
      var e = t(32),
          i = t(81);e(e.G + e.F * (parseFloat != i), { parseFloat: i });
    }, { 32: 32, 81: 81 }], 198: [function (t, n, r) {
      var e = t(32),
          i = t(82);e(e.G + e.F * (parseInt != i), { parseInt: i });
    }, { 32: 32, 82: 82 }], 199: [function (t, n, r) {
      "use strict";var e,
          i,
          o,
          u = t(58),
          c = t(38),
          f = t(25),
          a = t(17),
          s = t(32),
          l = t(49),
          h = (t(7), t(3)),
          v = t(6),
          p = t(37),
          d = (t(90).set, t(95)),
          y = t(104).set,
          g = t(64)(),
          b = "Promise",
          x = c.TypeError,
          m = c.process,
          w = c[b],
          m = c.process,
          S = "process" == a(m),
          _ = function _() {},
          E = !!(function () {
        try {
          var n = w.resolve(1),
              r = (n.constructor = {})[t(117)("species")] = function (t) {
            t(_, _);
          };return (S || "function" == typeof PromiseRejectionEvent) && n.then(_) instanceof r;
        } catch (e) {}
      })(),
          O = function O(t, n) {
        return t === n || t === w && n === o;
      },
          F = function F(t) {
        var n;return l(t) && "function" == typeof (n = t.then) ? n : !1;
      },
          P = function P(t) {
        return O(w, t) ? new A(t) : new i(t);
      },
          A = i = function (t) {
        var n, r;this.promise = new t(function (t, e) {
          if (void 0 !== n || void 0 !== r) throw x("Bad Promise constructor");n = t, r = e;
        }), this.resolve = h(n), this.reject = h(r);
      },
          M = function M(t) {
        try {
          t();
        } catch (n) {
          return { error: n };
        }
      },
          I = function I(t, n) {
        if (!t._n) {
          t._n = !0;var r = t._c;g(function () {
            for (var e = t._v, i = 1 == t._s, o = 0, u = function u(n) {
              var r,
                  o,
                  u = i ? n.ok : n.fail,
                  c = n.resolve,
                  f = n.reject,
                  a = n.domain;try {
                u ? (i || (2 == t._h && k(t), t._h = 1), u === !0 ? r = e : (a && a.enter(), r = u(e), a && a.exit()), r === n.promise ? f(x("Promise-chain cycle")) : (o = F(r)) ? o.call(r, c, f) : c(r)) : f(e);
              } catch (s) {
                f(s);
              }
            }; r.length > o;) u(r[o++]);t._c = [], t._n = !1, n && !t._h && j(t);
          });
        }
      },
          j = function j(t) {
        y.call(c, function () {
          var n,
              r,
              e,
              i = t._v;if ((N(t) && (n = M(function () {
            S ? m.emit("unhandledRejection", i, t) : (r = c.onunhandledrejection) ? r({ promise: t, reason: i }) : (e = c.console) && e.error && e.error("Unhandled promise rejection", i);
          }), t._h = S || N(t) ? 2 : 1), t._a = void 0, n)) throw n.error;
        });
      },
          N = function N(t) {
        if (1 == t._h) return !1;for (var n, r = t._a || t._c, e = 0; r.length > e;) if ((n = r[e++], n.fail || !N(n.promise))) return !1;return !0;
      },
          k = function k(t) {
        y.call(c, function () {
          var n;S ? m.emit("rejectionHandled", t) : (n = c.onrejectionhandled) && n({ promise: t, reason: t._v });
        });
      },
          R = function R(t) {
        var n = this;n._d || (n._d = !0, n = n._w || n, n._v = t, n._s = 2, n._a || (n._a = n._c.slice()), I(n, !0));
      },
          T = function T(t) {
        var n,
            r = this;if (!r._d) {
          r._d = !0, r = r._w || r;try {
            if (r === t) throw x("Promise can't be resolved itself");(n = F(t)) ? g(function () {
              var e = { _w: r, _d: !1 };try {
                n.call(t, f(T, e, 1), f(R, e, 1));
              } catch (i) {
                R.call(e, i);
              }
            }) : (r._v = t, r._s = 1, I(r, !1));
          } catch (e) {
            R.call({ _w: r, _d: !1 }, e);
          }
        }
      };E || (w = function Promise(t) {
        v(this, w, b, "_h"), h(t), e.call(this);try {
          t(f(T, this, 1), f(R, this, 1));
        } catch (n) {
          R.call(this, n);
        }
      }, e = function Promise(t) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
      }, e.prototype = t(86)(w.prototype, { then: function then(t, n) {
          var r = P(d(this, w));return r.ok = "function" == typeof t ? t : !0, r.fail = "function" == typeof n && n, r.domain = S ? m.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && I(this, !1), r.promise;
        }, "catch": function _catch(t) {
          return this.then(void 0, t);
        } }), A = function () {
        var t = new e();this.promise = t, this.resolve = f(T, t, 1), this.reject = f(R, t, 1);
      }), s(s.G + s.W + s.F * !E, { Promise: w }), t(92)(w, b), t(91)(b), o = t(23)[b], s(s.S + s.F * !E, b, { reject: function reject(t) {
          var n = P(this),
              r = n.reject;return r(t), n.promise;
        } }), s(s.S + s.F * (u || !E), b, { resolve: function resolve(t) {
          if (t instanceof w && O(t.constructor, this)) return t;var n = P(this),
              r = n.resolve;return r(t), n.promise;
        } }), s(s.S + s.F * !(E && t(54)(function (t) {
        w.all(t)["catch"](_);
      })), b, { all: function all(t) {
          var n = this,
              r = P(n),
              e = r.resolve,
              i = r.reject,
              o = M(function () {
            var r = [],
                o = 0,
                u = 1;p(t, !1, function (t) {
              var c = o++,
                  f = !1;r.push(void 0), u++, n.resolve(t).then(function (t) {
                f || (f = !0, r[c] = t, --u || e(r));
              }, i);
            }), --u || e(r);
          });return o && i(o.error), r.promise;
        }, race: function race(t) {
          var n = this,
              r = P(n),
              e = r.reject,
              i = M(function () {
            p(t, !1, function (t) {
              n.resolve(t).then(r.resolve, e);
            });
          });return i && e(i.error), r.promise;
        } });
    }, { 104: 104, 117: 117, 17: 17, 23: 23, 25: 25, 3: 3, 32: 32, 37: 37, 38: 38, 49: 49, 54: 54, 58: 58, 6: 6, 64: 64, 7: 7, 86: 86, 90: 90, 91: 91, 92: 92, 95: 95 }], 200: [function (t, n, r) {
      var e = t(32),
          i = t(3),
          o = t(7),
          u = Function.apply;e(e.S, "Reflect", { apply: function apply(t, n, r) {
          return u.call(i(t), n, o(r));
        } });
    }, { 3: 3, 32: 32, 7: 7 }], 201: [function (t, n, r) {
      var e = t(32),
          i = t(66),
          o = t(3),
          u = t(7),
          c = t(49),
          f = t(16);e(e.S + e.F * t(34)(function () {
        function F() {}return !(Reflect.construct(function () {}, [], F) instanceof F);
      }), "Reflect", { construct: function construct(t, n) {
          o(t), u(n);var r = arguments.length < 3 ? t : o(arguments[2]);if (t == r) {
            switch (n.length) {case 0:
                return new t();case 1:
                return new t(n[0]);case 2:
                return new t(n[0], n[1]);case 3:
                return new t(n[0], n[1], n[2]);case 4:
                return new t(n[0], n[1], n[2], n[3]);}var e = [null];return e.push.apply(e, n), new (f.apply(t, e))();
          }var a = r.prototype,
              s = i(c(a) ? a : Object.prototype),
              l = Function.apply.call(t, s, n);return c(l) ? l : s;
        } });
    }, { 16: 16, 3: 3, 32: 32, 34: 34, 49: 49, 66: 66, 7: 7 }], 202: [function (t, n, r) {
      var e = t(67),
          i = t(32),
          o = t(7),
          u = t(110);i(i.S + i.F * t(34)(function () {
        Reflect.defineProperty(e.f({}, 1, { value: 1 }), 1, { value: 2 });
      }), "Reflect", { defineProperty: function defineProperty(t, n, r) {
          o(t), n = u(n, !0), o(r);try {
            return e.f(t, n, r), !0;
          } catch (i) {
            return !1;
          }
        } });
    }, { 110: 110, 32: 32, 34: 34, 67: 67, 7: 7 }], 203: [function (t, n, r) {
      var e = t(32),
          i = t(70).f,
          o = t(7);e(e.S, "Reflect", { deleteProperty: function deleteProperty(t, n) {
          var r = i(o(t), n);return r && !r.configurable ? !1 : delete t[n];
        } });
    }, { 32: 32, 7: 7, 70: 70 }], 204: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(7),
          o = function o(t) {
        this._t = i(t), this._i = 0;var n,
            r = this._k = [];for (n in t) r.push(n);
      };t(52)(o, "Object", function () {
        var t,
            n = this,
            r = n._k;do if (n._i >= r.length) return { value: void 0, done: !0 }; while (!((t = r[n._i++]) in n._t));return { value: t, done: !1 };
      }), e(e.S, "Reflect", { enumerate: function enumerate(t) {
          return new o(t);
        } });
    }, { 32: 32, 52: 52, 7: 7 }], 205: [function (t, n, r) {
      var e = t(70),
          i = t(32),
          o = t(7);i(i.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, n) {
          return e.f(o(t), n);
        } });
    }, { 32: 32, 7: 7, 70: 70 }], 206: [function (t, n, r) {
      var e = t(32),
          i = t(74),
          o = t(7);e(e.S, "Reflect", { getPrototypeOf: function getPrototypeOf(t) {
          return i(o(t));
        } });
    }, { 32: 32, 7: 7, 74: 74 }], 207: [function (t, n, r) {
      function get(_x4, _x5) {
        var _arguments2 = arguments;
        var _again2 = true;
  
        _function2: while (_again2) {
          var t = _x4,
              n = _x5;
          _again2 = false;
          var r,
              u,
              a = _arguments2.length < 3 ? t : _arguments2[2];if (f(t) === a) {
            return t[n];
          } else {
            if (r = e.f(t, n)) {
              return o(r, "value") ? r.value : void 0 !== r.get ? r.get.call(a) : void 0;
            } else {
              if (c(u = i(t))) {
                _arguments2 = [_x4 = u, _x5 = n, a];
                _again2 = true;
                r = u = a = undefined;
                continue _function2;
              } else {
                return void 0;
              }
            }
          }
        }
      }var e = t(70),
          i = t(74),
          o = t(39),
          u = t(32),
          c = t(49),
          f = t(7);u(u.S, "Reflect", {
        get: get });
    }, { 32: 32, 39: 39, 49: 49, 7: 7, 70: 70, 74: 74 }], 208: [function (t, n, r) {
      var e = t(32);e(e.S, "Reflect", { has: function has(t, n) {
          return n in t;
        } });
    }, { 32: 32 }], 209: [function (t, n, r) {
      var e = t(32),
          i = t(7),
          o = Object.isExtensible;e(e.S, "Reflect", { isExtensible: function isExtensible(t) {
          return i(t), o ? o(t) : !0;
        } });
    }, { 32: 32, 7: 7 }], 210: [function (t, n, r) {
      var e = t(32);e(e.S, "Reflect", { ownKeys: t(80) });
    }, { 32: 32, 80: 80 }], 211: [function (t, n, r) {
      var e = t(32),
          i = t(7),
          o = Object.preventExtensions;e(e.S, "Reflect", { preventExtensions: function preventExtensions(t) {
          i(t);try {
            return o && o(t), !0;
          } catch (n) {
            return !1;
          }
        } });
    }, { 32: 32, 7: 7 }], 212: [function (t, n, r) {
      var e = t(32),
          i = t(90);i && e(e.S, "Reflect", { setPrototypeOf: function setPrototypeOf(t, n) {
          i.check(t, n);try {
            return i.set(t, n), !0;
          } catch (r) {
            return !1;
          }
        } });
    }, { 32: 32, 90: 90 }], 213: [function (t, n, r) {
      function set(_x6, _x7, _x8) {
        var _arguments3 = arguments;
        var _again3 = true;
  
        _function3: while (_again3) {
          var t = _x6,
              n = _x7,
              r = _x8;
          _again3 = false;
          var c,
              l,
              h = _arguments3.length < 4 ? t : _arguments3[3],
              v = i.f(a(t), n);if (!v) {
            if (s(l = o(t))) {
              _arguments3 = [_x6 = l, _x7 = n, _x8 = r, h];
              _again3 = true;
              c = l = h = v = undefined;
              continue _function3;
            }v = f(0);
          }return u(v, "value") ? v.writable !== !1 && s(h) ? (c = i.f(h, n) || f(0), c.value = r, e.f(h, n, c), !0) : !1 : void 0 === v.set ? !1 : (v.set.call(h, r), !0);
        }
      }var e = t(67),
          i = t(70),
          o = t(74),
          u = t(39),
          c = t(32),
          f = t(85),
          a = t(7),
          s = t(49);c(c.S, "Reflect", { set: set });
    }, { 32: 32, 39: 39, 49: 49, 67: 67, 7: 7, 70: 70, 74: 74, 85: 85 }], 214: [function (t, n, r) {
      var e = t(38),
          i = t(43),
          o = t(67).f,
          u = t(72).f,
          c = t(50),
          f = t(36),
          a = e.RegExp,
          s = a,
          l = a.prototype,
          h = /a/g,
          v = /a/g,
          p = new a(h) !== h;if (t(28) && (!p || t(34)(function () {
        return v[t(117)("match")] = !1, a(h) != h || a(v) == v || "/a/i" != a(h, "i");
      }))) {
        a = function RegExp(t, n) {
          var r = this instanceof a,
              e = c(t),
              o = void 0 === n;return !r && e && t.constructor === a && o ? t : i(p ? new s(e && !o ? t.source : t, n) : s((e = t instanceof a) ? t.source : t, e && o ? f.call(t) : n), r ? this : l, a);
        };for (var d = function d(t) {
          (t in a) || o(a, t, { configurable: !0, get: function get() {
              return s[t];
            }, set: function set(n) {
              s[t] = n;
            } });
        }, y = u(s), g = 0; y.length > g;) d(y[g++]);l.constructor = a, a.prototype = l, t(87)(e, "RegExp", a);
      }t(91)("RegExp");
    }, { 117: 117, 28: 28, 34: 34, 36: 36, 38: 38, 43: 43, 50: 50, 67: 67, 72: 72, 87: 87, 91: 91 }], 215: [function (t, n, r) {
      t(28) && "g" != /./g.flags && t(67).f(RegExp.prototype, "flags", { configurable: !0, get: t(36) });
    }, { 28: 28, 36: 36, 67: 67 }], 216: [function (t, n, r) {
      t(35)("match", 1, function (t, n, r) {
        return [function match(r) {
          "use strict";var e = t(this),
              i = void 0 == r ? void 0 : r[n];return void 0 !== i ? i.call(r, e) : new RegExp(r)[n](String(e));
        }, r];
      });
    }, { 35: 35 }], 217: [function (t, n, r) {
      t(35)("replace", 2, function (t, n, r) {
        return [function replace(e, i) {
          "use strict";var o = t(this),
              u = void 0 == e ? void 0 : e[n];return void 0 !== u ? u.call(e, o, i) : r.call(String(o), e, i);
        }, r];
      });
    }, { 35: 35 }], 218: [function (t, n, r) {
      t(35)("search", 1, function (t, n, r) {
        return [function search(r) {
          "use strict";var e = t(this),
              i = void 0 == r ? void 0 : r[n];return void 0 !== i ? i.call(r, e) : new RegExp(r)[n](String(e));
        }, r];
      });
    }, { 35: 35 }], 219: [function (t, n, r) {
      t(35)("split", 2, function (n, r, e) {
        "use strict";var i = t(50),
            o = e,
            u = [].push,
            c = "split",
            f = "length",
            a = "lastIndex";if ("c" == "abbc"[c](/(b)*/)[1] || 4 != "test"[c](/(?:)/, -1)[f] || 2 != "ab"[c](/(?:ab)*/)[f] || 4 != "."[c](/(.?)(.?)/)[f] || "."[c](/()()/)[f] > 1 || ""[c](/.?/)[f]) {
          var s = void 0 === /()??/.exec("")[1];e = function (t, n) {
            var r = String(this);if (void 0 === t && 0 === n) return [];if (!i(t)) return o.call(r, t, n);var e,
                c,
                l,
                h,
                v,
                p = [],
                d = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""),
                y = 0,
                g = void 0 === n ? 4294967295 : n >>> 0,
                b = new RegExp(t.source, d + "g");for (s || (e = new RegExp("^" + b.source + "$(?!\\s)", d)); (c = b.exec(r)) && (l = c.index + c[0][f], !(l > y && (p.push(r.slice(y, c.index)), !s && c[f] > 1 && c[0].replace(e, function () {
              for (v = 1; v < arguments[f] - 2; v++) void 0 === arguments[v] && (c[v] = void 0);
            }), c[f] > 1 && c.index < r[f] && u.apply(p, c.slice(1)), h = c[0][f], y = l, p[f] >= g)));) b[a] === c.index && b[a]++;return y === r[f] ? !h && b.test("") || p.push("") : p.push(r.slice(y)), p[f] > g ? p.slice(0, g) : p;
          };
        } else "0"[c](void 0, 0)[f] && (e = function (t, n) {
          return void 0 === t && 0 === n ? [] : o.call(this, t, n);
        });return [function split(t, i) {
          var o = n(this),
              u = void 0 == t ? void 0 : t[r];return void 0 !== u ? u.call(t, o, i) : e.call(String(o), t, i);
        }, e];
      });
    }, { 35: 35, 50: 50 }], 220: [function (t, n, r) {
      "use strict";t(215);var e = t(7),
          i = t(36),
          o = t(28),
          u = "toString",
          c = /./[u],
          f = function f(n) {
        t(87)(RegExp.prototype, u, n, !0);
      };t(34)(function () {
        return "/a/b" != c.call({ source: "a", flags: "b" });
      }) ? f(function toString() {
        var t = e(this);return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0);
      }) : c.name != u && f(function toString() {
        return c.call(this);
      });
    }, { 215: 215, 28: 28, 34: 34, 36: 36, 7: 7, 87: 87 }], 221: [function (t, n, r) {
      "use strict";var e = t(19);n.exports = t(22)("Set", function (t) {
        return function Set() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      }, { add: function add(t) {
          return e.def(this, t = 0 === t ? 0 : t, t);
        } }, e);
    }, { 19: 19, 22: 22 }], 222: [function (t, n, r) {
      "use strict";t(99)("anchor", function (t) {
        return function anchor(n) {
          return t(this, "a", "name", n);
        };
      });
    }, { 99: 99 }], 223: [function (t, n, r) {
      "use strict";t(99)("big", function (t) {
        return function big() {
          return t(this, "big", "", "");
        };
      });
    }, { 99: 99 }], 224: [function (t, n, r) {
      "use strict";t(99)("blink", function (t) {
        return function blink() {
          return t(this, "blink", "", "");
        };
      });
    }, { 99: 99 }], 225: [function (t, n, r) {
      "use strict";t(99)("bold", function (t) {
        return function bold() {
          return t(this, "b", "", "");
        };
      });
    }, { 99: 99 }], 226: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(97)(!1);e(e.P, "String", { codePointAt: function codePointAt(t) {
          return i(this, t);
        } });
    }, { 32: 32, 97: 97 }], 227: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(108),
          o = t(98),
          u = "endsWith",
          c = ""[u];e(e.P + e.F * t(33)(u), "String", { endsWith: function endsWith(t) {
          var n = o(this, t, u),
              r = arguments.length > 1 ? arguments[1] : void 0,
              e = i(n.length),
              f = void 0 === r ? e : Math.min(i(r), e),
              a = String(t);return c ? c.call(n, a, f) : n.slice(f - a.length, f) === a;
        } });
    }, { 108: 108, 32: 32, 33: 33, 98: 98 }], 228: [function (t, n, r) {
      "use strict";t(99)("fixed", function (t) {
        return function fixed() {
          return t(this, "tt", "", "");
        };
      });
    }, { 99: 99 }], 229: [function (t, n, r) {
      "use strict";t(99)("fontcolor", function (t) {
        return function fontcolor(n) {
          return t(this, "font", "color", n);
        };
      });
    }, { 99: 99 }], 230: [function (t, n, r) {
      "use strict";t(99)("fontsize", function (t) {
        return function fontsize(n) {
          return t(this, "font", "size", n);
        };
      });
    }, { 99: 99 }], 231: [function (t, n, r) {
      var e = t(32),
          i = t(105),
          o = String.fromCharCode,
          u = String.fromCodePoint;e(e.S + e.F * (!!u && 1 != u.length), "String", { fromCodePoint: function fromCodePoint(t) {
          for (var n, r = [], e = arguments.length, u = 0; e > u;) {
            if ((n = +arguments[u++], i(n, 1114111) !== n)) throw RangeError(n + " is not a valid code point");r.push(65536 > n ? o(n) : o(((n -= 65536) >> 10) + 55296, n % 1024 + 56320));
          }return r.join("");
        } });
    }, { 105: 105, 32: 32 }], 232: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(98),
          o = "includes";e(e.P + e.F * t(33)(o), "String", { includes: function includes(t) {
          return !! ~i(this, t, o).indexOf(t, arguments.length > 1 ? arguments[1] : void 0);
        } });
    }, { 32: 32, 33: 33, 98: 98 }], 233: [function (t, n, r) {
      "use strict";t(99)("italics", function (t) {
        return function italics() {
          return t(this, "i", "", "");
        };
      });
    }, { 99: 99 }], 234: [function (t, n, r) {
      "use strict";var e = t(97)(!0);t(53)(String, "String", function (t) {
        this._t = String(t), this._i = 0;
      }, function () {
        var t,
            n = this._t,
            r = this._i;return r >= n.length ? { value: void 0, done: !0 } : (t = e(n, r), this._i += t.length, { value: t, done: !1 });
      });
    }, { 53: 53, 97: 97 }], 235: [function (t, n, r) {
      "use strict";t(99)("link", function (t) {
        return function link(n) {
          return t(this, "a", "href", n);
        };
      });
    }, { 99: 99 }], 236: [function (t, n, r) {
      var e = t(32),
          i = t(107),
          o = t(108);e(e.S, "String", { raw: function raw(t) {
          for (var n = i(t.raw), r = o(n.length), e = arguments.length, u = [], c = 0; r > c;) u.push(String(n[c++])), e > c && u.push(String(arguments[c]));return u.join("");
        } });
    }, { 107: 107, 108: 108, 32: 32 }], 237: [function (t, n, r) {
      var e = t(32);e(e.P, "String", { repeat: t(101) });
    }, { 101: 101, 32: 32 }], 238: [function (t, n, r) {
      "use strict";t(99)("small", function (t) {
        return function small() {
          return t(this, "small", "", "");
        };
      });
    }, { 99: 99 }], 239: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(108),
          o = t(98),
          u = "startsWith",
          c = ""[u];e(e.P + e.F * t(33)(u), "String", { startsWith: function startsWith(t) {
          var n = o(this, t, u),
              r = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, n.length)),
              e = String(t);return c ? c.call(n, e, r) : n.slice(r, r + e.length) === e;
        } });
    }, { 108: 108, 32: 32, 33: 33, 98: 98 }], 240: [function (t, n, r) {
      "use strict";t(99)("strike", function (t) {
        return function strike() {
          return t(this, "strike", "", "");
        };
      });
    }, { 99: 99 }], 241: [function (t, n, r) {
      "use strict";t(99)("sub", function (t) {
        return function sub() {
          return t(this, "sub", "", "");
        };
      });
    }, { 99: 99 }], 242: [function (t, n, r) {
      "use strict";t(99)("sup", function (t) {
        return function sup() {
          return t(this, "sup", "", "");
        };
      });
    }, { 99: 99 }], 243: [function (t, n, r) {
      "use strict";t(102)("trim", function (t) {
        return function trim() {
          return t(this, 3);
        };
      });
    }, { 102: 102 }], 244: [function (t, n, r) {
      "use strict";var e = t(38),
          i = t(39),
          o = t(28),
          u = t(32),
          c = t(87),
          f = t(62).KEY,
          a = t(34),
          s = t(94),
          l = t(92),
          h = t(114),
          v = t(117),
          p = t(116),
          d = t(115),
          y = t(57),
          g = t(31),
          b = t(47),
          x = t(7),
          m = t(107),
          w = t(110),
          S = t(85),
          _ = t(66),
          E = t(71),
          O = t(70),
          F = t(67),
          P = t(76),
          A = O.f,
          M = F.f,
          I = E.f,
          j = e.Symbol,
          N = e.JSON,
          k = N && N.stringify,
          R = "prototype",
          T = v("_hidden"),
          L = v("toPrimitive"),
          C = ({}).propertyIsEnumerable,
          U = s("symbol-registry"),
          G = s("symbols"),
          D = s("op-symbols"),
          W = Object[R],
          B = "function" == typeof j,
          V = e.QObject,
          z = !V || !V[R] || !V[R].findChild,
          K = o && a(function () {
        return 7 != _(M({}, "a", { get: function get() {
            return M(this, "a", { value: 7 }).a;
          } })).a;
      }) ? function (t, n, r) {
        var e = A(W, n);e && delete W[n], M(t, n, r), e && t !== W && M(W, n, e);
      } : M,
          J = function J(t) {
        var n = G[t] = _(j[R]);return n._k = t, n;
      },
          Y = B && "symbol" == typeof j.iterator ? function (t) {
        return "symbol" == typeof t;
      } : function (t) {
        return t instanceof j;
      },
          q = function defineProperty(t, n, r) {
        return t === W && q(D, n, r), x(t), n = w(n, !0), x(r), i(G, n) ? (r.enumerable ? (i(t, T) && t[T][n] && (t[T][n] = !1), r = _(r, { enumerable: S(0, !1) })) : (i(t, T) || M(t, T, S(1, {})), t[T][n] = !0), K(t, n, r)) : M(t, n, r);
      },
          X = function defineProperties(t, n) {
        x(t);for (var r, e = g(n = m(n)), i = 0, o = e.length; o > i;) q(t, r = e[i++], n[r]);return t;
      },
          $ = function create(t, n) {
        return void 0 === n ? _(t) : X(_(t), n);
      },
          H = function propertyIsEnumerable(t) {
        var n = C.call(this, t = w(t, !0));return this === W && i(G, t) && !i(D, t) ? !1 : n || !i(this, t) || !i(G, t) || i(this, T) && this[T][t] ? n : !0;
      },
          Z = function getOwnPropertyDescriptor(t, n) {
        if ((t = m(t), n = w(n, !0), t !== W || !i(G, n) || i(D, n))) {
          var r = A(t, n);return !r || !i(G, n) || i(t, T) && t[T][n] || (r.enumerable = !0), r;
        }
      },
          Q = function getOwnPropertyNames(t) {
        for (var n, r = I(m(t)), e = [], o = 0; r.length > o;) i(G, n = r[o++]) || n == T || n == f || e.push(n);return e;
      },
          tt = function getOwnPropertySymbols(t) {
        for (var n, r = t === W, e = I(r ? D : m(t)), o = [], u = 0; e.length > u;) i(G, n = e[u++]) && (r ? i(W, n) : !0) && o.push(G[n]);return o;
      };B || (j = function Symbol() {
        if (this instanceof j) throw TypeError("Symbol is not a constructor!");var t = h(arguments.length > 0 ? arguments[0] : void 0),
            n = function n(r) {
          this === W && n.call(D, r), i(this, T) && i(this[T], t) && (this[T][t] = !1), K(this, t, S(1, r));
        };return o && z && K(W, t, { configurable: !0, set: n }), J(t);
      }, c(j[R], "toString", function toString() {
        return this._k;
      }), O.f = Z, F.f = q, t(72).f = E.f = Q, t(77).f = H, t(73).f = tt, o && !t(58) && c(W, "propertyIsEnumerable", H, !0), p.f = function (t) {
        return J(v(t));
      }), u(u.G + u.W + u.F * !B, { Symbol: j });for (var nt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), rt = 0; nt.length > rt;) v(nt[rt++]);for (var nt = P(v.store), rt = 0; nt.length > rt;) d(nt[rt++]);u(u.S + u.F * !B, "Symbol", { "for": function _for(t) {
          return i(U, t += "") ? U[t] : U[t] = j(t);
        }, keyFor: function keyFor(t) {
          if (Y(t)) return y(U, t);throw TypeError(t + " is not a symbol!");
        }, useSetter: function useSetter() {
          z = !0;
        }, useSimple: function useSimple() {
          z = !1;
        } }), u(u.S + u.F * !B, "Object", { create: $, defineProperty: q, defineProperties: X, getOwnPropertyDescriptor: Z, getOwnPropertyNames: Q, getOwnPropertySymbols: tt }), N && u(u.S + u.F * (!B || a(function () {
        var t = j();return "[null]" != k([t]) || "{}" != k({ a: t }) || "{}" != k(Object(t));
      })), "JSON", { stringify: function stringify(t) {
          if (void 0 !== t && !Y(t)) {
            for (var n, r, e = [t], i = 1; arguments.length > i;) e.push(arguments[i++]);return n = e[1], "function" == typeof n && (r = n), !r && b(n) || (n = function (t, n) {
              return r && (n = r.call(this, t, n)), Y(n) ? void 0 : n;
            }), e[1] = n, k.apply(N, e);
          }
        } }), j[R][L] || t(40)(j[R], L, j[R].valueOf), l(j, "Symbol"), l(Math, "Math", !0), l(e.JSON, "JSON", !0);
    }, { 107: 107, 110: 110, 114: 114, 115: 115, 116: 116, 117: 117, 28: 28, 31: 31, 32: 32, 34: 34, 38: 38, 39: 39, 40: 40, 47: 47, 57: 57, 58: 58, 62: 62, 66: 66, 67: 67, 7: 7, 70: 70, 71: 71, 72: 72, 73: 73, 76: 76, 77: 77, 85: 85, 87: 87, 92: 92, 94: 94 }], 245: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(113),
          o = t(112),
          u = t(7),
          c = t(105),
          f = t(108),
          a = t(49),
          s = (t(117)("typed_array"), t(38).ArrayBuffer),
          l = t(95),
          h = o.ArrayBuffer,
          v = o.DataView,
          p = i.ABV && s.isView,
          d = h.prototype.slice,
          y = i.VIEW,
          g = "ArrayBuffer";e(e.G + e.W + e.F * (s !== h), { ArrayBuffer: h }), e(e.S + e.F * !i.CONSTR, g, { isView: function isView(t) {
          return p && p(t) || a(t) && y in t;
        } }), e(e.P + e.U + e.F * t(34)(function () {
        return !new h(2).slice(1, void 0).byteLength;
      }), g, { slice: function slice(t, n) {
          if (void 0 !== d && void 0 === n) return d.call(u(this), t);for (var r = u(this).byteLength, e = c(t, r), i = c(void 0 === n ? r : n, r), o = new (l(this, h))(f(i - e)), a = new v(this), s = new v(o), p = 0; i > e;) s.setUint8(p++, a.getUint8(e++));return o;
        } }), t(91)(g);
    }, { 105: 105, 108: 108, 112: 112, 113: 113, 117: 117, 32: 32, 34: 34, 38: 38, 49: 49, 7: 7, 91: 91, 95: 95 }], 246: [function (t, n, r) {
      var e = t(32);e(e.G + e.W + e.F * !t(113).ABV, { DataView: t(112).DataView });
    }, { 112: 112, 113: 113, 32: 32 }], 247: [function (t, n, r) {
      t(111)("Float32", 4, function (t) {
        return function Float32Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 248: [function (t, n, r) {
      t(111)("Float64", 8, function (t) {
        return function Float64Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 249: [function (t, n, r) {
      t(111)("Int16", 2, function (t) {
        return function Int16Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 250: [function (t, n, r) {
      t(111)("Int32", 4, function (t) {
        return function Int32Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 251: [function (t, n, r) {
      t(111)("Int8", 1, function (t) {
        return function Int8Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 252: [function (t, n, r) {
      t(111)("Uint16", 2, function (t) {
        return function Uint16Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 253: [function (t, n, r) {
      t(111)("Uint32", 4, function (t) {
        return function Uint32Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 254: [function (t, n, r) {
      t(111)("Uint8", 1, function (t) {
        return function Uint8Array(n, r, e) {
          return t(this, n, r, e);
        };
      });
    }, { 111: 111 }], 255: [function (t, n, r) {
      t(111)("Uint8", 1, function (t) {
        return function Uint8ClampedArray(n, r, e) {
          return t(this, n, r, e);
        };
      }, !0);
    }, { 111: 111 }], 256: [function (t, n, r) {
      "use strict";var e,
          i = t(12)(0),
          o = t(87),
          u = t(62),
          c = t(65),
          f = t(21),
          a = t(49),
          s = (t(39), u.getWeak),
          l = Object.isExtensible,
          h = f.ufstore,
          v = {},
          p = function p(t) {
        return function WeakMap() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
          d = { get: function get(t) {
          if (a(t)) {
            var n = s(t);return n === !0 ? h(this).get(t) : n ? n[this._i] : void 0;
          }
        }, set: function set(t, n) {
          return f.def(this, t, n);
        } },
          y = n.exports = t(22)("WeakMap", p, d, f, !0, !0);7 != new y().set((Object.freeze || Object)(v), 7).get(v) && (e = f.getConstructor(p), c(e.prototype, d), u.NEED = !0, i(["delete", "has", "get", "set"], function (t) {
        var n = y.prototype,
            r = n[t];o(n, t, function (n, i) {
          if (a(n) && !l(n)) {
            this._f || (this._f = new e());var o = this._f[t](n, i);return "set" == t ? this : o;
          }return r.call(this, n, i);
        });
      }));
    }, { 12: 12, 21: 21, 22: 22, 39: 39, 49: 49, 62: 62, 65: 65, 87: 87 }], 257: [function (t, n, r) {
      "use strict";var e = t(21);t(22)("WeakSet", function (t) {
        return function WeakSet() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      }, { add: function add(t) {
          return e.def(this, t, !0);
        } }, e, !1, !0);
    }, { 21: 21, 22: 22 }], 258: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(11)(!0);e(e.P, "Array", { includes: function includes(t) {
          return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
        } }), t(5)("includes");
    }, { 11: 11, 32: 32, 5: 5 }], 259: [function (t, n, r) {
      var e = t(32),
          i = t(64)(),
          o = t(38).process,
          u = "process" == t(18)(o);e(e.G, { asap: function asap(t) {
          var n = u && o.domain;i(n ? n.bind(t) : t);
        } });
    }, { 18: 18, 32: 32, 38: 38, 64: 64 }], 260: [function (t, n, r) {
      var e = t(32),
          i = t(18);e(e.S, "Error", { isError: function isError(t) {
          return "Error" === i(t);
        } });
    }, { 18: 18, 32: 32 }], 261: [function (t, n, r) {
      var e = t(32);e(e.P + e.R, "Map", { toJSON: t(20)("Map") });
    }, { 20: 20, 32: 32 }], 262: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { iaddh: function iaddh(t, n, r, e) {
          var i = t >>> 0,
              o = n >>> 0,
              u = r >>> 0;return o + (e >>> 0) + ((i & u | (i | u) & ~(i + u >>> 0)) >>> 31) | 0;
        } });
    }, { 32: 32 }], 263: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { imulh: function imulh(t, n) {
          var r = 65535,
              e = +t,
              i = +n,
              o = e & r,
              u = i & r,
              c = e >> 16,
              f = i >> 16,
              a = (c * u >>> 0) + (o * u >>> 16);return c * f + (a >> 16) + ((o * f >>> 0) + (a & r) >> 16);
        } });
    }, { 32: 32 }], 264: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { isubh: function isubh(t, n, r, e) {
          var i = t >>> 0,
              o = n >>> 0,
              u = r >>> 0;return o - (e >>> 0) - ((~i & u | ~(i ^ u) & i - u >>> 0) >>> 31) | 0;
        } });
    }, { 32: 32 }], 265: [function (t, n, r) {
      var e = t(32);e(e.S, "Math", { umulh: function umulh(t, n) {
          var r = 65535,
              e = +t,
              i = +n,
              o = e & r,
              u = i & r,
              c = e >>> 16,
              f = i >>> 16,
              a = (c * u >>> 0) + (o * u >>> 16);return c * f + (a >>> 16) + ((o * f >>> 0) + (a & r) >>> 16);
        } });
    }, { 32: 32 }], 266: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(109),
          o = t(3),
          u = t(67);t(28) && e(e.P + t(69), "Object", { __defineGetter__: function __defineGetter__(t, n) {
          u.f(i(this), t, { get: o(n), enumerable: !0, configurable: !0 });
        } });
    }, { 109: 109, 28: 28, 3: 3, 32: 32, 67: 67, 69: 69 }], 267: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(109),
          o = t(3),
          u = t(67);t(28) && e(e.P + t(69), "Object", { __defineSetter__: function __defineSetter__(t, n) {
          u.f(i(this), t, { set: o(n), enumerable: !0, configurable: !0 });
        } });
    }, { 109: 109, 28: 28, 3: 3, 32: 32, 67: 67, 69: 69 }], 268: [function (t, n, r) {
      var e = t(32),
          i = t(79)(!0);e(e.S, "Object", { entries: function entries(t) {
          return i(t);
        } });
    }, { 32: 32, 79: 79 }], 269: [function (t, n, r) {
      var e = t(32),
          i = t(80),
          o = t(107),
          u = t(70),
          c = t(24);e(e.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
          for (var n, r = o(t), e = u.f, f = i(r), a = {}, s = 0; f.length > s;) c(a, n = f[s++], e(r, n));return a;
        } });
    }, { 107: 107, 24: 24, 32: 32, 70: 70, 80: 80 }], 270: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(109),
          o = t(110),
          u = t(74),
          c = t(70).f;t(28) && e(e.P + t(69), "Object", { __lookupGetter__: function __lookupGetter__(t) {
          var n,
              r = i(this),
              e = o(t, !0);do if (n = c(r, e)) return n.get; while (r = u(r));
        } });
    }, { 109: 109, 110: 110, 28: 28, 32: 32, 69: 69, 70: 70, 74: 74 }], 271: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(109),
          o = t(110),
          u = t(74),
          c = t(70).f;t(28) && e(e.P + t(69), "Object", { __lookupSetter__: function __lookupSetter__(t) {
          var n,
              r = i(this),
              e = o(t, !0);do if (n = c(r, e)) return n.set; while (r = u(r));
        } });
    }, { 109: 109, 110: 110, 28: 28, 32: 32, 69: 69, 70: 70, 74: 74 }], 272: [function (t, n, r) {
      var e = t(32),
          i = t(79)(!1);e(e.S, "Object", { values: function values(t) {
          return i(t);
        } });
    }, { 32: 32, 79: 79 }], 273: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(38),
          o = t(23),
          u = t(64)(),
          c = t(117)("observable"),
          f = t(3),
          a = t(7),
          s = t(6),
          l = t(86),
          h = t(40),
          v = t(37),
          p = v.RETURN,
          d = function d(t) {
        return null == t ? void 0 : f(t);
      },
          y = function y(t) {
        var n = t._c;n && (t._c = void 0, n());
      },
          g = function g(t) {
        return void 0 === t._o;
      },
          b = function b(t) {
        g(t) || (t._o = void 0, y(t));
      },
          x = function x(t, n) {
        a(t), this._c = void 0, this._o = t, t = new m(this);try {
          var r = n(t),
              e = r;null != r && ("function" == typeof r.unsubscribe ? r = function () {
            e.unsubscribe();
          } : f(r), this._c = r);
        } catch (i) {
          return void t.error(i);
        }g(this) && y(this);
      };x.prototype = l({}, { unsubscribe: function unsubscribe() {
          b(this);
        } });var m = function m(t) {
        this._s = t;
      };m.prototype = l({}, { next: function next(t) {
          var n = this._s;if (!g(n)) {
            var r = n._o;try {
              var e = d(r.next);if (e) return e.call(r, t);
            } catch (i) {
              try {
                b(n);
              } finally {
                throw i;
              }
            }
          }
        }, error: function error(t) {
          var n = this._s;if (g(n)) throw t;var r = n._o;n._o = void 0;try {
            var e = d(r.error);if (!e) throw t;t = e.call(r, t);
          } catch (i) {
            try {
              y(n);
            } finally {
              throw i;
            }
          }return y(n), t;
        }, complete: function complete(t) {
          var n = this._s;if (!g(n)) {
            var r = n._o;n._o = void 0;try {
              var e = d(r.complete);t = e ? e.call(r, t) : void 0;
            } catch (i) {
              try {
                y(n);
              } finally {
                throw i;
              }
            }return y(n), t;
          }
        } });var w = function Observable(t) {
        s(this, w, "Observable", "_f")._f = f(t);
      };l(w.prototype, { subscribe: function subscribe(t) {
          return new x(t, this._f);
        }, forEach: function forEach(t) {
          var n = this;return new (o.Promise || i.Promise)(function (r, e) {
            f(t);var i = n.subscribe({ next: function next(n) {
                try {
                  return t(n);
                } catch (r) {
                  e(r), i.unsubscribe();
                }
              }, error: e, complete: r });
          });
        } }), l(w, { from: function from(t) {
          var n = "function" == typeof this ? this : w,
              r = d(a(t)[c]);if (r) {
            var e = a(r.call(t));return e.constructor === n ? e : new n(function (t) {
              return e.subscribe(t);
            });
          }return new n(function (n) {
            var r = !1;return u(function () {
              if (!r) {
                try {
                  if (v(t, !1, function (t) {
                    return n.next(t), r ? p : void 0;
                  }) === p) return;
                } catch (e) {
                  if (r) throw e;return void n.error(e);
                }n.complete();
              }
            }), function () {
              r = !0;
            };
          });
        }, of: function of() {
          for (var t = 0, n = arguments.length, r = Array(n); n > t;) r[t] = arguments[t++];return new ("function" == typeof this ? this : w)(function (t) {
            var n = !1;return u(function () {
              if (!n) {
                for (var e = 0; e < r.length; ++e) if ((t.next(r[e]), n)) return;t.complete();
              }
            }), function () {
              n = !0;
            };
          });
        } }), h(w.prototype, c, function () {
        return this;
      }), e(e.G, { Observable: w }), t(91)("Observable");
    }, { 117: 117, 23: 23, 3: 3, 32: 32, 37: 37, 38: 38, 40: 40, 6: 6, 64: 64, 7: 7, 86: 86, 91: 91 }], 274: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = e.key,
          u = e.set;e.exp({ defineMetadata: function defineMetadata(t, n, r, e) {
          u(t, n, i(r), o(e));
        } });
    }, { 63: 63, 7: 7 }], 275: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = e.key,
          u = e.map,
          c = e.store;e.exp({ deleteMetadata: function deleteMetadata(t, n) {
          var r = arguments.length < 3 ? void 0 : o(arguments[2]),
              e = u(i(n), r, !1);if (void 0 === e || !e["delete"](t)) return !1;if (e.size) return !0;var f = c.get(n);return f["delete"](r), !!f.size || c["delete"](n);
        } });
    }, { 63: 63, 7: 7 }], 276: [function (t, n, r) {
      var e = t(221),
          i = t(10),
          o = t(63),
          u = t(7),
          c = t(74),
          f = o.keys,
          a = o.key,
          s = function s(t, n) {
        var r = f(t, n),
            o = c(t);if (null === o) return r;var u = s(o, n);return u.length ? r.length ? i(new e(r.concat(u))) : u : r;
      };o.exp({ getMetadataKeys: function getMetadataKeys(t) {
          return s(u(t), arguments.length < 2 ? void 0 : a(arguments[1]));
        } });
    }, { 10: 10, 221: 221, 63: 63, 7: 7, 74: 74 }], 277: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = t(74),
          u = e.has,
          c = e.get,
          f = e.key,
          a = function a(_x9, _x10, _x11) {
        var _again4 = true;
  
        _function4: while (_again4) {
          var t = _x9,
              n = _x10,
              r = _x11;
          _again4 = false;
          var e = u(t, n, r);if (e) return c(t, n, r);var i = o(n);if (null !== i) {
            _x9 = t;
            _x10 = i;
            _x11 = r;
            _again4 = true;
            e = i = undefined;
            continue _function4;
          } else {
            return void 0;
          }
        }
      };e.exp({ getMetadata: function getMetadata(t, n) {
          return a(t, i(n), arguments.length < 3 ? void 0 : f(arguments[2]));
        } });
    }, { 63: 63, 7: 7, 74: 74 }], 278: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = e.keys,
          u = e.key;e.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(t) {
          return o(i(t), arguments.length < 2 ? void 0 : u(arguments[1]));
        } });
    }, { 63: 63, 7: 7 }], 279: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = e.get,
          u = e.key;e.exp({ getOwnMetadata: function getOwnMetadata(t, n) {
          return o(t, i(n), arguments.length < 3 ? void 0 : u(arguments[2]));
        } });
    }, { 63: 63, 7: 7 }], 280: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = t(74),
          u = e.has,
          c = e.key,
          f = function f(_x12, _x13, _x14) {
        var _again5 = true;
  
        _function5: while (_again5) {
          var t = _x12,
              n = _x13,
              r = _x14;
          _again5 = false;
          var e = u(t, n, r);if (e) return !0;var i = o(n);if (null !== i) {
            _x12 = t;
            _x13 = i;
            _x14 = r;
            _again5 = true;
            e = i = undefined;
            continue _function5;
          } else {
            return !1;
          }
        }
      };e.exp({ hasMetadata: function hasMetadata(t, n) {
          return f(t, i(n), arguments.length < 3 ? void 0 : c(arguments[2]));
        } });
    }, { 63: 63, 7: 7, 74: 74 }], 281: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = e.has,
          u = e.key;e.exp({ hasOwnMetadata: function hasOwnMetadata(t, n) {
          return o(t, i(n), arguments.length < 3 ? void 0 : u(arguments[2]));
        } });
    }, { 63: 63, 7: 7 }], 282: [function (t, n, r) {
      var e = t(63),
          i = t(7),
          o = t(3),
          u = e.key,
          c = e.set;e.exp({ metadata: function metadata(t, n) {
          return function decorator(r, e) {
            c(t, n, (void 0 !== e ? i : o)(r), u(e));
          };
        } });
    }, { 3: 3, 63: 63, 7: 7 }], 283: [function (t, n, r) {
      var e = t(32);e(e.P + e.R, "Set", { toJSON: t(20)("Set") });
    }, { 20: 20, 32: 32 }], 284: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(97)(!0);e(e.P, "String", { at: function at(t) {
          return i(this, t);
        } });
    }, { 32: 32, 97: 97 }], 285: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(27),
          o = t(108),
          u = t(50),
          c = t(36),
          f = RegExp.prototype,
          a = function a(t, n) {
        this._r = t, this._s = n;
      };t(52)(a, "RegExp String", function next() {
        var t = this._r.exec(this._s);return { value: t, done: null === t };
      }), e(e.P, "String", { matchAll: function matchAll(t) {
          if ((i(this), !u(t))) throw TypeError(t + " is not a regexp!");var n = String(this),
              r = "flags" in f ? String(t.flags) : c.call(t),
              e = new RegExp(t.source, ~r.indexOf("g") ? r : "g" + r);return e.lastIndex = o(t.lastIndex), new a(e, n);
        } });
    }, { 108: 108, 27: 27, 32: 32, 36: 36, 50: 50, 52: 52 }], 286: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(100);e(e.P, "String", { padEnd: function padEnd(t) {
          return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !1);
        } });
    }, { 100: 100, 32: 32 }], 287: [function (t, n, r) {
      "use strict";var e = t(32),
          i = t(100);e(e.P, "String", { padStart: function padStart(t) {
          return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !0);
        } });
    }, { 100: 100, 32: 32 }], 288: [function (t, n, r) {
      "use strict";t(102)("trimLeft", function (t) {
        return function trimLeft() {
          return t(this, 1);
        };
      }, "trimStart");
    }, { 102: 102 }], 289: [function (t, n, r) {
      "use strict";t(102)("trimRight", function (t) {
        return function trimRight() {
          return t(this, 2);
        };
      }, "trimEnd");
    }, { 102: 102 }], 290: [function (t, n, r) {
      t(115)("asyncIterator");
    }, { 115: 115 }], 291: [function (t, n, r) {
      t(115)("observable");
    }, { 115: 115 }], 292: [function (t, n, r) {
      var e = t(32);e(e.S, "System", { global: t(38) });
    }, { 32: 32, 38: 38 }], 293: [function (t, n, r) {
      for (var e = t(131), i = t(87), o = t(38), u = t(40), c = t(56), f = t(117), a = f("iterator"), s = f("toStringTag"), l = c.Array, h = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], v = 0; 5 > v; v++) {
        var p,
            d = h[v],
            y = o[d],
            g = y && y.prototype;if (g) {
          g[a] || u(g, a, l), g[s] || u(g, s, d), c[d] = l;for (p in e) g[p] || i(g, p, e[p], !0);
        }
      }
    }, { 117: 117, 131: 131, 38: 38, 40: 40, 56: 56, 87: 87 }], 294: [function (t, n, r) {
      var e = t(32),
          i = t(104);e(e.G + e.B, { setImmediate: i.set, clearImmediate: i.clear });
    }, { 104: 104, 32: 32 }], 295: [function (t, n, r) {
      var e = t(38),
          i = t(32),
          o = t(44),
          u = t(83),
          c = e.navigator,
          f = !!c && /MSIE .\./.test(c.userAgent),
          a = function a(t) {
        return f ? function (n, r) {
          return t(o(u, [].slice.call(arguments, 2), "function" == typeof n ? n : Function(n)), r);
        } : t;
      };i(i.G + i.B + i.F * f, { setTimeout: a(e.setTimeout), setInterval: a(e.setInterval) });
    }, { 32: 32, 38: 38, 44: 44, 83: 83 }], 296: [function (t, n, r) {
      t(244), t(181), t(183), t(182), t(185), t(187), t(192), t(186), t(184), t(194), t(193), t(189), t(190), t(188), t(180), t(191), t(195), t(196), t(147), t(149), t(148), t(198), t(197), t(168), t(178), t(179), t(169), t(170), t(171), t(172), t(173), t(174), t(175), t(176), t(177), t(151), t(152), t(153), t(154), t(155), t(156), t(157), t(158), t(159), t(160), t(161), t(162), t(163), t(164), t(165), t(166), t(167), t(231), t(236), t(243), t(234), t(226), t(227), t(232), t(237), t(239), t(222), t(223), t(224), t(225), t(228), t(229), t(230), t(233), t(235), t(238), t(240), t(241), t(242), t(142), t(144), t(143), t(146), t(145), t(130), t(128), t(135), t(132), t(138), t(140), t(127), t(134), t(124), t(139), t(122), t(137), t(136), t(129), t(133), t(121), t(123), t(126), t(125), t(141), t(131), t(214), t(220), t(215), t(216), t(217), t(218), t(219), t(199), t(150), t(221), t(256), t(257), t(245), t(246), t(251), t(254), t(255), t(249), t(252), t(250), t(253), t(247), t(248), t(200), t(201), t(202), t(203), t(204), t(207), t(205), t(206), t(208), t(209), t(210), t(211), t(213), t(212), t(258), t(284), t(287), t(286), t(288), t(289), t(285), t(290), t(291), t(269), t(272), t(268), t(266), t(267), t(270), t(271), t(261), t(283), t(292), t(260), t(262), t(264), t(263), t(265), t(274), t(275), t(277), t(276), t(279), t(278), t(280), t(281), t(282), t(259), t(273), t(295), t(294), t(293), n.exports = t(23);
    }, { 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 128: 128, 129: 129, 130: 130, 131: 131, 132: 132, 133: 133, 134: 134, 135: 135, 136: 136, 137: 137, 138: 138, 139: 139, 140: 140, 141: 141, 142: 142, 143: 143, 144: 144, 145: 145, 146: 146, 147: 147, 148: 148, 149: 149, 150: 150, 151: 151, 152: 152, 153: 153, 154: 154, 155: 155, 156: 156, 157: 157, 158: 158, 159: 159, 160: 160, 161: 161, 162: 162, 163: 163, 164: 164, 165: 165, 166: 166, 167: 167, 168: 168, 169: 169, 170: 170, 171: 171, 172: 172, 173: 173, 174: 174, 175: 175, 176: 176, 177: 177, 178: 178, 179: 179, 180: 180, 181: 181, 182: 182, 183: 183, 184: 184, 185: 185, 186: 186, 187: 187, 188: 188, 189: 189, 190: 190, 191: 191, 192: 192, 193: 193, 194: 194, 195: 195, 196: 196, 197: 197, 198: 198, 199: 199, 200: 200, 201: 201, 202: 202, 203: 203, 204: 204, 205: 205, 206: 206, 207: 207, 208: 208, 209: 209, 210: 210, 211: 211, 212: 212, 213: 213, 214: 214, 215: 215, 216: 216, 217: 217, 218: 218, 219: 219, 220: 220, 221: 221, 222: 222, 223: 223, 224: 224, 225: 225, 226: 226, 227: 227, 228: 228, 229: 229, 23: 23, 230: 230, 231: 231, 232: 232, 233: 233, 234: 234, 235: 235, 236: 236, 237: 237, 238: 238, 239: 239, 240: 240, 241: 241, 242: 242, 243: 243, 244: 244, 245: 245, 246: 246, 247: 247, 248: 248, 249: 249, 250: 250, 251: 251, 252: 252, 253: 253, 254: 254, 255: 255, 256: 256, 257: 257, 258: 258, 259: 259, 260: 260, 261: 261, 262: 262, 263: 263, 264: 264, 265: 265, 266: 266, 267: 267, 268: 268, 269: 269, 270: 270, 271: 271, 272: 272, 273: 273, 274: 274, 275: 275, 276: 276, 277: 277, 278: 278, 279: 279, 280: 280, 281: 281, 282: 282, 283: 283, 284: 284, 285: 285, 286: 286, 287: 287, 288: 288, 289: 289, 290: 290, 291: 291, 292: 292, 293: 293, 294: 294, 295: 295 }], 297: [function (t, n, r) {
      (function (t) {
        !(function (t) {
          "use strict";function wrap(t, n, r, e) {
            var i = Object.create((n || Generator).prototype),
                o = new Context(e || []);return i._invoke = makeInvokeMethod(t, r, o), i;
          }function tryCatch(t, n, r) {
            try {
              return { type: "normal", arg: t.call(n, r) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}function defineIteratorMethods(t) {
            ["next", "throw", "return"].forEach(function (n) {
              t[n] = function (t) {
                return this._invoke(n, t);
              };
            });
          }function AwaitArgument(t) {
            this.arg = t;
          }function AsyncIterator(t) {
            function invoke(n, r, e, i) {
              var o = tryCatch(t[n], t, r);if ("throw" !== o.type) {
                var u = o.arg,
                    c = u.value;return c instanceof AwaitArgument ? Promise.resolve(c.arg).then(function (t) {
                  invoke("next", t, e, i);
                }, function (t) {
                  invoke("throw", t, e, i);
                }) : Promise.resolve(c).then(function (t) {
                  u.value = t, e(u);
                }, i);
              }i(o.arg);
            }function enqueue(t, r) {
              function callInvokeWithMethodAndArg() {
                return new Promise(function (n, e) {
                  invoke(t, r, n, e);
                });
              }return n = n ? n.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }"object" == typeof process && process.domain && (invoke = process.domain.bind(invoke));var n;this._invoke = enqueue;
          }function makeInvokeMethod(t, n, e) {
            var i = a;return function invoke(o, u) {
              if (i === l) throw new Error("Generator is already running");if (i === h) {
                if ("throw" === o) throw u;return doneResult();
              }for (;;) {
                var c = e.delegate;if (c) {
                  if ("return" === o || "throw" === o && c.iterator[o] === r) {
                    e.delegate = null;var f = c.iterator["return"];if (f) {
                      var p = tryCatch(f, c.iterator, u);if ("throw" === p.type) {
                        o = "throw", u = p.arg;continue;
                      }
                    }if ("return" === o) continue;
                  }var p = tryCatch(c.iterator[o], c.iterator, u);if ("throw" === p.type) {
                    e.delegate = null, o = "throw", u = p.arg;continue;
                  }o = "next", u = r;var d = p.arg;if (!d.done) return i = s, d;e[c.resultName] = d.value, e.next = c.nextLoc, e.delegate = null;
                }if ("next" === o) e.sent = e._sent = u;else if ("throw" === o) {
                  if (i === a) throw (i = h, u);e.dispatchException(u) && (o = "next", u = r);
                } else "return" === o && e.abrupt("return", u);i = l;var p = tryCatch(t, n, e);if ("normal" === p.type) {
                  i = e.done ? h : s;var d = { value: p.arg, done: e.done };if (p.arg !== v) return d;e.delegate && "next" === o && (u = r);
                } else "throw" === p.type && (i = h, o = "throw", u = p.arg);
              }
            };
          }function pushTryEntry(t) {
            var n = { tryLoc: t[0] };1 in t && (n.catchLoc = t[1]), 2 in t && (n.finallyLoc = t[2], n.afterLoc = t[3]), this.tryEntries.push(n);
          }function resetTryEntry(t) {
            var n = t.completion || {};n.type = "normal", delete n.arg, t.completion = n;
          }function Context(t) {
            this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0);
          }function values(t) {
            if (t) {
              var n = t[o];if (n) return n.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
                var i = -1,
                    u = function next() {
                  for (; ++i < t.length;) if (e.call(t, i)) return next.value = t[i], next.done = !1, next;return next.value = r, next.done = !0, next;
                };return u.next = u;
              }
            }return { next: doneResult };
          }function doneResult() {
            return { value: r, done: !0 };
          }var r,
              e = Object.prototype.hasOwnProperty,
              i = "function" == typeof Symbol ? Symbol : {},
              o = i.iterator || "@@iterator",
              u = i.toStringTag || "@@toStringTag",
              c = "object" == typeof n,
              f = t.regeneratorRuntime;if (f) return void (c && (n.exports = f));f = t.regeneratorRuntime = c ? n.exports : {}, f.wrap = wrap;var a = "suspendedStart",
              s = "suspendedYield",
              l = "executing",
              h = "completed",
              v = {},
              p = GeneratorFunctionPrototype.prototype = Generator.prototype;GeneratorFunction.prototype = p.constructor = GeneratorFunctionPrototype, GeneratorFunctionPrototype.constructor = GeneratorFunction, GeneratorFunctionPrototype[u] = GeneratorFunction.displayName = "GeneratorFunction", f.isGeneratorFunction = function (t) {
            var n = "function" == typeof t && t.constructor;return n ? n === GeneratorFunction || "GeneratorFunction" === (n.displayName || n.name) : !1;
          }, f.mark = function (t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, u in t || (t[u] = "GeneratorFunction")), t.prototype = Object.create(p), t;
          }, f.awrap = function (t) {
            return new AwaitArgument(t);
          }, defineIteratorMethods(AsyncIterator.prototype), f.async = function (t, n, r, e) {
            var i = new AsyncIterator(wrap(t, n, r, e));return f.isGeneratorFunction(n) ? i : i.next().then(function (t) {
              return t.done ? t.value : i.next();
            });
          }, defineIteratorMethods(p), p[o] = function () {
            return this;
          }, p[u] = "Generator", p.toString = function () {
            return "[object Generator]";
          }, f.keys = function (t) {
            var n = [];for (var r in t) n.push(r);return n.reverse(), function next() {
              for (; n.length;) {
                var r = n.pop();if (r in t) return next.value = r, next.done = !1, next;
              }return next.done = !0, next;
            };
          }, f.values = values, Context.prototype = { constructor: Context, reset: function reset(t) {
              if ((this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.tryEntries.forEach(resetTryEntry), !t)) for (var n in this) "t" === n.charAt(0) && e.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = r);
            }, stop: function stop() {
              this.done = !0;var t = this.tryEntries[0],
                  n = t.completion;if ("throw" === n.type) throw n.arg;return this.rval;
            }, dispatchException: function dispatchException(t) {
              function handle(r, e) {
                return o.type = "throw", o.arg = t, n.next = r, !!e;
              }if (this.done) throw t;for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
                var i = this.tryEntries[r],
                    o = i.completion;if ("root" === i.tryLoc) return handle("end");if (i.tryLoc <= this.prev) {
                  var u = e.call(i, "catchLoc"),
                      c = e.call(i, "finallyLoc");if (u && c) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  } else if (u) {
                    if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                  } else {
                    if (!c) throw new Error("try statement without catch or finally");if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                  }
                }
              }
            }, abrupt: function abrupt(t, n) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var i = this.tryEntries[r];if (i.tryLoc <= this.prev && e.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                  var o = i;break;
                }
              }o && ("break" === t || "continue" === t) && o.tryLoc <= n && n <= o.finallyLoc && (o = null);var u = o ? o.completion : {};return u.type = t, u.arg = n, o ? this.next = o.finallyLoc : this.complete(u), v;
            }, complete: function complete(t, n) {
              if ("throw" === t.type) throw t.arg;"break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = t.arg, this.next = "end") : "normal" === t.type && n && (this.next = n);
            }, finish: function finish(t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), v;
              }
            }, "catch": function _catch(t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];if (r.tryLoc === t) {
                  var e = r.completion;if ("throw" === e.type) {
                    var i = e.arg;resetTryEntry(r);
                  }return i;
                }
              }throw new Error("illegal catch attempt");
            }, delegateYield: function delegateYield(t, n, r) {
              return this.delegate = { iterator: values(t), resultName: n, nextLoc: r }, v;
            } };
        })("object" == typeof t ? t : "object" == typeof window ? window : "object" == typeof self ? self : this);
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {}] }, {}, [1]);

});

;/*!co*/
define('co', function(require, exports, module) {

  
  /**
   * slice() reference.
   */
  
  'use strict';
  
  var slice = Array.prototype.slice;
  
  /**
   * Expose `co`.
   */
  
  module.exports = co['default'] = co.co = co;
  
  /**
   * Wrap the given generator `fn` into a
   * function that returns a promise.
   * This is a separate function so that
   * every `co()` call doesn't create a new,
   * unnecessary closure.
   *
   * @param {GeneratorFunction} fn
   * @return {Function}
   * @api public
   */
  
  co.wrap = function (fn) {
    createPromise.__generatorFunction__ = fn;
    return createPromise;
    function createPromise() {
      return co.call(this, fn.apply(this, arguments));
    }
  };
  
  /**
   * Execute the generator function or a generator
   * and return a promise.
   *
   * @param {Function} fn
   * @return {Promise}
   * @api public
   */
  
  function co(gen) {
    var ctx = this;
    var args = slice.call(arguments, 1);
  
    // we wrap everything in a promise to avoid promise chaining,
    // which leads to memory leak errors.
    // see https://github.com/tj/co/issues/180
    return new Promise(function (resolve, reject) {
      if (typeof gen === 'function') gen = gen.apply(ctx, args);
      if (!gen || typeof gen.next !== 'function') return resolve(gen);
  
      onFulfilled();
  
      /**
       * @param {Mixed} res
       * @return {Promise}
       * @api private
       */
  
      function onFulfilled(res) {
        var ret;
        try {
          ret = gen.next(res);
        } catch (e) {
          return reject(e);
        }
        next(ret);
        return null;
      }
  
      /**
       * @param {Error} err
       * @return {Promise}
       * @api private
       */
  
      function onRejected(err) {
        var ret;
        try {
          ret = gen['throw'](err);
        } catch (e) {
          return reject(e);
        }
        next(ret);
      }
  
      /**
       * Get the next value in the generator,
       * return a promise.
       *
       * @param {Object} ret
       * @return {Promise}
       * @api private
       */
  
      function next(ret) {
        if (ret.done) return resolve(ret.value);
        var value = toPromise.call(ctx, ret.value);
        if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
        return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' + 'but the following object was passed: "' + String(ret.value) + '"'));
      }
    });
  }
  
  /**
   * Convert a `yield`ed value into a promise.
   *
   * @param {Mixed} obj
   * @return {Promise}
   * @api private
   */
  
  function toPromise(obj) {
    if (!obj) return obj;
    if (isPromise(obj)) return obj;
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
    if ('function' == typeof obj) return thunkToPromise.call(this, obj);
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
    if (isObject(obj)) return objectToPromise.call(this, obj);
    return obj;
  }
  
  /**
   * Convert a thunk to a promise.
   *
   * @param {Function}
   * @return {Promise}
   * @api private
   */
  
  function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
      fn.call(ctx, function (err, res) {
        if (err) return reject(err);
        if (arguments.length > 2) res = slice.call(arguments, 1);
        resolve(res);
      });
    });
  }
  
  /**
   * Convert an array of "yieldables" to a promise.
   * Uses `Promise.all()` internally.
   *
   * @param {Array} obj
   * @return {Promise}
   * @api private
   */
  
  function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
  }
  
  /**
   * Convert an object of "yieldables" to a promise.
   * Uses `Promise.all()` internally.
   *
   * @param {Object} obj
   * @return {Promise}
   * @api private
   */
  
  function objectToPromise(obj) {
    var results = new obj.constructor();
    var keys = Object.keys(obj);
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var promise = toPromise.call(this, obj[key]);
      if (promise && isPromise(promise)) defer(promise, key);else results[key] = obj[key];
    }
    return Promise.all(promises).then(function () {
      return results;
    });
  
    function defer(promise, key) {
      // predefine the key in the result
      results[key] = undefined;
      promises.push(promise.then(function (res) {
        results[key] = res;
      }));
    }
  }
  
  /**
   * Check if `obj` is a promise.
   *
   * @param {Object} obj
   * @return {Boolean}
   * @api private
   */
  
  function isPromise(obj) {
    return 'function' == typeof obj.then;
  }
  
  /**
   * Check if `obj` is a generator.
   *
   * @param {Mixed} obj
   * @return {Boolean}
   * @api private
   */
  
  function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj['throw'];
  }
  
  /**
   * Check if `obj` is a generator function.
   *
   * @param {Mixed} obj
   * @return {Boolean}
   * @api private
   */
  
  function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
  }
  
  /**
   * Check for plain object.
   *
   * @param {Mixed} val
   * @return {Boolean}
   * @api private
   */
  
  function isObject(val) {
    return Object == val.constructor;
  }

});

;/*!g*/
define('g', function(require, exports, module) {

  /**
   * G for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/g
   */
  
  'use strict';
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var G = (function () {
      function G() {
          _classCallCheck(this, G);
      }
  
      _createClass(G, [{
          key: 'map',
  
          /**
           * 为一组数据生成Map
           * @param   {Array}     arr   数据数组
           * @param   {String}    key   数据子对象的key
           * @param   {Function}  fn    处理key值的回调
           * @return  {Object}          生成的Map
           * @example this.map()
           */
          value: function map(arr, key, fn) {
              var map = {};
              arr.forEach(function (item) {
                  fn ?
                  // 存在fn时
                  map[item[key]] = fn(item) :
                  // 不存在fn时，返回item自身
                  map[item[key]] = item;
              });
              return map;
          }
  
          /**
           * Map => Array
           * @param   {Object}   map Map数据
           * @param   {Function} fn  处理数据的回调
           * @return  {Array}        处理后的数组
           * @example this.toArray({a:1}, (key, value) => {return key}) ==> ['a']
           * @example this.toArray({a:1}, (key, value) => {return value}) ==> [1]
           */
      }, {
          key: 'toArray',
          value: function toArray(map, fn) {
              var key;
              var array = [];
              for (key in map) {
                  array.push(fn(key, map[key]));
              }
              return array;
          }
  
          /**
           * 获取一个Map的key的数组
           * @param   {Object}   map Map对象
           * @param   {Function} fn  对key的处理回调
           * @return  {Array}       包装后的数组
           * @example this.getKeyArray({a:1, b:2}) => ['a', 'b']
           */
      }, {
          key: 'getKeyArray',
          value: function getKeyArray(map, fn) {
              return this.toArray(map, function (key, value) {
                  return fn ? fn(key) : key;
              });
          }
  
          /**
           * 获取一个Map的value的数组
           * @param   {Object}   map Map对象
           * @param   {Function} fn  对value的处理回调
           * @return  {Array}       包装后的数组
           * @example this.getValueArray({a:1, b:2}) => [1, 2]
           */
      }, {
          key: 'getValueArray',
          value: function getValueArray(map, fn) {
              return this.toArray(map, function (key, value) {
                  return fn ? fn(value) : value;
              });
          }
      }]);
  
      return G;
  })();
  
  var g = new G();
  g.G = G;
  module.exports = g['default'] = g;

});

;/*!loading2*/
define('loading2', function(require, exports, module) {

  /*!
   * loading2 For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-07-27
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _loading2Jade = require('src/modules/loading2/loading2.jade');
  
  var _loading2Jade2 = _interopRequireDefault(_loading2Jade);
  
  var loading2 = (function (_App) {
      _inherits(loading2, _App);
  
      function loading2() {
          _classCallCheck(this, loading2);
  
          _get(Object.getPrototypeOf(loading2.prototype), 'constructor', this).call(this);
          this.name = 'loading2';
          this.template = _loading2Jade2['default'];
      }
  
      // app渲染到页面之前执行，用于预处理渲染内容
  
      _createClass(loading2, [{
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }, {
          key: 'msg',
          value: function msg(val) {
              this.find('.msg').text(val);
              return this;
          }
      }, {
          key: 'center',
          value: function center() {
              var top = -this.getApp().height() / 2 + 'px';
              var left = -this.getApp().width() / 2 + 'px';
              this.getApp().addClass('ap').css({ marginLeft: left, marginTop: top });
              return this;
          }
      }]);
  
      return loading2;
  })(_app2['default']);
  
  exports['default'] = loading2;
  module.exports = exports['default'];

});

;/*!md5*/
define('md5', function(require, exports, module) {

  /*
   * JavaScript MD5
   * https://github.com/blueimp/JavaScript-MD5
   *
   * Copyright 2011, Sebastian Tschan
   * https://blueimp.net
   *
   * Licensed under the MIT license:
   * http://www.opensource.org/licenses/MIT
   *
   * Based on
   * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
   * Digest Algorithm, as defined in RFC 1321.
   * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
   * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
   * Distributed under the BSD License
   * See http://pajhome.org.uk/crypt/md5 for more info.
   */
  
  /*global unescape, define, module */
  
  'use strict';
  
  ;(function ($) {
    'use strict';
  
    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    }
  
    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
  
    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn(b & c | ~b & d, a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn(b & d | c & ~d, a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
    }
  
    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << len % 32;
      x[(len + 64 >>> 9 << 4) + 14] = len;
  
      var i;
      var olda;
      var oldb;
      var oldc;
      var oldd;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
  
      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
  
        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
  
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
  
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
  
        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
  
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return [a, b, c, d];
    }
  
    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
      var i;
      var output = '';
      for (i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
      }
      return output;
    }
  
    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
      var i;
      var output = [];
      output[(input.length >> 2) - 1] = undefined;
      for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
      }
      for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;
      }
      return output;
    }
  
    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
      return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }
  
    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
      var i;
      var bkey = rstr2binl(key);
      var ipad = [];
      var opad = [];
      var hash;
      ipad[15] = opad[15] = undefined;
      if (bkey.length > 16) {
        bkey = binl_md5(bkey, key.length * 8);
      }
      for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }
      hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
      return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }
  
    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
      var hex_tab = '0123456789abcdef';
      var output = '';
      var x;
      var i;
      for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
      }
      return output;
    }
  
    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
      return unescape(encodeURIComponent(input));
    }
  
    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
      return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
      return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
      return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
      return rstr2hex(raw_hmac_md5(k, d));
    }
  
    function md5(string, key, raw) {
      if (!key) {
        if (!raw) {
          return hex_md5(string);
        }
        return raw_md5(string);
      }
      if (!raw) {
        return hex_hmac_md5(key, string);
      }
      return raw_hmac_md5(key, string);
    }
  
    if (typeof define === 'function' && define.amd) {
      define(function () {
        return md5;
      });
    } else if (typeof module === 'object' && module.exports) {
      module.exports = md5;
    } else {
      $.md5 = md5;
    }
  })(undefined);

});

;/*!page*/
define('page', function(require, exports, module) {

  /**
   * Page for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/page
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pm = require('pm');
  
  var _pm2 = _interopRequireDefault(_pm);
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _class = require('class');
  
  var _class2 = _interopRequireDefault(_class);
  
  var page = undefined,
      zeptoArray = undefined;
  
  var Privates = (function () {
      function Privates() {
          _classCallCheck(this, Privates);
      }
  
      _createClass(Privates, [{
          key: 'renderId',
          value: function renderId() {
              return page.renderString + page.name;
          }
  
          // Mockjs 模拟数据，仅用于测试
      }, {
          key: 'mock',
          value: function mock(fn) {
              var mock = require('mock').mock;
              var data = require(['pages',page.name,page.name + '.json.js'].join('/'));
  
              fn(mock(data));
              console.log('data corss mock.');
          }
  
          // Mock or ajax
      }, {
          key: 'ajax',
          value: function ajax(fn) {
              var p, options;
              // 获取ajax配置
              options = this.ajaxOptions();
              // 配置不为空时
              if (options.length) {
                  p = options.map(function (conf) {
                      return new Promise(function (res, rej) {
                          conf.success = res;
                          conf.error = rej;
                          $.ajax(conf);
                      });
                  });
                  Promise.all(p).then(function (arr) {
                      arr.length === 1 ? fn(arr[0]) : fn(arr);
                  });
              }
              // 配置为空时返回自定义数据
              else {
                      this.mock(fn);
                  }
          }
      }, {
          key: 'ajaxOptions',
          value: function ajaxOptions() {
              var configs = [],
                  arr,
                  def;
  
              if (!page.ajaxconfig) {
                  return configs;
              }
  
              Array.isArray(page.ajaxconfig) ? arr = page.ajaxconfig : arr = [page.ajaxconfig];
  
              // 检查是否是有效的ajax配置
              arr.forEach(function (conf) {
                  // 检查ajax url地址
                  if (conf.url && conf.url !== '/tmp/test.json') {
                      configs.push(conf);
                  }
              });
  
              return configs;
          }
  
          // 内部使用，不允许覆盖
      }, {
          key: 'prerender',
          value: function prerender(data, page) {
              page.addClass('page-' + page.name);
          }
  
          // 内部使用，不允许覆盖
      }, {
          key: 'postrender',
          value: function postrender(data, page) {}
  
          // 执行处理app.pagerender
      }, {
          key: 'pagerender',
          value: function pagerender(page) {
              var map, arr;
              map = page.app;
              for (var key in map) {
                  arr = map[key];
                  arr.forEach(function (app) {
                      app.pagerender(app);
                  });
              }
          }
      }]);
  
      return Privates;
  })();
  
  var privates = new Privates();
  
  var Page = (function (_Base) {
      _inherits(Page, _Base);
  
      function Page() {
          _classCallCheck(this, Page);
  
          _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this);
          this.app = {};
          this.guid = (0, _guid2['default'])();
          this.aimee = { page: true };
          this.renderString = 'lincoapp-page-';
          // 页面显示状态
          this.display = false;
      }
  
      // 页面实例初始化方法
  
      _createClass(Page, [{
          key: 'init',
          value: function init(selector) {
              page = this;
              this.onload();
              this.render(selector);
              this.inited = true;
              return this;
          }
  
          // 页面注册 => PM
      }, {
          key: 'reg',
          value: function reg(id) {
              this._id = id || '/' + this.name;
              _pm2['default'].reg(this);
              return this;
          }
  
          // 页面加载 => PM
      }, {
          key: 'load',
          value: function load() {
              // 更新目标页面状态
              this.display = true;
              // 加载页面
              this.inited ? this.getPage().show() : this.init();
              // 执行用户自定义enter操作
              this.enter();
              return this;
          }
  
          // 页面离开 => PM
      }, {
          key: 'unload',
          value: function unload() {
              // 更新目标页面状态
              this.display = false;
              // 页面隐藏
              this.getPage().hide();
              // 执行用户自定义leave操作
              this.leave();
              return this;
          }
  
          // 页面重载
      }, {
          key: 'reload',
          value: function reload() {
              // 重载页面
              this.init('.page-' + this.name);
              return this;
          }
  
          /**
           * 批量绑定事件
           * @param   {Object}  events 事件对象模型
           * @example
           * this.bind({
           * 		'click@.lincoapp-footer': () => {
           * 			// do something
           * 		}
           * 		'click, focus@.lincoapp-comment': () => {
           * 			// do something
           * 		}
           * })
           */
      }, {
          key: 'bind',
          value: function bind(events) {
              var _this = this;
  
              events = events || {};
              $.each(events, function (key, fn) {
                  var pair = key.split('@');
                  var evts = pair[0].split(/,\s*/g);
                  evts.forEach(function (type) {
                      _this.on(type, pair[1], fn);
                  });
              });
          }
  
          // 渲染到页面
      }, {
          key: 'render',
          value: function render(selector) {
              var page = this;
              privates.ajax(function (data) {
                  // 缓存页面jQuery对象
                  page._page = $(page.template(data));
  
                  // 预处理, From System
                  privates.prerender(data, page);
  
                  // 用户自定义操作, From User
                  page.include(data, page);
  
                  // 预处理, From User
                  page.prerender(data, page);
  
                  // 检查是否默认显示
                  if (!page.display) {
                      page._page.hide();
                  };
  
                  // 页面渲染 page.render
                  $(selector || '#' + privates.renderId()).replaceWith(page._page);
  
                  // 后处理, From App
                  privates.pagerender(page);
  
                  // 后处理, From System
                  privates.postrender(data, page);
  
                  // 后处理, From User
                  page.postrender(data, page);
              });
          }
      }, {
          key: 'getPage',
          value: function getPage() {
              return this._page || [];
          }
  
          // 底层框架的调用入口
          // 类似：$(parent).find(child)
      }, {
          key: 'find',
          value: function find(selector) {
              return this.getPage().find(selector);
          }
      }, {
          key: 'export',
          value: function _export(App, fn) {
              var data = {};
              var app = new App();
  
              // 检查简单调用
              // data === fn
              if (typeof fn === 'object') {
                  data = fn;
                  fn = null;
              };
  
              // 检查重复加载
              if (this.app[app.guid]) {
                  return console.error(app.guid + ' is exist');
              };
  
              // 缓存app对象到页面
              this.app[app.name] ? '' : this.app[app.name] = [];
              this.app[app.name].push(app);
              // 定义get方法用于获取app实例
              this.app[app.name].get = function (index, fn) {
                  if (typeof index === 'function') {
                      fn = index;
                      index = 0;
                  }
  
                  if (typeof fn === 'function') {
                      fn.call(this[index], this[index]);
                  } else {
                      return this[typeof index === 'number' ? index : 0];
                  }
              };
  
              // 存储需要添加的属性
              // 标记当前app在同类app数组中的位置
              app.__attr ? '' : app.__attr = {};
              app.__attr['data-code'] = this.app[app.name].length - 1;
  
              // 缓存引用页面对象
              app.page = this;
              app.parent = this;
  
              // 缓存pm对象
              app.pm = this.pm;
  
              // 没有回调时自动渲染，仅用于开发测试环境
              fn ? fn.call(app, app, this) : app.init(data).render();
  
              if (!fn) {
                  return app;
              }
          }
  
          /**
           * 页面调用模块的推荐方法，使用该方法调用的模块会被缓存到page.app对象中，方面后续直接引用或调试
           * @param  {String [|| Array || Function]}   id 推荐参数，为模块id，字符串
           * @param  {Function} 						 fn 回调，参数返回当前模块app对象
           */
      }, {
          key: 'exports',
          value: function exports(id, fn) {
              var App,
                  app,
                  self = this;
  
              // id === string
              if (typeof id === 'string') {
                  // 多个组件调用，返回page对象
                  if (id.split(' ').length > 1) {
                      this.exports(id.split(' '), fn);
                      return this;
                  }
                  // 单个组件调用返回app对象
                  else {
                          return this['export'](aimee.virtualMap[id] || require(id), fn);
                      }
              }
  
              // id === aimee.app
              // 单个组件调用返回app对象
              else if ($.type(id) === 'function' && id.aimee) {
                      return this['export'](id, fn);
                  }
  
                  // id === array
                  // 多个组件调用，返回page对象
                  else if (Array.isArray(id)) {
                          id.forEach(function (item) {
                              self['export'](aimee.virtualMap[item] || require(item), fn);
                          });
                          return this;
                      };
              return this;
          }
  
          /**
           * 查找页面中已被渲染的模块
           * @param  {String}   id    模块id
           * @param  {Number}   index 模块索引，同一页面对模块的调用会缓存在page.app[app.name]数组中
           * @param  {Function} fn    回调
           * @return {[type]}         当前页面对象
           */
      }, {
          key: 'search',
          value: function search(id, index, fn) {
              if (!index || index === 0) {
                  index = 0;
              }
  
              if (typeof index === 'function') {
                  fn = index;
                  index = 0;
              }
  
              if (fn) {
                  fn.call(this.app[id][index], this.app[id][index]);
              } else {
                  return this.app[id][index];
              }
          }
      }, {
          key: 'query',
          value: function query() {
              return this.search.apply(this, arguments);
          }
      }, {
          key: 'running',
          value: function running() {
              var page = this;
              Array.from(arguments).forEach(function (item) {
                  item.call(page);
              });
          }
  
          // 批量加载app
      }, {
          key: 'use',
          value: function use(id, fn) {
              var _this2 = this;
  
              if ($.isPlainObject(id)) {
                  // appname^Number 表示同一个app被多次使用，^Number仅作为标记，没有特殊意义
                  $.each(id, function (k, v) {
                      return _this2['export'](require(k.split('^')[0]), v);
                  });
                  return this;
              }
              if (fn) {
                  this['export'](require(id), fn);
                  return this;
              }
              var app = new (require(id))();
              // 缓存app对象到页面
              this.app[app.name] ? '' : this.app[app.name] = [];
              this.app[app.name].push(app);
              return app;
          }
  
          // Rewrite
  
          // 初始化后执行
      }, {
          key: 'onload',
          value: function onload() {}
  
          // 页面加载执行
      }, {
          key: 'enter',
          value: function enter() {}
  
          // 页面离开执行
      }, {
          key: 'leave',
          value: function leave() {}
  
          // 自定义操作
      }, {
          key: 'include',
          value: function include(data, page) {}
  
          // 页面回退执行
      }, {
          key: 'back',
          value: function back() {}
  
          // 预处理，页面渲染前执行
      }, {
          key: 'prerender',
          value: function prerender(data, page) {}
  
          // 后处理，页面渲染后执行
      }, {
          key: 'postrender',
          value: function postrender(data, page) {}
      }]);
  
      return Page;
  })(_class2['default']);
  
  Page.aimee = { page: true };
  
  // Method Extend From Zepto
  zeptoArray = 'show hide on off delegate undelegate addClass removeClass before after append prepend appendTo prependTo'.split(' ');
  zeptoArray.forEach(function (name) {
      Page.prototype[name] = function () {
          $.fn[name].apply(this.getPage(), arguments);
          return this;
      };
  });
  
  exports['default'] = Page;
  module.exports = exports['default'];

});

;/*!router*/
define('router', function(require, exports, module) {

  /**
   * Router for Aimeejs
   * Author by gavinning
   * Homepage https://github.com/Aimeejs/router
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pm = require('pm');
  
  var _pm2 = _interopRequireDefault(_pm);
  
  var Router = (function () {
      function Router() {
          _classCallCheck(this, Router);
      }
  
      _createClass(Router, [{
          key: 'option',
  
          // 页面路由注册
          value: function option(id, hash) {
              require(id).reg(hash);
              return this;
          }
  
          // 执行 pm.init()
      }, {
          key: 'action',
          value: function action(id) {
              var pages = [];
              _pm2['default'].pages.forEach(function (item) {
                  pages.push(['<gem id="lincoapp-page-', item.name, '"></gem>'].join(''));
              });
              $('.pages').html(pages.join('\n'));
              _pm2['default'].init();
          }
      }]);
  
      return Router;
  })();
  
  var router = new Router();
  router.Router = Router;
  exports['default'] = router;
  module.exports = exports['default'];

});

;/*!time/lib/format*/
define('time/lib/format', function(require, exports, module) {

  "use strict";
  
  module.exports = asString;
  asString.asString = asString;
  
  asString.ISO8601_FORMAT = "yyyy-MM-dd hh:mm:ss.SSS";
  asString.ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ssO";
  asString.DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
  asString.ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
  asString.TIMESTAMP = "yyyy-MM-dd hh:mm:ss";
  
  function padWithZeros(vNumber, width) {
    var numAsString = vNumber + "";
    while (numAsString.length < width) {
      numAsString = "0" + numAsString;
    }
    return numAsString;
  }
  
  function addZero(vNumber) {
    return padWithZeros(vNumber, 2);
  }
  
  /**
   * Formats the TimeOffest
   * Thanks to http://www.svendtofte.com/code/date_format/
   * @private
   */
  function offset(date) {
    // Difference to Greenwich time (GMT) in hours
    var os = Math.abs(date.getTimezoneOffset());
    var h = String(Math.floor(os / 60));
    var m = String(os % 60);
    if (h.length == 1) {
      h = "0" + h;
    }
    if (m.length == 1) {
      m = "0" + m;
    }
    return date.getTimezoneOffset() < 0 ? "+" + h + m : "-" + h + m;
  }
  
  function asString(date) {
    var format = asString.TIMESTAMP;
    if (typeof date === "string") {
      format = arguments[0];
      date = arguments[1];
    }
  
    if (!date) {
      date = new Date();
    }
  
    var vDay = addZero(date.getDate());
    var vMonth = addZero(date.getMonth() + 1);
    var vYearLong = addZero(date.getFullYear());
    var vYearShort = addZero(date.getFullYear().toString().substring(2, 4));
    var vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
    var vHour = addZero(date.getHours());
    var vMinute = addZero(date.getMinutes());
    var vSecond = addZero(date.getSeconds());
    var vMillisecond = padWithZeros(date.getMilliseconds(), 3);
    var vTimeZone = offset(date);
    var formatted = format.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear).replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond).replace(/SSS/g, vMillisecond).replace(/O/g, vTimeZone);
    return formatted;
  };
  
  asString.timestamp = function (date) {
    return asString(asString.TIMESTAMP, date || new Date());
  };

});

;/*!time*/
define('time', function(require, exports, module) {

  "use strict";
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var Time = (function () {
      function Time(options) {
          _classCallCheck(this, Time);
  
          this.Date = require('time/lib/format');
          this.TIMESTAMP = "yyyy-MM-dd hh:mm:ss";
          this.options = options || { format: this.TIMESTAMP };
      }
  
      _createClass(Time, [{
          key: "now",
          value: function now(string) {
              return this.Date(string || this.options.format);
          }
      }, {
          key: "get",
          value: function get(time, string) {
              return time instanceof Date ? this.Date(string || this.options.format, time) : this.Date(string || this.options.format, time ? new Date(time) : new Date());
          }
      }]);
  
      return Time;
  })();
  
  var time = new Time();
  Time.time = time;
  Time.now = function (s) {
      return time.now(s);
  };
  // export default Time;
  module.exports = Time;

});

;/*!zepto*/
define('zepto', function(require, exports, module) {

  /* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
  
  'use strict';
  
  var Zepto = (function () {
    var undefined,
        key,
        $,
        classList,
        emptyArray = [],
        _slice = emptyArray.slice,
        _filter = emptyArray.filter,
        document = window.document,
        elementDisplay = {},
        classCache = {},
        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rootNodeRE = /^(?:body|html)$/i,
        capitalRE = /([A-Z])/g,
  
    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
        adjacencyOperators = ['after', 'prepend', 'before', 'append'],
        table = document.createElement('table'),
        tableRow = document.createElement('tr'),
        containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
        readyRE = /complete|loaded|interactive/,
        simpleSelectorRE = /^[\w-]*$/,
        class2type = {},
        toString = class2type.toString,
        zepto = {},
        camelize,
        uniq,
        tempParent = document.createElement('div'),
        propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
        isArray = Array.isArray || function (object) {
      return object instanceof Array;
    };
  
    zepto.matches = function (element, selector) {
      if (!selector || !element || element.nodeType !== 1) return false;
      var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
      if (matchesSelector) return matchesSelector.call(element, selector);
      // fall back to performing a selector:
      var match,
          parent = element.parentNode,
          temp = !parent;
      if (temp) (parent = tempParent).appendChild(element);
      match = ~zepto.qsa(parent, selector).indexOf(element);
      temp && tempParent.removeChild(element);
      return match;
    };
  
    function type(obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    }
  
    function isFunction(value) {
      return type(value) == "function";
    }
    function isWindow(obj) {
      return obj != null && obj == obj.window;
    }
    function isDocument(obj) {
      return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
    }
    function isObject(obj) {
      return type(obj) == "object";
    }
    function isPlainObject(obj) {
      return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    function likeArray(obj) {
      return typeof obj.length == 'number';
    }
  
    function compact(array) {
      return _filter.call(array, function (item) {
        return item != null;
      });
    }
    function flatten(array) {
      return array.length > 0 ? $.fn.concat.apply([], array) : array;
    }
    camelize = function (str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    };
    function dasherize(str) {
      return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
    }
    uniq = function (array) {
      return _filter.call(array, function (item, idx) {
        return array.indexOf(item) == idx;
      });
    };
  
    function classRE(name) {
      return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
    }
  
    function maybeAddPx(name, value) {
      return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
    }
  
    function defaultDisplay(nodeName) {
      var element, display;
      if (!elementDisplay[nodeName]) {
        element = document.createElement(nodeName);
        document.body.appendChild(element);
        display = getComputedStyle(element, '').getPropertyValue("display");
        element.parentNode.removeChild(element);
        display == "none" && (display = "block");
        elementDisplay[nodeName] = display;
      }
      return elementDisplay[nodeName];
    }
  
    function _children(element) {
      return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
        if (node.nodeType == 1) return node;
      });
    }
  
    // `$.zepto.fragment` takes a html string and an optional tag name
    // to generate DOM nodes nodes from the given html string.
    // The generated DOM nodes are returned as an array.
    // This function can be overriden in plugins for example to make
    // it compatible with browsers that don't support the DOM fully.
    zepto.fragment = function (html, name, properties) {
      var dom, nodes, container;
  
      // A special case optimization for a single tag
      if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));
  
      if (!dom) {
        if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
        if (!(name in containers)) name = '*';
  
        container = containers[name];
        container.innerHTML = '' + html;
        dom = $.each(_slice.call(container.childNodes), function () {
          container.removeChild(this);
        });
      }
  
      if (isPlainObject(properties)) {
        nodes = $(dom);
        $.each(properties, function (key, value) {
          if (methodAttributes.indexOf(key) > -1) nodes[key](value);else nodes.attr(key, value);
        });
      }
  
      return dom;
    };
  
    // `$.zepto.Z` swaps out the prototype of the given `dom` array
    // of nodes with `$.fn` and thus supplying all the Zepto functions
    // to the array. Note that `__proto__` is not supported on Internet
    // Explorer. This method can be overriden in plugins.
    zepto.Z = function (dom, selector) {
      dom = dom || [];
      dom.__proto__ = $.fn;
      dom.selector = selector || '';
      return dom;
    };
  
    // `$.zepto.isZ` should return `true` if the given object is a Zepto
    // collection. This method can be overriden in plugins.
    zepto.isZ = function (object) {
      return object instanceof zepto.Z;
    };
  
    // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
    // takes a CSS selector and an optional context (and handles various
    // special cases).
    // This method can be overriden in plugins.
    zepto.init = function (selector, context) {
      var dom;
      // If nothing given, return an empty Zepto collection
      if (!selector) return zepto.Z();
      // Optimize for string selectors
      else if (typeof selector == 'string') {
          selector = selector.trim();
          // If it's a html fragment, create nodes from it
          // Note: In both Chrome 21 and Firefox 15, DOM error 12
          // is thrown if the fragment doesn't begin with <
          if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
          // If there's a context, create a collection on that context first, and select
          // nodes from there
          else if (context !== undefined) return $(context).find(selector);
            // If it's a CSS selector, use it to select nodes.
            else dom = zepto.qsa(document, selector);
        }
        // If a function is given, call it when the DOM is ready
        else if (isFunction(selector)) return $(document).ready(selector);
          // If a Zepto collection is given, just return it
          else if (zepto.isZ(selector)) return selector;else {
              // normalize array if an array of nodes is given
              if (isArray(selector)) dom = compact(selector);
              // Wrap DOM nodes.
              else if (isObject(selector)) dom = [selector], selector = null;
                // If it's a html fragment, create nodes from it
                else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
                  // If there's a context, create a collection on that context first, and select
                  // nodes from there
                  else if (context !== undefined) return $(context).find(selector);
                    // And last but no least, if it's a CSS selector, use it to select nodes.
                    else dom = zepto.qsa(document, selector);
            }
      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector);
    };
  
    // `$` will be the base `Zepto` object. When calling this
    // function just call `$.zepto.init, which makes the implementation
    // details of selecting nodes and creating Zepto collections
    // patchable in plugins.
    $ = function (selector, context) {
      return zepto.init(selector, context);
    };
  
    function extend(target, source, deep) {
      for (key in source) if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
        if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
        extend(target[key], source[key], deep);
      } else if (source[key] !== undefined) target[key] = source[key];
    }
  
    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function (target) {
      var deep,
          args = _slice.call(arguments, 1);
      if (typeof target == 'boolean') {
        deep = target;
        target = args.shift();
      }
      args.forEach(function (arg) {
        extend(target, arg, deep);
      });
      return target;
    };
  
    // `$.zepto.qsa` is Zepto's CSS selector implementation which
    // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
    // This method can be overriden in plugins.
    zepto.qsa = function (element, selector) {
      var found,
          maybeID = selector[0] == '#',
          maybeClass = !maybeID && selector[0] == '.',
          nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
          // Ensure that a 1 char tag name still gets checked
      isSimple = simpleSelectorRE.test(nameOnly);
      return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
      element.getElementsByTagName(selector) : // Or a tag
      element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      );
    };
  
    function filtered(nodes, selector) {
      return selector == null ? $(nodes) : $(nodes).filter(selector);
    }
  
    $.contains = document.documentElement.contains ? function (parent, node) {
      return parent !== node && parent.contains(node);
    } : function (parent, node) {
      while (node && (node = node.parentNode)) if (node === parent) return true;
      return false;
    };
  
    function funcArg(context, arg, idx, payload) {
      return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }
  
    function setAttribute(node, name, value) {
      value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
    }
  
    // access className property while respecting SVGAnimatedString
    function className(node, value) {
      var klass = node.className,
          svg = klass && klass.baseVal !== undefined;
  
      if (value === undefined) return svg ? klass.baseVal : klass;
      svg ? klass.baseVal = value : node.className = value;
    }
  
    // "true"  => true
    // "false" => false
    // "null"  => null
    // "42"    => 42
    // "42.5"  => 42.5
    // "08"    => "08"
    // JSON    => parse if valid
    // String  => self
    function deserializeValue(value) {
      var num;
      try {
        return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !/^0/.test(value) && !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
      } catch (e) {
        return value;
      }
    }
  
    $.type = type;
    $.isFunction = isFunction;
    $.isWindow = isWindow;
    $.isArray = isArray;
    $.isPlainObject = isPlainObject;
  
    $.isEmptyObject = function (obj) {
      var name;
      for (name in obj) return false;
      return true;
    };
  
    $.inArray = function (elem, array, i) {
      return emptyArray.indexOf.call(array, elem, i);
    };
  
    $.camelCase = camelize;
    $.trim = function (str) {
      return str == null ? "" : String.prototype.trim.call(str);
    };
  
    // plugin compatibility
    $.uuid = 0;
    $.support = {};
    $.expr = {};
  
    $.map = function (elements, callback) {
      var value,
          values = [],
          i,
          key;
      if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i);
        if (value != null) values.push(value);
      } else for (key in elements) {
        value = callback(elements[key], key);
        if (value != null) values.push(value);
      }
      return flatten(values);
    };
  
    $.each = function (elements, callback) {
      var i, key;
      if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++) if (callback.call(elements[i], i, elements[i]) === false) return elements;
      } else {
        for (key in elements) if (callback.call(elements[key], key, elements[key]) === false) return elements;
      }
  
      return elements;
    };
  
    $.grep = function (elements, callback) {
      return _filter.call(elements, callback);
    };
  
    if (window.JSON) $.parseJSON = JSON.parse;
  
    // Populate the class2type map
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    });
  
    // Define methods that will be available on all
    // Zepto collections
    $.fn = {
      // Because a collection acts like an array
      // copy over these useful array functions.
      forEach: emptyArray.forEach,
      reduce: emptyArray.reduce,
      push: emptyArray.push,
      sort: emptyArray.sort,
      indexOf: emptyArray.indexOf,
      concat: emptyArray.concat,
  
      // `map` and `slice` in the jQuery API work differently
      // from their array counterparts
      map: function map(fn) {
        return $($.map(this, function (el, i) {
          return fn.call(el, i, el);
        }));
      },
      slice: function slice() {
        return $(_slice.apply(this, arguments));
      },
  
      ready: function ready(callback) {
        // need to check if document.body exists for IE as that browser reports
        // document ready when it hasn't yet created the body element
        if (readyRE.test(document.readyState) && document.body) callback($);else document.addEventListener('DOMContentLoaded', function () {
          callback($);
        }, false);
        return this;
      },
      get: function get(idx) {
        return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
      },
      toArray: function toArray() {
        return this.get();
      },
      size: function size() {
        return this.length;
      },
      remove: function remove() {
        return this.each(function () {
          if (this.parentNode != null) this.parentNode.removeChild(this);
        });
      },
      each: function each(callback) {
        emptyArray.every.call(this, function (el, idx) {
          return callback.call(el, idx, el) !== false;
        });
        return this;
      },
      filter: function filter(selector) {
        if (isFunction(selector)) return this.not(this.not(selector));
        return $(_filter.call(this, function (element) {
          return zepto.matches(element, selector);
        }));
      },
      add: function add(selector, context) {
        return $(uniq(this.concat($(selector, context))));
      },
      is: function is(selector) {
        return this.length > 0 && zepto.matches(this[0], selector);
      },
      not: function not(selector) {
        var nodes = [];
        if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
          if (!selector.call(this, idx)) nodes.push(this);
        });else {
          var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
          this.forEach(function (el) {
            if (excludes.indexOf(el) < 0) nodes.push(el);
          });
        }
        return $(nodes);
      },
      has: function has(selector) {
        return this.filter(function () {
          return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
        });
      },
      eq: function eq(idx) {
        return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
      },
      first: function first() {
        var el = this[0];
        return el && !isObject(el) ? el : $(el);
      },
      last: function last() {
        var el = this[this.length - 1];
        return el && !isObject(el) ? el : $(el);
      },
      find: function find(selector) {
        var result,
            $this = this;
        if (!selector) result = [];else if (typeof selector == 'object') result = $(selector).filter(function () {
          var node = this;
          return emptyArray.some.call($this, function (parent) {
            return $.contains(parent, node);
          });
        });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
          return zepto.qsa(this, selector);
        });
        return result;
      },
      closest: function closest(selector, context) {
        var node = this[0],
            collection = false;
        if (typeof selector == 'object') collection = $(selector);
        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) node = node !== context && !isDocument(node) && node.parentNode;
        return $(node);
      },
      parents: function parents(selector) {
        var ancestors = [],
            nodes = this;
        while (nodes.length > 0) nodes = $.map(nodes, function (node) {
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
        return filtered(ancestors, selector);
      },
      parent: function parent(selector) {
        return filtered(uniq(this.pluck('parentNode')), selector);
      },
      children: function children(selector) {
        return filtered(this.map(function () {
          return _children(this);
        }), selector);
      },
      contents: function contents() {
        return this.map(function () {
          return _slice.call(this.childNodes);
        });
      },
      siblings: function siblings(selector) {
        return filtered(this.map(function (i, el) {
          return _filter.call(_children(el.parentNode), function (child) {
            return child !== el;
          });
        }), selector);
      },
      empty: function empty() {
        return this.each(function () {
          this.innerHTML = '';
        });
      },
      // `pluck` is borrowed from Prototype.js
      pluck: function pluck(property) {
        return $.map(this, function (el) {
          return el[property];
        });
      },
      show: function show() {
        return this.each(function () {
          this.style.display == "none" && (this.style.display = '');
          if (getComputedStyle(this, '').getPropertyValue("display") == "none") this.style.display = defaultDisplay(this.nodeName);
        });
      },
      replaceWith: function replaceWith(newContent) {
        return this.before(newContent).remove();
      },
      wrap: function wrap(structure) {
        var func = isFunction(structure);
        if (this[0] && !func) var dom = $(structure).get(0),
            clone = dom.parentNode || this.length > 1;
  
        return this.each(function (index) {
          $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom);
        });
      },
      wrapAll: function wrapAll(structure) {
        if (this[0]) {
          $(this[0]).before(structure = $(structure));
          var children;
          // drill down to the inmost element
          while ((children = structure.children()).length) structure = children.first();
          $(structure).append(this);
        }
        return this;
      },
      wrapInner: function wrapInner(structure) {
        var func = isFunction(structure);
        return this.each(function (index) {
          var self = $(this),
              contents = self.contents(),
              dom = func ? structure.call(this, index) : structure;
          contents.length ? contents.wrapAll(dom) : self.append(dom);
        });
      },
      unwrap: function unwrap() {
        this.parent().each(function () {
          $(this).replaceWith($(this).children());
        });
        return this;
      },
      clone: function clone() {
        return this.map(function () {
          return this.cloneNode(true);
        });
      },
      hide: function hide() {
        return this.css("display", "none");
      },
      toggle: function toggle(setting) {
        return this.each(function () {
          var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
        });
      },
      prev: function prev(selector) {
        return $(this.pluck('previousElementSibling')).filter(selector || '*');
      },
      next: function next(selector) {
        return $(this.pluck('nextElementSibling')).filter(selector || '*');
      },
      html: function html(_html) {
        return 0 in arguments ? this.each(function (idx) {
          var originHtml = this.innerHTML;
          $(this).empty().append(funcArg(this, _html, idx, originHtml));
        }) : 0 in this ? this[0].innerHTML : null;
      },
      text: function text(_text) {
        return 0 in arguments ? this.each(function (idx) {
          var newText = funcArg(this, _text, idx, this.textContent);
          this.textContent = newText == null ? '' : '' + newText;
        }) : 0 in this ? this[0].textContent : null;
      },
      attr: function attr(name, value) {
        var result;
        return typeof name == 'string' && !(1 in arguments) ? !this.length || this[0].nodeType !== 1 ? undefined : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
          if (this.nodeType !== 1) return;
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key]);else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
        });
      },
      removeAttr: function removeAttr(name) {
        return this.each(function () {
          this.nodeType === 1 && setAttribute(this, name);
        });
      },
      prop: function prop(name, value) {
        name = propMap[name] || name;
        return 1 in arguments ? this.each(function (idx) {
          this[name] = funcArg(this, value, idx, this[name]);
        }) : this[0] && this[0][name];
      },
      data: function data(name, value) {
        var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase();
  
        var data = 1 in arguments ? this.attr(attrName, value) : this.attr(attrName);
  
        //      return data !== null ? deserializeValue(data) : undefined  TODO 取 data 不想进行 deserializeValue 处理 暂时先注掉
        return data !== null ? data : undefined;
      },
      val: function val(value) {
        return 0 in arguments ? this.each(function (idx) {
          this.value = funcArg(this, value, idx, this.value);
        }) : this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
          return this.selected;
        }).pluck('value') : this[0].value);
      },
      offset: function offset(coordinates) {
        if (coordinates) return this.each(function (index) {
          var $this = $(this),
              coords = funcArg(this, coordinates, index, $this.offset()),
              parentOffset = $this.offsetParent().offset(),
              props = {
            top: coords.top - parentOffset.top,
            left: coords.left - parentOffset.left
          };
  
          if ($this.css('position') == 'static') props['position'] = 'relative';
          $this.css(props);
        });
        if (!this.length) return null;
        var obj = this[0].getBoundingClientRect();
        return {
          left: obj.left + window.pageXOffset,
          top: obj.top + window.pageYOffset,
          width: Math.round(obj.width),
          height: Math.round(obj.height)
        };
      },
      css: function css(property, value) {
        if (arguments.length < 2) {
          var element = this[0],
              computedStyle = getComputedStyle(element, '');
          if (!element) return;
          if (typeof property == 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);else if (isArray(property)) {
            var props = {};
            $.each(isArray(property) ? property : [property], function (_, prop) {
              props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
            });
            return props;
          }
        }
  
        var css = '';
        if (type(property) == 'string') {
          if (!value && value !== 0) this.each(function () {
            this.style.removeProperty(dasherize(property));
          });else css = dasherize(property) + ":" + maybeAddPx(property, value);
        } else {
          for (key in property) if (!property[key] && property[key] !== 0) this.each(function () {
            this.style.removeProperty(dasherize(key));
          });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
        }
  
        return this.each(function () {
          this.style.cssText += ';' + css;
        });
      },
      index: function index(element) {
        return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
      },
      hasClass: function hasClass(name) {
        if (!name) return false;
        return emptyArray.some.call(this, function (el) {
          return this.test(className(el));
        }, classRE(name));
      },
      addClass: function addClass(name) {
        if (!name) return this;
        return this.each(function (idx) {
          classList = [];
          var cls = className(this),
              newName = funcArg(this, name, idx, cls);
          newName.split(/\s+/g).forEach(function (klass) {
            if (!$(this).hasClass(klass)) classList.push(klass);
          }, this);
          classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
        });
      },
      removeClass: function removeClass(name) {
        return this.each(function (idx) {
          if (name === undefined) return className(this, '');
          classList = className(this);
          funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
            classList = classList.replace(classRE(klass), " ");
          });
          className(this, classList.trim());
        });
      },
      toggleClass: function toggleClass(name, when) {
        if (!name) return this;
        return this.each(function (idx) {
          var $this = $(this),
              names = funcArg(this, name, idx, className(this));
          names.split(/\s+/g).forEach(function (klass) {
            (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
          });
        });
      },
      scrollTop: function scrollTop(value) {
        if (!this.length) return;
        var hasScrollTop = ('scrollTop' in this[0]);
        if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
        return this.each(hasScrollTop ? function () {
          this.scrollTop = value;
        } : function () {
          this.scrollTo(this.scrollX, value);
        });
      },
      scrollLeft: function scrollLeft(value) {
        if (!this.length) return;
        var hasScrollLeft = ('scrollLeft' in this[0]);
        if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset;
        return this.each(hasScrollLeft ? function () {
          this.scrollLeft = value;
        } : function () {
          this.scrollTo(value, this.scrollY);
        });
      },
      position: function position() {
        if (!this.length) return;
  
        var elem = this[0],
  
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
  
        // Get correct offsets
        offset = this.offset(),
            parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
  
        // Subtract element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        offset.top -= parseFloat($(elem).css('margin-top')) || 0;
        offset.left -= parseFloat($(elem).css('margin-left')) || 0;
  
        // Add offsetParent borders
        parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0;
        parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0;
  
        // Subtract the two offsets
        return {
          top: offset.top - parentOffset.top,
          left: offset.left - parentOffset.left
        };
      },
      offsetParent: function offsetParent() {
        return this.map(function () {
          var parent = this.offsetParent || document.body;
          while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") parent = parent.offsetParent;
          return parent;
        });
      }
    };
  
    // for now
    $.fn.detach = $.fn.remove;
  
    // Generate the `width` and `height` functions
    ['width', 'height'].forEach(function (dimension) {
      var dimensionProperty = dimension.replace(/./, function (m) {
        return m[0].toUpperCase();
      });
  
      $.fn[dimension] = function (value) {
        var offset,
            el = this[0];
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
          el = $(this);
          el.css(dimension, funcArg(this, value, idx, el[dimension]()));
        });
      };
    });
  
    function traverseNode(node, fun) {
      fun(node);
      for (var i = 0, len = node.childNodes.length; i < len; i++) traverseNode(node.childNodes[i], fun);
    }
  
    // Generate the `after`, `prepend`, `before`, `append`,
    // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
    adjacencyOperators.forEach(function (operator, operatorIndex) {
      var inside = operatorIndex % 2; //=> prepend, append
  
      $.fn[operator] = function () {
        // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
        var argType,
            nodes = $.map(arguments, function (arg) {
          argType = type(arg);
          return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
        }),
            parent,
            copyByClone = this.length > 1;
        if (nodes.length < 1) return this;
  
        return this.each(function (_, target) {
          parent = inside ? target : target.parentNode;
  
          // convert all methods to a "before" operation
          target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
  
          var parentInDocument = $.contains(document.documentElement, parent);
  
          nodes.forEach(function (node) {
            if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();
  
            parent.insertBefore(node, target);
            if (parentInDocument) traverseNode(node, function (el) {
              if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) window['eval'].call(window, el.innerHTML);
            });
          });
        });
      };
  
      // after    => insertAfter
      // prepend  => prependTo
      // before   => insertBefore
      // append   => appendTo
      $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
        $(html)[operator](this);
        return this;
      };
    });
  
    zepto.Z.prototype = $.fn;
  
    // Export internal API functions in the `$.zepto` namespace
    zepto.uniq = uniq;
    zepto.deserializeValue = deserializeValue;
    $.zepto = zepto;
  
    return $;
  })();
  
  window.Zepto = Zepto;
  window.$ === undefined && (window.$ = Zepto);(function ($) {
    var _zid = 1,
        undefined,
        slice = Array.prototype.slice,
        isFunction = $.isFunction,
        isString = function isString(obj) {
      return typeof obj == 'string';
    },
        handlers = {},
        specialEvents = {},
        focusinSupported = ('onfocusin' in window),
        focus = { focus: 'focusin', blur: 'focusout' },
        hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
  
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
  
    function zid(element) {
      return element._zid || (element._zid = _zid++);
    }
    function findHandlers(element, event, fn, selector) {
      event = parse(event);
      if (event.ns) var matcher = matcherFor(event.ns);
      return (handlers[zid(element)] || []).filter(function (handler) {
        return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
      });
    }
    function parse(event) {
      var parts = ('' + event).split('.');
      return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
    }
    function matcherFor(ns) {
      return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
    }
  
    function eventCapture(handler, captureSetting) {
      return handler.del && !focusinSupported && handler.e in focus || !!captureSetting;
    }
  
    function realEvent(type) {
      return hover[type] || focusinSupported && focus[type] || type;
    }
  
    function add(element, events, fn, data, selector, delegator, capture) {
      var id = zid(element),
          set = handlers[id] || (handlers[id] = []);
      events.split(/\s/).forEach(function (event) {
        if (event == 'ready') return $(document).ready(fn);
        var handler = parse(event);
        handler.fn = fn;
        handler.sel = selector;
        // emulate mouseenter, mouseleave
        if (handler.e in hover) fn = function (e) {
          var related = e.relatedTarget;
          if (!related || related !== this && !$.contains(this, related)) return handler.fn.apply(this, arguments);
        };
        handler.del = delegator;
        var callback = delegator || fn;
        handler.proxy = function (e) {
          e = compatible(e);
          if (e.isImmediatePropagationStopped()) return;
          e.data = data;
          var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
          if (result === false) e.preventDefault(), e.stopPropagation();
          return result;
        };
        handler.i = set.length;
        set.push(handler);
        if ('addEventListener' in element) element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
      });
    }
    function remove(element, events, fn, selector, capture) {
      var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
        findHandlers(element, event, fn, selector).forEach(function (handler) {
          delete handlers[id][handler.i];
          if ('removeEventListener' in element) element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture));
        });
      });
    }
  
    $.event = { add: add, remove: remove };
  
    $.proxy = function (fn, context) {
      var args = 2 in arguments && slice.call(arguments, 2);
      if (isFunction(fn)) {
        var proxyFn = function proxyFn() {
          return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments);
        };
        proxyFn._zid = zid(fn);
        return proxyFn;
      } else if (isString(context)) {
        if (args) {
          args.unshift(fn[context], fn);
          return $.proxy.apply(null, args);
        } else {
          return $.proxy(fn[context], fn);
        }
      } else {
        throw new TypeError("expected function");
      }
    };
  
    $.fn.bind = function (event, data, callback) {
      return this.on(event, data, callback);
    };
    $.fn.unbind = function (event, callback) {
      return this.off(event, callback);
    };
    $.fn.one = function (event, selector, data, callback) {
      return this.on(event, selector, data, callback, 1);
    };
  
    var returnTrue = function returnTrue() {
      return true;
    },
        returnFalse = function returnFalse() {
      return false;
    },
        ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
        eventMethods = {
      preventDefault: 'isDefaultPrevented',
      stopImmediatePropagation: 'isImmediatePropagationStopped',
      stopPropagation: 'isPropagationStopped'
    };
  
    function compatible(event, source) {
      if (source || !event.isDefaultPrevented) {
        source || (source = event);
  
        $.each(eventMethods, function (name, predicate) {
          var sourceMethod = source[name];
          event[name] = function () {
            this[predicate] = returnTrue;
            return sourceMethod && sourceMethod.apply(source, arguments);
          };
          event[predicate] = returnFalse;
        });
  
        if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
      }
      return event;
    }
  
    function createProxy(event) {
      var key,
          proxy = { originalEvent: event };
      for (key in event) if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
  
      return compatible(proxy, event);
    }
  
    $.fn.delegate = function (selector, event, callback) {
      return this.on(event, selector, callback);
    };
    $.fn.undelegate = function (selector, event, callback) {
      return this.off(event, selector, callback);
    };
  
    $.fn.live = function (event, callback) {
      $(document.body).delegate(this.selector, event, callback);
      return this;
    };
    $.fn.die = function (event, callback) {
      $(document.body).undelegate(this.selector, event, callback);
      return this;
    };
  
    $.fn.on = function (event, selector, data, callback, one) {
      var autoRemove,
          delegator,
          $this = this;
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.on(type, selector, data, fn, one);
        });
        return $this;
      }
  
      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
      if (isFunction(data) || data === false) callback = data, data = undefined;
  
      if (callback === false) callback = returnFalse;
  
      return $this.each(function (_, element) {
        if (one) autoRemove = function (e) {
          remove(element, e.type, callback);
          return callback.apply(this, arguments);
        };
  
        if (selector) delegator = function (e) {
          var evt,
              match = $(e.target).closest(selector, element).get(0);
          if (match && match !== element) {
            evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
            return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
          }
        };
  
        add(element, event, callback, data, selector, delegator || autoRemove);
      });
    };
    $.fn.off = function (event, selector, callback) {
      var $this = this;
      if (event && !isString(event)) {
        $.each(event, function (type, fn) {
          $this.off(type, selector, fn);
        });
        return $this;
      }
  
      if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;
  
      if (callback === false) callback = returnFalse;
  
      return $this.each(function () {
        remove(this, event, callback, selector);
      });
    };
  
    $.fn.trigger = function (event, args) {
      event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
      event._args = args;
      return this.each(function () {
        // items in the collection might not be DOM elements
        if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
      });
    };
  
    // triggers event handlers on current element just as if an event occurred,
    // doesn't trigger an actual event, doesn't bubble
    $.fn.triggerHandler = function (event, args) {
      var e, result;
      this.each(function (i, element) {
        e = createProxy(isString(event) ? $.Event(event) : event);
        e._args = args;
        e.target = element;
        $.each(findHandlers(element, event.type || event), function (i, handler) {
          result = handler.proxy(e);
          if (e.isImmediatePropagationStopped()) return false;
        });
      });
      return result;
    };
  
    // shortcut methods for `.bind(event, fn)` for each event type
    ('focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select keydown keypress keyup error').split(' ').forEach(function (event) {
      $.fn[event] = function (callback) {
        return callback ? this.bind(event, callback) : this.trigger(event);
      };
    });['focus', 'blur'].forEach(function (name) {
      $.fn[name] = function (callback) {
        if (callback) this.bind(name, callback);else this.each(function () {
          try {
            this[name]();
          } catch (e) {}
        });
        return this;
      };
    });
  
    $.Event = function (type, props) {
      if (!isString(type)) props = type, type = props.type;
      var event = document.createEvent(specialEvents[type] || 'Events'),
          bubbles = true;
      if (props) for (var name in props) name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
      event.initEvent(type, bubbles, true);
      return compatible(event);
    };
  
    // TODO 增加 jqmobi 中的 $.bind $.trigger $.unbind 方法，兼容老代码
    /* The following are for events on objects */
    /**
     * Bind an event to an object instead of a DOM Node
     ```
     $.bind(this,'event',function(){});
     ```
     * @param {Object} object
     * @param {String} event name
     * @param {Function} function to execute
     * @title $.bind(object,event,function);
     */
    $.bind = function (obj, ev, f) {
      if (!obj.__events) obj.__events = {};
      if (!$.isArray(ev)) ev = [ev];
      for (var i = 0; i < ev.length; i++) {
        if (!obj.__events[ev[i]]) obj.__events[ev[i]] = [];
        obj.__events[ev[i]].push(f);
      }
    };
  
    /**
     * Trigger an event to an object instead of a DOM Node
     ```
     $.trigger(this,'event',arguments);
     ```
     * @param {Object} object
     * @param {String} event name
     * @param {Array} arguments
     * @title $.trigger(object,event,argments);
     */
    $.trigger = function (obj, ev, args) {
      var ret = true;
      if (!obj.__events) return ret;
      if (!$.isArray(ev)) ev = [ev];
      if (!$.isArray(args)) args = [];
      for (var i = 0; i < ev.length; i++) {
        if (obj.__events[ev[i]]) {
          var evts = obj.__events[ev[i]];
          for (var j = 0; j < evts.length; j++) if ($.isFunction(evts[j]) && evts[j].apply(obj, args) === false) ret = false;
        }
      }
      return ret;
    };
    /**
     * Unbind an event to an object instead of a DOM Node
     ```
     $.unbind(this,'event',function(){});
     ```
     * @param {Object} object
     * @param {String} event name
     * @param {Function} function to execute
     * @title $.unbind(object,event,function);
     */
    $.unbind = function (obj, ev, f) {
      if (!obj.__events) return ret;
      if (!$.isArray(ev)) ev = [ev];
      for (var i = 0; i < ev.length; i++) {
        if (obj.__events[ev[i]]) {
          var evts = obj.__events[ev[i]];
          for (var j = 0; j < evts.length; j++) {
            if (f == undefined) delete evts[j];
            if (evts[j] == f) {
              evts.splice(j, 1);
              break;
            }
          }
        }
      }
    };
  
    // TODO 增加 jqmobi 中的 $.uuid 方法，兼容老代码
    /**
     * Utility function to create a psuedo GUID
     ```
     var id= $.uuid();
     ```
     * @title $.uuid
     */
    $.uuid = function () {
      var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
  
    // TODO 补充 $.os 下的环境参数
    /**
     * Helper function to parse the user agent.  Sets the following
     * .os.webkit
     * .os.android
     * .os.ipad
     * .os.iphone
     * .os.webos
     * .os.touchpad
     * .os.blackberry
     * .os.opera
     * .os.fennec
     * @api private
     */
    function detectUA($, userAgent) {
      $.os = {};
      $.os.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
      $.os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
      $.os.androidICS = $.os.android && userAgent.match(/(Android)\s4/) ? true : false;
      $.os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
      $.os.iphone = !$.os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
      $.os.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
      $.os.touchpad = $.os.webos && userAgent.match(/TouchPad/) ? true : false;
      $.os.ios = $.os.ipad || $.os.iphone;
      $.os.ios6 = $.os.ios && userAgent.match(/(OS)\s([6])/) ? true : false;
      $.os.playbook = userAgent.match(/PlayBook/) ? true : false;
      $.os.blackberry = $.os.playbook || userAgent.match(/BlackBerry/) ? true : false;
      $.os.blackberry10 = $.os.blackberry && userAgent.match(/Safari\/536/) ? true : false;
      $.os.chrome = userAgent.match(/Chrome/) ? true : false;
      $.os.opera = userAgent.match(/Opera Mobi/) ? true : false;
      $.os.fennec = userAgent.match(/fennec/i) ? true : false;
      $.os.supportsTouch = window.DocumentTouch && document instanceof window.DocumentTouch || 'ontouchstart' in window;
      $.os.desktop = !($.os.ios || $.os.android || $.os.blackberry || $.os.opera || $.os.fennec || $.os.supportsTouch);
      //features
      $.feat = {};
      $.feat.nativeTouchScroll = typeof document.documentElement.getElementsByTagName("head")[0].style["-webkit-overflow-scrolling"] !== "undefined" && $.os.ios;
      //($.os.ios ? !userAgent.match(/OS\s[1-4]/) : false);
    }
    detectUA($, navigator.userAgent);
  })(Zepto);(function ($) {
    var jsonpID = 0,
        document = window.document,
        key,
        name,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        scriptTypeRE = /^(?:text|application)\/javascript/i,
        xmlTypeRE = /^(?:text|application)\/xml/i,
        jsonType = 'application/json',
        htmlType = 'text/html',
        blankRE = /^\s*$/;
  
    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
      var event = $.Event(eventName);
      $(context).trigger(event, data);
      return !event.isDefaultPrevented();
    }
  
    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
      if (settings.global) return triggerAndReturn(context || document, eventName, data);
    }
  
    // Number of active Ajax requests
    $.active = 0;
  
    function ajaxStart(settings) {
      if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
    }
    function ajaxStop(settings) {
      if (settings.global && ! --$.active) triggerGlobal(settings, null, 'ajaxStop');
    }
  
    // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
    function ajaxBeforeSend(xhr, settings) {
      var context = settings.context;
      if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;
  
      triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
    }
    function ajaxSuccess(data, xhr, settings, deferred) {
      var context = settings.context,
          status = 'success';
      settings.success.call(context, data, status, xhr);
      if (deferred) deferred.resolveWith(context, [data, status, xhr]);
      triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
      ajaxComplete(status, xhr, settings);
    }
    // type: "timeout", "error", "abort", "parsererror"
    function ajaxError(error, type, xhr, settings, deferred) {
      var context = settings.context;
      settings.error.call(context, xhr, type, error);
      if (deferred) deferred.rejectWith(context, [xhr, type, error]);
      triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type]);
      ajaxComplete(type, xhr, settings);
    }
    // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
    function ajaxComplete(status, xhr, settings) {
      var context = settings.context;
      settings.complete.call(context, xhr, status);
      triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
      ajaxStop(settings);
    }
  
    // Empty function, used as default callback
    function empty() {}
  
    $.ajaxJSONP = function (options, deferred) {
      if (!('type' in options)) return $.ajax(options);
  
      var _callbackName = options.jsonpCallback,
          callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'jsonp' + ++jsonpID,
          script = document.createElement('script'),
          originalCallback = window[callbackName],
          responseData,
          abort = function abort(errorType) {
        $(script).triggerHandler('error', errorType || 'abort');
      },
          xhr = { abort: abort },
          abortTimeout;
  
      if (deferred) deferred.promise(xhr);
  
      $(script).on('load error', function (e, errorType) {
        clearTimeout(abortTimeout);
        $(script).off().remove();
  
        if (e.type == 'error' || !responseData) {
          ajaxError(null, errorType || 'error', xhr, options, deferred);
        } else {
          ajaxSuccess(responseData[0], xhr, options, deferred);
        }
  
        window[callbackName] = originalCallback;
        if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);
  
        originalCallback = responseData = undefined;
      });
  
      if (ajaxBeforeSend(xhr, options) === false) {
        abort('abort');
        return xhr;
      }
  
      window[callbackName] = function () {
        responseData = arguments;
      };
  
      script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
      document.head.appendChild(script);
  
      if (options.timeout > 0) abortTimeout = setTimeout(function () {
        abort('timeout');
      }, options.timeout);
  
      return xhr;
    };
  
    $.ajaxSettings = {
      // Default type of request
      type: 'GET',
      // Callback that is executed before request
      beforeSend: empty,
      // Callback that is executed if the request succeeds
      success: empty,
      // Callback that is executed the the server drops error
      error: empty,
      // Callback that is executed on request complete (both: error and success)
      complete: empty,
      // The context for the callbacks
      context: null,
      // Whether to trigger "global" Ajax events
      global: true,
      // Transport
      xhr: function xhr() {
        return new window.XMLHttpRequest();
      },
      // MIME types mapping
      // IIS returns Javascript as "application/x-javascript"
      accepts: {
        script: 'text/javascript, application/javascript, application/x-javascript',
        json: jsonType,
        xml: 'application/xml, text/xml',
        html: htmlType,
        text: 'text/plain'
      },
      // Whether the request is to another domain
      crossDomain: false,
      // Default timeout
      timeout: 0,
      // Whether data should be serialized to string
      processData: true,
      // Whether the browser should be allowed to cache GET responses
      cache: true
    };
  
    function mimeToDataType(mime) {
      if (mime) mime = mime.split(';', 2)[0];
      return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
    }
  
    function appendQuery(url, query) {
      if (query == '') return url;
      return (url + '&' + query).replace(/[&?]{1,2}/, '?');
    }
  
    // serialize payload and append it to the URL for GET requests
    function serializeData(options) {
      if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
      if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
    }
  
    $.ajax = function (options) {
      var settings = $.extend({}, options || {}),
          deferred = $.Deferred && $.Deferred();
      for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
  
      ajaxStart(settings);
  
      if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;
  
      if (!settings.url) settings.url = window.location.toString();
      serializeData(settings);
  
      var dataType = settings.dataType,
          hasPlaceholder = /\?.+=\?/.test(settings.url);
      if (hasPlaceholder) dataType = 'jsonp';
  
      if (settings.cache === false || (!options || options.cache !== true) && ('script' == dataType || 'jsonp' == dataType)) settings.url = appendQuery(settings.url, '_=' + Date.now());
  
      if ('jsonp' == dataType) {
        if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
        return $.ajaxJSONP(settings, deferred);
      }
  
      var mime = settings.accepts[dataType],
          headers = {},
          setHeader = function setHeader(name, value) {
        headers[name.toLowerCase()] = [name, value];
      },
          protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
          xhr = settings.xhr(),
          nativeSetHeader = xhr.setRequestHeader,
          abortTimeout;
  
      if (deferred) deferred.promise(xhr);
  
      if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
      setHeader('Accept', mime || '*/*');
      if (mime = settings.mimeType || mime) {
        if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
        xhr.overrideMimeType && xhr.overrideMimeType(mime);
      }
      if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
  
      if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
      xhr.setRequestHeader = setHeader;
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty;
          clearTimeout(abortTimeout);
          var result,
              error = false;
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
            dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
            result = xhr.responseText;
  
            try {
              // http://perfectionkills.com/global-eval-what-are-the-options/
              if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
            } catch (e) {
              error = e;
            }
  
            if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);else ajaxSuccess(result, xhr, settings, deferred);
          } else {
            ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
          }
        }
      };
  
      if (ajaxBeforeSend(xhr, settings) === false) {
        xhr.abort();
        ajaxError(null, 'abort', xhr, settings, deferred);
        return xhr;
      }
  
      if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
  
      var async = 'async' in settings ? settings.async : true;
      xhr.open(settings.type, settings.url, async, settings.username, settings.password);
  
      for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
  
      if (settings.timeout > 0) abortTimeout = setTimeout(function () {
        xhr.onreadystatechange = empty;
        xhr.abort();
        ajaxError(null, 'timeout', xhr, settings, deferred);
      }, settings.timeout);
  
      // avoid sending empty string (#319)
      xhr.send(settings.data ? settings.data : null);
      return xhr;
    };
  
    // handle optional data/success arguments
    function parseArguments(url, data, success, dataType) {
      if ($.isFunction(data)) dataType = success, success = data, data = undefined;
      if (!$.isFunction(success)) dataType = success, success = undefined;
      return {
        url: url,
        data: data,
        success: success,
        dataType: dataType
      };
    }
  
    $.get = function () /* url, data, success, dataType */{
      return $.ajax(parseArguments.apply(null, arguments));
    };
  
    $.post = function () /* url, data, success, dataType */{
      var options = parseArguments.apply(null, arguments);
      options.type = 'POST';
      return $.ajax(options);
    };
  
    $.getJSON = function () /* url, data, success */{
      var options = parseArguments.apply(null, arguments);
      options.dataType = 'json';
      return $.ajax(options);
    };
  
    $.fn.load = function (url, data, success) {
      if (!this.length) return this;
      var self = this,
          parts = url.split(/\s/),
          selector,
          options = parseArguments(url, data, success),
          callback = options.success;
      if (parts.length > 1) options.url = parts[0], selector = parts[1];
      options.success = function (response) {
        self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
        callback && callback.apply(self, arguments);
      };
      $.ajax(options);
      return this;
    };
  
    var escape = encodeURIComponent;
  
    function serialize(params, obj, traditional, scope) {
      var type,
          array = $.isArray(obj),
          hash = $.isPlainObject(obj);
      $.each(obj, function (key, value) {
        type = $.type(value);
        if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        // handle data in serializeArray() format
        if (!scope && array) params.add(value.name, value.value);
        // recurse into nested objects
        else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
      });
    }
  
    $.param = function (obj, traditional) {
      var params = [];
      params.add = function (k, v) {
        this.push(escape(k) + '=' + escape(v));
      };
      serialize(params, obj, traditional);
      return params.join('&').replace(/%20/g, '+');
    };
  })(Zepto);(function ($) {
    $.fn.serializeArray = function () {
      var result = [],
          el;
      $([].slice.call(this.get(0).elements)).each(function () {
        el = $(this);
        var type = el.attr('type');
        if (this.nodeName.toLowerCase() != 'fieldset' && !this.disabled && type != 'submit' && type != 'reset' && type != 'button' && (type != 'radio' && type != 'checkbox' || this.checked)) result.push({
          name: el.attr('name'),
          value: el.val()
        });
      });
      return result;
    };
  
    $.fn.serialize = function () {
      var result = [];
      this.serializeArray().forEach(function (elm) {
        result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value));
      });
      return result.join('&');
    };
  
    $.fn.submit = function (callback) {
      if (callback) this.bind('submit', callback);else if (this.length) {
        var event = $.Event('submit');
        this.eq(0).trigger(event);
        if (!event.isDefaultPrevented()) this.get(0).submit();
      }
      return this;
    };
  })(Zepto);
  
  if (window.define) {
    window.define('m_zepto', [], function () {
      return $;
    });
  }

});

;/*!pages/demo*/
define('pages/demo', function(require, exports, module) {

  /*!
   * demo For Aimeejs
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _page = require('page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var _demoJade = require('src/pages/demo/demo.jade');
  
  var _demoJade2 = _interopRequireDefault(_demoJade);
  
  var demo = (function (_Page) {
      _inherits(demo, _Page);
  
      function demo() {
          _classCallCheck(this, demo);
  
          _get(Object.getPrototypeOf(demo.prototype), 'constructor', this).call(this);
          this.name = 'demo';
          this.template = _demoJade2['default'];
      }
  
      _createClass(demo, [{
          key: 'onload',
          value: function onload() {}
      }, {
          key: 'prerender',
          value: function prerender(data) {
              this.exports('header');
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
  
      return demo;
  })(_page2['default']);
  
  exports['default'] = new demo();
  module.exports = exports['default'];

});

;/*!init*/
define('init', function(require, exports, module) {

  /*!
   * init.js For admin
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
   */
  
  'use strict';
  
  var aimee, router;
  
  aimee = require('aimee');
  router = require('router');
  
  aimee.reg('loading2');
  
  router.option('pages/home').option('pages/demo').action();

});

;/*!breadcrumb*/
define('breadcrumb', function(require, exports, module) {

  /*!
   * breadcrumb For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _breadcrumbJade = require('src/widget/breadcrumb/breadcrumb.jade');
  
  var _breadcrumbJade2 = _interopRequireDefault(_breadcrumbJade);
  
  var breadcrumb = (function (_App) {
      _inherits(breadcrumb, _App);
  
      function breadcrumb() {
          _classCallCheck(this, breadcrumb);
  
          _get(Object.getPrototypeOf(breadcrumb.prototype), 'constructor', this).call(this);
          this.name = 'breadcrumb';
          this.template = _breadcrumbJade2['default'];
      }
  
      _createClass(breadcrumb, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }]);
  
      return breadcrumb;
  })(_app2['default']);
  
  exports['default'] = breadcrumb;
  module.exports = exports['default'];

});

;/*!conversion*/
define('conversion', function(require, exports, module) {

  /*!
   * conversion For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-07
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _conversionJade = require('src/widget/conversion/conversion.jade');
  
  var _conversionJade2 = _interopRequireDefault(_conversionJade);
  
  var conversion = (function (_App) {
      _inherits(conversion, _App);
  
      function conversion() {
          _classCallCheck(this, conversion);
  
          _get(Object.getPrototypeOf(conversion.prototype), 'constructor', this).call(this);
          this.name = 'conversion';
          this.template = _conversionJade2['default'];
      }
  
      _createClass(conversion, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
              app.find("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
                  type: 'bar',
                  width: '100',
                  barWidth: 6,
                  height: '45',
                  barColor: '#F36A5B',
                  negBarColor: '#e02222'
              });
  
              app.find("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
                  type: 'bar',
                  width: '100',
                  barWidth: 6,
                  height: '45',
                  barColor: '#5C9BD1',
                  negBarColor: '#e02222'
              });
          }
      }]);
  
      return conversion;
  })(_app2['default']);
  
  exports['default'] = conversion;
  module.exports = exports['default'];

});

;/*!cookie*/
define('cookie', function(require, exports, module) {

  /*!
   * JavaScript Cookie v2.1.2
   * https://github.com/js-cookie/js-cookie
   *
   * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
   * Released under the MIT license
   */
  'use strict';
  
  ;(function (factory) {
      if (typeof define === 'function' && define.amd) {
          define(factory);
      } else if (typeof exports === 'object') {
          module.exports = factory();
      } else {
          var OldCookies = window.Cookies;
          var api = window.Cookies = factory();
          api.noConflict = function () {
              window.Cookies = OldCookies;
              return api;
          };
      }
  })(function () {
      function extend() {
          var i = 0;
          var result = {};
          for (; i < arguments.length; i++) {
              var attributes = arguments[i];
              for (var key in attributes) {
                  result[key] = attributes[key];
              }
          }
          return result;
      }
  
      function init(converter) {
          function api(key, value, attributes) {
              var result;
              if (typeof document === 'undefined') {
                  return;
              }
  
              // Write
  
              if (arguments.length > 1) {
                  attributes = extend({
                      path: '/'
                  }, api.defaults, attributes);
  
                  if (typeof attributes.expires === 'number') {
                      var expires = new Date();
                      expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                      attributes.expires = expires;
                  }
  
                  try {
                      result = JSON.stringify(value);
                      if (/^[\{\[]/.test(result)) {
                          value = result;
                      }
                  } catch (e) {}
  
                  if (!converter.write) {
                      value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                  } else {
                      value = converter.write(value, key);
                  }
  
                  key = encodeURIComponent(String(key));
                  key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                  key = key.replace(/[\(\)]/g, escape);
  
                  return document.cookie = [key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                  attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');
              }
  
              // Read
  
              if (!key) {
                  result = {};
              }
  
              // To prevent the for loop in the first place assign an empty array
              // in case there are no cookies at all. Also prevents odd result when
              // calling "get()"
              var cookies = document.cookie ? document.cookie.split('; ') : [];
              var rdecode = /(%[0-9A-Z]{2})+/g;
              var i = 0;
  
              for (; i < cookies.length; i++) {
                  var parts = cookies[i].split('=');
                  var cookie = parts.slice(1).join('=');
  
                  if (cookie.charAt(0) === '"') {
                      cookie = cookie.slice(1, -1);
                  }
  
                  try {
                      var name = parts[0].replace(rdecode, decodeURIComponent);
                      cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);
  
                      if (this.json) {
                          try {
                              cookie = JSON.parse(cookie);
                          } catch (e) {}
                      }
  
                      if (key === name) {
                          result = cookie;
                          break;
                      }
  
                      if (!key) {
                          result[name] = cookie;
                      }
                  } catch (e) {}
              }
  
              return result;
          }
  
          api.set = api;
          api.get = function (key) {
              return api.call(api, key);
          };
          api.getJSON = function () {
              return api.apply({
                  json: true
              }, [].slice.call(arguments));
          };
          api.defaults = {};
  
          api.remove = function (key, attributes) {
              api(key, '', extend(attributes, {
                  expires: -1
              }));
          };
  
          api.withConverter = init;
  
          return api;
      }
  
      return init(function () {});
  });

});

;/*!crypto*/
define('crypto', function(require, exports, module) {

  'use strict';
  
  var md5 = require('md5');
  
  module.exports = {
      getEncryption: function getEncryption(username, password, code) {
          var str1 = md5(password);
          var str2 = md5(str1 + username);
          return code ? md5(str2 + code) : str2;
      }
  };

});

;/*!footer*/
define('footer', function(require, exports, module) {

  /*!
   * footer For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-07
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _footerJade = require('src/widget/footer/footer.jade');
  
  var _footerJade2 = _interopRequireDefault(_footerJade);
  
  var footer = (function (_App) {
      _inherits(footer, _App);
  
      function footer() {
          _classCallCheck(this, footer);
  
          _get(Object.getPrototypeOf(footer.prototype), 'constructor', this).call(this);
          this.name = 'footer';
          this.template = _footerJade2['default'];
      }
  
      _createClass(footer, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }]);
  
      return footer;
  })(_app2['default']);
  
  exports['default'] = footer;
  module.exports = exports['default'];

});

;/*!header-bar*/
define('header-bar', function(require, exports, module) {

  /*!
   * header-bar For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _headerBarJade = require('src/widget/header-bar/header-bar.jade');
  
  var _headerBarJade2 = _interopRequireDefault(_headerBarJade);
  
  var Headerbar = (function (_App) {
      _inherits(Headerbar, _App);
  
      function Headerbar() {
          _classCallCheck(this, Headerbar);
  
          _get(Object.getPrototypeOf(Headerbar.prototype), 'constructor', this).call(this);
          this.name = 'header-bar';
          this.template = _headerBarJade2['default'];
      }
  
      _createClass(Headerbar, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }]);
  
      return Headerbar;
  })(_app2['default']);
  
  exports['default'] = Headerbar;
  module.exports = exports['default'];

});

;/*!header*/
define('header', function(require, exports, module) {

  /*!
   * header For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _cookie = require('cookie');
  
  var _cookie2 = _interopRequireDefault(_cookie);
  
  var _headerJade = require('src/widget/header/header.jade');
  
  var _headerJade2 = _interopRequireDefault(_headerJade);
  
  var header = (function (_App) {
      _inherits(header, _App);
  
      function header() {
          _classCallCheck(this, header);
  
          _get(Object.getPrototypeOf(header.prototype), 'constructor', this).call(this);
          this.name = 'header';
          this.template = _headerJade2['default'];
      }
  
      _createClass(header, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {
              this.on('click', '.linkto', function () {
                  $.get('/rose/logout', function (msg) {
                      location.reload();
                  });
              });
              // Show login username
              this.find('.username').text(_cookie2['default'].get('loginUsername'));
          }
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }]);
  
      return header;
  })(_app2['default']);
  
  exports['default'] = header;
  module.exports = exports['default'];

});

;/*!panel*/
define('panel', function(require, exports, module) {

  /*!
   * panel For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _panelJade = require('src/widget/panel/panel.jade');
  
  var _panelJade2 = _interopRequireDefault(_panelJade);
  
  var panel = (function (_App) {
      _inherits(panel, _App);
  
      function panel() {
          _classCallCheck(this, panel);
  
          _get(Object.getPrototypeOf(panel.prototype), 'constructor', this).call(this);
          this.name = 'panel';
          this.template = _panelJade2['default'];
      }
  
      _createClass(panel, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
          }
      }]);
  
      return panel;
  })(_app2['default']);
  
  exports['default'] = panel;
  module.exports = exports['default'];

});

;/*!stats*/
define('stats', function(require, exports, module) {

  /*!
   * stats For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-07
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _statsJade = require('src/widget/stats/stats.jade');
  
  var _statsJade2 = _interopRequireDefault(_statsJade);
  
  var stats = (function (_App) {
      _inherits(stats, _App);
  
      function stats() {
          _classCallCheck(this, stats);
  
          _get(Object.getPrototypeOf(stats.prototype), 'constructor', this).call(this);
          this.name = 'stats';
          this.template = _statsJade2['default'];
      }
  
      _createClass(stats, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {}
          // app为模块的实例
          // your code
  
          // app渲染到页面之后执行，此时app还在内存中，不能获取宽度高度等与尺寸相关的属性
  
      }, {
          key: 'postrender',
          value: function postrender(app) {}
          // app为模块的实例
  
          // 页面渲染到浏览器后执行，此时可以获取宽高等与尺寸相关的属性
  
      }, {
          key: 'pagerender',
          value: function pagerender(app) {
              // some code
              Morris.Area({
                  element: 'sales_statistics',
                  padding: 0,
                  behaveLikeLine: false,
                  gridEnabled: false,
                  gridLineColor: false,
                  axes: false,
                  fillOpacity: 1,
                  data: [{
                      period: '2011 Q1',
                      sales: 1400,
                      profit: 400
                  }, {
                      period: '2011 Q2',
                      sales: 1100,
                      profit: 600
                  }, {
                      period: '2011 Q3',
                      sales: 1600,
                      profit: 500
                  }, {
                      period: '2011 Q4',
                      sales: 1200,
                      profit: 400
                  }, {
                      period: '2012 Q1',
                      sales: 1550,
                      profit: 800
                  }],
                  lineColors: ['#399a8c', '#92e9dc'],
                  xkey: 'period',
                  ykeys: ['sales', 'profit'],
                  labels: ['Sales', 'Profit'],
                  pointSize: 0,
                  lineWidth: 0,
                  hideHover: 'auto',
                  resize: true
              });
          }
      }]);
  
      return stats;
  })(_app2['default']);
  
  exports['default'] = stats;
  module.exports = exports['default'];

});

;/*!table*/
define('table', function(require, exports, module) {

  /*!
   * table For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-06
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
  
  var _g = require('g');
  
  var _g2 = _interopRequireDefault(_g);
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _tbodyJade = require('src/widget/table/tbody.jade');
  
  var _tbodyJade2 = _interopRequireDefault(_tbodyJade);
  
  var _tableJade = require('src/widget/table/table.jade');
  
  var _tableJade2 = _interopRequireDefault(_tableJade);
  
  var table = (function (_App) {
      _inherits(table, _App);
  
      function table() {
          _classCallCheck(this, table);
  
          _get(Object.getPrototypeOf(table.prototype), 'constructor', this).call(this);
          this.name = 'table';
          this.tbody = _tbodyJade2['default'];
          this.template = _tableJade2['default'];
      }
  
      _createClass(table, [{
          key: 'onload',
          value: function onload() {
              var data = this.getData();
              // 配置文件数据模型
              var CONFIGMODEL = {
                  // 所有数据
                  data: {},
                  // 是否需要分页
                  page: {
                      // 单页数据量，用户配置
                      length: 10,
                      // 总页数，自动计算
                      totalPages: 10
                  },
                  // 操作列 删除-复制-编辑
                  ctrl: 'delete.copy.edit'
              };
              var profiles = 'city education professional has_social_security has_accumulation_fund house_property car'.split(' ');
              var profiles_cn = '城市 学历 职业 社保 公积金 房产 汽车'.split(' ');
  
              // 缓存数据
              this.config('data', this.clone(this.getData()));
              // 是否开启分页
              this.config('page') && this.pagination();
  
              // 重建Map
              if (!data.map) {
                  data.map = {};
                  _g2['default'].getKeyArray(data.list[0]).forEach(function (key) {
                      // 在注册字段之前插入个人资料字段
                      if (key === 'createdAt') {
                          profiles.forEach(function (item, i) {
                              data.map[item] = profiles_cn[i];
                          });
                          data.map[key] = '注册时间';
                      } else {
                          data.map[key] = key;
                      }
                  });
              }
  
              delete data.map.profile;
              data.profileField = profiles;
          }
      }, {
          key: 'prerender',
          value: function prerender(app) {
              this.ctrl();
              this.getExcel();
              this.paginator();
              // 表格格式化
              this.format();
          }
      }, {
          key: 'postrender',
          value: function postrender(app) {}
      }, {
          key: 'pagerender',
          value: function pagerender(app) {}
          // some code
  
          // 获取当前分页的数据
  
      }, {
          key: 'getPageData',
          value: function getPageData(index) {
              var data = this.clone(this.config('data'));
              var length = this.config('page.length');
              var listLength = data.list.length;
              var skip = index * length;
              var page = skip + length;
              data.list = data.list.slice(skip, page <= listLength ? page : listLength);
              return data;
          }
  
          // 渲染当前分页
      }, {
          key: 'getCurrentPage',
          value: function getCurrentPage(index) {
              this.find('tbody').replaceWith(this.tbody(this.getPageData(index)));
          }
  
          // 计算分页
      }, {
          key: 'pagination',
          value: function pagination() {
              if (!this.config('page')) return;
              var data = this.getData();
              var length = this.config('page.length');
              var total = Math.ceil(data.list.length / length);
              this.config('page.total', total);
              data.list = data.list.slice(0, length);
          }
  
          // 加载分页模块
      }, {
          key: 'paginator',
          value: function paginator() {
              var _this = this;
  
              this.find('.pagination').jqPaginator({
                  totalPages: this.config('page.total') || 1,
                  visiblePages: 5,
                  currentPage: 1,
                  first: aimee.create('li.first>a{首页}'),
                  last: aimee.create('li.last>a{尾页}'),
                  prev: aimee.create('li.prev>a>i.fa.fa-angle-left'),
                  next: aimee.create('li.next>a>i.fa.fa-angle-right'),
                  page: aimee.create('li.page>a{{{page}}}'),
                  onPageChange: function onPageChange(num, type) {
                      if (type === 'change') {
                          _this.getCurrentPage(num - 1);
                          _this.config('ctrl') && _this.ctrl();
                          _this.format();
                      }
                  }
              });
          }
      }, {
          key: 'getExcel',
          value: function getExcel() {
              var type = this.config('datetype');
              if (type === undefined) return;
              this.on('click', '.glyphicon-save', function (e) {
                  $.ajax({
                      url: '/rose/getExcel',
                      type: 'POST',
                      data: { date: type },
                      success: function success(id) {
                          location.href = '/rose/getExcel?id=' + id;
                      },
                      error: function error(xhr) {
                          alert(xhr.status + ': ' + xhr.responseText);
                      }
                  });
              });
          }
      }, {
          key: 'ctrl',
          value: function ctrl() {
              if (!this.config('ctrl')) return;
              // Add ctrl
              this.find('thead [data-type="ctrl"]').length || this.find('thead > tr').append(aimee.$('th[data-type="ctrl"]').html(aimee.create('button.btn.btn-default.glyphicon.glyphicon-save')));
              this.find('tbody> tr').each(function (i, tr) {
                  $(tr).append(aimee.$('td[data-type="ctrl"]>.inner').html(aimee.$('button.btn.btn-default.glyphicon.glyphicon-trash')));
              });
          }
      }, {
          key: 'format',
          value: function format() {
              // Format Gender
              this.find('td[data-type="gender"] .inner').each(function () {
                  var text = this.innerText;
                  text === 'Male' ? $(this).html(aimee.$('span').addClass('label label-sm label-info').text(text)) : $(this).html(aimee.$('span').addClass('label label-sm label-pink').text(text));
              });
              this.find('td[data-type="score"] .inner').each(function () {
                  var num = !isNaN(this.innerText) ? Number(this.innerText) : 0;
  
                  if (num < 3) {
                      $(this).html(aimee.$('span').addClass('label label-sm label-danger').text(num));
                  }
                  if (num >= 3 && num <= 5) {
                      $(this).html(aimee.$('span').addClass('label label-sm label-warning').text(num));
                  }
                  if (num > 5 && num <= 7) {
                      $(this).html(aimee.$('span').addClass('label label-sm label-success').text(num));
                  }
                  if (num > 7) {
                      $(this).html(aimee.$('span').addClass('label label-sm label-high').text(num));
                  }
              });
          }
      }]);
  
      return table;
  })(_app2['default']);
  
  exports['default'] = table;
  module.exports = exports['default'];

});

;/*!verification-code*/
define('verification-code', function(require, exports, module) {

  /**
   * Created by fuhuixiang on 16-7-19.
   */
  'use strict';
  
  exports.create = function () {
      var selfWidth = 90,
          selfHeight = 30,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          temp = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
          vCode = '',
          color = 'rgb(' + randInt(1, 120) + ',' + randInt(1, 120) + ',' + randInt(1, 120) + ')';
  
      canvas.width = selfWidth;
      canvas.height = selfHeight;
      ctx.fillStyle = '#f3fbfe';
      ctx.fillRect(0, 0, selfWidth, selfHeight);
      ctx.globalAlpha = .8;
      ctx.font = '16px sans-serif';
  
      for (var _i = 0; _i < 10; _i++) {
          ctx.fillStyle = 'rgb(' + randInt(150, 225) + ',' + randInt(150, 225) + ',' + randInt(150, 225) + ')';
      }
  
      ctx.font = 'bold 32px sans-serif';
      for (var i = 0; i < 4; i++) {
          var temp_index = randInt(0, temp.length);
          ctx.fillStyle = color;
          ctx.fillText(temp[temp_index], 5 + i * 23, 25);
          ctx.transform(randFloat(0.85, 1.0), randFloat(-0.04, 0), randFloat(-0.3, 0.3), randFloat(0.85, 1.0), 0, 0);
          vCode += temp[temp_index];
      }
  
      ctx.beginPath();
      ctx.strokeStyle = color;
      var b = randFloat(selfHeight / 4, 3 * selfHeight / 4),
          f = randFloat(selfHeight / 4, 3 * selfHeight / 4),
          w = 2 * Math.PI / randFloat(selfHeight * 1.5, selfWidth),
          linePoint = function linePoint(x) {
          return randFloat(10, selfHeight / 2) * Math.sin(w * x + f) + b;
      };
  
      ctx.lineWidth = 5;
      for (var x = -20; x < 200; x += 4) {
          ctx.moveTo(x, linePoint(x));
          ctx.lineTo(x + 3, linePoint(x + 3));
      }
      ctx.closePath();
      ctx.stroke();
  
      return {
          code: vCode.toLowerCase(),
          dataURL: canvas.toDataURL()
      };
  };
  
  /**
   * 随机获得一个范围内的浮点数
   * @param start
   * @param end
   * @returns {*}
   */
  function randFloat(start, end) {
      return start + Math.random() * (end - start);
  }
  
  /**
   * 随机获得一个范围内的整数
   * @param start
   * @param end
   * @returns {*}
   */
  function randInt(start, end) {
      return Math.floor(Math.random() * (end - start)) + start;
  }

});
