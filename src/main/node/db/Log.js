/**
 * Log
 */

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    /**
     * 操作类型
     * 1 : login
     * 2 : logout
     * 3 : Insert
     * 4 : Update
     * 5 : Delete
     * 6 : Import
     * 7 : Export
     */
    type: Sequelize.INTEGER,
    /**
     * 操作状态
     * 1 : success
     * 2 : fail
     * 3 : other
     */
    status: Sequelize.INTEGER,
    // 消息
    message: Sequelize.TEXT,
    // 相关表名
    tablename: Sequelize.STRING,
    // 目标ID
    targetId: Sequelize.INTEGER(11).UNSIGNED,
    // 操作用户
    username: Sequelize.STRING,
    // 用户UUID
    userguid: Sequelize.TEXT('tiny'),
    ip: Sequelize.STRING,
    ua: Sequelize.TEXT
}
