/**
 * Profile
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
        unique: true
    },
    // 学历
    education: Sequelize.STRING,
    // 职业
    professional: Sequelize.STRING,
    // 是否有社保
    has_social_security: Sequelize.STRING,
    // 是否有公积金
    has_accumulation_fund: Sequelize.STRING,
    // 房产
    house_property: Sequelize.STRING,
    // 注册ip
    ip: Sequelize.STRING,
    // 所在城市
    city: Sequelize.STRING,
    // device.name|device.fullVersion
    device: Sequelize.STRING,
    // os.name|os.fullVersion
    os: Sequelize.STRING,
    // 注册ua
    ua: Sequelize.TEXT,
    remark: Sequelize.TEXT
}
