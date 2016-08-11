var express = require('express');
var router = express.Router();
var db = require(paths.db);
var Info = require(global.paths.info);


// 申请
router.post('/apply', function(req, res, next) {
    var info = new Info(req);
    db.list.Person.create(info.getUser())
    .then(val => res.json({code: 0, msg: 'success'}))
    .catch(err => res.status(500).send(err.message))
})

module.exports = router;
