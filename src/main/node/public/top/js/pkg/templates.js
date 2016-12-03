;/*!src/modules/form/action/checkbox/checkbox.jade*/
define('src/modules/form/action/checkbox/checkbox.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, undefined) {
var jade_indent = [];
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

if ((item.selected))
{
buf.push("<span" + (jade.attr("data-value", item.value, true, false)) + " class=\"item selected\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</span>");
}
else
{
buf.push("<span" + (jade.attr("data-value", item.value, true, false)) + " class=\"item\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</span>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

if ((item.selected))
{
buf.push("<span" + (jade.attr("data-value", item.value, true, false)) + " class=\"item selected\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</span>");
}
else
{
buf.push("<span" + (jade.attr("data-value", item.value, true, false)) + " class=\"item\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</span>");
}
    }

  }
}).call(this);
}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});
;/*!src/modules/form/action/select/select.jade*/
define('src/modules/form/action/select/select.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, options, undefined) {
var jade_indent = [];
if ((!options.value))
{
buf.push("\n<option value=\"\">" + (jade.escape(null == (jade_interp = options.alias) ? "" : jade_interp)) + "</option>");
}
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("\n<option" + (jade.attr("value", item.value, true, false)) + ">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</option>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("\n<option" + (jade.attr("value", item.value, true, false)) + ">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</option>");
    }

  }
}).call(this);
}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});
;/*!src/modules/form/action/selectPro/selectPro.jade*/
define('src/modules/form/action/selectPro/selectPro.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, options, undefined) {
var jade_indent = [];
buf.push("<span class=\"caret\"></span>\n<div" + (jade.attr("data-value", options.value, true, false)) + " class=\"area dropdown-toggle\">" + (jade.escape(null == (jade_interp = options.alias) ? "" : jade_interp)) + "</div>\n<ul class=\"dropdown-menu animation-dock\">");
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("\n  <li" + (jade.attr("data-value", item.value, true, false)) + " class=\"dropdown-option\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("\n  <li" + (jade.attr("data-value", item.value, true, false)) + " class=\"dropdown-option\">" + (jade.escape(null == (jade_interp = item.alias) ? "" : jade_interp)) + "</li>");
    }

  }
}).call(this);

buf.push("\n</ul>");}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"options" in locals_for_with?locals_for_with.options:typeof options!=="undefined"?options:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});
;/*!src/modules/form/action/tag/tag.jade*/
define('src/modules/form/action/tag/tag.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (map, undefined) {
var jade_indent = [];
buf.push("\n<div class=\"tags\">");
// iterate map
;(function(){
  var $$obj = map;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("<i" + (jade.attr("data-type", key, true, false)) + " class=\"tag\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</i>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("<i" + (jade.attr("data-type", key, true, false)) + " class=\"tag\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</i>");
    }

  }
}).call(this);

buf.push("\n</div>");}.call(this,"map" in locals_for_with?locals_for_with.map:typeof map!=="undefined"?map:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});
;/*!src/modules/form/action/textarea/textarea.jade*/
define('src/modules/form/action/textarea/textarea.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, placeholder) {
var jade_indent = [];
buf.push("\n<textarea" + (jade.attr("placeholder", placeholder, true, false)) + (jade.attr("name", name, true, false)) + " class=\"dataInput ui-form-textarea\"></textarea>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"placeholder" in locals_for_with?locals_for_with.placeholder:typeof placeholder!=="undefined"?placeholder:undefined));;return buf.join("");
} 
});
;/*!src/widget/apply/apply.jade*/
define('src/widget/apply/apply.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-apply aside\">\n  <div class=\"title\">申请贷款</div>\n  <div class=\"form content\">\n    <div class=\"group\"><span class=\"u-title\">请输入您的姓名</span>\n      <input type=\"text\" name=\"username\" class=\"input\"/>\n    </div>\n    <div class=\"group\"><span class=\"u-title\">请输入您的手机号</span>\n      <input type=\"text\" name=\"telphone\" class=\"input\"/>\n    </div>\n    <div class=\"group\">\n      <div name=\"gender\" class=\"checkbox\"><span data-value=\"male\" class=\"item gender male selected\">先生</span>\n        <spam data-value=\"female\" class=\"item gender female\">女士</spam>\n      </div>\n    </div>\n    <div class=\"group\"><span class=\"u-title\">请输入验证码</span>\n      <div class=\"vcode\">\n        <div class=\"u-input\">\n          <input type=\"text\" name=\"vcode\" class=\"input\"/>\n        </div>\n        <div class=\"u-img\"></div>\n        <div class=\"clear\"></div>\n      </div>\n    </div>\n    <button class=\"form-btn btn-submit\">立即申请</button>\n  </div>\n</div>");;return buf.join("");
} 
});
;/*!src/widget/bigbanner/bigbanner.jade*/
define('src/widget/bigbanner/bigbanner.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-bigbanner\"></div>");;return buf.join("");
} 
});
;/*!src/widget/cards/cards.jade*/
define('src/widget/cards/cards.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-cards\"></div>");;return buf.join("");
} 
});
;/*!src/widget/header/header.jade*/
define('src/widget/header/header.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-header\"></div>");;return buf.join("");
} 
});
;/*!src/widget/highbar/highbar.jade*/
define('src/widget/highbar/highbar.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-highbar\"></div>");;return buf.join("");
} 
});
;/*!src/widget/lists/lists.jade*/
define('src/widget/lists/lists.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-lists\"></div>");;return buf.join("");
} 
});
;/*!src/widget/topbar/topbar.jade*/
define('src/widget/topbar/topbar.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-topbar\"></div>");;return buf.join("");
} 
});
;/*!src/widget/types/types.jade*/
define('src/widget/types/types.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-types\"></div>");;return buf.join("");
} 
});