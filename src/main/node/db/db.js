/**
 * 数据库连接池
 */

var path = require('path');
var env = require('./dbservice')();
var Extends = require('./extends');
var Sequelize = require('sequelize');
var db = module.exports = new Sequelize(env.prod);

db.list = {};

[
    'Log',
    'User',
    'Stats',
    'System',
    'Person',
    'Profile'
].forEach(name => {
    let Table = require(path.join(__dirname, name))
    let Model = db.define(name.toLowerCase(), Table, env.conf)
    Model.Table = Table
    Model.delete = Model.destroy
    Model.filter = Extends.filter
    // name === 'User' || Model.sync({force: true})
    db.list[name] = Model
});
