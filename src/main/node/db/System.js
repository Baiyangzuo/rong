/**
 * System
 */

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    // Site Name
    name: Sequelize.TEXT,
    // Site Domian
    domian: Sequelize.STRING,
    // ICP备案号
    icp: Sequelize.STRING,
    // Site Description
    desc: Sequelize.TEXT,
    // Site Keyword
    keyword: Sequelize.STRING,
    // Site Tmpdir
    tmpdir: Sequelize.TEXT,
    // Site Backupdir
    backupdir: Sequelize.TEXT,
    // Site Uploaddir
    uploaddir: Sequelize.TEXT,
    // Site Templatedir
    templatedir: Sequelize.TEXT
}
