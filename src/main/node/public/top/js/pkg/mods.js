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

  function mock(data) {
      return data
  }
  
  module.exports = mock.mock = mock;
  

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

;/*!tree*/
define('tree', function(require, exports, module) {

  /*!
   * Tree For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-04
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var Tree = (function () {
      function Tree() {
          _classCallCheck(this, Tree);
  
          // 状态树
          this.tree = {};
          // 订阅者
          this.listener = {};
      }
  
      _createClass(Tree, [{
          key: "on",
          value: function on(id, handler) {
              this.listener[id] ? this.listener[id].push(handler) : this.listener[id] = [handler];
          }
      }, {
          key: "get",
          value: function get(id, handler) {
              return handler ? handler(this.tree[id]) : this.tree[id];
          }
      }, {
          key: "fire",
          value: function fire() {
              var array = Array.from(arguments);
              var id = array.shift();
              // 更新状态树
              this.tree[id] = array;
              // 通知到订阅者
              this.listener[id] && this.listener[id].forEach(function (handler) {
                  return handler.apply(id, array);
              });
          }
      }, {
          key: "emit",
          value: function emit() {
              this.fire.apply(this, arguments);
          }
      }, {
          key: "trigger",
          value: function trigger() {
              this.fire.apply(this, arguments);
          }
      }]);
  
      return Tree;
  })();
  
  var tree = new Tree();
  tree.Tree = Tree;
  exports["default"] = tree;
  module.exports = exports["default"];

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
  
  var _tree = require('tree');
  
  var _tree2 = _interopRequireDefault(_tree);
  
  var _config = require('config');
  
  var _config2 = _interopRequireDefault(_config);
  
  var _extend = require('extend');
  
  var _extend2 = _interopRequireDefault(_extend);
  
  var App = (function () {
  
      // 初始化tagName
      // 创建基础dom
  
      function App(tagName) {
          _classCallCheck(this, App);
  
          this.attributes = {};
          this.extend = _extend2['default'];
          this.CONFIG = new _config2['default']();
          this.CONFIG.init();
          this.tagName = tagName || 'div';
          this.dom = document.createElement(this.tagName);
          this.$dom = $(this.dom);
      }
  
      _createClass(App, [{
          key: 'show',
          value: function show() {
              this.$dom.show();
          }
      }, {
          key: 'hide',
          value: function hide() {
              this.$dom.hide();
          }
  
          /**
           * 配置方法
           * @param   {Object}  config 配置项
           * @example this.setting({css: true})
           */
      }, {
          key: 'setting',
          value: function setting(config) {
              this.CONFIG.merge(config);
              return this;
          }
      }, {
          key: 'config',
          value: function config() {
              return this.CONFIG.general.apply(this.CONFIG, arguments) || this;
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
                      this.$dom.attr(key, value);
                      this.attributes[key] = value;
                      return this;
                  } else {
                      this.attributes[key] = this.$dom.attr(key);
                      return this.attributes[key];
                  }
              } else if (typeof key === 'object') {
                  this.$dom.attr(key);
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
              this.$dom.appendTo(selector);
              return this;
          }
  
          /**
           * 不建议重写
           * @param   {Selector}  selector string|zepto|jquery
           */
      }, {
          key: 'prependTo',
          value: function prependTo(selector) {
              this.$dom.prependTo(selector);
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
              this.tagName === 'input' || this.tagName === 'textarea' ? this.$dom.val('') : this.$dom.text('');
              return this;
          }
  
          //! 建议重写，获取数据方法
      }, {
          key: 'getData',
          value: function getData() {
              return this.tagName === 'input' || this.tagName === 'textarea' ? this.$dom.val() : this.$dom.text();
          }
  
          //! 建议重写，设置数据
      }, {
          key: 'setData',
          value: function setData(data) {
              this.tagName === 'input' || this.tagName === 'textarea' ? this.$dom.val(data) : this.$dom.text(data);
          }
  
          //! 建议重写，自定义执行方法
      }, {
          key: 'action',
          value: function action() {
              var _this = this;
  
              if (this.disabled) {
                  return this;
              }
              this.$dom.on('input', function () {
                  return _this.onChange();
              });
              return this;
          }
  
          // 禁用表单控件，可根据需要重写
      }, {
          key: 'disable',
          value: function disable() {
              this.disabled = true;
              this.$dom.attr('disabled', 'disabled').addClass('disabled');
              return this;
          }
  
          // 启用表单控件，可根据需要重写
      }, {
          key: 'enable',
          value: function enable() {
              this.disabled = false;
              this.$dom.removeAttr('disabled').removeClass('disabled');
              return this;
          }
  
          // 表单控件根据data渲染dom的处理方法，如果有需要可重写此方法
      }, {
          key: 'create',
          value: function create(data) {
              return this;
          }
  
          // 无需重写，所有表单控件app数据改变都需要调用此方法
      }, {
          key: 'onChange',
          value: function onChange() {
              _tree2['default'].fire('form.data', this);
              return this;
          }
      }]);
  
      return App;
  })();
  
  exports['default'] = App;
  module.exports = exports['default'];

});

