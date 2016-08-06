;/*!src/pages/demo/demo.jade*/
define('src/pages/demo/demo.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"page\">\n  <div id=\"lincoapp-id-header\"></div>\n</div>");;return buf.join("");
} 
});
;/*!src/widget/breadcrumb/breadcrumb.jade*/
define('src/widget/breadcrumb/breadcrumb.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-breadcrumb\">\n  <ul class=\"page-breadcrumb breadcrumb\">\n    <li><a href=\"#\">Home</a><i class=\"fa fa-circle\"></i></li>\n    <li><a href=\"table_basic.html\">Extra</a><i class=\"fa fa-circle\"></i></li>\n    <li><a href=\"table_basic.html\">Data Tables</a><i class=\"fa fa-circle\"></i></li>\n    <li class=\"active\">Basic Datatables</li>\n  </ul>\n</div>");;return buf.join("");
} 
});
;/*!src/widget/header-bar/header-bar.jade*/
define('src/widget/header-bar/header-bar.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-header-bar page-head\">\n  <div class=\"container\">\n    <!-- BEGIN PAGE TITLE-->\n    <div class=\"page-title\">\n      <h1>Dashboard <small>statistics & reports</small></h1>\n    </div>\n  </div>\n</div>");;return buf.join("");
} 
});
;/*!src/widget/header/header.jade*/
define('src/widget/header/header.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"lincoapp-header page-header\">\n  <div class=\"page-header-top\">\n    <div class=\"container\">\n      <!-- BEGIN LOGO-->\n      <div class=\"page-logo\"><a href=\"index.html\"><img src=\"/public/img/logo-default.png\" alt=\"logo\" class=\"logo-default\"/></a></div>\n      <!-- END LOGO-->\n      <!-- BEGIN RESPONSIVE MENU TOGGLER--><a href=\"javascript:;\" class=\"menu-toggler\"></a>\n      <!-- END RESPONSIVE MENU TOGGLER-->\n      <!-- BEGIN TOP NAVIGATION MENU-->\n      <div class=\"top-menu\">\n        <ul class=\"nav navbar-nav pull-right\">\n          <!-- BEGIN NOTIFICATION DROPDOWN-->\n          <li id=\"header_notification_bar\" class=\"dropdown dropdown-extended dropdown-dark dropdown-notification\"><a href=\"javascript:;\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\" class=\"dropdown-toggle\"><i class=\"icon-bell\"></i><span class=\"badge badge-default\">7</span></a>\n            <ul class=\"dropdown-menu\">\n              <li class=\"external\">\n                <h3>You have <strong>12 pending</strong> tasks</h3><a href=\"javascript:;\">view all</a>\n              </li>\n              <li>\n                <div style=\"position: relative; overflow: hidden; width: auto; height: 250px;\" class=\"slimScrollDiv\">\n                  <ul style=\"height: 250px; overflow: hidden; width: auto;\" data-handle-color=\"#637283\" data-initialized=\"1\" class=\"dropdown-menu-list scroller\">\n                    <li><a href=\"javascript:;\"><span class=\"time\">just now</span><span class=\"details\"><span class=\"label label-sm label-icon label-success\"><i class=\"fa fa-plus\"></i></span>                                      New user registered.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">3 mins</span><span class=\"details\"><span class=\"label label-sm label-icon label-danger\"><i class=\"fa fa-bolt\"></i></span>                                      Server #12 overloaded.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">10 mins</span><span class=\"details\"><span class=\"label label-sm label-icon label-warning\"><i class=\"fa fa-bell-o\"></i></span>                                      Server #2 not responding.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">14 hrs</span><span class=\"details\"><span class=\"label label-sm label-icon label-info\"><i class=\"fa fa-bullhorn\"></i></span>                                      Application error.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">2 days</span><span class=\"details\"><span class=\"label label-sm label-icon label-danger\"><i class=\"fa fa-bolt\"></i></span>                                      Database overloaded 68%.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">3 days</span><span class=\"details\"><span class=\"label label-sm label-icon label-danger\"><i class=\"fa fa-bolt\"></i></span>                                      A user IP blocked.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">4 days</span><span class=\"details\"><span class=\"label label-sm label-icon label-warning\"><i class=\"fa fa-bell-o\"></i></span>                                      Storage Server #4 not responding dfdfdfd.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">5 days</span><span class=\"details\"><span class=\"label label-sm label-icon label-info\"><i class=\"fa fa-bullhorn\"></i></span>                                      System Error.</span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"time\">9 days</span><span class=\"details\"><span class=\"label label-sm label-icon label-danger\"><i class=\"fa fa-bolt\"></i></span>                                      Storage server failed.</span></a></li>\n                  </ul>\n                  <div style=\"width: 7px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; background: rgb(99, 114, 131);\" class=\"slimScrollBar\"></div>\n                  <div style=\"width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(234, 234, 234);\" class=\"slimScrollRail\"></div>\n                </div>\n              </li>\n            </ul>\n          </li>\n          <!-- END NOTIFICATION DROPDOWN-->\n          <!-- BEGIN TODO DROPDOWN-->\n          <li id=\"header_task_bar\" class=\"dropdown dropdown-extended dropdown-dark dropdown-tasks\"><a href=\"javascript:;\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\" class=\"dropdown-toggle\"><i class=\"icon-calendar\"></i><span class=\"badge badge-default\">3</span></a>\n            <ul class=\"dropdown-menu extended tasks\">\n              <li class=\"external\">\n                <h3>You have <strong>12 pending</strong> tasks</h3><a href=\"javascript:;\">view all</a>\n              </li>\n              <li>\n                <div style=\"position: relative; overflow: hidden; width: auto; height: 275px;\" class=\"slimScrollDiv\">\n                  <ul style=\"height: 275px; overflow: hidden; width: auto;\" data-handle-color=\"#637283\" data-initialized=\"1\" class=\"dropdown-menu-list scroller\">\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">New release v1.2 </span><span class=\"percent\">30%</span></span><span class=\"progress\"><span style=\"width: 40%;\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-success\"><span class=\"sr-only\">40% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">Application deployment</span><span class=\"percent\">65%</span></span><span class=\"progress\"><span style=\"width: 65%;\" aria-valuenow=\"65\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-danger\"><span class=\"sr-only\">65% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">Mobile app release</span><span class=\"percent\">98%</span></span><span class=\"progress\"><span style=\"width: 98%;\" aria-valuenow=\"98\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-success\"><span class=\"sr-only\">98% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">Database migration</span><span class=\"percent\">10%</span></span><span class=\"progress\"><span style=\"width: 10%;\" aria-valuenow=\"10\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-warning\"><span class=\"sr-only\">10% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">Web server upgrade</span><span class=\"percent\">58%</span></span><span class=\"progress\"><span style=\"width: 58%;\" aria-valuenow=\"58\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-info\"><span class=\"sr-only\">58% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">Mobile development</span><span class=\"percent\">85%</span></span><span class=\"progress\"><span style=\"width: 85%;\" aria-valuenow=\"85\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-success\"><span class=\"sr-only\">85% Complete</span></span></span></a></li>\n                    <li><a href=\"javascript:;\"><span class=\"task\"><span class=\"desc\">New UI release</span><span class=\"percent\">38%</span></span><span class=\"progress progress-striped\"><span style=\"width: 38%;\" aria-valuenow=\"18\" aria-valuemin=\"0\" aria-valuemax=\"100\" class=\"progress-bar progress-bar-important\"><span class=\"sr-only\">38% Complete</span></span></span></a></li>\n                  </ul>\n                  <div style=\"width: 7px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; background: rgb(99, 114, 131);\" class=\"slimScrollBar\"></div>\n                  <div style=\"width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(234, 234, 234);\" class=\"slimScrollRail\"></div>\n                </div>\n              </li>\n            </ul>\n          </li>\n          <!-- END TODO DROPDOWN-->\n          <li class=\"droddown dropdown-separator\"><span class=\"separator\"></span></li>\n          <!-- BEGIN INBOX DROPDOWN-->\n          <li id=\"header_inbox_bar\" class=\"dropdown dropdown-extended dropdown-dark dropdown-inbox\"><a href=\"javascript:;\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\" class=\"dropdown-toggle\"><span class=\"circle\">3</span><span class=\"corner\"></span></a>\n            <ul class=\"dropdown-menu\">\n              <li class=\"external\">\n                <h3>You have <strong>7 New</strong> Messages</h3><a href=\"javascript:;\">view all</a>\n              </li>\n              <li>\n                <div style=\"position: relative; overflow: hidden; width: auto; height: 275px;\" class=\"slimScrollDiv\">\n                  <ul style=\"height: 275px; overflow: hidden; width: auto;\" data-handle-color=\"#637283\" data-initialized=\"1\" class=\"dropdown-menu-list scroller\">\n                    <li><a href=\"inbox.html?a=view\"><span class=\"photo\"><img src=\"/public/img/avatar2.jpg\" alt=\"\" class=\"img-circle\"/></span><span class=\"subject\"><span class=\"from\">Lisa Wong</span><span class=\"time\">Just Now </span></span><span class=\"message\">Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh...</span></a></li>\n                    <li><a href=\"inbox.html?a=view\"><span class=\"photo\"><img src=\"/public/img/avatar3.jpg\" alt=\"\" class=\"img-circle\"/></span><span class=\"subject\"><span class=\"from\">Richard Doe</span><span class=\"time\">16 mins </span></span><span class=\"message\">Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh...</span></a></li>\n                    <li><a href=\"inbox.html?a=view\"><span class=\"photo\"><img src=\"/public/img/avatar1.jpg\" alt=\"\" class=\"img-circle\"/></span><span class=\"subject\"><span class=\"from\">Bob Nilson</span><span class=\"time\">2 hrs </span></span><span class=\"message\">Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh...</span></a></li>\n                    <li><a href=\"inbox.html?a=view\"><span class=\"photo\"><img src=\"/public/img/avatar2.jpg\" alt=\"\" class=\"img-circle\"/></span><span class=\"subject\"><span class=\"from\">Lisa Wong</span><span class=\"time\">40 mins </span></span><span class=\"message\">Vivamus sed auctor 40% nibh congue nibh...</span></a></li>\n                    <li><a href=\"inbox.html?a=view\"><span class=\"photo\"><img src=\"/public/img/avatar3.jpg\" alt=\"\" class=\"img-circle\"/></span><span class=\"subject\"><span class=\"from\">Richard Doe</span><span class=\"time\">46 mins </span></span><span class=\"message\">Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh...</span></a></li>\n                  </ul>\n                  <div style=\"width: 7px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 7px; z-index: 99; right: 1px; background: rgb(99, 114, 131);\" class=\"slimScrollBar\"></div>\n                  <div style=\"width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; opacity: 0.2; z-index: 90; right: 1px; background: rgb(234, 234, 234);\" class=\"slimScrollRail\"></div>\n                </div>\n              </li>\n            </ul>\n          </li>\n          <!-- END INBOX DROPDOWN-->\n          <!-- BEGIN USER LOGIN DROPDOWN-->\n          <li class=\"dropdown dropdown-user dropdown-dark\"><a href=\"javascript:;\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\" class=\"dropdown-toggle\"><img alt=\"\" src=\"/public/img/avatar9.jpg\" class=\"img-circle\"/><span class=\"username username-hide-mobile\">Nick</span></a>\n            <ul class=\"dropdown-menu dropdown-menu-default\">\n              <li><a href=\"extra_profile.html\"><i class=\"icon-user\"></i> My Profile</a></li>\n              <li><a href=\"page_calendar.html\"><i class=\"icon-calendar\"></i> My Calendar</a></li>\n              <li><a href=\"inbox.html\"><i class=\"icon-envelope-open\"></i> My Inbox <span class=\"badge badge-danger\">3</span></a></li>\n              <li><a href=\"javascript:;\"><i class=\"icon-rocket\"></i> My Tasks <span class=\"badge badge-success\">7</span></a></li>\n              <li class=\"divider\"></li>\n              <li><a href=\"extra_lock.html\"><i class=\"icon-lock\"></i> Lock Screen</a></li>\n              <li><a href=\"login.html\"><i class=\"icon-key\"></i> Log Out</a></li>\n            </ul>\n          </li>\n          <!-- END USER LOGIN DROPDOWN-->\n          <!-- BEGIN USER LOGIN DROPDOWN-->\n          <li class=\"dropdown dropdown-extended quick-sidebar-toggler\"><span class=\"sr-only\">Toggle Quick Sidebar</span><i class=\"icon-logout\"></i></li>\n          <!-- END USER LOGIN DROPDOWN-->\n        </ul>\n      </div>\n      <!-- END TOP NAVIGATION MENU-->\n    </div>\n  </div>\n  <div class=\"page-header-menu\">\n    <div class=\"container\">\n      <!-- BEGIN HEADER SEARCH BOX-->\n      <form action=\"extra_search.html\" method=\"GET\" class=\"search-form\">\n        <div class=\"input-group\">\n          <input type=\"text\" placeholder=\"Search\" name=\"query\" class=\"form-control\"/><span class=\"input-group-btn\"><a href=\"javascript:;\" class=\"btn submit\"><i class=\"icon-magnifier\"></i></a></span>\n        </div>\n      </form>\n      <!-- END HEADER SEARCH BOX-->\n      <!-- BEGIN MEGA MENU-->\n      <!-- DOC: Apply \"hor-menu-light\" class after the \"hor-menu\" class below to have a horizontal menu with white background-->\n      <!-- DOC: Remove data-hover=\"dropdown\" and data-close-others=\"true\" attributes below to disable the dropdown opening on mouse hover-->\n      <div class=\"hor-menu\">\n        <ul class=\"nav navbar-nav\">\n          <li class=\"active\"><a href=\"/admin\">Dashboard</a></li>\n          <li><a href=\"#/demo\">Demo</a></li>\n        </ul>\n      </div>\n      <!-- END MEGA MENU-->\n    </div>\n  </div>\n</div>");;return buf.join("");
} 
});
;/*!src/widget/panel/panel.jade*/
define('src/widget/panel/panel.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (title) {
var jade_indent = [];
buf.push("\n<div class=\"lincoapp-panel\">\n  <div class=\"portlet light\">\n    <div class=\"portlet-title\">\n      <div class=\"caption\"><i class=\"fa fa-user font-green-sharp\"></i><span class=\"caption-subject font-green-sharp bold uppercase\">" + (jade.escape(null == (jade_interp = title ? title : 'Simple Table') ? "" : jade_interp)) + "</span></div>\n      <div class=\"tools\"><a href=\"javascript:;\" data-original-title=\"\" title=\"\" class=\"collapse\"></a><a href=\"#portlet-config\" data-toggle=\"modal\" data-original-title=\"\" title=\"\" class=\"config\"></a><a href=\"javascript:;\" data-original-title=\"\" title=\"\" class=\"reload\"></a><a href=\"javascript:;\" data-original-title=\"\" title=\"\" class=\"remove\"></a></div>\n    </div>\n    <div class=\"portlet-body\"></div>\n  </div>\n</div>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
} 
});
;/*!src/widget/table/table.jade*/
define('src/widget/table/table.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, map, undefined) {
var jade_indent = [];
buf.push("\n<div class=\"lincoapp-table\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th data-type=\"number\">$</th>");
// iterate map
;(function(){
  var $$obj = map;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("\n        <th" + (jade.attr("data-type", key, true, false)) + ">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</th>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("\n        <th" + (jade.attr("data-type", key, true, false)) + ">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</th>");
    }

  }
}).call(this);

