var co = require('co');
var db = require(paths.db);
var uuid = require('node-uuid');
var express = require('express');
var router = express.Router();
var g = require(global.paths.g);
var sms = require(global.paths.sms);
var Info = require(global.paths.info);
var Score = require(global.paths.score);
var Stats = require(global.paths.stats);
var cache = require(global.paths.cache);
var stats = new Stats;

// 申请
router.post('/apply', (req, res) => {
    var info = new Info(req);
    var user = info.getUser();
    var score = new Score(info.getData());

    // 清洗数据
    // 防止空字段覆盖已有字段
    g.flush(user)

    co(function *(){
        // 获取用户评分 TODO: 该评分系统需要重写
        user.score = yield score.getScore();

        // 移动端 Or PC端
        if(req.env){
            req.env.isMobile ? user.client = 'Mobile' : user.client = 'PC';
        }

        // 查询数据库最后一次注册记录
        let old = yield db.list.Person.findOne({
            // 最后一次注册
            order: 'createdAt DESC',
            where: {
                tel: user.tel
            }
        })

        // Update
        // 如果用户当天已注册过，则更新到当天注册记录
        if(old && g.isToday(old.get().createdAt)){
            db.list.Person.update(user, {
                where: {
                    id: old.id
                }
            })
            .then(val => res.json({code: 0, msg: 'success'}))
            .catch(err => res.status(500).send(err.message))
        }

        // Add
        // 如果用户当天没有注册过，则新增记录
        else{
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

                // Log
                logger.log(`user reg success: user.username:${user.username} user.tel:${user.tel}`)

                // 发送短信通知管理员
                // TODO 由于阿里大鱼短信平台被合并到阿里云通信业务模块，导致api变更无法使用，等待更新
                // sms(user.username, user.tel)
                //     .then(res => logger.info(info.user.id, info.user.username, 'sms send success'))
                //     .catch(err => logger.error(info.user.id, info.user.username, 'sms send fail!', 'msg:', err.message));

                res.json({code: 0, msg: 'success'})
            })
            .catch(err => {
                info.stats.status = 2;
                info.stats.stack = err.stack;
                // 统计RV
                stats.rv(info);

                // Log
                logger.error(`user reg fail: user.username:${user.username} user.tel:${user.tel}`)
                logger.error(err.message)

                // 发送短信通知管理员
                // sms(user.username, user.tel)
                //     .then(res => logger.info(info.user.id, info.user.username, 'sms send success'))
                //     .catch(err => logger.error(info.user.id, info.user.username, 'sms send fail!', 'msg:', err.message));

                res.status(500).send(err.message)
            })
        }
    })
})

module.exports = router;
