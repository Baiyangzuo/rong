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
    .reg('loading2');

router
    .option('pages/home')
    .option('pages/demo')
    .action();
