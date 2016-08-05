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
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    // 密码
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
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
    // 签名
    signature: Sequelize.TEXT,
    // 备注
    remark: Sequelize.TEXT
}
