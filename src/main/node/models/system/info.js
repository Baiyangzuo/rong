/**
 * Info
 */

var clientIp = require('client-ip');

class Info {
    constructor(req) {
        this.req = req;
    }

    getData() {
        return {
            info: this.getInfo(),
            user: this.getUser(),
            stats: this.getStats(),
            cookies: this.req.cookies
        }
    }

    getUser() {
        this.user = {
            username: this.req.body.username,
            tel: this.req.body.tel,
            gender: this.req.body.gender,
            userguid: this.req.body.userguid,
            ip: clientIp(this.req)
        }
        return this.user
    }

    getStats() {
        this.stats = {
            ip: clientIp(this.req),
            ua: this.req.headers['user-agent'],
            status: 'success',
            referer: this.req.headers.referer,
            username: this.req.body.username,
            userguid: this.req.body.userguid
        }
        return this.stats
    }

    getInfo() {
        this.info = {
            headers: this.req.headers,
            url: this.req.url,
            method: this.req.method,
            body: this.req.body,
            cookies: this.req.cookies,
            session: this.req.session
        }
        return this.info
    }
}

module.exports = Info;
