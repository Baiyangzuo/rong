/**
 * Score
 * 注册用户质量评分
 */

var db = require(paths.db);
var cache = require(paths.cache);

class Score {
    constructor(info) {
        this.info = info
        this.score = {
            ip: 10,
            tel: 10,
            guid: 10
        }
        // 衰减算法
        this.damping = {
            // -1 & max -5
            ip: length => this.score.ip - Math.min(5, length),
            // 10/(2*length)
            tel: length => this.score.tel/Math.max(1, length*2),
            // -length*3 & max -10
            guid: length => this.score.guid - Math.min(10, length*3)
        }
    }

    getScore(fn) {
        return new Promise((res, rej) => {
            this.tel(tel => res(Math.round((
                tel +
                this.ip() +
                this.guid()
            )/3)))
        })
    }

    ip() {
        let ips = cache.get('ips')
        let length = this.find(this.info.stats.ip, ips)
        return this.damping.ip(length)
    }

    tel(fn) {
        db.list.Person
          .count({where: {tel: this.info.user.tel}})
          .then(length => fn(this.damping.tel(length)))
    }

    guid() {
        return this.damping.guid(this.info.cookies.userRegSuccess || 0)
    }

    find(el, arr) {
        let i = 0
        arr.forEach(item => item === el ? i++ : i)
        return i
    }
}

module.exports = Score;
