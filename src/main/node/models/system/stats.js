/**
 * Stats
 */

var Info = require('./info');

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

    rv(status, req) {
        var data = this.get(req);
        db.list.Stats.create({
            type: 3,
            status: status,
            userId: userId,
            username: data.user.username,
            userguid: data.user.userguid
        })
    }
}
