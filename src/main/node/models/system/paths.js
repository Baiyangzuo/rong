var path = require('path');

module.exports = dirname => {
    global.paths = {
        db      : path.join(dirname, 'db/db'),
        models  : path.join(dirname, 'models'),
        system  : path.join(dirname, 'models/system'),
        info    : path.join(dirname, 'models/system/info'),
        stats   : path.join(dirname, 'models/system/stats'),
        score   : path.join(dirname, 'models/system/score'),
        cache   : path.join(dirname, 'models/system/cache'),
    }
}
