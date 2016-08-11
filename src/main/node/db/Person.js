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
        // type: Sequelize.TEXT('tiny')
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
    // 备注
    remark: Sequelize.TEXT
}
