var co = require('co');
var db = require(paths.db);
var express = require('express');
var router = express.Router();
var Info = require(global.paths.info);
var Score = require(global.paths.score);
var Stats = require(global.paths.stats);
var cache = require(global.paths.cache);
var stats = new Stats;


// 申请
router.post('/apply', function(req, res, next) {
    // 用于获取用户信息
    var info = new Info(req);
    // 用户基本信息
    var user = info.getUser();
    // 用于评价用户质量
    var score = new Score(info.getData());

    co(function *(){
        // 获取用户质量分
        user.score = yield score.getScore();
        // 创建用户
        db.list.Person.create(user)
        .then(val => {
            info.user.id = val.id;
            info.stats.status = 1;
            // 统计RV
            stats.rv(info, val);
            // 缓存创建成功IP
            cache.get('ips').push(info.stats.ip);
            res.json({code: 0, msg: 'success'})
        })
        .catch(err => {
            info.stats.status = 2;
            info.stats.stack = err.stack;
            // 统计RV
            stats.rv(info);
            res.status(500).send(err.message)
        })
    })
})

module.exports = router;
