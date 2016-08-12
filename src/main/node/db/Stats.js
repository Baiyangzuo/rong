/**
 * Stats
 */

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    /**
     * 统计类型
     * 1 : PV
     * 2 : UV
     * 3 : RV
     */
    type: Sequelize.INTEGER,
    /**
     * 操作状态
     * 1 : success
     * 2 : fail
     * 3 : other
     */
    status: Sequelize.INTEGER,
    referrer: Sequelize.TEXT,
    // 操作用户
    username: Sequelize.STRING,
    // 用户UUID
    userguid: Sequelize.UUID,
    // 注册成功的id
    userId: Sequelize.INTEGER(11).UNSIGNED,
    ip: Sequelize.STRING,
    ua: Sequelize.TEXT,
    stack: Sequelize.TEXT
}
