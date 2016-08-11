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
                  return value ? this.set(key, value) : this.get(key);
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
              app.getPage() ? app.getPage().find(id).eq(0).replaceWith(app.getApp()) : $(id).replaceWith(app.getApp());
  
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
              return this.CONFIG.general.apply(this.CONFIG, arguments) || this;
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
              return this.page ? this.page._page : false;
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
              var thisPage;
              var app = new App();
              this.app ? '' : this.app = {};
  
              // 用于简单调用模块，仅用于开发测试环境
              if (typeof fn === 'object') {
                  thisPage = fn;
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
              fn ? fn.call(app, app) : app.init().render();
  
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

;/*!uuid*/
define('uuid', function(require, exports, module) {

  //     uuid.js
  //
  //     Copyright (c) 2010-2012 Robert Kieffer
  //     MIT License - http://opensource.org/licenses/mit-license.php
  
  'use strict';
  
  (function (_window) {
    'use strict';
  
    // Unique ID creation requires a high quality random # generator.  We feature
    // detect to determine the best RNG source, normalizing to a function that
    // returns 128-bits of randomness, since that's what's usually required
    var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;
  
    function setupBrowser() {
      // Allow for MSIE11 msCrypto
      var _crypto = _window.crypto || _window.msCrypto;
  
      if (!_rng && _crypto && _crypto.getRandomValues) {
        // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
        //
        // Moderately fast, high quality
        try {
          var _rnds8 = new Uint8Array(16);
          _whatwgRNG = _rng = function whatwgRNG() {
            _crypto.getRandomValues(_rnds8);
            return _rnds8;
          };
          _rng();
        } catch (e) {}
      }
  
      if (!_rng) {
        // Math.random()-based (RNG)
        //
        // If all else fails, use Math.random().  It's fast, but is of unspecified
        // quality.
        var _rnds = new Array(16);
        _mathRNG = _rng = function () {
          for (var i = 0, r; i < 16; i++) {
            if ((i & 0x03) === 0) {
              r = Math.random() * 0x100000000;
            }
            _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
          }
  
          return _rnds;
        };
        if ('undefined' !== typeof console && console.warn) {
          console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
        }
      }
    }
  
    function setupNode() {
      // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
      //
      // Moderately fast, high quality
      if ('function' === typeof require) {
        try {
          var _rb = require('crypto').randomBytes;
          _nodeRNG = _rng = _rb && function () {
            return _rb(16);
          };
          _rng();
        } catch (e) {}
      }
    }
  
    if (_window) {
      setupBrowser();
    } else {
      setupNode();
    }
  
    // Buffer class to use
    var BufferClass = 'function' === typeof Buffer ? Buffer : Array;
  
    // Maps for number <-> hex string conversion
    var _byteToHex = [];
    var _hexToByte = {};
    for (var i = 0; i < 256; i++) {
      _byteToHex[i] = (i + 0x100).toString(16).substr(1);
      _hexToByte[_byteToHex[i]] = i;
    }
  
    // **`parse()` - Parse a UUID into it's component bytes**
    function parse(s, buf, offset) {
      var i = buf && offset || 0,
          ii = 0;
  
      buf = buf || [];
      s.toLowerCase().replace(/[0-9a-f]{2}/g, function (oct) {
        if (ii < 16) {
          // Don't overflow!
          buf[i + ii++] = _hexToByte[oct];
        }
      });
  
      // Zero out remaining bytes if string was short
      while (ii < 16) {
        buf[i + ii++] = 0;
      }
  
      return buf;
    }
  
    // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
    function unparse(buf, offset) {
      var i = offset || 0,
          bth = _byteToHex;
      return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
    }
  
    // **`v1()` - Generate time-based UUID**
    //
    // Inspired by https://github.com/LiosK/UUID.js
    // and http://docs.python.org/library/uuid.html
  
    // random #'s we need to init node and clockseq
    var _seedBytes = _rng();
  
    // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
    var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];
  
    // Per 4.2.2, randomize (14 bit) clockseq
    var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
  
    // Previous uuid creation time
    var _lastMSecs = 0,
        _lastNSecs = 0;
  
    // See https://github.com/broofa/node-uuid for API details
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || [];
  
      options = options || {};
  
      var clockseq = options.clockseq != null ? options.clockseq : _clockseq;
  
      // UUID timestamps are 100 nano-second units since the Gregorian epoch,
      // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
      // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
      // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
      var msecs = options.msecs != null ? options.msecs : new Date().getTime();
  
      // Per 4.2.1.2, use count of uuid's generated during the current clock
      // cycle to simulate higher resolution clock
      var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;
  
      // Time since last uuid creation (in msecs)
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
  
      // Per 4.2.1.2, Bump clockseq on clock regression
      if (dt < 0 && options.clockseq == null) {
        clockseq = clockseq + 1 & 0x3fff;
      }
  
      // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
      // time interval
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
        nsecs = 0;
      }
  
      // Per 4.2.1.2 Throw error if too many uuids are requested
      if (nsecs >= 10000) {
        throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
      }
  
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
  
      // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
      msecs += 12219292800000;
  
      // `time_low`
      var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = tl >>> 24 & 0xff;
      b[i++] = tl >>> 16 & 0xff;
      b[i++] = tl >>> 8 & 0xff;
      b[i++] = tl & 0xff;
  
      // `time_mid`
      var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
      b[i++] = tmh >>> 8 & 0xff;
      b[i++] = tmh & 0xff;
  
      // `time_high_and_version`
      b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
      b[i++] = tmh >>> 16 & 0xff;
  
      // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
      b[i++] = clockseq >>> 8 | 0x80;
  
      // `clock_seq_low`
      b[i++] = clockseq & 0xff;
  
      // `node`
      var node = options.node || _nodeId;
      for (var n = 0; n < 6; n++) {
        b[i + n] = node[n];
      }
  
      return buf ? buf : unparse(b);
    }
  
    // **`v4()` - Generate random UUID**
  
    // See https://github.com/broofa/node-uuid for API details
    function v4(options, buf, offset) {
      // Deprecated - 'format' argument, as supported in v1.2
      var i = buf && offset || 0;
  
      if (typeof options === 'string') {
        buf = options === 'binary' ? new BufferClass(16) : null;
        options = null;
      }
      options = options || {};
  
      var rnds = options.random || (options.rng || _rng)();
  
      // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80;
  
      // Copy bytes to buffer, if provided
      if (buf) {
        for (var ii = 0; ii < 16; ii++) {
          buf[i + ii] = rnds[ii];
        }
      }
  
      return buf || unparse(rnds);
    }
  
    // Export public API
    var uuid = v4;
    uuid.v1 = v1;
    uuid.v4 = v4;
    uuid.parse = parse;
    uuid.unparse = unparse;
    uuid.BufferClass = BufferClass;
    uuid._rng = _rng;
    uuid._mathRNG = _mathRNG;
    uuid._nodeRNG = _nodeRNG;
    uuid._whatwgRNG = _whatwgRNG;
  
    if ('undefined' !== typeof module && module.exports) {
      // Publish as node.js module
      module.exports = uuid;
    } else if (typeof define === 'function' && define.amd) {
      // Publish as AMD module
      define(function () {
        return uuid;
      });
    } else {
      // Publish as global (in browsers)
      _previousRoot = _window.uuid;
  
      // **`noConflict()` - (browser only) to reset global 'uuid' var**
      uuid.noConflict = function () {
        _window.uuid = _previousRoot;
        return uuid;
      };
  
      _window.uuid = uuid;
    }
  })('undefined' !== typeof window ? window : null);
  /*global window, require, define */

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

