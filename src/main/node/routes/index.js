/**
 * All routes
 */

module.exports = app => {
    app.use('/', require('./home'));
    app.use('/users', require('./user'));
    app.use('/admin', require('./admin'));
}
