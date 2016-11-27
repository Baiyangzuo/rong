var co = require('co');
var db = require(paths.db);
var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();
var sms = require(global.paths.sms);
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
    // 渠道号
    var sourceId = req.query.sid || '无';

    co(function *(){
        // 获取用户质量分
        user.score = yield score.getScore();
        // 记录注册用户渠道号
        user.sourceId = sourceId || user.sid;
        // 记录终端类型
        if(req.env){
            req.env.isMobile ? user.client = 'Mobile' : user.client = 'PC';
        };
        // 创建用户
        db.list.Person.create(user)
        .then(val => {
            info.user.id = val.id;
            info.stats.status = 1;
            // 统计RV
            stats.rv(info, val);
            // 缓存创建成功IP
            cache.get('ips').push(info.stats.ip);
            // 设置userguid
            res.cookie('userId', val.id, { expires: new Date(Date.now() + 8.64e+7*365), httpOnly: true });

            // 发送短信通知管理员
            sms(info.user.username)
                .then(res => console.info(info.user.id, info.user.username, 'sms send success'))
                .catch(err => console.error(info.user.id, info.user.username, 'sms send fail!', 'msg:', err.message));

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

router.post('/applyFull', function(req, res, next) {
    // 用于获取用户信息
    var info = new Info(req);
    // 用户完整信息
    var profile = info.getFull();
    co(function *(){
        // 完善用户资料
        db.list.Profile.findOrCreate({
            where: { personId: profile.personId },
            defaults: profile
        })
        .then(val => res.json({code: 0, msg: 'success'}))
        .catch(err => res.status(500).send(err.message))
    })
})

module.exports = router;
