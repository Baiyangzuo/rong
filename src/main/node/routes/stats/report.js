var path = require('path');
var express = require('express');
var router = express.Router();
var co = require('co');
var g = require(paths.g);
var db = require(paths.db);


router.post('/fineadcpa', function(req, res, next) {
    // 查询开始日期 0=today 1=week 2=month 3=all
    const date = isNaN(req.body.date) ? 0 : req.body.date;

    // 查询日志
    logger.info('finead report:', JSON.stringify(req.body), JSON.stringify(req.query))

    // 设置允许跨域请求
    res.set('Access-Control-Allow-Origin', '*')

    co(function *(){
        const finead = yield db.list.Report.findOne({ where: {uid: 'finead'}, attributes: ['token'] })

        if(req.body.token !== finead.token){
            logger.error(`Error code: 1000 token:${req.body.token}`)
            return res.status(403).json({
                code: 1000,
                msg: 'token error!'
            })
        }

        db.list.Person.findAll({
            where: {
                sid: 'fineadcpa',
                createdAt: g.getTimeQuery(date || 0).createdAt
            },
            attributes: ['username', 'tel', 'sid', 'city', 'createdAt'],
            order: 'createdAt DESC'
        })
        .then(data => {
            // const arr = data.map(user => user.get())
            logger.info('finead report success')
            res.json({
                code: 0,
                msg: 'success',
                data: {
                    list: g.flushTel(data)
                }
            })
        })
        .catch(err => {
            logger.error('Error code: 1003', err.message)
            return res.status(500).json({
                code: 1003,
                msg: 'system error, please conact the master!'
            })
        })

    })

});

module.exports = router;
