/*!
 * init.js For top
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-10
 */

var aimee = require('aimee');
var router = require('router');
var System = require('system');
var system = new System;

system.guid();

router
    .option('pages/home')
    .action();
