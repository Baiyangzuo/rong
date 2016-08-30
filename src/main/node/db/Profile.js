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
    userguid: Sequelize.UUID,
    // 学历
    education: Sequelize.STRING,
    // 职业
    professional: Sequelize.STRING,
    // 是否有社保
    has_social_security：Sequelize.INTEGER,
    // 是否有公积金
    has_accumulation_fund: Sequelize.INTEGER,
    // 房产
    house_property: Sequelize.STRING,
    // 所在城市
    city: Sequelize.STRING,
    // 注册ua
    ua: Sequelize.TEXT,
    // 注册ip
    ip: Sequelize.STRING,
    // os.name|os.fullVersion
    os: Sequelize.STRING,
    // device.name|device.fullVersion
    device: Sequelize.STRING,
    remark: Sequelize.TEXT
}