buf.push("\n      </tr>\n    </thead>\n    <tbody>");
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var item = $$obj[i];

buf.push("\n      <tr>\n        <td data-type=\"number\">" + (jade.escape(null == (jade_interp = i+1) ? "" : jade_interp)) + "</td>");
// iterate item
;(function(){
  var $$obj = item;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("\n        <td" + (jade.attr("data-type", key, true, false)) + ">\n          <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n        </td>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("\n        <td" + (jade.attr("data-type", key, true, false)) + ">\n          <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n        </td>");
    }

  }
}).call(this);

buf.push("\n      </tr>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var item = $$obj[i];

buf.push("\n      <tr>\n        <td data-type=\"number\">" + (jade.escape(null == (jade_interp = i+1) ? "" : jade_interp)) + "</td>");
// iterate item
;(function(){
  var $$obj = item;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("\n        <td" + (jade.attr("data-type", key, true, false)) + ">\n          <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n        </td>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("\n        <td" + (jade.attr("data-type", key, true, false)) + ">\n          <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n        </td>");
    }

  }
}).call(this);

buf.push("\n      </tr>");
    }

  }
}).call(this);

buf.push("\n    </tbody>\n  </table>\n  <div class=\"pagination\"></div>\n</div>");}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"map" in locals_for_with?locals_for_with.map:typeof map!=="undefined"?map:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});
;/*!src/widget/table/tbody.jade*/
define('src/widget/table/tbody.jade', function(require, exports, module){ module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (list, undefined) {
var jade_indent = [];
buf.push("\n<tbody>");
// iterate list
;(function(){
  var $$obj = list;
  if ('number' == typeof $$obj.length) {

    for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
      var item = $$obj[i];

buf.push("\n  <tr>\n    <td data-type=\"number\">" + (jade.escape(null == (jade_interp = i+1) ? "" : jade_interp)) + "</td>");
// iterate item
;(function(){
  var $$obj = item;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("\n    <td" + (jade.attr("data-type", key, true, false)) + ">\n      <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n    </td>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("\n    <td" + (jade.attr("data-type", key, true, false)) + ">\n      <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n    </td>");
    }

  }
}).call(this);

buf.push("\n  </tr>");
    }

  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;      var item = $$obj[i];

buf.push("\n  <tr>\n    <td data-type=\"number\">" + (jade.escape(null == (jade_interp = i+1) ? "" : jade_interp)) + "</td>");
// iterate item
;(function(){
  var $$obj = item;
  if ('number' == typeof $$obj.length) {

    for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
      var value = $$obj[key];

buf.push("\n    <td" + (jade.attr("data-type", key, true, false)) + ">\n      <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n    </td>");
    }

  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;      var value = $$obj[key];

buf.push("\n    <td" + (jade.attr("data-type", key, true, false)) + ">\n      <div class=\"inner\">" + (jade.escape(null == (jade_interp = value) ? "" : jade_interp)) + "</div>\n    </td>");
    }

  }
}).call(this);

buf.push("\n  </tr>");
    }

  }
}).call(this);

buf.push("\n</tbody>");}.call(this,"list" in locals_for_with?locals_for_with.list:typeof list!=="undefined"?list:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
} 
});