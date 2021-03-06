var path = require('path');
var express = require('express');
var router = express.Router();
var extend = require('aimee-extend');
var nav = require(paths.nav);
var public = {
    version: 'v1'
};

var auto = extend(require('../../config/v1/auto'), public);
var cards = extend(require('../../config/v1/cards'), public);
var house = extend(require('../../config/v1/house'), public);
var credit = extend(require('../../config/v1/credit'), public);
var retired = extend(require('../../config/v1/retired'), public);

var cnbk = extend(require('../../config/v1/cnbk'), public);
var pingan = extend(require('../../config/v1/pingan'), public);
var yiche = extend(require('../../config/v1/yiche'), public);
var rongyi = extend(require('../../config/v1/rongyi'), public);

// Article list
var articleList = require('../../config/v1/articles');




// ======> v1.0.0

router

// .get('*', (req, res, next) => {
//     req.env.isMobile ? res.redirect('/m') : next()
// })

.get('/', (req, res) => {
    res.render('imp1/home', { version: 'v1', id: 'home', list: articleList, isMobile: req.env.isMobile })
})
.get('/m', function(req, res, next) {
    res.render('imp1/m', { version: 'v1', id: 'mobile', list: articleList, isMobile: true })
})

.get('/apply', (req, res) => res.render('imp1/apply', extend({isMobile: req.env.isMobile}, public)))
.get('/loan/auto', (req, res) => res.render('imp1/detail', auto))
.get('/loan/cards', (req, res) => res.render('imp1/detail', cards))
.get('/loan/house', (req, res) => res.render('imp1/detail', house))
.get('/loan/credit', (req, res) => res.render('imp1/detail', credit))
.get('/loan/retired', (req, res) => res.render('imp1/detail', retired))

.get('/loan/cnbk', (req, res) => res.render('imp1/detail', cnbk))
.get('/loan/pingan', (req, res) => res.render('imp1/detail', pingan))
.get('/loan/yiche', (req, res) => res.render('imp1/detail', yiche))
.get('/loan/rongyi', (req, res) => res.render('imp1/detail', rongyi))

// ABOUT
.get('/about/about', (req, res) => res.render('imp1/about/about', public))
.get('/about/fuwu', (req, res) => res.render('imp1/about/fuwu', public))
.get('/about/jiaru', (req, res) => res.render('imp1/about/jiaru', public))
.get('/about/lianxi', (req, res) => res.render('imp1/about/lianxi', public))
.get('/about/shangwu', (req, res) => res.render('imp1/about/shangwu', public))
.get('/about/shangye', (req, res) => res.render('imp1/about/shangye', public))
.get('/about/yijian', (req, res) => res.render('imp1/about/yijian', public))

.get('/article/:id', (req, res) => {
    let data;
    logger.log(path.join('../../config/arts', req.params.id + '.json'))

    if(!req.params.id) return res.status(404).send('404');
    try{
        logger.log(path.join('../../config/arts', req.params.id + '.json'))
        data = require(path.join('../../config/arts', req.params.id + '.json'));
    }
    catch(err){
        return res.status(404).send('404');
    }

    res.render('imp1/article', extend(data, public))
})

module.exports = router;