;/*!form/action/checkbox/checkbox*/
define('form/action/checkbox/checkbox', function(require, exports, module) {

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
          this.template = require('src/modules/form/action/checkbox/checkbox.jade');
          // 初始化
          this.attr({ 'class': 'checkbox', guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'reset',
          value: function reset() {
              this.$dom.val('');
              return this;
          }
      }, {
          key: 'create',
          value: function create(map) {
              var prop, data, defaultItem, index;
  
              // 缓存data
              this.data = data = [];
              // 缓存dataMap
              this.dataMap = map;
  
              defaultItem = map['default'];
  
              for (prop in map) {
                  if (prop !== 'default') {
                      if (prop === defaultItem) {
                          data.push({
                              value: prop,
                              alias: map[prop],
                              selected: true
                          });
                      } else {
                          data.push({
                              value: prop,
                              alias: map[prop]
                          });
                      }
                  }
              };
  
              // 渲染SELECT
              this.$dom.append(this.template({ list: data }));
  
              return this;
          }
      }, {
          key: 'getData',
          value: function getData() {
              return this.$dom.find('.selected').attr('data-value');
          }
      }, {
          key: 'action',
          value: function action() {
              this.$dom.delegate('.item', 'click', function () {
                  $(this).addClass('selected').siblings().removeClass('selected');
              });
          }
      }]);
  
      return Input;
  })(_formApp2['default']);
  
  exports['default'] = Input;
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
          this.attr({ type: 'text', 'class': 'form-item form-control', guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'reset',
          value: function reset() {
              this.$dom.val('');
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
          this.attr({ type: 'text', 'class': 'select form-item', guid: this.guid });
      }
  
      // SELECT渲染时所需数据
  
      _createClass(Input, [{
          key: 'create',
          value: function create(map) {
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
              this.$dom.append(this.template({ list: data, options: defaultItem }));
  
              // Set Select SelectedIndex
              this.dom.selectedIndex = index;
  
              // 缓存重要子元素
              this.SELECT = this.$dom;
  
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
          e.target !== this.$dom.get(0) &&
          // Target !== This.chilren
          $(e.target).parents().index(this.$dom.get(0)) < 0) {
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
          key: 'create',
          value: function create(map) {
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
              this.$dom.append(this.template({ list: data, options: defaultItem }));
  
              // 缓存重要子元素
              this.MENU = this.$dom.find('.dropdown-menu');
              this.TOGGLE = this.$dom.find('.dropdown-toggle');
              this.OPTION = this.$dom.find('.dropdown-option');
  
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
          this.$dom = aimee.$('.form-ui-slide>button.slideBtn');
          this.dom = this.$dom.get(0);
          this.attr({ guid: this.guid });
          this.CONFIG.merge({
              animate: true
          });
      }
  
      _createClass(Input, [{
          key: 'action',
          value: function action() {
              this.$dom.on('click', function () {
                  $(this).toggleClass('selected');
              });
  
              this.data = this.data || {};
  
              if (this.CONFIG.get('animate')) {
                  this.$dom.addClass('animate');
              }
  
              if (this.CONFIG.get('selected')) {
                  this.$dom.addClass('selected');
              }
  
              return this;
          }
      }, {
          key: 'create',
          value: function create(data) {
              this.$dom.find('.slideBtn').text(data.value || data);
              return this;
          }
      }, {
          key: 'getData',
          value: function getData() {
              return this.$dom.hasClass('selected') ? true : false;
          }
      }, {
          key: 'onChange',
          value: function onChange() {
              var _this = this;
  
              this.$dom.on('input', function () {
                  _this.parent.dataChange(_this);
              });
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.$dom.removeClass('selected');
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
          this.CONFIG.merge(this._config);
      }
  
      _createClass(Input, [{
          key: 'create',
          value: function create(map) {
              this.$dom.append(this.template({ map: map }));
              return this;
          }
      }, {
          key: 'getData',
          value: function getData() {
              return !this._config.selected ?
              // !Selected
              this.$dom.find('.tag').map(function (i, tag) {
                  return tag.innerText;
              }) :
              // Selected && More
              this._config.more ? this.$dom.find('.tag.selected').map(function (i, tag) {
                  return tag.innerText;
              }) :
              // Selected && !More
              this.$dom.find('.tag.selected').eq(0).text();
          }
      }, {
          key: 'input',
          value: function input() {
              if (this._config.input) {
                  this.$dom.find('.tags').before(aimee.$('input[type="text"]').addClass('area form-control').attr('placeholder', this.attributes.placeholder).on('keypress', function (e) {
                      return _handler2['default'].input(e);
                  }));
              }
          }
      }, {
          key: 'action',
          value: function action() {
              this.input();
              this.$dom.delegate('.tag', 'click', function (e) {
                  return _handler2['default'].selected(e);
              });
              this.$dom.delegate('.tag', 'dblclick', function (e) {
                  return _handler2['default'].deleted(e);
              });
              this.$dom.delegate('.area', 'blur', function (e) {
                  return _handler2['default'].blur(e);
              });
              return this;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.$dom.val('');
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
          this.attr({ 'class': 'form-area', guid: this.guid });
      }
  
      _createClass(Input, [{
          key: 'reset',
          value: function reset() {
              this.$dom.val('');
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
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _tree = require('tree');
  
  var _tree2 = _interopRequireDefault(_tree);
  
  var Form = (function () {
      function Form() {
          _classCallCheck(this, Form);
  
          this.name = 'form';
          // 所有表单控件
          // 用于渲染
          this.all = [];
          // 表单appMap表, key为name字段
          this.map = {};
          // 表单map表
          // 防止重复添加
          this.hash = {};
      }
  
      // 创建表单
  
      _createClass(Form, [{
          key: 'load',
          value: function load(id) {
              var app = new (require(['form/action',id,id].join('/')))();
  
              app.form = this;
              app.parent = this;
              this.all.push(app);
              this.hash[app.guid] = app;
              return app;
          }
      }, {
          key: 'reset',
          value: function reset() {
              this.all.forEach(function (app) {
                  return app.reset();
              });
              return this;
          }
  
          // 设置数据
      }, {
          key: 'setData',
          value: function setData(data) {
              this.all.forEach(function (app) {
                  app.attr('name');
                  app.setData(data[app.attributes.name]);
              });
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
              this.all.forEach(function (app) {
                  var res;
                  // Update attributes.name
                  app.attr('name');
                  // 检查是否有name属性
                  if (app.attributes.name) {
                      res = app.getData();
                      isFull ? data[app.attributes.name] = res : res ? data[app.attributes.name] = res : res;
                  }
              });
              return data;
          }
  
          // 根据app的name字段来查找占位符进行渲染
      }, {
          key: 'render',
          value: function render(selector) {
              var _this = this;
  
              selector = selector || document;
              this.all.forEach(function (app) {
                  // 建立appMap
                  _this.map[app.attributes.name] = app;
                  // 渲染表单控件
                  $(selector).find('[name=' + app.attributes.name + ']').replaceWith(app.$dom);
              });
              return this;
          }
      }, {
          key: 'on',
          value: function on(type, handler) {
              var _this2 = this;
  
              _tree2['default'].on([this.name, type].join('.'), function () {
                  return handler(_this2.getData());
              });
              return this;
          }
      }]);
  
      return Form;
  })();
  
  exports['default'] = Form;
  module.exports = exports['default'];

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
  // var System = require('system');
  // var system = new System;
  
  // system.guid();
  
  router.option('pages/home').action();

});

;/*!apply*/
define('apply', function(require, exports, module) {

  /*!
   * apply For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _form = require('form');
  
  var _form2 = _interopRequireDefault(_form);
  
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
              var form = new _form2['default']();
              var gender = {
                  male: '先生',
                  female: '女士',
                  'default': 'male'
              };
  
              form.load('input').attr({ name: 'username', 'class': 'input' });
              form.load('input').attr({ name: 'telphone', 'class': 'input' });
              form.load('input').attr({ name: 'vcode', 'class': 'input' });
              form.load('checkbox').attr({ name: 'gender' }).create(gender).action();
  
              form.render(this.getApp());
  
              this.find('.btn-submit').on('click', function (e) {
                  return console.log(form.getData());
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
      }]);
  
      return apply;
  })(_app2['default']);
  
  exports['default'] = apply;
  module.exports = exports['default'];

});

;/*!bigbanner*/
define('bigbanner', function(require, exports, module) {

  /*!
   * bigbanner For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _bigbannerJade = require('src/widget/bigbanner/bigbanner.jade');
  
  var _bigbannerJade2 = _interopRequireDefault(_bigbannerJade);
  
  var bigbanner = (function (_App) {
      _inherits(bigbanner, _App);
  
      function bigbanner() {
          _classCallCheck(this, bigbanner);
  
          _get(Object.getPrototypeOf(bigbanner.prototype), 'constructor', this).call(this);
          this.name = 'bigbanner';
          this.template = _bigbannerJade2['default'];
      }
  
      _createClass(bigbanner, [{
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
  
      return bigbanner;
  })(_app2['default']);
  
  exports['default'] = bigbanner;
  module.exports = exports['default'];

});

;/*!cards*/
define('cards', function(require, exports, module) {

  /*!
   * cards For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _cardsJade = require('src/widget/cards/cards.jade');
  
  var _cardsJade2 = _interopRequireDefault(_cardsJade);
  
  var cards = (function (_App) {
      _inherits(cards, _App);
  
      function cards() {
          _classCallCheck(this, cards);
  
          _get(Object.getPrototypeOf(cards.prototype), 'constructor', this).call(this);
          this.name = 'cards';
          this.template = _cardsJade2['default'];
      }
  
      _createClass(cards, [{
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
  
      return cards;
  })(_app2['default']);
  
  exports['default'] = cards;
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

;/*!highbar*/
define('highbar', function(require, exports, module) {

  /*!
   * highbar For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _highbarJade = require('src/widget/highbar/highbar.jade');
  
  var _highbarJade2 = _interopRequireDefault(_highbarJade);
  
  var highbar = (function (_App) {
      _inherits(highbar, _App);
  
      function highbar() {
          _classCallCheck(this, highbar);
  
          _get(Object.getPrototypeOf(highbar.prototype), 'constructor', this).call(this);
          this.name = 'highbar';
          this.template = _highbarJade2['default'];
      }
  
      _createClass(highbar, [{
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
  
      return highbar;
  })(_app2['default']);
  
  exports['default'] = highbar;
  module.exports = exports['default'];

});

;/*!lists*/
define('lists', function(require, exports, module) {

  /*!
   * lists For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _listsJade = require('src/widget/lists/lists.jade');
  
  var _listsJade2 = _interopRequireDefault(_listsJade);
  
  var lists = (function (_App) {
      _inherits(lists, _App);
  
      function lists() {
          _classCallCheck(this, lists);
  
          _get(Object.getPrototypeOf(lists.prototype), 'constructor', this).call(this);
          this.name = 'lists';
          this.template = _listsJade2['default'];
      }
  
      _createClass(lists, [{
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
  
      return lists;
  })(_app2['default']);
  
  exports['default'] = lists;
  module.exports = exports['default'];

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
              if (!_cookie2['default'].get('userRegSuccess')) {
                  _cookie2['default'].set('userRegSuccess', 0, { expires: 7 * 365, path: '/' });
              }
          }
      }]);
  
      return System;
  })();
  
  exports['default'] = System;
  module.exports = exports['default'];

});

;/*!topbar*/
define('topbar', function(require, exports, module) {

  /*!
   * topbar For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _topbarJade = require('src/widget/topbar/topbar.jade');
  
  var _topbarJade2 = _interopRequireDefault(_topbarJade);
  
  var topbar = (function (_App) {
      _inherits(topbar, _App);
  
      function topbar() {
          _classCallCheck(this, topbar);
  
          _get(Object.getPrototypeOf(topbar.prototype), 'constructor', this).call(this);
          this.name = 'topbar';
          this.template = _topbarJade2['default'];
      }
  
      _createClass(topbar, [{
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
  
      return topbar;
  })(_app2['default']);
  
  exports['default'] = topbar;
  module.exports = exports['default'];

});

;/*!types*/
define('types', function(require, exports, module) {

  /*!
   * types For Aimeejs
   * https://github.com/gavinning/aimee
   *
   * Aimee-app
   * Date: 2016-11-07
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
  
  var _typesJade = require('src/widget/types/types.jade');
  
  var _typesJade2 = _interopRequireDefault(_typesJade);
  
  var types = (function (_App) {
      _inherits(types, _App);
  
      function types() {
          _classCallCheck(this, types);
  
          _get(Object.getPrototypeOf(types.prototype), 'constructor', this).call(this);
          this.name = 'types';
          this.template = _typesJade2['default'];
      }
  
      _createClass(types, [{
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
  
      return types;
  })(_app2['default']);
  
  exports['default'] = types;
  module.exports = exports['default'];

});
