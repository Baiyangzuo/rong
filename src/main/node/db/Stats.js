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
    // 注册成功的id
    userId: Sequelize.INTEGER(11).UNSIGNED,
    // 操作用户
    username: Sequelize.STRING,
    // TEL
    tel: Sequelize.BIGINT(11).UNSIGNED,
    // 用户UUID
    userguid: Sequelize.UUID,
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
    ip: Sequelize.STRING,
    ua: Sequelize.TEXT,
    referrer: Sequelize.TEXT,
    stack: Sequelize.TEXT
}
