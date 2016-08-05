/**
 * 数据库连接池
 */

var devFlag = true;
var env = require('./env');
var path = require('path');
var Extends = require('./extends');
var Sequelize = require('sequelize');
var db = module.exports = new Sequelize(devFlag ? env.dev: env.pro);

db.list = {};

[
    'Log',
    'User',
    'Stats',
    'System'
].forEach(name => {
    let Table = require(path.join(__dirname, name))
    let Model = db.define(name.toLowerCase(), Table, env.conf)
    Model.Table = Table
    Model.delete = Model.destroy
    Model.filter = Extends.filter
    db.list[name] = Model
});
