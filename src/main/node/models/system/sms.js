var path = require('path');
var format = require('date-format');
var Alidayu = require('alidayu-sms');
var clientOption = require(path.join(process.env.HOME, 'db/sms'));
var smsOption = {
     'extend' : '' ,
     'sms_type' : 'normal' ,
     'sms_free_sign_name' : '长歌' ,
     'sms_param' : "{name:'username', time: '0点', username: '测试'}" ,
     'rec_num' : '13216969487' ,
     'sms_template_code' : "SMS_30000219"
}
var sms = new Alidayu(clientOption, smsOption);

// PROD
module.exports = function(username) {
    return sms.send(18910063857, {
        name: '老王',
        time: format('hh:mm'),
        username: username
    });
}
