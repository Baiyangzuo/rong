var ip = require('ip');
var env = require('./env');
var path = require('path');
var prod = '10.25.33.168';
var localhost = ip.address();

module.exports = function(){
    return localhost === prod ?
        require(path.join(process.env.HOME, 'db/env')) : env
}
