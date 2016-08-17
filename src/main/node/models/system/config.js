var Config = require('vpm-config');
var config = new Config;

config.init({
    // 默认时间戳
    timestamp: 'yyyy-MM-dd hh:mm:ss',
    // 导出表格默认sheetname
    sheetname: 'lincoapp'
})

module.exports = config;
