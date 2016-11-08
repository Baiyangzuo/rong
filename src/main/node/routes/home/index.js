var extend = require('aimee-extend');
var express = require('express');
var router = express.Router();
var nav = require(paths.nav);
var public = {
    version: 'v1'
};


router.get('/m', function(req, res, next) {
    res.render('imp/home', { isMobile: true });
})

// ======> v1.0.0

router

.get('/', (req, res) => {
    res.render('imp1/home', { isMobile: req.env.isMobile, version: 'v1' })
})

.get('/apply', (req, res) => res.render('imp1/apply', public))
.get('/loan/auto', (req, res) => res.render('imp1/detail', public))
.get('/loan/cards', (req, res) => res.render('imp1/detail', public))
.get('/loan/apply', (req, res) => res.render('imp1/apply', public))
.get('/loan/house', (req, res) => res.render('imp1/detail', public))
.get('/loan/credit', (req, res) => res.render('imp1/detail', public))
.get('/loan/retired', (req, res) => res.render('imp1/detail', public))

module.exports = router;
