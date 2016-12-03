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
    personId: Sequelize.BIGINT.UNSIGNED,
    // 用户名
    username: Sequelize.STRING,
    // UUID
    userguid: {
        type: Sequelize.UUID,
        unique: true
    },
    // 贷款金额
    loan: Sequelize.BIGINT.UNSIGNED,
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
    car: Sequelize.STRING,
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
    success: Sequelize.BIGINT.UNSIGNED,
    toll: Sequelize.BIGINT.UNSIGNED,
    ratio: Sequelize.BIGINT.UNSIGNED,
    remark: Sequelize.TEXT
}
