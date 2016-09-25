/**
 * User
 */

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    // 用户名
    username: Sequelize.STRING,
    // UUID
    userguid: {
        type: Sequelize.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4
    },
    clientId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female', 'Secret'],
        defaultValue: 'Secret'
    },
    age: Sequelize.INTEGER,
    tel: Sequelize.BIGINT(11).UNSIGNED,
    // 质量评分 详见质量评分算法
    score: Sequelize.INTEGER,
    sourceId: Sequelize.STRING,
    client: Sequelize.STRING,
    // 备注
    remark: Sequelize.TEXT
}
