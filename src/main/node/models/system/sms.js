var path = require('path');
var format = require('date-format');
var Alidayu = require('alidayu-sms');
var clientOption = require(path.join(process.env.HOME, 'db/sms'));
var smsOption = {
     'extend' : '' ,
     'sms_type' : 'normal' ,
     'sms_free_sign_name' : '画仙视觉' ,
     'sms_param' : "{name:'username', tel: 13001033940}" ,
     'rec_num' : '13216969487' ,
     'sms_template_code' : "SMS_78985091"
}
var sms = new Alidayu(clientOption, smsOption);

// PROD
module.exports = function(username, tel) {
    sms.send(18201641300, {
        name: username || '未知',
        tel: tel || '未知'
    })
    sms.send(18910063857, {
        name: username || '未知',
        tel: tel || '未知'
    })
}
