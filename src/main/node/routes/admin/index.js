var path = require('path');
var express = require('express');
var router = express.Router();
var g = require(paths.g);
var db = require(paths.db);
var excel = require(paths.excel);
var crypto = require(paths.crypto);
var lab = require('linco.lab');
var Gre = require('gre');
var gre = Gre.create('prod');


router.get('/login', (req, res, next) => {
    req.session.user ?
        res.redirect('/rose'):
        res.render('admin/login', { title: 'Express', pretty: true });
})

.post('/login', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password,
        vcode: req.body.vcode
    }
    // res.json(req.body)
    db.list.User.findOne({ where: { username: user.username } })
      .then(seq => {
          if(seq){
              let dbuser = seq.get();
              let password = crypto.getVcode(dbuser.password, user.vcode);
              if(password === user.password){
                 req.session.user = user;
                 return res.send('success')
              }
          }
          res.status(400).send('fail')
      })
      .catch(err => {
          res.status(500).send(err.message)
      })
})

.get('/logout', (req, res, next) => {
    req.session.user = null
    res.send('success')
})

// Login check
.all('*', function(req, res, next) {
    req.session.user ?
        next() :
        res.redirect('/rose/login')
})

.get('/', function(req, res, next) {
    res.render('admin/index', { title: 'Express', pretty: true })
})

.get('/home', function(req, res, next) {
    res.render('admin/home', { title: 'Express', pretty: true })
})

// req.query.date: (0|1|2)(today|week|month)
.get('/getUsers', (req, res) => {
    if(req.query.date === undefined || !req.session.user){
        return res.json({code: 0, list: []})
    }
    db.list.Person.findAll({
        where: g.getTimeQuery(req.query.date),
        attributes: ['username', 'tel', 'score', 'gender', 'createdAt'],
        order: 'createdAt DESC'
    })
    .then(arr => res.json(g.retSuccess(g.Fixtimezone(arr))))
    .catch(err =>{
        gre.error(err)
        res.status(500).send(err.message)
    })
})

// 下载Excel
.get('/getExcel', (req, res) => {
    let id = req.query.id;
    let filepath = excel.getFilepath(id);
    req.query.id && lab.isFile(filepath) ?
        res.download(filepath):
        res.status(404).send('Not Found');
})

// 创建Excel
.post('/getExcel', (req, res) => {
    if(req.body.date === undefined || !req.session.user){
        gre.warn('getExcel Fail')
        gre.warn(req.session.user.username, 'getExcel Fail')
        return res.status(400).send('fail')
    }
    db.list.Person.findAll({
        where: g.getTimeQuery(req.body.date),
        attributes: ['username', 'tel', 'gender', 'createdAt'],
        order: 'createdAt DESC'
    })
    .then(arr => {
        if(arr.length === 0){
            gre.warn(req.session.user.username, 'getExcel Fail')
            gre.info(req.body.date, arr, 'Empty data')
            res.status(400).send('Empty data')
        }else {
            // 下载日志
            gre.trace(req.session.user.username, 'datetype:' + req.body.date, 'download', filepath);
            excel.src(arr).dest(id => res.send(id))
        }
    })
    .catch(err => {
        gre.error(err)
        gre.warn(req.session.user.username, 'getExcel Fail')
        res.status(500).send(err.message)
    })
})

module.exports = router;