/*!
 * init.js For admin
 * https://github.com/gavinning/aimee
 *
 * Aimee-app
 * Date: 2016-08-06
 */

var aimee, router;

aimee = require('aimee');
router = require('router');

aimee
    .reg('zepto')
    .reg('autoscreen');

router
    .option('pages/home')
    .action();
