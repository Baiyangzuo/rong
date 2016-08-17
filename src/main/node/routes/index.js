/**
 * All routes
 */

module.exports = app => {
    app.use('/', require('./home'));
    app.use('/api', require('./api'));
    app.use('/rose', require('./admin'));
    app.use('/', require('./system/stats'));
}