;/*!system*/
define('system', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _uuid = require('uuid');
  
  var _uuid2 = _interopRequireDefault(_uuid);
  
  var _cookie = require('cookie');
  
  var _cookie2 = _interopRequireDefault(_cookie);
  
  var System = (function () {
      function System() {
          _classCallCheck(this, System);
      }
  
      _createClass(System, [{
          key: 'guid',
          value: function guid() {
              if (!_cookie2['default'].get('userId')) {
                  _cookie2['default'].set('userId', _uuid2['default'].v4(), { expires: 7 * 365, path: '/' });
              }
          }
      }]);
  
      return System;
  })();
  
  exports['default'] = System;
  module.exports = exports['default'];

});

;/*!init*/
define('init', function(require, exports, module) {

  /*!
   * init.js For top
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-08-10
   */
  
  'use strict';
  
  var aimee = require('aimee');
  var router = require('router');
  var System = require('system');
  var system = new System();
  
  system.guid();
  
  router.option('pages/home').action();

});

;/*!header*/
define('header', function(require, exports, module) {

  /*!
   * header For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
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
  
      return header;
  })(_app2['default']);
  
  exports['default'] = header;
  module.exports = exports['default'];

});

;/*!form/app*/
define('form/app', function(require, exports, module) {

  /*!
   * apps For Aimeejs.from
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-05-25
   * 所有表单控件的基础类，所有表单控件应该继承此类
   *
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _config = require('config');
  
  var _config2 = _interopRequireDefault(_config);
  
  var App = (function () {
  
      // 初始化tagName
      // 创建基础dom
  
      function App(tagName) {
          _classCallCheck(this, App);
  
          this.attributes = {};
          this.tagName = tagName || 'div';
          this.dom = this.create(this.tagName);
          this.$ = $(this.dom);
          this.extend = require('extend');
          this.config = new _config2['default'].Config();
      }
  
      /**
       * 创建dom方法 ** 不建议重写
       * @param   {String}  el tagName
       * @return  {Node}       Node节点
       * @example this.create('input')
       */
  
      _createClass(App, [{
          key: 'create',
          value: function create(el) {
              return document.createElement(el);
          }
      }, {
          key: 'show',
          value: function show() {
              this.$.show();
          }
      }, {
          key: 'hide',
          value: function hide() {
              this.$.hide();
          }
  
          /**
           * 配置方法
           * @param   {Object}  config 配置项
           * @example this.setting({css: true})
           */
      }, {
          key: 'setting',
          value: function setting(config) {
              this.config.merge(config);
              return this;
          }
  
          /**
           * 属性设置 ** 不建议重写
           * @param   {String}  key   要设置的属性KEY
           * @param   {Object}  key   要设置的属性MAP
           * @param   {Any}     value 为真时单一针对key进行赋值
           * @return  {Object}        根据参数返回
           * @example [example]
           */
      }, {
          key: 'attr',
          value: function attr(key, value) {
              // KEY为字符串
              if (typeof key === 'string') {
                  // VALUE为真是赋值
                  if (value) {
                      this.$.attr(key, value);
                      this.attributes[key] = value;
                      return this;
                  } else {
                      this.attributes[key] = this.$.attr(key);
                      return this.attributes[key];
                  }
              } else if (typeof key === 'object') {
                  this.$.attr(key);
                  $.extend(this.attributes, key);
                  return this;
              }
          }
  
          /**
           * 不建议重写
           * @param   {Selector}  selector string|zepto|jquery
           */
      }, {
          key: 'appendTo',
          value: function appendTo(selector) {
              this.$.appendTo(selector);
              return this;
          }
  
          /**
           * 不建议重写
           * @param   {Selector}  selector string|zepto|jquery
           */
      }, {
          key: 'prependTo',
          value: function prependTo(selector) {
              this.$.prependTo(selector);
              return this;
          }
  
          // 返回DOM
      }, {
          key: 'getHTML',
          value: function getHTML() {
              return this.dom;
          }
  
          //! 建议重写，重置为初试状态
      }, {
          key: 'reset',
          value: function reset() {
              this.tagName === 'input' || this.tagName === 'textarea' ? this.$.val('') : this.$.text('');
              return this;
          }
  
          //! 建议重写，获取数据方法
      }, {
          key: 'getData',
          value: function getData() {
              return this.tagName === 'input' || this.tagName === 'textarea' ? this.$.val() : this.$.text();
          }
  
          //! 建议重写，设置数据
      }, {
          key: 'setData',
          value: function setData(data) {
              this.tagName === 'input' || this.tagName === 'textarea' ? this.$.val(data) : this.$.text(data);
          }
  
          //! 建议重写，自定义执行方法
      }, {
          key: 'action',
          value: function action() {
              var _this = this;
  
              if (this.disabled) {
                  return this;
              }
              this.$.on('input', function () {
                  return _this.onChange();
              });
              return this;
          }
  
          // 禁用表单控件，可根据需要重写
      }, {
          key: 'disable',
          value: function disable() {
              this.disabled = true;
              this.$.attr('disabled', 'disabled').addClass('disabled');
              return this;
          }
  
          // 启用表单控件，可根据需要重写
      }, {
          key: 'enable',
          value: function enable() {
              this.disabled = false;
              this.$.removeAttr('disabled').removeClass('disabled');
              return this;
          }
  
          // 表单控件根据data渲染dom的处理方法，如果有需要可重写此方法
      }, {
          key: 'render',
          value: function render(data) {
              return this;
          }
  
          // 无需重写，所有表单控件app数据改变都需要调用此方法
      }, {
          key: 'onChange',
          value: function onChange() {
              this.parent.dataChange(this);
              return this;
          }
      }]);
  
      return App;
  })();
  
  exports['default'] = App;
  module.exports = exports['default'];

});

