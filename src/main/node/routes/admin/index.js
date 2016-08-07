var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express', pretty: true })
})

.get('/home', function(req, res, next) {
  res.render('admin/home', { title: 'Express', pretty: true })
})

.get('/login', (req, res, next) => {
    res.render('admin/login', { title: 'Express', pretty: true })
})

module.exports = router;
