var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main/home', { title: 'Express' });
})

// .get('/demo', function(req, res, next) {
//     res.render('main/index', { title: 'Express' });
// })

module.exports = router;
