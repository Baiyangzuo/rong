var path = require('path');
var lab = require('linco.lab');

module.exports = dirname => {
    global.paths = {
        tmpdir  : '/tmp/lincoapp',
        db      : path.join(dirname, 'db/db'),
        models  : path.join(dirname, 'models'),
        system  : path.join(dirname, 'models/system'),
        g       : path.join(dirname, 'models/system/g'),
        info    : path.join(dirname, 'models/system/info'),
        stats   : path.join(dirname, 'models/system/stats'),
        score   : path.join(dirname, 'models/system/score'),
        cache   : path.join(dirname, 'models/system/cache'),
        excel   : path.join(dirname, 'models/system/excel'),
        crypto  : path.join(dirname, 'models/system/crypto'),
        config  : path.join(dirname, 'models/system/config'),

        // Alidayu-sms
        sms     : path.join(dirname, 'models/system/sms'),

        nav     : path.join(dirname, 'config/v1/nav'),
    }

    // 创建临时目录
    lab.mkdir(global.paths.tmpdir);
    return global.paths;
}
