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
            tel: this.req.body.tel,
            gender: this.req.body.gender,
            username: this.req.body.username,
            userguid: this.req.body.userguid,
            education: this.req.body.edu,
            professional: this.req.body.job,
            has_social_security: this.req.body.soc,
            has_accumulation_fund: this.req.body.acc,
            house_property: this.req.body.house,
            loan: this.req.body.loan,
            city: this.req.body.city,
            car: this.req.body.car,
            ua: this.req.headers['user-agent'],
            ip: clientIp(this.req),
            os: this.req.env.os.name + this.req.env.os.fullVersion,
            device: this.req.env.device.name + this.req.env.device.fullVersion
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

    // 获取完整信息
    getFull() {
        this.full = {
            tel: this.req.body.tel,
            gender: this.req.body.gender,
            username: this.req.body.username,
            userguid: this.req.body.userguid,
            education: this.req.body.edu,
            professional: this.req.body.job,
            has_social_security: this.req.body.soc,
            has_accumulation_fund: this.req.body.acc,
            house_property: this.req.body.house,
            loan: this.req.body.loan,
            city: this.req.body.city,
            car: this.req.body.car,
            ua: this.req.headers['user-agent'],
            ip: clientIp(this.req),
            os: this.req.env.os.name + this.req.env.os.fullVersion,
            device: this.req.env.device.name + this.req.env.device.fullVersion
        }
        return this.full
    }
}

module.exports = Info;
