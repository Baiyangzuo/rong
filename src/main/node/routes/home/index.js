var extend = require('aimee-extend');
var express = require('express');
var router = express.Router();
var nav = require(paths.nav);
var public = {
    version: 'v1'
};

var auto = extend(require('../../config/v1/auto'), public);
var cards = extend(require('../../config/v1/cards'), public);
var house = extend(require('../../config/v1/house'), public);
var credit = extend(require('../../config/v1/credit'), public);
var retired = extend(require('../../config/v1/retired'), public);


router.get('/m', function(req, res, next) {
    res.render('imp/home', { isMobile: true });
})

// ======> v1.0.0

router

.get('/', (req, res) => {
    res.render('imp1/home', { version: 'v1', id: 'home' })
})

.get('/apply', (req, res) => res.render('imp1/apply', public))
.get('/loan/auto', (req, res) => res.render('imp1/detail', auto))
.get('/loan/cards', (req, res) => res.render('imp1/detail', cards))
.get('/loan/house', (req, res) => res.render('imp1/detail', house))
.get('/loan/credit', (req, res) => res.render('imp1/detail', credit))
.get('/loan/retired', (req, res) => res.render('imp1/detail', retired))

module.exports = router;
