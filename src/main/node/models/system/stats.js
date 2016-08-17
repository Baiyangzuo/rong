/**
 * Stats
 */

var db = require(paths.db);

class Stats {
    constructor() {

    }

    get(req) {
        return (new Info(req)).getData()
    }

    pv(req) {

    }

    uv() {

    }

    rv(info) {
        db.list.Stats.create({
            type: 3,
            ip: info.stats.ip,
            ua: info.stats.ua,
            tel: info.user.tel,
            userId: info.user.id,
            stack: info.stats.stack,
            status: info.stats.status,
            username: info.user.username,
            userguid: info.user.userguid,
            referrer: info.stats.referer
        })
    }
}

module.exports = Stats;