;/*!form/action/input/input*/
define('form/action/input/input', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input() {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this, 'input');
          this.guid = (0, _guid2['default'])();
          // 初始化
          this.attr({ type: 'text', 'class': 'area form-control', guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'reset',
          value: function reset() {
              this.$.val('');
              return this;
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form/action/select/select*/
define('form/action/select/select', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input() {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this, 'select');
          this.guid = (0, _guid2['default'])();
          this.name = 'select';
          this.template = require('src/modules/form/action/select/select.jade');
          this.attr({ type: 'text', 'class': 'select', guid: this.guid });
      }
  
      // SELECT渲染时所需数据
  
      _createClass(Input, [{
          key: 'render',
          value: function render(map) {
              var prop, data, defaultItem, index;
  
              // 缓存data
              this.data = data = [];
              // 缓存dataMap
              this.dataMap = map;
  
              defaultItem = {
                  value: '',
                  alias: '请选择'
              };
  
              for (prop in map) {
                  if (prop === 'default') {
                      defaultItem.value = map[prop];
                      defaultItem.alias = map[map[prop]];
                  } else {
                      data.push({
                          value: prop,
                          alias: map[prop]
                      });
                  }
              };
  
              // DefaultItem in the data
              index = data.findIndex(function (item) {
                  return item.value === defaultItem.value;
              });
              index = index >= 0 ? index : 0;
  
              // 渲染SELECT
              this.$.append(this.template({ list: data, options: defaultItem }));
  
              // Set Select SelectedIndex
              this.dom.selectedIndex = index;
  
              // 缓存重要子元素
              this.SELECT = this.$;
  
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.dom.selectedIndex = 0;
              return this;
          }
  
          // 设置表单数据
      }, {
          key: 'setData',
          value: function setData(data) {
              var index;
              // String
              if (typeof data === 'string') {
                  index = this.data.findIndex(function (item) {
                      return item.value === data;
                  });
              }
              // Map
              else if (typeof data === 'object') {
                      index = this.data.findIndex(function (item) {
                          return item.value in data;
                      });
                  }
              index = index >= 0 ? index : 0;
              this.dom.selectedIndex = index;
          }
  
          // 获取数据
      }, {
          key: 'getData',
          value: function getData() {
              return this.SELECT.find('option').eq(this.dom.selectedIndex).val();
          }
  
          // 启动自定义事件
      }, {
          key: 'action',
          value: function action() {
              if (this.disabled) {
                  return this;
              }
  
              this.SELECT.on('change', this.onChange.bind(this));
  
              return this;
          }
  
          // Data on change
      }, {
          key: 'onChange',
          value: function onChange() {
              this.parent.dataChange(this);
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form/action/selectPro/handler*/
define('form/action/selectPro/handler', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports['default'] = {
  
      show: function show(e, menu) {
          menu.show().parent().addClass('open');
      },
  
      hide: function hide(e, menu) {
          menu.hide().parent().removeClass('open');
      },
  
      toggle: function toggle(e) {
          if (this.opened) {
              this.opened = false;
              this.handler.hide(e, this.MENU);
          } else {
              this.opened = true;
              this.handler.show(e, this.MENU);
          }
      },
  
      onchange: function onchange(e) {
          var prev = this.TOGGLE.attr('data-value');
          var curr = e.target.getAttribute('data-value');
  
          if (prev !== curr) {
              // 更新表单数据
              this.TOGGLE.text(e.target.innerText);
              this.TOGGLE.attr('data-value', curr);
              // 发射数据更新事件
              this.onChange();
          }
          this.TOGGLE.trigger('click');
      },
  
      globalClick: function globalClick(e) {
          if (
          // MENU Opened
          this.opened &&
          // Target !== This
          e.target !== this.$.get(0) &&
          // Target !== This.chilren
          $(e.target).parents().index(this.$.get(0)) < 0) {
              // Hide Menu
              this.TOGGLE.trigger('click');
          }
      }
  };
  module.exports = exports['default'];

});

;/*!form/action/selectPro/selectPro*/
define('form/action/selectPro/selectPro', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var _handler = require('form/action/selectPro/handler');
  
  var _handler2 = _interopRequireDefault(_handler);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input(tagName) {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this);
          this.guid = (0, _guid2['default'])();
          this.handler = _handler2['default'];
          this.name = 'selectPro';
          this.template = require('src/modules/form/action/selectPro/selectPro.jade');
          this.attr({ type: 'text', 'class': 'dropdown', guid: this.guid });
      }
  
      // SELECT渲染时所需数据
  
      _createClass(Input, [{
          key: 'render',
          value: function render(map) {
              var prop, data, defaultItem;
  
              // 缓存data
              this.data = data = [];
              // 缓存dataMap
              this.dataMap = map;
              defaultItem = {
                  value: '',
                  alias: '请选择'
              };
  
              for (prop in map) {
                  if (prop === 'default') {
                      defaultItem.value = map[prop];
                      defaultItem.alias = map[map[prop]];
                  } else {
                      data.push({
                          value: prop,
                          alias: map[prop]
                      });
                  }
              }
  
              // 渲染SELECT
              this.$.append(this.template({ list: data, options: defaultItem }));
  
              // 缓存重要子元素
              this.MENU = this.$.find('.dropdown-menu');
              this.TOGGLE = this.$.find('.dropdown-toggle');
              this.OPTION = this.$.find('.dropdown-option');
  
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.TOGGLE.attr('data-value', this.dataMap['default']).text(this.dataMap[this.dataMap['default']]);
              return this;
          }
  
          // 设置表单数据
      }, {
          key: 'setData',
          value: function setData(data) {
              this.TOGGLE.attr('data-value', data).text(this.dataMap[data]);
          }
  
          // 获取数据
      }, {
          key: 'getData',
          value: function getData() {
              return this.TOGGLE.attr('data-value');
          }
  
          // 启动自定义事件
      }, {
          key: 'action',
          value: function action() {
              if (this.disabled) {
                  return this;
              }
  
              // Option onChange
              this.OPTION.on('click', this.handler.onchange.bind(this));
  
              // Select Toggle
              this.TOGGLE.on('click', this.handler.toggle.bind(this));
  
              // Hide MENU
              $(document).on('click', this.handler.globalClick.bind(this));
  
              return this;
          }
  
          // Data on change
      }, {
          key: 'onChange',
          value: function onChange() {
              this.parent.dataChange(this);
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form/action/slide/slide*/
define('form/action/slide/slide', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input() {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this);
          this.guid = (0, _guid2['default'])();
          this.name = 'slide';
          this.$ = aimee.$('.form-ui-slide>button.slideBtn');
          this.dom = this.$.get(0);
          this.attr({ guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'action',
          value: function action() {
              this.$.on('click', function () {
                  $(this).toggleClass('selected');
              });
  
              this.data = this.data || {};
  
              if (this.data.animate) {
                  this.addClass('animate');
              }
  
              if (this.data.selected) {
                  this.addClass('selected');
              }
  
              return this;
          }
      }, {
          key: 'render',
          value: function render(data) {
              this.$.find('.slideBtn').text(data.value || data);
              return this;
          }
      }, {
          key: 'getData',
          value: function getData() {
              return this.$.hasClass('selected') ? true : false;
          }
      }, {
          key: 'onChange',
          value: function onChange() {
              var _this = this;
  
              this.$.on('input', function () {
                  _this.parent.dataChange(_this);
              });
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.$.removeClass('selected');
              return this;
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form/action/tag/handler*/
define('form/action/tag/handler', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  exports['default'] = {
  
      selected: function selected(e) {
          var target = $(e.target);
          var selected = 'selected';
          var _selected = '.selected';
  
          if (!this.parent._config.selected) {
              return;
          }
  
          // More
          if (this.parent._config.more) {
              target.hasClass(selected) ? target.removeClass(selected) : target.addClass(selected);
          }
          // Only
          else {
                  target.hasClass(selected) ? target.removeClass(selected) : target.addClass(selected).siblings(_selected).removeClass(selected);
              }
      },
  
      deleted: function deleted(e) {
          if (this.parent._config.deleted) {
              $(e.target).remove();
          }
      },
  
      input: function input(e) {
          // For Enter
          if (e.keyCode === 13) {
              // 添加tag项
              this.add(this.parseValue(e.target.value));
  
              // 输入后选中当前文本
              if (this.parent._config.autoclear === 'select') {
                  return e.target.select();
              }
  
              // 输入后当前文本 => Placeholder
              if (this.parent._config.autoclear === 'placeholder') {
                  e.target.placeholder = e.target.value;
                  return e.target.value = '';
              }
  
              // 输入后清空当前文本
              if (this.parent._config.autoclear) {
                  return e.target.value = '';
              }
          }
      },
  
      add: function add(data) {
          this.parent.$.find('.tags').append(aimee.$('i.tag').attr('data-type', data.key).text(data.value));
      },
  
      hide: function hide(e, menu) {
          menu.hide().parent().removeClass('open');
      },
  
      blur: function blur(e) {
          e.target.placeholder = this.parent.attributes.placeholder || '';
      },
  
      parseValue: function parseValue(val) {
          var arr;
  
          if (val.indexOf('\\:') > 0 || val.indexOf(':') < 0) {
              return {
                  key: null,
                  value: val
              };
          } else {
              arr = val.split(':');
              return {
                  key: arr[0],
                  value: arr[1]
              };
          }
      }
  };
  module.exports = exports['default'];

});

;/*!form/action/tag/tag*/
define('form/action/tag/tag', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var _handler = require('form/action/tag/handler');
  
  var _handler2 = _interopRequireDefault(_handler);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input() {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this);
          this.guid = (0, _guid2['default'])();
          this.name = 'tag';
          this.handler = _handler2['default'];
          this.handler.parent = this;
          // 初始化
          this.attr({ 'class': 'form-ui-tag', guid: this.guid });
          this.template = require('src/modules/form/action/tag/tag.jade');
  
          this._config = {
              more: false, // 多项选择 依赖selected
              input: false, // 可输入
              deleted: false, // 可删除 不可与selected共存
              selected: true, // 可选择
              autoclear: 'placeholder' // 输入成功后自动选中之前输入数据，方便清除 (select | placeholder)
          };
          this.config.init(this._config);
      }
  
      _createClass(Input, [{
          key: 'render',
          value: function render(map) {
              this.$.append(this.template({ map: map }));
              return this;
          }
      }, {
          key: 'getData',
          value: function getData() {
              return !this._config.selected ?
              // !Selected
              this.$.find('.tag').map(function (i, tag) {
                  return tag.innerText;
              }) :
              // Selected && More
              this._config.more ? this.$.find('.tag.selected').map(function (i, tag) {
                  return tag.innerText;
              }) :
              // Selected && !More
              this.$.find('.tag.selected').eq(0).text();
          }
      }, {
          key: 'input',
          value: function input() {
              if (this._config.input) {
                  this.$.find('.tags').before(aimee.$('input[type="text"]').addClass('area form-control').attr('placeholder', this.attributes.placeholder).on('keypress', function (e) {
                      return _handler2['default'].input(e);
                  }));
              }
          }
      }, {
          key: 'action',
          value: function action() {
              this.input();
              this.$.delegate('.tag', 'click', function (e) {
                  return _handler2['default'].selected(e);
              });
              this.$.delegate('.tag', 'dblclick', function (e) {
                  return _handler2['default'].deleted(e);
              });
              this.$.delegate('.area', 'blur', function (e) {
                  return _handler2['default'].blur(e);
              });
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.$.val('');
              return this;
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form/action/textarea/textarea*/
define('form/action/textarea/textarea', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _formApp = require('form/app');
  
  var _formApp2 = _interopRequireDefault(_formApp);
  
  var _guid = require('guid');
  
  var _guid2 = _interopRequireDefault(_guid);
  
  var Input = (function (_App) {
      _inherits(Input, _App);
  
      function Input(tagName) {
          _classCallCheck(this, Input);
  
          _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this, 'textarea');
          this.guid = (0, _guid2['default'])();
          // 初始化
          this.attr({ 'class': 'area', guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'reset',
          value: function reset() {
              this.$.val('');
              return this;
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
  module.exports = exports['default'];

});

;/*!form*/
define('form', function(require, exports, module) {

  /*!
   * form For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-05-25
   *
   * @example:
   * 		var form = new Form;
   * 		form.load('input').attr({name: 'username'}).render();
   * 		form.load('input').attr({name: 'password'}).render();
   *
   * @example:
   * 		form.group('user').load('input').attr({name: 'username'}).render();
   * 		form.group('user').load('input').attr({name: 'password'}).render();
   *
   */
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _config = require('config');
  
  var _config2 = _interopRequireDefault(_config);
  
  _config2['default'].init();
  
  var Form = (function () {
      function Form() {
          _classCallCheck(this, Form);
  
          // 所有表单控件
          // 用于渲染
          this.all = [];
          // 表单appMap表, key为name字段
          this.map = {};
          // 表单map表
          // 防止重复添加
          this.hash = {};
          // 独立表单控件
          // 用于采集结构化数据
          this.apps = [];
          // 表单控件组
          // 用于采集结构化数据
          this.groups = {};
          // 一次性函数，用于获取groupname
          this.getGroupname = function () {};
      }
  
      _createClass(Form, [{
          key: 'create',
          value: function create(el) {
              return $(document.createElement(el));
          }
  
          // 标记创建表单组
      }, {
          key: 'group',
          value: function group(name) {
              var it = this;
              // 创建一次性函数，用于通知this.load
              this.getGroupname = function () {
                  it.getGroupname = function () {};
                  return name;
              };
              return this;
          }
  
          // 创建表单
      }, {
          key: 'load',
          value: function load(id) {
              var groupname = this.getGroupname();
              var app = new (require(['form/action',id,id].join('/')))();
  
              // 表单组
              if (groupname) {
                  // 创建表单组数组
                  if (!this.groups[groupname]) {
                      this.groups[groupname] = [];
                  }
                  // 推进表单组
                  if (!this.hash[app.guid]) {
                      this.hash[app.guid] = true;
                      this.groups[groupname].push(app);
                      this.all.push(app);
                      app.parent = this;
                  }
              }
              // 独立表单
              else if (!this.hash[app.guid]) {
                      this.hash[app.guid] = true;
                      this.apps.push(app);
                      this.all.push(app);
                      app.parent = this;
                  }
  
              return app;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.all.forEach(function (app) {
                  app.reset();
              });
              return this;
          }
  
          // 设置数据
          // TODO: 待完善多层数据
      }, {
          key: 'setData',
          value: function setData(data) {
              this.all.forEach(function (app) {
                  app.attr('name');
                  app.setData(data[app.attributes.name]);
              });
              this._data = data;
              return this;
          }
  
          /**
           * 获取数据
           * @param   {Boolean}  full 是否显示空值，默认为true
           * @return  {Object}        Form表单数据
           * @example this.getData()
           */
      }, {
          key: 'getData',
          value: function getData(full) {
              var data = {};
              var isFull = typeof full === 'boolean' ? full : true;
  
              // 获取独立表单数据
              this.apps.forEach(function (app) {
                  var res;
                  // Update attributes.name
                  app.attr('name');
                  // 检查是否有name属性
                  if (app.attributes.name) {
                      res = app.getData();
                      isFull ? data[app.attributes.name] = res : res ? data[app.attributes.name] = res : res;
                  }
              });
              // 获取表单组数据
              $.each(this.groups, function (groupname, group) {
                  data[groupname] = {};
                  group.forEach(function (app) {
                      var res;
                      // Update attributes.name
                      app.attr('name');
                      // 检查是否有name属性
                      if (app.attributes.name) {
                          res = app.getData();
                          isFull ? data[groupname][app.attributes.name] = res : res ? data[groupname][app.attributes.name] = res : res;
                      }
                  });
              });
              return data;
          }
  
          /**
           * 从app列表中查询
           * @param   {String}    key   要查询的key, value为空是默认为id
           * @param   {Function}  key   自定义查询条件
           * @param   {String}    value 要查询的value
           * @return  {Object}          查询结果
           * @example [example]
           */
      }, {
          key: 'getApp',
          value: function getApp(key, value) {
              var fn, app;
  
              // 自定义查询条件
              if (typeof key === 'function') {
                  fn = key;
                  this.apps.forEach(function (res) {
                      fn(res) ? app = res : res;
                  });
                  return app;
              }
  
              // 查询子元素
              if (typeof key === 'string') {
                  value ? this.apps.forEach(function (res) {
                      if (key in res) {
                          res.attributes[key] === value ? app = res : res;
                      }
                  }) :
                  // 默认key为id
                  this.apps.forEach(function (res) {
                      res.attributes.id === key ? app = res : res;
                  });
  
                  return app;
              }
          }
  
          // 加载form默认样式
      }, {
          key: 'css',
          value: function css() {
              _config2['default'].set('css', true);
              return this;
          }
  
          // 根据app的name字段来查找占位符进行渲染
      }, {
          key: 'render',
          value: function render(selector, options) {
              var _this = this;
  
              _config2['default'].merge(options);
              selector = selector || document;
              this.all.forEach(function (app) {
                  // 建立appMap
                  _this.map[app.attributes.name] = app;
                  // 渲染表单控件
                  $(selector).find('[name=' + app.attributes.name + ']').replaceWith(app.$);
              });
              // 加载默认样式
              if (_config2['default'].get('css')) {
                  $(selector).addClass('lincoapp-form');
              };
              return this;
          }
  
          // 表单内控件数据改变时会调用此方法
      }, {
          key: 'dataChange',
          value: function dataChange() {}
      }]);
  
      return Form;
  })();
  
  exports['default'] = Form;
  module.exports = exports['default'];

});

;/*!apply*/
define('apply', function(require, exports, module) {

  /*!
   * apply For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
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
  
  var _app = require('app');
  
  var _app2 = _interopRequireDefault(_app);
  
  var _cookie = require('cookie');
  
  var _cookie2 = _interopRequireDefault(_cookie);
  
  var _applyJade = require('src/widget/apply/apply.jade');
  
  var _applyJade2 = _interopRequireDefault(_applyJade);
  
  var apply = (function (_App) {
      _inherits(apply, _App);
  
      function apply() {
          _classCallCheck(this, apply);
  
          _get(Object.getPrototypeOf(apply.prototype), 'constructor', this).call(this);
          this.name = 'apply';
          this.template = _applyJade2['default'];
      }
  
      _createClass(apply, [{
          key: 'onload',
          value: function onload() {}
  
          // app渲染到页面之前执行，用于预处理渲染内容
      }, {
          key: 'prerender',
          value: function prerender(app) {
              var _this = this;
  
              this.bind({
                  'click@.btn-submit': function clickBtnSubmit() {
                      var msg;
                      var data = _this.getFormData();
  
                      if (msg = _this.check(data)) {
                          return alert(msg);
                      }
  
                      _this.post(data, function (msg) {
                          console.log(msg);
                      }, function (err) {
                          console.log(err.status);
                          console.log(err.responseText);
                      });
                  }
              });
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
      }, {
          key: 'post',
          value: function post(data, succ, err) {
              $.ajax({
                  url: '/api/apply',
                  type: 'POST',
                  data: data,
                  success: succ,
                  error: err
              });
          }
      }, {
          key: 'check',
          value: function check(data) {
              if (!data.username) {
                  return '请输入用户名';
              }
              if (!data.tel) {
                  return '请输入手机号';
              }
              if (!data.gender) {
                  data.gender = 'male';
              }
          }
      }, {
          key: 'getFormData',
          value: function getFormData(data) {
              data = {};
              data.username = this.find('[name="username"]').val();
              data.tel = this.find('[name="telphone"]').val();
              data.gender = this.find('.gender.selected').attr('data-value');
              data.userguid = _cookie2['default'].get('userId');
              return data;
          }
      }]);
  
      return apply;
  })(_app2['default']);
  
  exports['default'] = apply;
  module.exports = exports['default'];

});
