/**
 * All routes
 */

var uuid = require('node-uuid');

module.exports = app => {
    // Reg clientId
    app.use(function(req, res, next){
        if(!req.cookies.clientId){
            res.cookie('clientId', uuid.v4(), { expires: new Date(Date.now() + 8.64e+7*365), httpOnly: true })
        }
        next()
    });
    app.use('/', require('./home'));
    app.use('/api', require('./api'));
    app.use('/rose', require('./admin'));
    app.use('/', require('./system/stats'));

    app.use('/stats/report', require('./stats/report'));
}
