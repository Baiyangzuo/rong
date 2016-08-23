var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('imp/home', { title: 'Express' });
})

// router.get('/demo', function(req, res, next) {
//     res.render('imp/demo', { title: 'Express' });
// })

module.exports = router;
