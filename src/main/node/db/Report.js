/**
 * Report
 */

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    // UID
    uid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    // TOKEN
    token: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
    },
    homepage: Sequelize.STRING,
    remark: Sequelize.STRING
}
