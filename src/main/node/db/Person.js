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
    gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female', 'Secret'],
        defaultValue: 'Secret'
    },
    age: Sequelize.INTEGER,
    tel: Sequelize.BIGINT(11).UNSIGNED,
    // PC or Mobile
    client: Sequelize.STRING,
    // Browser uuid
    clientId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    // 质量评分 详见质量评分算法
    score: Sequelize.INTEGER,
    sid: Sequelize.STRING,
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
    // 是否成功
    success: Sequelize.BIGINT.UNSIGNED,
    // 收费
    toll: Sequelize.BIGINT.UNSIGNED,
    // 贷款金额与收费比例
    ratio: Sequelize.BIGINT.UNSIGNED,
    // 备注
    remark: Sequelize.TEXT
}
